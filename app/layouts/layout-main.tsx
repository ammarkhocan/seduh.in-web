import Cookies from "js-cookie";

import { CoffeeIcon, HouseIcon, LogInIcon, ShoppingCartIcon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export default function LayoutMain() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userToken = Cookies.get("token");

  const isLoggedIn = userToken !== undefined;

  const handleLogout = () => {
    Cookies.remove("token");

    setIsDropdownOpen(false);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-4 border-b bg-white shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img src="/logo.svg" alt="logo" className="h-14" />
            </Link>

            <Button className="text-base font-bold" variant="ghost" asChild>
              <Link to="/">
                <HouseIcon />
                Home
              </Link>
            </Button>

            <Button className="text-base font-bold" variant="ghost" asChild>
              <Link to="/products">
                <CoffeeIcon />
                Products
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Input type="search" placeholder="Search coffee..." className="w-64" />

            <Button variant="ghost" asChild>
              <Link to="/cart">
                <ShoppingCartIcon className="h-10 w-10" />
              </Link>
            </Button>

            {isLoggedIn ? (
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                  <button>
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" sideOffset={10} className="w-35">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="text-base" asChild>
                <Link to="/login">
                  <LogInIcon />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer className="text-center py-6">
        <p>&copy; {year} Seduh.in</p>
      </footer>
    </div>
  );
}
