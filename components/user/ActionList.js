import React, {Component} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {List, Button} from 'antd-mobile';
import * as Mean from '../../static/static_name';
import BaseComponent from '../BaseComponent';

const actionList = [
    {
        title: '我的订单',
        href: '/myOrder',
    },
    {
        title: '我的购物车',
        href: '/shoppingCart',
    },
    {
        title: '管理地址',
        href: '/address',
    },
]

export default class ActionList extends BaseComponent {
    componentDidMount() {
    }

    render() {
        return (
            <div className="actionList">
                <List>
                    {
                        actionList.map((item, index) => {
                            return <List.Item key={index} onClick={() => this.loadingToast('加载中...', 2)}>
                                <Link href={item.href}>
                                    <a name={item.href}>{item.title}<img
                                        src={Mean.ICON_ROUND_SMALLER} alt=""/></a>
                                </Link>
                            </List.Item>
                        })
                    }
                </List>
                <Button onClick={() => {
                    this.loadingToast('加载中...', 2);
                    Router.push('/');
                }}>
                    返回首页
                </Button>
                <Button onClick={() => {
                    this.loadingToast('加载中...', 2);
                    Router.push('/FAQ');
                }}>
                    常见问题
                </Button>
                <style jsx global>{`
                    .actionList .am-list{
                        margin-top: 0.24rem;
                        margin-bottom: 1.24rem;
                    }
                    .actionList .am-list-content a{
                        display: block;
                        width: 100%;
                        color: #000;
                        opacity: 0.8;
                        font-size: 0.3rem;
                    }
                    .actionList .am-list-content a img{
                        float: right;
                        width: 0.36rem;
                    }
                    .actionList .am-button:last-child{
                        margin-top: 0.24rem;
                    }
                    .actionList .am-button span{
                        color: #000;
                        opacity: 0.8;
                        font-size: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}
