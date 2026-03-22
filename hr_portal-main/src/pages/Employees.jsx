import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales', 'QA', 'DevOps'];
const positions = ['Developer', 'Senior Developer', 'Tech Lead', 'Tester', 'QA Engineer', 'Designer', 'Manager', 'Analyst'];

export default function Employees() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', department: '', position: '', salary: '', joiningDate: '', password: '', gender: ''
  });

  const canManage = user?.role === 'it-admin' || user?.role === 'hr';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { default: employeeService } = await import('@/services/employeeService');
      const payload = { ...form, salary: Number(form.salary) };
      if (editingId) {
        const res = await employeeService.update(editingId, payload);
        setEmployees((prev) => prev.map((emp) => emp._id === editingId ? res.data : emp));
        toast({ title: 'Employee updated' });
      } else {
        const res = await employeeService.create(payload);
        setEmployees((prev) => [...prev, res.data]);
        toast({ title: 'Employee created', description: `${form.name} has been added.` });
      }
      resetForm();
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const { default: employeeService } = await import('@/services/employeeService');
      await employeeService.delete(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      toast({ title: 'Employee deleted' });
    } catch {
      toast({ title: 'Error', description: 'Delete failed.', variant: 'destructive' });
    }
  };

  const startEdit = (emp) => {
    setEditingId(emp._id);
    setForm({
      name: emp.name, email: emp.email, phone: emp.phone,
      department: emp.department, position: emp.position,
      salary: String(emp.salary), joiningDate: emp.joiningDate
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', department: '', position: '', salary: '', joiningDate: '', password: '', gender: '' });
    setEditingId(null);
    setDialogOpen(false);
  };

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <AppLayout title="Employees">
      <div className="space-y-4 animate-reveal-up">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {canManage &&
          <Dialog open={dialogOpen} onOpenChange={(o) => {if (!o) resetForm();else setDialogOpen(true);}}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1.5" /> Add Employee</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
                  <DialogDescription className="sr-only">Fill out the form below to {editingId ? 'edit the' : 'add a new'} employee.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  {!editingId && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Password (Login)</Label>
                        <Input type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select required value={form.gender} onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={form.department} onValueChange={(v) => setForm((f) => ({ ...f, department: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Position / Role</Label>
                      <Select value={form.position} onValueChange={(v) => setForm((f) => ({ ...f, position: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {positions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Salary</Label>
                      <Input type="number" required value={form.salary} onChange={(e) => setForm((f) => ({ ...f, salary: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Joining Date</Label>
                    <Input type="date" required value={form.joiningDate} onChange={(e) => setForm((f) => ({ ...f, joiningDate: e.target.value }))} />
                  </div>
                  <Button type="submit" className="w-full">{editingId ? 'Update Employee' : 'Add Employee'}</Button>
                </form>
              </DialogContent>
            </Dialog>
          }
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {filtered.length === 0 ?
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No employees yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {canManage ? 'Click "Add Employee" to create your first employee record.' : 'No employee records found.'}
              </p>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    {['Employee', 'Department', 'Position', 'Status', 'Salary', 'Joining Date', ...(canManage ? ['Actions'] : [])].map((h) =>
                  <th key={h} className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) =>
                <tr key={emp._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{emp.department}</td>
                      <td className="py-3 px-4 text-muted-foreground">{emp.position}</td>
                      <td className="py-3 px-4"><StatusBadge status={emp.status} /></td>
                      <td className="py-3 px-4 font-medium text-foreground tabular-nums">${emp.salary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{emp.joiningDate}</td>
                      {canManage &&
                  <td className="py-3 px-4">
                          <div className="flex gap-1.5">
                            <button onClick={() => startEdit(emp)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                            <button onClick={() => handleDelete(emp._id)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors">
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </button>
                          </div>
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