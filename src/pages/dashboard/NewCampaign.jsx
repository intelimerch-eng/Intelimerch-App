import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Zap, Type, AlignLeft, Image, Video, Music, Link2, LayoutTemplate, Copy, Trash2, ChevronDown, Check } from 'lucide-react'

const blockTypes = [
  { type: 'Header', icon: Type, color: 'text-violet-500' },
  { type: 'Text', icon: AlignLeft, color: 'text-gray-600' },
  { type: 'Image', icon: Image, color: 'text-green-500' },
  { type: 'Video', icon: Video, color: 'text-red-500' },
  { type: 'Audio', icon: Music, color: 'text-yellow-500' },
  { type: 'Button', icon: Link2, color: 'text-purple-500' },
  { type: 'Footer', icon: LayoutTemplate, color: 'text-pink-500' },
]

const products = ['Premium hoodie', 'Cargo shorts', 'Canvas tote', 'Classic logo tee']

const defaultBlocks = [
  { id: 1, type: 'Header', content: "Summer Drop '25" },
  { id: 2, type: 'Text', content: 'Exclusive content unlocked for this piece. Thank you for being part of the movement.' },
  { id: 3, type: 'Button', content: 'Claim Your Perk' },
  { id: 4, type: 'Video', content: null },
]

export default function NewCampaign() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('canvas')
  const [blocks, setBlocks] = useState(defaultBlocks)
  const [showProductDrop, setShowProductDrop] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  const addBlock = (type) => {
    setBlocks(b => [...b, { id: Date.now(), type, content: type === 'Header' ? 'New Header' : type === 'Button' ? 'Click Me' : 'Content here...' }])
  }

  const removeBlock = (id) => setBlocks(b => b.filter(x => x.id !== id))

  const toggleProduct = (p) => {
    setSelectedProducts(s => s.includes(p) ? s.filter(x => x !== p) : [...s, p])
  }

  return (
    <div className="flex gap-0 -m-8 h-[calc(100vh-0px)]">
      {/* Left Sidebar */}
      <div className="w-56 bg-white border-r border-gray-100 p-5 shrink-0 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Blocks</h3>
        <div className="space-y-1.5 mb-6">
          {blockTypes.map(({ type, icon: Icon, color }) => (
            <button key={type} onClick={() => addBlock(type)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-200">
              <Icon size={15} className={color} />
              {type}
            </button>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Attach Product</h3>
        <div className="relative">
          <button onClick={() => setShowProductDrop(!showProductDrop)}
            className="input-field text-left flex items-center justify-between text-gray-400 text-sm">
            Select products <ChevronDown size={14} />
          </button>
          {showProductDrop && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 mt-1">
              {products.map(p => (
                <button key={p} onClick={() => toggleProduct(p)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50">
                  <div className={`w-4 h-4 border-2 rounded ${selectedProducts.includes(p) ? 'bg-primary border-primary' : 'border-gray-300'} flex items-center justify-center`}>
                    {selectedProducts.includes(p) && <Check size={10} className="text-white" />}
                  </div>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">New Campaign</h1>
            <p className="text-sm text-gray-500">Hey Jenny 👋, create a new campaign</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-outline w-auto px-4 py-2 text-sm gap-2">
              <Save size={15} /> Save Draft
            </button>
            <button className="btn-primary w-auto px-4 py-2 text-sm gap-2">
              <Zap size={15} /> Publish
            </button>
            <button onClick={() => navigate('/dashboard/campaigns')} className="btn-outline w-auto px-4 py-2 text-sm">
              <ArrowLeft size={15} /> Back
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
              {['canvas', 'preview'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${tab === t ? 'bg-primary text-white' : 'text-gray-500'}`}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={() => navigate('/dashboard/campaigns')} className="btn-outline w-auto px-4 py-2 text-sm">
              <ArrowLeft size={15} /> Back
            </button>
          </div>

          {tab === 'canvas' ? (
            <div className="space-y-3">
              {blocks.map(block => (
                <div key={block.id} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary">{block.type}</span>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded-lg"><Copy size={14} className="text-gray-400" /></button>
                      <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-gray-100 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </div>
                  {block.type === 'Video'
                    ? <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Video placeholder</div>
                    : <p className={`text-gray-700 ${block.type === 'Header' ? 'font-semibold text-base' : 'text-sm'}`}>{block.content}</p>
                  }
                </div>
              ))}
            </div>
          ) : (
            /* Preview */
            <div className="max-w-sm mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-xs text-gray-400 ml-2 flex-1 bg-white rounded px-2 py-0.5">nfcx.app/scan/summer-25</span>
              </div>
              <div className="p-5 space-y-4">
                {blocks.map(block => (
                  <div key={block.id}>
                    {block.type === 'Header' && <h2 className="text-lg font-bold text-gray-900">{block.content}</h2>}
                    {block.type === 'Text' && <p className="text-sm text-gray-600">{block.content}</p>}
                    {block.type === 'Button' && <button className="btn-primary text-sm py-3">{block.content}</button>}
                    {block.type === 'Video' && <div className="h-40 bg-purple-200 rounded-xl flex items-center justify-center text-purple-400">▶ Video</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
