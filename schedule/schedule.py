#!/bin/python3
import sys
import os
import datetime
import time
import json
import requests

import http.client
import mimetypes
from codecs import encode


def make_request(method, body, endpoint, header=None):
    # if header is None:
    #     header = {
    #         "Accept": "*/*",
    #         "Content-Type": "application/json"
    #     }

    if body == "":
        payload = ""
    else:
        payload = json.dumps(body)
    print(">>>>>>>" + payload)
    response = requests.request(
        method, endpoint, data=payload,  headers=header)

    try:
        response.json()
        return {
            "response": response.json(),
            "status_code": response.status_code,
        }
    except:
        return {
            "response": "no json return",
            "status_code": response.status_code,
        }


def make_request_form(endpoint, image, username, password, caption):
    conn = http.client.HTTPConnection("localhost", 5001)
    dataList = []
    boundary = 'wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T'
    dataList.append(encode('--' + boundary))

    print(image)
    for i in range(0, len(image)):
        print(">>" + str(image))
        dataList.append(encode(
            'Content-Disposition: form-data; name=file_{1}; filename={0}'.format(image[i], i)))

        fileType = mimetypes.guess_type(
            image[i])[0] or 'application/octet-stream'
        dataList.append(encode('Content-Type: {}'.format(fileType)))
        dataList.append(encode(''))

        with open("./images/" + image[i], 'rb') as f:
            dataList.append(f.read())
        dataList.append(encode('--' + boundary))

    dataList.append(encode('Content-Disposition: form-data; name=username;'))
    dataList.append(encode('Content-Type: {}'.format('text/plain')))
    dataList.append(encode(''))
    dataList.append(encode(username))
    dataList.append(encode('--' + boundary))

    dataList.append(encode('Content-Disposition: form-data; name=password;'))
    dataList.append(encode('Content-Type: {}'.format('text/plain')))
    dataList.append(encode(''))
    dataList.append(encode(password))
    dataList.append(encode('--' + boundary))
    dataList.append(encode('Content-Disposition: form-data; name=caption;'))

    dataList.append(encode('Content-Type: {}'.format('text/plain')))
    dataList.append(encode(''))
    dataList.append(encode(caption))
    dataList.append(encode('--'+boundary+'--'))
    dataList.append(encode(''))
    body = b'\r\n'.join(dataList)
    payload = body
    headers = {
        'Content-type': 'multipart/form-data; boundary={}'.format(boundary)
    }
    conn.request("POST", "/v1/public/instaposts", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data.decode("utf-8")


try:
    PATH_SCHEDULE = os.environ['PATH_SCHEDULE']
    PATH_EXECUTED = os.environ['PATH_EXECUTED']
    ENDPOINT_SCHEDULE = os.environ['ENDPOINT_SCHEDULE']
except Exception as e:
    print("Error!\nVariavel de ambiente não informada!\nPATH_SCHEDULE\nPATH_EXECUTED\nENDPOINT_SCHEDULE")
    print("Execute: export PATH_SCHEDULE=<path>; export PATH_EXECUTED=<path> ; export ENDPOINT_SCHEDULE=<path>")
    sys.exit(1)

while True:
    DATA = datetime.datetime.now()
    DATA = DATA.strftime('%d') + DATA.strftime('%m') + \
        DATA.strftime("%Y") + DATA.strftime('%H') + DATA.strftime("%M")

    FILES = [f for f in os.listdir(PATH_SCHEDULE) if f.endswith(".sc")]
    for file in FILES:
        id = file.split('.')[0]
        f = open(PATH_SCHEDULE + "/" + file, 'r')
        fr = f.readlines()[0]
        f.close()

        json_file = json.loads(fr)
        if json_file.get('start_date') == DATA:
            # JSON
            if json_file.get('type') == 'json':
                json_file['status'] = 'executed'
                print(json_file.get('method'), str(json_file.get(
                    'body')), json_file.get('endpoint'), json_file.get('header'))
                json_file['return_request'] = make_request(json_file.get('method'), str(json_file.get(
                    'body')), json_file.get('endpoint'), json_file.get('header'))
                ff = open(PATH_SCHEDULE + "/" + file, 'a+')
                ff.truncate(0)
                ff.write(json.dumps(json_file))
                ff.close()
                header = {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
                r = make_request("PUT", json_file,
                                 ENDPOINT_SCHEDULE + str(id), header)
                print(r)
                os.rename(PATH_SCHEDULE + "/" + file,
                          PATH_EXECUTED + "/" + file)
                print(str(DATA) + "File: " + id + ".sc processed! ")

            # FORM
            if json_file.get('type') == 'form':
                json_file['status'] = 'executed'
                print(json_file.get('method'), str(json_file.get(
                    'body')), json_file.get('endpoint'), json_file.get('header'))
                json_file['return_request'] = make_request_form(json_file.get('endpoint'), json_file.get(
                    'files'), json_file.get('user_social_media'), json_file.get('password_social_media'), json_file.get('caption'))
                ff = open(PATH_SCHEDULE + "/" + file, 'a+')
                ff.truncate(0)
                ff.write(json.dumps(json_file))
                ff.close()
                header = {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
                # r = make_request("PUT", json_file,
                #                  'http://localhost:5000/v1/public/schedules/' + str(id), header)
                r = make_request("PUT", json_file,
                                ENDPOINT_SCHEDULE + "/" + str(id), header)
                print(r)
                os.rename(PATH_SCHEDULE + "/" + file,
                          PATH_EXECUTED + "/" + file)
                print(str(DATA) + "File: " + id + ".sc processed! ")

    time.sleep(1)
