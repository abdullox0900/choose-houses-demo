import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaSchool, FaHospital, FaStore, FaUtensils, FaHome, FaRunning, FaTree } from 'react-icons/fa';
import Container from '../Container/Container';

interface InfrastructureItem {
    icon: React.ElementType;
    label: string;
    count: number;
}

const infrastructureData: InfrastructureItem[] = [
    { icon: FaSchool, label: "Maktab va Bog'chalar", count: 12 },
    { icon: FaHospital, label: "Shifoxona va poliklinikalar", count: 4 },
    { icon: FaStore, label: "Savdo markazlari", count: 8 },
    { icon: FaUtensils, label: "Kafe va restoranlar", count: 10 },
    { icon: FaHome, label: "Dam olish maskanlari", count: 6 },
    { icon: FaRunning, label: "Sport", count: 9 },
    { icon: FaTree, label: "Parklar", count: 2 },
];

const LocationInfrastructure: React.FC = () => {
    return (
        <div className="py-[50px] yandex-map">
            <Container>
                <h2 className="text-[48px] font-bold text-right text-[#2b2b2]">Joylashuv va infratuzilma</h2>
                <p className="text-[28px] text-[#2b2b2b] mb-4 text-right w-[400px] ml-auto">Karta manzil bo'yicha qulay manzilda jonadonlar harid qiling</p>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 relative h-[300px] md:h-[400px]">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaMapMarkerAlt className="text-blue-500 text-5xl" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/3">
                        <ul className="space-y-2">
                            {infrastructureData.map((item, index) => (
                                <li key={index} className="flex items-center overflow-hidden justify-between relative bg-white p-[20px] rounded-lg border-[2px] border-blur-500">
                                    <div className="flex items-center">
                                        <item.icon className="text-blue-500 mr-2" />
                                        <span>{item.label}</span>
                                    </div>
                                    <span className="relative z-10 text-white px-2 py-1 rounded-full text-sm">
                                        {item.count}
                                    </span>
                                    <span className='absolute right-0 h-[70px] w-[70px] rounded-l-[35px] bg-blue_10'></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LocationInfrastructure;