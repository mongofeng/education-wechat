#!/bin/bash

# 部署的服务器的地址
deloy_server=root@118.31.227.99

# 前端部署的地址
deloy_root_path=/root/docker/nginx/html/

# 部署的目录
deloy_path=wechat

# 打包的目录
build_path=dist


echo 开始打包的操作
npm run build-sit

if [ $? -eq 0 ]; then
    echo "编译成功"
else
    echo "编译失败退出"
    exit 1
fi
echo 部署执行后的文件


target=${deloy_server}:${deloy_root_path}
echo "拷贝文件夹到目录下:${target}"
scp -r dist ${target}

echo 登录操作服务器
dir=${deloy_root_path}${deloy_path}

echo "删除目标文件夹下的所有文件:$dir"

tem_dir=${deloy_root_path}${build_path}
echo "拷贝微信的文档到临时的文件夹:$tem_dir"

ssh $deloy_server "rm -rf $dir && cp $deloy_root_path/*.txt ${tem_dir}/ && mv $tem_dir $dir"

echo 部署成功
