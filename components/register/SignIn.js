import React, {Component} from 'react';
import Router from 'next/router';
import {Button, InputItem, Modal} from 'antd-mobile';

import BaseComponent from '../BaseComponent';
import {getCodeImage} from '../../api/registerApi';
import * as Mean from '../../static/static_name';

const alert = Modal.alert;
const captchaImgUrl = getCodeImage();


export default class SignIn extends BaseComponent {
    state = {
        check: true,
        phone: '',
        code: '',
        verifyCode: '',
        password: '',
        countDown: false,
        countDownNum: 60,
        captchaImgUrlWithTimestamp: captchaImgUrl + '?timestamp=' + Date.now()
    }

    submit() {
        _czc.push(["_trackEvent",'注册并登录','点击', '','','']);
        const param = {
            phone: this.state.phone,
            /*verifyCode: this.state.verifyCode,
            password: this.state.password,*/
        }
        let pattern = /^[0-9]{11}$/;
        let patternOther = /^[a-zA-Z0-9]{1,16}$/;
        if (this.IsNull(param)) {
            alert('', Mean.ERROR_CONTENT, [{text: Mean.CONFIRM}])
        } else if (!pattern.test(this.state.phone)) {
            alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
        } else if (!patternOther.test(this.state.password)) {
            alert('', Mean.ERROR_PASSWORD, [{text: Mean.CONFIRM}])
        } else if (!this.state.check) {
            alert('', Mean.ERROR_DEAL, [{text: Mean.CONFIRM}])
        } else {
            this.loadingToast(Mean.LOADING, 2);
            param.password = this.Encrypt(param.password);
            this.props.postSignIn(param).then(res => {
                this.loadingToast(Mean.SIGNIN_SUCCESS, 2);
                this.props.postLogin(param,'password').then(res => {
                    this.loadingToast(Mean.LOGIN_SUCCESS, 1);
                    Router.push(window.localStorage.getItem('backUrl'));
                })
            }).catch(err => {
                if (err.code == 104) {
                    alert('', Mean.ERROR_CODE, [{text: Mean.CONFIRM}])
                } else if (err.code == 108) {
                    alert('', Mean.IS_REGISTER, [
                        {text: Mean.CANCEL, onPress: () => console.log('cancel')},
                        {text: Mean.TO_LOGIN, onPress: () => {
                            this.props.passwordLogin();
                            document.getElementsByClassName('logoHeader')[0].firstChild.innerHTML = "登 录";
                        }},
                    ])
                } else if (err.code == 109) {
                    alert('', Mean.ERROR_PHONECODE, [{text: Mean.CONFIRM}])
                }
            })
        }
    }

    render() {
        return (
            <div className="SignIn">
                <img className="logo" src={Mean.LOGO}/>
                <h1>{Mean.SET_USERPASSWORD}</h1>
                <InputItem
                    placeholder={Mean.INPUT_PHONE}
                    onChange={(value) => {
                        this.setState({phone: value})
                    }}/>
                {/*<InputItem
                    className="codeInput"
                    placeholder={Mean.INPUT_CODE}
                    onChange={(value) => {
                        this.setState({code: value})
                    }}/>
                <img className="code" src={this.state.captchaImgUrlWithTimestamp} alt="" onClick={() => {
                    this.setState({captchaImgUrlWithTimestamp: captchaImgUrl + '?timestamp=' + Date.now()});
                }}/>
                <InputItem
                    className="codeInput"
                    placeholder={Mean.INPUT_PHONE_CODE}
                    onChange={(value) => {
                        this.setState({verifyCode: value})
                    }}/>
                <span className="phoneCode" onClick={() => this.getCodes('0')}>{Mean.GET_CODE}</span>*/}
                <h1>{Mean.SET_PASSWORD}</h1>
                <InputItem
                    placeholder={Mean.ALERT_PASSWORD}
                    type="password"
                    onChange={(value) => {
                        this.setState({password: value})
                    }}/>
                <p>
                    <img
                        src={this.state.check ? Mean.CHECK : Mean.NO_CHECK}
                        onClick={() => {
                            this.setState({check: !this.state.check})
                        }}
                    />
                    <span>{Mean.AGREE} <span style={{color: '#3CB9FB',textDecoration: 'underline'}} onClick={() => {
                        this.loadingToast(Mean.LOADING, 1);
                        Router.push('/userAgree')
                    }}>{Mean.AGREEMOENT}</span></span>
                    <span style={{float: 'right'}} onClick={() => {
                        this.props.passwordLogin();
                        document.getElementsByClassName('logoHeader')[0].firstChild.innerHTML = '登 录';
                    }}>{Mean.BACK_PASSWORD_LOGIN}</span>
                </p>
                <Button onClick={() => this.submit()}>{Mean.SIGNIN_ADN_LOGIN}</Button>
                <style jsx global>{`
                    .SignIn{
                        text-align: center;
                    }
                    .SignIn .logo{
                        width: 1.5rem;
                        margin-top: 0.6rem;
                        margin-bottom: 0.5rem;
                    }
                    .SignIn .am-input-item{
                        margin: 0rem 0.3rem 0.3rem 0.3rem;
                        min-height: 0;
                    }
                    .SignIn .codeInput{
                        width: 3.25rem;
                        display: inline-block;
                        height: 0.9rem;
                    }
                    .SignIn .codeInput input{
                       padding-top: 0.3rem;
                    }
                    .SignIn .am-input-item input{
                        font-size: 0.24rem;
                    }
                    .SignIn .am-list-item.am-input-item:after{
                        border: 0;
                    }
                    .SignIn .code{
                        width: 1.6rem;
                        height: 0.9rem;
                        margin: 0;
                        vertical-align: top;
                        margin-right: 0.3rem;
                    }
                    .SignIn .phoneCode{
                        width: 1.6rem;
                        font-size: 0.24rem;
                        color: #C3221B;
                        height: 0.88rem;
                        display: inline-block;
                        line-height: 0.9rem;
                        border: 1px solid #ddd;
                        margin-right: 0.3rem;
                        vertical-align: top;
                        background: #fff;
                    }
                    .SignIn .am-button{
                        background: #C3221B;
                        height: 1rem;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        border-radius: 0;
                    }
                    .SignIn .am-button span{
                        color: #fff;
                        font-size: 0.3rem;
                    }
                    .SignIn h1{
                        font-size: 0.3rem;
                        text-align: left;
                        margin: 0 0.3rem 0.3rem 0.3rem;
                    }
                    .SignIn p{
                        font-size: 0.24rem;
                        text-align: left;
                        padding: 0 0.3rem;
                        vertical-align: bottom;
                        margin-bottom: 2rem;
                    }
                    .SignIn p img{
                        width: 0.3rem;
                        height: 0.3rem;
                        vertical-align: bottom;
                        margin-right: 0.2rem;
                    }
                    .SignIn p span:last-child{
                        vertical-align: bottom;
                    }
                `}</style>
            </div>
        )
    }
}


