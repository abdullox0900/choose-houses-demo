import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface Flat {
    code: string
    floor: number
    size: number
    room_number: number
    flat_number: number
    price_kv: string
    is_discount: boolean
    discount_price: string | null
    status: number
    condition: number
    build: string
    building_plan: string
}

interface CustomSelectProps {
    buildingFlats: Flat[]
    onSelectFlat: (flat: Flat) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({ buildingFlats, onSelectFlat }) => {
    const [floors, setFloors] = useState<number[]>([])
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
    const [flatsOnFloor, setFlatsOnFloor] = useState<Flat[]>([])
    const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null)
    const [isFloorOpen, setIsFloorOpen] = useState(false)
    const [isFlatOpen, setIsFlatOpen] = useState(false)

    useEffect(() => {
        const uniqueFloors = Array?.from(new Set(buildingFlats?.map(flat => flat.floor))).sort((a, b) => a - b)
        setFloors(uniqueFloors)
        if (uniqueFloors.length > 0) {
            setSelectedFloor(uniqueFloors[0])
        }
    }, [buildingFlats])

    useEffect(() => {
        if (selectedFloor !== null) {
            const flats = buildingFlats.filter(flat => flat.floor === selectedFloor)
            setFlatsOnFloor(flats)
            if (flats.length > 0) {
                setSelectedFlat(flats[0])
                onSelectFlat(flats[0])
            }
        }
    }, [selectedFloor, buildingFlats, onSelectFlat])

    const toggleFloorSelect = () => setIsFloorOpen(!isFloorOpen)
    const toggleFlatSelect = () => setIsFlatOpen(!isFlatOpen)

    const handleFloorSelect = (floor: number) => {
        setSelectedFloor(floor)
        setIsFloorOpen(false)
    }

    const handleFlatSelect = (flat: Flat) => {
        setSelectedFlat(flat)
        setIsFlatOpen(false)
        onSelectFlat(flat)
    }

    return (
        <div className="flex space-x-4">
            <div className="relative w-48">
                <button
                    onClick={toggleFloorSelect}
                    className="w-full p-2 text-left bg-white border border-blue-500 rounded-md flex justify-between items-center"
                >
                    <span>{selectedFloor !== null ? `${selectedFloor}-Etaj` : 'Etajni tanlang'}</span>
                    {isFloorOpen ? <FaChevronUp className="w-5 h-5 text-blue-500" /> : <FaChevronDown className="w-5 h-5 text-blue-500" />}
                </button>
                {isFloorOpen && (
                    <ul className="absolute w-full mt-1 bg-white border border-blue-500 rounded-md shadow-lg">
                        {floors.map((floor) => (
                            <li
                                key={floor}
                                onClick={() => handleFloorSelect(floor)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {floor}-Etaj
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative w-48">
                <button
                    onClick={toggleFlatSelect}
                    className="w-full p-2 text-left bg-white border border-blue-500 rounded-md flex justify-between items-center"
                >
                    <span>
                        {selectedFlat
                            ? `${selectedFlat.room_number} xona ${selectedFlat.size} m²`
                            : 'Kvartira tanlang'}
                    </span>
                    {isFlatOpen ? <FaChevronUp className="w-5 h-5 text-blue-500" /> : <FaChevronDown className="w-5 h-5 text-blue-500" />}
                </button>
                {isFlatOpen && (
                    <ul className="absolute w-full mt-1 bg-white border border-blue-500 rounded-md shadow-lg">
                        {flatsOnFloor.map((flat) => (
                            <li
                                key={flat.code}
                                onClick={() => handleFlatSelect(flat)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {flat.room_number} xona {flat.size} m²
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default CustomSelect