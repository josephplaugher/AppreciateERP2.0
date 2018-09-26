import Ajax from './Ajax'

const checkLoginState = () => {
    return new Promise((resolve, reject) => {
        Ajax.get("http://localhost:3004/users/checkLoginState")
            .then(res => {
                if (typeof res.data.userData === 'undefined') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .catch(e => { reject('error checking login state: ', e) });
    });
}

export default checkLoginState;