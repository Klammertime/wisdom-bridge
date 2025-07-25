// Video call constants
export const VIDEO_CALL = {
  MIN_HEIGHT: '600px',
  COPY_FEEDBACK_DURATION: 2000,
  IFRAME_PERMISSIONS: 'camera; microphone; fullscreen; display-capture; autoplay',
  PROVIDER_NAME: 'Jitsi Meet'
} as const

// Share dialog constants
export const SHARE_DIALOG = {
  TITLE: 'Join my Bridge call',
  TEXT: 'Click the link to join my video call'
} as const

// UI Messages
export const CALL_MESSAGES = {
  LOADING: {
    TITLE: 'Setting up video call...',
    SUBTITLE: 'Please wait'
  },
  ERROR: {
    TITLE: 'Unable to start video call',
    RETRY_BUTTON: 'Try Again'
  },
  NO_ROOM: 'No room URL available',
  END_CALL_CONFIRM: 'Are you sure you want to end the call?',
  EXIT_HINT: {
    PREFIX: 'Press',
    ACTION: 'End Call',
    SUFFIX: 'below to return to dashboard'
  }
} as const

// Button labels
export const BUTTON_LABELS = {
  END_CALL: 'End Call',
  COPY_LINK: 'Copy Link',
  COPIED: 'Copied!',
  SHARE: 'Share',
  SAVE_CONTACT: 'Save Contact'
} as const