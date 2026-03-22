import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Plus, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';


function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) =>
      <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? 'fill-warning text-warning' : 'text-border'}`} />
      )}
      <span className="text-xs text-muted-foreground ml-1 tabular-nums">{rating}</span>
    </div>);

}

export default function Performance() {
  const user = useSelector(selectCurrentUser);
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ employeeId: '', period: '', rating: '', strengths: '', improvements: '' });

  const canManage = user?.role === 'it-admin' || user?.role === 'hr';

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { default: performanceService } = await import('@/services/performanceService');
      const res = await performanceService.create({
        employeeId: form.employeeId,
        period: form.period,
        rating: Number(form.rating),
        strengths: form.strengths,
        improvements: form.improvements
      });
      setReviews((prev) => [...prev, res.data]);
      setDialogOpen(false);
      setForm({ employeeId: '', period: '', rating: '', strengths: '', improvements: '' });
      toast({ title: 'Review added' });
    } catch {
      toast({ title: 'Error', description: 'Make sure the backend is running.', variant: 'destructive' });
    }
  };

  return (
    <AppLayout title="Performance Reviews">
      <div className="space-y-4 animate-reveal-up">
        {canManage &&
        <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1.5" /> Add Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Performance Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input required value={form.employeeId} onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Period</Label>
                      <Input required placeholder="e.g. Q1 2025" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Rating (1-5)</Label>
                    <Input type="number" required min={1} max={5} step={0.1} value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Strengths</Label>
                    <Textarea required value={form.strengths} onChange={(e) => setForm((f) => ({ ...f, strengths: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Areas for Improvement</Label>
                    <Textarea required value={form.improvements} onChange={(e) => setForm((f) => ({ ...f, improvements: e.target.value }))} />
                  </div>
                  <Button type="submit" className="w-full">Submit Review</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        }

        {reviews.length === 0 ?
        <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-16 text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No performance reviews</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {canManage ? 'Add performance reviews for employees to track their progress.' : 'Your performance reviews will appear here.'}
            </p>
          </div> :

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map((pr) =>
          <div key={pr._id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{pr.employeeName}</h3>
                    <p className="text-sm text-muted-foreground">{pr.period} · Reviewed by {pr.reviewer}</p>
                  </div>
                  <StatusBadge status={pr.status} />
                </div>
                <RatingStars rating={pr.rating} />
                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <span className="text-xs font-medium text-success uppercase tracking-wider">Strengths</span>
                    <p className="text-muted-foreground mt-0.5">{pr.strengths}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-warning uppercase tracking-wider">Areas for improvement</span>
                    <p className="text-muted-foreground mt-0.5">{pr.improvements}</p>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </AppLayout>);

}