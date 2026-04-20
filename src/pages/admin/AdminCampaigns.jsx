import { useState } from 'react'
import { Search, BarChart2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const allCampaigns = [
  { id: 'CAMP-001', name: "Summer Drop '25", creator: 'Luna Torres', handle: '@lunatms', status: 'Active', taps: 2400, claims: 820 },
  { id: 'CAMP-002', name: 'VIP Member Unlock', creator: 'Luna Torres', handle: '@lunatms', status: 'Active', taps: 1210, claims: 430 },
  { id: 'CAMP-003', name: 'Behind the Scenes', creator: 'Zara Monroe', handle: '@zaramonroe', status: 'Paused', taps: 680, claims: 210 },
  { id: 'CAMP-004', name: 'Limited Hoodie Drop', creator: 'Marcus Webb', handle: '@marcuswebb', status: 'Draft', taps: 0, claims: 0 },
  { id: 'CAMP-005', name: 'Merch Exclusive', creator: 'Zara Monroe', handle: '@zaramonroe', status: 'Active', taps: 980, claims: 310 },
  { id: 'CAMP-006', name: 'Fan Access Pack', creator: 'DeShawn Cole', handle: '@deshawncole', status: 'Paused', taps: 120, claims: 40 },
]

const statusCls = { Active: 'badge-active', Paused: 'badge-paused', Draft: 'badge-draft' }

export default function AdminCampaigns() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [openMenu, setOpenMenu] = useState(null)

  const filters = ['All', 'Active', 'Paused', 'Draft']
  const filtered = allCampaigns.filter(c =>
    (filter === 'All' || c.status === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.creator.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Campaigns</h1>
        <p className="text-gray-500 text-sm">{allCampaigns.length} campaigns across all creators</p>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search campaigns or creators..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
          </div>
          <div className="flex gap-1">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${filter === f ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-semibold">Campaign</th>
                <th className="pb-3 font-semibold">Creator</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Taps</th>
                <th className="pb-3 font-semibold">Claims</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.id}</div>
                  </td>
                  <td className="py-3.5">
                    <div className="font-medium text-gray-800">{c.creator}</div>
                    <div className="text-xs text-gray-400">{c.handle}</div>
                  </td>
                  <td className="py-3.5"><span className={statusCls[c.status]}>{c.status}</span></td>
                  <td className="py-3.5 font-medium">{c.taps.toLocaleString()}</td>
                  <td className="py-3.5">{c.claims.toLocaleString()}</td>
                  <td className="py-3.5 relative">
                    <button onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                    {openMenu === c.id && (
                      <div className="absolute right-0 top-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 w-44">
                        <button onClick={() => navigate(`/dashboard/campaigns/${c.id}/analytics`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-gray-700">
                          <BarChart2 size={14} /> Analytics
                        </button>
                        <button onClick={() => navigate(`/dashboard?adminAs=${encodeURIComponent(c.handle)}`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-gray-700">
                          View as Creator
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
      {openMenu && <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />}
    </div>
  )
}
