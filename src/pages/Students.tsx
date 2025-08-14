import { useEffect, useState } from "react";
import studentsData from "../data/students.json";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  classId: string;
  attendanceRate: number;
  points: number;
  accuracy: number;
  lessons: number;
  streak: number;
  avatar: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Assuming your students.json already has points, accuracy, lessons, streak, avatar
    // If avatar is missing, generate it using student ID (so it stays the same every time)
    const transformed: Student[] = studentsData.map((s) => ({
      ...s,
      avatar: s.avatar || `https://i.pravatar.cc/80?u=${s.id}`,
    }));

    setStudents(transformed);
  }, []);

  const sortedStudents = [...students].sort((a, b) => b.points - a.points);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Complete Rankings</h2>
      <div className="space-y-2">
        {sortedStudents.map((s, index) => {
          let bgColor = "bg-white";
          if (index === 0) bgColor = "bg-yellow-50";
          if (index === 1) bgColor = "bg-gray-100";
          if (index === 2) bgColor = "bg-orange-100";

          return (
            <div
              key={s.id}
              className={`flex justify-between items-center p-4 rounded border ${bgColor}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  {index + 1}
                </div>
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-sm text-gray-500">
                    Grade {s.grade} ({s.classId})
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-orange-500">{s.points} pts</div>
                <div className="text-sm text-green-600">{s.accuracy}%</div>
                <div className="text-sm text-gray-500">{s.streak} days</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
