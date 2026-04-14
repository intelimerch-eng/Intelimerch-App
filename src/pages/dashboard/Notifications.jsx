const notifications = [
  { msg: "Your campaign 'Summer Drop '25' reached 5,000 scans", time: '2 hours ago', read: false },
  { msg: "New product 'Premium Hoodie' connected to NFC tag", time: '5 hours ago', read: false },
  { msg: "VIP Member Unlock' campaign is still in Draft", time: '1 day ago', read: true },
  { msg: "Campaign 'Collab x Lekki Wave' expires in 3 days", time: '1 day ago', read: true },
  { msg: "Limited Hoodie Release' hit 61% conversion rate!", time: '2 day ago', read: true },
]

export default function Notifications() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">Hey Jenny 👋 Stay updated on your campaigns</p>
        </div>
        <button className="btn-outline w-auto px-5 text-sm">Mark all read</button>
      </div>

      <div className="space-y-3 max-w-3xl">
        {notifications.map((n, i) => (
          <div key={i} className={`card relative ${!n.read ? 'border-primary/20 bg-primary-light/30' : ''}`}>
            {!n.read && (
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full" />
            )}
            <p className="font-medium text-gray-800 mb-1 pr-6">{n.msg}</p>
            <p className="text-xs text-gray-400">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
