import {
  Users, Briefcase, ShieldCheck, Award, Home, Sprout,
  Folder, Factory, Truck, Wrench
} from "lucide-react";

export const DATA_SEDES: Record<string, any> = {
  "palmas-del-espino": {
    nombre: "Palmas del Espino",
    ubicacion: "Tocache - San Martín",
    areas: [
      {
        nombre: "SST", icono: ShieldCheck,
        archivos: [
          { id: 1, nombre: "Matriz IPERC - Planta de Extracción.pdf", tamano: "1.2 MB", fecha: "10/01/2025", categoria: "Matriz IPERC" },
          { id: 2, nombre: "Política de Seguridad y Salud.docx", tamano: "2.4 MB", fecha: "05/01/2025", categoria: "Políticas" },
          { id: 3, nombre: "Procedimiento de Trabajo en Altura.xlsx", tamano: "4.1 MB", fecha: "01/01/2025", categoria: "Procedimientos" },
          { id: 4, nombre: "Instructivo de Uso de Arnés", tamano: "850 KB", fecha: "15/01/2025", categoria: "Instructivos" },
          { id: 5, nombre: "Formato de Permiso de Trabajo (PETAR)", tamano: "500 KB", fecha: "18/01/2025", categoria: "Formatos" },
          { id: 6, nombre: "Registro de Entrega de EPP", tamano: "1.1 MB", fecha: "20/01/2025", categoria: "Registros" },
        ]
      },
      {
        nombre: "Recursos Humanos", icono: Users,
        archivos: [
          { id: 7, nombre: "Procedimiento de Selección", tamano: "2.1 MB", fecha: "12/01/2025", categoria: "Procedimientos" },
          { id: 8, nombre: "Reglamento Interno", tamano: "5.2 MB", fecha: "01/01/2025", categoria: "Políticas" },
          { id: 9, nombre: "Matriz IPERC RRHH", tamano: "1.1 MB", fecha: "09/01/2025", categoria: "Matriz IPERC" },
          { id: 10, nombre: "Formato Vacaciones", tamano: "300 KB", fecha: "14/01/2025", categoria: "Formatos" },
        ]
      },
      {
        nombre: "Administración", icono: Briefcase,
        archivos: [
          { id: 11, nombre: "Política de Gastos", tamano: "1.5 MB", fecha: "08/01/2025", categoria: "Políticas" },
          { id: 12, nombre: "Manual Administrativo", tamano: "3.4 MB", fecha: "02/01/2025", categoria: "Procedimientos" },
        ]
      },
      {
        nombre: "Calidad", icono: Award,
        archivos: [
          { id: 13, nombre: "Manual de Calidad ISO", tamano: "4.2 MB", fecha: "10/01/2025", categoria: "Procedimientos" },
          { id: 14, nombre: "Instructivo Muestreo", tamano: "1.2 MB", fecha: "15/01/2025", categoria: "Instructivos" },
        ]
      },
      {
        nombre: "Campamentos", icono: Home,
        archivos: [
          { id: 15, nombre: "Reglas Campamento", tamano: "1.1 MB", fecha: "12/01/2025", categoria: "Políticas" },
          { id: 16, nombre: "Registro Habitaciones", tamano: "900 KB", fecha: "20/01/2025", categoria: "Registros" },
        ]
      },
      {
        nombre: "Plantación", icono: Sprout,
        archivos: [
          { id: 17, nombre: "Instructivo Cosecha", tamano: "2.1 MB", fecha: "15/01/2025", categoria: "Instructivos" },
          { id: 18, nombre: "Formato Fertilidad", tamano: "600 KB", fecha: "22/01/2025", categoria: "Formatos" },
        ]
      },
      {
        nombre: "Otros", icono: Folder,
        archivos: [
          { id: 19, nombre: "Documentos Varios", tamano: "1.5 MB", fecha: "28/01/2025", categoria: "Registros" }
        ]
      }
    ]
  },
  "palmas-del-shanusi": {
    nombre: "Palmas del Shanusi",
    ubicacion: "Yurimaguas - Loreto",
    areas: [
      {
        nombre: "Administración", icono: Briefcase,
        archivos: [
          { id: "adm-1", nombre: "IPERC - TECNICO DE CAMPO - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-2", nombre: "IPERC - SUPERVISOR ADMINISTRATIVO - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-3", nombre: "IPERC - OPERADOR DE BALANZA - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-4", nombre: "IPERC - LIDER DE CADENAS PRODUCTIVAS - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-5", nombre: "IPERC - JEFE DE CONTABILIDAD FINANCIERA - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-6", nombre: "IPERC - GERENTE DE OPERACIONES - IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-7", nombre: "IPERC - ANALISTA DE OPERACIONES IDS.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-8", nombre: "IPERC - PILOTO - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-9", nombre: "IPERC - MECANICO DE HANGAR - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-10", nombre: "IPERC - PRACTICANTE DE ADMINISTRACION - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-11", nombre: "IPERC - JEFE DE ADMINISTRACION - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-12", nombre: "IPERC - COORDINADOR DE RELACIONES COMUNITARIAS - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-13", nombre: "IPERC - AUXILIAR ADMINISTRATIVO - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-14", nombre: "IPERC - ASISTENTE ADMINISTRATIVO - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-15", nombre: "IPERC - ANALISTA DE ADMINISTRACION - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-16", nombre: "IPERC - ANALISTA DE ACTIVO FIJO - PDSH.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-17", nombre: "IPERC - ASISTENTE D COOP - PDO.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-18", nombre: "IPERC - ANALISTA DE CONTABILIDAD - PDO.xlsx", categoria: "Matriz IPERC", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-19", nombre: "POLITICA SST - PDS.pdf", categoria: "Políticas", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-20", nombre: "POLITICA SST - PDO.pdf", categoria: "Políticas", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-21", nombre: "POLITICA SST - IDS.pdf", categoria: "Políticas", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-22", nombre: "RISST - PDO.pdf", categoria: "Reglamentos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-23", nombre: "RISST - PDS.pdf", categoria: "Reglamentos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-24", nombre: "PLAN ANUAL DE SST - PDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-25", nombre: "PLAN ANUAL DE SST - IDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-26", nombre: "ORGANIGRAMA DE SEGURIDAD Y SALUD EN EL TRABAJO - PDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-27", nombre: "PROGRAMA ANUAL DE SST - PDSH.xlsx", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-28", nombre: "PROGRAMA ANUAL DE SST - IDSH.xlsx", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-29", nombre: "ORGANIGRAMA CSST - PDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-30", nombre: "ORGANIGRAMA CSST - PDO.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-31", nombre: "MIEMBROS DEL CSST - IDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-32", nombre: "FLUJOGRAMA EN CASO DE EMERGENCIAS - IDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-33", nombre: "FLUJOGRAMA EN CASO DE EMERGENCIAS (INCENDIOS) - PDSH - PDO.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-34", nombre: "FLUJOGRAMA DE INCIDENTES PELIGROSOS Y ACCIDENTES DE TRABAJO.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-35", nombre: "BRIGADISTAS PDSH - PDO.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-36", nombre: "BRIGADISTAS - IDSH.pdf", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" },
          { id: "adm-37", nombre: "NUMEROS EN CASOS DE EMERGENCIA.jpg", categoria: "Procedimientos", fecha: "2026-01-02", peso: "0 KB" }
        ]
      },
      {
        nombre: "SST", icono: ShieldCheck,
        archivos: [
          { id: 20, nombre: "Matriz IPERC Shanusi", tamano: "1.5 MB", fecha: "11/01/2025", categoria: "Matriz IPERC" },
          { id: 211, nombre: "Plan Emergencias", tamano: "3.2 MB", fecha: "14/01/2025", categoria: "Políticas" },
        ]
      },
      {
        nombre: "Operaciones", icono: Factory,
        archivos: [
          { id: 22, nombre: "Procedimiento Extracción", tamano: "4.5 MB", fecha: "05/01/2025", categoria: "Procedimientos" },
          { id: 23, nombre: "Registro Producción", tamano: "2.2 MB", fecha: "18/01/2025", categoria: "Registros" },
        ]
      },
      {
        nombre: "Logística", icono: Truck,
        archivos: [
          { id: 24, nombre: "Ruta Transporte", tamano: "2.5 MB", fecha: "12/01/2025", categoria: "Procedimientos" },
        ]
      },
      {
        nombre: "Otros", icono: Folder,
        archivos: [
          { id: 25, nombre: "Archivo General", tamano: "5.1 MB", fecha: "01/01/2025", categoria: "Políticas" }
        ]
      }
    ]
  },
  "industrias-del-tulumayo": {
    nombre: "Industrias del Tulumayo",
    ubicacion: "Campo Verde - Ucayali",
    areas: [
      {
        nombre: "SST", icono: ShieldCheck,
        archivos: [
          { id: 26, nombre: "Matriz IPERC Tulumayo", tamano: "1.8 MB", fecha: "09/01/2025", categoria: "Matriz IPERC" },
          { id: 27, nombre: "Procedimiento Bloqueo", tamano: "2.5 MB", fecha: "12/01/2025", categoria: "Procedimientos" },
          { id: 28, nombre: "Formato Check-list", tamano: "600 KB", fecha: "14/01/2025", categoria: "Formatos" },
        ]
      },
      {
        nombre: "Mantenimiento", icono: Wrench,
        archivos: [
          { id: 29, nombre: "Plan Preventivo", tamano: "3.8 MB", fecha: "05/01/2025", categoria: "Procedimientos" },
          { id: 30, nombre: "Registro Lubricación", tamano: "1.4 MB", fecha: "15/01/2025", categoria: "Registros" },
        ]
      },
      {
        nombre: "Administración", icono: Briefcase,
        archivos: [
          { id: 31, nombre: "Política Caja Chica", tamano: "800 KB", fecha: "01/01/2025", categoria: "Políticas" }
        ]
      }
    ]
  },
};