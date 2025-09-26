import path from 'path';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.join(__dirname, '../notes');

export const uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = req.file.originalname;
    const filePath = path.join(NOTES_DIR, fileName);

    if (existsSync(filePath)) {
      return res.status(409).json({
        error: `File ${fileName} already exists.`,
      });
    }

    await fs.mkdir(NOTES_DIR, { recursive: true });
    await fs.writeFile(filePath, req.file.buffer);

    res.status(201).json({
      message: 'Markdown file uploaded and saved successfully',
      file: fileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload and save file' });
  }
};

export const listNotes = async (req, res) => {
  try {
    if (!existsSync(NOTES_DIR)) {
      return res.json({
        message: 'No notes found',
        notes: [],
      });
    }

    const files = await fs.readdir(NOTES_DIR);
    const markdownFiles = files.filter((file) => file.endsWith('.md'));

    res.json({
      message: `Found ${markdownFiles.length} notes`,
      notes: markdownFiles,
    });
  } catch (error) {
    console.error('Error listing notes:', error);
    res.status(500).json({ error: 'Failed to list notes' });
  }
};

export const getNote = async (req, res) => {
  try {
    const { file } = req.params;

    const fileName = file.endsWith('.md') ? file : file + '.md';
    const filePath = path.join(NOTES_DIR, fileName);

    console.log(filePath);

    if (!existsSync(filePath)) {
      return res.status(404).json({
        error: `Note ${fileName} not found`,
      });
    }

    const markDownContent = await fs.readFile(filePath, 'utf8');
    const htmlContent = marked(markDownContent);

    res.status(200).json({
      fileName,
      htmlContent,
    });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({ error: 'Failed to get note' });
  }
};
