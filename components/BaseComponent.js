import React, {Component} from 'react';
import {Toast, Modal} from 'antd-mobile';
import Router from 'next/router';

import * as Mean from '../static/static_name';
import {getVerifyCode} from '../api/registerApi';
import {statisticsPv} from '../api/indexApi';

const alert = Modal.alert;

export default class BaseComponent extends Component {
    loadingToast(title, time) {
        Toast.info(<div>
            <img style={{width: '1rem'}} src={Mean.ICON_LOADING_CAT}
                 alt=""/>
            <p style={{fontSize: '0.24rem'}}>{title}</p>
        </div>, time);
    }

    //记录PV
    statisticsPv(param) {
        statisticsPv(param)
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }


    //判断是否为空
    IsNull(param) {
        for (var i in param) {
            if (param[i] == '') {
                return true;
            }
        }
        return false
    }

    //aes加密
    Encrypt(word) {
        var key = CryptoJS.enc.Utf8.parse('TomShop123456789');
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    //获取验证码
    getCodes(reqType) {
        console.log(reqType)
        let pattern = /^[0-9]{11}$/;
        if (this.state.phone == '') {
            alert('', Mean.ERROR_PHONE_NULL, [{text: Mean.CONFIRM}])
        } else if (this.state.code == '') {
            alert('', Mean.ERROR_CODE_NULL, [{text: Mean.CONFIRM}])
        } else if (!pattern.test(this.state.phone)) {
            alert('', Mean.ERROR_PHONE, [{text: Mean.CONFIRM}])
        }
        if (!this.state.countDown && this.state.phone != '' && this.state.code != '' && pattern.test(this.state.phone)) {
            this.setState({countDown: true, countDownNum: 60})
            let num = 60;
            const phoneCode = document.getElementsByClassName('phoneCode')[0];
            let timer = setInterval(() => {
                if (phoneCode.innerHTML == 0) {
                    clearInterval(timer);
                    phoneCode.innerHTML = Mean.GET_CODE;
                    this.setState({countDown: false})
                } else {
                    if (phoneCode) {
                        num = num - 1;
                        phoneCode.innerHTML = num;
                    } else {
                        clearInterval(timer);
                    }
                }
            }, 1000);
            const result = {
                phone: this.state.phone,
                captcha: this.state.code,
                reqType: reqType,
            }
            getVerifyCode(result).then(res => {

            }).catch(err => {
                console.log(err);
                if (err.code == 104) {
                    alert('', Mean.ERROR_CODE, [
                        {
                            text: Mean.CONFIRM, onPress: () => {
                            this.setState({countDown: false});
                            clearInterval(timer);
                            phoneCode.innerHTML = Mean.GET_CODE;
                        }
                        },
                    ])
                } else if (err.code == 108) {
                    alert('', Mean.ERROR_USER_EXIST, [{
                        text: Mean.CONFIRM, onPress: () => {
                            this.setState({countDown: false});
                            clearInterval(timer)
                        }
                    }
                    ])
                } else if (err.code == 201) {
                    alert('', Mean.ERROR_PHONE, [{
                        text: Mean.CONFIRM, onPress: () => {
                            this.setState({countDown: false});
                            clearInterval(timer)
                        }
                    }
                    ])
                } else if (err.code == 102) {
                    alert('', Mean.ERROR_USER, [{
                        text: Mean.CANCEL, onPress: () => {
                            this.setState({countDown: false});
                            clearInterval(timer)
                            phoneCode.innerHTML = Mean.GET_CODE;
                        }
                    }, {
                        text: Mean.TO_SIGNIN, onPress: () => {
                            this.props.signIn();
                            document.getElementsByClassName('logoHeader')[0].firstChild.innerHTML = Mean.REGISTER;
                        }
                    }
                    ])
                } else if (err.code == 300) {
                    alert('', Mean.ERROR_PHONECODE_SEND, [{text: Mean.CONFIRM}])
                } else if (err.code == 301) {
                    alert('', Mean.ERROR_PHONECODE_SEND_BUSY, [{text: Mean.CONFIRM}])
                } else if (err.code == 302) {
                    alert('', Mean.ERROR_PHONECODE_SEND_LIMIT, [{text: Mean.CONFIRM}])
                }
            })
        }
    }

    //未登录
    IsLogin() {
        let pathName = '';
        if (window.location.href.indexOf('=') > -1) {
            const id = window.location.href.split('=')[1];
            pathName = window.location.pathname + '?id=' + id;
        } else {
            pathName = window.location.pathname;
        }
        alert('', '您还未登录', [
            {text: '取消'},
            {
                text: '去登录', onPress: () => {
                window.localStorage.setItem('backUrl', pathName);
                this.loadingToast('加载中...', 2);
                Router.push('/register');
            }
            }
        ])
    }

    //判断是否在微信中
    isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }

    //联系客服
    chatWithService(){
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(this.isWeiXin()) {
            alert('','请在浏览器中打开进行联系客服',[{text: '确定'}])
        }else{
            if(isAndroid){
                window.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=3374442702&site=qq&menu=yes';
            } else if(isiOS) {
                alert('','客服QQ：3374442702',[{text: '确定'}]);
                window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=3374442702&version=1&src_type=web&web_src=bjhuli.com";
            }
        }
    }
}


