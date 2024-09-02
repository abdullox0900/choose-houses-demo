import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import Image from 'next/image'
import React from 'react'

interface FancyboxImageProps {
    src: string
    status: number
    thumbnail?: string
    alt: string
    width: number
    height: number
    newClass?: string
}

const FancyboxImage: React.FC<FancyboxImageProps> = ({ src, thumbnail, alt, width, height, status, newClass }) => {
    React.useEffect(() => {
        Fancybox.bind("[data-fancybox]", {
            // You can add custom Fancybox options here
        })

        return () => {
            Fancybox.destroy()
        }
    }, [])

    return (
        <a data-fancybox={status} href={src}>
            <Image
                src={thumbnail || src}
                alt={alt}
                width={width}
                height={height}
                className={`${newClass} w-full cursor-pointer`}
            />
        </a>
    )
}

export default FancyboxImage