import express from 'express';
import path from 'path';

const router = express.Router();

const staticPath = (file = '') =>
  path.join(__dirname, '..', '..', 'frontend', 'build', file);

router.use(express.static(staticPath()));
router.get('*', (req, res) => {
  res.sendFile(staticPath('index.html'));
});

export default router;
