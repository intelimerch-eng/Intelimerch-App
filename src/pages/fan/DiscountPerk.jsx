import { useNavigate } from 'react-router-dom'
import MobileShell from '../../components/MobileShell'
import { useState } from 'react'

export default function DiscountPerk() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('JENNY20')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <MobileShell>
      <button onClick={() => navigate('/fan/perks')} className="text-sm text-gray-500 mb-5">← Back</button>
      <div className="card">
        <p className="text-xs font-bold text-primary mb-1">Discount Code</p>
        <h2 className="text-xl font-bold text-gray-900 mb-1">20% Off Your Next Drop</h2>
        <p className="text-sm text-gray-500 mb-5">Tap the code to copy it valid on all items in the Summer Collection.</p>

        <button onClick={copy}
          className="w-full border-2 border-dashed border-primary rounded-2xl bg-primary-light py-8 flex flex-col items-center justify-center mb-5 hover:bg-primary/10 transition-all">
          <p className="text-xs text-gray-500 mb-1">Your Exclusive Code</p>
          <p className="text-3xl font-black text-gray-900 tracking-widest">JENNY20</p>
        </button>

        <button onClick={copy} className="btn-primary rounded-full py-3.5 font-bold">
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>
    </MobileShell>
  )
}
