'use client'

import { usePushNotifications } from '@/hooks/use-push-notifications'
import { useState } from 'react'

export function PushNotificationSettings() {
  const {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
    showNotification,
  } = usePushNotifications()
  
  const [testSent, setTestSent] = useState(false)

  const handleTestNotification = async () => {
    await showNotification({
      title: 'Test Notification',
      body: 'This is a test notification from Bridge!',
      tag: 'test-notification',
      data: { test: true },
      actions: [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    })
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Push notifications are not supported in your browser.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
          <p className="text-sm text-gray-500">
            Get notified about new messages and connection requests
          </p>
        </div>
        <button
          onClick={isSubscribed ? unsubscribe : subscribe}
          disabled={isLoading}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${isSubscribed ? 'bg-blue-600' : 'bg-gray-200'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${isSubscribed ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {permission === 'denied' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        </div>
      )}

      {isSubscribed && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <p>You'll receive notifications for:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>New messages</li>
              <li>Connection requests</li>
              <li>Upcoming scheduled calls</li>
              <li>Missed calls</li>
            </ul>
          </div>
          
          <button
            onClick={handleTestNotification}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Send test notification
          </button>
          
          {testSent && (
            <p className="text-sm text-green-600">Test notification sent!</p>
          )}
        </div>
      )}
    </div>
  )
}