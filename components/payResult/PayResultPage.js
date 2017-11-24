import React, {Component} from 'react';
import {Modal} from 'antd-mobile';

import FixedIcon from '../productDetail/FixedIcon';
import PaySuccess from './PaySuccess';
import PayFailed from './PayFailed';
import BaseComponent from '../BaseComponent';


const alert = Modal.alert;

export default class PayResultPage extends BaseComponent {
    state = {
        payResult: false,
        showResult: true,
    }

    componentDidMount() {
        this.statisticsPv('PayResultPage');
        const query = this.getQueryString('id');
        if(query == '1') {
            this.setState({payResult: true})
        }else if(query == '2'){
            this.setState({payResult: false})
        }
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "payResult"]);
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                {
                    this.state.showResult ? (this.state.payResult ? <PaySuccess/> : <PayFailed/>): null
                }
                <FixedIcon/>
                <style jsx global>{`
                    .payResult{
                        text-align: center;
                        background: #fff;
                        padding: 0.6rem;
                    }
                    .payResult img{
                        width: 1.3rem;
                        height: 1.51rem;
                    }
                    .payResult h1{
                        padding-left: 0.1rem;
                        font-size: 0.3rem;
                        margin: 0.3rem 0 0.6rem 0;
                    }
                    .payResult  div {
                        width: 2.2rem;
                        height: 0.72rem;
                        background: #C3221B;
                        color: #fff;
                        font-size: 0.3rem;
                        line-height: 0.72rem;
                        text-align: center;
                        border-radius: 5px;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
        )
    }
}