ProcessForm = function(route,setState,lsr){
    this.route = route;
    this.setState = state;
    if(lsr){
        this.lsr = lsr;
    }
}   
 
 ProcessForm.prototype = {
    onChange: function(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var lsSource = [name][0];
    //clear the error on resume typing
    let clEr = Object.assign({}, this.state.userNotify);
    clEr[name] = '';
    this.setState = ({
      userNotify: clEr,
      lsSource: lsSource
    });
    //place updated data into state
    this.rebuildFormData(name,value,lsSource);
    //run live search if applicable to current input, not othewise
    if(this.lsr){
        let ls = new LiveSearch();
        let list = ls.getLSA(); 
        if(list.includes(name)){
            this.runLiveSearch(name, value, lsSource);
        }   
    }
  },

  rebuildFormData: function(name,value,lsSource) {
    //place updated data into state
    let newVals = Object.assign({}, this.state.formData);
    newVals[name] = value;
    this.setState({
      [name]: value,
      lsSource: name,
      formData: newVals
    });
  },

  runLiveSearch: function(name, value, lsSource) {
    //get a list of options as the user types ,like Google live search
    //set the name of the location to place the search result. The inputs must have a "lsr={this.state.lsr}""
    let targetField = 'lsr' + lsSource;
    let ls = new LiveSearch();
    let list = ls.getLSA(); 
    console.log('list: ',list);
    //first, if the input change leaves the field blank, clear the options list
    if(value === ''){
      this.setState({
        [targetField]: ''
      });
    //if the input value is not blank, fetch the options
    }else{
      if(list.includes(name)){
        let prom = ls.search(name, value);
        prom.then( (res) => {
          this.setLSRList(res,targetField);
        })
      }
    }//else
  },

  setLSRList: function(res, targetField) {
    console.log('lsr:',res);
    //if there is not result, set a message for that, else, set the results into state
    let list = res.data.results;
    let newList;
    if(res.data.nr){ 
      newList = res.data.nr;
    }else{
      newList = list.map((item) => 
      <p className="lsr" onClick={(event)=> this.lsrSelect(event)} id={item[Object.keys(item)[0]]}>{item[Object.keys(item)[0]]}</p>
        );
      console.log('new list:',newList);
    }
    //place the "list" value into state
      this.setState({
        [targetField]: newList
      });
  },

  lsrSelect: function(event) {  
    //get the value of the clicked search result and place it into the form field
    //then clear the search result list
    let input = this.state.lsSource;
    let toClear = 'lsr' + [input];
    this.setState({
      [toClear]: ''
    });
    this.rebuildFormData(input,event.target.id,input);
    this.autoFill(input, event.target.id);
  },

  autoFill: function (id, val) {
    const autofill = new AutoFill();
    var dest = autofill.getRef(id);
    console.log('dest: ', dest);
    Ajax.get("http://localhost:3004/autofill/" + id + "/"+ val)
    .then((res) => {
      if(res.data.results){
        let obj = res.data.results;
        let val;
        for(var key in obj) {
          val = obj[key];
        }
        this.rebuildFormData(dest,val);
      }
    })
  },

  onSubmit: function(event) {
    event.preventDefault();
    let val = new validate(this.state.formData);
    let prom = val.getPromise();
    prom.then( (error) => {
      console.log('the error: ',error);
        if(error.hasError){ 
          this.setState({
            userNotify: error,
            validForm: false
          })
        }
        if(!error.hasError){
          this.setState({
            validForm: true
          })
          console.log('about to submit...');
          this.submitData();
        }
      }) 
  },

  submitData: function() {
    console.log('submitting now...');
    Ajax.post("http://localhost:3004/"+ this.route + "/", this.state.formData)
    .then((res) => {
      if(res.data.success){
        this.setState({
            success: res.data.success,
            userNotify: res.data.userNotify
          })
      }
    })
  }
}

module.exports = ProcessForm;