# C26124 - Front-End JS 
## Página con fines educativos
Sitio de Presentación de la Distribuidora __Waipara Valley__

## Tabla de Contenidos

- [Autor](#Autor)
- [Contenido del Site](#contenido-del-site)
- [Especificaciones Técnicas](#especificaciones-Técnicas)
- [Sitio Web](#sitio-web)

## Autor
* Correa Pietrobón, Alberto Maximiliano | maxcorrea81@outlook.com

## Contenido del Site
1. Header
2. Hero con presentación de la empresa
3. Tienda Online
4. Productos mas vendidos
5. Ubicación: Frames con las locaciones de la empresa.
6. Contacto: Formulario de contacto
7. Footer


## Especificaciones Técnicas
* Utilización de google fonts y font awsome
* Separación de los estilos para ser reutilizados: reset.css, variables.css, header.css, main.css, tienda.css, footer.css & botonWA.css
* Diseño Responsive: Breakpoint 768px
### Header 
* Menú con posicionamiento 'sticky' dividido en 2 partes. 
* Topbar con un texto en scroll
* nav-menu con flex.
### Hero
* Uso de imagen de background flex para alinear el titulo y subtitulo en el centro.
### Tienda Online
* Consumo de la API https://fakestoreapi.com/
* En la tienda se puede agrandar la imagen en miniatura y se despliega un modal con la imagen mas grande, el titulo, la descripción, el rating y la cantidad de opiones (que se consumen de la API)
* Se agregó un atributo (cantidad) al producto para que no repita el mismo en la sección "Mi carrito" cuando se agrega y además se puede manipular la cantidad desde esa misma sección.
* La persistencia de los datos se guardan en localStorage por lo que siempre quedan guardados hasta que se cierre sesión.
#### Funciones JS
* Funcion 1
### Productos Mas Vendidos
* Flex para el diseños de las cards con efecto de elevación cuando se pasa con el mouse.
* El contenido de la card también hecho con flex horizontal.
### Contacto
* Grid principal: header main main footer
* Grid Secundario: main main
* Flex para secciones ¿Dónde Ubicarnos? y ¿Cómo Podemos Ayudarte?
* Frame con mapa con locación del deposito
* Contacto: Se realizó el formulario de contacto https://formspree.io. Campo de texto, selección multiple, email, y botón submit
### Boton de WA
* posicionamiento sticky en el borde inferior derecho de la pagina.
### Footer
* Flex columna.

## Sitio web
* [Bodega Correa Grieco en GithutPages](https://maxcpietro.github.io/Distribuidora_Waipara/)
