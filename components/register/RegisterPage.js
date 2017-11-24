import React, {Component} from 'react';
import RegitsterIndex from './RegisterIndex';
import RegisterCode from './RegisterCode';
import ForgetPassword from './ForgetPassword';
import SignIn from './SignIn';
import {
    getCodeImage,
    getVerifyCode,
    postSignIn,
    postLogin,
    resetPassword,
} from '../../api/registerApi';
import BaseComponent from '../BaseComponent';

const captchaImgUrl = getCodeImage();

export default class RegisterPage extends BaseComponent {
    state = {
        show: 'index',
        codeLogin: false,
        passwordLogin: false,
        forgetPassword: false,
        signIn: false,
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "register"]);
    }

    render() {
        this.statisticsPv('RegisterPage');
        let content = <RegitsterIndex
            postLogin={postLogin}
            codeLogin={() => this.setState({codeLogin: true, passwordLogin: false})}
            forgetPassword={() => this.setState({passwordLogin: false, forgetPassword: true})}
            signIn={() => this.setState({passwordLogin: false, signIn: true})}
        />
        if (this.state.codeLogin) {
            content = <RegisterCode
                postLogin={postLogin}
                getVerifyCode={getVerifyCode}
                passwordLogin={() => this.setState({
                    passwordLogin: true,
                    forgetPassword: false,
                    codeLogin: false,
                    signIn: false
                })}
                signIn={() => this.setState({passwordLogin: false, codeLogin: false,forgetPassword: false,signIn: true})}
            />

        } else if (this.state.passwordLogin) {

            content = <RegitsterIndex
                postLogin={postLogin}
                codeLogin={() => this.setState({codeLogin: true, passwordLogin: false})}
                forgetPassword={() => this.setState({passwordLogin: false, forgetPassword: true})}
                signIn={() => this.setState({passwordLogin: false, signIn: true})}
            />

        } else if (this.state.forgetPassword) {

            content = <ForgetPassword
                postLogin={postLogin}
                resetPassword={resetPassword}
                passwordLogin={() => this.setState({
                    passwordLogin: true,
                    forgetPassword: false,
                    codeLogin: false,
                    signIn: false
                })}
                signIn={() => this.setState({passwordLogin: false, codeLogin: false,forgetPassword: false,signIn: true})}
            />

        } else if (this.state.signIn) {

            content = <SignIn
                captchaImgUrl={captchaImgUrl}
                getVerifyCode={getVerifyCode}
                postSignIn={postSignIn}
                postLogin={postLogin}
                passwordLogin={() => this.setState({
                    passwordLogin: true,
                    forgetPassword: false,
                    codeLogin: false,
                    signIn: false
                })}
            />

        }
        return (
            <div style={{marginTop: '0.76rem'}}>
                {content}
            </div>
        )
    }
}
