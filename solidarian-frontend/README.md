# Estructura de Rutas Next.js (App Router)

Este documento describe la estructura actual de app/, el tipo de cada ruta (normal, dinámica, grupo, etc.) y qué se hace en cada una.
También incorpora la nueva organización del flujo de autenticación, la jerarquía de configuración dentro de perfil y la estructura contextual de comunidad y causa.

## Arbol de rutas y propósito

```text
app/
├── (auth)/                                     [Grupo de rutas]
│   ├── layout.tsx                              [Layout de autenticación]
│   ├── page.tsx                                /                               [Ruta normal]   -> Login
│   └── register/
│       ├── page.tsx                            /register                       [Ruta normal]   -> Registro
│       └── onboarding/
│           └── page.tsx                        /register/onboarding            [Ruta normal]   -> Configuración inicial tras el registro
│
├── (app)/                                      [Grupo de rutas]
│   ├── layout.tsx                              [MainLayout de la app]
│   │
│   ├── home/
│   │   └── page.tsx                            /home                           [Ruta normal]   -> Feed principal
│   │
│   ├── explore/
│   │   └── page.tsx                            /explore                        [Ruta normal]   -> Explorar comunidades/causas
│   │
│   ├── favorites/
│   │   ├── page.tsx                            /favorites                      [Ruta normal]   -> Favoritos del usuario
│   │   └── requests/
│   │       └── create/
│   │           └── page.tsx                    /favorites/requests/create      [Ruta normal]   -> Crear solicitud de unión a comunidad
│   │
│   ├── notifications/
│   │   └── page.tsx                            /notifications                  [Ruta normal]   -> Notificaciones
│   │
│   ├── profile/
│   │   ├── page.tsx                            /profile                        [Ruta normal]   -> Perfil / dashboard del usuario
│   │   └── settings/
│   │       ├── page.tsx                        /profile/settings               [Ruta normal]   -> Menú de configuración
│   │       ├── requests/
│   │       │   └── page.tsx                    /profile/settings/requests      [Ruta normal]   -> Mis solicitudes
│   │       ├── personal-info/
│   │       │   └── page.tsx                    /profile/settings/personal-info [Ruta normal]   -> Información personal
│   │       ├── impact/
│   │       │   └── page.tsx                    /profile/settings/impact        [Ruta normal]   -> Preferencias de impacto
│   │       ├── privacy/
│   │       │   └── page.tsx                    /profile/settings/privacy       [Ruta normal]   -> Privacidad y seguridad
│   │       └── help/
│   │           └── page.tsx                    /profile/settings/help          [Ruta normal]   -> Centro de ayuda
│   │
│   └── communities/                             [Ruta accesible desde cualquier sitio]
│       └── [communityId]/
│           ├── layout.tsx                      [Layout contextual de comunidad]
│           ├── page.tsx                        /communities/[communityId]                                [Ruta dinámica] -> Sobre nosotros
│           └── causes/
│               ├── page.tsx                    /communities/[communityId]/causes                         [Ruta normal + parámetro dinámico padre] -> Causas activas
│               ├── requests/
│               │   └── create/
│               │       └── page.tsx            /communities/[communityId]/causes/requests/create           [Ruta normal + parámetros dinámicos padre] -> Solicitar nueva causa
│               └── [causeId]/
│                   ├── layout.tsx              [Layout contextual de causa]
│                   ├── page.tsx                /communities/[communityId]/causes/[causeId]              [Ruta dinámica] -> Detalle de causa
│                   ├── requests/
│                   │   └── create/
│                   │       └── page.tsx        /communities/[communityId]/causes/[causeId]/requests/create [Ruta normal + parámetros dinámicos padre] -> Solicitar nueva acción
│                   │
│                   └── actions/
│                       └── [actionId]/
│                           ├── layout.tsx      [Layout contextual de acción]
│                           └── page.tsx        /communities/[communityId]/causes/[causeId]/actions/[actionId] [Ruta dinámica] -> Detalle de acción
│
├── layout.tsx                                  [Root Layout global]
└── not-found.tsx                               [404 global]
```

## Tipos de rutas usados

- Ruta normal: carpetas con nombre fijo + page.tsx (ej. /home, /profile/settings/help).
- Ruta dinámica: segmentos con corchetes ([communityId], [causeId], [actionId]).
- Grupo de rutas: carpetas entre paréntesis ((auth), (app)), organizan layouts pero no aparecen en la URL.
- Layout anidado: layout.tsx por nivel para compartir UI contextual.
- Not found global: app/not-found.tsx para 404.

## Mapeo de URLs resultantes

### Autenticación

- `/` -> Login
- `/register` -> Registro
- `/register/onboarding` -> Onboarding

### App principal

- `/home` -> Feed
- `/explore` -> Explorar
- `/favorites` -> Favoritos (se llama mi causas en el diseño)
- `/favorites/requests/create` -> Crear solicitud de unión a comunidad
- `/notifications` -> Notificaciones

### Perfil

- `/profile` -> Perfil
- `/profile/settings` -> Configuración
- `/profile/settings/requests` -> Mis solicitudes
- `/profile/settings/personal-info` -> Información personal
- `/profile/settings/impact` -> Preferencias de impacto
- `/profile/settings/privacy` -> Privacidad y seguridad
- `/profile/settings/help` -> Centro de ayuda

### Jerarquía de entidades

- `/community/[communityId]` -> Sobre nosotros
- `/community/[communityId]/causes` -> Causas activas
- `/community/[communityId]/causes/requests/create` -> Solicitar causa
- `/community/[communityId]/causes/[causeId]` -> Causa
- `/community/[communityId]/causes/[causeId]/requests/create` -> Solicitar acción
- `/community/[communityId]/causes/[causeId]/actions/[actionId]` -> Acción
