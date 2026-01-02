# 📂 Sistema de Gestión Documental SST - Grupo Palmas

Plataforma web profesional diseñada para la centralización, visualización y seguimiento de la documentación oficial de **Seguridad y Salud en el Trabajo (SST)** de las sedes de Grupo Palmas.

---

## 📝 1. Resumen del Proyecto
El sistema es una plataforma diseñada específicamente para el **Grupo Palmas** con el objetivo de centralizar y rastrear la interacción de los trabajadores con archivos críticos como IPERC, Procedimientos y Políticas. Permite una gestión eficiente y auditable de la normativa en las sedes de **Palmas del Espino** y **Palmas del Shanusi**.

---

## ✨ 2. Funcionalidades Principales (Actualizadas)
* **Navegación por Sedes y Áreas**: Estructura jerárquica para filtrar documentos por ubicación geográfica y departamentos como SST o Administración.
* **Filtrado Dinámico de Categorías**: Organización mediante etiquetas para "Procedimientos", "Matriz IPERC", "Políticas", entre otros.
* **Buscador en Tiempo Real**: Filtro de búsqueda por nombre de documento con actualización inmediata de la lista.
* **Métricas de Interacción (Nueva)**: 
    * **Contador de Vistas**: Registra cada vez que un usuario abre el visor de un documento.
    * **Contador de Descargas**: Registra la cantidad de veces que se descarga el archivo físicamente.
* **Visor Integrado**: Permite la visualización previa de archivos sin necesidad de descarga inmediata.

---

## 🏗️ 3. Arquitectura Técnica
* **Frontend**: Desarrollado con **Next.js 15 (App Router)** utilizando **Tailwind CSS** para un diseño responsivo y moderno.
* **Base de Datos**: Integración con **Neon Postgres (Serverless)** para el almacenamiento persistente de estadísticas.
* **Gestión de Datos**:
    * **API Routes**: Endpoints en `/api/stats` para registro (POST) y `/api/stats/get-all` para lectura (GET).
    * **Optimistic UI**: Actualización visual inmediata de contadores en el frontend antes de confirmar la escritura en la DB para evitar lag.
* **Autenticación**: No cuenta pero puede ser escalable.

---

## 📊 4. Estructura de la Base de Datos (Neon)
La tabla principal `document_stats` registra la actividad mediante los siguientes campos:
* **document_id (VARCHAR)**: Identificador único vinculado al archivo.
* **views (INTEGER)**: Total de visualizaciones acumuladas.
* **downloads (INTEGER)**: Total de descargas realizadas.
* **last_updated (TIMESTAMP)**: Fecha y hora de la última interacción registrada.

---

## 🔒 5. Flujo de Implementación de Seguridad
* **Variables de Entorno**: Las credenciales sensibles (`POSTGRES_URL`) se gestionan en archivos `.env.local` protegidos por `.gitignore` y se inyectan en el panel de Vercel para producción.
* **Despliegue Continuo**: Integración directa entre **GitHub** y **Vercel** para actualizaciones automáticas tras cada `push`.

---

## ⚙️ 6. Guía de Mantenimiento (Administradores)

### Gestión de Documentos
* **Archivo de Datos**: La lista maestra reside en `lib/data.ts`.
* **IDs Obligatorios**: Cada documento **debe** tener un `id` único. Sin este ID, la base de datos rechazará el registro de estadísticas.
* **Archivos Físicos**: Deben guardarse en `/public/docs/` con nombres idénticos a los referenciados en el código.

### Dependencias Principales
```bash
# Para instalar las dependencias necesarias:
npm install @vercel/postgres lucide-react
