# Markdown Note-Taking App

A simple and clean RESTful API for managing markdown notes with file upload, HTML rendering, and grammar checking capabilities.

## ✨ Features

- **Upload Markdown Files** - Save your .md files to the server
- **List Files** - View all your saved notes
- **HTML Conversion** - Convert markdown notes to HTML format
- **Grammar Checking** - Get writing suggestions and improvements

## 🛠️ Tech Stack

- **Node.js** with ES Modules
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Marked** - Markdown to HTML conversion
- **Write-Good** - Grammar and style checking

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikusha1446/markdown-note-taking-app.git
   cd markdown-note-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Server will be running on**
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### 📤 Upload Note
```http
POST /api/v1/notes/

Form Data:
- file: [markdown file]
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/notes/ -F "file=@my-note.md"
```

**Response:**
```json
{
  "message": "Markdown file uploaded and saved successfully",
  "file": "my-note.md"
}
```

### 📋 List All Notes
```http
GET /api/v1/notes/
```

**Example:**
```bash
curl http://localhost:3000/api/v1/notes/
```

**Response:**
```json
{
  "message": "Found 3 notes",
  "notes": [
    "my-note.md",
    "todo-list.md",
    "project-ideas.md"
  ]
}
```

### 🔄 Get Note as HTML
```http
GET /api/v1/notes/:file
```

**Example:**
```bash
curl http://localhost:3000/api/v1/notes/my-note.md
# or without .md extension
curl http://localhost:3000/api/v1/notes/my-note
```

**Response:**
```json
{
  "fileName": "my-note.md",
  "htmlContent": "<h1>My Note</h1>\n<p>This is <strong>bold</strong> text</p>"
}
```

### ✅ Check Grammar
```http
GET /api/v1/notes/:file/grammar
```

**Example:**
```bash
curl http://localhost:3000/api/v1/notes/my-note.md/grammar
```

**Response:**
```json
{
  "fileName": "my-note.md",
  "issues": [
    {
      "reason": "passive voice",
      "index": 25,
      "offset": 15
    }
  ],
  "status": "Issues detected"
}
```

## File Validation

- Only `.md` files are accepted
- Maximum file size: 5MB
- Duplicate filenames are rejected
- Files are stored with original names

## Usage Examples

### Create a test markdown file
```bash
echo "# My First Note
This is **bold** text and this is *italic* text > test-note.md
```

### Upload and test
```bash
# Upload
curl -X POST http://localhost:3000/api/v1/notes/ -F "file=@test-note.md"

# List notes
curl http://localhost:3000/api/v1/notes/

# Get as HTML
curl http://localhost:3000/api/v1/notes/test-note

# Check grammar
curl http://localhost:3000/api/v1/notes/test-note/grammar
```

## License

ISC
