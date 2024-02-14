#!/bin/python3
# Script para realizar o request utilizando o python para capturar o retorno da chamada
#

import requests
import json
import sys


def make_request(method, body, endpoint, header=None):
    if header is None:
        header = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

    payload = json.loads(body)
    response = requests.request(
        method, endpoint, data=payload,  headers=header)

    try:
        response.json()
        print({
            "response": response.json(),
            "status_code": response.status_code,
        })
    except:
        print({
            "response": "no json return",
            "status_code": response.status_code,
        })


make_request(sys.argv[1], sys.argv[2], sys.argv[3])
