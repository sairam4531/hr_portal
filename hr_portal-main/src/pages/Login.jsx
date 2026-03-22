import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email, pw) => {
    setEmail(email);
    setPassword(pw);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary-foreground" />
          <div className="absolute bottom-24 right-12 w-56 h-56 rounded-full bg-primary-foreground" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-foreground" />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-8">
            <Building2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight mb-4" style={{ lineHeight: '1.12' }}>
            Your complete HR management platform.
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            PeopleOS brings together employee management, payroll, attendance, and performance tracking for modern IT companies.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
            { label: 'Employee Management', desc: 'Full lifecycle' },
            { label: 'Payroll & Benefits', desc: 'Automated processing' },
            { label: 'Performance', desc: 'Reviews & ratings' },
            { label: 'Recruitment', desc: 'Job postings & ATS' }].
            map((f) =>
            <div key={f.label} className="bg-primary-foreground/10 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-primary-foreground">{f.label}</p>
                <p className="text-xs text-primary-foreground/60 mt-0.5">{f.desc}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground text-lg">PeopleOS</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to your HR portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error &&
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg font-medium">{error}</div>
            }
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="space-y-2 bg-secondary rounded-xl p-4">
            <p className="text-xs font-semibold text-foreground">Quick login (demo):</p>
            <div className="grid gap-1.5">
              {[
              { label: 'IT Admin', email: 'admin@hrportal.com', pw: 'admin123', color: 'text-primary' },
              { label: 'HR Manager', email: 'hr@hrportal.com', pw: 'hr123', color: 'text-accent' },
              { label: 'Employee', email: 'employee@hrportal.com', pw: 'emp123', color: 'text-success' }].
              map((acc) =>
              <button
                key={acc.email}
                type="button"
                onClick={() => quickLogin(acc.email, acc.pw)}
                className="text-left text-xs px-3 py-2 rounded-lg hover:bg-background transition-colors">
                
                  <span className={`font-semibold ${acc.color}`}>{acc.label}</span>
                  <span className="text-muted-foreground ml-2">{acc.email}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}