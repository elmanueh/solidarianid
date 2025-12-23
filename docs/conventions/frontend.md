# Convenciones de Frontend

Este documento establece las convenciones y mejores prácticas para el desarrollo frontend de SolidarianID, asegurando consistencia y unicidad con el diseño desarrollado por cada uno de los integrantes del equipo.

## Paleta de colores establecida

Mediante la herramienta Coolors y la rueda Cromática de Figma:
https://coolors.co/308dc0-e67c27-78a33c-d3be89-7a2626

## Reglas rápidas

- Llamadas/Acciones principales = Azul #308DC0
- Mensajes/Notificaciones de éxito = Verde #78A33C
- Mensajes/Notificaciones de advertencia = Naranja #E67C27
- Mensajes/Notificaciones de error = Tarracota #7a2626ff
- Areas con información personal/secundaria = Beige #D3BE89
- Layout/Fondos = Neutros #FFFFFF #F7F8FA #EEF1F4 #D9DEE5 #6B7280
- Se puede usar variantes de los principales siempre y cuando mantengan la intención original. Ejemplo: hover, active, disabled, etc.
- Usar código HEX para colores directamente está prohibido, siempre usar variables de CSS o tokens de diseño.
- Los estados no se comunican solo con color, siempre debe haber un ícono o texto que lo acompañe.
- El contraste entre el texto y el fondo debe ser al menos 4.5:1 para cumplir con las normas de accesibilidad. Es decir si tu fondo es claro, el texto debe ser oscuro y viceversa. Si el texto es #ffffff, como mínimo el fondo debe ser 600 niveles más oscuro #757575. Usar: https://webaim.org/resources/contrastchecker/
- Jerarquía calmada, no me uses todo el rato colores vivos, sobre todo para poner intención.

## Tabla de colores

| Contexto            | Usar                  | Evitar                                  | Hexadecimal recomendado                 |
| ------------------- | --------------------- | --------------------------------------- | --------------------------------------- |
| CTA principal       | Azul UI 600 sólido    | Naranja (parece warning)                | #308DC0                                 |
| Navegación          | Neutros + azul activo | Verde/rojizo (parece estado)            | #FFFFFF #F7F8FA #EEF1F4 #D9DEE5 #6B7280 |
| Success             | Verde                 | Verde como color “de marca” global      | #78A33C                                 |
| Warning             | Naranja               | Naranja cerca de CTA azul sin jerarquía | #E67C27                                 |
| Error/destructivo   | Rojizo                | Rojizo para valores neutros             | #7A2626                                 |
| Secciones “humanas” | Beige suave (fondo)   | Beige como texto/icono principal        | #D3BE89                                 |
| Fondos              | Neutros suaves        | Colores vivos                           | #FFFFFF                                 |
| Texto principal     | Neutros oscuros       | Colores vivos                           | #111827                                 |
| Texto secundario    | Neutros medios        | Colores vivos                           | #4B5563                                 |
| Texto muted         | Neutros claros        | Colores vivos                           | #6B7280                                 |

## Tipografía

## Iconos

Se hará uso de la página https://yesicon.app/ para buscar iconos que se adapten al diseño. En caso de no encontrar un icono adecuado, se podrá crear uno personalizado siguiendo las siguientes pautas:

- Mantener un estilo consistente con los iconos existentes en cuanto a grosor de línea, tamaño y forma.
- Utilizar SVG para la creación de iconos personalizados, asegurando que sean escalables y de alta calidad.
- Si el icono empleado no existe en la librería, se depositará en la carpeta /icons en formato texto-largoxalto.[extensión]. Ejemplo: search-24x24.svg

## Accesibilidad

- Usar siempre etiquetas semánticas de HTML5.
- Asegurar que todos los elementos interactivos sean accesibles mediante teclado. Esto se logra utilizando atributos como `tabindex` y asegurando que los elementos tengan un enfoque visible.
- Proporcionar texto alternativo para todas las imágenes y elementos multimedia utilizando el atributo `alt`.
- Asegurar que los formularios tengan etiquetas asociadas correctamente utilizando la etiqueta `<label>`.
- Utilizar roles ARIA (apartado siguiente) y atributos para mejorar la accesibilidad de los componentes personalizados.
- Texto normal >= 4.5:1 de contraste con el fondo.
- Texto grande >= 3:1

## Atributos HTML para accesibilidad

- `tabindex`: Controla el orden de tabulación de los elementos interactivos. Si es positivo, el elemento se enfoca en el orden especificado; si es cero, sigue el orden natural; si es negativo, el elemento no es accesible mediante tabulación.
  - `tabindex="0"`: El elemento es enfocable y sigue el orden natural de tabulación. Puede lograr que un `<div>` o `<span>` sea enfocable.
  - `tabindex="-1"`: El elemento es enfocable pero no es accesible mediante tabulación.
- En imágenes e iconos, usar siempre el atributo `alt` para proporcionar texto alternativo que describa la imagen. Si la imagen es decorativa, usar `alt=""`. Si la descripción es larga, usar `aria-describedby` para referenciar un elemento que contenga la descripción completa en la página. Esto permite describir varias imágenes con un solo texto.
- En formularios, usar la etiqueta `<label>` para asociar etiquetas con campos de entrada. Esto mejora la accesibilidad al permitir que los lectores de pantalla identifiquen correctamente los campos.
- Si usas `target="_blank"` en un enlace, dilo explícitamente en el texto del enlace o usa `aria-label` para informar a los usuarios que el enlace se abrirá en una nueva pestaña o ventana.
- Si hay una barra de navegación muy larga, usa skipnav para que los usuarios de lectores de pantalla puedan saltar directamente al contenido principal. hay dos visible e invisible. Ejemplos:

  ```html
  <body>
    <a href="#maincontent">Saltar al contenido principal</a>

    <nav>...</nav>

    <main id="maincontent">
      <h1>Título</h1>
    </main>
  </body>
  ```

  ```html
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px;
      z-index: 100;
    }

    .skip-link:focus {
      top: 0;
    }
  </style>
  <a href="#maincontent" class="skip-link">Saltar al contenido</a>

  <main id="maincontent" tabindex="-1">
    <h1>Título</h1>
  </main>
  ```

- Usar la etiqueta `abbr` para abreviaciones y acrónimos, proporcionando el significado completo en el atributo `title`. Ejemplo: `<abbr title="As Soon As Possible">ASAP</abbr>` al menos una o dos veces en el documento.
- Poner en las tablas la etiqueta `caption`, `scope` y `summary` para mejorar la accesibilidad de las tablas. Ejemplo:

  ```html
  <table>
    <caption>
      Lista de usuarios
    </caption>
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Correo electrónico</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Juan Pérez</th>
        <td>juan.perez@example.com</td>
      </tr>
    </tbody>
  </table>
  ```

- Evitar usar `mouseover`, `mouseout` y otros eventos que dependan del ratón para interacciones importantes. En su lugar, usar eventos que funcionen con teclado y pantallas táctiles como `focus`, `blur`, `click`.
- El evento `click`suele funcionar con enter si es un botón o enlace, pero si es un div o span, hay que añadir un listener para `keydown` y comprobar si la tecla es enter o espacio. Ejemplo:

  ```javascript
  element.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      // Acción a realizar
    }
  });
  ```

- Los navegadores no proporcionan buenos controles para los videos, se podria configurar botones customizados con accesibilidad. Ejemplo:

```html
<section class="player">
  <video controls>
    <source src="rabbit320.mp4" type="video/mp4" />
    <source src="rabbit320.webm" type="video/webm" />
    <p>
      Your browser doesn't support HTML video. Here is a
      <a href="rabbit320.mp4">link to the video</a> instead.
    </p>
  </video>

  <div class="controls">
    <button class="play-pause">Play</button>
    <button class="stop">Stop</button>
  </div>
</section>
```

```js
const playPauseBtn = document.querySelector('.play-pause');
const stopBtn = document.querySelector('.stop');
const player = document.querySelector('video');
player.removeAttribute('controls'); // borramos controles nativos

playPauseBtn.onclick = () => {
  if (player.paused) {
    player.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    player.pause();
    playPauseBtn.textContent = 'Play';
  }
};

stopBtn.onclick = () => {
  player.pause();
  player.currentTime = 0;
  playPauseBtn.textContent = 'Play';
};
```

- Poner transcripciones en los videos y audios para personas con discapacidad auditiva. Usar IAs como [TRINT](https://trint.com/) o [TRANSCRIBEAR](https://transcribear.com/) para generar transcripciones automáticas y luego corregirlas manualmente. Si no es muy importante, añadir subtítulos o una descripción textual del contenido. Otra opción es añadir los subtítulos directamente en el video usando la etiqueta `<track>`:

```html
<video id="video" controls preload="metadata">
  <source src="/shared-assets/videos/sintel-short.mp4" type="video/mp4" />
  <source src="/shared-assets/videos/sintel-short.webm" type="video/webm" />
  <track
    label="English"
    kind="subtitles"
    srclang="en"
    src="/shared-assets/misc/sintel-en.vtt"
    default
  />
</video>
```

```txt
WEBVTT
00:00:00.000 --> 00:00:02.000
This is an example of subtitles.
00:00:02.000 --> 00:00:04.000
They help people understand the video content.
```

- Usar imagenes en formato SVG siempre que sea posible para mejorar la calidad y accesibilidad de las imágenes. Siempre se mantendrán nítido independientemente del tamaño o resolución de pantalla.

```html
## ¿Cuando uso un ROLE ARIA?

Uso de roles ARIA para mejorar la accesibilidad de los componentes personalizados [ROLES ARIA](https://w3c.github.io/aria/#role_definitions). Algunos roles comunes incluyen:

- `role="dialog"`: Para ventanas modales o diálogos.
- `role="alert"`: Para mensajes de alerta que deben ser anunciados inmediatamente por los lectores de pantalla.
- `role="navigation"`: Para barras de navegación.
- `role="progressbar"`: Para barras de progreso.
- `role="slider"`: Para controles deslizantes.
- `role="combobox"`: Para menús desplegables.
- `role="menu"` y `role="menuitem"`: Para menús de navegación.
- `role="tree"` y `role="treeitem"`: Para estructuras de árbol.
- `role="checkbox"`: Para elementos que actúan como casillas de verificación pero no son `<input type="checkbox">`.
- `role="radiogroup"`: Para grupos de botones de opción.
- `role="textbox"`: Para áreas de texto editables que no son `<input>` o `<textarea>`.
- `role="heading"`: Para encabezados que no usan etiquetas `<h1>` a `<h6>`.
- `role="separator"`: Para divisores entre secciones de contenido.
- `role="landmark"`: Para áreas importantes de la página que ayudan en la navegación.
- `role="application"`: Para aplicaciones web complejas que requieren un manejo especial por parte de los lectores de pantalla.
- `role="document"`: Para contenido que debe ser tratado como un documento independiente.
- `role="grid"` y `role="gridcell"`: Para tablas de datos complejas.
- `role="columnheader"` y `role="rowheader"`: Para encabezados de columnas y filas en tablas de datos.
- `role="figure"`: Para elementos que contienen imágenes o gráficos con leyendas.
- `role="log"`: Para áreas que muestran actualizaciones en tiempo real.
- `role="math"`: Para contenido matemático.
- `role="note"`: Para notas o comentarios adicionales.
- `role="button"`: Para elementos que actúan como botones pero no son `<button>`.

Si no son etiquetas semánticas nativas de HTML5, usar roles ARIA para mejorar la accesibilidad con el rol que mejor describa la función del elemento. Ejemplo: un `<div>` que actua como enlace debe tener `role="link"`.

¿Cuando uso un ATTRIBUTE ARIA?
Uso de atributos ARIA para proporcionar información adicional sobre el estado o la función de los elementos [ROLES ARIA](https://w3c.github.io/aria/#role_definitions).. Algunos atributos comunes incluyen:

- `aria-label`: Proporciona una etiqueta accesible para un elemento.
- `aria-labelledby`: Referencia a otro elemento que proporciona la etiqueta accesible.
- `aria-describedby`: Referencia a otro elemento que proporciona una descripción adicional.
- `aria-hidden`: Indica si un elemento debe ser ignorado por los lectores de pantalla
- `aria-live`: Indica si un elemento debe ser anunciado automáticamente por los lectores de pantalla cuando su contenido cambia. Los valores comunes son `assertive`, `polite` y `off` de más a menos prioridad.
- `aria-checked`: Indica el estado de una casilla de verificación o botón de opción.
- `aria-expanded`: Indica si un elemento expandible está actualmente expandido o colapsado.
- `aria-selected`: Indica si un elemento está seleccionado.
- `aria-pressed`: Indica el estado de un botón que puede ser presionado.
- `aria-required`: Indica si un campo de formulario es obligatorio.
- `aria-invalid`: Indica si el valor de un campo de formulario es inválido.
- `aria-controls`: Referencia a otro elemento que es controlado por el elemento actual.
- `aria-haspopup`: Indica si un elemento tiene un menú emergente asociado.
- `aria-atomic`: Indica si un elemento es atómico, es decir, si debe ser tratado como una unidad completa por los lectores de pantalla.
- `aria-relevant`: Indica si un elemento es relevante para el usuario en el contexto actual.
- `aria-valuemin` y `aria-valuemax`: Indican los valores mínimo y máximo de un control deslizante o barra de progreso.

## ¿Como compruebo que un componente es válido?

- No tiene código HEX hardcodeado. [x]
- El contraste AA o AAA ha sido verificado en todo (texto, focus, inputs), esto con Silktide es facilísimo [x]
- Los estados no solo dependen de un color (estado + icono) [x]
- Todos los elementos tienen etiquetas semánticas o roles ARIA [x]
- Los elementos usados pasan las normas mencionadas en https://www.w3.org/WAI/standards-guidelines/act/rules/, con silktide es facilisimo[x]

## Herramientas recomendadas

- Extensión de Chrome Accessibility Insights:
  https://chromewebstore.google.com/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni
- Herramienta de contraste de WebAIM:
  https://webaim.org/resources/contrastchecker/
- Evaluador de accesibilidad Silktide visual (extensión de Chrome):
  https://silktide.com/toolbar/
- Guía para desarrollar bien con accesibilidad:
  https://developer.mozilla.org/es/docs/Learn_web_development/Core/Accessibility
```
