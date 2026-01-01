# 📂 Sistema de Gestión Documental SST - Grupo Palmas

Este es un portal de gestión documental inteligente diseñado para el área de **Seguridad y Salud en el Trabajo (SST)**. La plataforma permite la visualización centralizada de matrices IPERC, políticas, procedimientos y registros de diversas sedes y áreas.

## 🚀 Características Principales

### 1. Visor Adaptativo (Smart Viewer)
El sistema detecta automáticamente el dispositivo del usuario para ofrecer la mejor experiencia:
- **PC (Escritorio):** Utiliza un motor de alta fidelidad basado en el visor nativo de los navegadores (Estilo Adobe Acrobat), permitiendo búsqueda (Ctrl+F), impresión y herramientas de zoom avanzadas.
- **Móvil/Tablet:** Cambia automáticamente a un renderizado basado en Canvas para permitir un desplazamiento vertical infinito y fluido, optimizado para interfaces táctiles.

### 2. Sincronización Automática de Metadata
Utiliza componentes de servidor de Next.js para leer físicamente la carpeta `/public/docs/`. Esto permite:
- **Peso Dinámico:** Muestra el tamaño real del archivo (KB/MB) sin necesidad de escribirlo manualmente.
- **Fecha Real:** Muestra la fecha de última modificación del archivo en el servidor.
- **Contadores de Categoría:** Los filtros muestran automáticamente cuántos documentos existen en cada sección.

### 3. Filtros y Búsqueda Inteligente
Interfaz reactiva que permite filtrar por categorías de SST (Procedimientos, Matriz IPERC, etc.) y realizar búsquedas por nombre de archivo en tiempo real.

## 🛠️ Tecnologías Utilizadas
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Visor PDF:** [@cyntler/react-doc-viewer](https://github.com/cyntler/react-doc-viewer) y Native Embeds.

## 📂 Estructura de Datos
- Los documentos se vinculan en el archivo `lib/data.ts`.
- Los archivos físicos deben alojarse en la ruta `/public/docs/`.
- El nombre del archivo en `data.ts` debe coincidir exactamente (incluyendo mayúsculas y minúsculas) con el archivo en la carpeta física.

## 🔧 Mantenimiento y Escalabilidad

### Agregar nuevos documentos
1. Copie el archivo en `/public/docs/`.
2. Registre el archivo en el arreglo `archivos` del área correspondiente en `lib/data.ts`.
3. El sistema actualizará automáticamente el peso, la fecha y los contadores en la interfaz.

### Despliegue en Azure
Este proyecto está optimizado para ser desplegado en **Azure App Service**. Al ser una arquitectura híbrida, el servidor de Azure procesará la metadata de los archivos mientras que el cliente renderizará la visualización, asegurando un bajo consumo de recursos.

---
**Desarrollado para:** Gestión Documental SST - Grupo Palmas

--------------------------------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
