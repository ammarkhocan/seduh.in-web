import { Coffee, House, LogIn, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src="/logo.svg" alt="logo" />
            </Link>
          </li>
          <li>
            <Button asChild>
              <Link to="/home">
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
          <li>
            <Input type="search" placeholder="Seach coffee..." />
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
        </ul>
      </nav>

      <Outlet />

      <footer>
        <p>&copy; {year} Seduh.in</p>
      </footer>
    </div>
  );
}
