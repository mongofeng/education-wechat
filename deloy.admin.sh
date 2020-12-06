#!/bin/bash

# 部署的服务器的地址
deloy_server=root@118.31.227.99

# 前端部署的地址
deloy_root_path=/root/docker/nginx/html/

# 部署的目录
deloy_path=wechat

localpath=public/pay.html


target=${deloy_server}:${deloy_root_path}$deloy_path/
echo "拷贝文件夹到目录下:${target}"
scp -i ~/.ssh/pk_rsa.pem -r $localpath ${target}


