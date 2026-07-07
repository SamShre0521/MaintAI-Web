import "./layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="page">{children}</div>
      </div>
    </div>
  );
}