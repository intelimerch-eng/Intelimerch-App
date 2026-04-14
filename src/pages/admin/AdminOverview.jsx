import { useState } from 'react'
import { Bell, Settings, TrendingUp, Wifi, Tag, Users } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const scanData = [
  { month: 'Jan', scans: 5000 }, { month: 'Feb', scans: 8000 }, { month: 'Mar', scans: 10000 },
  { month: 'Apr', scans: 9000 }, { month: 'May', scans: 12000 }, { month: 'Jun', scans: 15000 },
  { month: 'Jul', scans: 18000 }, { month: 'Aug', scans: 26000 }, { month: 'Sep', scans: 22000 },
  { month: 'Oct', scans: 24000 }, { month: 'Nov', scans: 25000 }, { month: 'Dec', scans: 27000 },
]

const campaignData = [
  { name: 'Summer drop', scans: 18000 },
  { name: 'VIP Member', scans: 14000 },
  { name: 'Behind the Scenes', scans: 20000 },
  { name: 'Limited Hoodie', scans: 12000 },
  { name: "Summer Drop '25", scans: 3000 },
]

const activities = [
  { msg: 'New tag batch generated for Luna Torres', time: '2m ago' },
  { msg: "Campaign 'Street Collab Vol3' hit 19k scans", time: '18m ago' },
  { msg: 'New creator onboarded: Marcus Webb', time: '1h ago' },
  { msg: 'TAG-003 hit 1,944 scans  top performer', time: '3h ago' },
  { msg: 'DeShawn Cole account flagged by support', time: '5h ago' },
]

export default function AdminOverview() {
  const [period, setPeriod] = useState('12 months')
  const periods = ['12 months', '3 months', '30 days', '7 days', '24 hours']

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-500 text-sm">System overview at a glance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-xl"><Bell size={20} className="text-gray-600" /></button>
          <button className="p-2 hover:bg-gray-100 rounded-xl"><Settings size={20} className="text-gray-600" /></button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Creators" value="15" trend="+5 this month" icon={<Users size={18} className="text-violet-500" />} bg="bg-violet-50" />
        <StatCard label="Total Scans" value="4,920" trend="22% this month" icon={<Wifi size={18} className="text-teal-500" />} bg="bg-teal-50" />
        <StatCard label="Active Campaigns" value="3" trend="+2 vs last month" icon={<Tag size={18} className="text-orange-400" />} bg="bg-orange-50" />
        <StatCard label="Tagged Items" value="6" trend="+4 this week" icon={<TrendingUp size={18} className="text-blue-400" />} bg="bg-blue-50" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Scan Activity</h3>
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
          <h3 className="font-semibold text-gray-800 mb-4">Scans By Campaign</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={campaignData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="scans" fill="#F5A623" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="space-y-0 divide-y divide-gray-50">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <p className="text-sm text-gray-700">{a.msg}</p>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, trend, icon, bg }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{label}</p>
        <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs font-medium text-green-600 flex items-center gap-1"><TrendingUp size={11} />{trend}</p>
    </div>
  )
}
