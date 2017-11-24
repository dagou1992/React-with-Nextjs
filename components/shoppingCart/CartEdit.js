import React, {Component} from 'react';
import {Card, Flex, Button, InputItem, Picker, List, Modal} from 'antd-mobile';
import * as Mean from '../../static/static_name';

const alert = Modal.alert;

export default class CartNormal extends Component {
    state = {
        count: 3,
        data: [{
            label: '黑色',
            value: '黑色',
        },
            {
                label: '白色',
                value: '白色',
            }],
        val: '黑色',
        list: this.props.data,
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className="cartEdit">
                {
                    this.state.list.map((item, index) => {
                        return <Card key={index}>
                            <Card.Body>
                                <Flex>
                                    <Flex.Item>
                                        <img name={Number(item.sellingPriceNew) * Number(item.number)}
                                             id={item.skuSn}
                                             className="checkImg"
                                             src={Mean.NO_CHECK}
                                             alt=""/>
                                        <img className="productImg"
                                             src={item.coverPic}/>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <h1>{item.title}</h1>
                                        <div className="buttonCount">
                                            <Button
                                                name="reduce"
                                                size="small"
                                                inline
                                                disabled={item.number == 1 ? true : false}
                                                onClick={() => {
                                                    let list = [...this.state.list];
                                                    const number = item.number - 1
                                                    list[index].number = number;
                                                    this.setState({
                                                        list
                                                    })
                                                }}
                                            >-</Button>
                                            <InputItem
                                                id={index}
                                                maxLength="6"
                                                disabled={true}
                                                value={item.skuStock == 0 ? '0' :item.number}
                                            ></InputItem>
                                            <Button
                                                size="small"
                                                inline
                                                name="add"
                                                style={item.skuStock == 0 ? {borderRight: '1px solid #ccc'} : null }
                                                disabled={item.skuStock == 0 ? true : false}
                                                onClick={() => {
                                                    let list = [...this.state.list];
                                                    const number = item.number + 1
                                                    list[index].number = number;
                                                    this.setState({
                                                        list
                                                    })
                                                }}
                                            >+</Button>
                                        </div>
                                        <div className='picker'>
                                            <Picker
                                                data={this.props.skuList} cols={1} onOk={(val) => {
                                                console.log(val)
                                                const list = [...this.state.list];
                                                list[index].skuSpec = val[0].split('-')[0];
                                                list[index].skuSn = val[0].split('-')[1];
                                                list[index].sellingPriceNew = val[0].split('-')[2];
                                                this.setState({list})
                                            }}>
                                                <List.Item arrow="horizontal" onClick={() => {
                                                    this.props.getSkuList(item.spuSn);
                                                }}>{'已选: ' + item.skuSpec}</List.Item>
                                            </Picker>
                                        </div>
                                        <h2 className="price"
                                            style={{display: 'none'}}>{'￥' + item.sellingPriceNew}</h2>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <div
                                            className="delete"
                                            onClick={() => alert('', '确定删除吗？', [
                                                {text: '取消', onPress: () => console.log('cancel')},
                                                {
                                                    text: '确定', onPress: () => {
                                                    const list = [...this.state.list];
                                                    list.splice(index, 1);
                                                    this.setState({list})
                                                    this.props.deleteData(index, item.id);
                                                }
                                                },
                                            ])}
                                        >
                                            删除
                                        </div>
                                    </Flex.Item>
                                </Flex>
                            </Card.Body>
                        </Card>
                    })
                }
                <style jsx global>{`
                    .cartEdit{
                        padding: 0.3rem;
                        padding-right: 0;
                        padding-top: 0;
                    }
                    .cartEdit .am-card{
                        border: 0;
                        position: relative;
                        padding: 0;
                    }
                    .cartEdit .am-card-body{
                        padding: 0;
                    }
                    .cartEdit .am-card:last-child{
                        border-bottom: 1px solid #ddd;
                        border-radius: 0;
                    }
                    .cartEdit .am-card-body .productImg{
                         width: 1.8rem;
                         margin-left: 0.6rem;
                         margin-top: 0.24rem;
                    }
                    .cartEdit .checkImg{
                        width: 0.3rem;
                        position: absolute;
                        top: 0.99rem;
                    }
                    .cartEdit .am-flexbox .am-flexbox-item:first-child{
                        width: 2.5rem;
                        height: 2.3rem;
                        flex: initial;
                     }
                    .cartEdit .am-card h1{
                        width: 2.2rem;
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.8;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .cartEdit .am-card h4{
                        opacity: 0.5;
                        color: #000;
                        font-size: 0.24rem;
                        margin-top: 0.45rem;
                    }
                    .cartEdit .am-card-body h2{
                        color: #C3221B;
                        font-size: 0.24rem;
                        float: right;
                        margin-top: 0.7rem;
                        padding: 0;
                     }
                     .cartEdit .buttonCount{
                        width: 2.5rem;
                        margin-top: 0.24rem;
                     }
                     .cartEdit .buttonCount .am-button-small{
                        width: 0.65rem;
                        height: 0.36rem;
                        text-align: center;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 0;
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 0;
                        font-size: 0.35rem;
                        color: #000;
                        border: 1px solid #000;
                        vertical-align: bottom;
                        padding: 0;
                     }
                     .cartEdit .buttonCount .am-button-small:first-child{
                        border-right: 0;
                        line-height: 0.28rem;
                     }
                     .cartEdit .buttonCount .am-button-small:last-child{
                        border-top-right-radius: 5px;
                        border-top-left-radius: 0;
                        border-bottom-right-radius: 5px;
                        border-bottom-left-radius: 0;
                        border-left: 0;
                        line-height: 0.33rem;
                     }
                     .cartEdit .buttonCount .am-button-disabled{
                        background: #fff;
                        border: 1px solid #ccc;
                        color: #ccc;
                        border-right: 0;
                     }
                     .cartEdit .buttonCount .am-list-item{
                        width: 0.7rem;
                        height: 0.328rem;
                        font-size: 0.18rem;
                        min-height: 0;
                        display: inline-block;
                        border: 1px solid #000;
                        padding: 0;
                        vertical-align: bottom;
                     }
                     .cartEdit .picker{
                        width: 1rem;
                     }
                     .cartEdit .picker .am-list-item{
                        width: 2.5rem;
                        padding: 0;
                     }
                     .cartEdit .picker .am-list-content{
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.5;
                        width: 1rem;
                     }
                     .am-list-extra{
                        display: none;
                     }
                     .cartEdit .am-list-item input:disabled{
                        font-size: 0.18rem;
                        padding: 0;
                        color: #C3221C;
                        text-align: center;
                        opacity: 1;
                        height: 0.328rem;
                        vertical-align: top;
                     }
                     .am-list-item.am-input-item:after{
                         border: 0;
                     }
                     .cartEdit .delete{
                        height: 2.3rem;
                        background: #C3221C;
                        color: #fff;
                        font-size: 0.3rem;
                        text-align: center;
                        line-height: 2.28rem;
                        padding-left: 0.1rem;
                        width: 0.9rem;
                        float: right;
                        position: relative;
                        z-index: 9;
                     }

                `}</style>
            </div>
        )
    }
}