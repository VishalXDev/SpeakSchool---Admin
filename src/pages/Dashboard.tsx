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
import { Users, GraduationCap, BarChart3, Trophy, Eye } from "lucide-react";
import { getStudents, getClasses } from "@/lib/fakeApi";
import leaderboardData from "@/data/leaderboard.json";
import type { Student, Class } from "@/types";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    getStudents().then(setStudents);
    getClasses().then(setClasses);
  }, []);

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
      name: c.name,
      value: students.filter((s) => s.classId === c.id).length,
    }));

    const gradeDistribution = [
      { name: "Excellent", value: 35 },
      { name: "Good", value: 40 },
      { name: "Average", value: 15 },
      { name: "Needs Improvement", value: 10 },
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

  const pieColors = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Greenwood Elementary School
          </h1>
          <p className="text-gray-600">
            Welcome back, School Admin! Here's your school's overview.
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div>CBSE Board • Last updated: {new Date().toLocaleString()}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="TOTAL STUDENTS"
          value={totals.totalStudents}
          change="+12% from last month"
          color="blue"
        />
        <StatCard
          icon={<GraduationCap className="w-5 h-5" />}
          label="TOTAL CLASSES"
          value={totals.totalClasses}
          change="+8% from last month"
          color="green"
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="AVG. PERFORMANCE"
          value={`${totals.avgPerformance}%`}
          change="+5% from last month"
          color="purple"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="TOP PERFORMER"
          value={`${leaderboardData[0].points} pts`}
          change={`${leaderboardData[0].name} - ${leaderboardData[0].class}`}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Class-wise Student Enrollment</h3>
          <p className="text-gray-500 text-sm mb-6">
            Student distribution across different grades
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totals.perClass}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Performance Distribution</h3>
          <p className="text-gray-500 text-sm mb-6">
            Overall accuracy breakdown
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={totals.gradeDistribution}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {totals.gradeDistribution.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">🏆 School Leaderboard - Top 10 Champions</h3>
        <div className="grid grid-cols-5 gap-4">
          {leaderboardData.slice(0, 10).map((p, i) => (
            <div key={i} className="text-center">
              <img
                src={p.avatar}
                alt={p.name}
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-gray-500">{p.class}</div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mb-1">
                {p.points} pts
              </div>
              <p className="text-xs text-green-600">{p.accuracy}% Accuracy</p>
              <p className="text-xs text-gray-500">{p.streak}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Students */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">All Students</h3>
            <p className="text-gray-500 text-sm">
              Complete student directory with performance details
            </p>
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {visibleStudents.map((s) => (
            <div key={s.id} className="border p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://i.pravatar.cc/100?u=${s.id}`}
                  alt={s.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm">{s.name}</h4>
                  <p className="text-xs text-gray-500">Class {s.grade}</p>
                  <p className="text-xs text-green-600 font-semibold">
                    {Math.round(s.attendanceRate * 100)}%
                  </p>
                </div>
                <Eye className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredStudents.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 20)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Load More Students ({filteredStudents.length - visibleCount} remaining)
            </button>
          </div>
        )}
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
  const colorClasses: Record<StatCardProps["color"], string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      <div className="text-2xl font-bold text-gray-900 mt-3">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
      <div className="text-xs text-green-600 mt-1">{change}</div>
    </div>
  );
}