import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCheck, UserX, Clock, AlertTriangle, CalendarCheck, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


export default function Attendance() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [records, setRecords] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ employeeId: '', date: '', status: 'present', checkIn: '', checkOut: '' });

  const canManage = user?.role === 'it-admin' || user?.role === 'hr';
  const present = records.filter((a) => a.status === 'present').length;
  const absent = records.filter((a) => a.status === 'absent').length;
  const late = records.filter((a) => a.status === 'late').length;

  const handleMark = async (e) => {
    e.preventDefault();
    try {
      const { default: attendanceService } = await import('@/services/attendanceService');
      const res = await attendanceService.mark({
        employeeId: form.employeeId,
        date: form.date,
        status: form.status,
        checkIn: form.checkIn,
        checkOut: form.checkOut
      });
      setRecords((prev) => [...prev, res.data]);
      setDialogOpen(false);
      toast({ title: 'Attendance marked' });
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  return (
    <AppLayout title="Attendance">
      <div className="space-y-6 animate-reveal-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Present" value={present} icon={UserCheck} color="success" />
          <StatCard title="Absent" value={absent} icon={UserX} color="destructive" />
          <StatCard title="Late" value={late} icon={AlertTriangle} color="warning" />
          <StatCard title="Total Records" value={records.length} icon={Clock} color="primary" />
        </div>

        {canManage &&
        <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1.5" /> Mark Attendance</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Mark Attendance</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleMark} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>Employee ID</Label>
                    <Input required value={form.employeeId} onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))} placeholder="Enter employee ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="half-day">Half Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Check In</Label>
                      <Input type="time" value={form.checkIn} onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Check Out</Label>
                      <Input type="time" value={form.checkOut} onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Mark Attendance</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {records.length === 0 ?
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarCheck className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No attendance records</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {canManage ? 'Mark attendance for employees to see records here.' : 'Your attendance records will appear here.'}
              </p>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    {['Employee', 'Date', 'Check In', 'Check Out', 'Status'].map((h) =>
                  <th key={h} className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {records.map((a) =>
                <tr key={a._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{a.employeeName}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{a.date}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{a.checkIn || '—'}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{a.checkOut || '—'}</td>
                      <td className="py-3 px-4"><StatusBadge status={a.status} /></td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </AppLayout>);

}