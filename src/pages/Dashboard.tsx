import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Users, GraduationCap, BarChart3, Trophy, Search, Filter } from "lucide-react";
import studentsData from "../data/students.json";

interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  phone: string;
  attendanceRate: number;
  status: string;
  classId: string;
  points: number;
  accuracy: number;
  lessons?: number;
  streak?: number;
  avatar?: string;
}

interface ClassInfo {
  id: string;
  name: string;
  grade: string;
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setStudents(studentsData);
    const uniqueClasses = Array.from(new Set(studentsData.map(s => s.classId)))
      .map(classId => {
        const studentInClass = studentsData.find(s => s.classId === classId);
        return {
          id: classId,
          name: `Class ${classId.slice(1)}`,
          grade: studentInClass?.grade || "0"
        };
      });
    setClasses(uniqueClasses);
  }, []);

  const topStudents = useMemo(() => {
    return [...students].sort((a, b) => b.points - a.points).slice(0, 10);
  }, [students]);

  const totals = useMemo(() => {
    const totalStudents = students.length || 0;
    const totalClasses = classes.length || 0;
    const avgPerformance = students.length
      ? (
        (students.reduce((a, s) => a + s.attendanceRate, 0) / students.length) *
        100
      ).toFixed(1)
      : 0;

    const perClass = classes.map((c) => ({
      name: `Grade ${c.grade}`,
      value: students.filter((s) => s.classId === c.id).length,
    }));

    const excellentCount = students.filter(s => s.attendanceRate >= 0.9).length;
    const goodCount = students.filter(s => s.attendanceRate >= 0.8 && s.attendanceRate < 0.9).length;
    const averageCount = students.filter(s => s.attendanceRate >= 0.7 && s.attendanceRate < 0.8).length;
    const needsImprovementCount = students.filter(s => s.attendanceRate < 0.7).length;

    const total = students.length || 1;
    const gradeDistribution = [
      { name: "Excellent", value: Math.round((excellentCount / total) * 100), color: "#10b981" },
      { name: "Good", value: Math.round((goodCount / total) * 100), color: "#3b82f6" },
      { name: "Average", value: Math.round((averageCount / total) * 100), color: "#f59e0b" },
      { name: "Needs Improvement", value: Math.round((needsImprovementCount / total) * 100), color: "#ef4444" },
    ];

    return {
      totalStudents,
      totalClasses,
      avgPerformance,
      perClass,
      gradeDistribution,
    };
  }, [students, classes]);

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
      .filter((s) => (classFilter ? s.classId === classFilter : true));
  }, [students, search, classFilter]);

  const visibleStudents = useMemo(() => {
    return filteredStudents.slice(0, visibleCount);
  }, [filteredStudents, visibleCount]);

  const pieColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Greenwood Elementary School
            </h1>
            <p className="text-sm text-gray-600">
              Welcome back, School Admin! Here's your school's overview.
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            CBSE Board • Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Users className="w-5 h-5" />} label="TOTAL STUDENTS" value={totals.totalStudents} change="+12% from last month" color="blue" />
          <StatCard icon={<GraduationCap className="w-5 h-5" />} label="TOTAL CLASSES" value={totals.totalClasses} change="+8% from last month" color="green" />
          <StatCard icon={<BarChart3 className="w-5 h-5" />} label="AVG. PERFORMANCE" value={`${totals.avgPerformance}%`} change="+5% from last month" color="purple" />
          <StatCard icon={<Trophy className="w-5 h-5" />} label="TOP PERFORMER" value={`${topStudents[0]?.points || 0} pts`} change={`${topStudents[0]?.name || 'N/A'} - Grade ${topStudents[0]?.grade || 'N/A'}`} color="orange" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Class-wise Student Enrollment</h3>
              <p className="text-xs text-gray-500">Student distribution across different grades</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totals.perClass}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance Distribution</h3>
              <p className="text-xs text-gray-500">Overall student performance breakdown</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totals.gradeDistribution}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {totals.gradeDistribution.map((entry, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              School Leaderboard - Top 10 Champions
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {topStudents.map((student, index) => (
              <div key={student.id} className="text-center bg-gray-50 rounded-lg p-3">
                <div className="relative mb-2">
                  <img src={student.avatar || `https://i.pravatar.cc/100?u=${student.id}`} alt={student.name} className="w-14 h-14 rounded-full mx-auto border-2 border-white shadow" />
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-xs text-gray-900">{student.name}</div>
                <div className="text-xs text-gray-500">Grade {student.grade}</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold my-1">
                  {student.points} pts
                </div>
                <div className="text-xs text-green-600">{student.accuracy}% Accuracy</div>
                <div className="text-xs text-gray-500">{Math.round(student.attendanceRate * 100)}% Attendance</div>
              </div>
            ))}
          </div>
        </div>

        {/* All Students */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">All Students</h3>
              <p className="text-xs text-gray-500">Complete student directory with performance details</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="relative">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm"
                >
                  <option value="">All Classes</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {visibleStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-2">
                  <img src={student.avatar || `https://i.pravatar.cc/100?u=${student.id}`} alt={student.name} className="w-10 h-10 rounded-full border shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-gray-900 truncate">{student.name}</h4>
                    <p className="text-xs text-gray-500">Grade {student.grade}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">{Math.round(student.attendanceRate * 100)}%</span>
                      {student.points && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">{student.points} pts</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredStudents.length && (
            <div className="text-center mt-4">
              <button onClick={() => setVisibleCount((prev) => prev + 20)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                Load More ({filteredStudents.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: string;
  color: "blue" | "green" | "purple" | "orange";
};

function StatCard({ icon, label, value, change, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className={`inline-flex p-2 rounded-lg border ${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xs text-green-600">{change}</div>
    </div>
  );
}
