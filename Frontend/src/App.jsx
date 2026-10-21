import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import FieldsPage from './pages/FieldsPage.jsx'
import FieldDetailPage from './pages/FieldDetailPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import BookingDetailPage from './pages/BookingDetailPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import OwnerPage from './pages/OwnerPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="san" element={<FieldsPage />} />
        <Route path="san/:id" element={<FieldDetailPage />} />
        <Route path="dang-nhap" element={<AuthPage mode="login" />} />
        <Route path="dang-ky" element={<AuthPage mode="register" />} />
        <Route element={<ProtectedRoute roles={['USER', 'OWNER', 'ADMIN']} />}>
          <Route path="tai-khoan" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute roles={['USER']} />}>
          <Route path="dat-san-cua-toi" element={<BookingsPage />} />
        </Route>
        <Route element={<ProtectedRoute roles={['USER', 'OWNER', 'ADMIN']} />}>
          <Route path="luot-dat/:id" element={<BookingDetailPage />} />
        </Route>
        <Route element={<ProtectedRoute roles={['OWNER']} />}>
          <Route path="chu-san" element={<OwnerPage />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ADMIN']} />}>
          <Route path="quan-tri" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
