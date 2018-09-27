import axios from 'axios'

const get = (url) => {
    const request = axios({
        method: 'get', url: url,
        responseType: 'JSON'
    })
    request
        .catch(error => console.log('ajax error: ' + error))
    return request;
}

const post = (url, formData) => {

    const request = axios({
        url: url,
        method: 'post',
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        responseType: 'json'
    })
    request
        .catch(error => console.log('ajax error: ' + error))
    return request;
}


export default { get, post };