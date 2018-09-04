const checkLoginState = () => {
    if(sessionStorage.getItem('AppreciateUser')){
        return true;
    }else{
        return false;
    }
}

export default checkLoginState;