import Ajax from './Ajax'

const checkLoginState = () => {
    return new Promise((resolve, reject) => {
        Ajax.get(process.env.BASE_URL + "/users/checkLoginState")
            .then(res => {
                console.log('userdata: ', res.data.userData);
                if (typeof res.data.userData === 'undefined') {
                    resolve('not logged in');
                } else {
                    resolve(res.data.userData);
                }
            })
            .catch(e => { reject('error checking login state: ', e) });
    });
}

export default checkLoginState;