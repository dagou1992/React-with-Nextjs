import React, {Component} from 'react';
import {Modal} from 'antd-mobile';

import ActionTab from './ActionTab';
import FixedIcon from '../productDetail/FixedIcon';
import {getMyOrder} from '../../api/myOrderApi';
import BaseComponent from '../BaseComponent';

const alert = Modal.alert;

export default class MyOrderPage extends BaseComponent {
    state = {
        allOrder: [],
        doneOrder: [],
        undoneOrder: [],
        aa: false,
        current: 1,
    }

    getScrollTop(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }

    getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }

    getWindowHeight(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    componentDidMount() {
        this.loadingToast('加载中...', 10);
        getMyOrder({current: this.state.current, pageSize: 10}).then(res => {
            this.loadingToast('加载中...', 0.01);
            let undoneOrder = [], doneOrder = [];
            res.data.map((item, index) => {
                item.status == 0 ? undoneOrder.push(item) : (item.status == 1 || item.status == 4 ? doneOrder.push(item) : null)
            })
            this.setState({
                undoneOrder,
                doneOrder,
                allOrder: res.data,
            })
        }).catch(err => {
            this.loadingToast('发生错误了', 1);
        })
        this.statisticsPv('MyOrderPage');
        window.onscroll = () => {
            if(window.location.href.indexOf('myOrder') > -1 && window.localStorage.getItem('token') && this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()){
                this.loadingToast('加载中...', 10);
                getMyOrder({current: this.state.current + 1, pageSize: 10}).then(res => {
                    this.loadingToast('加载中...', 0.01);
                    if(res.data.length == 0) {
                        this.loadingToast('没有更多啦！', '2')
                    }else{
                        let allOrder = [...this.state.allOrder], undoneOrder = [...this.state.undoneOrder], doneOrder = [...this.state.doneOrder];
                        res.data.map((item, index) => {
                            item.status == 0 ? undoneOrder.push(item) : (item.status == 1 || item.status == 4 ? doneOrder.push(item) : null)
                        })
                        allOrder = allOrder.concat(res.data);
                        this.setState({
                            allOrder,
                            undoneOrder,
                            doneOrder,
                            current: this.state.current + 1,
                        })
                    }
                })
            }
        }
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "myOrder"]);
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <FixedIcon/>
                <div className="title">
                    <h1>我的订单</h1><span onClick={() => this.chatWithService()}>客服</span>
                </div>
                <ActionTab
                    undoneOrder={this.state.undoneOrder}
                    doneOrder={this.state.doneOrder}
                    allOrder={this.state.allOrder}
                />
                <style jsx global>{`
                    .title{
                        height: 0.3rem;
                        background: #fff;
                        text-align: center;
                        position: relative;
                        padding: 0.3rem;
                        border-bottom: 1px solid #ddd;
                    }
                    .title h1,span{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.8;
                        margin: 0;
                    }
                    .title span{
                        position: absolute;
                        right: 0.3rem;
                        top: 0.35rem;
                        font-size: 0.24rem;
                    }
                `}</style>
            </div>
        )
    }
}

