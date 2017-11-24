import React, {Component} from 'react';
import Router from 'next/router';
import {Button, InputItem, Modal} from 'antd-mobile';

import * as Mean from '../../static/static_name';
import BaseComponent from '../BaseComponent';
import {getCodeImage} from '../../api/registerApi';

const captchaImgUrl = getCodeImage();
const alert = Modal.alert;

export default class RegisterCode extends BaseComponent {
    state = {
        phone: '',
        code: '',
        verifyCode: '',
        captchaImgUrlWithTimestamp: captchaImgUrl + '?timestamp=' + Date.now(),
    }

    componentDidMount() {

    }

    submit() {
        const param = {
            phone: this.state.phone,
            verifyCode: this.state.verifyCode,
        }
        let pattern = /^[0-9]{11}$/;
        if (this.IsNull(param)) {
            alert('', Mean.ERROR_CONTENT, [{text: Mean.CONFIRM}])
        } else if (!pattern.test(this.state.phone)) {
            alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
        } else {
            this.loadingToast(Mean.LOADING, 2);
            this.props.postLogin(param, 'captcha').then(res => {
                this.loadingToast(Mean.LOGIN_SUCCESS, 1);
                Router.push(window.localStorage.getItem('backUrl'));
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
            <div className="registerCode">
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
                <span className="phoneCode" onClick={() => this.getCodes('1')}>{Mean.GET_CODE}</span>
                <p onClick={() => {
                    this.props.passwordLogin();
                }}>{Mean.BACK_PASSWORD_LOGIN}</p>
                <Button onClick={() => this.submit()}>{Mean.LOGIN}</Button>
                <style jsx global>{`
                    .registerCode{
                        text-align: center;
                    }
                    .registerCode img{
                        width: 1.5rem;
                        margin-top: 0.6rem;
                        margin-bottom: 0.5rem;
                    }
                    .registerCode .am-input-item{
                        margin: 0rem 0.3rem 0.3rem 0.3rem;
                        min-height: 0;
                    }
                    .registerCode .codeInput{
                        width: 3.25rem;
                        display: inline-block;
                        height: 0.9rem;
                    }
                    .registerCode .codeInput input{
                       padding-top: 0.3rem;
                    }
                    .registerCode .am-input-item input{
                        font-size: 0.24rem;
                    }
                    .registerCode .am-list-item.am-input-item:after{
                        border: 0;
                    }
                    .registerCode .code{
                        width: 1.6rem;
                        height: 0.9rem;
                        margin: 0;
                        vertical-align: top;
                        margin-right: 0.3rem;
                    }
                    .registerCode .phoneCode{
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
                    .registerCode .am-button{
                        background: #C3221B;
                        height: 1rem;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                    }
                    .registerCode .am-button span{
                        color: #fff;
                        font-size: 0.3rem;
                    }
                    .registerCode p{
                        text-align: right;
                        font-size: 0.24rem;
                        opacity: 0.7;
                        margin-right: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}

