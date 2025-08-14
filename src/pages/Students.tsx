
import { useEffect, useMemo, useState } from 'react'
import { useStore } from '@/store'
import Table from '@/components/Table'
import Modal from '@/components/Modal'
import type { Student } from '@/types'

export default function Students() {
  const { load, students, classes, addStudent, updateStudent, deleteStudent } = useStore()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<Student | null>(null)

  useEffect(() => { load() }, [load])


// Bridge: handle modal submit via window event to keep example simple
useEffect(() => {
  const handler = (e: any) => {
    if (edit) {
      updateStudent(edit.id, e.detail)
    } else {
      addStudent(e.detail)
    }
    setOpen(false); setEdit(null)
  }
  window.addEventListener('student-form-submit', handler as any)
  return () => window.removeEventListener('student-form-submit', handler as any)
}, [edit, addStudent, updateStudent])

const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return students
    return students.filter(s => [s.name, s.email, s.grade, s.id].some(f => f?.toLowerCase().includes(q)))
  }, [students, query])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries()) as any
    const payload = {
      name: String(data.name),
      email: String(data.email),
      phone: String(data.phone || ''),
      grade: String(data.grade),
      attendanceRate: Number(data.attendanceRate ?? 0.9),
      status: (data.status as any) ?? 'active',
      classId: String(data.classId || '')
    }
    if (edit) {
      updateStudent(edit.id, payload as Partial<Student>)
    } else {
      addStudent(payload as Omit<Student, 'id'>)
    }
    setOpen(false); setEdit(null); e.currentTarget.reset()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <input className="input md:max-w-xs" placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} />
        <div className="flex-1" />
        <button className="btn" onClick={()=>{ setOpen(true); setEdit(null) }}>Add Student</button>
      </div>

      <Table columns={['ID','Name','Grade','Email','Attendance','Status','Actions']}>
        {filtered.map(s => (
          <tr key={s.id} className="border-t">
            <td className="px-3 py-2">{s.id}</td>
            <td className="px-3 py-2">{s.name}</td>
            <td className="px-3 py-2">Grade {s.grade}</td>
            <td className="px-3 py-2">{s.email}</td>
            <td className="px-3 py-2">{Math.round(s.attendanceRate*100)}%</td>
            <td className="px-3 py-2">
              <span className={"badge " + (s.status === 'active' ? 'green' : 'red')}>{s.status}</span>
            </td>
            <td className="px-3 py-2">
              <div className="flex gap-2">
                <button className="btn-outline" onClick={()=>{ setEdit(s); setOpen(true) }}>Edit</button>
                <button className="btn-outline" onClick={()=>deleteStudent(s.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <StudentModal open={open} onClose={()=>{ setOpen(false); setEdit(null) }} edit={edit} />
    </div>
  )
}

function StudentModal({ open, onClose, edit }: { open: boolean, onClose: () => void, edit: Student | null }) {
  const { classes } = useStore()
  return (
    <Modal open={open} onClose={onClose} title={edit ? 'Edit Student' : 'Add Student'}>
      <form className="space-y-3" onSubmit={handleSubmit as any}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">Name</div>
            <input name="name" required defaultValue={edit?.name} className="input" />
          </div>
          <div>
            <div className="text-sm mb-1">Email</div>
            <input name="email" type="email" required defaultValue={edit?.email} className="input" />
          </div>
          <div>
            <div className="text-sm mb-1">Phone</div>
            <input name="phone" defaultValue={edit?.phone} className="input" />
          </div>
          <div>
            <div className="text-sm mb-1">Grade</div>
            <select name="grade" defaultValue={edit?.grade} className="select">
              {['6','7','8','9','10','11','12'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">Status</div>
            <select name="status" defaultValue={edit?.status} className="select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <div className="text-sm mb-1">Class</div>
            <select name="classId" defaultValue={edit?.classId} className="select">
              <option value="">—</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn" type="submit">{edit ? 'Save Changes' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: any = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      grade: data.get('grade'),
      status: data.get('status'),
      classId: data.get('classId'),
      attendanceRate: 0.9
    }
    // delegate saving to parent Students component via onSubmit prop? Simplicity: dispatch a CustomEvent
    const event = new CustomEvent('student-form-submit', { detail: payload })
    window.dispatchEvent(event)
  }
}
