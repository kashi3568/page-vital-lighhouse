import UrlModel from "../models/Url.js";

export const getAllUrls = async () => {
  return await UrlModel.find();
};

export const createUrl = async (blog) => {
  return await UrlModel.create(blog);
};
export const getUrlById = async (id) => {
  return await UrlModel.findById(id);
};

export const updateUrl = async (id, blog) => {
  return await UrlModel.findByIdAndUpdate(id, blog);
};

export const deleteUrl = async (id) => {
  return await UrlModel.findByIdAndDelete(id);
};

export const getUrlByName = async (url) => {
  return await UrlModel.aggregate([
    {
      $match: {
        name: url
      }
    }
  ]);
};

export default {
  getAllUrls,
  createUrl,
  getUrlById,
  updateUrl,
  deleteUrl,
  getUrlByName
}