'use client'

import { useState, useEffect, useCallback } from 'react'
import { pushNotificationService, type PushNotificationOptions } from '@/lib/push-notifications'

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check initial state
  useEffect(() => {
    const checkState = async () => {
      const state = await pushNotificationService.getSubscriptionState()
      setIsSupported(state.isSupported)
      setPermission(state.permission)
      setIsSubscribed(state.isSubscribed)
      setIsLoading(false)
    }

    checkState()
  }, [])

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    setIsLoading(true)
    try {
      const subscription = await pushNotificationService.subscribeToPushNotifications()
      if (subscription) {
        setIsSubscribed(true)
        setPermission('granted')
      }
    } catch (error) {
      console.error('Failed to subscribe:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    setIsLoading(true)
    try {
      const success = await pushNotificationService.unsubscribeFromPushNotifications()
      if (success) {
        setIsSubscribed(false)
      }
    } catch (error) {
      console.error('Failed to unsubscribe:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Show local notification
  const showNotification = useCallback(async (options: PushNotificationOptions) => {
    try {
      await pushNotificationService.showLocalNotification(options)
    } catch (error) {
      console.error('Failed to show notification:', error)
    }
  }, [])

  return {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
    showNotification,
  }
}