import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Users, Wifi, Gift } from 'lucide-react'

const tapData = [
  { month: 'Jan', taps: 4200 }, { month: 'Feb', taps: 5800 }, { month: 'Mar', taps: 7100 },
  { month: 'Apr', taps: 6300 }, { month: 'May', taps: 8900 }, { month: 'Jun', taps: 11200 },
]

const creatorData = [
  { name: 'Luna T.', taps: 14220 },
  { name: 'Zara M.', taps: 11340 },
  { name: 'Marcus W.', taps: 8900 },
  { name: 'DeShawn C.', taps: 3200 },
]

const stats = [
  { label: 'Total Taps', value: '37,660', change: '+18%', icon: Wifi, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Total Claims', value: '12,840', change: '+12%', icon: Gift, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Active Creators', value: '12', change: '+3', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Active Campaigns', value: '8', change: '+2', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
]

const periods = ['7 days', '30 days', '3 months', '12 months']

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('12 months')

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500 text-sm">Overall performance across all creators and campaigns</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${period === p ? 'bg-primary text-white' : 'text-gray-500'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="card">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs font-medium text-green-600 mt-1">{s.change} this period</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="card lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Total Taps Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={tapData}>
              <defs>
                <linearGradient id="tapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="taps" stroke="var(--color-primary)" strokeWidth={2} fill="url(#tapGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Taps by Creator</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={creatorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip />
              <Bar dataKey="taps" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
