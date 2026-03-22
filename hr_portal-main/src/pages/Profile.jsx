import { AppLayout } from "@/components/layout/AppLayout";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatCard } from "@/components/ui/stat-card";
import {

  CalendarCheck,
  CalendarOff,
  Star,
  DollarSign } from
"lucide-react";

export default function Profile() {
  const user = useSelector(selectCurrentUser);

  return (
    <AppLayout title="My Profile">
      <div className="space-y-6 animate-reveal-up">
        {/* Profile card */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {user?.name.
              split(" ").
              map((n) => n[0]).
              join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {user?.name}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attendance Rate"
            value="—"
            subtitle="This month"
            icon={CalendarCheck}
            color="success" />
          
          <StatCard
            title="Leave Balance"
            value="—"
            subtitle="Days remaining"
            icon={CalendarOff}
            color="primary" />
          
          <StatCard
            title="Last Rating"
            value="—"
            subtitle="Performance"
            icon={Star}
            color="accent" />
          
          <StatCard
            title="Last Payslip"
            value="—"
            subtitle="Net salary"
            icon={DollarSign}
            color="warning" />
          
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-2">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">
            Use the sidebar to apply for leave, view your attendance history,
            check payslips, and read performance feedback. Data will appear once
            your HR manager adds records to the system.
          </p>
        </div>
      </div>
    </AppLayout>);

}