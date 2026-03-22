import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatCard } from '@/components/ui/stat-card';
import { Shield, UserPlus, Users, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useToast } from '@/hooks/use-toast';


export default function UserManagement() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [hrUsers, setHrUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', department: '' });

  const handleCreateHR = async (e) => {
    e.preventDefault();
    try {
      const { default: userService } = await import('@/services/userService');
      const res = await userService.createHR(form);
      setHrUsers((prev) => [...prev, res.data]);
      setDialogOpen(false);
      setForm({ name: '', email: '', password: '', phone: '', department: '' });
      toast({ title: 'HR account created', description: `${form.name} has been added as HR.` });
    } catch {
      toast({ title: 'Error', description: 'Could not create HR account. Make sure the backend is running.', variant: 'destructive' });
    }
  };

  const toggleActive = async (id) => {
    try {
      const { default: userService } = await import('@/services/userService');
      const res = await userService.toggleActive(id);
      setHrUsers((prev) => prev.map((u) => u._id === id ? res.data : u));
    } catch {
      toast({ title: 'Error', description: 'Action failed.', variant: 'destructive' });
    }
  };

  const filtered = hrUsers.filter((u) =>
  u.name.toLowerCase().includes(search.toLowerCase()) ||
  u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (user?.role !== 'it-admin') return null;

  return (
    <AppLayout title="User Management">
      <div className="space-y-6 animate-reveal-up">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total HR Users" value={hrUsers.length} icon={Shield} color="primary" />
          <StatCard title="Active" value={hrUsers.filter((u) => u.isActive).length} icon={Users} color="success" />
          <StatCard title="Inactive" value={hrUsers.filter((u) => !u.isActive).length} icon={Users} color="warning" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search HR users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><UserPlus className="h-4 w-4 mr-1.5" /> Create HR Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create HR Account</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateHR} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" required minLength={6} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
                </div>
                <Button type="submit" className="w-full">Create HR Account</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {filtered.length === 0 ?
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <Shield className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No HR users yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create HR accounts to get started. HR users can then create and manage employee accounts.
              </p>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    {['Name', 'Email', 'Phone', 'Department', 'Status', 'Actions'].map((h) =>
                  <th key={h} className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">{h}</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) =>
                <tr key={u._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                            {u.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-medium text-foreground">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{u.phone || '—'}</td>
                      <td className="py-3 px-4 text-muted-foreground">{u.department || '—'}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={u.isActive ? 'active' : 'terminated'} />
                      </td>
                      <td className="py-3 px-4">
                        <button
                      onClick={() => toggleActive(u._id)}
                      className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                      title={u.isActive ? 'Deactivate' : 'Activate'}>
                      
                          {u.isActive ?
                      <ToggleRight className="h-5 w-5 text-success" /> :

                      <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                      }
                        </button>
                      </td>
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