'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, UserButton, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Menu, X, User, Settings, HelpCircle, LogOut, Heart, Users, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserRole } from '@/lib/types'

export function Navigation() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const userRole = user?.publicMetadata?.role as UserRole
  const roleLabel = userRole === 'giver' ? 'Mentor' : userRole === 'receiver' ? 'Learner' : 'Both'
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Find Match', href: '/match' },
    { name: 'Connections', href: '/connections' },
    { name: 'Stories', href: '/stories' },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  if (!isLoaded || !user) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">Bridge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive(item.href)
                      ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'px-3 py-2 text-sm font-medium transition-all duration-200'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
                    <AvatarFallback>{user.firstName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {userRole === 'giver' && <Heart className="w-3 h-3 text-purple-600" />}
                      {userRole === 'receiver' && <Users className="w-3 h-3 text-purple-600" />}
                      {userRole === 'both' && <Sparkles className="w-3 h-3 text-purple-600" />}
                      <span className="text-xs font-medium text-purple-600">{roleLabel}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive(item.href)
                    ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'block px-3 py-2 text-base font-medium'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
                  <AvatarFallback>{user.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                <div className="text-sm font-medium text-gray-500">{user.primaryEmailAddress?.emailAddress}</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                View Profile
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <Link
                href="/help"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help & Support
              </Link>
              <button
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                onClick={() => {
                  setMobileMenuOpen(false)
                  signOut()
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}