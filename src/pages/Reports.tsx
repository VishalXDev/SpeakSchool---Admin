
import { useEffect, useMemo } from 'react'
import { useStore } from '@/store'
import Card from '@/components/Card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'
import { toCSV } from '@/utils/csv'
import { Icons } from '@/components/Icons'

export default function Reports() {
  const { load, students, attendance } = useStore()
  useEffect(() => { load() }, [load])

  const byStudent = useMemo(() => {
    return students.map(s => {
      const recs = attendance.filter(a => a.studentId === s.id)
      const present = recs.filter(r => r.present).length
      const total = recs.length || 1
      return { id: s.id, name: s.name, rate: Math.round(100 * present / total) }
    })
  }, [students, attendance])

  const csv = toCSV(byStudent)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const byDay = useMemo(() => {
    const map: Record<string, { date: string, present: number, total: number }> = {}
    attendance.forEach(a => {
      const key = a.date
      map[key] = map[key] || { date: key, present: 0, total: 0 }
      map[key].total++
      if (a.present) map[key].present++
    })
    return Object.values(map).sort((a,b)=>a.date.localeCompare(b.date)).map(d => ({ date: d.date.slice(5), rate: Math.round(100 * d.present / d.total) }))
  }, [attendance])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Reports</div>
        <a className="btn" href={url} download="attendance-by-student.csv"><Icons.Download size={16}/> Export CSV</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="font-medium mb-2">Attendance Rate by Student</div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={byStudent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="font-medium mb-2">Attendance Rate Over Time</div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={byDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="rate" stroke="#2b90ff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
