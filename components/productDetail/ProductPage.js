import React, {Component} from 'react';

import ProductBanner from './ProductBanner';
import ProductMessage from './ProductMessage';
import FixedIcon from './FixedIcon';
import BaseComponent from '../BaseComponent';
import {getSpuDetail, getSkuList, addShoppingCart} from '../../api/productDetailApi';

export default class ProductPage extends BaseComponent {
    state = {
        banner: [],
        detail: {},
        sku: [],
    }

    componentDidMount() {
        const spuSn = window.location.href.split('=')[1];
        this.statisticsPv('ProductPage&spuSn=' + spuSn);
        this.loadingToast('加载中...', 10);
        getSpuDetail({spuSn: spuSn}).then(res => {
            console.log(res);
            this.loadingToast('加载中...', 0.01);
            res.productPic.unshift(res.coverPic);
            this.setState({detail: res, banner: res.productPic})
        });
        getSkuList({spuSn: spuSn}).then(res => {
            console.log(res);
            this.setState({sku: res})
        })
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "productDetail"]);
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem', marginBottom: "1.5rem"}}>
                <ProductBanner banner={this.state.banner}/>
                <ProductMessage detail={this.state.detail} sku={this.state.sku} addShoppingCart={addShoppingCart}/>
                <FixedIcon/>
            </div>
        )
    }
}

