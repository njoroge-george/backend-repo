import Project from '../models/Projects.js';
// Create project
 const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create project' });
    }
};

// Get all projects
 const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

// Get single project
 const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch project' });
    }
};

// Update project
 const updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Not found' });

        await project.update(req.body);
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project' });
    }
};

// Delete project
 const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Not found' });

        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

 export default {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
 };