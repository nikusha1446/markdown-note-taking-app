import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.originalname.endsWith('.md') ||
      file.mimetype === 'text/markdown'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .md files are allowed'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
