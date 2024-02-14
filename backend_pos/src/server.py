from models import Empresa as _Empresa
from models import Conta as _Conta
from models import Campanha as _Campanha
from models import Usuario as _Usuario
from models import Historico as _Historico
from models import Post as _Post
from firebase_admin import auth, initialize_app, db, credentials, firestore
from flask import Flask, request, jsonify, Response
from flask_restful import Resource, Api
from json import dumps
from firebase_admin import auth, initialize_app, db, credentials
from google.cloud.firestore_v1.base_query import FieldFilter
from utils import Utils
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
api = Api(app)

print('Incializando Firebase...')
cred = credentials.Certificate("firebase.json")
default_app = initialize_app(cred)
print(default_app.name)    # "[DEFAULT]"
db = firestore.client()


class Empresa (Resource):

    def post(self, id=None):
        try:
            if id is None or id == 0:
                nome = request.json['nome']
                descricao = request.json['descricao']
                created_at = Utils().get_date()
                status = request.json['status']
                cnpj = request.json['cnpj']
                contas = request.json['contas']

                empresa = _Empresa(
                    nome, descricao, created_at, status, cnpj, contas)
                db.collection('empresa').add(empresa.get_empresa())
                return {'message': 'Empresa adicionada com sucesso!', 'status': 200}

            if request.path == "/v1/public/empresas/"+str(id)+"/contas":
                search_empresa = db.collection(
                    'empresa').where(filter=FieldFilter("id", "==", id)).get()
                if len(search_empresa) > 0:
                    # empresa_to_set = db.collection(
                    #     'empresa').document(search_empresa[0].id)
                    # transoformar to documentReferece
                    empresa_to_set = db.collection(
                        'empresa').where(filter=FieldFilter("id", "==", id)).get()[0].reference

                    empresa_json = empresa_to_set.get().to_dict()
                    empresa_json.get('contas').append(request.json)
                    print(empresa_json)
                    empresa_to_set.set(empresa_json)
                    return {'message': 'Conta adicionada com sucesso!', 'status': 200}
        except:
            Response(status=400)

    def get(self, id=None):
        if id is not None:
            if request.path == "/v1/public/empresas/" + str(id):
                empresa = db.collection('empresa').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(empresa) > 0:
                    empresa = empresa[0].to_dict()
                    return {'data': empresa}
                return {'data': []}
            if request.path == "/v1/public/empresas/" + str(id) + "/contas":
                empresa = db.collection('empresa').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(empresa) > 0:
                    contas = empresa[0].get('contas')
                    return {'data': contas}
        empresa = [x.to_dict() for x in db.collection('empresa').get()]
        if len(empresa) > 0:
            return {'data': empresa}

        return {'data': []}

    def put(self, id=None):
        if id is not None:

            nome = request.json['nome']
            descricao = request.json['descricao']
            status = request.json['status']
            cnpj = request.json['cnpj']
            contas = request.json['contas']

            if request.path == "/v1/public/empresas/" + str(id):
                empresa_db = db.collection('empresa').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(empresa_db) > 0:
                    empresa = _Empresa(nome, descricao, empresa_db[0].get(
                        'created_at'), status, cnpj, contas, empresa_db[0].get('id'))
                    empresa_set = empresa_db[0].reference
                    empresa_set.set(empresa.get_empresa())
                    return {'message': 'Empresa atualizada com sucesso!', 'status': 200}
                return Response(status=200)


class Conta (Resource):

    def post(self, id=None):
        try:
            if id is None or id == 0:
                nome = request.json['nome']
                descricao = request.json['descricao']
                tipo = request.json['tipo']
                usuario = request.json['usuario']
                senha = request.json['senha']
                status = request.json['status']
                created_at = Utils().get_date()
                id_empresa = request.json['id_empresa']
                campanhas = request.json['campanhas']
                conta = _Conta(nome, descricao, tipo, usuario,
                               senha, status, created_at, id_empresa, campanhas)

                db.collection('conta').add(conta.get_conta())
                return {'message': 'Conta adicionada com sucesso!', 'status': 200}
        except:
            return Response(status=400)

    def get(self, id=None):
        if id is not None:
            if request.path == "/v1/public/contas/" + str(id):
                conta = db.collection('conta').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(conta) > 0:
                    conta = conta[0].to_dict()
                    return {'data': conta}
                return {'data': []}
            if request.path == "/v1/public/contas/" + str(id) + "/campanhas":
                conta = db.collection('conta').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(conta) > 0:
                    contas = conta[0].get('campanhas')
                    return {'data': contas}
        conta = [x.to_dict() for x in db.collection('conta').get()]
        if len(conta) > 0:
            return {'data': conta}

        return {'data': []}

    def put(self, id=None):
        if id is not None:
            nome = request.json['nome']
            descricao = request.json['descricao']
            tipo = request.json['tipo']
            usuario = request.json['usuario']
            senha = request.json['senha']
            status = request.json['status']
            id_empresa = request.json['id_empresa']
            campanhas = request.json['campanhas']

            if request.path == "/v1/public/contas/" + str(id):
                conta_db = db.collection('conta').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(conta_db) > 0:
                    conta = _Conta(nome, descricao, tipo, usuario, senha, status, conta_db[0].get(
                        'created_at'), id_empresa, campanhas, conta_db[0].get('id'))
                    conta_set = conta_db[0].reference

                    conta_set.set(conta.get_conta())
                    return {'message': 'Conta atualizada com sucesso!', 'status': 200}
                return Response(status=200)


class Campanha (Resource):

    def post(self, id=None):
        try:
            if id is None or id == 0:
                nome = request.json['nome']
                descricao = request.json['descricao']
                data_inicio = request.json['data_inicio']
                data_fim = request.json['data_fim']
                created_at = Utils().get_date()
                status = request.json['status']
                id_conta = request.json['id_conta']
                posts = request.json['posts']
                campanha = _Campanha(
                    nome, descricao, data_inicio, data_fim, created_at, status, id_conta, posts)
                db.collection('campanha').add(campanha.get_campanha())
                return {'message': 'Campanha adicionada com sucesso!', 'status': 200}
        except:
            return Response(status=400)

    def get(self, id=None):
        if id is not None:
            if request.path == "/v1/public/campanhas/" + str(id):
                campanha = db.collection('campanha').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(campanha) > 0:
                    campanha = campanha[0].to_dict()
                    return {'data': campanha}
                return {'data': []}
            if request.path == "/v1/public/campanhas/" + str(id) + "/posts":
                campanha = db.collection('campanha').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(campanha) > 0:
                    campanhas = campanha[0].get('posts')
                    return {'data': campanhas}
        campanha = [x.to_dict() for x in db.collection('campanha').get()]
        if len(campanha) > 0:
            return {'data': campanha}

        return {'data': []}

    def put(self, id=None):
        if id is not None:
            nome = request.json['nome']
            descricao = request.json['descricao']
            data_inicio = request.json['data_inicio']
            data_fim = request.json['data_fim']
            status = request.json['status']
            id_conta = request.json['id_conta']
            posts = request.json['posts']

            if request.path == "/v1/public/campanhas/" + str(id):
                campanha_db = db.collection('campanha').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(campanha_db) > 0:
                    campanha = _Campanha(nome, descricao, data_inicio, data_fim, campanha_db[0].get(
                        'created_at'), status, id_conta, posts, campanha_db[0].get('id'))

                    campanha_set = campanha_db[0].reference

                    campanha_set.set(campanha.get_campanha())
                    return {'message': 'Campanha atualizada com sucesso!', 'status': 200}
                return Response(status=200)


class Post (Resource):

    def post(self, id=None):

        try:
            if id is None or id == 0:
                nome = request.json['nome']
                descricao = request.json['descricao']
                texto = request.json['texto']
                imagens = request.json['imagens']
                data_publicacao = request.json['data_publicacao']
                status = request.json['status']
                id_campanha = request.json['id_campanha']
                id_agendamento = request.json['id_agendamento']
                hashtags = request.json['hashtags']
                created_at = Utils().get_date()
                post = _Post(nome, descricao, texto, imagens, data_publicacao,
                             status, id_campanha, id_agendamento, hashtags, created_at)

                db.collection('post').add(post.get_post())
                return {'message': 'Post adicionado com sucesso!', 'status': 200}
        except:
            return Response(status=400)

    def get(self, id=None):
        if id is not None:
            if request.path == "/v1/public/posts/" + str(id):
                post = db.collection('post').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(post) > 0:
                    post = post[0].to_dict()
                    return {'data': post}
                return {'data': []}
        post = [x.to_dict() for x in db.collection('post').get()]
        if len(post) > 0:
            return {'data': post}
        return {'data': []}

    def put(self, id=None):

        if id is not None:
            nome = request.json['nome']
            descricao = request.json['descricao']
            texto = request.json['texto']
            imagens = request.json['imagens']
            data_publicacao = request.json['data_publicacao']
            status = request.json['status']
            id_campanha = request.json['id_campanha']
            hashtags = request.json['hashtags']
            if request.path == "/v1/public/posts/" + str(id):
                post_db = db.collection('post').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(post_db) > 0:
                    post = _Post(nome, descricao, texto, imagens, data_publicacao, status, id_campanha,
                                 post_db[0].get('id'), hashtags, post_db[0].get(
                                     'created_at'))

                    post_set = post_db[0].reference

                    post_set.set(post.get_post())
                    return {'message': 'Post atualizado com sucesso!', 'status': 200}
                return Response(status=200)


class Usuario (Resource):

    def post(self, id=None):
        try:
            if id is None or id == 0:
                nome = request.json['nome']
                descricao = request.json['descricao']
                foto = request.json['foto']
                status = request.json['status']
                grupo = request.json['grupo']
                email = request.json['email']
                created_at = Utils().get_date()
                usuario = _Usuario(nome, descricao, foto,
                                   status, grupo, email, created_at)

                db.collection('usuario').add(usuario.get_usuario())
                return {'message': 'usuario adicionada com sucesso!', 'status': 200}
        except:
            return Response(status=400)

    def get(self, email=None):
        if id is not None:
            if request.path == "/v1/public/usuarios/" + str(email):
                usuario = db.collection('usuario').where(filter=FieldFilter(
                    "email", "==", email)).get()
                if len(usuario) > 0:
                    usuario = usuario[0].to_dict()
                    return {'data': usuario}
                return {'data': []}
        usuario = [x.to_dict() for x in db.collection('usuario').get()]
        if len(usuario) > 0:
            return {'data': usuario}

        return {'data': []}

    def put(self, email=None):
        if email is not None:
            nome = request.json['nome']
            descricao = request.json['descricao']
            foto = request.json['foto']
            status = request.json['status']
            email = request.json['email']
            grupo = request.json['grupo']

            if request.path == "/v1/public/usuarios/" + str(email):
                usuario_db = db.collection('usuario').where(filter=FieldFilter(
                    "email", "==", email)).get()
                if len(usuario_db) > 0:
                    usuario = _Usuario(nome, descricao, foto, status, grupo, email, usuario_db[0].get(
                        'created_at'), usuario_db[0].get('id'))
                    usuario_set = usuario_db[0].reference

                    usuario_set.set(usuario.get_usuario())
                    return {'message': 'usuario atualizada com sucesso!', 'status': 200}
                return Response(status=200)


class Historico (Resource):

    def post(self, id=None):
        try:
            if id is None or id == 0:
                usuario = request.json['usuario']
                descricao = request.json['descricao']

                created_at = Utils().get_date()
                historico = _Historico(usuario, descricao, created_at)

                db.collection('historico').add(historico.get_historico())
                return {'message': 'historico adicionada com sucesso!', 'status': 200}
        except:
            return Response(status=400)

    def get(self, id=None):
        if id is not None:
            if request.path == "/v1/public/historicos/" + str(id):
                historico = db.collection('historico').where(filter=FieldFilter(
                    "id", "==", id)).get()
                if len(historico) > 0:
                    historico = historico[0].to_dict()
                    return {'data': historico}
                return {'data': []}
        historico = [x.to_dict() for x in db.collection('historico').get()]
        if len(historico) > 0:
            return {'data': historico}

        return {'data': []}


routes_conta = [
    '/v1/public/contas',
    '/v1/public/contas/<int:id>',
    '/v1/public/contas/<int:id>/campanhas',
]

api.add_resource(Conta, *routes_conta)

routes_empresa = [
    '/v1/public/empresas',
    '/v1/public/empresas/<int:id>',
    '/v1/public/empresas/<int:id>/contas',
]
api.add_resource(Empresa, *routes_empresa)

routes_campanha = [
    '/v1/public/campanhas',
    '/v1/public/campanhas/<int:id>',
    '/v1/public/campanhas/<int:id>/posts',
]
api.add_resource(Campanha, *routes_campanha)

routes_post = [
    '/v1/public/posts',
    '/v1/public/posts/<int:id>',
    '/v1/public/posts/<int:id>/posts',
]
api.add_resource(Post, *routes_post)

routes_usuario = [
    '/v1/public/usuarios',
    '/v1/public/usuarios/<string:email>'
]
api.add_resource(Usuario, *routes_usuario)

routes_historico = [
    '/v1/public/historicos',
    '/v1/public/historicos/<int:id>',
]
api.add_resource(Historico, *routes_historico)


if __name__ == '__main__':
    app.run()
