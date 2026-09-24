import { PresentationDossier, AuditRecord } from '../types/cerax';

export const SAMPLE_PRESENTATIONS: PresentationDossier[] = [
  {
    id: 'dossier-11-torres',
    title: 'Dossier Institucional: 11 Torres La Nueva Santa Cruz',
    subtitle: 'Estructuración RWA Binacional PABSA S.A. - ESBA S.R.L.',
    date: 'Febrero 2025',
    fileName: 'Dossier_Fiduciario_11_Torres_SantaCruz.pdf',
    fileSize: '14.8 MB',
    totalPages: 6,
    complianceStatus: '100% REGULADO',
    applicableNorms: ['Ley 7572/2025 Paraguay (Art. 4, 18)', 'Circular ASFI/Dir-024 Bolivia', 'Estándar ERC-3643'],
    valuationUSD: '$185,000,000 USD',
    projectedYield: '11.8% TIR Neta / 9.4% Cap Rate',
    slides: [
      {
        slideNumber: 1,
        title: 'Portada Ejecutiva: Tokenización de Frutos Civiles Inmobiliarios',
        keyPoints: [
          '11 Torres completamente construidas y entregadas físicamente en La Nueva Santa Cruz.',
          'Valuación independiente consolidada de $185,000,000 USD con 0% riesgo constructivo.',
          'Modelo fiduciario binacional entre Paraguay (PABSA S.A.) y Bolivia (ESBA S.R.L.).',
        ],
        legalNote: 'Escritura Pública N° 412/2024 inscrita en Derechos Reales sin gravámenes ni hipotecas.',
        speechPitch: 'Esta primera diapositiva resume el valor fundamental: 11 torres concluidas y matriculadas, eliminando cualquier riesgo de obra y respaldando el rendimiento con ladrillo tangible.',
        metrics: { Valuación: '$185M USD', Torres: '11 Concluidas', Riesgo: '0% Obra' },
      },
      {
        slideNumber: 2,
        title: 'Gobernanza Binacional & Cumplimiento Art. 18 Ley 7572',
        keyPoints: [
          'Estructura cerrada de SPV en Asunción que no califica como captación masiva ilegal.',
          'Colocación privada 100% individualizada con ticket mínimo institucional de $25,000 USD.',
          'Sin oferta pública ni intermediación financiera pasiva no autorizada.',
        ],
        legalNote: 'Dictamen de cumplimiento emitido bajo Art. 18 de la Ley 7572/2025 de Paraguay.',
        speechPitch: 'El núcleo de seguridad radica en la estructura fiduciaria transfronteriza: no existe captación masiva; cada adquirente es un inversor calificado bajo colocación privada.',
        metrics: { 'Ticket Mín.': '$25,000 USD', Régimen: 'Privado Acreditado', Ley: 'Art. 18 Ley 7572' },
      },
      {
        slideNumber: 3,
        title: 'Modelo Financiero: Generación de Flujo y Retorno en USD',
        keyPoints: [
          'TIR neta proyectada de 11.8% en USD con Cap Rate sostenido de 9.4% anual.',
          'Rentas directas en moneda dura provenientes del pool corporativo y residencial.',
          'Fase 1 (Torres 1 a 3) 100% suscrita; Fase 2 (Torres 4 a 7) ronda institucional abierta.',
        ],
        legalNote: 'Auditoría de flujos revisada por comités independientes de banca fiduciaria.',
        speechPitch: 'Aquí examinamos la economía del token: los flujos se originan en alquileres reales de oficinas corporativas y unidades residenciales, distribuidos mensualmente en dólares.',
        metrics: { TIR: '11.8% Neta USD', 'Cap Rate': '9.4% Anual', Ocupación: '82% Operativo' },
      },
      {
        slideNumber: 4,
        title: 'Patrimonio Autónomo Inembargable & Escrow Institucional',
        keyPoints: [
          'Los bienes inmuebles son aportados a un patrimonio fiduciario autónomo e inembargable.',
          'Liquidación mensual automatizada de dividendos mediante cuenta Escrow en Banco Continental / BCP.',
          'Ninguna de las sociedades gestoras custodia los fondos de los inversores de forma directa.',
        ],
        legalNote: 'Contrato de Fideicomiso Mercantil Privado en Banco de Crédito BCP Santa Cruz.',
        speechPitch: 'El fideicomiso garantiza que ni contingencias corporativas ni litigios de terceros puedan afectar los activos o los fondos en tránsito dentro del Escrow bancario.',
        metrics: { Custodia: 'Banco Continental / BCP', Separación: 'Patrimonio Autónomo', Gravamen: '0.0%' },
      },
      {
        slideNumber: 5,
        title: 'Mitigación en 5 Capas CERAX & Póliza de Seguro de $25M USD',
        keyPoints: [
          'Capa 1: Financiera (Modelación de estrés macroeconómico de divisas).',
          'Capa 2: Inmobiliaria (Matrícula en Derechos Reales sin gravámenes).',
          'Capa 3: Jurídica (Doble candado binacional con dictamen vinculante).',
          'Capa 4: Seguros (Póliza Todo Riesgo & Caución de Título $25M USD contratada).',
          'Capa 5: Blockchain (Tokens institucionales ERC-3643 con validación de identidad on-chain).',
        ],
        legalNote: 'Póliza suscrita con reaseguradoras de grado de inversión internacional.',
        speechPitch: 'Las 5 capas de control de CERAX protegen cada punto vulnerable de la inversión: desde la titularidad inmobiliaria hasta la liquidez mensual y la cobertura por póliza de seguro.',
        metrics: { Póliza: '$25,000,000 USD', Token: 'ERC-3643', Identidad: 'KYC/AML On-Chain' },
      },
      {
        slideNumber: 6,
        title: 'Hoja de Ruta de Fases & Colocación Q4 2025',
        keyPoints: [
          'Fase 1: Torres 1 a 3 ($42M USD) cerrada y operando.',
          'Fase 2: Torres 4 a 7 ($68M USD) disponible para inversores calificados acreditados.',
          'Fase 3: Torres 8 a 11 ($75M USD) estructurada para entrega en Q4 2025.',
        ],
        legalNote: 'Certificación final registrada bajo Hash Fiduciario #49F-2025.',
        speechPitch: 'Concluyendo la presentación, la Fase 2 ofrece una ventana de asignación preferencial para tesorerías institucionales y family offices con liquidación fiduciaria garantizada.',
        metrics: { Total: '$185M USD', Fase2: '$68M USD', Estado: 'Ronda Abierta' },
      },
    ],
  },
  {
    id: 'dossier-ley-7572',
    title: 'Dictamen Jurídico Art. 18 Ley 7572 de Paraguay',
    subtitle: 'Análisis de no-captación masiva y régimen de colocación privada',
    date: '14 Febrero 2025',
    fileName: 'Dictamen_Legal_Art18_Ley7572_Paraguay.pdf',
    fileSize: '4.2 MB',
    totalPages: 3,
    complianceStatus: '100% REGULADO',
    applicableNorms: ['Ley 7572/2025 Art. 4, 18', 'Código Civil Art. 1121'],
    valuationUSD: '$185M Subyacente',
    projectedYield: 'Cumplimiento Legal 100%',
    slides: [
      {
        slideNumber: 1,
        title: 'Alcance del Art. 18 de la Ley 7572/2025',
        keyPoints: [
          'El Art. 18 excluye de la definición de intermediación financiera la cesión privada de derechos económicos.',
          'Requiere colocación no masiva individualizada a inversores acreditados.',
          'El vehículo fiduciario PABSA S.A. no realiza intermediación bancaria pasiva.',
        ],
        legalNote: 'Aprobado por dictamen vinculante de asesoría externa y CNV de Paraguay.',
        speechPitch: 'Este dictamen valida de manera concluyente que la emisión en Asunción cumple con los preceptos de no-oferta pública establecidos en el Art. 18.',
      },
    ],
  },
];

export const AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'audit-1',
    date: '14 Feb 2025',
    tag: 'Ley 7572 Art. 18',
    title: 'Análisis de no-captación masiva en Fideicomiso Inmobiliario',
    recordingTime: '42 min grabados',
    fiduciaryEntity: 'PABSA S.A. / Asunción',
    hash: '0x8f4c...3e1a',
    summary: 'Dictamen vinculante que certifica que la emisión de certificados de frutos civiles no constituye intermediación financiera bancaria pasiva bajo la Ley 7572/2025.',
    lawArticles: ['Art. 4 Ley 7572', 'Art. 18 Ley 7572', 'Art. 34 BVM'],
  },
  {
    id: 'audit-2',
    date: '10 Feb 2025',
    tag: 'ASFI/Dir-024',
    title: 'Dictamen ASFI sobre canalización SPV La Paz - Santa Cruz',
    recordingTime: 'Fideicomiso BCP',
    fiduciaryEntity: 'ESBA S.R.L. / Santa Cruz',
    hash: '0x3a9d...91bc',
    summary: 'Aprobación de la estructura fiduciaria mercantil privada bajo supervisión del Directorio de ASFI, garantizando la inembargabilidad del patrimonio inmobiliario.',
    lawArticles: ['Res. Directorio ASFI 024/2025', 'Ley de Servicios Financieros N° 393'],
  },
  {
    id: 'audit-3',
    date: '28 Ene 2025',
    tag: 'ERC-3643 Audit',
    title: 'Auditoría Smart Contract & Compliance On-Chain',
    recordingTime: '18 min grabados',
    fiduciaryEntity: 'CertiK / Sovereign Trust HSM',
    hash: '0x7e22...bb90',
    summary: 'Auditoría de seguridad y verificación formal del smart contract ERC-3643, validando la inclusión de transferencias condicionadas a KYC institucional.',
    lawArticles: ['ERC-3643 Standard', 'EIDAS Compliance', 'FATF Recommendation 16'],
  },
];

export const CONTROL_LAYERS = [
  {
    number: '01',
    name: 'Capa 1',
    title: 'Capa Financiera · Modelación TIR, Estrés Macroeconómico & Liquidez',
    badge: 'TIR 11.8% Neta',
    isPrimary: false,
    content:
      'Simulación estocástica de flujos con estrés de tipo de cambio y vacancia máxima del 25%. Garantiza el repago del cupón fiduciario en dólares constantes respaldado por contratos de alquiler con multinacionales y sedes corporativas en La Nueva Santa Cruz.',
    metrics: [
      { label: 'TIR Neta', val: '11.8% USD' },
      { label: 'Cap Rate', val: '9.4% Anual' },
      { label: 'Estrés Máx.', val: '25% Vacancia' },
    ],
  },
  {
    number: '02',
    name: 'Capa 2',
    title: 'Capa Inmobiliaria · 11 Torres Construidas, Matrícula & Gravamen 0.0%',
    badge: '100% Tangible',
    isPrimary: false,
    content:
      'Las 11 torres físicas están 100% finalizadas, con certificado final de obras emitido por la municipalidad y registro formal en Derechos Reales de Santa Cruz. Libre de hipotecas, embargos o procesos judiciales civiles.',
    metrics: [
      { label: 'Edificios Físicos', val: '11 Torres' },
      { label: 'Riesgo Constructivo', val: '0.0%' },
      { label: 'Gravamen', val: '0.0% Limpio' },
    ],
  },
  {
    number: '03',
    name: 'Capa 3 · NÚCLEO REGULADO',
    title: 'Capa Jurídica · SPV Transfronterizo & Art. 18 Ley 7572',
    badge: 'No-Captación',
    isPrimary: true,
    content:
      'Constitución de SPV cerrado en Asunción (PABSA S.A.) y Santa Cruz (ESBA S.R.L.). Los adquirentes acceden exclusivamente a cuotas fiduciarias privadas de cesión de utilidades, sin oferta indiscriminada ni intermediación bancaria pasiva ilegal.',
    contracts: [
      {
        title: 'CONTRATO FIDUCIARIO BINACIONAL',
        doc: 'Escritura Pública N° 412/2024',
        type: 'Fideicomiso Mercantil',
      },
      {
        title: 'DICTAMEN LEY 7572',
        doc: 'Aprobado Art. 18 (No-Oferta Pública)',
        type: 'Dictamen Vinculante',
      },
    ],
  },
  {
    number: '04',
    name: 'Capa 4',
    title: 'Capa de Seguros · Póliza Todo Riesgo & Caución de Título $25M USD',
    badge: 'Póliza $25M USD',
    isPrimary: false,
    content:
      'Cobertura integral contra eventos de fuerza mayor, siniestros estructurales y caución legal de saneamiento de título inmobiliario con reaseguro en el mercado internacional de Lloyd’s syndicates.',
    metrics: [
      { label: 'Suma Asegurada', val: '$25,000,000 USD' },
      { label: 'Cobertura', val: 'Todo Riesgo & Título' },
      { label: 'Calificación', val: 'A+ Fiduciaria' },
    ],
  },
  {
    number: '05',
    name: 'Capa 5',
    title: 'Capa Blockchain · Tokens Permisados ERC-3643 & Compliance On-Chain',
    badge: 'ERC-3643',
    isPrimary: false,
    content:
      'Emisión permisionada bajo estándar ERC-3643 con verificación automática de identidad (KYC/AML) en cada transferencia. Bloqueo programático de transferencias a monederos no autorizados o países de alto riesgo.',
    metrics: [
      { label: 'Estándar', val: 'ERC-3643 RWA' },
      { label: 'Compliance', val: 'Automático On-Chain' },
      { label: 'Auditoría', val: 'CertiK Verified' },
    ],
  },
];

export const BINATIONAL_MATRIX = [
  {
    dimension: 'Vehículo Legal',
    paraguay: 'SPV Fiduciario Inmobiliario independiente constituido ante escribanía mayor en Asunción.',
    bolivia: 'Sociedad de Objeto Específico + Fideicomiso Mercantil Privado en Banco BCP / Santa Cruz.',
  },
  {
    dimension: 'Modelo de Emisión',
    paraguay: 'Activo Virtual Regulado Art. 4 (Ley 7572) - Registro CNV / BVM como instrumento no intermediado.',
    bolivia: 'Certificado de Participación Privada - Sin captación pública bajo circulares de Directorio ASFI.',
  },
  {
    dimension: 'Fiscalidad & Repatriación',
    paraguay: 'Tasa corporativa competitiva (IRE 10%) con exención de retención en dividendos fiduciarios del exterior.',
    bolivia: 'Retención en la fuente mitigada vía convenios comerciales bilaterales y estructuración de frutos civiles.',
  },
  {
    dimension: 'Estrategia de Colocación',
    paraguay: 'Colocación privada 100% individualizada a inversores calificados acreditados ($25K USD min). Cero publicidad masiva abierta conforme a los dictámenes vinculantes.',
    bolivia: 'Asignación institucional restringida a patrimonios fiduciarios y tesorerías corporativas autorizadas.',
  },
];
