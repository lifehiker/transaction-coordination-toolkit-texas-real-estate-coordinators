"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
            <span className="text-primary">Texas TC Toolkit</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </Link>
            <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <Link href="/app">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" size="sm" className="gap-1" type="button">
                      {session.user.name ?? session.user.email}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.location.href = "/app"}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/app/transactions"}>
                      Transactions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/app/billing"}>
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-destructive">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 space-y-2">
          <Link
            href="/tools"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Tools
          </Link>
          <Link
            href="/templates"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Templates
          </Link>
          <Link
            href="/pricing"
            className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          <div className="pt-2 border-t border-border space-y-2">
            {session?.user ? (
              <>
                <Link href="/app" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-destructive"
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
