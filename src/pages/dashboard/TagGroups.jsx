import { useState } from 'react'
import { Pencil, Plus, Trash2, TrendingUp, Wifi, BarChart2, TrendingDown } from 'lucide-react'
import EmptyState from '../../components/EmptyState'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const initTags = [
  { id: 'NFC-H001', product: 'Premium Hoodie — Black', scans: 412, lastScan: '2025-06-18' },
  { id: 'NFC-H002', product: 'Premium Hoodie — Navy', scans: 501, lastScan: '2025-06-18' },
  { id: 'NFC-H003', product: 'Premium Hoodie — White', scans: 210, lastScan: '2025-06-18' },
  { id: 'NFC-H004', product: 'Premium Hoodie — Grey', scans: 210, lastScan: '2025-06-18' },
  { id: 'NFC-H005', product: 'Premium Hoodie — Olive', scans: 298, lastScan: '2025-06-18' },
]

const scanData = [
  { month: 'Jan', scans: 200 }, { month: 'Feb', scans: 280 }, { month: 'Mar', scans: 320 },
  { month: 'Apr', scans: 290 }, { month: 'May', scans: 400 }, { month: 'Jun', scans: 450 },
  { month: 'Jul', scans: 520 }, { month: 'Aug', scans: 790 }, { month: 'Sep', scans: 620 },
  { month: 'Oct', scans: 680 }, { month: 'Nov', scans: 720 }, { month: 'Dec', scans: 800 },
]

const barData = initTags.map(t => ({ name: t.id, scans: t.scans }))
const rankMax = Math.max(...initTags.map(t => t.scans))

export default function TagGroups() {
  const [tags, setTags] = useState(initTags)
  const [activeTab, setActiveTab] = useState('All Tags (5)')
  const [period, setPeriod] = useState('12 months')
  const periods = ['12 months', '3 months', '30 days', '7 days', '24 hours']

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center">
            <span className="text-primary text-2xl">🏷</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">Summer Drop '25</h1>
              <span className="badge-active">Active</span>
            </div>
            <p className="text-sm text-gray-500">Premium hoodies from the Limited Drop</p>
            <p className="text-xs text-gray-400">Created 2025-05-10</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline w-auto px-4 text-sm"><Pencil size={14} /> Edit Group</button>
          <button className="btn-primary w-auto px-4 text-sm"><Plus size={14} /> Add Tag</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-gray-500 mb-2">Total Tags</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">5</p>
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-purple-500 text-sm">🏷</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-500 mb-2">Total Scans</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">1,610</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp size={11} />18% vs last month</p>
            </div>
            <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
              <Wifi size={16} className="text-teal-500" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-500 mb-2">Avg Scans / Tag</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">322</p>
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <BarChart2 size={16} className="text-orange-400" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-500 mb-2">Top Tag Scans</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">501</p>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingDown size={16} className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {['All Tags (5)', 'Scan Activity'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={activeTab === t ? 'filter-btn-active' : 'filter-btn'}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'All Tags (5)' ? (
        tags.length === 0 ? (
          <EmptyState icon="📡" title="No tags in this group" description="Add NFC tags to this group to start tracking taps and linking fan experiences." actionLabel="Add Tag" />
        ) : (
        <div className="card p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-400 text-xs font-medium">
                {['Tag ID', 'Product', 'Scans', 'Last Scan', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tags.map((tag, i) => (
                <tr key={i} className="hover:bg-gray-50/40">
                  <td className="px-5 py-4 font-medium text-gray-800">{tag.id}</td>
                  <td className="px-5 py-4 text-gray-600">{tag.product}</td>
                  <td className="px-5 py-4 text-gray-700">{tag.scans}</td>
                  <td className="px-5 py-4 text-gray-500">{tag.lastScan}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"><Pencil size={13} className="text-primary" /></button>
                      <button onClick={() => setTags(t => t.filter((_, j) => j !== i))} className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"><Trash2 size={13} className="text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2 card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Scan Activity Over Time</h3>
              <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg">View report</button>
            </div>
            <div className="flex gap-2 mb-4">
              {periods.map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${period === p ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  {p}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="scans" stroke="#F5A623" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Scans Per Tag</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="scans" fill="#F5A623" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tag Performance Ranking */}
          <div className="col-span-1 lg:col-span-3 card">
            <h3 className="font-semibold text-gray-800 mb-4">Tag Performance Ranking</h3>
            <div className="space-y-3">
              {[...tags].sort((a,b) => b.scans - a.scans).map(tag => (
                <div key={tag.id} className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-16 shrink-0">{tag.id}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${(tag.scans / rankMax) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-primary w-8 text-right">{tag.scans}</span>
                  <span className="text-sm text-gray-500 w-40">{tag.product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
