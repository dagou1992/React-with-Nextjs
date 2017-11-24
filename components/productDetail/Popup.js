import React, {Component} from 'react';
import {Button, Icon, Tag, InputItem, Popup, Modal} from 'antd-mobile';

const alert = Modal.alert;

export default class PopupComponent extends Component {
    state = {
        count: this.props.newCount,
        num: this.props.newNum,
        standard: this.props.newStandard,
        skuSpec: this.props.skuSpec,
        spuSn: -1,
        skuSn: -1,
        nowStock: this.props.nowStock,
    }
    componentDidMount() {
        const tags = document.getElementsByClassName("am-tag");
        const mask = document.getElementsByClassName("am-popup-mask");
        if(this.props.skuSpec[0].stock != 0) {
            tags[this.state.num].className = 'am-tag tag-active';
        }
        this.setState({skuSn: tags[0].getAttribute('data-id')});
        for (let i = 0; i < tags.length; i++) {
            tags[i].onclick = (e) => {
                if (tags[i].className.indexOf('disabled') < 1) {
                    this.setState({num: i, standard: e.target.innerText, skuSn: tags[i].getAttribute('data-id')});
                }
                this.props.selectCount(this.state.count, this.state.standard, this.state.num, this.state.skuSn, this.state.nowStock);
            }
        }
        mask[0].onclick = () => {
            this.props.selectCount(this.state.count, this.state.standard, this.state.num, this.state.skuSn, this.state.nowStock);
        }
    }

    tagChange(stock) {
        if(this.state.count > stock) {
            this.props.overStock();
        }else if(this.state.count <= stock){
            this.props.noOverStock();
        }
        this.props.selectCount(this.state.count, this.state.standard, this.state.num, this.state.skuSn, stock);
        this.setState({nowStock: stock});
        const tag = document.getElementsByClassName("am-tag");
        tag[this.state.num].className = 'am-tag tag-active';
        for (let i = 0; i < tag.length; i++) {
            if (this.state.num != i && tag[i].className.indexOf('tag-active') > -1) {
                tag[i].className = 'am-tag am-tag-normal';
            }
        }
    }

    render() {
        return (
            <div className="popup">
                <span
                    style={{
                        position: 'absolute',
                        right: 3,
                        top: 5,
                        width: '1rem',
                        height: '1.5rem',
                        textAlign: 'right'
                    }}
                    onClick={() => {
                        this.props.selectCount(this.state.count, this.state.standard, this.state.num, this.state.skuSn, this.state.nowStock);
                        Popup.hide();
                    }}
                >
                <Icon type="cross"/>
                </span>
                <h3 style={{margin: '0.3rem 0'}}>单价: <span
                    className="price">￥: {this.state.skuSpec[this.state.num].price.toFixed(2)}</span></h3>
                <h3>规格:</h3>
                <div className="Tags">
                    {
                        this.state.skuSpec.map((item, index) => {

                            return item.stock == 0 ? <Tag disabled data-id={item.skuSn} key={index}>{item.skuSpec}</Tag> :
                                <Tag ref='tag' key={index} data-id={item.skuSn}
                                     onChange={(...args) => this.tagChange(item.stock)}>{item.skuSpec}</Tag>
                        })
                    }
                </div>
                <h3>数量:</h3>
                <div className="buttonCount">
                    <Button
                        size="small"
                        inline
                        disabled={this.state.count == 1 ? true : false}
                        onClick={() => {
                            console.log(this.state.count)
                            console.log(this.state.nowStock)
                            if(this.state.count-1 <= this.state.nowStock){
                                this.props.noOverStock();
                            }
                            this.setState({count: this.state.count - 1});
                            this.props.selectCount(this.state.count - 1, this.state.standard, this.state.num, this.state.skuSn, this.state.nowStock);
                        }}
                    >-</Button>
                    <InputItem
                        maxLength="6"
                        disabled={true}
                        value={this.state.count}
                    ></InputItem>
                    <Button
                        size="small"
                        style={this.state.count == this.state.nowStock +1 || this.state.count > this.state.nowStock ? {borderRight: '1px solid #ccc'} : null }
                        inline
                        disabled={this.state.count == this.state.nowStock +1 || this.state.count > this.state.nowStock? true : false}
                        onClick={() => {
                            if(this.state.count == this.state.nowStock || this.state.count > this.state.nowStock) {
                                this.props.overStock();
                            }
                                this.setState({count: this.state.count + 1});
                                this.props.selectCount(this.state.count + 1, this.state.standard, this.state.num, this.state.skuSn, this.state.nowStock);
                        }}
                    >+</Button>
                </div>
                <h3 className="inventory">库存: <span>{this.state.skuSpec[this.state.num].stock + '件'}</span>
                    {
                        this.state.count == this.state.nowStock +1 || this.state.count > this.state.nowStock ? <span style={{color: '#C3221B',opacity: '1'}}>超过库存</span> : null
                    }
                </h3>
                <style jsx global>{`
                     .popup{
                        padding: 0.3rem;
                     }
                     .popup h3{
                        color: #000;
                        opacity: 0.7;
                        font-size: 0.24rem;
                     }
                     .popup .inventory{
                        margin: 0.3rem 0.3rem 0 0;
                     }
                     .popup .inventory span{
                        margin-left: 0.3rem;
                        color: #000;
                        opacity: 0.5;
                        font-size: 0.24rem;
                     }

                     .popup .Tags{
                        margin-left: 0.87rem;
                        margin-top: 0.24rem;
                        width: 4rem;
                        max-height: 3.2rem;
                        overflow-x: scroll;
                     }
                     .popup .buttonCount{
                        margin-left: 0.87rem;
                        margin-top: 0.24rem;
                        width: 4rem;
                     }
                     .popup .am-tag{
                        border-radius: 5px;
                        font-size: 0.24rem;
                        height: 0.52rem;
                        margin-right: 0.24rem;
                        margin-bottom: 0.24rem;
                     }
                     .popup .am-tag-normal{
                        border:1px solid #000;
                        color: #000;
                     }
                     .popup .am-tag-active{
                        border:1px solid #000;
                        color: #000;
                     }
                     .tag-active{
                        border: 1px solid #C3221C;
                        color: #C3221C;
                     }
                     .popup .buttonCount .am-button-small{
                        width: 0.92rem;
                        height: 0.52rem;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 0;
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 0;
                        font-size: 0.45rem;
                        color: #000;
                        border: 1px solid #000;
                        vertical-align: bottom;
                     }
                     .popup .price{
                        margin: 0.24rem;
                        font-size: 0.28rem;
                     }
                     .popup .buttonCount .am-button-disabled{
                        background: #fff;
                        border: 1px solid #ccc;
                        color: #ccc;
                        border-right: 0;
                     }
                     .popup .buttonCount .am-button-small:first-child{
                        border-right: 0;
                        line-height: 0.40rem;
                     }
                     .popup .buttonCount .am-button-small:last-child{
                        border-top-right-radius: 5px;
                        border-top-left-radius: 0;
                        border-bottom-right-radius: 5px;
                        border-bottom-left-radius: 0;
                        border-left: 0;
                        line-height: 0.50rem;
                     }
                     .am-popup-mask{
                        height: 80%;
                        margin-bottom: 1rem;
                     }
                     .am-popup-slide-up{
                        bottom: 1rem;
                     }
                     .popup .am-list-item{
                        width: 1rem;
                        height: 0.485rem;
                        min-height: 0;
                        display: inline-block;
                        border: 1px solid #000;
                        padding: 0;
                        vertical-align: bottom;
                     }
                     .popup .am-list-item input:disabled{
                        font-size: 0.24rem;
                        height: 0.485rem;
                        padding: 0;
                        color: #C3221C;
                        text-align: center;
                        opacity: 1;
                     }
                     .am-list-item.am-input-item:after{
                         border: 0;
                     }
                `}</style>
            </div>
        )
    }
}
