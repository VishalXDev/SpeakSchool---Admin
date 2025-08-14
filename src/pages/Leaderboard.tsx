import { useState } from 'react'
import { Trophy, Flame, Search, Eye, Crown, Zap, Target } from 'lucide-react'
import studentsDataFile from '@/data/students.json'

// Types
interface Student {
  id: string
  name: string
  grade: string
  email: string
  phone: string
  attendanceRate: number
  status: string
  classId: string
  points: number
  accuracy: number
  streak: number
  lessons: number
  avatar: string
}

interface LeaderboardEntry {
  name: string
  class: string
  points: number
  accuracy: number
  streak: number
  lessons: number
  avatar: string
}

interface StatBoxProps {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}

interface CardProps {
  children: React.ReactNode
  className?: string
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  )
}

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')

  // Transform students.json → leaderboard data
  const leaderboardData: LeaderboardEntry[] = [...studentsDataFile]
    .sort((a: Student, b: Student) => {
      if (b.points !== a.points) return b.points - a.points
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10)
    .map((student: Student) => ({
      name: student.name,
      class: student.grade,
      points: student.points,
      accuracy: student.accuracy,
      streak: student.streak,
      lessons: student.lessons,
      avatar: student.avatar
    }))

  // Filter
  const filteredData = leaderboardData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  // Classes
  const classes = ['All Classes', ...new Set(leaderboardData.map((s) => s.class))]

  // Top stats
  const topPerformer = leaderboardData[0]
  const longestStreak = leaderboardData.reduce((max, s) => s.streak > max.streak ? s : max, leaderboardData[0])
  const highestAccuracy = leaderboardData.reduce((max, s) => s.accuracy > max.accuracy ? s : max, leaderboardData[0])
  const mostActive = leaderboardData.reduce((max, s) => s.lessons > max.lessons ? s : max, leaderboardData[0])

  // Podium
  const podium = leaderboardData.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="text-yellow-500 w-7 h-7" />
              School Leaderboard
            </h1>
            <span className="text-sm text-gray-500">
              Updated: {new Date().toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Celebrating our top performers and encouraging healthy competition
          </p>
        </div>

        {/* Champions Podium */}
        <Card>
          <h2 className="font-semibold mb-6 text-center relative z-10">🏅 Champions Podium</h2>
          <div className="flex items-end justify-center gap-8 podium-wrapper">
            {/* Second Place */}
            {podium[1] && (
              <div className="flex flex-col items-center animate-rise delay-100">
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-white font-bold text-xl shadow-lg bg-gray-400 border-gray-300">
                  #2
                </div>
                <div className="bg-gray-200 w-16 h-12 flex items-center justify-center font-bold text-gray-700 shadow-md">
                  2
                </div>
                <div className="mt-2 font-medium">{podium[1].name}</div>
                <div className="text-sm text-gray-500">{podium[1].class}</div>
                <div className="mt-1 font-bold text-blue-600">{podium[1].points} pts</div>
              </div>
            )}

            {/* First Place (center) */}
            {podium[0] && (
              <div className="flex flex-col items-center champion-box animate-rise delay-0 -mt-3">
                <Crown className="w-10 h-10 gold-crown mb-1" />
                <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg bg-yellow-500 border-yellow-300">
                  #1
                </div>
                <div className="bg-yellow-300 w-20 h-16 flex items-center justify-center font-bold text-gray-700 shadow-md">
                  1
                </div>
                <div className="mt-2 font-medium">{podium[0].name}</div>
                <div className="text-sm text-gray-500">{podium[0].class}</div>
                <div className="mt-1 font-bold text-blue-600">{podium[0].points} pts</div>
              </div>
            )}

            {/* Third Place */}
            {podium[2] && (
              <div className="flex flex-col items-center animate-rise delay-200">
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-white font-bold text-xl shadow-lg bg-orange-400 border-orange-300">
                  #3
                </div>
                <div className="bg-orange-200 w-16 h-10 flex items-center justify-center font-bold text-gray-700 shadow-md">
                  3
                </div>
                <div className="mt-2 font-medium">{podium[2].name}</div>
                <div className="text-sm text-gray-500">{podium[2].class}</div>
                <div className="mt-1 font-bold text-blue-600">{podium[2].points} pts</div>
              </div>
            )}
          </div>
        </Card>



        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => <option key={cls}>{cls}</option>)}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Rankings List */}
        <Card className="p-0 overflow-hidden">
          <h2 className="font-semibold p-4 border-b">Complete Rankings</h2>
          <div className="divide-y divide-gray-100">
            {filteredData.map((student, index) => (
              <div key={student.name} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-500'}`}>
                    {index + 1}
                  </div>
                  <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full border-2 border-gray-200" />
                  <div>
                    <div className="font-semibold text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.class}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-lg text-orange-600">{student.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{student.accuracy}%</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{student.streak}</span>
                  </div>
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox icon={<Crown className="w-5 h-5 text-yellow-500" />} label="Current Champion" value={topPerformer.name} sub={`${topPerformer.points} points`} />
          <StatBox icon={<Flame className="w-5 h-5 text-red-500" />} label="Longest Streak" value={`${longestStreak.streak} days`} sub={longestStreak.name} />
          <StatBox icon={<Zap className="w-5 h-5 text-purple-500" />} label="Most Active" value={`${mostActive.lessons} lessons`} sub={mostActive.name} />
          <StatBox icon={<Target className="w-5 h-5 text-green-500" />} label="Highest Accuracy" value={`${highestAccuracy.accuracy}%`} sub={highestAccuracy.name} />
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon, label, value, sub }: StatBoxProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
        <div className="min-w-0">
          <div className="text-xs text-gray-500 mb-1">{label}</div>
          <div className="font-bold text-gray-900 truncate">{value}</div>
          <div className="text-xs text-gray-400 truncate">{sub}</div>
        </div>
      </div>
    </Card>
  )
}
