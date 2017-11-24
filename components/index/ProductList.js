import React, {Component} from 'react';
import Link from 'next/link';
import {Card, Flex, WhiteSpace} from 'antd-mobile';
import LazyLoad from 'react-lazyload';

import BaseComponent from '../BaseComponent';
import Loading from '../Loading';

export default class ProductList extends BaseComponent {
    statistics(title) {
        _czc.push(["_trackEvent",'首页商品列表','点击', title,'','']);
    }

    render() {
        return (
            <div className="productList" style={{margin: '0.24rem 0 ', padding: '0 0.3rem', background: '#fff'}}>
                {
                    this.props.product.map((item, index) => {
                        return (
                            <LazyLoad
                                key={index}
                                height={100}
                                offset={100}
                                once
                                placeholder={<Loading/>}
                            >
                                <Card onClick={() => this.statistics(item.title)}>
                                    <Card.Body>
                                        <Link href={{pathname: '/productDetail', query: {id: item.spuSn}}}>
                                            <a className="toProductDetail">
                                                <Flex>
                                                    <Flex.Item >
                                                        <img className="productListImage"
                                                             src={item.cover}
                                                             onClick={() => this.loadingToast('加载中...', 2)}
                                                        />
                                                    </Flex.Item>
                                                    <Flex.Item>
                                                        <div onClick={() => this.loadingToast('加载中...', 2)}>
                                                            <WhiteSpace size="lg"/>
                                                            <h1>{item.title}</h1>
                                                            <h4>{item.subTitle}</h4>
                                                            <h2><span>{item.price ? '￥:' : ''}</span>{item.price.toFixed(2)}</h2>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>
                                            </a>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </LazyLoad>
                        )
                    })
                }
                <style jsx global>{`
                 .productList{
                    box-shadow: 0 -1px 5px #ccc;
                 }
                 .productList .am-card {
                    height: 2.94rem;
                    border: 0;
                    padding-bottom: 0;
                 }
                 .productList .am-card:last-child{
                    height: 3.3rem;
                 }
                 .productList .am-card-body {
                    border-top: 0;
                    padding: 0;
                    border-bottom: 1px solid #ddd;
                 }
                 .toProductDetail .am-flexbox .am-flexbox-item:first-child{
                    width: 2.64rem;
                    flex: initial;
                 }
                 .productList .am-flexbox .am-flexbox-item{
                    margin-left: 0;
                 }
                 .productList .am-card:last-child div{
                    border-bottom: 0;
                 }
                 .productList .am-card-body .toProductDetail{
                    display: block;
                    width: 100%;
                 }
                 .productList .am-card-body h1{
                    width: 3.16rem;
                    font-size: 0.29rem;
                    color: #000;
                    opacity: 0.8;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin-top: 0.12rem;
                 }
                 .productList .am-card-body h4{
                    font-size: 0.25rem;
                    color: #000;
                    opacity: 0.54;
                    margin-top: 0.12rem;
                    width: 3.16rem;
                    line-height: 0.4rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                 }
                 .productList .am-card-body h2{
                    color: #C3221B;
                    font-size: 0.36rem;
                    margin-top: 0.67rem;
                    font-weight: 500;
                 }
                 .productList .am-card-body h2 span{
                    margin-right: 0.2rem;
                    font-size: 0.3rem;
                 }
                 .productList .am-flexbox-item{
                     overflow: hidden;
                     height: 2.94rem;
                 }
                 .productList .am-card-body img{
                     width: 2.4rem;
                     margin-top: 0.28rem;
                 }
              `}</style>
            </div>
        )
    }
}
