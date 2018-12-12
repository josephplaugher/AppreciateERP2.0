import Ajax from './Ajax'

const checkLoginState = () => {
    return new Promise((resolve, reject) => {
        Ajax.get(process.env.BASE_URL + "/checkLoginState")
            .then(res => {
                resolve(res.headers);
            })
            .catch(e => { reject('error checking login state: ', e) });
    });
}

export default checkLoginState;