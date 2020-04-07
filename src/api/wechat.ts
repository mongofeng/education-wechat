import * as type from '@/const/type/wechat';
import { AxiosPromise } from 'axios';
import http from '@/utils/http';

/**
 * 获取openId
 * @param params
 */
export function fetchOpenId(params: type.ICode): AxiosPromise<type.IOpenId> {
  return http.post('openid', params);
}

export function fetchUserInfo(params: type.IInfo): AxiosPromise<type.IUserInfo> {
  return http.post('wechat/userInfo', params);
}


export function openIdLogin(params: {
  openId: string,
}): AxiosPromise<{data: string}> {
  return http.post('auth/openId', params);
}

