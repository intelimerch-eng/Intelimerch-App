import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, ChevronDown, Check, X } from 'lucide-react'

const CAT_KEY = 'intelimerch_product_categories'
const defaultCats = ['T-Shirt', 'Cap', 'Hoodie', 'Shorts', 'Bag']
const getCats = () => { try { return JSON.parse(localStorage.getItem(CAT_KEY)) || defaultCats } catch { return defaultCats } }

export default function AddProduct() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(getCats)
  const [selectedType, setSelectedType] = useState(categories[0])
  const [showDrop, setShowDrop] = useState(false)
  const [addingCat, setAddingCat] = useState(false)
  const [newCat, setNewCat] = useState('')

  const addCategory = () => {
    const trimmed = newCat.trim()
    if (!trimmed || categories.includes(trimmed)) return
    const updated = [...categories, trimmed]
    setCategories(updated)
    localStorage.setItem(CAT_KEY, JSON.stringify(updated))
    setSelectedType(trimmed)
    setNewCat(''); setAddingCat(false); setShowDrop(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋, Link a physical product to NFC</p>
        </div>
        <button onClick={() => navigate('/dashboard/products')} className="btn-outline w-auto px-5 text-sm">
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <div className="card max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Product Name" placeholder="e.g classic logo tee" />
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Product Type</label>
            <div className="relative">
              <button type="button" onClick={() => setShowDrop(!showDrop)}
                className="input-field text-left flex items-center justify-between">
                <span className="text-gray-800">{selectedType}</span>
                <ChevronDown size={15} className="text-gray-400 shrink-0" />
              </button>
              {showDrop && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 mt-1 max-h-52 overflow-y-auto">
                  {categories.map(c => (
                    <button key={c} type="button" onClick={() => { setSelectedType(c); setShowDrop(false) }}
                      className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm hover:bg-gray-50 ${selectedType === c ? 'text-primary font-medium' : 'text-gray-700'}`}>
                      {selectedType === c && <Check size={13} className="shrink-0" />}{c}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    {addingCat ? (
                      <div className="flex items-center gap-1.5 px-3 py-2">
                        <input autoFocus value={newCat} onChange={e => setNewCat(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addCategory()}
                          className="input-field text-sm py-1.5 flex-1" placeholder="Category name..." />
                        <button type="button" onClick={addCategory} className="p-1.5 bg-primary rounded-lg text-white"><Check size={13} /></button>
                        <button type="button" onClick={() => { setAddingCat(false); setNewCat('') }} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={13} /></button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setAddingCat(true)}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-primary hover:bg-primary/5 font-medium">
                        <Plus size={13} /> Add new category
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Field label="Color" placeholder="Input color" />
          <Field label="Size" placeholder="Input size" />
          <Field label="SKU" placeholder="SKU-00421" />
          <Field label="Batch Number" placeholder="BATCH-2025-07" />
          <Field label="Product ID" placeholder="PROD-8841" />
          <Field label="Tag ID" placeholder="NFC000128" />
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Assign Campaign</label>
            <div className="relative">
              <select className="input-field appearance-none pr-10">
                <option value="">Select a campaign</option>
                <option>Summer Drop '25</option>
                <option>VIP Member Unlock</option>
                <option>Behind the Scenes</option>
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <Field label="Campaign ID" placeholder="Input Campaign ID" />
        </div>

        <div className="flex items-center gap-3 mt-8">
          <button onClick={() => navigate('/dashboard/products')} className="btn-primary w-auto px-6">
            <Plus size={15} /> Add Product
          </button>
          <button onClick={() => navigate('/dashboard/products')} className="btn-outline w-auto px-6">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">{label}</label>
      <input type={type} className="input-field" placeholder={placeholder} />
    </div>
  )
}
