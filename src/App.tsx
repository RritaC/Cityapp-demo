import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import { AlertDetailPage } from './pages/AlertDetailPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { JobsPage } from './pages/JobsPage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { ProfilePage } from './pages/ProfilePage'
import { ReportPage } from './pages/ReportPage'
import { ReportsPage } from './pages/ReportsPage'
import { ServicesPage } from './pages/ServicesPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="service/:id" element={<ServiceDetailPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="event/:id" element={<EventDetailPage />} />
            <Route path="opportunity/:id" element={<OpportunityDetailPage />} />
            <Route path="alert/:id" element={<AlertDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
