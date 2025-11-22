# SolidarianID

Repositorio del equipo 3 para la realización de nuestra propuesta de solución de SolidarianID.

## CheckList de entregables por asignatura

### Requisitos funcionales frontend

- [ ] Arquitectura MVC Web sobre la plataforma NestJS e integrado con el backend desarrollado. Es un requisito utilizar, al menos una vez en alguna vista, las tecnologías (se valorará el uso significativo de las distintas tecnologías):

- [ ] a) CSS Flexbox, Grid y Media Queries en el diseño de las páginas web;

  - CSS flexbox
  - CSS Grid
  - CSS Media Queries

- [ ] b) La definición de páginas CSS utilizando Sass con el uso de mixins y/o funciones;

  - CSS Mixins
  - CSS functions

- [ ] c) Utilizar Tailwind CLI para la personalización de un tema propio en el proyecto, con modo oscuro incluido, y la reutilización de componentes del plugin DaisyUI;

  - Tailwind CLI
  - Modo oscuro/claro
  - Daisy UI

- [ ] d) Generación de las vistas utilizando Handlebars;

  - Handlebars

- [ ] e) Uso de la librería Chart.js para la definición de gráficos interactivos;
  - Chart.js
- [ ] f) La generación de informes pdf usando alguna de las tecnologías vistas en clase.

  - Generación PDF

- [ ] Formulario de registro de administrador: Es requisito la implementación de la vista de registro de alta específico para los administradores generales de la aplicación. Los datos que se regitrarán de los administradores será, mínimo, de un nombre completo (nombre y apellidos), email y teléfono. Para dicha implementación se deberá utilizar Javascript para las comprobaciones en el navegador de los distintos datos del administrador.

- [ ] Se deberá seguir el patrón de delegación de eventos en Javascript cuando sea conveniente en las distintas vistas a implementar.

- [ ] El menú y el contenido de las páginas deberá definirse para dispositivos móviles y adaptarse a tamaños de pantalla de escritorio siguiendo el principio de diseño mobile-first recomendado por Tailwind.

### Requisitos funcionales backend

- [ ] Deberán aplicarse los principios de la arquitectura limpia/hexagonal + DDD.

- [ ] Se utilizará el framework NestJS y el lenguaje TypeScript.

- [ ] En cada subdominio, deberá implementarse un modelo de dominio y un modelo de persistencia.

- [ ] Para el control de errores (validaciones, reglas de negocio) se utilizará preferentemente un enfoque funcional (Patrón Either). No obstante, se acepta la aplicación ocasional del mecanismo de excepciones.
- [ ] En el entregable del primer cuatrimestre, se deberá implementar al menos un controlador REST (API Web). Uno de los controladores REST será documentado con OpenAPI.

- [ ] La aplicación debe ser desplegada al menos en dos componentes (microservicios): la aplicación general y la aplicación de administración. Los componentes deben ser autónomos, por tanto, no deben compartir el esquema de base de datos.
