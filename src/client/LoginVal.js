const LoginVal = [
    {   mode: 'development'
    },
    {   log:{
            dev: function(data) { console.log(data)},
            prod: function(data) { console.log(data)}
            }
    },
    {
        name: 'email',
        required: true,
        email: true,
        errorMsg: 'Please enter your email address'
    },
    {
        name: 'password',
        required: true,
        alphanumeric: true,
        errorMsg: 'Please enter your password'
    }
]

export default LoginVal;