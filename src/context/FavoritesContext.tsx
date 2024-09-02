// context/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

interface FavoritesContextType {
  favorites: any[]
  addToFavorites: (item: any) => void
  removeFromFavorites: (code: string) => void
  clearAllFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addToFavorites = (item: any) => {
    setFavorites(prev => {
      const newFavorites = [...prev, item]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFromFavorites = (code: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(item => item.code !== code)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const clearAllFavorites = () => {
    setFavorites([])
    localStorage.removeItem('favorites')
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, clearAllFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}