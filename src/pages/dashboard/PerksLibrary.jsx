import { useNavigate } from 'react-router-dom'
import { Upload, Video, Link2, Image, FileText, Pencil, Trash2 } from 'lucide-react'

const perks = [
  { title: 'Exclusive BTS Video', type: 'video', icon: Video, iconBg: 'bg-red-50', iconColor: 'text-red-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active' },
  { title: '10% Off Next Purchase', type: 'Link', icon: Link2, iconBg: 'bg-purple-50', iconColor: 'text-purple-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active' },
  { title: 'Limited Edition Artwork', type: 'Image', icon: Image, iconBg: 'bg-teal-50', iconColor: 'text-teal-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Active' },
  { title: 'Lookbook PDF', type: 'Document', icon: FileText, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired' },
  { title: 'VIP Discord Access', type: 'Link', icon: Link2, iconBg: 'bg-purple-50', iconColor: 'text-purple-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired' },
  { title: 'Exclusive BTS Images', type: 'Image', icon: Image, iconBg: 'bg-teal-50', iconColor: 'text-teal-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired' },
  { title: 'Exclusive BTS Video', type: 'video', icon: Video, iconBg: 'bg-red-50', iconColor: 'text-red-400', campaigns: ['Behind the Scenes', "Summer Drop '25"], date: '2025-05-10', status: 'Expired', description: "Come behind the scenes with me real moments, unfiltered vibes, and everything I don't usually show you 🖤" },
]

const typeBadge = { video: 'bg-red-50 text-red-500', Link: 'bg-purple-50 text-purple-500', Image: 'bg-teal-50 text-teal-600', Document: 'bg-yellow-50 text-yellow-600' }

export default function PerksLibrary() {
  const navigate = useNavigate()
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {perks.map((perk, i) => (
          <div key={i} className="card hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${perk.iconBg} rounded-xl flex items-center justify-center`}>
                <perk.icon size={18} className={perk.iconColor} />
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Pencil size={13} className="text-primary" /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Trash2 size={13} className="text-red-400" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1.5">{perk.title}</h3>
            {perk.description && <p className="text-xs text-gray-500 mb-2 leading-relaxed">{perk.description}</p>}
            <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 ${typeBadge[perk.type] || 'bg-gray-100 text-gray-600'}`}>
              {perk.type}
            </span>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400 mb-1">Used in campaigns:</p>
              {perk.campaigns.map(c => (
                <p key={c} className="text-xs text-primary">· {c}</p>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-400">Added {perk.date}</span>
              {perk.status === 'Active'
                ? <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Active</span>
                : <span className="badge-paused text-xs">Expired</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
