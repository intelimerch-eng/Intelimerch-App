import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Video, Link2, Image, FileText, Pencil, Trash2, Check, X } from 'lucide-react'
import EmptyState from '../../components/EmptyState'

const initPerks = [
  { id: 1, title: 'Exclusive BTS Video', type: 'video', icon: Video, iconBg: 'bg-red-50', iconColor: 'text-red-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active', url: '', description: '' },
  { id: 2, title: '10% Off Next Purchase', type: 'Link', icon: Link2, iconBg: 'bg-purple-50', iconColor: 'text-purple-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active', url: '', description: 'Discount code: JENNY10' },
  { id: 3, title: 'Limited Edition Artwork', type: 'Image', icon: Image, iconBg: 'bg-teal-50', iconColor: 'text-teal-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active', url: '', description: '' },
  { id: 4, title: 'Lookbook PDF', type: 'Document', icon: FileText, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired', url: '', description: '' },
  { id: 5, title: 'VIP Discord Access', type: 'Link', icon: Link2, iconBg: 'bg-purple-50', iconColor: 'text-purple-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired', url: '', description: '' },
  { id: 6, title: 'Exclusive BTS Images', type: 'Image', icon: Image, iconBg: 'bg-teal-50', iconColor: 'text-teal-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired', url: '', description: '' },
  { id: 7, title: 'Exclusive BTS Video', type: 'video', icon: Video, iconBg: 'bg-red-50', iconColor: 'text-red-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired', url: '', description: "Come behind the scenes with me — real moments, unfiltered vibes 🖤" },
]

const typeBadge = { video: 'bg-red-50 text-red-500', Link: 'bg-purple-50 text-purple-500', Image: 'bg-teal-50 text-teal-600', Document: 'bg-yellow-50 text-yellow-600' }

export default function PerksLibrary() {
  const navigate = useNavigate()
  const [perks, setPerks] = useState(initPerks)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const openEdit = (perk) => { setEditForm({ title: perk.title, url: perk.url, description: perk.description, status: perk.status }); setEditingId(perk.id) }
  const saveEdit = (id) => { setPerks(p => p.map(x => x.id === id ? { ...x, ...editForm } : x)); setEditingId(null) }
  const deletePerk = (id) => setPerks(p => p.filter(x => x.id !== id))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perks Library</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋, Reusable exclusive content for your fans</p>
        </div>
        <button onClick={() => navigate('/dashboard/perks/upload')} className="btn-primary w-auto px-5">
          <Upload size={16} /> Upload Perk
        </button>
      </div>

      {perks.length === 0 ? (
        <EmptyState icon="🎁" title="No perks uploaded yet" description="Create your first perk — exclusive videos, discount codes, images, or documents for your fans." action={() => navigate('/dashboard/perks/upload')} actionLabel="Upload Perk" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {perks.map((perk) => (
            <div key={perk.id} className={`card transition-all ${editingId === perk.id ? 'ring-2 ring-primary/30 shadow-md' : 'hover:shadow-sm'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${perk.iconBg} rounded-xl flex items-center justify-center`}>
                  <perk.icon size={18} className={perk.iconColor} />
                </div>
                <div className="flex gap-1">
                  {editingId === perk.id ? (
                    <>
                      <button onClick={() => saveEdit(perk.id)} className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg"><Check size={13} className="text-primary" /></button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={13} className="text-gray-500" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => openEdit(perk)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={13} className="text-primary" /></button>
                      <button onClick={() => deletePerk(perk.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={13} className="text-red-400" /></button>
                    </>
                  )}
                </div>
              </div>

              {editingId === perk.id ? (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                    <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="input-field text-sm py-2" placeholder="Perk title..." />
                  </div>
                  {(perk.type === 'video') && (
                    <div><label className="block text-xs font-semibold text-gray-700 mb-1">Video URL</label>
                      <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} className="input-field text-sm py-2" placeholder="https://youtube.com/..." />
                    </div>
                  )}
                  {perk.type === 'Link' && (
                    <div><label className="block text-xs font-semibold text-gray-700 mb-1">URL / Discount Code</label>
                      <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} className="input-field text-sm py-2" placeholder="URL or discount code..." />
                    </div>
                  )}
                  {perk.type === 'Image' && (
                    <div><label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                      <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} className="input-field text-sm py-2" placeholder="https://..." />
                    </div>
                  )}
                  {perk.type === 'Document' && (
                    <div><label className="block text-xs font-semibold text-gray-700 mb-1">Document URL</label>
                      <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} className="input-field text-sm py-2" placeholder="https://drive.google.com/..." />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                    <textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} className="input-field text-sm py-2 resize-none h-16" placeholder="Brief description..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="input-field text-sm py-2">
                      <option>Active</option><option>Expired</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{perk.title}</h3>
                  {perk.description && <p className="text-xs text-gray-500 mb-2 leading-relaxed">{perk.description}</p>}
                  <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 ${typeBadge[perk.type] || 'bg-gray-100 text-gray-600'}`}>{perk.type}</span>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-400 mb-1">Used in campaigns:</p>
                    {perk.campaigns.map(c => <p key={c} className="text-xs text-primary">· {c}</p>)}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Added {perk.date}</span>
                    {perk.status === 'Active'
                      ? <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Active</span>
                      : <span className="badge-paused text-xs">Expired</span>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
