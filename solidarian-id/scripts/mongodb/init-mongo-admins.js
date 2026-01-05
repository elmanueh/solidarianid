// Script de inicialización de MongoDB para SolidarianID
// Este script crea la base de datos y los administradores iniciales

// Conexión a la base de datos
let db = db.getSiblingDB('solidarianid');

// Crear colección de administradores si no existe
db.createCollection('administrators');

// Datos de los administradores iniciales
// Contraseña para todos: Admin2024!Pass (cumple con: ≥12 chars, mayúscula, número, especial)
// Hash generado con bcrypt (rounds: 10)
//const bcryptHash =
//  '$2b$10$YQKBvvQ5XZ5h5K5h5K5h5u7XcO9Y5XZJZHXZJZHXZJZHXZJZHabcd'; // Admin2024!Pass

const administrators = [
  {
    _id: '550e8400-e29b-41d4-a716-446655440001',
    fullname: 'Sergio García Martínez',
    email: 'sergio.garcia@solidarianid.org',
    phone: '+34612345001',
    password: '$2b$10$JfG.9oSu4kdEk8X3EVb0UO.W6dhczhEmbMeh/DFemc.C3aWWUk/2a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440002',
    fullname: 'Fabián Rodríguez López',
    email: 'fabian.rodriguez@solidarianid.org',
    phone: '+34612345002',
    password: '$2b$10$KdEVcjeISvubnkzuttlClu79MJzlbkG0CGcGTsbrOK6hz8YnMWJ.6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440003',
    fullname: 'Pablo Fernández Sánchez',
    email: 'pablo.fernandez@solidarianid.org',
    phone: '+34612345003',
    password: '$2b$10$7dM48dzIeh0bPlR3RYjmKekvBf12z1tRyLHwcIg6ptJoV.Tib110e',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440004',
    fullname: 'Antonio Martín González',
    email: 'antonio.martin@solidarianid.org',
    phone: '+34612345004',
    password: '$2b$10$3Nq1wC/3LHLlIH8RKBR13eaSUdLR7hGq6ng4FiZ9TzfommFiurpW2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '550e8400-e29b-41d4-a716-446655440005',
    fullname: 'Manuel Pérez Ruiz',
    email: 'manuel.perez@solidarianid.org',
    phone: '+34612345005',
    password: '$2b$10$Dtg1KCQDwrKSku61QSLeWOZWO.y/ZgzJItk7Xnsl/b0sBrAeQEGKa',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Insertar administradores solo si la colección está vacía
const count = db.administrators.countDocuments();
if (count === 0) {
  db.administrators.insertMany(administrators);
  print('5 administradores iniciales creados correctamente');
  print('');
  print('Credenciales de acceso:');
  print('=====================================');
  administrators.forEach((admin, index) => {
    print(`${index + 1}. ${admin.fullname}`);
    print(`   Email: ${admin.email}`);
    print(`   Password: Admin2024!Pass`);
    print('');
  });
  print('IMPORTANTE: Cambia las contraseñas después del primer acceso');
} else {
  print('La colección ya contiene administradores. No se insertaron datos.');
}

// Crear índices para mejorar el rendimiento
db.administrators.createIndex({ email: 1 }, { unique: true });
db.administrators.createIndex({ phone: 1 }, { unique: true });

print('Inicialización de MongoDB completada');
