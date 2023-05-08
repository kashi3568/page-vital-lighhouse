import PageVitalModel from "../models/PageVital.js";

export const getAllPageVitals = async () => {
  return await PageVitalModel.find();
};

export const createPageVital = async (blog) => {
  return await PageVitalModel.create(blog);
};
export const getPageVitalById = async (id) => {
  return await PageVitalModel.findById(id);
};

export const updatePageVital = async (id, blog) => {
  return await PageVitalModel.findByIdAndUpdate(id, blog);
};

export const deletePageVital = async (id) => {
  return await PageVitalModel.findByIdAndDelete(id);
};

export default {
  getAllPageVitals,
  createPageVital,
  getPageVitalById,
  updatePageVital,
  deletePageVital,
}