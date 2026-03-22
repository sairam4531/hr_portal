import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/ui/stat-card';

import { Users, UserCheck, CalendarOff, Briefcase, DollarSign, Star, Shield, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Empty state placeholders — will be replaced by API data
const emptyChart = [];
const emptyDept = [];

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6 animate-reveal-up">
        {/* IT-Admin Dashboard */}
        {role === 'it-admin' &&
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total HR Users" value={0} icon={Shield} color="primary" />
              <StatCard title="Total Employees" value={0} icon={Users} color="success" />
              <StatCard title="Open Positions" value={0} icon={Briefcase} color="accent" />
              <StatCard title="Pending Leaves" value={0} icon={CalendarOff} color="warning" />
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-1">System Overview</h3>
              <p className="text-sm text-muted-foreground">
                Welcome, {user?.name}. As IT Admin, you can create HR accounts from the User Management page.
                HR managers can then onboard employees into the system.
              </p>
            </div>
          </>
        }

        {/* HR Dashboard */}
        {role === 'hr' &&
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Employees" value={0} icon={Users} color="primary" />
              <StatCard title="Present Today" value={0} subtitle="0% rate" icon={UserCheck} color="success" />
              <StatCard title="Pending Leaves" value={0} icon={CalendarOff} color="warning" />
              <StatCard title="Open Positions" value={0} icon={Briefcase} color="accent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Payroll Total" value="$0" subtitle="This month" icon={DollarSign} color="primary" />
              <StatCard title="Avg Performance" value="—" subtitle="No reviews yet" icon={Star} color="accent" />
              <StatCard title="On Leave" value={0} icon={Clock} color="warning" />
              <StatCard title="New Applicants" value={0} icon={Briefcase} color="success" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Attendance</h3>
                {emptyChart.length === 0 ?
              <div className="flex flex-col items-center justify-center h-[260px] text-muted-foreground">
                    <CalendarOff className="h-10 w-10 mb-2 opacity-30" />
                    <p className="text-sm">No attendance data yet</p>
                  </div> :

              <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={emptyChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(220,13%,91%)', fontSize: '13px' }} />
                      <Bar dataKey="present" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absent" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
              }
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Departments</h3>
                {emptyDept.length === 0 ?
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                    <Users className="h-10 w-10 mb-2 opacity-30" />
                    <p className="text-sm">No departments yet</p>
                  </div> :

              <>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={emptyDept} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                          {emptyDept.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '13px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {emptyDept.map((d) =>
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                          {d.name}
                        </div>
                  )}
                    </div>
                  </>
              }
              </div>
            </div>

            {/* Recent leave requests — empty */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Recent Leave Requests</h3>
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <CalendarOff className="h-10 w-10 mb-2 opacity-30" />
                <p className="text-sm">No leave requests yet</p>
              </div>
            </div>
          </>
        }

        {/* Employee Dashboard */}
        {role === 'employee' &&
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Attendance Rate" value="—" subtitle="This month" icon={UserCheck} color="success" />
              <StatCard title="Leave Balance" value="—" icon={CalendarOff} color="primary" />
              <StatCard title="Pending Leaves" value={0} icon={Clock} color="warning" />
              <StatCard title="Performance" value="—" subtitle="Last review" icon={Star} color="accent" />
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-1">Welcome, {user?.name}</h3>
              <p className="text-sm text-muted-foreground">
                Use the sidebar to view your attendance, apply for leave, check payslips, and see performance feedback.
              </p>
            </div>
          </>
        }
      </div>
    </AppLayout>);

}