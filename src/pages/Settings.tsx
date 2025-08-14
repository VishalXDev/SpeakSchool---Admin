
import { useState } from 'react'

export default function Settings() {
  const [schoolName, setSchoolName] = useState('Greenfield High')
  const [theme, setTheme] = useState('default')

  return (
    <div className="space-y-4 max-w-xl">
      <div className="text-xl font-semibold">Settings</div>
      <div className="card space-y-3">
        <div>
          <div className="text-sm mb-1">School Name</div>
          <input className="input" value={schoolName} onChange={e=>setSchoolName(e.target.value)} />
        </div>
        <div>
          <div className="text-sm mb-1">Theme</div>
          <select className="select" value={theme} onChange={e=>setTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="cool">Cool Blue</option>
            <option value="warm">Warm</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Settings are local-only for the assignment demo.</div>
      </div>
    </div>
  )
}
