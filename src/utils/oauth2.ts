
import {appId, scope} from '@/const/wechat';
export default function(): void {
  const openid: string | null = localStorage.getItem('openid');

  // 如果本地有openid就已经授权了不用再授权
  if (openid) {
    return;
  }

  // 是否有code码
  const {
    href,
    search,
  } = location;

  // 假如没有search，或者没有code，就去授权
  if (!search || !search.includes('code')) {
    // 这里的url需要转为加密格式，它的作用是访问微信网页鉴权接口成功后微信会回调这个地址，并把code参数带在回调地址中
    const redirectUri = encodeURIComponent(href);
    // tslint:disable-next-line
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`;

    // 跳转路由
    location.replace(url);
  } else {
    // 微信授权回来
    // ?code=021LfE0Z0w4UHV1neFZY0RYu0Z0LfE05&state=STATE

    console.log(search);
  }

}

// 测试
// http://118.31.227.99
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6bce565776a81ced&redirect_uri=http%3A%2F%2Fyangjin-art.top%2Fwechat%2F%23%2F&response_type=code&scope=snsapi_base#wechat_redirect
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6bce565776a81ced&redirect_uri=http%3A%2F%2F118.31.227.99%2Fwechat%2F%23%2F&response_type=code&scope=snsapi_base&state=123#wechat_redirect
