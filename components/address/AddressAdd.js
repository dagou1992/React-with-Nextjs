import React, {Component} from 'react';
import {Button, InputItem, Modal, PickerView} from 'antd-mobile';

import BaseComponent from '../BaseComponent';
import {selectByParentCode} from '../../api/addressApi';
import * as Mean from '../../static/static_name';

const alert = Modal.alert;

export default class AddressAdd extends BaseComponent {
    state = {
        set: false,
        name: '',
        phone: '',
        city: '',
        address: '',
        value: [Mean.DEFAULT_PROVINCE, Mean.DEFAULT_CITY, Mean.DEFAULT_DISTRICT],
        company: [],
        showPicker: false,
        IsChange: false,
        local: '',
        localName: '',
    }

    componentDidMount() {
        const {item} = this.props;
        if (item.id) {
            let addressFull = item.addressFull.split(' ');
            addressFull.pop();
            addressFull.join(' ');
            document.getElementById('textarea').value = item.address == undefined ? '' : item.address;
            this.setState({
                set: this.props.item.defaultAdd,
                name: item.name,
                phone: item.phone,
                city: item.province,
                address: item.address,
                localName: addressFull,
                local: [item.province, item.city, item.district]
            });
        }
        this.cityChange('110000', '110100');
    }

    cityChange(city, district) {
        this.loadingToast(Mean.LOADING, 5);
        selectByParentCode('0').then(res => {
            let province = [];
            res.map((item, index) => {
                province.push({
                    label: item.name,
                    value: item.code + '-' + item.name,
                })
            });
            selectByParentCode(city).then(res => {
                let city = [];
                res.map((item, index) => {
                    city.push({
                        label: item.name,
                        value: item.code + '-' + item.name,
                    })
                });
                selectByParentCode(district).then(res => {
                    this.loadingToast(Mean.LOADING, 0.01);
                    let district = [];
                    res.map((item, index) => {
                        district.push({
                            label: item.name,
                            value: item.code + '-' + item.name,
                        })
                    });
                    this.setState({company: [province, city, district]});
                })
            })
        })
    }

    onChange(value) {
        this.setState({IsChange: true});
        var code = [], name = [];
        value.map((item, index) => {
            code.push(item.split('-')[0]);
            name.push(item.split('-')[1]);
        })
        if (code[0] != this.state.value[0].split('-')[0]) {
            selectByParentCode(code[0]).then(res => {
                this.cityChange(code[0], res[0].code);
                if (code[1] == this.state.value[1].split('-')[0]) {
                    name[1] = res[0].name;
                    code[1] = res[0].code;
                    selectByParentCode(code[1]).then(res => {
                        name[2] = res[0].name;
                        code[2] = res[0].code;
                        this.setState({
                            localName: name[0] + ' ' + name[1] + ' ' + name[2],
                            local: code,
                        })
                    })
                }
            });
        } else {
            if (code[1] != this.state.value[1].split('-')[0]) {
                this.cityChange(code[0], code[1]);
                selectByParentCode(code[1]).then(res => {
                    name[2] = res[0].name;
                    code[2] = res[0].code;
                    this.setState({
                        localName: name[0] + ' ' + name[1] + ' ' + name[2],
                        local: code,
                    })
                })
            } else {
                if (code[1] == '110100') {
                    selectByParentCode(code[0]).then(res => {
                        name[1] = res[0].name;
                        code[1] = res[0].code;
                        this.setState({
                            localName: name[0] + ' ' + name[1] + ' ' + name[2],
                            local: code,
                        })
                    })
                }
                name[2] = value[2].split('-')[1];
                code[2] = value[2].split('-')[0];
                this.setState({
                    localName: name[0] + ' ' + name[1] + ' ' + name[2],
                    local: code,

                })

            }
        }
        this.setState({
            value
        });
    }

    addressChose() {
        document.activeElement.blur();
        this.setState({showPicker: true,local: Mean.DEFAULT_CITYFULL})
    }

    saveAddress() {
        const {item} = this.props;
        const text = document.getElementById('textarea').value;
        const result = [this.state.name, this.state.phone, this.state.local, text];
        console.log(result)
        console.log(this.state.localName);
        if (this.IsNull(result)) {
            alert('', Mean.ERROR_CONTENT, [{text: Mean.CONFIRM}])
        } else {
            let pattern = /^[0-9]{11}$/;
            if (!pattern.test(this.state.phone)) {
                alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
            } else {
                const value = {
                    name: this.state.name,
                    phone: this.state.phone,
                    province: this.state.local[0],
                    city: this.state.local[1],
                    district: this.state.local[2],
                    address: text,
                    addressFull: this.state.localName + ' ' + text,
                    defaultAdd: this.state.set
                }
                item.id != 0 ? value.id = item.id : null
                if(value.addressFull.indexOf(',') > -1) {
                    let arr = value.addressFull.split(',').join(' ');
                    value.addressFull = arr;
                }
                console.log(value)
                this.props.saved(value);
            }
        }
    }

    saveDistrict() {
        this.setState({showPicker: false});
        if (!this.state.IsChange) {
            document.getElementsByTagName('input')[2].value = Mean.DEFAULT_CITYFULL;
            var code = [], name = [];
            this.state.value.map((item, index) => {
                code.push(item.split('-')[0]);
                name.push(item.split('-')[1]);
            })
            this.setState({local: code, localName: Mean.DEFAULT_CITYFULL});
        } else {
            document.getElementsByTagName('input')[2].value = this.state.localName;
        }
    }

    render() {
        const {item} = this.props;
        return (
            <div className="addAddress">
                {
                    item.length != 0 ? <div className="content">
                        <InputItem placeholder={Mean.NAME} defaultValue={item.name}
                                   onChange={(value) => this.setState({name: value})}/>
                        <InputItem placeholder={Mean.PHONE_NUMBER} defaultValue={item.phone}
                                   onChange={(value) => this.setState({phone: value})}/>
                        <InputItem placeholder={Mean.SELECT_PROVINCE_CITY_DISTICT}
                                   defaultValue={item.addressFull.split(' ')[0] + ' ' + item.addressFull.split(' ')[1] + ' ' + item.addressFull.split(' ')[2]}
                                   onChange={(value) => this.setState({city: value})}
                                   onClick={() => this.addressChose()}/>
                        <textarea placeholder={Mean.DEATAIL_ADDRESS} id="textarea"/>
                        <div className="set">
                            <img className="IsCheck"
                                 src={this.state.set ? Mean.CHECK : Mean.NO_CHECK}
                                 onClick={() => {
                                     this.setState({set: !this.state.set})
                                 }}
                            />
                            <span>{Mean.CHOSE_DEFAULT_ADDRESS}</span>
                        </div>
                    </div> : <div className="content">
                        <InputItem placeholder={Mean.NAME} onChange={(value) => this.setState({name: value})}/>
                        <InputItem placeholder={Mean.PHONE_NUMBER} onChange={(value) => this.setState({phone: value})}/>
                        <InputItem placeholder={Mean.SELECT_PROVINCE_CITY_DISTICT}
                                   onClick={() => {
                                       document.activeElement.blur();
                                       this.setState({showPicker: true});
                                   }}
                                   onChange={(value) => this.setState({city: value})}/>
                        <textarea placeholder={Mean.DEATAIL_ADDRESS} id="textarea"/>
                        <div className="set">
                            <img className="IsCheck"
                                 src={this.state.set ? Mean.CHECK : Mean.NO_CHECK}
                                 onClick={() => {
                                     this.setState({set: !this.state.set})
                                 }}
                            />
                            <span>{Mean.CHOSE_DEFAULT_ADDRESS}</span>
                        </div>
                    </div>
                }
                <p className="backToList" onClick={() => this.props.back()}>{Mean.BACK_ADDRESS_LIST}</p>
                <Button onClick={() => this.saveAddress()}>{Mean.SAVE}</Button>
                {
                    this.state.showPicker ? <div>
                        <PickerView
                            onChange={(...args) => this.onChange(...args)}
                            value={this.state.value}
                            data={this.state.company}
                            cascade={false}
                        />
                        <span className="closePicker" onClick={() => this.saveDistrict()}>{Mean.SAVE}</span>
                    </div> : null
                }
                <style jsx global>{`
                    .addAddress .content{
                        background: #fff;
                        padding: 0 0.3rem;
                    }
                    .addAddress .am-list-item.am-input-item:after{
                        width: 92%;
                    }
                    .addAddress .content input{
                        font-size: 0.24rem;
                    }
                    .addAddress .content textarea{
                        border: 0;
                        width: 92%;
                        margin-left: 0.25rem;
                        font-size: 0.24rem;
                        opacity: 0.7;
                        color: #000;
                        padding-top: 0.3rem;
                        border-bottom: 1px solid #ddd;
                        height: 1.3rem;
                    }
                    .addAddress .set{
                        text-align: center;
                        padding: 0.3rem;
                    }
                    .addAddress .backToList{
                        font-size: 0.24rem;
                        margin: 0.2rem;
                        float: right;
                        opacity: 0.8;
                        color: #C3221B;
                    }
                    .addAddress .am-picker{
                        background: #fff;
                        height: 4rem;
                    }
                    .addAddress .closePicker{
                        position: fixed;
                        right: 0;
                        bottom: 3rem;
                        z-index: 99;
                        font-size: 0.3rem;
                        margin: 0.24rem;
                        height: 1.5rem;
                    }
                    .set .IsCheck{
                        width: 0.3rem;
                        vertical-align: middle;
                    }
                    .set span{
                        margin-left: 0.3rem;
                        font-size: 0.24rem;
                        color: #000;
                        opacity: 0.7;
                    }
                    .addAddress .am-picker{
                        position: fixed;
                        bottom: 0.5rem;
                        z-index: 99;
                        width: 100%;
                    }
                    .addAddress .am-picker .am-picker-col-item{
                        font-size: 0.3rem;
                    }
                `}</style>
            </div>
        )
    }
}
