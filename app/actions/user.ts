'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { UserRole } from '@/lib/types'

export async function updateUserRole(role: UserRole) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('User not authenticated')
  }

  try {
    const clerk = await clerkClient()
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    })
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating user role:', error)
    console.error('Error details:', error.message, error.errors)
    throw new Error(`Failed to update user role: ${error.message || 'Unknown error'}`)
  }
}