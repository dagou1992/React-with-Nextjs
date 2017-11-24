import React, {Component} from 'react';
import Router from 'next/router';
import {Button, InputItem, Modal} from 'antd-mobile';

import {getCodeImage} from '../../api/registerApi';
import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';

const captchaImgUrl = getCodeImage();
const alert = Modal.alert;

export default class RegisterCode extends BaseComponent {
    state = {
        phone: '',
        code: '',
        password: '',
        captchaImgUrlWithTimestamp: captchaImgUrl + '?timestamp=' + Date.now(),
    }

    submit() {
        const param = {
            phone: this.state.phone,
            verifyCode: this.state.verifyCode,
            password: this.state.password,
        }
        let pattern = /^[0-9]{11}$/;
        let patternOther = /^[a-zA-Z0-9]{1,16}$/;
        if (this.IsNull(param)) {
            alert('', Mean.ERROR_CONTENT, [{text: Mean.CONFIRM}])
        } else if (!pattern.test(this.state.phone)) {
            alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
        } else if (!patternOther.test(this.state.password)) {
            alert('', Mean.ERROR_PASSWORD, [{text: Mean.CONFIRM}])
        } else {
            this.loadingToast(Mean.LOADING, 2);
            param.password = this.Encrypt(param.password);
            this.props.resetPassword(param).then(res => {
                this.props.postLogin(param, 'password').then(res => {
                    this.loadingToast(Mean.LOGIN_SUCCESS, 1);
                    Router.push(window.localStorage.getItem('backUrl'));
                })
            }).catch(err => {
                if (err.code == 104) {
                    alert('', Mean.ERROR_CODE, [{text: Mean.CONFIRM}])
                } else if (err.code == 102) {
                    alert('', Mean.ERROR_USER, [{text: Mean.CONFIRM}])
                } else if (err.code == 109) {
                    alert('', Mean.ERROR_PHONECODE, [{text: Mean.CONFIRM}])
                }
            })
        }
    }


    render() {
        return (
            <div className="forgetPassword">
                <img src={Mean.LOGO} alt=""/>
                <InputItem
                    placeholder={Mean.INPUT_PHONE}
                    onChange={(value) => {
                        this.setState({phone: value})
                    }}/>
                <InputItem
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
                <span className="phoneCode" onClick={() => this.getCodes('2')}>{Mean.GET_CODE}</span>
                <h1>{Mean.SET_NEW_PASSWORD}</h1>
                <InputItem
                    type="password"
                    placeholder={Mean.ALERT_PASSWORD}
                    onChange={(value) => {
                        this.setState({password: value})
                    }}/>
                <p onClick={() => {
                    this.props.passwordLogin();
                }}>{Mean.BACK_PASSWORD_LOGIN}</p>
                <Button onClick={() => this.submit()}>{Mean.CONFIRM_EDIT_LOGIN}</Button>
                <style jsx global>{`
                    .forgetPassword{
                        text-align: center;
                    }
                    .forgetPassword img{
                        width: 1.5rem;
                        margin-top: 0.6rem;
                        margin-bottom: 0.5rem;
                    }
                    .forgetPassword .am-input-item{
                        margin: 0rem 0.3rem 0.3rem 0.3rem;
                        min-height: 0;
                    }
                    .forgetPassword .codeInput{
                        width: 3.25rem;
                        display: inline-block;
                        height: 0.9rem;
                    }
                    .forgetPassword .codeInput input{
                       padding-top: 0.3rem;
                    }
                    .forgetPassword .am-input-item input{
                        font-size: 0.24rem;
                    }
                    .forgetPassword .am-list-item.am-input-item:after{
                        border: 0;
                    }
                    .forgetPassword .code{
                        width: 1.6rem;
                        height: 0.9rem;
                        margin: 0;
                        vertical-align: top;
                        margin-right: 0.3rem;
                    }
                    .forgetPassword .phoneCode{
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
                    .forgetPassword .am-button{
                        background: #C3221B;
                        height: 1rem;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                    }
                    .forgetPassword .am-button span{
                        color: #fff;
                        font-size: 0.3rem;
                    }
                    .forgetPassword h1{
                        font-size: 0.3rem;
                        text-align: left;
                        margin: 0 0.3rem 0.3rem 0.3rem;
                    }
                    .forgetPassword p{
                        text-align: right;
                        font-size: 0.24rem;
                        opacity: 0.7;
                        margin-right: 0.3rem;
                        margin-bottom: 1.3rem;
                    }
                `}</style>
            </div>
        )
    }
}

