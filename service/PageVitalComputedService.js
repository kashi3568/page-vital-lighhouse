import PageVitalComputedModel from "../models/PageVitalComputed.js";

export const getAllPageVitalsComputeds = async () => {
  return await PageVitalComputedModel.find();
};

export const createPageVitalComputed = async (data) => {
  return await PageVitalComputedModel.create(data);
};
export const getPageVitalComputedById = async (id) => {
  return await PageVitalComputedModel.findById(id);
};

export const updatePageVitalComputed = async (id, blog) => {
  return await PageVitalComputedModel.findByIdAndUpdate(id, blog);
};

export const deletePageVitalComputed = async (id) => {
  return await PageVitalComputedModel.findByIdAndDelete(id);
};

export const getPageVitalComputedByDate = async (date) => {

  const queryDate = new Date(date);

  // Calculate the start and end of the input date (midnight in UTC time)
  const startDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
  const endDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);

  return await PageVitalComputedModel.find(
    {
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      }
    });
};


export const getPageVitalComputedByDates = async (date) => {

  const queryDate = new Date(date);

  // Calculate the start and end of the input date (midnight in UTC time)
  const startDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
  const endDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);

  return await PageVitalComputedModel.aggregate([
    // Match documents with a specific date on createdAt
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      }
    },
    // Group documents by device, testUrl, and date
    {
      $group: {
        _id: {
          device: "$device",
          testUrl: "$testUrl",
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        },
        // Calculate the average of several metrics
        avgLabLCP: { $avg: "$labLCP" },
        avgLabFCP: { $avg: "$labFCP" },
        avgTTFB: { $avg: "$TTFB" },
        avgTTI: { $avg: "$TTI" },
        avgTBT: { $avg: "$TBT" },
        avgPageSize: { $avg: "$pageSize" },
        avgLabMaxFID: { $avg: "$labMaxFID" },
        avgSpeedIndex: { $avg: "$speedIndex" },
        avgPerformanceScore: { $first: "$PerformanceScore" },
        calculationLogic: { $first: "$calculationLogic" },
      }
    }
  ])
};

export default {
  getAllPageVitalsComputeds,
  createPageVitalComputed,
  getPageVitalComputedById,
  updatePageVitalComputed,
  deletePageVitalComputed,
  getPageVitalComputedByDate,
  getPageVitalComputedByDates,
}
