import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@/Providers/AuthProvider";
import { AvatarComponent } from "./AvatarComponent";

export const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="border-b">
      <div className="flex justify-between items-center p-6">
        <div>
          <Link to="/">Home</Link>
        </div>
        {user ? (
          <AvatarComponent />
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
            <Link to="/register" className={buttonVariants()}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
