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

    finish = () => {
        return({error: this.error, returnData: this.returnData})
    }

    //validate the inputs first
    validate = () => {
        let val = new Validate(this.formData, this.ValRules);
        let prom = val.isError();
        prom.then((error) => {
            if (error.hasError) {
                this.setError('userNotify', error)
            } else {
                this.setReturnData('userNotify', {})
                //once we're happy with data, submit it
                this.submitData();
            }
        })
    }

    submitData = () => {
        Ajax.post(SetUrl() + this.url, this.formData)
        .then((resp) => {
            if(typeof resp.data.error == 'undefined') {
                console.log('resp: ', resp.data)
                this.setReturnData('response',resp.data);
                this.finish()
            } else {
                
                this.setReturnData('userNotify',resp.data.error)
                this.finish()
            }
        });
    }

}

export default SubmitForm;