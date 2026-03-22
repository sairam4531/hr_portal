import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Plus, CalendarOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


export default function Leaves() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaves, setLeaves] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ type: 'annual', startDate: '', endDate: '', reason: '' });

  const canApprove = user?.role === 'it-admin' || user?.role === 'hr';
  const canApply = user?.role === 'employee';

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const { default: leaveService } = await import('@/services/leaveService');
      const res = await leaveService.apply(form);
      setLeaves((prev) => [...prev, res.data]);
      setDialogOpen(false);
      setForm({ type: 'annual', startDate: '', endDate: '', reason: '' });
      toast({ title: 'Leave request submitted' });
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  const handleAction = async (id, action) => {
    try {
      const { default: leaveService } = await import('@/services/leaveService');
      const res = action === 'approve' ? await leaveService.approve(id) : await leaveService.reject(id);
      setLeaves((prev) => prev.map((l) => l._id === id ? res.data : l));
      toast({ title: `Leave ${action}d` });
    } catch {
      toast({ title: 'Error', description: 'Action failed.', variant: 'destructive' });
    }
  };

  return (
    <AppLayout title="Leave Management">
      <div className="space-y-4 animate-reveal-up">
        <div className="flex justify-end gap-3">
          {(canApply || canApprove) &&
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1.5" /> {canApply ? 'Apply for Leave' : 'Submit Leave Request'}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Apply for Leave</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleApply} className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label>Leave Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="sick">Sick</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="maternity">Maternity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" required value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" required value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Textarea required value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
                  </div>
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              </DialogContent>
            </Dialog>
          }
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {leaves.length === 0 ?
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarOff className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No leave requests</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {canApply ? 'Click "Apply for Leave" to submit your first request.' : 'Leave requests from employees will appear here.'}
              </p>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    {['Employee', 'Type', 'Start', 'End', 'Reason', 'Status', ...(canApprove ? ['Actions'] : [])].map((h) =>
                  <th key={h} className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((lr) =>
                <tr key={lr._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{lr.employeeName}</td>
                      <td className="py-3 px-4 capitalize text-muted-foreground">{lr.type}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{lr.startDate}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{lr.endDate}</td>
                      <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">{lr.reason}</td>
                      <td className="py-3 px-4"><StatusBadge status={lr.status} /></td>
                      {canApprove &&
                  <td className="py-3 px-4">
                          {lr.status === 'pending' &&
                    <div className="flex gap-1">
                              <button onClick={() => handleAction(lr._id, 'approve')} className="p-1.5 rounded-md bg-success/10 hover:bg-success/20 text-success transition-colors">
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button onClick={() => handleAction(lr._id, 'reject')} className="p-1.5 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                    }
                        </td>
                  }
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