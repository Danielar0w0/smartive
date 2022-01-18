import React from 'react'
import PropTypes from 'prop-types'

export class Input extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name? props.name : '',
            value: props.value? props.value : '',
            className: props.className? props.className : '',
            error: false
        }

    }

    inputChange = (event) => {
        const value = event.target.value, name = event.target.name
        switch(name) {
            case 'username': this.validate(name, value, /^([a-zA-Z0-9.]{4,})$/, 'Invalid username (Minimum four characters)')
            break;
            case 'password': this.validate(name, value, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Insecure password (Minimum eight characters, at least one letter and one number)')
            break;
            default:
            console.warn(`Unknown field ${name}`)
        }

        this.setState({ value: value })
        this.handleChange(this.state.name, value)
    }

    validate = (name, value, validRegex, warnmsg) => {

        const invalid = !value || !validRegex.test(value)

        if(!this.state.error && invalid) {
            this.setState({ error: true })
            this.handleError(name, warnmsg)
        }else if(this.state.error && !invalid) {
            this.setState({ error: false })
            this.handleError(name)
        }
    }

    render () {
        const {handleError, handleChange, ...opts} = this.props

        this.handleError = handleError
        this.handleChange = handleChange

        if (this.state.className.startsWith("btn")) {
            return (
                <input {...opts} name={this.state.name} value={this.state.value} style={{backgroundColor: "#f76540", color: "white"}}
                       onChange={this.inputChange} className={this.state.className} />
            )
        }

        return (
            <input {...opts} name={this.state.name} value={this.state.value}
                   onChange={this.inputChange} className={this.state.className} />
        )
    }
}

// React provides a way to validate the types using PropTypes.
Input.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.string,
    value: PropTypes.string,
    handleError: PropTypes.func
}
// Note that PropType validation works for development only.
// PropType validation is to check that all the assumptions that we're making about our components are being met.
