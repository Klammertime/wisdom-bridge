'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/lib/types'
import { Heart, Users, Sparkles, ArrowLeft } from 'lucide-react'
import { updateUserRole } from '@/app/actions/user'

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangingRole, setIsChangingRole] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role) {
      setIsChangingRole(true)
      setSelectedRole(user.publicMetadata.role as UserRole)
    }
  }, [isLoaded, user])

  const handleRoleSelection = async (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    if (!selectedRole || !user) return

    setIsLoading(true)
    try {
      await updateUserRole(selectedRole)
      // Force a refresh to update the user data
      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update role. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {isChangingRole && (
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        )}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {isChangingRole ? 'Change Your Role' : 'Welcome to Bridge!'}
          </h1>
          <p className="text-lg text-slate-600">
            {isChangingRole 
              ? 'Select a new role to change how you participate in the community.'
              : "Whether you're looking for grandparent-style chats or have stories to share, we'll match you with the right people."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === 'giver' ? 'ring-2 ring-rose-500' : ''
            }`}
            onClick={() => handleRoleSelection('giver')}
          >
            <CardHeader>
              <Heart className="w-12 h-12 text-rose-500 mb-3" />
              <CardTitle>Share Stories</CardTitle>
              <CardDescription>
                Have life experiences to share? Connect with people who want to listen and learn
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === 'receiver' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleRoleSelection('receiver')}
          >
            <CardHeader>
              <Users className="w-12 h-12 text-blue-500 mb-3" />
              <CardTitle>Seek Connection</CardTitle>
              <CardDescription>
                Missing those meaningful conversations? Find someone with stories to tell
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === 'both' ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => handleRoleSelection('both')}
          >
            <CardHeader>
              <Sparkles className="w-12 h-12 text-purple-500 mb-3" />
              <CardTitle>Both</CardTitle>
              <CardDescription>
                Sometimes give advice, sometimes receive it - the best of both worlds
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedRole || isLoading || (isChangingRole && selectedRole === user?.publicMetadata?.role)}
          >
            {isLoading 
              ? 'Updating...' 
              : isChangingRole 
                ? 'Update Role' 
                : 'Continue to Dashboard'
            }
          </Button>
          {isChangingRole && selectedRole === user?.publicMetadata?.role && (
            <p className="text-sm text-slate-500 mt-2">
              This is your current role. Select a different role to change it.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}