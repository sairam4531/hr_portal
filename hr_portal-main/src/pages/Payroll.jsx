import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingDown, TrendingUp, FileText, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';


export default function Payroll() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [records, setRecords] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    employeeId: '', month: '', basicSalary: '', allowances: '', deductions: '', bonus: '', tax: ''
  });

  const canManage = user?.role === 'it-admin' || user?.role === 'hr';
  const totalNet = records.reduce((s, p) => s + p.netSalary, 0);
  const totalDeductions = records.reduce((s, p) => s + p.deductions, 0);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const { default: payrollService } = await import('@/services/payrollService');
      const res = await payrollService.generate({
        employeeId: form.employeeId,
        month: form.month,
        basicSalary: Number(form.basicSalary),
        allowances: Number(form.allowances) || 0,
        deductions: Number(form.deductions) || 0,
        bonus: Number(form.bonus) || 0,
        tax: Number(form.tax) || 0
      });
      setRecords((prev) => [...prev, res.data]);
      setDialogOpen(false);
      toast({ title: 'Payroll generated' });
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  return (
    <AppLayout title="Payroll">
      <div className="space-y-6 animate-reveal-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Payroll" value={totalNet > 0 ? `$${totalNet.toLocaleString()}` : '$0'} icon={DollarSign} color="primary" />
          <StatCard title="Total Deductions" value={totalDeductions > 0 ? `$${totalDeductions.toLocaleString()}` : '$0'} icon={TrendingDown} color="destructive" />
          <StatCard title="Avg Salary" value={records.length > 0 ? `$${Math.round(totalNet / records.length).toLocaleString()}` : '$0'} icon={TrendingUp} color="success" />
          <StatCard title="Payslips" value={records.length} icon={FileText} color="accent" />
        </div>

        {canManage &&
        <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1.5" /> Generate Payroll</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Generate Payroll</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleGenerate} className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input required value={form.employeeId} onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <Input required placeholder="e.g. Jan 2025" value={form.month} onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Basic Salary</Label>
                    <Input type="number" required value={form.basicSalary} onChange={(e) => setForm((f) => ({ ...f, basicSalary: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Allowances</Label>
                      <Input type="number" value={form.allowances} onChange={(e) => setForm((f) => ({ ...f, allowances: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bonus</Label>
                      <Input type="number" value={form.bonus} onChange={(e) => setForm((f) => ({ ...f, bonus: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Deductions</Label>
                      <Input type="number" value={form.deductions} onChange={(e) => setForm((f) => ({ ...f, deductions: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tax</Label>
                      <Input type="number" value={form.tax} onChange={(e) => setForm((f) => ({ ...f, tax: e.target.value }))} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Generate Payslip</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {records.length === 0 ?
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No payroll records</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {canManage ? 'Generate payroll for employees to see records here.' : 'Your payslips will appear here once processed.'}
              </p>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    {['Employee', 'Month', 'Basic', 'Allowances', 'Bonus', 'Deductions', 'Tax', 'Net Salary', 'Status'].map((h) =>
                  <th key={h} className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {records.map((p) =>
                <tr key={p._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{p.employeeName}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.month}</td>
                      <td className="py-3 px-4 tabular-nums">${p.basicSalary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-success tabular-nums">+${p.allowances.toLocaleString()}</td>
                      <td className="py-3 px-4 text-success tabular-nums">+${p.bonus.toLocaleString()}</td>
                      <td className="py-3 px-4 text-destructive tabular-nums">-${p.deductions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-destructive tabular-nums">-${p.tax.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold text-foreground tabular-nums">${p.netSalary.toLocaleString()}</td>
                      <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
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