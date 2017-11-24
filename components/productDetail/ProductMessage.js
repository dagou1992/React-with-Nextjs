import React, {Component} from 'react';
import Router from 'next/router'

import {Flex, Popup, Button} from 'antd-mobile';
import * as Mean from '../../static/static_name';
import BaseComponent from '../BaseComponent';
import PopupComponent from './Popup';
import ProductImages from './ProductImages';

export default class ProductMessage extends BaseComponent {
    state = {
        count: 1,
        num: 0,
        standard: '',
        skuSn: -1,
        firstClickBuy: true,
        sku: [],
        nowStock: -1,
        overStock: false,
    }

    selectCount(count, standard, num, skuSn, nowStock) {
        console.log(count, standard, skuSn, nowStock);
        let counts = count;
        this.setState({
            count: counts,
            standard: standard,
            num: num,
            skuSn: skuSn,
            nowStock: nowStock,
        })
    }

    popupShow() {
        let skuSpec = [], skuZero = [], normalSku = [], zeroSku = [];
        this.props.sku.map((item, index) => {
            item.stock != 0 ?skuSpec.push({
                skuSn: item.skuSn,
                skuSpec: item.skuSpec,
                price: item.sellingPrice,
                stock: item.stock,
            }): skuZero.push({
                skuSn: item.skuSn,
                skuSpec: item.skuSpec,
                price: item.sellingPrice,
                stock: item.stock,
            })
        });
        skuSpec = skuSpec.concat(skuZero);
        this.props.sku.map((item,index) => {
            item.stock != 0 ? normalSku.push(item) : zeroSku.push(item)
        })
        let sum = normalSku.concat(zeroSku);
        console.log(sum);
        this.setState({skuSn: sum[0].skuSn, standard: sum[0].skuSpec});
        this.setState({sku: sum});
        console.log(this.state.num);
        document.body.scrollTop = '0px'
        Popup.show(<PopupComponent
                overStock={() => this.setState({overStock: true})}
                noOverStock={() => this.setState({overStock: false})}
                skuSpec={skuSpec}
                nowStock={this.state.nowStock == -1 ? sum[0].stock : this.state.nowStock}
                sku={this.props.sku}
                newCount={this.state.count}
                newStandard={this.state.standard == '' ? sum[0].skuSpec : this.state.standard}
                newNum={this.state.num}
                selectCount={(...args) => this.selectCount(...args)}/>,
            {animationType: 'slide-up', maskClosable: true})
    }

    addCart() {
        if (window.localStorage.getItem('token') == undefined) {
            this.IsLogin();
            Popup.hide();
        } else {
            this.setState({firstClickBuy: false})
            if (this.state.firstClickBuy || (!this.state.firstClickBuy && this.state.count == -1)) {
                this.popupShow();
            }else {
                if(this.state.sku[0].stock == 0) {
                    this.loadingToast('商品库存不足', 2);
                }else{
                    const param = {
                        skuSn: this.state.skuSn,
                        number: this.state.count,
                    }
                    this.loadingToast('加载中...', 2);
                    this.props.addShoppingCart(param).then(res => {
                        Popup.hide();
                        this.loadingToast('加入购物车成功', 0.5);
                    })
                }
            }
        }
    }

    buyNow() {
        this.setState({firstClickBuy: false})
        if (this.state.firstClickBuy || (!this.state.firstClickBuy && this.state.count == -1)) {
            this.popupShow();
        } else if (this.state.count > -1 && this.state.firstClickBuy == false) {
            Popup.hide();
            if (window.localStorage.getItem('token') == undefined) {
                this.IsLogin();
            } else {
                if(this.state.sku[0].stock == 0) {
                    this.loadingToast('商品库存不足', 2);
                }else {
                    this.loadingToast('加载中...', 2);
                    Router.push({
                        pathname: '/orderConfirm',
                        query: {skuSn: this.state.skuSn, count: this.state.count}
                    })
                }
            }
        }
    }

    render() {
        const detail = this.props.detail;
        return (
            <div>
                <div className="productMessage">
                    <h1>{detail.title}</h1>
                    <h2>{detail.subTitle}</h2>
                    <Flex>
                        <Flex.Item>
                            <h4>
                                <span>{detail.priceStart ? '￥:' : ''}</span>{detail.priceStart ? (detail.priceStart == detail.priceEnd ? detail.priceStart.toFixed(2) : detail.priceStart.toFixed(2) + ' - ' + detail.priceEnd.toFixed(2)) : ''}
                            </h4>
                        </Flex.Item>
                        <Flex.Item>
                            <h5><span>已售:</span>{detail.sellNum}<span>{detail.measureUnit}</span></h5>
                        </Flex.Item>
                    </Flex>
                </div>
                <div className="count" onClick={() => {
                    this.setState({firstClickBuy: false})
                    this.popupShow();
                }}>
                    <Flex>
                        <Flex.Item>
                            <h4>{
                                this.state.firstClickBuy == true ? '选择规格和数量 :' :
                                    <div><span>已选择:</span>{this.state.standard} x {this.state.count}</div>
                            }
                            </h4>
                        </Flex.Item>
                        <Flex.Item className="iconRound">
                            <img src={Mean.ICON_ROUND_SMALL}/>
                        </Flex.Item>
                    </Flex>
                </div>
                <ProductImages data={detail.productDetailPic}/>
                <div className="todo">
                    <Flex>
                        <Flex.Item>
                            <Button className="joinCart" disabled={this.state.overStock? true: false} onClick={() => this.addCart()}>加入购物车</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button
                                disabled={this.state.overStock? true: false}
                                className="buyNow"
                                onClick={() => this.buyNow()}>立即购买</Button>
                        </Flex.Item>
                    </Flex>
                </div>
                <style jsx global>{`
                    .productMessage{
                        background: #fff;
                        padding: 0.3rem;
                    }
                    .am-popup{
                        z-index: 99;
                    }
                    .am-popup-mask {
                        z-index: 97;
                    }
                    .productMessage h1{
                        font-size: 0.3rem;
                        opacity: 0.7;
                        line-height: 0.4rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .productMessage h2{
                        font-size: 0.24rem;
                        opacity: 0.4;
                        color: #000;
                        margin-top: 0.24rem;
                        width: 100%;
                        line-height: 0.4rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                     }
                     .productMessage h4{
                        color: #C3221B;
                        font-size: 0.32rem;
                        margin-top: 0.24rem;
                     }
                     .productMessage h4 span{
                        margin-right: 0.2rem;
                        font-size: 0.3rem;
                     }
                     .productMessage h5{
                        font-size: 0.18rem;
                        color: #000;
                        opacity: 0.54;
                        margin-top: 0.24rem;
                        text-align: right;
                        width: 100%;
                     }
                     .productMessage .am-flexbox-item:last-child{
                        flex: 0.3;
                        text-align: right;
                     }
                     .count{
                        height: 0.9rem;
                        background: #fff;
                        margin-top: 0.3rem;
                     }
                     .count .am-flexbox{
                        height: 0.9rem;
                        padding: 0 0.3rem;
                     }
                     .count h4{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.7;
                     }
                     .count h4 span{
                        margin-right: 0.2rem;
                        font-size: 0.3rem;
                     }
                     .count .iconRound{
                        text-align: right;
                     }
                     .count .iconRound img{
                        width: 0.6rem;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        margin-top: 0.1rem;
                     }
                     .count .am-flexbox .am-flexbox-item:last-child{
                        min-width: 0;
                        width: 0.5rem;
                        -webkit-flex: 0.2;
                     }
                     .todo{
                        width: 100%;
                        position: fixed;
                        bottom: 0;
                     }
                     .todo .am-flexbox .am-flexbox-item {
                        margin: 0;
                     }
                     .todo .am-button{
                        height: 1rem;
                        line-height: 1rem;
                        font-size: 0.3rem;
                        border-radius: 0;
                        font-weight: bold;
                        border: 0;
                        border-top: 1px solid #dfdfdf;
                     }
                     .todo .joinCart span{
                        color: #000;
                        opacity: 0.7;
                     }
                     .todo .buyNow{
                        background-color: #C3221B;
                        color: #fff;
                        padding-left: 0.2rem;
                     }

                `}</style>
            </div>
        )
    }
}
