import React, {Component} from 'react';
import Router from 'next/router';
import {Modal} from 'antd-mobile';

import BaseComponent from '../BaseComponent';
import {getExpressRecord} from '../../api/myOrderApi';

const alert = Modal.alert;

export default class Logistics extends BaseComponent {
    state = {
        list: [],
    }

    componentDidMount() {
        const query = window.location.href.split('?')[1];
        const nums = query.split('=')[1];
        this.loadingToast('加载中...', 10);
        getExpressRecord(nums).then(res => {
            this.loadingToast('加载中...', 0.01);
            this.setState({list: res});
            if(res.length == 0 || res == null) {
                alert('', '暂无物流信息，有问题请联系在线客服。',[{text: '确定'}])
            }
        });
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <div className="header">
                    物流查询
                </div>
                <div className="main">
                    {
                        this.state.list.map((item, index) => {
                            return <div key={index} className="tree">
                                <p>{item.time}</p>
                                <p>{item.context}</p>
                            </div>
                        })
                    }

                </div>
                <div className="ReturnIndex">
                    <a href="#" onClick={() => {
                        this.loadingToast('加载中...', 2);
                        Router.push('/myOrder');
                    }}>返回我的订单</a>
                </div>
                <style jsx global>{`
                  .header{
                    width: 100%;
                    background: #fff;
                    margin-bottom: 0.24rem;
                    height: 0.9rem;
                    font-size: 0.3rem;
                    color: #000;
                    opacity: 0.87;
                    line-height: 0.9rem;
                    text-align: center;
                  }
                  .main{
                    width: 100%;
                    background: #fff;
                    margin-bottom: 0.9rem;
                  }
                  .tree{
                    padding: 0.3rem 0.36rem;
                    font-size: 0.24rem;
                    color: #000;
                    opacity: 0.54;
                  }
                  .tree p{
                    margin-top: 0.05rem;
                  }
                  .ReturnIndex{
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    background: #C3211C;
                    height: 0.8rem;
                    text-align: center;
                    line-height: 0.8rem;
                  }
                  .ReturnIndex a{
                    font-size: 0.24rem;
                    color: #fff;
                    opacity: 0.87;
                  }
              `}</style>
            </div>
        )
    }
}
