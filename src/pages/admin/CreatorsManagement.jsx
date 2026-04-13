import { useState } from 'react'
import { Plus, Search, Trash2 } from 'lucide-react'

const creators = [
  { name: 'Luna Torres', handle: '@lunatms', tags: 2, scans: 14220, campaign: 1, status: 'Active', initials: 'LT', color: 'from-orange-300 to-pink-400' },
  { name: 'Zara Monroe', handle: '@zaramonroe', tags: 2, scans: 14220, campaign: 1, status: 'Active', initials: 'ZM', color: 'from-purple-300 to-indigo-400' },
  { name: 'Marcus Webb', handle: '@marcuswebb', tags: 2, scans: 14220, campaign: 1, status: 'Active', initials: 'MW', color: 'from-teal-300 to-blue-400' },
  { name: 'DeShawn Cole', handle: '@deshawncole', tags: 2, scans: 14220, campaign: 1, status: 'Inactive', initials: 'DC', color: 'from-gray-300 to-gray-400' },
]

export default function CreatorsManagement() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const filters = ['All', 'Active', 'Inactive']

  const filtered = creators.filter(c => {
    const matchFilter = filter === 'All' || c.status === filter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creators Management</h1>
          <p className="text-gray-500 text-sm">15 creators · 12 active</p>
        </div>
        <button className="btn-primary w-auto px-5"><Plus size={16} /> Add Creator</button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'filter-btn-active' : 'filter-btn'}>{f}</button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="input-field pl-9 w-64" />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((creator, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {creator.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{creator.name}</p>
                  <p className="text-sm text-gray-500">{creator.handle}</p>
                </div>
              </div>
              <span className={creator.status === 'Active' ? 'badge-active' : 'filter-btn text-gray-500'}>
                {creator.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1" />}
                {creator.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[['TAGS', creator.tags], ['TOTAL SCANS', creator.scans.toLocaleString()], ['CAMPAIGN', creator.campaign]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 font-semibold tracking-wide mb-0.5">{label}</p>
                  <p className="text-lg font-bold text-gray-900">{val}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn-primary w-auto px-5 text-sm py-2">View Dashboard</button>
              <button className="border border-red-200 text-red-500 font-semibold px-5 py-2 rounded-xl hover:bg-red-50 text-sm flex items-center gap-2 transition-all">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
