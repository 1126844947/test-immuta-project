const express = require('express');
const router = express.Router();

// 模拟数据存储
let tags = [
  {
    id: '1',
    name: 'PII',
    description: 'Personally Identifiable Information',
    type: 'sensitive',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Financial',
    description: 'Financial Information',
    type: 'sensitive',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Healthcare',
    description: 'Healthcare Information',
    type: 'sensitive',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Public',
    description: 'Public Information',
    type: 'non-sensitive',
    createdBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 获取所有标签
router.get('/', (req, res) => {
  res.json(tags);
});

// 获取单个标签
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const tag = tags.find(t => t.id === id);
  
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  
  res.json(tag);
});

// 创建新标签
router.post('/', (req, res) => {
  const { name, description, type, createdBy } = req.body;
  
  if (!name || !description || !type) {
    return res.status(400).json({ error: 'Name, description, and type are required' });
  }
  
  const newTag = {
    id: String(tags.length + 1),
    name,
    description,
    type,
    createdBy: createdBy || 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tags.push(newTag);
  res.status(201).json(newTag);
});

// 更新标签
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, type, updatedBy } = req.body;
  
  const tagIndex = tags.findIndex(t => t.id === id);
  
  if (tagIndex === -1) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  
  const updatedTag = {
    ...tags[tagIndex],
    name: name || tags[tagIndex].name,
    description: description || tags[tagIndex].description,
    type: type || tags[tagIndex].type,
    updatedAt: new Date().toISOString()
  };
  
  tags[tagIndex] = updatedTag;
  res.json(updatedTag);
});

// 删除标签
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const tagIndex = tags.findIndex(t => t.id === id);
  
  if (tagIndex === -1) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  
  tags.splice(tagIndex, 1);
  res.status(204).send();
});

module.exports = router;