import React, {Component} from 'react';
import Banner from './Banner';
import ProductList from './ProductList';
import Footer from './Footer';
import FixedIcon from './FixedIcon';

import BaseComponent from '../BaseComponent';
import {
    getBannerList,
    getSpuList,
    uploadClickData
} from '../../api/indexApi';

export default class IndexPage extends BaseComponent {
    state = {
        banner: [],
        product: [],
    }

    componentDidMount() {
        this.loadingToast('加载中...', 10);
        getBannerList().then(res => {
            this.setState({banner: res})
            this.loadingToast('加载中...', 0.01);
        });
        getSpuList({current: 1, pageSize: 1000}).then(res => {
            this.setState({product: res.data})
        });
        this.statisticsPv('IndexPage');

    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "/"]);
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <Banner banner={this.state.banner} uploadClickData={uploadClickData}/>
                <ProductList product={this.state.product}/>
                <Footer/>
                <FixedIcon/>
            </div>
        )
    }
}
