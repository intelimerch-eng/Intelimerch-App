import { useState } from 'react'
import { TrendingUp, TrendingDown, Wifi, UserPlus, MessageSquare } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

const scanData = [
  { month: 'Jan', scans: 320 }, { month: 'Feb', scans: 380 }, { month: 'Mar', scans: 420 },
  { month: 'Apr', scans: 390 }, { month: 'May', scans: 450 }, { month: 'Jun', scans: 480 },
  { month: 'Jul', scans: 520 }, { month: 'Aug', scans: 790 }, { month: 'Sep', scans: 680 },
  { month: 'Oct', scans: 720 }, { month: 'Nov', scans: 760 }, { month: 'Dec', scans: 840 },
]
const locationData = [
  { name: 'Lagos', value: 4800, color: '#16a34a' },
  { name: 'Calabar', value: 4340, color: '#dc2626' },
  { name: 'Benin City', value: 980, color: '#f59e0b' },
  { name: 'Abuja', value: 1820, color: '#a78bfa' },
  { name: 'PH', value: 741, color: '#06b6d4' },
]
const deviceData = [
  { name: 'iOS', value: 50, color: '#16a34a' },
  { name: 'Android', value: 30, color: '#a78bfa' },
  { name: 'Others', value: 20, color: '#f59e0b' },
]
const topCampaigns = [
  { name: "Summer Drop '25", scans: 4821 },
  { name: 'Behind the Scenes', scans: 3102 },
  { name: 'Limited Hoodie Release', scans: 2340 },
  { name: 'Collab x Lekki Wave', scans: 1205 },
]
const campMax = Math.max(...topCampaigns.map(c => c.scans))

export default function Analytics() {
  const [period, setPeriod] = useState('12 months')
  const periods = ['12 months', '3 months', '30 days', '7 days', '24 hours']

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm">Hey Jenny 👋 Your overall performance across all campaigns</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total NFC Scans" value="13,468" trend="+18% vs last month" up icon={<Wifi size={18} className="text-teal-500" />} bg="bg-teal-50" />
        <StatCard label="Unique Activations" value="8,210" trend="+12% vs last month" up icon={<UserPlus size={18} className="text-violet-500" />} bg="bg-violet-50" />
        <StatCard label="Repeat Scans" value="5,258" trend="+7% vs last month" up icon={<MessageSquare size={18} className="text-orange-400" />} bg="bg-orange-50" />
        <StatCard label="Conversion Rate" value="24" trend="7% vs last month" up={false} icon={<TrendingDown size={18} className="text-blue-400" />} bg="bg-blue-50" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Scan Timeline</h3>
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
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="scans" stroke="#F5A623" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Top Locations</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={locationData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {locationData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Device Breakdown</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                  {deviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {deviceData.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-gray-600">{d.name}</span>
                  <span className="font-semibold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Top Campaigns</h3>
          <div className="space-y-3">
            {topCampaigns.map(c => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-36 shrink-0 truncate">{c.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(c.scans / campMax) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold text-primary w-12 text-right">{c.scans.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
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
