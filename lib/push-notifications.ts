// Push notification utilities

export interface PushNotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
  requireInteraction?: boolean
  actions?: Array<{
    action: string
    title: string
    icon?: string
  }>
}

export class PushNotificationService {
  private static instance: PushNotificationService
  private registration: ServiceWorkerRegistration | null = null
  private publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

  private constructor() {}

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService()
    }
    return PushNotificationService.instance
  }

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications are not supported in this browser')
      return false
    }

    try {
      // Wait for service worker to be ready
      this.registration = await navigator.serviceWorker.ready
      console.log('Push notification service initialized')
      return true
    } catch (error) {
      console.error('Failed to initialize push notifications:', error)
      return false
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Notifications are not supported')
      return 'denied'
    }

    // Check if permission is already granted
    if (Notification.permission === 'granted') {
      return 'granted'
    }

    // Request permission
    try {
      const permission = await Notification.requestPermission()
      return permission
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return 'denied'
    }
  }

  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.initialize()
    }

    if (!this.registration) {
      console.error('Service worker not registered')
      return null
    }

    const permission = await this.requestPermission()
    if (permission !== 'granted') {
      console.log('Notification permission not granted')
      return null
    }

    try {
      // Check if already subscribed
      let subscription = await this.registration.pushManager.getSubscription()
      
      if (!subscription) {
        // Create new subscription
        const options: PushSubscriptionOptionsInit = {
          userVisibleOnly: true,
          applicationServerKey: this.publicVapidKey ? this.urlBase64ToUint8Array(this.publicVapidKey) : undefined
        }
        
        subscription = await this.registration.pushManager.subscribe(options)
      }

      // Send subscription to your server
      await this.sendSubscriptionToServer(subscription)
      
      return subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      return null
    }
  }

  async unsubscribeFromPushNotifications(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        // Remove subscription from your server
        await this.removeSubscriptionFromServer(subscription)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
      return false
    }
  }

  async getSubscriptionState(): Promise<{
    isSupported: boolean
    permission: NotificationPermission
    isSubscribed: boolean
  }> {
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
    const permission = isSupported ? Notification.permission : 'denied'
    let isSubscribed = false

    if (isSupported && this.registration) {
      const subscription = await this.registration.pushManager.getSubscription()
      isSubscribed = !!subscription
    }

    return { isSupported, permission, isSubscribed }
  }

  // Show local notification (for testing or immediate notifications)
  async showLocalNotification(options: PushNotificationOptions): Promise<void> {
    if (!this.registration) {
      await this.initialize()
    }

    if (!this.registration) {
      console.error('Service worker not registered')
      return
    }

    const permission = await this.requestPermission()
    if (permission !== 'granted') {
      console.log('Notification permission not granted')
      return
    }

    await this.registration.showNotification(options.title, {
      body: options.body,
      icon: options.icon || '/icons/icon-192x192.png',
      badge: options.badge || '/icons/icon-72x72.png',
      tag: options.tag,
      data: options.data,
      requireInteraction: options.requireInteraction,
      // Note: actions property might not be supported in all browsers
    })
  }

  // Helper method to convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    
    return outputArray
  }

  // Send subscription to your server
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save subscription on server')
      }
      
      console.log('Subscription sent to server:', subscription)
    } catch (error) {
      console.error('Error sending subscription to server:', error)
      throw error
    }
  }

  // Remove subscription from your server
  private async removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
    // TODO: Implement API call to your server
    // Example:
    // await fetch('/api/push/unsubscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(subscription)
    // })
    console.log('Subscription removed from server:', subscription)
  }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance()