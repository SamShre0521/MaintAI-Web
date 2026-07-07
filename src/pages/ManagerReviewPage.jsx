import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Building2,
  Flag,
  Bot,
  CheckCircle,
  XCircle,
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import "./manager-review.css";
import {
  approveFeedback,
  rejectFeedback,
  getFeedbackByStatus,
} from "../features/manager/managerService";

import {
  managerStart,
  managerSuccess,
  managerFailure,
} from "../features/manager/managerSlice";

export default function ManagerReviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { feedbackId } = useParams();

  const [comment, setComment] = useState("Valid solution");

  const { pendingFeedbacks, approvedFeedbacks } = useSelector(
    (state) => state.manager
  );

  const feedback = [...pendingFeedbacks, ...approvedFeedbacks].find(
    (item) => item._id === feedbackId
  );
  async function refreshDashboard() {
  const pending = await getFeedbackByStatus("pending");
  const approved = await getFeedbackByStatus("approved");

  dispatch(
    managerSuccess({
      pendingFeedbacks: pending,
      approvedFeedbacks: approved,
    })
  );
}
async function handleApprove() {
  try {
    dispatch(managerStart());

    await approveFeedback(feedback._id, comment);

    await refreshDashboard();

    navigate("/manager");
  } catch (err) {
    dispatch(managerFailure(err.message));
  }
}
async function handleReject() {
  try {
    dispatch(managerStart());

    await rejectFeedback(feedback._id, comment);

    await refreshDashboard();

    navigate("/manager");
  } catch (err) {
    dispatch(managerFailure(err.message));
  }
}
  if (!feedback) {
    return (
      <AppLayout>
        <div className="review-empty">
          <h2>Issue not found</h2>
          <button onClick={() => navigate("/manager")}>Back to Dashboard</button>
        </div>
      </AppLayout>
    );
  }

  const isReadOnly = feedback.managerStatus === "approved";

  return (
    <AppLayout>
      <div className="review-page">
        <div className="review-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>

          <span className={`review-status ${feedback.managerStatus}`}>
            {feedback.managerStatus || "pending"}
          </span>
        </div>

        <h1 className="review-title">Review Issue</h1>

        <div className="issue-summary-card">
          <h2>{feedback.question}</h2>

          <div className="info-grid">
            <InfoCard
              icon={<User />}
              label="Engineer"
              value={feedback.userId?.name || "Unknown"}
            />
            <InfoCard
              icon={<Mail />}
              label="Email"
              value={feedback.userId?.email || "-"}
            />
            <InfoCard
              icon={<Building2 />}
              label="Department"
              value={feedback.department || "-"}
            />
            <InfoCard
              icon={<Flag />}
              label="Status"
              value={feedback.managerStatus || "pending"}
            />
          </div>
        </div>

        <div className="answer-card">
          <div className="answer-header">
            <div className="answer-icon">
              <Bot size={22} />
            </div>
            <h2>AI Solution</h2>
          </div>

          <div className="answer-body">{feedback.answer}</div>
        </div>

        {!isReadOnly && (
          <div className="comment-card">
            <h2>Manager Comment</h2>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment before approving or rejecting..."
            />
          </div>
        )}

        {isReadOnly && feedback.managerComment && (
          <div className="comment-card">
            <h2>Manager Comment</h2>
            <p>{feedback.managerComment}</p>
          </div>
        )}

        {!isReadOnly && (
          <div className="review-action-bar">
            <button className="reject-btn"     onClick={handleReject}
>
              <XCircle size={20} />
              Reject
            </button>

            <button className="approve-btn"     onClick={handleApprove}
>
              <CheckCircle size={20} />
              Approve & Store
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>

      <div>
        <p>{label}</p>
        <h4>{value}</h4>
      </div>
    </div>
  );
}