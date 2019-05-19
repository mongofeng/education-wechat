import * as type from '@/const/type/wechat';
import { AxiosPromise } from 'axios';
import http from '@/utils/http';

/**
 * 获取openId
 * @param params
 */
export function fetchOpenId(params: type.ICode): AxiosPromise<type.IOpenId> {
  return http.post('wechat/openid', params);
}
