import urlService from "../service/UrlService.js";

export const getAllUrls = async (req, res) => {
  try {
    const blogs = await urlService.getAllUrls();
    res.json({ data: blogs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUrl = async (req, res) => {
  try {
    const blog = await urlService.createUrl(req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUrlById = async (req, res) => {
  try {
    const blog = await urlService.getUrlById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUrl = async (req, res) => {
  try {
    const blog = await urlService.updateUrl(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const blog = await urlService.deleteUrl(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
