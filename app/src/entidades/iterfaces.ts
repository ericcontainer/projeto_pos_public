
export interface EmpresaProps {
    id?: number;
    nome: string;
    descricao: string;
    status?: string;
    cnpj: string;
    contas?: Array<number>;
    created_at?: string;
    updated_at?: string;
  }
export interface ContaProps {
    id?: number;
    nome: string;
    descricao: string;
    tipo: string;
    usuario: string;
    senha: string;
    status: string;
    id_empresa?: number;
    campanhas: Array<number>;
    created_at?: string;
    updated_at?: string;
  }
  export interface CampanhaProps {
    id?: number;
    nome: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    status: string;
    id_conta?: number;
    posts: Array<number>;
    created_at?: string;
    updated_at?: string;
  }
  export interface HistoricoProps {
    id?: number;
    usuario: string;
    descricao: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface PostProps {
    id?: number;
    nome: string;
    descricao: string;
    texto: string;
    imagens: File[] | [];
    data_publicacao: string;
    status: string;
    id_campanha?: number
    id_agendamento: string;
    hashtags?: string;
    created_at?: string;
    updated_at?: string;
  }
  export interface UsuarioProps {
    id?: string;
    nome: string;
    grupo: string;
    descricao: string;
    email: string;
    foto?: string;
    status: string;
    created_at?: string;
    updated_at?: string;
  }
  