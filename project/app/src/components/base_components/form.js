import React from 'react'
import PropTypes from 'prop-types'
import {Input} from "./input";
import Row from "react-bootstrap/Row";
import {RestAPIHandler} from "../../utils/RestAPIHandler";
import store from "../../store";

export class Form extends React.Component {

    constructor(props) {
        super(props)

        this.apiHandler = new RestAPIHandler();
        if(props.error) {
            this.state = {
                name: props.name,
                inputs: props.inputs,
                failure: 'Wrong username or password!',
                errcount: 0
            }
        } else {
            this.state = {
                name: props.name,
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
            let email = ''
            let password = ''

            let inputs = this.state.inputs

            for (let i in inputs) {
                if (inputs[i].name === 'username')
                    username = inputs[i].value
                if (inputs[i].name === 'email')
                    email = inputs[i].value
                if (inputs[i].name === 'password')
                    password = inputs[i].value
            }

            if (this.state.name === "loginForm") {
                if (username !== '' && password !== '') {
                    this.login({username: username, password: password});
                }
            } else if (this.state.name === "registerForm") {
                if (username !== '' && email !== '' && password !== '') {
                    this.register({username: username, email: email, password: password});
                }
            }
        }
    }

    login(user) {
        this.apiHandler.login(user)
            .then(success => {
                if (success) {
                    setTimeout(() => {
                        window.location.replace("/");
                    }, 5000);
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Successful login." } });
                }
                else
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Unsuccessful login." } });
            })
    }

    register(user) {
        this.apiHandler.register(user)
            .then(success => {
                if (success) {
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 5000);
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Successful registration." } });
                }
                else
                    store.dispatch({ type: 'toasts/setToast', payload: { text: "Unsuccessful registration." } });
            })
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