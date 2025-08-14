import students from '@/data/students.json';
import classes from '@/data/classes.json';
import attendance from '@/data/attendance.json';
import type { Student, Class, AttendanceRecord } from '@/types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getStudents(): Promise<Student[]> {
  await sleep(250);
  // Ensure "status" matches the literal type "active" | "inactive"
  return (students as any[]).map((s) => ({
    ...s,
    status: s.status === "active" ? "active" : "inactive"
  })) as Student[];
}

export async function getClasses(): Promise<Class[]> {
  await sleep(250);
  return structuredClone(classes);
}

export async function getAttendance(): Promise<AttendanceRecord[]> {
  await sleep(250);
  return structuredClone(attendance);
}
