import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquarePlus,
  ClipboardList,
  CheckCircle,
  Upload,
  LogOut,
  Bot,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";
import "./layout.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const role = user?.role?.toLowerCase();
  const isManager = role === "manager";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="user-profile">
          <div className="logo-circle">
            <Bot size={26} color="white" />
          </div>

          <div>
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-role">{user?.role || "Role"}</div>
          </div>
        </div>

        <div className="menu">
          {isManager && (
            <MenuItem
              icon={<LayoutDashboard />}
              title="Dashboard"
              active={location.pathname === "/manager"}
              onClick={() => navigate("/manager")}
            />
          )}

          <MenuItem
            icon={<MessageSquarePlus />}
            title="New Chat"
            active={location.pathname === "/assistant"}
            onClick={() => navigate("/assistant")}
          />

          {isManager && (
            <>
              <MenuItem
                icon={<ClipboardList />}
                title="Pending"
                active={location.pathname === "/manager/pending"}
                onClick={() => navigate("/manager/pending")}
              />

              <MenuItem
                icon={<CheckCircle />}
                title="Approved"
                active={location.pathname === "/manager/approved"}
                onClick={() => navigate("/manager/approved")}
              />

              <MenuItem
                icon={<Upload />}
                title="Upload Machine"
                active={location.pathname === "/manager/upload-machine"}
                onClick={() => navigate("/manager/upload-machine")}
              />
            </>
          )}
        </div>
      </div>

      <div className="sidebar-bottom">
        <MenuItem icon={<LogOut />} title="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
}

function MenuItem({ icon, title, active, onClick }) {
  return (
    <div onClick={onClick} className={`menu-item ${active ? "active" : ""}`}>
      {icon}
      <span>{title}</span>
    </div>
  );
}