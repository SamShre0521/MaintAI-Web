import apiClient from "../../api/apiClient";

export const getFeedbackByStatus = async (status) => {
  const response = await apiClient.get("/manager/feedback", {
    params: { status },
  });

  return response.data.feedbacks || [];
};


export const approveFeedback = async (feedbackId, managerComment) => {
  const response = await apiClient.patch(`/manager/feedback/${feedbackId}`, {
    managerStatus: "approved",
    managerComment,
  });

  return response.data;
};

export const rejectFeedback = async (feedbackId, managerComment) => {
  const response = await apiClient.patch(`/manager/feedback/${feedbackId}`, {
    managerStatus: "rejected",
    managerComment,
  });

  return response.data;
};