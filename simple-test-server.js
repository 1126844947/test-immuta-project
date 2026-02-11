const http = require('http');
const url = require('url');
const port = 3001;

// 导入我们的函数
const dataSourceHandler = require('./netlify/functions/dataSource').handler;
const dataSourcePageHandler = require('./netlify/functions/dataSourcePage').handler;
const tagsHandler = require('./netlify/functions/tags').handler;
const healthHandler = require('./netlify/functions/health').handler;

// 创建服务器
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  console.log(`Request received: ${req.method} ${path}`);
  
  try {
    let result;
    
    // 健康检查
    if (path === '/health' && req.method === 'GET') {
      const event = { httpMethod: 'GET', path: '/health' };
      result = await healthHandler(event);
    }
    
    // 标签端点
    else if (path === '/api/tags' && req.method === 'GET') {
      const event = { httpMethod: 'GET', path: '/api/tags' };
      result = await tagsHandler(event);
    }
    
    // 数据源端点
    else if (path === '/api/dataSource' && req.method === 'POST') {
      // 读取请求体
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      await new Promise(resolve => {
        req.on('end', resolve);
      });
      
      const event = { httpMethod: 'POST', path: '/api/dataSource', body: body };
      result = await dataSourceHandler(event);
    }
    
    // 数据源页面端点
    else if (path.startsWith('/api/dataSource/page/') && req.method === 'GET') {
      const event = { httpMethod: 'GET', path: path };
      result = await dataSourcePageHandler(event);
    }
    
    // 处理请求
    if (result) {
      res.statusCode = result.statusCode || 200;
      
      // 设置响应头
      if (result.headers) {
        Object.entries(result.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
      }
      
      // 发送响应体
      res.end(result.body);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

// 启动服务器
server.listen(port, () => {
  console.log(`Simple test server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log(`GET  http://localhost:${port}/health`);
  console.log(`GET  http://localhost:${port}/api/tags`);
  console.log(`POST http://localhost:${port}/api/dataSource`);
  console.log(`GET  http://localhost:${port}/api/dataSource/page/:id`);
});