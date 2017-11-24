import React, {Component} from 'react';
import BaseComponent from '../BaseComponent';
import * as Mean from '../../static/static_name';

export default class PayFailed extends BaseComponent {
    render() {
        return (
            <div className="payResult">
                <img src={Mean.ICON_PAYFAILED} alt=""/>
                <h1>购买失败</h1>
                <div onClick={() => this.chatWithService()}>联系客服</div>
            </div>
        )
    }
}
