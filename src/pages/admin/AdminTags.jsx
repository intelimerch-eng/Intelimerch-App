import { useState } from 'react'
import { Search, Wifi, Copy, Check } from 'lucide-react'

const allTags = [
  { id: 'NFC-H001', product: 'Premium Hoodie — Black', creator: 'Luna Torres', campaign: "Summer Drop '25", taps: 412, lastTap: '2025-06-18', status: 'Active' },
  { id: 'NFC-H002', product: 'Premium Hoodie — Navy', creator: 'Luna Torres', campaign: "Summer Drop '25", taps: 501, lastTap: '2025-06-18', status: 'Active' },
  { id: 'NFC-T001', product: 'Classic Logo Tee — White', creator: 'Zara Monroe', campaign: 'VIP Member Unlock', taps: 320, lastTap: '2025-06-17', status: 'Active' },
  { id: 'NFC-T002', product: 'Canvas Tote — Natural', creator: 'Marcus Webb', campaign: 'Behind the Scenes', taps: 188, lastTap: '2025-06-15', status: 'Active' },
  { id: 'NFC-C001', product: 'Cargo Shorts — Olive', creator: 'DeShawn Cole', campaign: 'Fan Access Pack', taps: 45, lastTap: '2025-06-10', status: 'Inactive' },
]

export default function AdminTags() {
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(null)

  const filtered = allTags.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.product.toLowerCase().includes(search.toLowerCase()) ||
    t.creator.toLowerCase().includes(search.toLowerCase())
  )

  const copyUrl = (id) => {
    navigator.clipboard.writeText(`https://intelimerch.app/nfc/${id}`)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const totalTaps = allTags.reduce((s, t) => s + t.taps, 0)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All NFC Tags</h1>
          <p className="text-gray-500 text-sm">{allTags.length} tags · {totalTaps.toLocaleString()} total taps</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search by tag ID, product, or creator..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-semibold">Tag ID</th>
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Creator</th>
                <th className="pb-3 font-semibold">Campaign</th>
                <th className="pb-3 font-semibold">Taps</th>
                <th className="pb-3 font-semibold">Last Tap</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(tag => (
                <tr key={tag.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Wifi size={13} className="text-primary" />
                      </div>
                      <span className="font-mono text-xs font-bold text-gray-800">{tag.id}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-700">{tag.product}</td>
                  <td className="py-3.5 text-gray-600">{tag.creator}</td>
                  <td className="py-3.5 text-gray-600">{tag.campaign}</td>
                  <td className="py-3.5 font-semibold text-gray-900">{tag.taps.toLocaleString()}</td>
                  <td className="py-3.5 text-gray-500 text-xs">{tag.lastTap}</td>
                  <td className="py-3.5">
                    <span className={tag.status === 'Active' ? 'badge-active' : 'badge-paused'}>{tag.status}</span>
                  </td>
                  <td className="py-3.5">
                    <button onClick={() => copyUrl(tag.id)} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Copy NFC URL">
                      {copied === tag.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
