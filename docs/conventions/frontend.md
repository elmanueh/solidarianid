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
- Utilizar roles ARIA y atributos para mejorar la accesibilidad de los componentes personalizados.
- Texto normal >= 4.5:1 de contraste con el fondo.
- Texto grande >= 3:1

## ¿Como compruebo que un componente es válido?

- No tiene código HEX hardcodeado. [x]
- El contraste AA o AAA ha sido verificado en todo (texto, focus, inputs) [x]
- Los estados no solo dependen de un color (estado + icono) [x]
- Todos los elementos tienen etiquetas semánticas o roles ARIA [x]
- Los elementos usados pasan las normas mencionadas en https://www.w3.org/WAI/standards-guidelines/act/rules/ [x]

## Herramientas recomendadas

- Extensión de Chrome Accessibility Insights:
  https://chromewebstore.google.com/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni
- Herramienta de contraste de WebAIM:
  https://webaim.org/resources/contrastchecker/
- Evaluador de accesibilidad Silktide:
  https://silktide.com/toolbar/
- Guía para desarrollar bien con accesibilidad:
  https://developer.mozilla.org/es/docs/Learn_web_development/Core/Accessibility
