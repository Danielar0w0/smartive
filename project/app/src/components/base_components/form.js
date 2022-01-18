import React from 'react'
import PropTypes from 'prop-types'
import {Input} from "./input";
import Row from "react-bootstrap/Row";
import {RestAPIHandler} from "../../utils/RestAPIHandler";

export class Form extends React.Component {

    constructor(props) {
        super(props)

        this.apiHandler = new RestAPIHandler();
        if(props.error) {
            this.state = {
                inputs: props.inputs,
                failure: 'Wrong username or password!',
                errcount: 0
            }
        } else {
            this.state = {
                inputs: props.inputs,
                errcount: 0
            }
        }
    }

    handleError = (field, errmsg) => {
        if(!field) return

        if(errmsg) {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount + 1,
                errmsgs: {...prevState.errmsgs, [field]: errmsg}
            }))
        } else {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount===1? 0 : prevState.errcount-1,
                errmsgs: {...prevState.errmsgs, [field]: ''}
            }))
        }
    }

    handleChange = (name, value) => {
        let new_inputs = this.state.inputs
        for (let i in new_inputs) {
            if (new_inputs[i].name === name) {
                new_inputs[i].value = value
            }
        }
        this.setState(( {inputs: new_inputs} ))
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if(!this.state.errcount) {

            let username = ''
            let password = ''

            let inputs = this.state.inputs

            for (let i in inputs) {
                if (inputs[i].name === 'username')
                    username = inputs[i].value
                if (inputs[i].name === 'password')
                    password = inputs[i].value
            }

            if (username !== '' && password !== '') {
                this.apiHandler.login({username: username, password: password})
                    .then(success => {
                        if (success) {
                            console.log("Successful login!")
                        }
                        else
                            console.log("Unsuccessful login!")
                    })
            }
        }
    }

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure
                || Object.values(this.state.errmsgs).find(v=>v)
            return <div className="error small">{errmsg}</div>
        }
    }

    render() {
        const inputs = this.props.inputs.map(
            ({name, placeholder, type, value, className}, index) => (
                <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={className} handleError={this.handleError} handleChange={this.handleChange} />
            )
        )

        const errors = this.renderError()
        return (
            <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
                <Row className="justify-content-center d-flex">
                {inputs}
                {errors}
                </Row>
            </form>
        )
    }
}

Form.propTypes = {
    name: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    inputs: PropTypes.array,
    error: PropTypes.string
}