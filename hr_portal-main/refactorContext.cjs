const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/Leaves.jsx',
  'src/pages/UserManagement.jsx',
  'src/pages/Profile.jsx',
  'src/pages/Payroll.jsx',
  'src/pages/Performance.jsx',
  'src/pages/HRSettings.jsx',
  'src/pages/Employees.jsx',
  'src/pages/Dashboard.jsx',
  'src/pages/Attendance.jsx',
  'src/components/layout/TopBar.jsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/import\s+{\s*useAuth\s*}\s+from\s+['"]@\/context\/AuthContext['"];?/, "import { useSelector } from 'react-redux';\nimport { selectCurrentUser } from '@/store/authSlice';");
  content = content.replace(/const\s+{\s*user\s*}\s*=\s*useAuth\(\);?/, "const user = useSelector(selectCurrentUser);");
  fs.writeFileSync(fullPath, content);
  console.log('Updated ' + file);
});

// Update AppSidebar
const sidebarPath = path.join(__dirname, 'src/components/layout/AppSidebar.jsx');
if (fs.existsSync(sidebarPath)) {
  let content = fs.readFileSync(sidebarPath, 'utf8');
  content = content.replace(/import\s+{\s*useAuth\s*}\s+from\s+['"]@\/context\/AuthContext['"];?/, "import { useSelector, useDispatch } from 'react-redux';\nimport { selectCurrentUser, logout } from '@/store/authSlice';");
  content = content.replace(/const\s+{\s*user\s*,\s*logout\s*}\s*=\s*useAuth\(\);?/, "const user = useSelector(selectCurrentUser);\n  const dispatch = useDispatch();");
  content = content.replace(/onClick={logout}/g, "onClick={() => dispatch(logout())}");
  content = content.replace(/onClick={\(\)\s*=>\s*logout\(\)}/g, "onClick={() => dispatch(logout())}");
  fs.writeFileSync(sidebarPath, content);
  console.log('Updated AppSidebar');
}

// Update App.jsx
const appPath = path.join(__dirname, 'src/App.jsx');
if(fs.existsSync(appPath)) {
    let content = fs.readFileSync(appPath, 'utf8');
    content = content.replace(/import\s+{\s*AuthProvider\s*}\s+from\s+['"]@\/context\/AuthContext['"];?\n/, "");
    content = content.replace(/<AuthProvider>/g, "");
    content = content.replace(/<\/AuthProvider>/g, "");
    fs.writeFileSync(appPath, content);
    console.log('Updated App.jsx');
}

// Update ProtectedRoute.jsx
const routePath = path.join(__dirname, 'src/components/ProtectedRoute.jsx');
if(fs.existsSync(routePath)) {
    let content = fs.readFileSync(routePath, 'utf8');
    content = content.replace(/import\s+{\s*useAuth\s*}\s+from\s+['"]@\/context\/AuthContext['"];?/, "import { useSelector } from 'react-redux';\nimport { selectCurrentUser, selectIsAuthenticated } from '@/store/authSlice';");
    
    const oldCode = `  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>);

  }`;
  
    const newCode = `  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);`;
  
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(routePath, content);
    console.log('Updated ProtectedRoute.jsx');
}
