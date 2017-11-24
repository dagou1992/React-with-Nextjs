import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import Router from 'next/router';

import * as Mean from '../../static/static_name';
import {getMyInfo, logout} from '../../api/userApi';
import ActionList from './ActionList';
import BaseComponent from '../BaseComponent';

const alert = Modal.alert;

export default class UserPage extends BaseComponent {
    state = {
        user: {},
    }

    componentDidMount() {
        this.statisticsPv('UserPage')
        this.loadingToast('加载中...', 2);
        getMyInfo().then(res => {
            this.loadingToast('加载中...', 0.01);
            this.setState({user: res})
        }).catch(err => {
            this.loadingToast('加载中...', 0.01);
        })
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "user"]);
    }

    logout() {
        if (this.state.user.phone) {
            alert('', '确定注销吗？', [{text: '取消'}, {
                text: '确定', onPress: () => {
                    this.loadingToast('正在注销...', 5);
                    logout().then(res => {
                        this.loadingToast('注销成功', 1);
                        window.localStorage.removeItem('token');
                        Router.push('/');
                    })
                }
            }])
        } else {
            Router.push('/register');
            this.loadingToast('加载中...', 0.5);
            window.localStorage.setItem('backUrl', window.location.pathname)
        }
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <div className="useHeader">
                    <h1 onClick={() => this.logout()}>{this.state.user.phone ? '注销' : '登录'}</h1>
                    <img src={Mean.ICON_USER_HEAD} alt=""/>
                    <h4>{this.state.user.phone ? this.state.user.phone : '未登录'}</h4>
                </div>
                <ActionList/>
                <style jsx global>{`
                    .useHeader{
                        width: 100%;
                        height: 3.94rem;
                        background-image: url('https://app-public.oss-cn-shanghai.aliyuncs.com/tom/bg_header.png');
                        background-size: 100% 100%;
                        text-align: center;
                    }
                    .useHeader h1{
                        text-align: right;
                        font-size: 0.3rem;
                        color: #fff;
                        padding: 0.3rem;
                    }
                    .useHeader img{
                        width: 1.7rem;
                        height: 1.7rem;
                    }
                    .useHeader h4{
                        color: #fff;
                        font-size: 0.36rem;
                        margin-top: 0.2rem;
                    }
                `}</style>
            </div>
        )
    }
}
