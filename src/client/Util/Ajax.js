import axios from 'axios'

const get = (url) => {
    //console.log('the token:', sessionStorage.getItem('AppreciateJWT'));
    const request = axios({method: 'get', url: url,
        responseType:'JSON'
        //headers:{"authorization": "bearer" + sessionStorage.getItem('AppreciateJWT'),"testing":"123"}
        })
    request
        .then(result => console.log('ajax firing: '+ result))
        .catch(error => console.log('ajax error: '+ error))
    return request;
}

const post = (url, formData) => {

    const request = axios({url:url,
        method: 'post',
        data: formData,
        config: { 
            headers: {"Authorization": 'Bearer'+ sessionStorage.getItem('AppreciateJWT'),
                      "Content-Type": "multipart/form-data"}},
        responseType:'json'})  
        request
            .then(result => console.log('ajax firing: '+ result))
            .catch(error => console.log('ajax error: '+ error))
    return request;
        /*
        .then((res) => {
            if(res.data.success){
              this.setState({
                  success: res.data.success,
                  userNotify: res.data.userNotify
                })
            }
            if(res.data.error){
              console.log('error: '+ res.data.error);
              this.setState({
                  error: res.data.error
              })
            };
        })
*/
}


export default {get, post};