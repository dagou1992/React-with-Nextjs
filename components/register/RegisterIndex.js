import React, {Component} from 'react';
import Router from 'next/router';
import {Button, InputItem, Modal} from 'antd-mobile';

import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';

const alert = Modal.alert;

export default class registerIndex extends BaseComponent {
    state = {
        phone: '',
        password: '',
    }

    submit() {
        let pattern = /^[0-9]{11}$/;
        let patternOther = /^[a-zA-Z0-9]{1,16}$/;
        if (this.state.phone == '' || this.state.password == '') {
            alert('', Mean.ERROR_PHONE_OR_PASSWORD, [{text: Mean.CONFIRM}])
        } else if (!pattern.test(this.state.phone)) {
            alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
        } else if (!patternOther.test(this.state.password)) {
            alert('', Mean.ERROR_PASSWORD, [{text: Mean.CONFIRM}])
        } else {
            const param = {
                phone: this.state.phone,
                password: this.state.password,
            }
            param.password = this.Encrypt(param.password);
            this.loadingToast(Mean.LOADING_LOGIN, 10);
            this.props.postLogin(param, 'password').then(res => {
                Router.push(window.localStorage.getItem('backUrl') ? window.localStorage.getItem('backUrl') : '/');
            }).catch(err => {
                this.loadingToast(Mean.LOADING, 0.5);
                if (err.code == 102) {
                    alert('', Mean.ERROR_USER, [{text: Mean.CONFIRM}])
                }else if (err.code == 103) {
                    alert('', Mean.ERROR_PASSWORD_FAULT, [{text: Mean.CONFIRM}])
                }
            })
        }
    }

    render() {
        return (
            <div className="registerIndex">
                <img src={Mean.LOGO} alt=""/>
                <InputItem
                    placeholder={Mean.INPUT_PHONE}
                    onChange={(value) => {
                        this.setState({phone: value})
                    }}/>
                <InputItem
                    placeholder={Mean.INPUT_PASSWORD}
                    type="password"
                    onChange={(value) => {
                        this.setState({password: value})
                    }}/>
                <p onClick={() => {
                    this.props.forgetPassword();
                }}>{Mean.FORGET_PASSWORD}<span onClick={() => this.props.codeLogin()}>{Mean.TO_PHONE_CODE_LOGIN}</span>
                </p>
                <Button onClick={() => this.submit()}>{Mean.LOGIN}</Button>
                <h1>{Mean.NO_USER}<span onClick={() => {
                    _czc.push(["_trackEvent",'现在注册','点击', '','','']);
                    this.props.signIn();
                    document.getElementsByClassName('logoHeader')[0].firstChild.innerHTML = Mean.REGISTER;
                }}>{Mean.NOW_REGISTER}</span></h1>
                <style jsx global>{`
                    .registerIndex{
                        text-align: center;
                    }
                    .registerIndex img{
                        width: 1.5rem;
                        margin-top: 0.6rem;
                        margin-bottom: 0.5rem;
                    }
                    .registerIndex .am-input-item{
                        margin: 0.3rem;
                    }
                    .registerIndex .am-input-item input{
                        font-size: 0.24rem;
                    }
                    .registerIndex .am-list-item.am-input-item:after{
                        border: 0;
                    }
                    .registerIndex p{
                        text-align: left;
                        font-size: 0.24rem;
                        opacity: 0.7;
                        padding: 0 0.6rem;
                        padding-bottom: 0.5rem;
                    }
                    .registerIndex p span{
                        float: right;
                    }
                    .registerIndex .am-button{
                        background: #C3221B;
                        height: 1rem;
                        border-radius: 0;
                    }
                    .registerIndex .am-button span{
                        color: #fff;
                        font-size: 0.3rem;
                    }
                    .registerIndex h1{
                        font-size: 0.26rem;
                        opacity: 0.7;
                        text-align: center;
                        margin-top: 0.5rem;
                    }
                    .registerIndex h1 span{
                        color: #3CB9FB;
                        opacity: 1;
                    }
                `}</style>
            </div>
        )
    }
}

