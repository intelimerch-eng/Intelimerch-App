export default function MobileShell({ children, bg = 'bg-gray-50' }) {
  return (
    <div className={`min-h-screen ${bg} flex flex-col`}>
      <div className="mx-auto w-full flex-1 flex flex-col p-5 max-w-sm sm:max-w-md">
        {children}
      </div>
    </div>
  )
}
