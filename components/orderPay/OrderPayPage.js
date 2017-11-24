import React, {Component} from 'react';
import Router from 'next/router';
import {Card, Button, Modal} from 'antd-mobile';

import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';
import {confirmPay} from '../../api/orderPayApi';
import {getPayResult} from '../../api/payResultApi';

const alert = Modal.alert;

export default class OrderPayPage extends BaseComponent {
    state = {
        orderSn: 0,
        createdAt: '',
        payDeadLineAt: '',
        payType: 'wxPay',
        back: false,
    }

    timeChange(date) {
        var date = new Date(Number(date) * 1000);
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return hour + ':' + minute;
    }

    put(res) {
        var div=document.createElement("div")
        div.innerHTML = res;
        document.body.appendChild(div);
        document.forms[0].submit();
    }

    componentDidMount() {
        this.statisticsPv('OrderPayPage');
        if(window.location.href.indexOf('out_trade_no') > -1 || window.localStorage.getItem('firstClick')) {
            this.setState({back: true});
            let query = this.getQueryString('out_trade_no') || this.getQueryString('orderSn');
            alert('', '是否已经完成支付？',[{text: window.localStorage.getItem('payType') == 'aliPay'?'返回我的订单':'重新支付',onPress: () => {
                if(window.localStorage.getItem('payType') == 'aliPay'){
                    Router.push('/myOrder');
                    window.localStorage.removeItem('orderSn');
                    window.localStorage.removeItem('payType');
                    window.localStorage.removeItem('firstClick');
                }else{
                    const param = {
                        orderSn: window.localStorage.getItem('orderSn'),
                        payType: window.localStorage.getItem('payType'),
                    }
                    this.loadingToast('跳转中...', 10);
                    confirmPay(param).then(res => {
                        this.loadingToast('跳转中...', 0.01);
                        if(this.state.payType == 'aliPay') {
                            this.put(res);
                        }else{
                            window.location.href = res;
                        }
                    }).catch(err => {
                        window.localStorage.removeItem('firstClick');
                        this.loadingToast('跳转中...', 0.01);
                        if(err.code == 308) {
                            alert('','订单已经支付，请到我的订单查看',[{text: '确定', onPress: () => {
                                Router.push('/myOrder')
                            }}])
                        }else{
                            alert('','订单生成失败，请重试',[{text: '确定', onPress: () => {
                                Router.push('/myOrder')
                            }}])
                        }
                    })
                }
            }},{text: '已完成', onPress: () => {
                this.loadingToast('查询中...', 10);
                window.localStorage.removeItem('orderSn');
                window.localStorage.removeItem('payType');
                window.localStorage.removeItem('firstClick');
                getPayResult(query).then(res => {
                    this.loadingToast('查询中...', 0.01);
                    Router.push('/payResult?id='+ res);
                }).catch(err => {
                    this.loadingToast('发生错误了', 1);
                })
            }}])
        }else{
            const query = window.location.href.split('?')[1];
            const param = query.split('&');
            console.log(param);
            const orderSn = param[0].split('=')[1];
            const realAmount = param[1].split('=')[1];
            let skuAmount = param[2].split('=')[1];
            let expressFee = param[3].split('=')[1];
            let createdAt = param[4].split('=')[1];
            let payDeadLineAt = param[5].split('=')[1];
            this.setState({
                orderSn,
                realAmount,
                skuAmount,
                expressFee,
                createdAt: this.timeChange(createdAt),
                payDeadLineAt: this.timeChange(payDeadLineAt),
            })
            const method = document.getElementsByClassName('checkImg');
            for (let i = 0; i < method.length; i++) {
                method[i].onclick = (e) => {
                    e.target.src = 'https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon-checked.png';
                    i == 0 ? method[1].setAttribute('src', 'https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon-noChecked.png') : method[0].setAttribute('src', 'https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon-noChecked.png');
                    this.setState({payType: i == 0 ? 'wxPay' : 'aliPay'})
                }
            }
        }
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "orderPay"]);
    }

    toPay() {
        window.localStorage.setItem('firstClick','1');
        const param = {
            orderSn: this.state.orderSn,
            payType: this.state.payType,
        }
        this.loadingToast('跳转中...', 10);
        confirmPay(param).then(res => {
            this.loadingToast('跳转中...', 0.01);
            window.localStorage.setItem('orderSn',param.orderSn);
            window.localStorage.setItem('payType',param.payType);
            if(this.state.payType == 'aliPay') {
                this.put(res);
            }else{
                window.location.href = res;
            }
        }).catch(err => {
            if(err.code == 309) {
                this.loadingToast('订单超时', 1);
            }
        })
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                {
                    this.state.back ? null : <div>
                        <div className="orderPay">
                            <div className="timeMessage">
                                <h1>下单时间: <span>{this.state.createdAt}</span></h1>
                                <h1>请在 <span>{this.state.payDeadLineAt}</span> 前支付本订单，谢谢。</h1>
                            </div>
                            <Card>
                                <Card.Body>
                                    <h1>商品总价: <span>{'￥ ' + Number(this.state.skuAmount).toFixed(2)}</span></h1>
                                    <h3>邮费: <span>{'￥ ' + Number(this.state.expressFee).toFixed(2)}</span></h3>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="payMethod">
                            <h1>支付方式</h1>
                            <div className="method">
                                <img src="https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon_weixin.png" alt=""/><span>微信</span>
                                <span style={{float: 'right'}}><img className="checkImg"
                                                                    src="https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon-checked.png"
                                                                    alt=""/></span>
                            </div>
                            <div className="method">
                                <img src={Mean.ICON_ALIPAY}
                                     alt=""/><span>支付宝</span>
                                <span style={{float: 'right'}}><img className="checkImg"
                                                                    src={Mean.NO_CHECK}
                                                                    alt=""/></span>
                            </div>
                        </div>
                        <div className="todo">
                            <Button inline>实付: <span style={{fontSize: '0.27rem'}}>{'￥ ' + Number(this.state.realAmount).toFixed(2)}</span></Button>
                            <Button inline onClick={() => this.toPay()}>去付款</Button>
                        </div>
                    </div>
                }
                <style jsx global>{`
                     .orderPay{
                        padding: 0.3rem;
                        background: #fff;
                     }
                     .orderPay .timeMessage{
                        text-align: center;
                        padding: 0.3rem 0;
                     }
                     .orderPay .timeMessage h1{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.8;
                        margin-bottom: 0.1rem;
                     }
                     .orderPay .am-card{
                        border: 0;
                     }
                     .orderPay .am-card-body{
                        padding: 0;
                     }
                     .orderPay .am-card:last-child{
                        height: 0.72rem;
                        min-height: 0;
                        margin-top: 0.24rem;
                        margin-bottom: 0.3rem;
                     }
                     .orderPay .am-card:last-child h1{
                        font-size: 0.24rem;
                        width: 100%;
                        margin-top: 0.24rem;
                     }
                     .orderPay .am-card:last-child h1 span{
                        color: #C3221B;
                        font-size: 0.28rem;
                        float: right;
                     }
                     .orderPay .am-card:last-child h3{
                        margin-top: 0.24rem;
                        font-size: 0.24rem;
                        width: 100%;
                     }
                     .orderPay .am-card:last-child h3 span{
                        font-size: 0.28rem;
                        opacity: 0.8;
                        float: right;
                     }
                     .payMethod {
                        margin-top: 0.24rem;
                        background: #fff;
                        padding: 0.3rem;
                     }
                     .payMethod .method{
                        border-bottom: 1px solid #ddd;
                        padding: 0.3rem 0;
                     }
                     .payMethod .method:last-child{
                        padding-bottom: 0;
                        border: 0;
                     }
                     .payMethod h1{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.8;
                     }
                     .payMethod span{
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.8;
                        margin-left: 0.18rem;
                     }
                     .payMethod img{
                        width: 0.36rem;
                        vertical-align: middle;
                     }
                     .todo{
                        width: 100%;
                        position: fixed;
                        bottom: 0;
                        background: #fff;
                        height: 1rem;
                        border-top: 1px solid #ccc;
                     }
                     .todo .am-button{
                        border: 0;
                        height: 100%;
                        border-radius: 0;
                     }
                     .todo .am-button:first-child span{
                        color: #000;
                        font-size: 0.3rem;
                     }
                     .todo .am-button:last-child{
                        background: #C3221B;
                        float: right;
                        text-align: center;
                        border-left: 1px solid #C3221B;
                        width: 2rem;
                     }
                     .todo .am-button:last-child span{
                        color: #FFF;
                        font-size: 0.3rem;
                     }
                `}</style>
            </div>
        )
    }
}
