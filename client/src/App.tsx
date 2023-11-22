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
import Login from "./components/login/Login";
import UserAccess from "./components/user-access/UserAccess";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ClientTicketsDashboard from "./components/tickets/ClientTicketsDashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/faq" element={<FaqDashboard />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/tickets" element={<ClientTicketsDashboard />} />
          <Route path="/upload" element={<UploadUsers />} />
          <Route path="/users" element={<UserAccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
