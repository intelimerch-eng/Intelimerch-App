import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, BarChart2, Pencil, Trash2, Link, X, Copy, Check } from 'lucide-react'
import EmptyState from '../../components/EmptyState'

const initData = [
  { id: 'CAMP-001', name: "Summer Drop '25", status: 'Active', taps: 2400, claims: 820, products: 4, date: '2025-06-01', endDate: '2025-08-31' },
  { id: 'CAMP-002', name: 'VIP Member Unlock', status: 'Active', taps: 1210, claims: 430, products: 2, date: '2025-06-01', endDate: '2025-09-30' },
  { id: 'CAMP-003', name: 'Behind the Scenes', status: 'Paused', taps: 680, claims: 210, products: 3, date: '2025-06-01', endDate: '2025-07-31' },
  { id: 'CAMP-004', name: 'Limited Hoodie Release', status: 'Draft', taps: 0, claims: 0, products: 1, date: '2025-06-01', endDate: '2025-10-01' },
]

export default function Campaigns() {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState(initData)
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [filter, setFilter] = useState('All')
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [genLink, setGenLink] = useState(null)
  const [copied, setCopied] = useState(false)

  const filters = ['All', 'Active', 'Paused', 'Draft']
  const filtered = campaigns.filter(c =>
    (filter === 'All' || c.status === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const openEdit = (c) => { setEditForm({ name: c.name, status: c.status, date: c.date, endDate: c.endDate }); setEditingCampaign(c.id); setOpenMenu(null) }
  const saveEdit = () => {
    setCampaigns(prev => prev.map(c => c.id === editingCampaign ? { ...c, ...editForm } : c))
    setEditingCampaign(null)
  }

  const handleGenLink = (c) => {
    const uid = `NFC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`
    setGenLink({ campaign: c.name, url: `https://intelimerch.app/nfc/${uid}`, id: uid })
    setOpenMenu(null)
  }
  const copyLink = () => { navigator.clipboard.writeText(genLink.url); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const deleteCampaign = (id) => { setCampaigns(p => p.filter(c => c.id !== id)); setOpenMenu(null) }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 text-sm">Manage and track your NFC campaigns</p>
        </div>
        <button onClick={() => navigate('/dashboard/campaigns/new')} className="btn-primary w-auto gap-2">
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
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

        {filtered.length === 0 ? (
          <EmptyState
            icon="🎯"
            title={search || filter !== 'All' ? 'No campaigns found' : 'No campaigns yet'}
            description={search || filter !== 'All' ? 'Try adjusting your filters or search term.' : 'Create your first campaign to link NFC tags to exclusive fan experiences.'}
            action={() => navigate('/dashboard/campaigns/new')}
            actionLabel="Create Campaign"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">Campaign</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Taps</th>
                  <th className="pb-3 font-semibold">Claims</th>
                  <th className="pb-3 font-semibold">Products</th>
                  <th className="pb-3 font-semibold">Start / End</th>
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
                    <td className="py-3.5"><StatusBadge status={c.status} /></td>
                    <td className="py-3.5 font-medium">{c.taps.toLocaleString()}</td>
                    <td className="py-3.5">{c.claims.toLocaleString()}</td>
                    <td className="py-3.5">{c.products} linked</td>
                    <td className="py-3.5 text-gray-500 text-xs">{c.date}<br /><span className="text-gray-400">→ {c.endDate}</span></td>
                    <td className="py-3.5 relative">
                      <button onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal size={16} className="text-gray-500" />
                      </button>
                      {openMenu === c.id && (
                        <div className="absolute right-0 top-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 w-44">
                          <MenuBtn icon={<BarChart2 size={14} />} label="Analytics" onClick={() => navigate(`/dashboard/campaigns/${c.id}/analytics`)} />
                          <MenuBtn icon={<Link size={14} />} label="Generate Link" onClick={() => handleGenLink(c)} />
                          <MenuBtn icon={<Pencil size={14} />} label="Edit Details" onClick={() => openEdit(c)} />
                          <MenuBtn icon={<Trash2 size={14} />} label="Delete" danger onClick={() => deleteCampaign(c.id)} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditingCampaign(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Edit Campaign Details</h2>
              <button onClick={() => setEditingCampaign(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Campaign Name</label>
                <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                  <input type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                  <input type="date" value={editForm.endDate} onChange={e => setEditForm(f => ({ ...f, endDate: e.target.value }))} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="input-field">
                  <option>Active</option><option>Paused</option><option>Draft</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveEdit} className="btn-primary flex-1">Save Changes</button>
              <button onClick={() => setEditingCampaign(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Link Modal */}
      {genLink && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setGenLink(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Tag Link Generated</h2>
              <button onClick={() => setGenLink(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Unique NFC tag link for <span className="font-semibold text-gray-800">{genLink.campaign}</span></p>
            <div className="bg-gray-50 rounded-xl p-3 mb-2">
              <p className="text-xs text-gray-500 mb-1">Tag ID</p>
              <p className="text-sm font-mono font-bold text-primary">{genLink.id}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-5">
              <p className="text-xs text-gray-500 mb-1">NFC URL</p>
              <p className="text-sm font-mono text-gray-800 break-all">{genLink.url}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={copyLink} className="btn-primary flex-1 gap-2">
                {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Link</>}
              </button>
              <button onClick={() => { setGenLink(null); navigate('/dashboard/tag-groups') }} className="btn-outline flex-1">
                View Tag Manager →
              </button>
            </div>
          </div>
        </div>
      )}

      {openMenu && <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />}
    </div>
  )
}

function MenuBtn({ icon, label, onClick, danger }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 ${danger ? 'text-red-500' : 'text-gray-700'}`}>
      {icon}{label}
    </button>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'Active' ? 'badge-active' : status === 'Paused' ? 'badge-paused' : 'badge-draft'
  return <span className={cls}>{status}</span>
}
