import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Complaint } from '../types'
import StatusBadge from './StatusBadge'

export default function ComplaintTable({ rows, compact = false }: { rows: Complaint[]; compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Complaint</th><th>Category</th><th>Status</th><th>Date reported</th>{!compact && <th>Priority</th>}<th /></tr></thead>
        <tbody>
          {rows.map(row => <tr key={row.id}>
            <td><Link className="complaint-title" to={`/citizen/complaints/${row.id}`}>{row.title}<small>{row.id} · <MapPin size={12} /> {row.location}</small></Link></td>
            <td>{row.category}</td>
            <td><StatusBadge status={row.status} /></td>
            <td className="date-cell">{row.date}</td>
            {!compact && <td><span className={`priority priority-${row.priority.toLowerCase()}`}>{row.priority}</span></td>}
            <td><Link className="icon-link" aria-label={`Open ${row.id}`} to={`/citizen/complaints/${row.id}`}><ArrowUpRight size={16} /></Link></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}
