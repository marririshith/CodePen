import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
};

export const createProject = async (req, res) => {
  const { name } = req.body;
  const newProject = await Project.create({
    user: req.user._id,
    name,
    html: "",
    css: "",
    js: "",
  });
  res.status(201).json(newProject);
};

export const updateProject = async (req, res) => {
  const { html, css, js } = req.body;
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { html, css, js },
    { new: true }
  );
  res.json(project);
};
