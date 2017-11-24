import React, {Component} from 'react';
import Router from 'next/router';
import {Modal, Button, Toast} from 'antd-mobile';

import * as Mean from '../../static/static_name';
import BaseComponent from '../BaseComponent';
import CartNormal from './CartNormal';
import CartEdit from './CartEdit';
import {
    getCartList,
    editCart,
    deleteCart
} from '../../api/shoppingCartApi';
import {getSkuList} from '../../api/productDetailApi';

const alert = Modal.alert;

export default class ShoppingCartPage extends BaseComponent {
    state = {
        data: [],
        sum: 0.00,
        edit: false,
        cart: [],
        skuList: [],
        skuInfos: [],
    }

    selectStatus() {
        const checkImg = document.getElementsByClassName('checkImg');
        const price = document.getElementsByClassName('price');
        const allSelect = document.getElementById('allSelect');
        const check = Mean.CHECK;
        const noCheck = Mean.NO_CHECK;;
        for (let i = 0; i < checkImg.length; i++) {
            checkImg[i].onclick = (e) => {
                if(e.target.alt == 0 && !this.state.edit) {
                    alert('', '该商品暂无库存', [{text: '确定'}])
                }else{
                    if (e.target.src.indexOf('noChecked') > -1) {
                        const sum = this.state.sum + Number(e.target.name);
                        this.setState({sum})
                        e.target.src = check;
                        let skuInfos = [...this.state.skuInfos];
                        skuInfos.push({
                            index: i,
                            id: this.state.cart[i].id,
                            skuSn: this.state.cart[i].skuSn,
                            number: this.state.cart[i].number,
                        });
                        this.setState({skuInfos});
                    } else {
                        e.target.src = noCheck;
                        const sum = this.state.sum - Number(e.target.name);
                        this.setState({sum});
                        let skuInfos = [...this.state.skuInfos];
                        for (var j = 0; j < skuInfos.length; j++) {
                            if (checkImg[i].getAttribute('id') == skuInfos[j].skuSn) {
                                skuInfos.splice(i, 1);
                            }
                        }
                        console.log(skuInfos)
                        this.setState({skuInfos});
                        allSelect.setAttribute('src', noCheck);
                    }
                }
            }
        }
        allSelect.onclick = (e) => {
            let sum = 0, IsZero = false;
            const checkImg = document.getElementsByClassName('checkImg');
            for (let i = 0; i < checkImg.length; i++) {
                if(checkImg[i].getAttribute('alt') == 0 && !this.state.edit){
                    IsZero = true;
                }
            }
            if(IsZero){
                alert('', '购物车中包含了库存不足的商品',[{text: '确定'}])
            }else {
                if (e.target.src.indexOf('noChecked') > -1) {
                    e.target.src = check;
                    let skuInfos = [];
                    this.state.cart.map((item, index) => {
                        sum += Number(item.number) * Number(item.sellingPriceNew);
                        skuInfos.push({
                            id: item.id,
                            skuSn: item.skuSn,
                            number: item.number,
                        })
                    })
                    console.log(skuInfos)
                    this.setState({
                        sum,
                        skuInfos
                    })
                } else {
                    e.target.src = noCheck;
                    this.setState({
                        sum: 0.00,
                        skuInfos: [],
                    })
                }
                for (var i = 0; i < checkImg.length; i++) {
                    checkImg[i].src = e.target.src
                }
            }

        }
    }

    componentDidMount() {
        this.statisticsPv('ShoppingCartPage');
        this.selectStatus();
        this.loadingToast('加载中...', 10);
        getCartList().then(res => {
            this.loadingToast('加载中...', 0.01);
            this.setState({cart: res})
        }).catch(err => {
            this.loadingToast('发生错误了', 1);
        })
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "shoppingCart"]);
    }

    componentDidUpdate() {
        this.selectStatus();
    }

    changeToEdit() {
        document.getElementById('allSelect').setAttribute('src', Mean.NO_CHECK)
        this.setState({sum: 0.00});
        if (this.state.edit) {
            let param = [];
            this.state.cart.map((item, index) => {
                param.push({
                    id: item.id,
                    spuSn: item.spuSn,
                    skuSn: item.skuSn,
                    number: item.number,
                })
            })
            console.log(param);
            this.loadingToast('修改中...', 10);
            editCart(param).then(res => {
                getCartList().then(res => {
                    this.loadingToast('修改成功', 0.5);
                    this.setState({cart: res, skuInfos: []})
                })
                this.setState({
                    edit: !this.state.edit,
                })
            })
        } else {
            this.setState({
                edit: !this.state.edit,
            })
        }
    }

    deleteData(index, id) {
        this.loadingToast('删除中...', 10);
        deleteCart([id]).then(res => {
            this.loadingToast('删除成功', 0.5);
            const cart = [...this.state.cart];
            data.splice(index, 1);
            this.setState({cart});
        })
    }

    getSkuList(spuSn) {
        getSkuList({spuSn: spuSn}).then(res => {
            let skuList = [];
            res.map((item, index) => {
                skuList.push({
                    label: item.skuSpec,
                    value: item.skuSpec + '-' + item.skuSn + '-' + item.sellingPrice,
                },)
            })
            this.setState({skuList})
        })
    }

    payOrDelete() {
        console.log(this.state.skuInfos);
        if(this.state.edit) {
            if(this.state.skuInfos.length == 0){
                alert('', '您没有选择任何商品！', [{text: '确定'}])
            }else{
                let ids = [];
                this.state.skuInfos.map((item,index) => {
                    ids.push(item.id)
                });
                console.log(ids);
                alert('', '确定删除吗？', [{text: '取消'},{text: '确定', onPress: () => {
                    this.loadingToast('删除中...', 5);
                    deleteCart(ids).then(res => {
                        this.loadingToast('删除成功', 0.5);
                        getCartList().then(res => {
                            this.setState({cart: res})
                        }).catch(err => {
                            this.loadingToast('发生错误了', 1);
                        })
                        this.setState({edit: false, sum: 0.00});
                        document.getElementById('allSelect').setAttribute('src', Mean.NO_CHECK)
                    })
                }}])
            }
        }else {
            if (this.state.sum == 0.00) {
                alert('', '您没有选择任何商品！', [{text: '确定'}])
            } else {
                let sum = '';
                this.state.skuInfos.map((item, index) => {
                    sum += 'skuSn=' + item.skuSn + '&number=' + item.number + '&id=' +item.id + '&';
                })

                console.log(sum);
                this.loadingToast('加载中...', 2);
                Router.push('/orderConfirm?' + sum);
            }
        }
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <div className="cartList">
                    {
                        this.state.cart.length == 0 ?
                            <h1 className="IsNoData">购物车空空如也~ <span style={{color: '#3CB9FB'}} onClick={() => {
                                Router.push('/');
                                this.loadingToast('加载中...', 2);
                            }}> ,去购物</span></h1> : <div>
                            <h2 onClick={() => this.changeToEdit()}>{!this.state.edit ? '编辑' : '完成'}</h2>
                            {
                                this.state.edit ? <CartEdit skuList={this.state.skuList}
                                                            getSkuList={(...args) => this.getSkuList(...args)}
                                                            deleteData={(...args) => this.deleteData(...args)}
                                                            data={this.state.cart}/> :
                                    <CartNormal data={this.state.cart}/>
                            }
                        </div>
                    }
                </div>
                <div className="todo">
                    <Button inline>
                        <img id="allSelect" src={Mean.NO_CHECK}
                             alt=""/>
                        <span className="allSelect">全选</span>
                        {
                            this.state.edit ? <div className="sum" style={{display: 'none'}}>
                                <p>合计:
                                    <span>{'￥' + (this.state.sum % 1 === 0 ? this.state.sum + '.00' : this.state.sum) }</span>
                                </p>
                                <p>不含运费</p>
                            </div> : <div className="sum">
                                <p>合计:
                                    <span>{'￥' + (this.state.sum % 1 === 0 ? this.state.sum + '.00' : this.state.sum) }</span>
                                </p>
                                <p>不含运费</p>
                            </div>
                        }
                    </Button>
                    <Button inline onClick={() => this.payOrDelete()}>{this.state.edit ? '删除' : '结算'}</Button>
                </div>
                <style jsx global>{`
                    .cartList{
                        background: #fff;
                        margin-bottom: 1rem;
                    }
                    .cartList h2{
                        text-align: right;
                        font-size: 0.3rem;
                        padding: 0.3rem 0.3rem 0.3rem 0;
                    }
                    .todo{
                        width: 100%;
                        position: fixed;
                        bottom: 0;
                        background: #fff;
                        height: 1rem;
                        z-index: 999;
                        border-top: 1px solid #ccc;
                     }
                    .todo .am-button{
                        border: 0;
                        height: 100%;
                        border-radius: 0;
                        width: 4.2rem;
                    }
                    .todo .am-button-active{
                        background: #fff;
                     }
                    .todo .am-button:first-child{
                        padding: 0;
                        padding-left: 0.6rem;
                        text-align: left;
                    }
                    .todo .am-button img{
                        width: 0.3rem;
                        height: 0.3rem;
                        vertical-align: middle;
                        margin-left: -0.3rem;
                    }
                    .todo .allSelect{
                        font-size: 0.24rem;
                        opacity: 0.8;
                        color: #000;
                        margin-left: 0.24rem;
                    }
                    .todo .sum{
                        display: inline-block;
                        float: right;
                        text-align: right;
                        width: 2rem;
                        margin-right: 0.1rem;
                    }
                    .todo .sum p{
                        height: 0.3rem;
                        font-size: 0.24rem;
                    }
                    .todo .sum p:first-child{
                        margin-top: -0.1rem;
                    }
                    .todo .sum p:last-child{
                        font-size: 0.18rem;
                        opacity: 0.5;
                    }
                    .todo .sum p span{
                        color: #C3221B;
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
                    .am-toast-text{
                        font-size: 0.24rem;
                    }
                `}</style>
            </div>
        )
    }
}

