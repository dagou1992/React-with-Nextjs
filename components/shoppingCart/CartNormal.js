import React, {Component} from 'react';
import {Card, Flex, Button} from 'antd-mobile';
import Router from 'next/router';

import * as Mean from '../../static/static_name';

export default class CartNormal extends Component {
    render() {
        return (
            <div className="cartNormal">
                {
                    this.props.data.map((item, index) => {
                        return <Card key={index}>
                            <Card.Body>
                                <Flex>
                                    <Flex.Item>
                                        <img name={Number(item.sellingPriceNew) * Number(item.number)} id={item.skuSn}
                                             className="checkImg"
                                             src={Mean.NO_CHECK}
                                             alt={item.skuStock}/>
                                        <img className="productImg" src={item.coverPic} onClick={() => {
                                            Router.push('/productDetail?id='+item.spuSn)
                                        }}/>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <h1>{item.title}</h1>
                                        <h4>已选: <span>{item.skuSpec}</span><span
                                            style={{float: 'right'}}>{item.skuStock == 0 ? '暂无': '×'+item.number}</span></h4>
                                        <h2 className="price">{'￥' + item.sellingPriceNew}</h2>
                                    </Flex.Item>
                                </Flex>
                            </Card.Body>
                        </Card>
                    })
                }
                <style jsx global>{`
                    .cartNormal{
                        padding: 0 0.3rem 0.3rem 0.3rem;
                    }
                    .cartNormal .am-card{
                        border: 0;
                        position: relative;
                        padding: 0;
                    }
                    .cartNormal .am-card-body{
                        padding: 0;
                    }
                    .cartNormal .am-card:last-child{
                        border-bottom: 1px solid #ddd;
                        border-radius: 0;
                    }
                    .cartNormal .am-card-body .productImg{
                         width: 1.8rem;
                         margin-left: 0.6rem;
                         margin-top: 0.24rem;
                    }
                    .cartNormal .checkImg{
                        width: 0.3rem;
                        position: absolute;
                        top: 0.99rem;
                    }
                    .cartNormal .am-flexbox .am-flexbox-item:first-child{
                        width: 2.5rem;
                        height: 2.3rem;
                        flex: initial;
                     }
                    .cartNormal .am-card h1{
                        width: 3.1rem;
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.8;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .cartNormal .am-card h4{
                        opacity: 0.5;
                        color: #000;
                        font-size: 0.24rem;
                        margin-top: 0.24rem;
                    }
                    .cartNormal .am-card-body h2{
                        color: #C3221B;
                        font-size: 0.24rem;
                        float: right;
                        margin-top: 0.7rem;
                        padding: 0;
                     }
                `}</style>
            </div>
        )
    }
}