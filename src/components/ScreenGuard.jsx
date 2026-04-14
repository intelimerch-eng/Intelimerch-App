import { useState, useEffect } from 'react'
import { Monitor, X } from 'lucide-react'

// Wraps dashboard/admin pages and warns if screen is too small
export default function ScreenGuard({ children, minWidth = 1024 }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const isTooSmall = width < minWidth

  if (isTooSmall && !dismissed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Monitor size={30} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Better on a larger screen</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            This dashboard is designed for screens wider than <strong>{minWidth}px</strong>.
            Your current screen is <strong>{width}px</strong>. For the best experience, open this on a laptop or desktop.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="btn-primary mb-3"
          >
            Continue anyway
          </button>
          <p className="text-xs text-gray-400">Some elements may appear cramped or overlap</p>
        </div>
      </div>
    )
  }

  // Show a persistent small banner if dismissed but still small
  return (
    <div className="relative">
      {isTooSmall && dismissed && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white text-xs font-medium py-2 px-4 flex items-center justify-between">
          <span>⚠️ For the best experience, use a screen wider than {minWidth}px</span>
          <button onClick={() => setDismissed(false)} className="ml-4 hover:opacity-70">
            <X size={14} />
          </button>
        </div>
      )}
      <div className={isTooSmall && dismissed ? 'pt-8' : ''}>
        {children}
      </div>
    </div>
  )
}
