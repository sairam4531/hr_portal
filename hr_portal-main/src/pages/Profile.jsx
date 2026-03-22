import { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatCard } from "@/components/ui/stat-card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  CalendarCheck,
  CalendarOff,
  Star,
  DollarSign,
  Lock
} from "lucide-react";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      return toast({ title: 'Error', description: 'Passwords ignore match.', variant: 'destructive' });
    }
    if (passwordForm.new.length < 6) {
      return toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
    }
    try {
      const { default: userService } = await import('@/services/userService');
      await userService.updateUser(user.id, { password: passwordForm.new });
      toast({ title: 'Success', description: 'Your password has been changed securely.' });
      setPasswordForm({ current: '', new: '', confirm: '' });
    } catch {
      toast({ title: 'Error', description: 'Could not change password.', variant: 'destructive' });
    }
  };

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
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Update your account password.
          </p>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" required value={passwordForm.new} onChange={(e) => setPasswordForm(f => ({...f, new: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" required value={passwordForm.confirm} onChange={(e) => setPasswordForm(f => ({...f, confirm: e.target.value}))} />
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </div>
      </div>
    </AppLayout>);

}