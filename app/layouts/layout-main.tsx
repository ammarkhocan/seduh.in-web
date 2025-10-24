import { Coffee, House, LogIn, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 w-full px-6 py-4 border-b bg-white">
        <ul className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <li>
              <Link to="/">
                <img src="/logo.svg" alt="logo" className="h-12" />
              </Link>
            </li>
            <li>
              <Button asChild>
                <Link to="/">
                  <House />
                  Home
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to="/product">
                  <Coffee />
                  Product
                </Link>
              </Button>
            </li>
          </div>

          <div className="flex items-center gap-6">
            <li>
              <Input type="search" placeholder="Search coffee..." className="w-64" />
            </li>
            <li>
              <Button asChild>
                <Link to="/cart">
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to="/Login">
                  <LogIn />
                  Login
                </Link>
              </Button>
            </li>
          </div>
        </ul>
      </nav>

      <div className="pt-20">
        <Outlet />
      </div>

      <footer>
        <p>&copy; {year} Seduh.in</p>
      </footer>
    </div>
  );
}
