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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-sm">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
          {/* Replace emoji placeholder with image */}
          <img
            src="/school.jpg" // <-- path to your image
            alt="SpeakGenie Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">SpeakGenie</div>
            <div className="text-xs text-gray-500 font-medium">Admin Panel</div>
          </div>
        </div>


        {/* Nav links */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {nav.map(item => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Bottom Profile Card */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-semibold">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">School Admin</div>
              <div className="text-xs text-gray-500 truncate">admin@school.edu</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function Topbar({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex md:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        <div className="font-semibold text-gray-900">SpeakGenie</div>
      </div>
      <div className="hidden md:flex items-center gap-3 max-w-md w-full">
        <div className="relative flex-1">
          <Icons.Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search students, classes..."
            className="input pl-9 bg-gray-50 border-0 focus:bg-white focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Icons.Bell size={18} className="text-gray-600" />
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icons.LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-semibold">
          V
        </div>
      </div>
    </div>
  )
}