import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage";
import AssistantChatPage from "../pages/AssistantChatPage";
import ManagerReviewPage from "../pages/ManagerReviewPage";


export default function AppRoutes(){

    return(

        <Routes>

            <Route
                path="/"
                element={<LoginPage/>}
            />

            <Route
                path="/manager"
                element={<ManagerDashboardPage/>}
            />

            <Route
                path="/assistant"
                element={<AssistantChatPage/>}
            />
            <Route path="/manager/review/:feedbackId" element={<ManagerReviewPage />} />

        </Routes>

    );

}