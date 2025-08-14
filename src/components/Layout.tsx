import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Icons } from './Icons'
import clsx from 'clsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
  { to: '/leaderboard', label: 'Leaderboard', icon: Icons.Trophy },
  { to: '/students', label: 'Students', icon: Icons.Users },
  { to: '/analytics', label: 'Analytics', icon: Icons.BarChart3 },
  { to: '/settings', label: 'Settings', icon: Icons.SettingsIcon },
]

export function Layout() {
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem('school-admin-store')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[var(--sidebar-width)] bg-white border-r border-gray-200">
        <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-200">
          <div className="w-9 h-9 rounded-xl bg-brand-600" />
          <div className="font-semibold">School Admin</div>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map(item => {
            const Icon = item.icon
            return (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) => clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                  isActive ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-auto p-3">
          <button className="btn-outline w-full justify-center" onClick={onLogout}>
            <Icons.LogOut size={16}/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-6">
          <Outlet /> {/* This is where page content appears */}
        </main>
      </div>
    </div>
  )
}

function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex md:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-600" />
        <div className="font-semibold">School Admin</div>
      </div>
      <div className="hidden md:flex items-center gap-2 max-w-md w-full">
        <Icons.Search size={16} className="text-gray-500"/>
        <input placeholder="Search students, classes..." className="input"/>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn-outline"><Icons.Bell size={16} /></button>
        <div className="w-9 h-9 rounded-full bg-brand-500 text-white grid place-items-center font-semibold">V</div>
      </div>
    </div>
  )
}
