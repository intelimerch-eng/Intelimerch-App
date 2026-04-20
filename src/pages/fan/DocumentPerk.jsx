import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { FileText, Download, ExternalLink } from 'lucide-react'

export default function DocumentPerk() {
  const navigate = useNavigate()
  return (
    <MobileShell>
      <button onClick={() => navigate('/fan/perks')} className="text-sm text-gray-500 mb-5">← Back</button>
      <div className="card">
        <p className="text-xs font-bold text-primary mb-1">Exclusive Document</p>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Summer Drop Lookbook</h2>
        <p className="text-sm text-gray-500 mb-5">The full behind-the-scenes lookbook — styling notes, inspiration, and exclusive shots.</p>

        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
            <FileText size={28} className="text-yellow-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Summer_Drop_Lookbook.pdf</p>
            <p className="text-xs text-gray-500 mt-0.5">24 pages · 8.4 MB · PDF</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[['Pages', '24'], ['Size', '8.4 MB'], ['Type', 'PDF']].map(([label, val]) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="text-sm font-bold text-gray-800">{val}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="btn-primary rounded-full py-3.5 font-bold flex-1 flex items-center justify-center gap-2">
            <Download size={18} /> Download
          </button>
          <button className="btn-outline rounded-full py-3.5 w-auto px-5 flex items-center gap-2">
            <ExternalLink size={16} /> View
          </button>
        </div>
      </div>
    </MobileShell>
  )
}
