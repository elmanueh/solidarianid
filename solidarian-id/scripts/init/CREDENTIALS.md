# 🚀 Inicialización Completada

Se han creado **5 administradores** en la base de datos MongoDB.

## 📋 Credenciales de Acceso

| #   | Nombre                  | Email                               | Teléfono     | Contraseña       |
| --- | ----------------------- | ----------------------------------- | ------------ | ---------------- |
| 1   | Sergio García Martínez  | `sergio.garcia@solidarianid.org`    | +34612345001 | `Admin2024!Pass` |
| 2   | Fabián Rodríguez López  | `fabian.rodriguez@solidarianid.org` | +34612345002 | `Admin2024!Pass` |
| 3   | Pablo Fernández Sánchez | `pablo.fernandez@solidarianid.org`  | +34612345003 | `Admin2024!Pass` |
| 4   | Antonio Martín González | `antonio.martin@solidarianid.org`   | +34612345004 | `Admin2024!Pass` |
| 5   | Manuel Pérez Ruiz       | `manuel.perez@solidarianid.org`     | +34612345005 | `Admin2024!Pass` |

## Comandos Útiles

### Iniciar la aplicación

```bash
npm run start:dev admin
```

### Verificar datos en MongoDB

```bash
docker exec mongo mongosh -u test -p test --authenticationDatabase admin solidarianid --eval "db.administrators.find().pretty()"
```

### Contar administradores

```bash
docker exec mongo mongosh -u test -p test --authenticationDatabase admin solidarianid --eval "db.administrators.countDocuments()"
```

### Reinicializar la base de datos

```bash
docker-compose down
rm -rf data/mongodb/*
docker-compose up -d mongo
```

- Las contraseñas son **solo para desarrollo**
- En producción, cada administrador debe cambiar su contraseña inmediatamente
- No versionar archivos con contraseñas en texto plano
- Usar variables de entorno seguras para credenciales de producción

- El script de inicialización (`init-mongo.js`) se ejecuta automáticamente la primera vez que se inicia MongoDB
- Si la colección ya contiene datos, no los vuelve a insertar
- Los índices únicos evitan duplicados de email y teléfono
