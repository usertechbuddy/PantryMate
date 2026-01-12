import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(168,17%,21%)] backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold text-white">
              PantryMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className="text-white/70 hover:text-white transition-colors"
              activeClassName="text-white font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/pantry"
              className="text-white/70 hover:text-white transition-colors"
              activeClassName="text-white font-medium"
            >
              Generate Recipe
            </NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link to="/pantry">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/"
                className="text-white/70 hover:text-white transition-colors px-2 py-1"
                activeClassName="text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/pantry"
                className="text-white/70 hover:text-white transition-colors px-2 py-1"
                activeClassName="text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Generate Recipe
              </NavLink>
              <Button asChild className="w-full mt-2">
                <Link to="/pantry" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
