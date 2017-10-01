import express from 'express';
import db from './db';

const router = express.Router();

router.get('/users', (req, res) => {
  res.json(db.getUsers());
});

router.get('/users/:username', (req, res) => {
  const { username } = req.params;
  res.json(db.getUser({ username }));
});

export default router;
