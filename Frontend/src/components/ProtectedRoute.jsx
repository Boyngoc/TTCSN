import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute({ roles }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/dang-nhap" replace state={{ from: location.pathname }} />
  if (!roles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}
