import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, BarChart2, Pencil, Trash2 } from 'lucide-react'

const allCampaigns = [
  { name: "Summer Drop '25", id: 'CAMP-001', product: '4 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Active' },
  { name: 'VIP Member Unlock', id: 'CAMP-002', product: '2 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Active' },
  { name: 'Behind the Scenes', id: 'CAMP-003', product: '3 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Paused' },
  { name: 'Limited Hoodie Release', id: 'CAMP-004', product: '1 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Draft' },
  { name: "Summer Drop '25", id: 'CAMP-001', product: '4 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Active' },
  { name: 'VIP Member Unlock', id: 'CAMP-002', product: '2 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Active' },
  { name: 'Behind the Scenes', id: 'CAMP-003', product: '3 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Paused' },
  { name: 'Limited Hoodie Release', id: 'CAMP-004', product: '1 linked', date: '2025-06-01', scans: 4821, conv: '42%', status: 'Draft' },
]

export default function Campaigns() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const filters = ['All', 'Active', 'Paused', 'Draft']

  const filtered = allCampaigns.filter(c => {
    const matchFilter = filter === 'All' || c.status === filter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋, Manage all your campaign experiences</p>
        </div>
        <button onClick={() => navigate('/dashboard/campaigns/new')} className="btn-primary w-auto px-5">
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={filter === f ? 'filter-btn-active' : 'filter-btn'}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search" className="input-field pl-9 w-64" />
        </div>
      </div>

      <div className="card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-medium">
              {['Campaign Name','Camp. ID','Product','Date Created','Scans','Conv.','Status',''].map(h => (
                <th key={h} className="text-left px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50/40 relative">
                <td className="px-5 py-4 font-medium text-gray-800">{c.name}</td>
                <td className="px-5 py-4 text-gray-500">{c.id}</td>
                <td className="px-5 py-4 text-gray-500">{c.product}</td>
                <td className="px-5 py-4 text-gray-500">{c.date}</td>
                <td className="px-5 py-4 text-gray-700">{c.scans.toLocaleString()}</td>
                <td className="px-5 py-4 text-gray-700">{c.conv}</td>
                <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                <td className="px-5 py-4 relative">
                  <button onClick={() => setOpenMenu(openMenu === i ? null : i)}
                    className="p-1 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                  {openMenu === i && (
                    <div className="absolute right-4 top-10 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 min-w-[130px]">
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-teal-600 hover:bg-gray-50 font-medium">
                        <BarChart2 size={14} /> Analytics
                      </button>
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-primary hover:bg-gray-50 font-medium">
                        <Pencil size={14} /> Edit
                      </button>
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 font-medium">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'Active' ? 'badge-active' : status === 'Paused' ? 'badge-paused' : 'badge-draft'
  return <span className={cls}>{status}</span>
}
