import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/AuthProvider";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome, {user?.email}</h2>
        <Button onClick={logout}>Logout</Button>
      </div>
    </main>
  );
};

export default Dashboard;
