import uuid from 'uuid';
import {postNoTokenJson, getBaseURL, postLoginJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}
export function getCodeImage() {
    return getBaseURL() + '/captcha/captcha';
}

export function getVerifyCode(param) {
    return postNoTokenJson('/verifyCode/sendVerifyCode', {...baseParams, param});
}

export function postSignIn(param) {
    return postNoTokenJson('/user/register', {...baseParams, param});
}

export function postLogin(param,type) {
    return postLoginJson('/appUser/login', type, {...baseParams, param});
}

export function resetPassword(param) {
    return postNoTokenJson('/user/resetPassword', {...baseParams, param})
}

export function postCheckSignIn(param) {
    return postNoTokenJson('/user/check', {...baseParams, param})
}