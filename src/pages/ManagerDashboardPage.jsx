import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  Library,
  RefreshCw,
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import {
  managerStart,
  managerSuccess,
  managerFailure,
} from "../features/manager/managerSlice";
import { getFeedbackByStatus } from "../features/manager/managerService";

import "./manager-dashboard.css";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const dispatch = useDispatch();

  const { pendingFeedbacks, approvedFeedbacks, isLoading, error } =
    useSelector((state) => state.manager);

  useEffect(() => {
    loadDashboard();
  }, []);
  const navigate = useNavigate();
  async function loadDashboard() {
    try {
      dispatch(managerStart());

      const pending = await getFeedbackByStatus("pending");
      const approved = await getFeedbackByStatus("approved");

      dispatch(
        managerSuccess({
          pendingFeedbacks: pending,
          approvedFeedbacks: approved,
        })
      );
    } catch (err) {
      dispatch(managerFailure(err.message));
    }
  }

  const totalFeedbacks = pendingFeedbacks.length + approvedFeedbacks.length;

  return (
    <AppLayout>
      <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Manager Dashboard</h1>
          <p>
            Review engineer feedback before storing approved solutions in the
            knowledge base.
          </p>
        </div>

        <button className="refresh-btn" onClick={loadDashboard}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {isLoading && <div className="loading-box">Loading dashboard...</div>}

      {error && <div className="error-box">{error}</div>}

      {!isLoading && (
        <>
          <div className="metric-grid">
            <MetricCard
              icon={<MessageSquare />}
              title="Total Feedbacks"
              value={totalFeedbacks}
              subtitle="In your department"
              color="#F1C84B"
            />

            <MetricCard
              icon={<Clock />}
              title="Pending"
              value={pendingFeedbacks.length}
              subtitle="Needs review"
              color="#F97316"
            />

            <MetricCard
              icon={<CheckCircle />}
              title="Approved"
              value={approvedFeedbacks.length}
              subtitle="Approved issues"
              color="#22C55E"
            />

            <MetricCard
              icon={<Library />}
              title="Knowledge Base"
              value={approvedFeedbacks.length}
              subtitle="Stored solutions"
              color="#7C3AED"
            />
          </div>

          <div className="section-card">
            <div className="section-header">
              <h2>Pending Approvals</h2>
              <span>{pendingFeedbacks.length}</span>
            </div>

            {pendingFeedbacks.length === 0 ? (
              <div className="empty-state">No pending approvals.</div>
            ) : (
              <div className="pending-list">
                {pendingFeedbacks.map((item) => (
                  <div className="pending-item" key={item._id}>
                    <div className="pending-icon">
                      <Clock size={20} />
                    </div>

                    <div className="pending-content">
                      <h3>{item.question}</h3>
                      <p>
                        {item.userId?.name || "Unknown Engineer"} •{" "}
                        {item.department || "-"}
                      </p>
                    </div>

                    <span className="status-pill">pending</span>

                    <button className="review-btn" onClick={() => navigate(`/manager/review/${item._id}`)}> Review</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      </div>
    </AppLayout>
  );
}

function MetricCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="metric-card">
      <div
        className="metric-icon"
        style={{
          background: `${color}22`,
          color,
        }}
      >
        {icon}
      </div>

      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-subtitle" style={{ color }}>
        {subtitle}
      </div>
    </div>
  );
}