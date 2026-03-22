import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MapPin, Users, Calendar, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';


export default function Recruitment() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'full-time', description: '' });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { default: recruitmentService } = await import('@/services/recruitmentService');
      const res = await recruitmentService.createJob(form);
      setJobs((prev) => [...prev, res.data]);
      setDialogOpen(false);
      setForm({ title: '', department: '', location: '', type: 'full-time', description: '' });
      toast({ title: 'Job posted' });
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  return (
    <AppLayout title="Recruitment">
      <div className="space-y-4 animate-reveal-up">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1.5" /> Post Job</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Job Posting</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input required value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea required value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </div>
                <Button type="submit" className="w-full">Post Job</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {jobs.length === 0 ?
        <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-16 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No job postings</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Click "Post Job" to create your first job listing and start receiving applicants.
            </p>
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) =>
          <div key={job._id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{job.applicants} applicants</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{job.postedDate}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-secondary rounded-md">{job.type}</span>
                  <Button variant="ghost" size="sm">View Applicants</Button>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </AppLayout>);

}