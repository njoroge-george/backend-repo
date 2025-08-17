const Project = require('../models/Projects');

// Create project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create project' });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};

// Get single project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch project' });
    }
};

// Update project
exports.updateProject = async (req, res) => {
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
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Not found' });

        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};
