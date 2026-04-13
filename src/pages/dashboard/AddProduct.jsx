import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, ChevronDown } from 'lucide-react'

export default function AddProduct() {
  const navigate = useNavigate()
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
              <select className="input-field appearance-none pr-10">
                <option>T-Shirt</option>
                <option>Cap</option>
                <option>Hoodie</option>
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
