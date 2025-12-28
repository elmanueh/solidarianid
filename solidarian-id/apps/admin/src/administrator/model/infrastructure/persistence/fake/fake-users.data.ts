/**
 * Datos mock de usuarios para prototipado
 * Este archivo contiene un conjunto de usuarios falsos para desarrollo sin base de datos
 */

export interface FakeUserData {
  id: string;
  username: string;
  phone: string;
  location: {
    city: string;
    countryCode: string;
  };
  communityMemberships: Array<{
    communityId: string;
    communityName: string;
    isAdmin: boolean;
  }>;
}

/**
 * Array de usuarios fake con datos realistas
 */
export const FAKE_USERS: FakeUserData[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'juanperez',
    phone: '+34612345678',
    location: {
      city: 'Madrid',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440001',
        communityName: 'Voluntarios por la Educación',
        isAdmin: true,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440003',
        communityName: 'Acción Climática Global',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    username: 'marialopez',
    phone: '+34623456789',
    location: {
      city: 'Barcelona',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440001',
        communityName: 'Voluntarios por la Educación',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440002',
        communityName: 'Agua para Todos',
        isAdmin: true,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440005',
        communityName: 'Igualdad de Género',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    username: 'carlosruiz',
    phone: '+34634567890',
    location: {
      city: 'Valencia',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440004',
        communityName: 'Salud para Todos',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    username: 'anagonzalez',
    phone: '+34645678901',
    location: {
      city: 'Sevilla',
      countryCode: 'ES',
    },
    communityMemberships: [],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'luisrodriguez',
    phone: '+52155123456',
    location: {
      city: 'Ciudad de México',
      countryCode: 'MX',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440002',
        communityName: 'Agua para Todos',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440006',
        communityName: 'Energía Sostenible',
        isAdmin: true,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    username: 'lauramartinez',
    phone: '+541143210987',
    location: {
      city: 'Buenos Aires',
      countryCode: 'AR',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440003',
        communityName: 'Acción Climática Global',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440007',
        communityName: 'Ciudades Sostenibles',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    username: 'davidhernandez',
    phone: '+34656789012',
    location: {
      city: 'Bilbao',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440005',
        communityName: 'Igualdad de Género',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    username: 'sofiatorres',
    phone: '+573001234567',
    location: {
      city: 'Bogotá',
      countryCode: 'CO',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440001',
        communityName: 'Voluntarios por la Educación',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440004',
        communityName: 'Salud para Todos',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440008',
        communityName: 'Trabajo Digno',
        isAdmin: true,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    username: 'javiermoreno',
    phone: '+34667890123',
    location: {
      city: 'Málaga',
      countryCode: 'ES',
    },
    communityMemberships: [],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    username: 'carmengomez',
    phone: '+34678901234',
    location: {
      city: 'Zaragoza',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440006',
        communityName: 'Energía Sostenible',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440009',
        communityName: 'Reducir Desigualdades',
        isAdmin: true,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    username: 'pedroalvarez',
    phone: '+56912345678',
    location: {
      city: 'Santiago',
      countryCode: 'CL',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440002',
        communityName: 'Agua para Todos',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    username: 'isabelsanchez',
    phone: '+34689012345',
    location: {
      city: 'Granada',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440003',
        communityName: 'Acción Climática Global',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440007',
        communityName: 'Ciudades Sostenibles',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440010',
        communityName: 'Paz y Justicia',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    username: 'miguelcastro',
    phone: '+34690123456',
    location: {
      city: 'Murcia',
      countryCode: 'ES',
    },
    communityMemberships: [],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    username: 'rosavargas',
    phone: '+51987654321',
    location: {
      city: 'Lima',
      countryCode: 'PE',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440005',
        communityName: 'Igualdad de Género',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440008',
        communityName: 'Trabajo Digno',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440015',
    username: 'antoniofernandez',
    phone: '+34601234567',
    location: {
      city: 'Palma de Mallorca',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440004',
        communityName: 'Salud para Todos',
        isAdmin: true,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440009',
        communityName: 'Reducir Desigualdades',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440016',
    username: 'beatrizlopez',
    phone: '+34612345670',
    location: {
      city: 'Alicante',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440001',
        communityName: 'Voluntarios por la Educación',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440017',
    username: 'franciscojimenez',
    phone: '+593987654321',
    location: {
      city: 'Quito',
      countryCode: 'EC',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440006',
        communityName: 'Energía Sostenible',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440010',
        communityName: 'Paz y Justicia',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440018',
    username: 'elenarodriguez',
    phone: '+34623456780',
    location: {
      city: 'Valladolid',
      countryCode: 'ES',
    },
    communityMemberships: [],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440019',
    username: 'ramongarcia',
    phone: '+34634567891',
    location: {
      city: 'Santander',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440007',
        communityName: 'Ciudades Sostenibles',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440009',
        communityName: 'Reducir Desigualdades',
        isAdmin: false,
      },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    username: 'pilarmartinez',
    phone: '+34645678902',
    location: {
      city: 'Córdoba',
      countryCode: 'ES',
    },
    communityMemberships: [
      {
        communityId: '650e8400-e29b-41d4-a716-446655440002',
        communityName: 'Agua para Todos',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440005',
        communityName: 'Igualdad de Género',
        isAdmin: false,
      },
      {
        communityId: '650e8400-e29b-41d4-a716-446655440008',
        communityName: 'Trabajo Digno',
        isAdmin: false,
      },
    ],
  },
];
