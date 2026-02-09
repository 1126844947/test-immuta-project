const request = require('supertest');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
const catalogRoutes = require('../routes/catalog');
app.use('/api/catalog', catalogRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

describe('Catalog API', () => {
  // 测试获取所有数据目录
  test('GET /api/catalog should return all catalogs', async () => {
    const response = await request(app).get('/api/catalog');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // 测试获取单个数据目录
  test('GET /api/catalog/:id should return a single catalog', async () => {
    const response = await request(app).get('/api/catalog/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe('1');
  });

  // 测试获取不存在的数据目录
  test('GET /api/catalog/:id should return 404 for non-existent catalog', async () => {
    const response = await request(app).get('/api/catalog/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Catalog not found');
  });

  // 测试创建新的数据目录
  test('POST /api/catalog should create a new catalog', async () => {
    const newCatalog = {
      name: 'Test Data',
      description: 'Test data for API testing',
      createdBy: 'testuser'
    };

    const response = await request(app)
      .post('/api/catalog')
      .send(newCatalog);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newCatalog.name);
    expect(response.body.description).toBe(newCatalog.description);
  });

  // 测试创建数据目录时缺少必要字段
  test('POST /api/catalog should return 400 when missing required fields', async () => {
    const newCatalog = {
      name: 'Test Data'
      // 缺少description字段
    };

    const response = await request(app)
      .post('/api/catalog')
      .send(newCatalog);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Name and description are required');
  });

  // 测试更新数据目录
  test('PUT /api/catalog/:id should update an existing catalog', async () => {
    const updatedCatalog = {
      name: 'Updated Customer Data',
      description: 'Updated customer information and demographics'
    };

    const response = await request(app)
      .put('/api/catalog/1')
      .send(updatedCatalog);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedCatalog.name);
    expect(response.body.description).toBe(updatedCatalog.description);
  });

  // 测试更新不存在的数据目录
  test('PUT /api/catalog/:id should return 404 for non-existent catalog', async () => {
    const updatedCatalog = {
      name: 'Updated Data'
    };

    const response = await request(app)
      .put('/api/catalog/999')
      .send(updatedCatalog);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Catalog not found');
  });

  // 测试删除数据目录
  test('DELETE /api/catalog/:id should delete an existing catalog', async () => {
    const response = await request(app).delete('/api/catalog/2');
    expect(response.statusCode).toBe(204);
  });

  // 测试删除不存在的数据目录
  test('DELETE /api/catalog/:id should return 404 for non-existent catalog', async () => {
    const response = await request(app).delete('/api/catalog/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Catalog not found');
  });
});

describe('Health Check API', () => {
  // 测试健康检查端点
  test('GET /health should return status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});