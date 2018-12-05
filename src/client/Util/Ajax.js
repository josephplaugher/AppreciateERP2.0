import axios from 'axios'

const get = (url) => {
    const request = axios({
        withCredentials: true,
        method: 'get', url: url,
        responseType: 'JSON',
        headers: 
            { 
            authorization: 'Bearer ' + sessionStorage.getItem('AppCoToken')
            }
    })
    request
        .catch(error => console.log('ajax error: ' + error))
    return request;
}

const post = (url, formData) => {

    const request = axios({
        withCredentials: true,
        url: url,
        method: 'post',
        data: formData,
        headers: 
            { 
            "Content-Type": "multipart/form-data",
            authorization: 'Bearer ' + sessionStorage.getItem('AppCoToken')
            },
        responseType: 'json'
    })
    request
        .catch(error => console.log('ajax error: ' + error))
    return request;
}


export default { get, post };