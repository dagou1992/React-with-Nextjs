import React, {Component} from 'react';
import Router from 'next/router';

import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';

export default class PaySuccess extends BaseComponent {
    render() {
        return (
            <div className="payResult">
                <img src={Mean.ICON_PAYSUCCESS} alt=""/>
                <h1>购买成功</h1>
                <div onClick={() => {
                    this.loadingToast('加载中...', 2);
                    Router.push({
                        pathname: '/myOrder',
                    })
                }}>查看订单详情
                </div>
            </div>
        )
    }
}