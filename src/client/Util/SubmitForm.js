import Validate from './Validate'
import SetUrl from './SetUrl'
import Ajax from './Ajax'

class SubmitForm {
    constructor(formData, ValRules, url) {
        this.error = {}
        this.returnData = {}
        this.formData = formData
        this.ValRules = ValRules
        this.url = url
        this.validate()
    }

    setError = (label, val) => {
        let newErrors = Object.assign({}, this.error)
        newErrors[label] = val
        this.error = newErrors
    }

    setReturnData = (label, val) => {
        let newReturnData = Object.assign({}, this.returnData)
        newReturnData[label] = val
        this.returnData = newReturnData
    }

    finish = (data) => {
        return({error: this.error, returnData: this.returnData, data: data})
    }

    //validate the inputs first
    validate = () => {
        let val = new Validate(this.formData, this.ValRules);
        let prom = val.isError();
        prom.then((error) => {
            this.submitData()
            /*
            if (error.hasError) {
                this.setError('userNotify', error)
            } else {
                this.setReturnData('userNotify', {})
        
            }
            */
        })
    }

    submitData = () => {
        //console.log('promise running')
        return new Promise((resolve, reject) => {
        Ajax.post(SetUrl() + this.url, this.formData)
            .then((resp) => {
                //console.log('resp in SubmitForm: ', resp.data)
                resolve(this.returnData(resp.data))
                reject(this.setError('error', resp.error)
            });
        })
    }
}

export default SubmitForm;