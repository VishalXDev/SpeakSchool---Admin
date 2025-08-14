import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';
import Card from '@/components/Card';
import studentsData from '@/data/students.json'; // ✅ import actual students data

// Attendance mock data (replace with actual JSON if needed)
const mockAttendance = [
  { studentId: '1', present: true },
  { studentId: '1', present: true },
  { studentId: '1', present: false },
  { studentId: '2', present: true },
  { studentId: '2', present: true },
  { studentId: '3', present: false }
];

// Define student type
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
  lessons: number;
  streak: number;
  avatar: string;
}

export default function Reports() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents(studentsData);
  }, []);

  const byStudent = useMemo(() => {
    return students.map(s => {
      const recs = mockAttendance.filter(a => a.studentId === s.id);
      const present = recs.filter(r => r.present).length;
      const total = recs.length || 1;
      return { id: s.id, name: s.name, rate: Math.round(100 * present / total) };
    });
  }, [students]);

  const handleExport = () => {
    const csv = byStudent.map(row => `${row.name},${row.rate}%`).join('\n');
    const blob = new Blob([`Name,Rate\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'performance-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const performanceData = [
    { name: 'Excellent (85-100%)', value: 35 },
    { name: 'Good (70-84%)', value: 45 },
    { name: 'Needs Improvement (<70%)', value: 20 }
  ];

  const skillData = [
    { name: 'Vocabulary', value: 82, change: 5 },
    { name: 'Grammar', value: 78, change: 8 },
    { name: 'Pronunciation', value: 76, change: 12 },
    { name: 'Listening', value: 85, change: 3 },
    { name: 'Speaking', value: 74, change: 15 }
  ];

  const engagementData = [
    { name: 'Jan', value: 7.4 },
    { name: 'Feb', value: 10 },
    { name: 'Mar', value: 10 },
    { name: 'Apr', value: 6 },
    { name: 'May', value: 5 }
  ];

  const performanceColors = ['#4CAF50', '#FFC107', '#F44336'];
  const skillColors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
            onClick={handleExport}
          >
            <Download size={14} />
            Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Learning Hours', value: '2,847', change: '+12% from last month' },
            { title: 'Lessons Completed', value: '1,892', change: '+18% from last month' },
            { title: 'Average Session Time', value: '24 min', change: '+8% from last month' },
            { title: 'Active Students', value: '1,156', change: '+5% from last month' }
          ].map((stat, index) => (
            <Card key={index} className="p-4">
              <h3 className="text-xs font-medium text-gray-600 mb-1">{stat.title}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Month-over-Month Improvement */}
            <Card className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Month-over-Month Improvement</h2>
              </div>

              <div className="space-y-2 mb-4">
                {skillData.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 w-24">{skill.name}</span>
                    <div className="flex items-center">
                      <span className="font-bold text-green-600">+{skill.change}% ▲</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillData} margin={{ top: 16, right: 20, left: 12, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                    <Tooltip
                      formatter={(value) => [`+${value}%`, 'Improvement']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="change" radius={[3, 3, 0, 0]}>
                      {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={skillColors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Average Performance by Skill Area */}
            <Card className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Average Performance by Skill Area</h2>
                <p className="text-xs text-gray-600">Individual skill performance metrics and achievements</p>
              </div>

              <div className="space-y-4">
                {skillData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="font-bold text-gray-900">{skill.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.value}%`, backgroundColor: skillColors[index] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Student Performance Distribution */}
            <Card className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Student Performance Distribution</h2>
                <p className="text-xs text-gray-600">Overall accuracy breakdown across all students</p>
              </div>

              <div className="flex flex-col lg:flex-row items-start">
                <div className="w-full lg:w-1/2 h-64 mb-2 lg:mb-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={performanceColors[index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Students']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full lg:w-1/2 lg:pl-4 space-y-2">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: performanceColors[index] }} />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="font-bold text-gray-900">{item.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Student Engagement Trends */}
            <Card className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Student Engagement Trends</h2>
                  <p className="text-xs text-gray-600">Monthly engagement patterns and learning units</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 text-xs text-gray-600">School:</span>
                  <select className="border border-gray-300 rounded-md px-2 py-0.5 text-xs bg-white">
                    <option>Action Admin</option>
                    <option>Greenwood Elementary</option>
                  </select>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData} margin={{ top: 16, right: 20, left: 12, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} domain={[0, 12]} />
                    <Tooltip
                      formatter={(value) => [`${value} hours`, 'Engagement']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {engagementData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index % 2 === 0 ? "#2196F3" : "#4CAF50"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
