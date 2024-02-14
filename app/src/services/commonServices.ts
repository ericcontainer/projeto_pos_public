import { urlendpoint } from "../confs/conf"
import { CampanhaProps, ContaProps, EmpresaProps, HistoricoProps, PostProps, UsuarioProps } from "../entidades/iterfaces"




export const getEmpresaService = async () => {
    const response = await fetch(
        urlendpoint + "/empresas",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
}
export const setEmpresaService = async (empresaProps : EmpresaProps) => {

    const response = await fetch(
        // "https://mockbin.com/bin/b5d1e2ec-8ee9-438b-8eca-15e287186160",
        urlendpoint + "/empresas",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(empresaProps),
        }
        );
    return response;
}
export const updateEmpresaService = async (empresaProps : EmpresaProps ) => {

    const response = await fetch(
        urlendpoint + "/empresas/" + empresaProps?.id ,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(empresaProps),
        }
        );
    return response;
}

export const setContaService = async (contaProps : ContaProps) => {

    const response = await fetch(
        urlendpoint + "/contas",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(contaProps),
        }
        );
    return response;
}

export const updateContaService = async (contaProps : ContaProps) => {

    const response = await fetch(
        urlendpoint + "/contas/" + contaProps.id,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(contaProps),
        }
        );
    return response;
}

export const getContaService = async () => {

    const response = await fetch(
        urlendpoint + "/contas",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );
    return response;
}

export const getContaByIDService = async (id : string) => {

    const response = await fetch(
        urlendpoint + "/contas/" + id,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );
    return response;
}

export const getCampanhaService = async () => {
    const response = await fetch(
        urlendpoint + "/campanhas",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
}
export const getCampanhaByIDService = async (id: string) => {
    const response = await fetch(
        urlendpoint + "/campanhas/" + id,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
}
export const setCampanhaService = async (campanhaProps : CampanhaProps) => {

    const response = await fetch(
        // "https://mockbin.com/bin/b5d1e2ec-8ee9-438b-8eca-15e287186160",
        urlendpoint + "/campanhas",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(campanhaProps),
        }
        );
    return response;
}
export const updateCampanhaService = async (campanhaProps : CampanhaProps) => {

    const response = await fetch(
        urlendpoint + "/campanhas/" + campanhaProps.id,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(campanhaProps),
        }
        );
    return response;
}

export const setHistoricoService = async (historicoProps : HistoricoProps) => {    

    const response = await fetch(
        urlendpoint + "/historicos/" + historicoProps.id,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(historicoProps),
        }
        );
    return response;
}
export const getHistoricoService = async () => {
    const response = await fetch(
        urlendpoint + "/historicos",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
}


export const getPostService = async () => {
    const response = await fetch(
        urlendpoint + "/posts",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
}
export const setPostService = async (postProps : PostProps) => {

    const response = await fetch(
        // "https://mockbin.com/bin/b5d1e2ec-8ee9-438b-8eca-15e287186160",
        urlendpoint + "/posts",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(postProps),
        }
        );
    return response;
}
export const updatePostService = async (postProps : PostProps) => {

    const response = await fetch(
        urlendpoint + "/posts/" + postProps.id,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(postProps),
        }
        );
    return response;
}


export const getUsuarioService = async (email? : string) => {
    if (email == undefined){

        const response = await fetch(
            urlendpoint + "/usuarios",
            
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },           
            }
            );
        return response;
    }
    const response = await fetch(
        urlendpoint + "/usuarios/" + email,
        
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },           
        }
        );
    return response;
    
}
export const setUsuarioService = async (userProps : UsuarioProps) => {

    const response = await fetch(
        urlendpoint + "/usuarios",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userProps),
        }
        );
    return response;
}
export const updateUsuarioService = async (userProps : UsuarioProps) => {

    const response = await fetch(
        urlendpoint + "/usuarios/" + userProps.email,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userProps),
        }
        );
    return response;
}

export const createSchedule = async (file: File[], scheduleProps: PostProps, user_social_media: string, password_social_media: string) => {
    let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };
    let bodyContent = new FormData();
  
    const normalDate = scheduleProps.data_publicacao.toString() || "0000-00-00T00:00";
    const formatData =
    normalDate.split("-")[2].split("T")[0] +
    normalDate.split("-")[1] +
    normalDate.split("-")[0] +
    normalDate.split("-")[2].split("T")[1].split(":")[0] +
    normalDate.split("-")[2].split("T")[1].split(":")[1];

    bodyContent.append("password_social_media", user_social_media);
    bodyContent.append("user_social_media", password_social_media);
    bodyContent.append("caption", scheduleProps.texto);
    bodyContent.append("method", "POST");
    bodyContent.append(
    "endpoint",
    "http://localhost:5001/v1/public/instaposts"
    );
    bodyContent.append("start_date", formatData);
    bodyContent.append("description", "MinhaDescription");
    bodyContent.append("user", "Username");
    bodyContent.append("return_request", "request");

    file.forEach((f, i) => {

        bodyContent.append("file_" + i.toString(), f, f.name);
    })
    return await fetch("http://localhost:5000/v1/public/schedules", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
    });
}
export const removeScheduleService = async (id : number) => {

    const response = await fetch(
        urlendpoint + "/schedules/" + id,
        {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            }
        }
        );
    return response;
}