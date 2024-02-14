import json
import os
import uuid
from firebase_admin import auth, initialize_app, db, credentials, firestore
from flask import Flask, request, jsonify, Response
from flask_restful import Resource, Api
from json import dumps
from firebase_admin import auth, initialize_app, db, credentials
from google.cloud.firestore_v1.base_query import FieldFilter
from flask_cors import CORS
from utils.utils import Utils
from werkzeug.utils import secure_filename
app_root = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
CORS(app)
api = Api(app)
utils = Utils()

print('Incializando Firebase...')
cred = credentials.Certificate("firebase.json")
default_app = initialize_app(cred)
print(default_app.name)    # "[DEFAULT]"
db = firestore.client()


class Schedule (Resource):

    def __init__(self):
        self.ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

    def get(self):
        schedule_task = [x.to_dict()
                         for x in db.collection('schedule_task').get()]
        if len(schedule_task) > 0:
            return {'data': schedule_task}

        return {'data': []}

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    def post(self):
        try:
            if request.form:
                print("Type Form")
                method = request.form['method']
                body = ""
                endpoint = request.form['endpoint']
                start_date = request.form['start_date']
                description = request.form['description']
                user = request.form['user']
                return_request = request.form['return_request']
                header = ""

                # file = request.files['file']
                # Modificado para atender o StackMedia
                files = []
                for x in range(0, len(request.files)):
                    files.append(request.files['file_' + str(x)])

                form_value_username = request.form['user_social_media']
                # TODO não passar futuramente o passowrd (Capturar do banco firebase)
                form_value_password = request.form['password_social_media']
                form_valeu_caption = request.form['caption']
                id_images = []
                for file in files:
                    id_image = uuid.uuid4().__str__()
                    if file and self.allowed_file(file.filename):
                        filename = secure_filename(file.filename)
                        file.save(os.path.join(app_root + '/images/',
                                               id_image + "." + str(filename.split('.')[-1:][0])))
                        id_images.append(id_image + "." +
                                         str(filename.split('.')[-1:][0]))

                sc = {
                    'type': "form",
                    'user': user,
                    'method': method,
                    'endpoint': endpoint,
                    'body': body,
                    'start_date': start_date,
                    'status': 'ativo',
                    'description': description,
                    "return_request": return_request,
                    "removed": "false",
                    "header": header,
                    "files": id_images,
                    "social_media": "instagram",
                    "user_social_media": form_value_username,
                    "password_social_media": form_value_password,
                    "caption": form_valeu_caption,
                    'id': str(utils.time_stamp())
                }
                utils.create_file_schedule(sc)
                db.collection('schedule_task').document(sc.get('id')).set(sc)
                return {'message': sc.get('id'), 'status': 201}

            if request.json:
                print('Type JSON')
                method = request.json['method']
                body = request.json['body']
                endpoint = request.json['endpoint']
                start_date = request.json['start_date']
                description = request.json['description']
                user = request.json['user']
                return_request = request.json['return_request']
                header = request.json['header']
                file = request.files['file']
                id_image = uuid.uuid4().__str__()
                sc = {
                    'type': 'json',
                    'user': user,
                    'method': method,
                    'endpoint': endpoint,
                    'body': body,
                    'start_date': start_date,
                    'status': 'ativo',
                    'description': description,
                    "return_request": return_request,
                    "removed": "false",
                    "header": header,
                    "files": [],
                    "social_media": "instagram",
                    "user_social_media": form_value_username,
                    "password_social_media": form_value_password,
                    "caption": form_valeu_caption,
                    'id': str(utils.time_stamp())
                }
                utils.create_file_schedule(sc)
                db.collection('schedule_task').document(sc.get('id')).set(sc)
            return {'message': sc.id, 'status': 201}
        except Exception as e:
            print(e)
            return Response("Bad Request!" + str(e), status=400)

    def put(self, id=None):
        print(request.json)
        try:
            method = request.json['method']
            body = request.json['body']
            endpoint = request.json['endpoint']
            start_date = request.json['start_date']
            status = request.json['status']
            description = request.json['description']
            user = request.json['user']
            return_request = request.json['return_request']
            removed = request.json['removed']
            header = request.json['header']
            sc = {
                'user': user,
                'method': method,
                'endpoint': endpoint,
                'body': body,
                'start_date': start_date,
                'status': status,
                'id': id,
                'description': description,
                "return_request": return_request,
                "removed": removed,
                "header": header
            }
            if request.path == "/v1/public/schedules/" + str(id):
                db.collection('schedule_task').document(str(id)).set(sc)
            return {'message': 'updated'}
        except Exception as e:
            print('Falha para atualizar')
            print(e)
            return Response("Bad Request! " + str(e), status=400)

    def delete(self, id=None):
        print('Delete Schedule ID: ' + str(id))
        try:
            if (utils.delete_file_schedule(str(id))):
                return Response("removed",status=200)
            return Response("Schedule Not Found",status=400)
        except:
            return Response("fail",status=400)
routes_schedule = [
    '/v1/public/schedules',
    '/v1/public/schedules/<int:id>'
]

api.add_resource(Schedule, *routes_schedule)
if __name__ == '__main__':
    app.run()
