import React, {Component} from 'react';
import {Modal} from 'antd-mobile';

import * as Mean from '../../static/static_name';

const alert = Modal.alert;

export default class AddressList extends Component{
    render() {
        return (
            <div className="addressList">
                {
                    this.props.data && this.props.data.map((item,index) => {
                        return <div key={index} className="card">
                            <h1 onClick={() => this.props.defaultAddress(index, item.id)}>{item.name}<span>{item.phone}</span></h1>
                            <p onClick={() => this.props.defaultAddress(index, item.id)}>{item.addressFull}</p>
                            <div className="action">
                                <img
                                    className="IsCheck"
                                    src={item.defaultAdd ? Mean.CHECK : Mean.NO_CHECK}
                                    onClick={() => this.props.defaultAddress(index, item.id)}
                                />
                                <span>默认地址</span>
                                <img
                                    className="edit"
                                    src={Mean.ICON_EDIT}
                                    onClick={() => this.props.edit(item)}
                                />
                                <img
                                    className="delete"
                                    src={Mean.ICON_DELETE}
                                    onClick={() => alert('','确定删除吗？', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确定', onPress: () => {
                                            this.props.delete(index,item.id);
                                        }},
                                    ])}
                                />
                            </div>
                        </div>
                    })
                }

                <style jsx global>{`
                    .addressList .card{
                        padding: 0.3rem;
                        background: #fff;
                        margin-bottom: 0.24rem;
                    }
                    .addressList .card:last-child{
                        margin-bottom: 1.5rem;
                    }
                    .addressList .card h1{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.8;
                    }
                    .addressList .card h1 span{
                        float: right;
                    }
                    .addressList .card p{
                        width: 100%;
                        opacity: 0.5;
                        color: #000;
                        font-size: 0.24rem;
                        padding: 0.3rem 0;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        border-bottom: 1px solid #ddd;
                    }
                    .addressList .card .action{
                        padding-top: 0.3rem;
                    }
                    .addressList .card .action span{
                        font-size: 0.24rem;
                        margin-left: 0.3rem;
                        color: #000;
                        opacity: 0.5;
                    }
                    .addressList .card .IsCheck{
                        width: 0.3rem;
                        vertical-align: middle;
                    }
                    .addressList .card .delete{
                        float:right;
                        width: 0.48rem;
                        margin-right: 0.6rem;
                    }
                    .addressList .card .edit{
                        float:right;
                        width: 0.48rem;
                        margin-right: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}
