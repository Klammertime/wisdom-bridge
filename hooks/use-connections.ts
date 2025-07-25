import { useState, useCallback } from 'react'
import { Connection } from '@/lib/types'

const STORAGE_KEY = 'connections'

interface UseConnectionsReturn {
  connections: Connection[]
  saveConnection: (connection: Omit<Connection, 'id'>) => boolean
  getConnections: () => Connection[]
  connectionExists: (userId: string, connectedUserId: string) => boolean
}

export function useConnections(): UseConnectionsReturn {
  const [connections, setConnections] = useState<Connection[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load connections:', error)
      return []
    }
  })

  const getConnections = useCallback((): Connection[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const parsedConnections = stored ? JSON.parse(stored) : []
      setConnections(parsedConnections)
      return parsedConnections
    } catch (error) {
      console.error('Failed to get connections:', error)
      return []
    }
  }, [])

  const connectionExists = useCallback((userId: string, connectedUserId: string): boolean => {
    return connections.some(
      conn => conn.userId === userId && conn.connectedUserId === connectedUserId
    )
  }, [connections])

  const saveConnection = useCallback((connectionData: Omit<Connection, 'id'>): boolean => {
    try {
      const newConnection: Connection = {
        ...connectionData,
        id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }

      // Check if connection already exists
      if (connectionExists(newConnection.userId, newConnection.connectedUserId)) {
        console.log('Connection already exists')
        return false
      }

      const updatedConnections = [...connections, newConnection]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConnections))
      setConnections(updatedConnections)
      return true
    } catch (error) {
      console.error('Failed to save connection:', error)
      return false
    }
  }, [connections, connectionExists])

  return {
    connections,
    saveConnection,
    getConnections,
    connectionExists
  }
}