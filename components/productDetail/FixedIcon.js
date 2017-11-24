import React, {Component} from 'react';
import Link from 'next/link';
import Router from 'next/router';

import BaseComponent from '../BaseComponent';
import {getCartList} from '../../api/shoppingCartApi';
import * as Mean from '../../static/static_name';

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
                <Link href="/">
                    <a className="iconTop">
                        <img src={Mean.ICON_HOME}
                             onClick={() => this.loadingToast('加载中...', 2)}/>
                    </a>
                </Link>
                <a className="iconTop">
                    <img src={Mean.ICON_USER}
                         onClick={() => this.iconClick('/user')}/>
                </a>
                <a>
                    <img style={{display: 'relative'}}
                         src={Mean.ICON_CART}
                         onClick={() => this.iconClick('/shoppingCart')}/>
                    {
                        this.state.cartLength > 0 ? <span className="dot"></span> :null
                    }
                </a>
                <style jsx>{`
                   .fixed {
                     width: 0.72rem;
                     position: fixed;
                     bottom: 1.6rem;
                     right: 0.3rem;
                     z-index: 98;
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
                     box-shadow: 0 2px 5px #ccc;
                     opacity: 0.9;
                   }
                   .fixed .iconTop img{
                     margin-bottom: 0.3rem;
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

