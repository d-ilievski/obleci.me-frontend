import React, {Component} from 'react';
import classes from './Login.css';
import AuthService from '../../components/Authentication/AuthService/AuthService';
import LoginBackground from '../../components/LoginBackground/LoginBackground';
import Auxiliary from '../../hoc/Auxiliary';
import Modal from '../../components/Modal/Modal';

class Login extends Component {

    state = {
        registerOpen: false
    }

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
        this.setState({
            [
                event
                    .target
                    .name
                    .toString()
                    .charAt(0)
            ]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        //console.log("Login 30 : ", this.state.u, this.state.p)

        this
            .props
            .handleLoginSubmit(this.state.u, this.state.p)
            .then(res => {
                this
                    .props
                    .loginStateHandler(true);

                return res;
            })
            .then(res => {
                this
                    .props
                    .history
                    .replace('/ad/create');
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRegister = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8080/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'u': this.state.u, 'p': this.state.p, 'n': this.state.n, 's': this.state.s, 'e': this.state.e})
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                this
                    .props
                    .history
                    .replace('/');
            }
            return response;
        }).catch(err => {
            console.log(err);
        });
    }

    registerClickHandler = () => {
        this.toggleModal();

    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                registerOpen: !prevState.registerOpen
            }
        })
    }

    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.registerOpen} toggleModal={this.toggleModal}>
                    <form onSubmit={this.handleRegister}>
                        <label className={classes.Label}>Име:
                        </label>
                        <input
                            autoFocus
                            className={classes.FormItem}
                            name="n"
                            type="text"
                            onChange={this.handleChange}/>
                        <label className={classes.Label}>Презиме:
                        </label>
                        <input
                            className={classes.FormItem}
                            name="s"
                            type="text"
                            onChange={this.handleChange}/>
                        <label className={classes.Label}>Email:
                        </label>
                        <input
                            className={classes.FormItem}
                            name="e"
                            type="text"
                            onChange={this.handleChange}/>

                        <label className={classes.Label}>Корисничко име:
                        </label>
                        <input
                            className={classes.FormItem}
                            name="u"
                            type="text"
                            onChange={this.handleChange}/>

                        <label className={classes.Label}>Лозинка:
                        </label>
                        <input
                            className={classes.FormItem}
                            name="p"
                            type="password"
                            onChange={this.handleChange}/>

                        <label className={classes.Label}>Со притискање на копчето за регистрација се
                            согласувам дека ќе ги почитувам правилата и условите на страницата.</label>
                        <input className={classes.LoginButton} value="Регистрирај се!" type="submit"/>
                    </form>
                </Modal>
                <div className={classes.Login}>
                    <form onSubmit={this.handleSubmit}>
                        <label className={classes.Label}>Корисничко име:</label>
                        <input
                            autoFocus
                            className={classes.FormItem}
                            placeholder="Вашето корисничко име..."
                            name="u"
                            type="text"
                            onChange={this.handleChange}/>
                        <label className={classes.Label}>Лозинка:</label>
                        <input
                            className={classes.FormItem}
                            placeholder="Вашата лозинка..."
                            name="p"
                            type="password"
                            onChange={this.handleChange}/>
                        <input className={classes.LoginButton} value="Влез" type="submit"/>
                        <label className={classes.Label}>Нов корисник?</label>
                        <label className={classes.RegisterLabel} onClick={this.registerClickHandler}>Регистрирај се!</label>
                    </form>
                </div>
                <LoginBackground/>
            </Auxiliary>
        );
    }
}

export default Login;