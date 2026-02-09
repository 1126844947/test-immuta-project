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

const tagRoutes = require('../routes/tag');
app.use('/api/tags', tagRoutes);

const dataSourceRoutes = require('../routes/dataSource');
app.use('/api/data-sources', dataSourceRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

describe('Tag API', () => {
  // 测试获取所有标签
  test('GET /api/tags should return all tags', async () => {
    const response = await request(app).get('/api/tags');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // 测试获取单个标签
  test('GET /api/tags/:id should return a single tag', async () => {
    const response = await request(app).get('/api/tags/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe('1');
  });

  // 测试创建新标签
  test('POST /api/tags should create a new tag', async () => {
    const newTag = {
      name: 'Test Tag',
      description: 'Test Tag Description',
      type: 'sensitive',
      createdBy: 'testuser'
    };

    const response = await request(app)
      .post('/api/tags')
      .send(newTag);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newTag.name);
    expect(response.body.description).toBe(newTag.description);
  });

  // 测试更新标签
  test('PUT /api/tags/:id should update an existing tag', async () => {
    const updatedTag = {
      name: 'Updated PII',
      description: 'Updated Personally Identifiable Information',
      type: 'sensitive'
    };

    const response = await request(app)
      .put('/api/tags/1')
      .send(updatedTag);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedTag.name);
    expect(response.body.description).toBe(updatedTag.description);
  });

  // 测试删除标签
  test('DELETE /api/tags/:id should delete an existing tag', async () => {
    const response = await request(app).delete('/api/tags/4');
    expect(response.statusCode).toBe(204);
  });
});

describe('DataSource API', () => {
  // 测试获取所有数据源
  test('GET /api/data-sources should return all data sources', async () => {
    const response = await request(app).get('/api/data-sources');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // 测试获取单个数据源
  test('GET /api/data-sources/:id should return a single data source', async () => {
    const response = await request(app).get('/api/data-sources/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe('1');
  });

  // 测试创建新数据源
  test('POST /api/data-sources should create a new data source', async () => {
    const newDataSource = {
      name: 'Test Data Source',
      description: 'Test Data Source Description',
      type: 'database',
      connectionString: 'jdbc:postgresql://localhost:5432/test',
      tags: ['1', '2'],
      createdBy: 'testuser'
    };

    const response = await request(app)
      .post('/api/data-sources')
      .send(newDataSource);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newDataSource.name);
    expect(response.body.description).toBe(newDataSource.description);
  });

  // 测试更新数据源
  test('PUT /api/data-sources/:id should update an existing data source', async () => {
    const updatedDataSource = {
      name: 'Updated Customer Database',
      description: 'Updated Customer information database',
      type: 'database',
      connectionString: 'jdbc:postgresql://localhost:5432/customer'
    };

    const response = await request(app)
      .put('/api/data-sources/1')
      .send(updatedDataSource);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedDataSource.name);
    expect(response.body.description).toBe(updatedDataSource.description);
  });

  // 测试为数据源添加标签
  test('POST /api/data-sources/:id/tags should add a tag to a data source', async () => {
    const tagData = {
      tagId: '3'
    };

    const response = await request(app)
      .post('/api/data-sources/1/tags')
      .send(tagData);

    expect(response.statusCode).toBe(200);
    expect(response.body.tags).toContain('3');
  });

  // 测试从数据源移除标签
  test('DELETE /api/data-sources/:id/tags/:tagId should remove a tag from a data source', async () => {
    const response = await request(app).delete('/api/data-sources/1/tags/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.tags).not.toContain('2');
  });

  // 测试删除数据源
  test('DELETE /api/data-sources/:id should delete an existing data source', async () => {
    const response = await request(app).delete('/api/data-sources/3');
    expect(response.statusCode).toBe(204);
  });
});
