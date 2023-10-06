import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import TicketsDashboard from "./components/tickets/TicketsDashboard";
import FaqDashboard from "./components/faq/FaqDashboard";
import UploadUsers from "./components/users-upload/UploadUsers";
import UsersTrackingPage from "./components/tickets/UsersTrackingPage";
import AdminTicketsDashboard from "./components/tickets/AdminTicketsDashboard";
import Announcement from "./components/announcements/Announcement";
function App() {
  return (
    <div className="App">
      <Dashboard>
        <Router>
          <Routes>
            <Route path="/" element={<TicketsDashboard />} />
            <Route path="/faq" element={<FaqDashboard />} />
            <Route path="/announcements" element={<Announcement />} />
            <Route path="/tickets" element={<AdminTicketsDashboard />} />
            <Route path="/upload" element={<UploadUsers />} />
            <Route path="/users" element={<UsersTrackingPage />} />
          </Routes>
        </Router>
      </Dashboard>
    </div>
  );
}

export default App;
