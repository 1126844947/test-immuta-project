# 使用Node.js 14 Alpine镜像（轻量且适合生产环境）
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（利用Docker层缓存，加快构建速度）
COPY package*.json ./

# 安装依赖（--production跳过开发依赖，减小镜像体积）
RUN npm install --production

# 复制项目源码
COPY . .

# 暴露容器端口（与项目配置的PORT一致）
EXPOSE 3001

# 启动命令
CMD ["npm", "start"]