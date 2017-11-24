import axios from 'axios';
import interceptor from './netInterceptor';
import AuthorizeError from '../common/AuthorizeError';
import {Modal, Toast} from 'antd-mobile';
import Router from 'next/router';

const alert = Modal.alert;
const HEADER_NAME_TOKEN = 'X-Auth-Token';
const BASE_URL = process.env.API_BASE_URL;//http://192.168.30.54:3000/api,process.env.API_BASE_URL

export function getJson(api, query, pathValues = null, https = false) {
    const instance = getDefaultInstance();
    api = applyPathValues(api, pathValues);

    return instance.get(api, {params: query});
}

export function postNoTokenJson(api, data = {}, pathValues = null, https = false) {
    const instance = getDefaultInstance(false);
    api = applyPathValues(api, pathValues);

    return instance.post(api, data);
}

export function postJson(api, data = {}, pathValues = null, https = false) {
    const instance = getDefaultInstance();
    api = applyPathValues(api, pathValues);

    return instance.post(api, data);
}

export function postNoApiJson(api, data = {}, pathValues = null, https = false) {
    const instance =  axios.create({
        baseURL: getBaseURL().indexOf('api') > -1 ? getBaseURL().split('/api')[0] : getBaseURL(),
        withCredentials: true,
    })

    api = applyPathValues(api, pathValues);

    return instance.post(api, data);
}

export function postLoginJson(api, type, data = {}, pathValues = null, https = false){
    const instance = getDefaultInstance(true,type);
    api = applyPathValues(api, pathValues);

    return instance.post(api, data);
}

export function getJsonWithSignature(url, query, appKey, appSecret) {
    const instance = getDefaultInstance();
    url = applyQueryWithSinature(url, query, config.appKey, config.appSecret);

    return instance.get(url);
}

export function postForm(api, fieldValues, pathValues = null, withInterceptor = true, https = false) {
    const instance = getDefaultInstance();
    api = applyPathValues(api, pathValues);

    const formData = createFormData(fieldValues);

    return instance.post(api, formData);
}

export function clearAuthToken() {
    window.localStorage.removeItem('token');
}


export function getBaseURL() {
    if (typeof window === 'object') {
        return '/api';
    }

    return BASE_URL;
}

function getDefaultInstance(bol,type) {
    if(bol != undefined){
        const instance = !bol ? axios.create({
            baseURL: getBaseURL(),
            withCredentials: true,
        }) :  axios.create({
            baseURL: getBaseURL(),
            withCredentials: true,
            headers: {'X-Social-Type': type}
        })

        instance.interceptors.response.use(res => {
            bol ? window.localStorage.setItem('token', res.headers['x-auth-token']) : null
            return interceptor(res.data);
        }, err => {
            if (err.response.status === AuthorizeError.status) {
                return Promise.reject(new AuthorizeError(err.response));
            }

            return Promise.reject(new Error(err.response.data));
        });

        return instance;
    }else{
        let instance = axios.create({
            baseURL: getBaseURL(),
            withCredentials: true,
        })
        /*if(window.localStorage.getItem('token')){
            instance = axios.create({
                baseURL: getBaseURL(),
                withCredentials: true,
                headers: {'X-Auth-Token': window.localStorage.getItem('token')}
            })
        }*/
        instance.interceptors.request.use(config => {
                const token = getAuthToken();
                if (token != null) {
                    config.headers[HEADER_NAME_TOKEN] = token;
                 }
                 return config;
        });

        instance.interceptors.response.use(res => {
            return interceptor(res.data);
        }, err => {
            if(err.response.status == 401) {
                alert('', '登录失效', [
                    {text: '取消'},
                    {text: '去登录',onPress: () => {
                        clearAuthToken();
                        window.localStorage.setItem('backUrl','/');
                        Toast.info(<div>
                            <img style={{width: '1rem'}} src="https://app-public.oss-cn-shanghai.aliyuncs.com/tom/loadingPage.png"
                                 alt=""/>
                            <p style={{fontSize: '0.24rem'}}>加载中...</p>
                        </div>, 2);
                        Router.push('/register');
                    }}
                ])
            }else if (err.response.status == 500) {
                Toast.info(<div>
                    <img style={{width: '1rem'}} src="https://app-public.oss-cn-shanghai.aliyuncs.com/tom/loadingPage.png"
                         alt=""/>
                    <p style={{fontSize: '0.24rem'}}>服务器出错</p>
                </div>, 1);
            }
            if (err.response.status === AuthorizeError.status) {
                return Promise.reject(new AuthorizeError(err.response));
            }

            return Promise.reject(new Error(err.response.data));
        });

        return instance;
    }
}

/**
 * @param {string} api
 * @param {Object} pathValues
 * return {string}
 */
function applyPathValues(api, pathValues) {
    if (pathValues) {
        const rex = /{\w+}/g;

        let matched = api.match(rex);
        for (let match of matched) {
            let pathName = match.substr(1, match.length - 2);
            if (pathValues[pathName]) {
                api = api.replace(match, '' + pathValues[pathName]);
            }
        }
    }

    return api;
}

/**
 * 应用查询参数
 * @param {*} url 
 * @param {*} query 
 * @param {*} appKey 
 * @param {*} appSecret 
 */
function applyQueryWithSinature(url, query, appKey, appSecret) {
    return applyQuery(url, addSignatureQuery(query, appKey, appSecret));
}

/**
 * @param {string} api
 * @param {Object} query
 * @returns {string}
 */
function applyQuery(api, query) {
    if (!query) {
        return api;
    }

    if (api.indexOf('?') < 0) {
        api += '?';
    }

    let parts = Object.keys(query).map(key => key + '=' + query[key]);
    let queryString = parts.join('&');
    api += queryString;

    return api;
}

function createFormData(fieldsValue) {
    if (fieldsValue == null) {
        return null;
    }

    let formData = new FormData();

    for (let key in fieldsValue) {
        if (fieldsValue.hasOwnProperty(key)) {
            const value = fieldsValue[key];

            if (Array.isArray(value)) {
                for (let item of value) {
                    formData.append(key, item);
                }
            } else {
                if (value != undefined) {
                    formData.append(key, value);
                }
            }
        }
    }

    return formData;
}

function saveAutoToken(headers) {
    const token = headers[HEADER_NAME_TOKEN.toLowerCase()];
    console.log('token=' + token);

    if (token != null) {
        window.localStorage.setItem('token', token);
    }
}

function getAuthToken() {
    const token = window.localStorage.getItem('token');
    return token;
}