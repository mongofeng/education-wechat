import * as type from '@/const/type/wechat';
import { ApiResponse } from '@/types/api';
import http from '@/utils/http';

/**
 * 获取openId
 * @param params
 */
export function fetchOpenId(params: type.ICode): ApiResponse<type.IOpenId> {
  return http.post('wechat/openid', params);
}
