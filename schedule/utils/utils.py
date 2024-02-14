import os
import calendar
import time
import requests
import json


class Utils(object):

    def time_stamp(self):
        current_GMT = time.gmtime()
        return calendar.timegm(current_GMT)
    def delete_file_schedule(self, id):
        file = os.environ.get('PATH_SCHEDULE') + "/" + id + ".sc"
        if os.path.isfile(file):
            fo = open(file, 'r');    
            images = json.loads(fo.readlines()[0])['files']
            fo.close()
            for i in images:
                fi = "./images/" + i
                print('remover: ' + fi)
                os.remove(fi)
            if os.path.isfile(file):
                print('remover' + str(file))
                os.remove(file)
            return True
        return False
    def create_file_schedule(self, params):
        if not os.environ.get('PATH_SCHEDULE'):
            print('Error! Variavel de ambiente: PATH_SCHEDULE nao atribuida!')
        else:
            file = open(os.environ.get('PATH_SCHEDULE') +
                        "/" + str(params.get('id')) + ".sc", 'a')
            file.write(json.dumps({
                "method": params.get('method'),
                "endpoint": params.get('endpoint'),
                "body": params.get('body'),
                "start_date": params.get('start_date'),
                "status": params.get('status'),
                "description": params.get('description'),
                "user": params.get('user'),
                "return_request": params.get('return_request'),
                "removed": params.get('removed'),
                "header": params.get('header'),
                "user_social_media": params.get('user_social_media'),
                "password_social_media": params.get('password_social_media'),
                "caption": params.get('caption'),
                "files": params.get('files'),
                "type": params.get('type')
            }))
            file.close()

    def make_request(self, method, body, endpoint, header=None):
        if header is None:
            header = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        payload = json.loads(body)
        response = requests.request(
            method, endpoint, data=payload,  headers=header)
        return response
