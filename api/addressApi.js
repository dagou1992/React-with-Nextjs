import uuid from 'uuid';
import {postJson, getJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}
export function getAddressList() {
    return postJson('/consigneeAddress/getAddressList', {...baseParams, param: ''})
}

export function addOrEditAddress(edit, param) {
    const api = edit ? '/consigneeAddress/updateAddress' : '/consigneeAddress/addAddress';
    return postJson(api, {...baseParams, param})
}

export function deleteAddress(param) {
    return postJson('/consigneeAddress/deleteAddress', {...baseParams, param})
}

export function setDefaultAddress(param) {
    return postJson('/consigneeAddress/setDefault', {...baseParams, param})
}

export function selectByParentCode(code) {
    return getJson('/division/selectByParentCode?parentCode=' + code)
}