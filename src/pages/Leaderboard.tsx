import { useEffect } from 'react'
import { useStore } from '@/store'
import Card from '@/components/Card'
import { Icons } from '@/components/Icons'
import leaderboardData from '@/data/leaderboard.json'

export default function Leaderboard() {
  const { load } = useStore()
  useEffect(() => { load() }, [load])

  // Top 3 for podium
  const podium = leaderboardData.slice(0, 3).map(p => ({
    initials: p.name.split(' ').map(n => n[0]).join(''),
    ...p
  }))

  // Full rankings
  const rankings = leaderboardData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icons.Trophy className="text-yellow-500" /> School Leaderboard
        </h1>
        <span className="text-sm text-gray-500">Updated: {new Date().toLocaleDateString()}</span>
      </div>
      <p className="text-gray-500">
        Celebrating our top performers and encouraging healthy competition
      </p>

      {/* Champions Podium */}
      <Card>
        <h2 className="font-semibold mb-4 text-center">🏅 Champions Podium</h2>
        <div className="flex justify-center gap-6">
          {podium.map((p, i) => (
            <div key={i} className={`flex flex-col items-center ${i === 0 ? 'order-2' : ''}`}>
              <div
                className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-white font-bold text-xl
                ${i === 0 ? 'bg-yellow-500 border-yellow-300' : i === 1 ? 'bg-gray-400 border-gray-300' : 'bg-orange-400 border-orange-300'}`}
              >
                {p.initials}
              </div>
              <div className="mt-2 font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.class}</div>
              <div className="mt-1 font-bold text-blue-600">{p.points} pts</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input placeholder="Search students..." className="input flex-1" />
        <select className="select">
          <option>All Classes</option>
        </select>
        <select className="select">
          <option>This Month</option>
        </select>
        <button className="btn-outline">More Filters</button>
      </div>

      {/* Complete Rankings */}
      <Card>
        <h2 className="font-semibold mb-4">Complete Rankings</h2>
        <div className="divide-y">
          {rankings.map((r, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-bold text-gray-500">#{i + 1}</span>
                <img src={r.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.class}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-blue-600">{r.points} pts</span>
                <span className="text-green-600 text-sm">{r.accuracy}%</span>
                <span className="text-gray-500 text-sm">{r.streak} 🔥</span>
                <button className="btn-outline text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatBox
          icon={<Icons.Award />}
          label="Current Champion"
          value={leaderboardData[0].name}
          sub={`${leaderboardData[0].points} points`}
        />
        <StatBox
          icon={<Icons.Flame />}
          label="Longest Streak"
          value={`${leaderboardData[0].streak} days`}
          sub={leaderboardData[0].name}
        />
        <StatBox
          icon={<Icons.BookOpen />}
          label="Most Active"
          value="68 lessons"
          sub={leaderboardData[0].name}
        />
        <StatBox
          icon={<Icons.Star />}
          label="Highest Accuracy"
          value={`${leaderboardData[0].accuracy}%`}
          sub={leaderboardData[0].name}
        />
      </div>
    </div>
  )
}

function StatBox({ icon, label, value, sub }: { icon: JSX.Element, label: string, value: string, sub: string }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="text-blue-600 bg-blue-50 p-2 rounded-xl">{icon}</div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="font-bold">{value}</div>
          <div className="text-xs text-gray-400">{sub}</div>
        </div>
      </div>
    </Card>
  )
}
