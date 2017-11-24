import React, {Component} from 'react';

import {Card, Flex, WhiteSpace, Button} from 'antd-mobile';
import BaseComponent from '../BaseComponent';

export default class ProductGather extends BaseComponent {
    render() {
        const {data} = this.props;
        return (
            <div>
                <div className="productGather">
                    <Card>
                        <Card.Body>
                            {
                                data.skus ? data.skus.map((item, index) => {
                                    return <Flex key={index}>
                                        <Flex.Item >
                                            <img className="productListImage"
                                                 src={item.coverPic}
                                            />
                                        </Flex.Item>
                                        <Flex.Item>
                                            <div>
                                                <WhiteSpace size="lg"/>
                                                <h1>{item.title}</h1>
                                                <h4>已选: <span>{item.skuSpec}</span><span
                                                    style={{float: 'right'}}>{'× ' + item.number}</span></h4>
                                                <h2><span>￥</span>{item.sellingPrice.toFixed(2)}</h2>
                                            </div>
                                        </Flex.Item>
                                    </Flex>
                                }) : null
                            }
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <h1>商品总价:
                                <span>{data.totalAmount == undefined ? '' : '￥: ' + data.skuAmount.toFixed(2)}</span>
                            </h1>
                            <h3>邮费:
                                <span>{data.expressFee == undefined ? '' : '￥: ' + data.expressFee.toFixed(2)}</span>
                            </h3>
                        </Card.Body>
                    </Card>
                </div>
                <div className="todo">
                    <Button inline>实付: <span
                        style={{fontSize: '0.24rem'}}>￥</span> {data.realAmount == undefined ? '' : data.realAmount.toFixed(2)}
                    </Button>
                    <Button inline onClick={() => this.props.toPay()}>提交订单</Button>
                </div>
                <style jsx global>{`
                     .productGather{
                        background: #fff;
                        margin-top: 0.2rem;
                        padding: 0.3rem;
                        padding-top: 0;
                        margin-bottom: 1.3rem;
                     }
                     .productGather .am-card {
                        border: 0;
                        padding-bottom: 0;
                     }
                     .productGather .am-card:last-child{
                        height: 0.72rem;
                        min-height: 0;
                        margin-top: 0.24rem;
                        margin-bottom: 0.3rem;
                     }
                     .productGather .am-card:last-child h1{
                        font-size: 0.24rem;
                        width: 100%;
                     }
                     .productGather .am-card:last-child h1 span{
                        color: #C3221B;
                        font-size: 0.28rem;
                        float: right;
                     }
                     .productGather .am-card:last-child h3{
                        margin-top: 0.24rem;
                        font-size: 0.24rem;
                        width: 100%;
                     }
                     .productGather .am-card:last-child h3 span{
                        font-size: 0.28rem;
                        opacity: 0.8;
                        float: right;
                     }
                     .productGather .am-card-body {
                        border-top: 0;
                        padding: 0;
                     }
                     .productGather .am-flexbox{
                        border-bottom: 1px solid #ddd;
                     }
                     .productGather .am-flexbox .am-flexbox-item:first-child{
                        width: 2.64rem;
                        flex: initial;
                     }
                     .productGather .am-flexbox .am-flexbox-item{
                        margin-left: 0;
                     }
                     .productGather .am-card:last-child div{
                        border-bottom: 0;
                     }
                     .productGather .am-card-body .toProductDetail{
                        display: block;
                        width: 100%;
                     }
                     .productGather .am-card-body h1{
                        width: 3.16rem;
                        font-size: 0.29rem;
                        line-height: 0.35rem;
                        color: #000;
                        opacity: 0.8;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        margin-top: 0.12rem;
                     }
                     .productGather .am-card-body h4{
                        font-size: 0.25rem;
                        color: #000;
                        opacity: 0.54;
                        margin-top: 0.24rem;
                        width: 3.16rem;
                        line-height: 0.4rem;
                     }
                     .productGather .am-card-body h2{
                        color: #C3221B;
                        font-size: 0.24rem;
                        margin-top: 0.62rem;
                        float: right;
                     }
                     .productGather .am-card-body h2 span{
                        margin-right: 0.1rem;
                        font-size: 0.24rem;
                     }
                     .productGather .am-flexbox-item{
                         overflow: hidden;
                         height: 2.94rem;
                     }
                     .productGather .am-card-body img{
                         width: 2.4rem;
                         margin-top: 0.28rem;
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
