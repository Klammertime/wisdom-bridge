import { useState, useCallback } from 'react'
import { VIDEO_CALL } from '@/lib/constants/call'

interface UseClipboardReturn {
  copied: boolean
  copyToClipboard: (text: string) => Promise<boolean>
}

export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), VIDEO_CALL.COPY_FEEDBACK_DURATION)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }, [])

  return {
    copied,
    copyToClipboard
  }
}