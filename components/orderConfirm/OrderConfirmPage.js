import React, {Component} from 'react';
import Router from 'next/router';

import AddressItem from './AddressItem';
import ProductGather from './ProductGather';
import BaseComponent from '../BaseComponent';
import {
    getViewOrder,
    createOrder
} from '../../api/orderConfirmApi';
import {getAddressList} from '../../api/addressApi';
import {deleteCart} from '../../api/shoppingCartApi';

export default class OrderConfirmPage extends BaseComponent {
    state = {
        data: {},
        address: [],
        param: {},
        create: false,
        ids: [],
    }

    componentDidMount() {
        this.statisticsPv('OrderConfirmPage');
        let query = window.location.search.split('?')[1];
        let param = {}, s = 0,skuInfos = [], ids = [];

        //从购物车和商品详情进入
        if(query.indexOf('&') > -1){
            this.setState({create: true})
            query = query.split('&');
            query[query.length - 1] == '' ? query.pop() : null
            query = query.map((item, index) => {
                return item.split('=')[1]
            });
            //从购物车进入
            if(window.location.search.split('?')[1].indexOf('id') > -1) {
                console.log(query)
                for (let i = 0; i < query.length / 2 -1; i++) {
                    ids.push(query.slice(s, s + 3)[2])
                    skuInfos.push({
                        skuSn: query.slice(s, s + 3)[0],
                        number: query.slice(s, s + 3)[1],
                    })
                    s += 3;
                }
                console.log(skuInfos)
                console.log(ids);
                this.setState({ids});
            }else{
                for (let i = 0; i < query.length / 2; i++) {
                    skuInfos.push({
                        skuSn: query.slice(s, s + 2)[0],
                        number: query.slice(s, s + 2)[1],
                    })
                    s += 2;
                }
                console.log(skuInfos)
            }
            param = {
                orderSn: '',
                skuInfos,
            }
            this.setState({param,ids});
            this.loadingToast('加载中...', 10);
            getViewOrder(param).then(res => {
                this.loadingToast('加载中...', 0.01);
                this.setState({data: res});
            });
        }else{
            this.setState({create: false});
            param = {
                orderSn: query.split('=')[1],
                skuInfos: [],
            }
            this.loadingToast('加载中...', 10);
            getViewOrder(param).then(res => {
                this.loadingToast('加载中...', 0.01);
                this.setState({data: res});
                res.skus.map((item, index) => {
                    param.skuInfos.push({
                        skuSn: item.skuSn,
                        number: item.number,
                    })
                })
                this.setState({
                    param,
                    orderSn: res.orderSn,
                    realAmount: res.realAmount,
                    expressFee: res.expressFee,
                    skuAmount: res.skuAmount,
                    createdAt: res.createdAt,
                    payDeadLineAt: res.payDeadLineAt,
                });
            });
        }
        getAddressList().then(res => {
            if (res.length != 0) {
                for (var i in res) {
                    if (res[i].defaultAdd == true) {
                        this.setState({
                            address: res[i],
                            consigneeProvince: res[i].province,
                            consigneeCity: res[i].city,
                            consigneeDistrict: res[i].district,
                            addressd: res[i].address,
                            addressFulls: res[i].addressFull,
                        })
                    }
                }
            }
        })
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "orderConfirm"]);
    }

    toPay() {
        if(this.state.create) {
            const {param, address} = this.state;
            const params = {
                skuInfos: param.skuInfos,
                consigneeName: address.name,
                consigneePhone: address.phone,
                consigneeProvince: this.state.consigneeProvince,
                consigneeCity: this.state.consigneeCity,
                consigneeDistrict: this.state.consigneeDistrict,
                consigneeAddress: this.state.addressd,
                consigneeAddressFull: this.state.addressFulls,
            }
            console.log(params);
            if(params.consigneeName == undefined){
                this.loadingToast('收货地址不能为空', 1);
            }else{
                this.loadingToast('订单生成中...', 10);
                createOrder(params).then(res => {
                    this.loadingToast(' ', 0.01);
                    if(this.state.ids.length != 0){
                        deleteCart(this.state.ids).then(res => {

                        })
                    }
                    Router.push({
                        pathname: '/orderPay',
                        query: {
                            orderSn: res.orderSn,
                            realAmount: res.realAmount,
                            skuAmount: res.skuAmount,
                            expressFee: res.expressFee,
                            createdAt: res.createdAt,
                            payDeadLineAt: res.payDeadLineAt,
                        }
                    })
                }).catch(err => {
                    this.loadingToast('发生错误了', 1);
                })
            }
        }else{
            Router.push({
                pathname: '/orderPay',
                query: {
                    orderSn: this.state.orderSn,
                    realAmount: this.state.realAmount,
                    skuAmount: this.state.skuAmount,
                    expressFee: this.state.expressFee,
                    createdAt: this.state.createdAt,
                    payDeadLineAt: this.state.payDeadLineAt,
                }
            })
        }
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <AddressItem address={this.state.address}/>
                <ProductGather data={this.state.data} toPay={() => this.toPay()}/>
            </div>
        )
    }
}


