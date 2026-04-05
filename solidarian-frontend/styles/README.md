# Dark Mode & Styling Guide

## 🎨 Sistema de Colores Semánticos

El proyecto usa el sistema de colores definido en `globals.css`. **NO crear nuevos tokens de color** - usa los colores semánticos existentes.

### Colores principales de `globals.css`:

#### Colores de UI (adaptativos light/dark):

- `bg-background` / `text-foreground` - Fondo y texto principal
- `bg-card` / `text-card-foreground` - Tarjetas y contenedores
- `bg-primary` / `text-primary` - Color primario del tema
- `bg-secondary` / `text-secondary` - Color secundario
- `bg-muted` / `text-muted-foreground` - Elementos atenuados
- `bg-accent` / `text-accent-foreground` - Elementos de acento
- `bg-destructive` / `text-destructive` - Errores y acciones destructivas
- `border-border` - Bordes
- `ring-ring` - Focus rings

#### Colores de gráficos (para elementos de UI):

- `chart-1` - Naranja (para destacados/featured)
- `chart-2` - Azul (para comunidades/links principales)
- `chart-3` - Morado oscuro
- `chart-4` - Verde (para causas)
- `chart-5` - Naranja/Rosa (para favoritos)

### Mapeo de elementos del proyecto:

```tsx
// ✅ Comunidades
className = 'text-chart-2 hover:bg-chart-2/10';

// ✅ Causas
className = 'bg-chart-4 text-primary-foreground';

// ✅ Destacados/Featured
className = 'bg-chart-1/10 text-chart-1';

// ✅ Favoritos
className = 'text-chart-5 bg-chart-5/10';

// ✅ Links de navegación
className = 'text-foreground hover:text-chart-2';
```

## 📁 Estructura de Estilos

Los estilos están organizados en la carpeta `styles/` siguiendo la misma estructura de `app/`:

```
styles/
├── README.md                           # Esta guía
├── app/
│   └── home/
│       └── page.styles.ts             # Estilos de Home page
└── components/
    ├── CommunityCard.styles.ts        # Estilos de CommunityCard
    └── CauseCard.styles.ts            # Estilos de CauseCard
```

### Cómo usar archivos de estilos:

```tsx
// Importar estilos
import { homeStyles } from '@/styles/app/home/page.styles';

export default function HomePage() {
  const styles = homeStyles;

  return (
    <div className={styles.container}>
      <h1 className={styles.header.title}>Hello</h1>
    </div>
  );
}
```

## 🌓 Dark Mode

El proyecto usa `next-themes` para el dark mode:

### Todos los colores se adaptan automáticamente:

```tsx
// ✅ Se adapta automáticamente
<div className="border-border bg-card text-foreground">
  <p className="text-muted-foreground">Subtítulo</p>
  <span className="text-chart-2">Link</span>
</div>
```

### Toggle de tema:

```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
setTheme('dark'); // o 'light' o 'system'
```

### Atajo de teclado:

Presiona `d` para alternar entre modo claro y oscuro.

## ✅ Componentes actualizados

Todos los siguientes componentes soportan dark mode usando colores semánticos:

- ✅ CommunityCard (usa `chart-2` para azul)
- ✅ CauseCard (usa `chart-4` para verde, `chart-5` para favoritos)
- ✅ Home page (usa `chart-1` para destacados, `chart-4` para causas)
- ✅ AppLayout
- ✅ Profile pages
- ✅ Todos los componentes UI (button, card, input, etc.)

## 📝 Guía de migración

Si necesitas actualizar un componente para dark mode:

1. **Usa colores semánticos de globals.css:**

   ```tsx
   // ❌ NUNCA hagas esto
   <div className="text-[#1A2D54] bg-white">

   // ✅ Usa colores semánticos
   <div className="text-foreground bg-card">

   // ✅ O colores de gráficos para elementos específicos
   <div className="text-chart-2 bg-chart-2/10">
   ```

2. **Para elementos temáticos específicos:**

   ```tsx
   // ❌ NO crees nuevos tokens
   --brand-community: #40A9FF;

   // ✅ Usa chart colors existentes
   className="text-chart-2"  // Azul para comunidades
   className="text-chart-4"  // Verde para causas
   className="text-chart-1"  // Naranja para destacados
   className="text-chart-5"  // Rosa para favoritos
   ```

3. **Extrae estilos largos a archivos:**
   - Crea archivo en `styles/` correspondiente
   - Exporta objeto con clases usando colores semánticos
   - Importa y usa en el componente

## 🎯 Variables disponibles en globals.css

### Light mode:

- `--foreground`: oklch(0.145 0 0) - Texto oscuro
- `--background`: #ffffff - Fondo blanco
- `--muted-foreground`: #717182 - Texto atenuado
- `--chart-1`: naranja
- `--chart-2`: azul
- `--chart-4`: verde
- `--chart-5`: naranja/rosa

### Dark mode:

- `--foreground`: oklch(0.985 0 0) - Texto claro
- `--background`: oklch(0.145 0 0) - Fondo oscuro
- `--muted-foreground`: oklch(0.708 0 0) - Texto atenuado
- Los `--chart-*` se adaptan automáticamente

## 🚫 NO hacer

- ❌ NO crear nuevos tokens de color (--brand-\*, etc.)
- ❌ NO usar colores hardcodeados (#40A9FF, etc.)
- ❌ NO usar dark: variant manualmente - déjalo al sistema
- ❌ NO usar text-gray-600, bg-blue-500, etc.

## ✅ SÍ hacer

- ✅ Usar colores semánticos: foreground, background, card, etc.
- ✅ Usar chart-\* para elementos temáticos
- ✅ Dejar que dark mode se adapte automáticamente
- ✅ Extraer estilos largos a archivos separados
