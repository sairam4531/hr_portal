import { AppLayout } from "@/components/layout/AppLayout";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HRSettings() {
  const user = useSelector(selectCurrentUser);

  return (
    <AppLayout title="Settings">
      <div className="max-w-2xl space-y-6 animate-reveal-up">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {user?.name.
              split(" ").
              map((n) => n[0]).
              join("")}
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                Role: {user?.role}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Account Settings</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email} type="email" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Notification preferences will be configurable once connected to a
            backend.
          </p>
        </div>
      </div>
    </AppLayout>);

}