import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ConciergeLeads from './pages/Concierge/Leads/Leads';
import ConciergeLeadDetail from './pages/Concierge/Leads/LeadDetail';
import ConciergeClients from './pages/Concierge/Clients/Clients';
import ConciergeClientDetail from './pages/Concierge/Clients/ClientDetail';
import ConciergeItineraries from './pages/Concierge/Itineraries/Itineraries';
import ConciergeVendors from './pages/Concierge/Vendors/Vendors';
import MarketingProspects from './pages/Marketing/Prospects/Prospects';
import MarketingCampaigns from './pages/Marketing/Campaigns/Campaigns';
import MarketingCreativeAssets from './pages/Marketing/CreativeAssets/CreativeAssets';
import MarketingReports from './pages/Marketing/Reports/Reports';
import Users from './pages/Admin/Users/Users';
import Reports from './pages/Admin/Reports/Reports';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some(permission => {
      const [module, action] = permission.split(':');
      return user?.permissions?.[module]?.includes(action);
    });

    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Concierge Routes */}
        <Route
          path="concierge/leads"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeLeads />
            </ProtectedRoute>
          }
        />
        <Route
          path="concierge/leads/:id"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeLeadDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="concierge/clients"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeClients />
            </ProtectedRoute>
          }
        />
        <Route
          path="concierge/clients/:id"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeClientDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="concierge/itineraries"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeItineraries />
            </ProtectedRoute>
          }
        />
        <Route
          path="concierge/vendors"
          element={
            <ProtectedRoute requiredPermissions={['concierge:read']}>
              <ConciergeVendors />
            </ProtectedRoute>
          }
        />

        {/* Marketing Routes */}
        <Route
          path="marketing/prospects"
          element={
            <ProtectedRoute requiredPermissions={['marketing:read']}>
              <MarketingProspects />
            </ProtectedRoute>
          }
        />
        <Route
          path="marketing/campaigns"
          element={
            <ProtectedRoute requiredPermissions={['marketing:read']}>
              <MarketingCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="marketing/creative-assets"
          element={
            <ProtectedRoute requiredPermissions={['marketing:read']}>
              <MarketingCreativeAssets />
            </ProtectedRoute>
          }
        />
        <Route
          path="marketing/reports"
          element={
            <ProtectedRoute requiredPermissions={['marketing:read']}>
              <MarketingReports />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="admin/users"
          element={
            <ProtectedRoute requiredPermissions={['users:read']}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/reports"
          element={
            <ProtectedRoute requiredPermissions={['reports:read']}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route path="profile" element={<Profile />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 