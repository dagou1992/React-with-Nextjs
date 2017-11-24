import React, {Component} from 'react';
import Link from 'next/link';

import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';

export default class AddressItem extends BaseComponent{
    render() {
        const {address} = this.props;
        return (
            <div className="addressItem">
                <Link href="/address?">
                    <a name="toAddAddress">
                        <div className="container" onClick={() => this.loadingToast('加载中...', 2)}>
                            {
                                address.length == 0 ? <div>
                                    <h1>收货地址</h1>
                                    <h3>您还没有收货地址，请点击添加</h3>
                                </div> : <div>
                                    <h1>{address.name + ' ' + address.phone}</h1>
                                    <h3>{address.addressFull}</h3>
                                </div>
                            }
                            <img src={Mean.ICON_ROUND} />
                        </div>
                    </a>
                </Link>
                <style jsx>{`
                    .addressItem{
                        height: 0.78rem;
                        background: #fff;
                        padding: 0.3rem;
                    }
                    .addressItem a{
                        height: 0.78rem;
                        display: block;
                    }
                    .addressItem .container{
                        overflow: hidden;
                    }
                    .addressItem h1{
                        color: #000;
                        opacity: 0.8;
                        font-size: 0.27rem;
                        width: 4.5rem;
                    }
                    .addressItem h3{
                        color: #000;
                        opacity: 0.5;
                        font-size: 0.24rem;
                        margin-top: 0.24rem;
                        width: 4.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .addressItem img{
                        width: 0.62rem;
                        position: absolute;
                        top: 1.16rem;
                        right: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}


