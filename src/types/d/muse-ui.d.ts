// d.ts不能直接导出类型any,而是要const a: any
declare module 'muse-ui-message' {
  import Message from 'muse-ui-message/types';
  const a: Message;
  export default a;
}

declare module 'muse-ui-toast' {
  import Toast from 'muse-ui-toast/types';
  const a: Toast;
  export default a;
}
