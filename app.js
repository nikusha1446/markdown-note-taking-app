import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import noteRoutes from './routes/noteRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NOTES_DIR = path.join(__dirname, 'notes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/notes', noteRoutes);

const initializeApp = async () => {
  try {
    await fs.access(NOTES_DIR);
  } catch (error) {
    await fs.mkdir(NOTES_DIR, { recursive: true });
  }
};

const startServer = async () => {
  await initializeApp();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer().catch(console.error);
