export type Role = 'citizen' | 'ward' | 'department' | 'mayor' | 'admin'
export type Status = 'Submitted' | 'Under review' | 'In progress' | 'Resolved' | 'Needs information'
export interface Complaint {
  id: string
  title: string
  category: string
  location: string
  status: Status
  date: string
  priority: 'Normal' | 'High' | 'Urgent'
}
