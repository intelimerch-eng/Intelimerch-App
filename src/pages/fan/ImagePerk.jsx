import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { Download } from 'lucide-react'

export default function ImagePerk() {
  const navigate = useNavigate()
  return (
    <MobileShell>
      <button onClick={() => navigate('/fan/perks')} className="text-sm text-gray-500 mb-5">← Back</button>
      <div className="card">
        <p className="text-xs font-bold text-primary mb-1">Exclusive Artwork</p>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Limited Edition Artwork</h2>
        <p className="text-sm text-gray-500 mb-4">This piece was made exclusively for fans who own this drop. Yours to keep.</p>

        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-teal-200 via-purple-200 to-pink-200 h-64 flex items-center justify-center mb-5">
          <div className="text-center">
            <div className="text-6xl mb-2">🎨</div>
            <p className="text-sm font-semibold text-gray-700">Limited Edition</p>
            <p className="text-xs text-gray-500">#0042 / 500</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Edition</p>
            <p className="text-sm font-bold text-gray-800">#0042 of 500</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Collection</p>
            <p className="text-sm font-bold text-gray-800">Summer Drop '25</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Format</p>
            <p className="text-sm font-bold text-gray-800">PNG · 4K</p>
          </div>
        </div>

        <button className="btn-primary rounded-full py-3.5 font-bold flex items-center justify-center gap-2">
          <Download size={18} /> Save Artwork
        </button>
      </div>
    </MobileShell>
  )
}
