import React from 'react'

class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = this.props.options.map(option => {
      // var d = ''
      // if (option === 'Choose One') {
      //   d = 'disabled'
      // } else {
      //   d = ''
      // }
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    var multiple
    if (this.props.multiple) {
      multiple = 'multiple'
    } else {
      multiple = ''
    }
    return (
      <div className="input-container">
        <p className="label">{this.props.label} </p>
        <p className="input-error">{this.props.error} </p>
        <select
          className="textinput"
          id={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className="textinput"
          {...multiple}
        >
          {options}
        </select>
      </div>
    )
  }
}

export default Select
