import React, { useEffect, useRef } from 'react'

interface YandexMapProps {
    latitude: number
    longitude: number
}

declare global {
    interface Window {
        ymaps: any
    }
}

const YandexInnerMap: React.FC<YandexMapProps> = ({ latitude, longitude }) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=ab2afb19-5b8a-462c-b079-35b83c4ec61d&lang=uz_UZ`
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.ymaps.ready(() => {
                if (mapRef.current) {
                    const map = new window.ymaps.Map(mapRef.current, {
                        center: [latitude, longitude],
                        zoom: 20,
                        controls: []
                    })

                    // Custom marker yaratish
                    const customMarkerLayout = window.ymaps.templateLayoutFactory.createClass(`
                        <div style="
                            position: absolute;
                            top: -24px;
                            left: -24px;
                            width: 48px;
                            height: 48px;
                        ">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="24" fill="#3889F2"/>
                                <path d="M34 21.5L24 13L14 21.5V33C14 33.5304 14.2107 34.0391 14.5858 34.4142C14.9609 34.7893 15.4696 35 16 35H32C32.5304 35 33.0391 34.7893 33.4142 34.4142C33.7893 34.0391 34 33.5304 34 33V21.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 35V24H26V35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    `)

                    const placemark = new window.ymaps.Placemark([latitude, longitude], {}, {
                        iconLayout: customMarkerLayout,
                        iconShape: {
                            type: 'Circle',
                            coordinates: [0, 0],
                            radius: 24
                        }
                    })

                    map.geoObjects.add(placemark)
                }
            })
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [latitude, longitude])

    return (
        <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
            <div ref={mapRef} className="w-full h-full rounded-[20px] overflow-hidden"></div>
        </div>
    )
}

export default YandexInnerMap