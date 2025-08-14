
import { useEffect, useMemo, useState } from 'react'
import { useStore } from '@/store'
import Table from '@/components/Table'

export default function Attendance() {
  const { load, attendance, classes, students, toggleAttendance } = useStore()
  const [selectedClass, setSelectedClass] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => { load() }, [load])

  const list = useMemo(() => {
    return attendance.filter(a => (!selectedClass || a.classId === selectedClass) && (!date || a.date === date))
  }, [attendance, selectedClass, date])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <div className="text-sm mb-1">Class</div>
          <select className="select" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
            <option value="">All</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <div className="text-sm mb-1">Date</div>
          <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
      </div>

      <Table columns={['Date','Class','Student','Present','Toggle']}>
        {list.map(a => {
          const s = students.find(s => s.id === a.studentId)
          const c = classes.find(c => c.id === a.classId)
          return (
            <tr key={a.id} className="border-t">
              <td className="px-3 py-2">{a.date}</td>
              <td className="px-3 py-2">{c?.name}</td>
              <td className="px-3 py-2">{s?.name}</td>
              <td className="px-3 py-2">
                <span className={"badge " + (a.present ? 'green' : 'red')}>{a.present ? 'Present' : 'Absent'}</span>
              </td>
              <td className="px-3 py-2">
                <button className="btn-outline" onClick={()=>toggleAttendance(a.id)}>Toggle</button>
              </td>
            </tr>
          )
        })}
      </Table>
    </div>
  )
}
