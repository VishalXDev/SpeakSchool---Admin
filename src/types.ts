
export type Student = {
  id: string
  name: string
  grade: string
  email: string
  phone?: string
  attendanceRate: number // 0..1
  status: 'active' | 'inactive'
  classId?: string
}

export type Class = {
  id: string
  name: string
  grade: string
  teacher: string
  schedule: string
}

export type AttendanceRecord = {
  id: string
  date: string // ISO date
  classId: string
  studentId: string
  present: boolean
}
