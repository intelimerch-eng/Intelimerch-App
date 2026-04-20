import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Wifi, UserPlus, MousePointerClick, BarChart2 } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

const campaignMeta = {
  'CAMP-001': { name: "Summer Drop '25", status: 'Active', product: '4 linked', created: '2025-06-01' },
  'CAMP-002': { name: 'VIP Member Unlock', status: 'Active', product: '2 linked', created: '2025-06-01' },
  'CAMP-003': { name: 'Behind the Scenes', status: 'Paused', product: '3 linked', created: '2025-06-01' },
  'CAMP-004': { name: 'Limited Hoodie Release', status: 'Draft', product: '1 linked', created: '2025-06-01' },
}

const tapData = [
  { day: 'Mon', taps: 120 }, { day: 'Tue', taps: 180 }, { day: 'Wed', taps: 160 },
  { day: 'Thu', taps: 240 }, { day: 'Fri', taps: 310 }, { day: 'Sat', taps: 280 }, { day: 'Sun', taps: 190 },
]

const locationData = [
  { name: 'Lagos', value: 2400, color: '#16a34a' },
  { name: 'Abuja', value: 1200, color: '#a78bfa' },
  { name: 'PH', value: 680, color: '#06b6d4' },
  { name: 'Calabar', value: 540, color: '#f59e0b' },
]

const perkData = [
  { name: 'Video', claims: 820 },
  { name: 'Discount', claims: 610 },
  { name: 'Audio', claims: 380 },
  { name: 'Image', claims: 210 },
]

export default function CampaignAnalytics() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [period, setPeriod] = useState('7 days')
  const periods = ['24 hours', '7 days', '30 days', '3 months']

  const meta = campaignMeta[id] || { name: `Campaign ${id}`, status: 'Active', product: '—', created: '—' }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/campaigns')} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{meta.name}</h1>
            <p className="text-gray-500 text-sm">Campaign Analytics · {meta.product} · Created {meta.created}</p>
          </div>
          <StatusBadge status={meta.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Taps" value="4,821" trend="+18% this week" up icon={<Wifi size={18} className="text-teal-500" />} bg="bg-teal-50" />
        <StatCard label="Unique Activations" value="2,104" trend="+11% this week" up icon={<UserPlus size={18} className="text-violet-500" />} bg="bg-violet-50" />
        <StatCard label="Perk Claims" value="1,890" trend="+9% this week" up icon={<MousePointerClick size={18} className="text-orange-400" />} bg="bg-orange-50" />
        <StatCard label="Conversion Rate" value="39%" trend="+3% this week" up icon={<BarChart2 size={18} className="text-blue-400" />} bg="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 lg:col-span-2 card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Tap Activity</h3>
            <div className="flex gap-1">
              {periods.map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${period === p ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={tapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="taps" stroke="#F5A623" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F5A623' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Top Locations</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={locationData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                {locationData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-3">
            {locationData.map(l => (
              <div key={l.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-gray-600">{l.name}</span>
                </div>
                <span className="font-medium">{l.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">Perk Claims by Type</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={perkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="claims" fill="#F5A623" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function StatCard({ label, value, trend, up, icon, bg }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{label}</p>
        <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className={`text-xs font-medium flex items-center gap-1 ${up ? 'text-green-600' : 'text-red-500'}`}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{trend}
      </p>
    </div>
  )
}

function StatusBadge({ status }) {
  const cls = status === 'Active' ? 'badge-active' : status === 'Paused' ? 'badge-paused' : 'badge-draft'
  return <span className={cls}>{status}</span>
}
