import React from 'react';
  
class CheckBox extends React.Component {

  render() {

      return (
        <div className="input-container">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <input className="textinput" 
          type="checkbox"
          id={this.props.id} 
          name={this.props.name} 
          checked={this.props.checked}
          onChange={this.props.onChange}
          className="checkbox"
        />
        </div>
      );
    }
  }  

export default CheckBox;