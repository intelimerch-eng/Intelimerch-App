export default function EmptyState({ icon, title, description, action, actionLabel, secondaryAction, secondaryLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6">{description}</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {action && (
          <button onClick={action} className="btn-primary w-auto px-6">{actionLabel}</button>
        )}
        {secondaryAction && (
          <button onClick={secondaryAction} className="btn-outline w-auto px-6">{secondaryLabel}</button>
        )}
      </div>
    </div>
  )
}
