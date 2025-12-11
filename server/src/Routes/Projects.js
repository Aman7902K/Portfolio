import { Router } from "express";
import { Project } from "../models/Project.model.js";
import upload from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET: Fetch single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST: Create a new project with Cloudinary URLs (JSON)
router.post("/direct", async (req, res) => {
  try {
    const { id, name, desc, img } = req.body;

    // Validate required fields
    if (!id || !name || !desc) {
      return res.status(400).json({ 
        error: "ID, name, and description are required" 
      });
    }

    // Validate images array
    if (!img || !Array.isArray(img) || img.length === 0) {
      return res.status(400).json({ 
        error: "At least one image URL is required in the 'img' array" 
      });
    }

    // Check if project with this ID already exists
    const existingProject = await Project.findOne({ id });
    if (existingProject) {
      return res.status(400).json({ 
        error: `Project with ID ${id} already exists` 
      });
    }

    // Create new project in database
    const newProject = await Project.create({
      id: parseInt(id),
      name,
      desc,
      img,
    });

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ 
      error: "Failed to create project",
      details: error.message 
    });
  }
});

router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { id, name, desc, techStack } = req.body;

    // Validate required fields
    if (!id || !name || !desc) {
      return res.status(400).json({ 
        error: "ID, name, and description are required" 
      });
    }

    // Check if project with this ID already exists
    const existingProject = await Project.findOne({ id });
    if (existingProject) {
      return res.status(400).json({ 
        error: `Project with ID ${id} already exists` 
      });
    }

    // Upload images to Cloudinary (if provided)
    const imageUrls = [];
    
    if (req.files && req.files.length > 0) {
      console.log(`Uploading ${req.files.length} images to Cloudinary...`);
      
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result && result.secure_url) {
          imageUrls.push(result.secure_url);
          console.log(`✓ Uploaded: ${file.originalname}`);
        } else {
          console.log(`✗ Failed to upload: ${file.originalname}`);
        }
      }
    } else {
      console.log("No images provided, creating project without images");
    }

    // Create new project in database
    const newProject = await Project.create({
      id: parseInt(id),
      name,
      desc,
      techStack: techStack ? techStack.split(',').map(tech => tech.trim()) : [],
      img: imageUrls,
    });

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ 
      error: "Failed to create project",
      details: error.message 
    });
  }
});

// PUT: Update an existing project
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { name, desc } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (desc) updateData.desc = desc;

    // If new images are uploaded, upload to Cloudinary
    if (req.files && req.files.length > 0) {
      console.log(`Uploading ${req.files.length} new images to Cloudinary...`);
      const imageUrls = [];
      
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result && result.secure_url) {
          imageUrls.push(result.secure_url);
          console.log(`✓ Uploaded: ${file.originalname}`);
        }
      }
      
      if (imageUrls.length > 0) {
        updateData.img = imageUrls;
      }
    }

    const updatedProject = await Project.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ 
      error: "Failed to update project",
      details: error.message 
    });
  }
});

// DELETE: Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ id: req.params.id });

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ 
      error: "Failed to delete project",
      details: error.message 
    });
  }
});

export default router;
