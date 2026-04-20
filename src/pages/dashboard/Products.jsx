import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import EmptyState from '../../components/EmptyState'

const CAT_KEY = 'intelimerch_product_categories'
const defaultCats = ['T-Shirt', 'Cap', 'Hoodie', 'Shorts', 'Bag']
const getCats = () => { try { return JSON.parse(localStorage.getItem(CAT_KEY)) || defaultCats } catch { return defaultCats } }

const productData = Array(12).fill(null).map((_, i) => ({
  name: 'Classic Logo Tee', type: 'T-Shirt', color: 'Black', size: 'M',
  sku: '00421', batch: '2025-06', campaign: "Summer Drop '25",
  campId: '001', productId: '8841', scans: 1820, tagId: 'NFC001',
}))

export default function Products() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [categories] = useState(getCats)
  const filters = ['All', ...categories]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋, Manage your merch & NFC-linked items</p>
        </div>
        <button onClick={() => navigate('/dashboard/products/add')} className="btn-primary w-auto px-5">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'filter-btn-active' : 'filter-btn'}>{f}</button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="input-field pl-9 w-64" />
        </div>
      </div>

      {productData.filter(p => filter === 'All' || p.type === filter).length === 0 ? (
        <EmptyState icon="📦" title="No products yet" description="Add your first NFC-linked product to start tracking taps and managing campaigns." action={() => navigate('/dashboard/products/add')} actionLabel="Add Product" />
      ) : (
      <div className="card p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-medium">
              {['Product','Type','Color','Size','Sku','Batch No','Campaign','Camp. ID','Product ID','Scans','Tag ID',''].map(h => (
                <th key={h} className="text-left px-4 py-3.5 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {productData.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50/40">
                <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.type}</td>
                <td className="px-4 py-3 text-gray-500">{p.color}</td>
                <td className="px-4 py-3 text-gray-500">{p.size}</td>
                <td className="px-4 py-3 text-gray-500">{p.sku}</td>
                <td className="px-4 py-3 text-gray-500">{p.batch}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.campaign}</td>
                <td className="px-4 py-3 text-gray-500">{p.campId}</td>
                <td className="px-4 py-3 text-gray-500">{p.productId}</td>
                <td className="px-4 py-3 text-gray-700">{p.scans.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500">{p.tagId}</td>
                <td className="px-4 py-3 relative">
                  <button onClick={() => setOpenMenu(openMenu === i ? null : i)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                  {openMenu === i && (
                    <div className="absolute right-4 top-10 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 min-w-[110px]">
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-primary hover:bg-gray-50 font-medium"><Pencil size={13} /> Edit</button>
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 font-medium"><Trash2 size={13} /> Delete</button>
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
  )
}
