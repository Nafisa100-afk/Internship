import type { Complaint, Role } from './types'

export const roleNames: Record<Role, string> = {
  citizen: 'Citizen',
  ward: 'Ward Clerk',
  department: 'Department Clerk',
  mayor: 'Mayor',
  admin: 'System Admin',
}

export const demoComplaints: Complaint[] = [
  { id: 'CC-2048', title: 'Streetlight not working', category: 'Street lighting', location: 'Road 7, North Ward', status: 'In progress', date: '18 Oct 2026', priority: 'Normal' },
  { id: 'CC-2047', title: 'Waterlogging after rain', category: 'Drainage', location: 'Lakeview Lane', status: 'Under review', date: '17 Oct 2026', priority: 'High' },
  { id: 'CC-2046', title: 'Waste collection missed', category: 'Waste management', location: 'Market Road', status: 'Submitted', date: '16 Oct 2026', priority: 'Normal' },
  { id: 'CC-2045', title: 'Damaged footpath', category: 'Roads & footpaths', location: 'Central Avenue', status: 'Resolved', date: '14 Oct 2026', priority: 'Normal' },
  { id: 'CC-2044', title: 'Open drain cover', category: 'Drainage', location: 'School Street', status: 'Needs information', date: '13 Oct 2026', priority: 'Urgent' },
]

export const roleHome: Record<Role, string> = {
  citizen: '/citizen/dashboard',
  ward: '/ward/dashboard',
  department: '/department/dashboard',
  mayor: '/mayor/dashboard',
  admin: '/admin/dashboard',
}
