
from utils import Utils


class Empresa(object):
    def __init__(self, nome, descricao, created_at, status, cnpj, contas=[], id=None):
        print('Empresa')
        self.id = int(Utils().generate_id()) if id is None or id == 0 else id
        self.nome = nome
        self.descricao = descricao
        self.created_at = created_at
        self.updated_at = Utils().get_date()
        self.status = status
        self.cnpj = cnpj
        self.contas = contas

    def get_empresa(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "status": self.status,
            "cnpj": self.cnpj,
            "contas": self.contas
        }


class Conta(Empresa):

    def __init__(self, nome, descricao, tipo, usuario, senha, status, created_at, id_empresa, campanhas=[], id=None):
        self.id = int(Utils().generate_id()) if id is None or id == 0 else id
        self.nome = nome
        self.descricao = descricao
        self.tipo = tipo
        self.usuario = usuario
        self.senha = senha
        self.status = status
        self.created_at = created_at
        self.updated_at = Utils().get_date()
        self.id_empresa = id_empresa
        self.campanhas = campanhas
        

    def get_conta(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "tipo": self.tipo,
            "usuario": self.usuario,
            "senha": self.senha,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "id_empresa": self.id_empresa,
            "campanhas": self.campanhas,
            
        }


class Campanha(object):

    def __init__(self, nome, descricao, data_inicio, data_fim, created_at, status, id_conta, posts=[], id=None):
        self.id = self.id = int(Utils().generate_id()
                                ) if id is None or id == 0 else id
        self.nome = nome
        self.descricao = descricao
        self.created_at = created_at
        self.updated_at = Utils().get_date()
        self.data_inicio = data_inicio
        self.data_fim = data_fim
        self.status = status
        self.id_conta = id_conta
        self.posts = posts

    def get_campanha(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "data_inicio": self.data_inicio,
            "data_fim": self.data_fim,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "status": self.status,
            "id_conta": self.id_conta,
            "posts": self.posts
        }


class Post(object):

    def __init__(self, nome, descricao, texto, imagens, data_publicacao, status, id_campanha, id_agendamento, hashtags, created_at, id=None):
        self.id = self.id = int(Utils().generate_id()
                                ) if id is None or id == 0 else id
        self.nome = nome
        self.descricao = descricao
        self.texto = texto
        self.imagens = imagens
        self.data_publicacao = data_publicacao
        self.status = status
        self.id_campanha = id_campanha
        self.id_agendamento = id_agendamento
        self.hashtags = hashtags
        self.created_at = created_at
        self.updated_at = Utils().get_date()

    def get_post(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "texto": self.texto,
            "imagens": self.imagens,
            "data_publicacao": self.data_publicacao,
            "status": self.status,
            "id_campanha": self.id_campanha,
            "id_agendamento": self.id_agendamento,
            "hashtags": self.hashtags,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class Usuario(object):

    def __init__(self, nome, descricao, foto, status, grupo, email, created_at, id=None):
        self.id = self.id = int(Utils().generate_id()
                                ) if id is None or id == 0 else id
        self.nome = nome
        self.descricao = descricao
        self.foto = foto
        self.status = status
        self.grupo = grupo
        self.email = email
        self.created_at = created_at
        self.updated_at = Utils().get_date()

    def get_usuario(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "foto": self.foto,
            "status": self.status,
            "grupo": self.grupo,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,

        }


class Historico(object):

    def __init__(self, usuario, descricao, created_at, id=None):
        self.id = self.id = int(Utils().generate_id()
                                ) if id is None or id == 0 else id
        self.usuario = usuario
        self.descricao = descricao
        self.created_at = created_at
        self.updated_at = Utils().get_date()

    def get_historico(self):
        return {
            "id": self.id,
            "usuario": self.usuario,
            "descricao": self.descricao,
            "created_at": self.created_at,
            "updated_at": self.updated_at,

        }
