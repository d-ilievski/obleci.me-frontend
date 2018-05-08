import React, {Component} from 'react';
import './Login.css';
import AuthService from '../../components/Authentication/AuthService/AuthService';

class Login extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    componentWillMount() {
        if (this.props.loggedIn) 
            this.props.history.replace('/');
        }
    
    handleChange(event) {
        //console.log({[event.target.name.toString().charAt(0)]: event.target.value})
        this.setState({[event.target.name.toString().charAt(0)]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        //console.log("Login 30 : ", this.state.u, this.state.p)

        this.props.handleLoginSubmit(this.state.u, this.state.p).then(res => {
            this
                .props
                .history
                .replace('/ad/create');
        })
        .catch(err => {
            console.log(err);
        });

        this.props.loginStateHandler(true);
    }


    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="u"
                            type="text"
                            onChange={this.handleChange}/>
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="p"
                            type="password"
                            onChange={this.handleChange}/>
                        <input className="form-submit" value="Submit" type="submit"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;