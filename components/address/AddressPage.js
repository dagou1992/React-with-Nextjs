import React, {Component} from 'react';
import {Button} from 'antd-mobile';

import AddressList from './AddressList';
import AddressAdd from './AddressAdd';
import BaseComponent from '../BaseComponent';

import {
    getAddressList,
    addOrEditAddress,
    deleteAddress,
    setDefaultAddress,
} from '../../api/addressApi';

export default class AddressPage extends BaseComponent {
    state = {
        IsAdd: false,
        data: [],
        item: [],
        edit: false,
    }

    componentDidMount() {
        this.loadingToast('加载中...', 10);
        getAddressList().then(res => {
            this.loadingToast('加载中...', 0.01);
            this.setState({data: res == null ? [] : res})
        }).catch(err => {
            this.loadingToast('发生错误了', 1);
        })
        this.statisticsPv('AddressPage');
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "address"]);
    }

    defaultAddress(index, id) {
        const data = [...this.state.data];
        data[index].defaultAdd = true;
        for (var i = 0; i < data.length; i++) {
            if (i != index) {
                data[i].defaultAdd = false
            }
        }
        this.setState({data});
        setDefaultAddress(id).then(res => {
            if(window.location.href.indexOf('?') > -1) {
                this.loadingToast('加载中...', 1);
                setTimeout(() => {
                      history.go(-1)
                  },1000)
            }
        })
    }

    deleteAddress(index, id) {
        this.loadingToast('删除中...', 5);
        deleteAddress([id]).then(res => {
            this.loadingToast('删除成功...', 0.5);
            const data = [...this.state.data];
            data.splice(index, 1);
            this.setState({data})
        })
    }

    savedAddress(value) {
        this.loadingToast(this.state.edit ? '修改中...' : '添加中...', 5);
        addOrEditAddress(this.state.edit, value).then(res => {
            this.loadingToast(this.state.edit ? '修改成功' : '添加成功...', 0.5);
            this.setState({IsAdd: false});
            this.loadingToast('加载中...', 2);
            getAddressList().then(res => {
                this.setState({data: res == null ? [] : res})
            })
        })
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}} className="addressPage">
                <Button onClick={() => {
                    this.setState({IsAdd: true, item: [], edit: false,})
                }}>新建地址</Button>
                {
                    !this.state.IsAdd ? <AddressList
                        data={this.state.data}
                        defaultAddress={(index, id) => this.defaultAddress(index, id)}
                        edit={(item) => this.setState({IsAdd: true, item: item, edit: true})}
                        delete={(index, id) => this.deleteAddress(index, id)}/> : <AddressAdd
                        edit={this.state.edit}
                        item={this.state.item}
                        saved={(value) => this.savedAddress(value)}
                        back={() => this.setState({IsAdd: false})}
                    />
                }
                <style jsx global>{`
                    .addressPage .am-button{
                        background: #C3221B;
                        height: 1rem;
                        line-height: 1rem;
                        color: #fff;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        border-radius: 0;
                        z-index: 9999;
                    }
                    .addressPage .am-button span{
                        font-size: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}
