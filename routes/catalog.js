const express = require('express');
const router = express.Router();

// 模拟数据存储
let catalogs = [
  {
    id: '1',
    name: 'Customer Data',
    description: 'Customer information and demographics',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sales Data',
    description: 'Sales transactions and revenue data',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Product Data',
    description: 'Product information and inventory',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 获取所有数据目录
router.get('/', (req, res) => {
  res.json(catalogs);
});

// 获取单个数据目录
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const catalog = catalogs.find(c => c.id === id);
  
  if (!catalog) {
    return res.status(404).json({ error: 'Catalog not found' });
  }
  
  res.json(catalog);
});

// 创建新的数据目录
router.post('/', (req, res) => {
  const { name, description, createdBy } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  
  const newCatalog = {
    id: String(catalogs.length + 1),
    name,
    description,
    createdBy: createdBy || 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  catalogs.push(newCatalog);
  res.status(201).json(newCatalog);
});

// 更新数据目录
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, updatedBy } = req.body;
  
  const catalogIndex = catalogs.findIndex(c => c.id === id);
  
  if (catalogIndex === -1) {
    return res.status(404).json({ error: 'Catalog not found' });
  }
  
  const updatedCatalog = {
    ...catalogs[catalogIndex],
    name: name || catalogs[catalogIndex].name,
    description: description || catalogs[catalogIndex].description,
    updatedAt: new Date().toISOString()
  };
  
  catalogs[catalogIndex] = updatedCatalog;
  res.json(updatedCatalog);
});

// 删除数据目录
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const catalogIndex = catalogs.findIndex(c => c.id === id);
  
  if (catalogIndex === -1) {
    return res.status(404).json({ error: 'Catalog not found' });
  }
  
  catalogs.splice(catalogIndex, 1);
  res.status(204).send();
});

module.exports = router;