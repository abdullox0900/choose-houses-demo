import { Clusterer, Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface House {
  id: number
  lat: number
  lon: number
  code: string
  name_uz: string
  min_price: number
  rooms: number
  image: string
}

interface YandexMapProps {
  apiKey: string
  center: [number, number]
  zoom: number
}

const YandexMap: React.FC<YandexMapProps> = ({ apiKey, center, zoom }) => {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://83.222.8.77/api/building/all')
        setHouses(response?.data)
      } catch (error) {
        console.error('Error fetching houses:', error)
      }
    }

    fetchHouses()
  }, [])

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://via.placeholder.com/56'
    return imagePath.startsWith('http') ? imagePath : `${imagePath}`
  }

  console.log(houses)

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', height: '100vh' }}>
      <YMaps query={{ apikey: apiKey, lang: 'ru_RU' }}>
        <Map
          defaultState={{ center, zoom }}
          width="100%"
          height="100%"
          options={{ suppressMapOpenBlock: true }}
        >
          <Clusterer
            options={{
              preset: 'islands#blueClusterIcons',
              groupByCoordinates: false,
              clusterDisableClickZoom: false,
              minClusterSize: 3,
              gridSize: 50,
            }}
          >
            {houses?.map((house, index) => (
              <Placemark
                key={index}
                geometry={[house.lon, house.lat]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: getFullImageUrl(house.image),
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -20],
                }}
                properties={{
                  balloonContentBody: `
                    <strong>${house?.name_uz}</strong><br>
                    Narxi: ${house?.min_price} so'm<br>
                    <img src="${getFullImageUrl(house?.image)}" alt="House" style="max-width:200px; max-height:150px;">
                  `,
                  hintContent: `${house?.name_uz}, ${house?.min_price} so'm`,
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
            ))}
          </Clusterer>
        </Map>
      </YMaps>
    </div>
  )
}

export default YandexMap