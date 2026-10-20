import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Menu, X, LogOut, LayoutDashboard, ClipboardList, UserRound, ChartNoAxesCombined, Users, MapPinned, Building2, Tags, CircleHelp, FilePlus2, Search, ShieldCheck } from 'lucide-react'
import Brand from './Brand'
import { roleNames, roleHome } from '../data'
import type { Role } from '../types'

const navByRole: Record<Role, { label: string; to: string; icon: typeof LayoutDashboard }[]> = {
  citizen: [
    { label: 'Overview', to: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'My complaints', to: '/citizen/complaints', icon: ClipboardList },
    { label: 'My profile', to: '/citizen/profile', icon: UserRound },
  ],
  ward: [
    { label: 'Overview', to: '/ward/dashboard', icon: LayoutDashboard },
    { label: 'Ward complaints', to: '/ward/complaints', icon: ClipboardList },
    { label: 'Public progress', to: '/ward/public-progress', icon: ChartNoAxesCombined },
  ],
  department: [
    { label: 'Overview', to: '/department/dashboard', icon: LayoutDashboard },
    { label: 'Assigned complaints', to: '/department/complaints', icon: ClipboardList },
  ],
  mayor: [
    { label: 'Overview', to: '/mayor/dashboard', icon: LayoutDashboard },
    { label: 'Reports & insights', to: '/mayor/reports', icon: ChartNoAxesCombined },
  ],
  admin: [
    { label: 'Overview', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User management', to: '/admin/users', icon: Users },
    { label: 'Locations', to: '/admin/locations', icon: MapPinned },
    { label: 'Departments', to: '/admin/departments', icon: Building2 },
    { label: 'Categories', to: '/admin/categories', icon: Tags },
  ],
}

const roleOptions: Role[] = ['citizen', 'ward', 'department', 'mayor', 'admin']

export default function AppShell({ role, setRole }: { role: Role; setRole: (role: Role) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const currentTitle = [...navByRole[role], { label: 'Complaint details', to: location.pathname, icon: ClipboardList }]
    .find(item => item.to === location.pathname)?.label ?? 'Workspace'
  const SidebarContent = () => (
    <>
      <div className="sidebar-brand"><Brand /></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navByRole[role].map(item => {
          const Icon = item.icon
          return <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{item.label}</span>{item.label === 'My complaints' && <span className="nav-count">5</span>}</NavLink>
        })}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to="/notifications" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><Bell size={18} /><span>Notifications</span><span className="notification-pip" /></NavLink>
        <NavLink to="/about" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><CircleHelp size={18} /><span>Help & guidance</span></NavLink>
        <div className="sidebar-help">
          <span className="help-icon"><ShieldCheck size={18} /></span>
          <strong>Your city, in the loop.</strong>
          <p>Updates that make local services easier to follow.</p>
          <NavLink to="/track">Track a complaint <span>↗</span></NavLink>
        </div>
        <div className="sidebar-user"><div className="avatar">{roleNames[role].slice(0, 1)}</div><div className="user-meta"><strong>{role === 'citizen' ? 'Demo Citizen' : `Demo ${roleNames[role]}`}</strong><small>{roleNames[role]} account</small></div><LogOut size={16} className="muted-icon" /></div>
      </div>
    </>
  )
  return (
    <div className="app-shell">
      <aside className="desktop-sidebar"><SidebarContent /></aside>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}><aside className="mobile-sidebar" onClick={e => e.stopPropagation()}><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button><SidebarContent /></aside></div>}
      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button><div className="breadcrumb"><span>City Connect</span><b>/</b><strong>{currentTitle}</strong></div></div>
          <div className="topbar-actions">
            <label className="role-switch"><span>Preview as</span><select value={role} onChange={e => { const next = e.target.value as Role; setRole(next); navigate(roleHome[next]) }} aria-label="Preview interface as role">{roleOptions.map(r => <option value={r} key={r}>{roleNames[r]}</option>)}</select><ChevronDown size={14} /></label>
            <NavLink to="/notifications" className="top-icon" aria-label="Notifications"><Bell size={18} /><i /></NavLink>
            <div className="top-avatar">{roleNames[role].slice(0, 1)}</div>
          </div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="app-footer"><span>© 2026 City Connect</span><span>Demo interface · API connection not configured</span></footer>
      </main>
    </div>
  )
}
