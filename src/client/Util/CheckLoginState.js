import Ajax from './Ajax'

const checkLoginState = () => {
    return new Promise((resolve, reject) => {
        Ajax.get(process.env.BASE_URL)
            .then(res => {
                resolve(res.data.userData);
            })
            .catch(e => { reject('error checking login state: ', e) });
    });
}

export default checkLoginState;