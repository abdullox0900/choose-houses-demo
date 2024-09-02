'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const DynamicYandexMap = dynamic(() => import('@/components/YandexMap/YandexMap'), {
  ssr: false,
  loading: () => <div>Xarita yuklanmoqda...</div>
})

interface Coordinate {
  lat: number
  lon: number
  title?: string
}

const MapPage: React.FC = () => {

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DynamicYandexMap apiKey="92aa80d7-f51e-49db-ad97-6315281ae6f3"
        center={[41.3111, 69.2797]}
        zoom={11} />
    </div>
  )
}

export default MapPage