import React, {Component} from 'react';
import {Card, Flex, Button} from 'antd-mobile';
import Router from 'next/router';
import LazyLoad from 'react-lazyload';
import BaseComponent from '../BaseComponent';

import Loading from '../Loading';

export default class OrderList extends BaseComponent {
    orderListClick(item) {
        if (item.status == 2 || item.status == 0) {
            this.loadingToast('加载中...', 2);
            Router.push('/orderConfirm?orderSn='+ item.orderSn);
        } else if (item.status == 4) {
            this.loadingToast('加载中...', 2);
            Router.push('/logistics?expressSns=' + item.expressSns[0])
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.data.map((item, index) => {
                        return <LazyLoad
                            key={index}
                            height={100}
                            offset={100}
                            once
                            placeholder={<Loading/>}
                        >
                            <div className="container">
                                <h1>订单号: {item.orderSn}</h1>
                                <Card key={index}>
                                    <Card.Body>
                                        {
                                            item.skus ? item.skus.map((items, index) => {
                                                return <Flex key={index}>
                                                    <Flex.Item >
                                                        <img className="productImg"
                                                             src={items.coverPic}
                                                        />
                                                    </Flex.Item>
                                                    <Flex.Item>
                                                        <div>
                                                            <h1>{items.title}</h1>
                                                            <h4>已选: {items.skuSpec}<span
                                                                style={{float: 'right'}}>{'×' + items.number}</span>
                                                            </h4>
                                                            <h2><span>￥</span>{items.sellingPrice.toFixed(2)}</h2>
                                                        </div>
                                                    </Flex.Item>
                                                </Flex>
                                            }) : null
                                        }
                                    </Card.Body>
                                    {
                                        item.skus ? <Card.Footer
                                            content={<div className="containerFoot">
                                                <span>共{item.skus.length}件</span>
                                                <span>合计: ￥<span className="price">{item.realAmount.toFixed(2)}</span></span>
                                                <p>(含运费: ￥{item.expressFee.toFixed(2)})</p>
                                            </div>}
                                            extra={<Button onClick={() => this.orderListClick(item)}>{item.status == 1 ? '待发货' : (item.status == 0 ? '去付款' : (item.status == 2 ? '重新支付' : (item.status == 3 ? '交易关闭' : (item.status == 4 ? '查看物流' : (item.status == 5 ? '退款中' : (item.status == 6 ? '已退款' : null))))))}</Button>}
                                        /> : null
                                    }
                                </Card>
                            </div>
                        </LazyLoad>
                    })
                }
                <style jsx global>{`
                    .container{
                        margin-top: 0.24rem;
                        padding: 0.3rem;
                        background: #fff;
                    }
                    .container h1{
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.5;
                        margin: 0;
                        margin-bottom: 0.3rem;
                    }
                    .container .am-card{
                        border: 0;
                        position: relative;
                        padding: 0;
                    }
                    .container .am-card-body{
                        padding: 0;
                    }
                    .container .am-card:last-child{
                        border-radius: 0;
                    }
                    .container .am-flexbox{
                        border-bottom: 1px solid #ddd;
                    }
                    .container .am-card-body .productImg{
                         width: 1.8rem;
                         padding-top: 0.3rem;
                    }
                    .container .checkImg{
                        width: 0.3rem;
                        position: absolute;
                        top: 0.99rem;
                    }
                    .container .am-flexbox .am-flexbox-item:first-child{
                        width: 1.9rem;
                        height: 2.44rem;
                        flex: initial;
                     }
                    .container .am-card h1{
                        width: 3.75rem;
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.8;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                    .container .am-card h4{
                        opacity: 0.5;
                        color: #000;
                        font-size: 0.24rem;
                        margin-top: 0.24rem;

                    }
                    .container .am-card h4 span{
                        color: #000;
                        font-size: 0.24rem;
                    }
                    .container .am-card-body h2{
                        font-size: 0.24rem;
                        margin-top: 0.3rem;
                        padding: 0;
                     }
                     .container .am-card-body h2 span{
                        font-size: 0.24rem;
                     }
                     .container .am-card-footer{
                        padding: 0;
                        margin-top: 0.3rem;
                     }
                     .container .containerFoot span{
                        font-size: 0.24rem;
                     }
                     .container .containerFoot p{
                        font-size: 0.18rem;
                        margin-left: 1rem;
                        margin-top: 0.1rem;
                     }
                     .container .containerFoot span:first-child{
                        margin-right: 0.3rem;
                     }
                     .container .containerFoot .price{
                        color: #C3221B;
                        font-weight: bold;
                     }
                     .container .am-button{
                        width: 1.8rem;
                        height: 0.62rem;
                        line-height: 0.6rem;
                        background: #C3221B;
                        float: right;
                     }
                     .container .am-button span{
                        color: #fff;
                        font-size: 0.25rem;

                     }
                `}</style>
            </div>
        )
    }
}
