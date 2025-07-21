'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, Bell, Shield, Globe, Smartphone, 
  Mail, Volume2, Calendar, Eye, LogOut,
  User, Heart, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SettingsPage() {
  const { user } = useUser()
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newMatches: true,
    messages: true,
    reminders: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'everyone',
    showLocation: true,
    showAvailability: true
  })

  const handleSignOut = () => {
    // Clerk handles sign out
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Account
              </CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/profile/edit" className="block">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium">Edit Profile</p>
                    <p className="text-sm text-gray-600">Update your information and preferences</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
              
              <Link href="/onboarding" className="block">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium">Change Role</p>
                    <p className="text-sm text-gray-600">
                      Currently: <span className="capitalize">{user?.publicMetadata?.role as string || 'Not set'}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Get notifications on your device</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">Notify me about:</p>
                
                <div className="flex items-center justify-between pl-8">
                  <span className="text-sm">New matches</span>
                  <input
                    type="checkbox"
                    checked={notifications.newMatches}
                    onChange={(e) => setNotifications({...notifications, newMatches: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between pl-8">
                  <span className="text-sm">Messages</span>
                  <input
                    type="checkbox"
                    checked={notifications.messages}
                    onChange={(e) => setNotifications({...notifications, messages: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between pl-8">
                  <span className="text-sm">Connection reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.reminders}
                    onChange={(e) => setNotifications({...notifications, reminders: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Privacy
              </CardTitle>
              <CardDescription>
                Control who can see your information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profile-visibility" className="text-sm font-medium">
                  Profile Visibility
                </Label>
                <Select 
                  value={privacy.profileVisibility} 
                  onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                >
                  <SelectTrigger id="profile-visibility" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="matches">Only My Matches</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Show Location</p>
                  <p className="text-sm text-gray-600">Display your location on your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.showLocation}
                  onChange={(e) => setPrivacy({...privacy, showLocation: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Show Availability</p>
                  <p className="text-sm text-gray-600">Let others see when you're available</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.showAvailability}
                  onChange={(e) => setPrivacy({...privacy, showAvailability: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Other Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Other</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/help" className="block">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <p className="font-medium">Help & Support</p>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
              
              <Link href="/features/real-people" className="block">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <p className="font-medium">About Bridge</p>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <div className="border-t pt-2 mt-4">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                // Save settings logic here
                router.push('/dashboard')
              }}
              className="px-8"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}