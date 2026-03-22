import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import HRSettings from "./pages/HRSettings";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
            path="/dashboard"
            element={
            <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            } />
          
            <Route
            path="/user-management"
            element={
            <ProtectedRoute allowedRoles={["it-admin"]}>
                  <UserManagement />
                </ProtectedRoute>
            } />
          
            <Route
            path="/employees"
            element={
            <ProtectedRoute allowedRoles={["it-admin", "hr"]}>
                  <Employees />
                </ProtectedRoute>
            } />
          
            <Route
            path="/attendance"
            element={
            <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
            } />
          
            <Route
            path="/leaves"
            element={
            <ProtectedRoute>
                  <Leaves />
                </ProtectedRoute>
            } />
          
            <Route
            path="/payroll"
            element={
            <ProtectedRoute>
                  <Payroll />
                </ProtectedRoute>
            } />
          
            <Route
            path="/recruitment"
            element={
            <ProtectedRoute allowedRoles={["it-admin", "hr"]}>
                  <Recruitment />
                </ProtectedRoute>
            } />
          
            <Route
            path="/performance"
            element={
            <ProtectedRoute>
                  <Performance />
                </ProtectedRoute>
            } />
          
            <Route
            path="/profile"
            element={
            <ProtectedRoute allowedRoles={["employee"]}>
                  <Profile />
                </ProtectedRoute>
            } />
          
            <Route
            path="/settings"
            element={
            <ProtectedRoute allowedRoles={["it-admin", "hr"]}>
                  <HRSettings />
                </ProtectedRoute>
            } />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    
  </QueryClientProvider>;


export default App;