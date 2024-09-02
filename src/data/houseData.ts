export interface House {
	id: number
	title: string
	price: number
	address: string
	deadline: string
	installmentMonths: number
	condition: 'Korobka' | 'Qora toza' | 'Evrotamir'
	floor: number
	mainImage: string
	innerImage: string
}

export type HouseDataArray = House[]

export const houseData: HouseDataArray = [
	{
		id: 1,
		title: '2- Andijon',
		price: 396000000,
		address: 'Andijon.sh komolon .k',
		deadline: '24.08.2024',
		installmentMonths: 29,
		condition: 'Korobka',
		floor: 16,
		mainImage:
			'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
		innerImage:
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
	},
	{
		id: 2,
		title: '3- Toshkent',
		price: 520000000,
		address: 'Toshkent.sh Chilonzor tumani',
		deadline: '15.06.2025',
		installmentMonths: 36,
		condition: 'Evrotamir',
		floor: 12,
		mainImage:
			'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
	},
	{
		id: 3,
		title: '1- Samarqand',
		price: 310000000,
		address: 'Samarqand.sh Registon mahallasi',
		deadline: '30.11.2024',
		installmentMonths: 24,
		condition: 'Qora toza',
		floor: 9,
		mainImage:
			'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D',
	},
	{
		id: 4,
		title: '4- Buxoro',
		price: 280000000,
		address: 'Buxoro.sh Ark yoni',
		deadline: '10.03.2025',
		installmentMonths: 18,
		condition: 'Qora toza',
		floor: 7,
		mainImage:
			'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww',
	},
	{
		id: 5,
		title: "5- Farg'ona",
		price: 350000000,
		address: "Farg'ona.sh Yangi turar-joy",
		deadline: '05.09.2024',
		installmentMonths: 30,
		condition: 'Evrotamir',
		floor: 14,
		mainImage:
			'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
		innerImage:
			'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww',
	},
	{
		id: 6,
		title: '6- Namangan',
		price: 330000000,
		address: 'Namangan.sh Yangi hayot',
		deadline: '20.12.2024',
		installmentMonths: 27,
		condition: 'Korobka',
		floor: 11,
		mainImage:
			'https://images.unsplash.com/photo-1559060017-445fb9722f2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww',
	},
	{
		id: 7,
		title: '7- Qarshi',
		price: 270000000,
		address: "Qarshi.sh Mustaqillik ko'chasi",
		deadline: '01.07.2025',
		installmentMonths: 22,
		condition: 'Qora toza',
		floor: 8,
		mainImage:
			'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1617098474202-0d0d7f60c56b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww',
	},
	{
		id: 8,
		title: '8- Xiva',
		price: 290000000,
		address: "Xiva.sh Ichan-Qal'a yaqini",
		deadline: '25.04.2025',
		installmentMonths: 25,
		condition: 'Evrotamir',
		floor: 6,
		mainImage:
			'https://images.unsplash.com/photo-1577552568192-467a12a7f376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
		innerImage:
			'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDB8fDB8fHww',
	},
]
