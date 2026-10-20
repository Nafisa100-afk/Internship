import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import type { Role } from './types'
import AppShell from './components/AppShell'
import PublicLayout from './components/PublicLayout'
import { AboutPage, AdminPage, ComplaintDetailPage, ComplaintsPage, DashboardPage, HomePage, LoginPage, NewComplaintPage, NotificationsPage, NotFoundPage, ProfilePage, PublicProgressPage, RegisterPage, ReportsPage, ResolvedPage, TrackPage, UnauthorizedPage } from './pages/Pages'
import { roleHome } from './data'

function Protected({ role, allowed, children }: { role: Role; allowed: Role[]; children: React.ReactNode }) {
  const location = useLocation()
  if (!allowed.includes(role)) return <Navigate to="/unauthorized" replace state={{ from: location.pathname }} />
  return <>{children}</>
}

function Workspace({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  return <AppShell role={role} setRole={setRole} />
}

export default function App() {
  const [role, setRole] = useState<Role>(() => {
    const saved = sessionStorage.getItem('city-connect-demo-role')
    return (['citizen','ward','department','mayor','admin'].includes(saved ?? '') ? saved : 'citizen') as Role
  })
  const changeRole = (next: Role) => {
    setRole(next)
    sessionStorage.setItem('city-connect-demo-role', next)
  }
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/complaints/new" element={<NewComplaintPage />} />
      <Route path="/track" element={<TrackPage />} />
      <Route path="/resolved-complaints" element={<ResolvedPage />} />
      <Route path="/login" element={<LoginPage setRole={changeRole} />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route path="/citizen" element={<Protected role={role} allowed={['citizen']}><Workspace role={role} setRole={changeRole}/></Protected>}>
      <Route path="dashboard" element={<DashboardPage role={role}/>} />
      <Route path="complaints" element={<ComplaintsPage role={role}/>} />
      <Route path="complaints/:id" element={<ComplaintDetailPage role={role}/>} />
      <Route path="profile" element={<ProfilePage/>} />
      <Route index element={<Navigate to="dashboard" replace/>} />
    </Route>
    <Route path="/ward" element={<Protected role={role} allowed={['ward']}><Workspace role={role} setRole={changeRole}/></Protected>}>
      <Route path="dashboard" element={<DashboardPage role={role}/>} />
      <Route path="complaints" element={<ComplaintsPage role={role}/>} />
      <Route path="complaints/:id" element={<ComplaintDetailPage role={role}/>} />
      <Route path="public-progress" element={<PublicProgressPage/>} />
      <Route index element={<Navigate to="dashboard" replace/>} />
    </Route>
    <Route path="/department" element={<Protected role={role} allowed={['department']}><Workspace role={role} setRole={changeRole}/></Protected>}>
      <Route path="dashboard" element={<DashboardPage role={role}/>} />
      <Route path="complaints" element={<ComplaintsPage role={role}/>} />
      <Route path="complaints/:id" element={<ComplaintDetailPage role={role}/>} />
      <Route index element={<Navigate to="dashboard" replace/>} />
    </Route>
    <Route path="/mayor" element={<Protected role={role} allowed={['mayor']}><Workspace role={role} setRole={changeRole}/></Protected>}>
      <Route path="dashboard" element={<DashboardPage role={role}/>} />
      <Route path="reports" element={<ReportsPage/>} />
      <Route path="complaints/:id" element={<ComplaintDetailPage role={role}/>} />
      <Route index element={<Navigate to="dashboard" replace/>} />
    </Route>
    <Route path="/admin" element={<Protected role={role} allowed={['admin']}><Workspace role={role} setRole={changeRole}/></Protected>}>
      <Route path="dashboard" element={<DashboardPage role={role}/>} />
      <Route path="users" element={<AdminPage path="/admin/users"/>} />
      <Route path="locations" element={<AdminPage path="/admin/locations"/>} />
      <Route path="departments" element={<AdminPage path="/admin/departments"/>} />
      <Route path="categories" element={<AdminPage path="/admin/categories"/>} />
      <Route index element={<Navigate to="dashboard" replace/>} />
    </Route>
    <Route path="/notifications" element={<Protected role={role} allowed={['citizen','ward','department','mayor','admin']}><Workspace role={role} setRole={changeRole}/></Protected>}><Route index element={<NotificationsPage/>}/></Route>
    <Route path="/unauthorized" element={<PublicLayout/>}><Route index element={<UnauthorizedPage/>}/></Route>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes>
}
