import React, {Component} from 'react';
import Router from 'next/router';
import * as Mean from '../../static/static_name';

import BaseComponent from '../BaseComponent';
import {getCartList} from '../../api/shoppingCartApi';

export default class FixedIcon extends BaseComponent {
    state = {
        cartLength: 0,
    }

    componentDidMount() {
        if(window.localStorage.getItem('token')){
            getCartList().then(res => {
                this.setState({cartLength: res.length});
            })
        }
    }

    iconClick(value) {
        if(window.localStorage.token){
            this.loadingToast('加载中...', 2);
            Router.push(value);
        }else{
            this.IsLogin();
        }
    }

    render() {
        return (
            <div className="fixed">
                    <a className="iconUser">
                        <img src={Mean.ICON_USER}
                             onClick={() => this.iconClick('/user')}/>
                    </a>
                    <a className="iconCart" style={{display: 'relative'}}>
                        <img src={Mean.ICON_CART}
                             onClick={() => this.iconClick('/shoppingCart')}/>
                        {
                            this.state.cartLength > 0 ? <span className="dot"></span> :null
                        }
                    </a>
                <style jsx>{`
                   .fixed {
                     width: 0.72rem;
                     position: fixed;
                     bottom: 0.6rem;
                     right: 0.3rem;
                   }
                   .fixed .iconUser img{
                     margin-bottom: 0.3rem;
                   }
                   .fixed a{
                     display: block;
                     width: 0.8rem;
                     overflow: hidden;
                     text-align: center;
                     border-radius: 20%;
                     padding-top: 0.1rem;
                   }
                   .fixed a img{
                     width: 0.72rem;
                     border-radius: 50%;
                     box-shadow: 0 0 5px #ccc;
                     opacity: 0.9;
                   }
                   .fixed .dot{
                     width: 0.15rem;
                     height: 0.15rem;
                     position: absolute;
                     bottom: 0.65rem;
                     right: 0;
                     background: red;
                     border-radius: 50%;
                   }
              `}</style>
            </div>
        )
    }
}

