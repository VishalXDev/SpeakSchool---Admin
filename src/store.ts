
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Student, Class, AttendanceRecord } from './types'
import * as api from './lib/fakeApi'

type State = {
  students: Student[]
  classes: Class[]
  attendance: AttendanceRecord[]
  loaded: boolean
  load: () => Promise<void>

  addStudent: (s: Omit<Student, 'id'>) => void
  updateStudent: (id: string, patch: Partial<Student>) => void
  deleteStudent: (id: string) => void

  toggleAttendance: (id: string) => void
}

export const useStore = create<State>()(persist((set, get) => ({
  students: [],
  classes: [],
  attendance: [],
  loaded: false,
  async load() {
    if (get().loaded) return
    const [students, classes, attendance] = await Promise.all([api.getStudents(), api.getClasses(), api.getAttendance()])
    set({ students, classes, attendance, loaded: true })
  },
  addStudent(s) {
    const id = 'S' + Math.floor(Math.random() * 9000 + 1000)
    set({ students: [...get().students, { ...s, id }] })
  },
  updateStudent(id, patch) {
    set({ students: get().students.map(st => st.id === id ? { ...st, ...patch } : st) })
  },
  deleteStudent(id) {
    set({ students: get().students.filter(st => st.id !== id) })
  },
  toggleAttendance(id) {
    set({ attendance: get().attendance.map(a => a.id === id ? { ...a, present: !a.present } : a) })
  }
}), { name: 'school-admin-store' }))
