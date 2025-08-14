import { useState } from 'react'

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Admin User')
  const [email, setEmail] = useState('admin@example.com')
  const [phone, setPhone] = useState('+91-')
  const [defaultLanguage, setDefaultLanguage] = useState('English')
  const [timeZone, setTimeZone] = useState('UTC-5 (Eastern Time)')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [performanceReports, setPerformanceReports] = useState(true)
  const [newSchoolAlerts, setNewSchoolAlerts] = useState(false)

  const handleUpdateProfile = () => {
    alert('Profile updated successfully!')
  }

  const handleSaveSettings = () => {
    alert('System settings saved successfully!')
  }

  const handleExportData = (type: string) => {
    alert(`Exporting ${type}...`)
  }

  const handleCreateBackup = () => {
    alert('Creating backup...')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Settings</h2>
            <p className="text-gray-600 mb-6">Update your personal information and contact details</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Admin User"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1-555-0123"
                />
              </div>
            </div>

            <button
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h2>
            <p className="text-gray-600 mb-6">Configure system preferences and default options</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC+1 (Central European Time)</option>
                  <option>UTC+5:30 (Indian Standard Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>

            <button
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h2>
            <p className="text-gray-600 mb-6">Manage how and when you receive notifications</p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={performanceReports}
                    onChange={(e) => setPerformanceReports(e.target.checked)}
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">Performance Reports</label>
                  <p className="text-sm text-gray-500">Weekly performance summaries</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={newSchoolAlerts}
                    onChange={(e) => setNewSchoolAlerts(e.target.checked)}
                  />
                </div>
                <div className="ml-3">
                  <label className="text-sm font-medium text-gray-900">New School Alerts</label>
                  <p className="text-sm text-gray-500">Notifications for new school registrations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Management</h2>
            <p className="text-gray-600 mb-6">Export data and manage system backups</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Export Data</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    onClick={() => handleExportData('Student Data')}
                  >
                    Export Student Data
                  </button>
                  <button
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    onClick={() => handleExportData('School Reports')}
                  >
                    Export School Reports
                  </button>
                  <button
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    onClick={() => handleExportData('Analytics')}
                  >
                    Export Analytics
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Backup</h3>
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium mb-3"
                  onClick={handleCreateBackup}
                >
                  Create Backup
                </button>
                <p className="text-sm text-gray-500">Last backup: March 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}