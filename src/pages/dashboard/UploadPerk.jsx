import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Video, ChevronDown, Check } from 'lucide-react'
import { useState } from 'react'

const contentTypes = ['Video', 'Image', 'Link', 'Document']
const campaigns = ['Behind the scenes', "Summer Drop '25", 'VIP Member Unlock', 'Collab x Lekki Wave']

export default function UploadPerk() {
  const navigate = useNavigate()
  const [showTypeDrop, setShowTypeDrop] = useState(false)
  const [showCampDrop, setShowCampDrop] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [selectedCamps, setSelectedCamps] = useState([])
  const [dragging, setDragging] = useState(false)

  const toggleCamp = (c) => setSelectedCamps(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Perk</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋, Upload a new perk for your fans</p>
        </div>
        <button onClick={() => navigate('/dashboard/perks')} className="btn-outline w-auto px-5 text-sm">
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <div className="card max-w-4xl">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Perk Details</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Perk Name</label>
            <input className="input-field" placeholder="e.g. Exclusive Behind the Scenes Video" />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Content Type</label>
            <div className="relative">
              <button onClick={() => { setShowTypeDrop(!showTypeDrop); setShowCampDrop(false) }}
                className="input-field text-left flex items-center justify-between">
                <span className={selectedType ? 'text-gray-800' : 'text-gray-400'}>
                  {selectedType || 'Choose what kind of exclusive content this perk delivers'}
                </span>
                <ChevronDown size={15} className="text-gray-400 shrink-0" />
              </button>
              {showTypeDrop && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 mt-1">
                  {contentTypes.map(t => (
                    <button key={t} onClick={() => { setSelectedType(t); setShowTypeDrop(false) }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-gray-50">
                      <div className={`w-4 h-4 border-2 rounded-full ${selectedType === t ? 'bg-primary border-primary' : 'border-gray-300'}`} />
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload File</label>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={() => setDragging(false)}
              className={`border-2 border-dashed rounded-xl py-10 flex items-center justify-center gap-2 cursor-pointer transition-all ${dragging ? 'border-primary bg-primary-light' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
            >
              <Video size={18} className="text-primary" />
              <span className="text-sm text-gray-500">Tap to upload video</span>
            </div>
          </div>

          {/* Link to Campaigns */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Link to Campaigns</label>
            <div className="relative">
              <button onClick={() => { setShowCampDrop(!showCampDrop); setShowTypeDrop(false) }}
                className="input-field text-left flex items-center justify-between">
                <span className={selectedCamps.length ? 'text-gray-800' : 'text-gray-400'}>
                  {selectedCamps.length ? selectedCamps.join(', ') : 'Select campaigns to link to this perk'}
                </span>
                <ChevronDown size={15} className="text-gray-400 shrink-0" />
              </button>
              {showCampDrop && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 mt-1">
                  {campaigns.map(c => (
                    <button key={c} onClick={() => toggleCamp(c)}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-gray-50">
                      <div className={`w-4 h-4 border-2 rounded ${selectedCamps.includes(c) ? 'bg-primary border-primary' : 'border-gray-300'} flex items-center justify-center`}>
                        {selectedCamps.includes(c) && <Check size={10} className="text-white" />}
                      </div>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Description (optional)</label>
            <textarea className="input-field resize-none h-28" placeholder="Describe what fans will get when they unlock this perk..." />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => navigate('/dashboard/perks')} className="btn-primary w-auto px-6">
              <Upload size={15} /> Save to Library
            </button>
            <button onClick={() => navigate('/dashboard/perks')} className="btn-outline w-auto px-6">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
