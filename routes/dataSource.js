const express = require('express');
const router = express.Router();

// 模拟数据存储
let dataSources = [
  {
    id: '1',
    name: 'Customer Database',
    description: 'Customer information database',
    type: 'database',
    connectionString: 'jdbc:postgresql://localhost:5432/customer',
    tags: ['1', '2'], // PII and Financial
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sales Transactions',
    description: 'Sales transaction records',
    type: 'database',
    connectionString: 'jdbc:postgresql://localhost:5432/sales',
    tags: ['2'], // Financial
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Public Website Data',
    description: 'Public website analytics data',
    type: 'file',
    connectionString: 's3://public-website-data',
    tags: ['4'], // Public
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 获取所有数据源
router.get('/', (req, res) => {
  res.json(dataSources);
});

// 获取单个数据源
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const dataSource = dataSources.find(ds => ds.id === id);
  
  if (!dataSource) {
    return res.status(404).json({ error: 'Data source not found' });
  }
  
  res.json(dataSource);
});

// 创建新数据源
router.post('/', (req, res) => {
  const { name, description, type, connectionString, tags, createdBy } = req.body;
  
  if (!name || !description || !type || !connectionString) {
    return res.status(400).json({ error: 'Name, description, type, and connectionString are required' });
  }
  
  const newDataSource = {
    id: String(dataSources.length + 1),
    name,
    description,
    type,
    connectionString,
    tags: tags || [],
    createdBy: createdBy || 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  dataSources.push(newDataSource);
  res.status(201).json(newDataSource);
});

// 更新数据源
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, type, connectionString, tags, updatedBy } = req.body;
  
  const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
  
  if (dataSourceIndex === -1) {
    return res.status(404).json({ error: 'Data source not found' });
  }
  
  const updatedDataSource = {
    ...dataSources[dataSourceIndex],
    name: name || dataSources[dataSourceIndex].name,
    description: description || dataSources[dataSourceIndex].description,
    type: type || dataSources[dataSourceIndex].type,
    connectionString: connectionString || dataSources[dataSourceIndex].connectionString,
    tags: tags !== undefined ? tags : dataSources[dataSourceIndex].tags,
    updatedAt: new Date().toISOString()
  };
  
  dataSources[dataSourceIndex] = updatedDataSource;
  res.json(updatedDataSource);
});

// 删除数据源
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
  
  if (dataSourceIndex === -1) {
    return res.status(404).json({ error: 'Data source not found' });
  }
  
  dataSources.splice(dataSourceIndex, 1);
  res.status(204).send();
});

// 为数据源添加标签
router.post('/:id/tags', (req, res) => {
  const { id } = req.params;
  const { tagId } = req.body;
  
  if (!tagId) {
    return res.status(400).json({ error: 'tagId is required' });
  }
  
  const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
  
  if (dataSourceIndex === -1) {
    return res.status(404).json({ error: 'Data source not found' });
  }
  
  const dataSource = dataSources[dataSourceIndex];
  
  // 检查标签是否已经存在
  if (dataSource.tags.includes(tagId)) {
    return res.status(400).json({ error: 'Tag already exists for this data source' });
  }
  
  // 添加标签
  dataSource.tags.push(tagId);
  dataSource.updatedAt = new Date().toISOString();
  
  dataSources[dataSourceIndex] = dataSource;
  res.json(dataSource);
});

// 从数据源移除标签
router.delete('/:id/tags/:tagId', (req, res) => {
  const { id, tagId } = req.params;
  
  const dataSourceIndex = dataSources.findIndex(ds => ds.id === id);
  
  if (dataSourceIndex === -1) {
    return res.status(404).json({ error: 'Data source not found' });
  }
  
  const dataSource = dataSources[dataSourceIndex];
  
  // 检查标签是否存在
  if (!dataSource.tags.includes(tagId)) {
    return res.status(404).json({ error: 'Tag not found for this data source' });
  }
  
  // 移除标签
  dataSource.tags = dataSource.tags.filter(t => t !== tagId);
  dataSource.updatedAt = new Date().toISOString();
  
  dataSources[dataSourceIndex] = dataSource;
  res.json(dataSource);
});

module.exports = router;