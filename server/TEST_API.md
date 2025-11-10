# API Testing Guide

## Setup

1. Make sure you have the following environment variables in your `.env` file:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=8000
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### 1. GET /api/projects
Fetch all projects

**Example:**
```bash
curl http://localhost:8000/api/projects
```

### 2. POST /api/projects
Create a new project with image uploads

**Form Data Fields:**
- `name` (string, required): Project name
- `desc` (string, required): Project description
- `images` (files, required): Multiple image files (max 10)

**Example with curl:**
```bash
curl -X POST http://localhost:8000/api/projects \
  -F "name=My Awesome Project" \
  -F "desc=This is a detailed description of my project" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg" \
  -F "images=@/path/to/image3.jpg"
```

**Example with Postman:**
1. Set method to POST
2. URL: `http://localhost:8000/api/projects`
3. Go to Body tab
4. Select "form-data"
5. Add fields:
   - Key: `name`, Value: `My Project Name`
   - Key: `desc`, Value: `Project description`
   - Key: `images`, Type: File (select multiple files)

**Response Example:**
```json
{
  "message": "Project created successfully",
  "project": {
    "id": 5,
    "img": [
      "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/abc123.jpg",
      "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/def456.jpg"
    ],
    "name": "My Awesome Project",
    "desc": "This is a detailed description of my project"
  }
}
```

## How It Works

1. **Upload Images**: Send a POST request with images using multipart/form-data
2. **Multer Processing**: Files are temporarily saved to `./public/temp/`
3. **Cloudinary Upload**: Each file is uploaded to Cloudinary
4. **URL Extraction**: Cloudinary returns secure URLs for each image
5. **Temp Cleanup**: Temporary files are automatically deleted
6. **Project Creation**: New project is created with Cloudinary URLs in the `img` array
7. **Response**: Returns the created project with all image URLs

## Testing with JavaScript (Frontend)

```javascript
const uploadProject = async (formData) => {
  const response = await fetch('http://localhost:8000/api/projects', {
    method: 'POST',
    body: formData, // FormData object with name, desc, and images
  });
  
  const data = await response.json();
  console.log(data);
};

// Usage
const formData = new FormData();
formData.append('name', 'My Project');
formData.append('desc', 'Project description');
formData.append('images', fileInput.files[0]);
formData.append('images', fileInput.files[1]);

uploadProject(formData);
```
