import type { Status } from '../types'

export default function StatusBadge({ status }: { status: Status | string }) {
  const cls = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge status-${cls}`}><span className="status-dot" />{status}</span>
}
