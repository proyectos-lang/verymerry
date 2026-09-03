# Very Merry — Tienda virtual

Prototipo de tienda virtual, panel de administración y sistema de diseño para **Very Merry**
(artículos de fiesta: velas, platos, toppers, guirnaldas, coronas).

## Páginas publicadas

| Ruta | Archivo fuente | Qué es |
|---|---|---|
| `/` | `Very Merry Tienda Prototipo.dc.html` | Prototipo navegable de la tienda (home, catálogo, detalle de producto, carrito) |
| `/admin` | `Very Merry Panel Admin.dc.html` | Panel de administración (login, productos, pedidos) |
| `/diseno` | `Very Merry Tienda.dc.html` | Documento de diseño: paleta, tipografía, componentes y layouts |

## Cómo funciona

Las páginas son documentos **Claude Design canvas** (`.dc.html`). Cada una es HTML estático que
carga `support.js`, el runtime que interpreta las plantillas `<x-dc>` / `{{ ... }}` y monta la
página con React (React y Babel vienen de unpkg en tiempo de ejecución). No hay backend, no hay
dependencias de npm: son archivos estáticos.

## Estructura

```
├── *.dc.html                  Documentos de diseño (fuente — se editan en el canvas)
├── support.js                 Runtime del canvas (generado, no editar a mano)
├── image-slot.js              Componente <image-slot> usado por el panel admin
├── .image-slots.state.json    Estado de las imágenes cargadas en los slots
├── assets/                    Imágenes usadas por las páginas
├── uploads/                   Originales sin procesar (no se despliegan)
├── build.mjs                  Copia los .dc.html a dist/ con nombres limpios
└── vercel.json                Configuración de despliegue
```

## Desarrollo local

```bash
npm run build          # genera dist/
npx serve dist         # abre http://localhost:3000
```

Editar los `.dc.html` directamente y volver a correr `npm run build`.

## Despliegue

Vercel corre `npm run build` y publica `dist/`. Con `cleanUrls` activado,
`admin.html` se sirve como `/admin` y `diseno.html` como `/diseno`.

`uploads/` queda fuera del despliegue (son los originales de WhatsApp, ya optimizados en `assets/`).
