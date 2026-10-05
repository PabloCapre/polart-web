# Brief de Copywriting & Microtextos para Desarrollo
## Precotizador Automático — Polarizados Pol-Art Mendoza (v3.0)
**Rol:** Agente Copywriter — WAFLERS  
**Fecha:** Octubre 2026  
**Documentos Fuente:** [`PRD.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/PRD.md) & [`design-system.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/design-system.md)  
**Estado:** Textos Aprobados — *Copy-Paste Ready para Frontend*  

---

## 1. Guía de Implementación para el Desarrollador Frontend

Este documento compila **todos los textos definitivos** del Precotizador Automático. Cada string ha sido auditado bajo las reglas tipográficas del `design-system.md`:
* **Cero Spanglish:** Uso estricto de terminología técnica automotriz en español (ej. *rechazo infrarrojo*, *lámina de seguridad*, *óptica cristalina*, *película autorreparable*).
* **Tono:** Técnico, sobrio, directo y con alto sentido de autoridad y garantía.
* **Límites de Caracteres Rigurosos:** Ningún texto excede los límites máximos previstos para títulos (25 car.), subtítulos (45 car.), bullets (55 car.), badges (2 palabras) o advertencia RTO (110 car.).

---

## 2. Constantes de Datos en TypeScript / JavaScript (`precotizadorData.ts`)

Podés copiar directamente este bloque a tu archivo de configuración o estado en el frontend:

```typescript
export interface VehicleOption {
  id: string;
  name: string;
  description: string;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  badge: string;
  isInstantQuote: boolean;
}

export interface TonalityOption {
  id: string;
  name: string;
  vlt: string;
  description: string;
  isRtoRestricted?: boolean;
}

export interface TechnologyOption {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  badge: string; // Máximo 2 palabras
  bullets: [string, string]; // Máximo 55 caracteres c/u
}

export const PRECOTIZADOR_COPY = {
  navigation: {
    back: "ANTERIOR",
    next: "SIGUIENTE",
    modify: "MODIFICAR",
    restart: "REINICIAR",
    stepCounter: (current: number, total: number) => `PASO 0${current} / 0${total}`,
  },

  step1: {
    title: "SELECCIONÁ TU VEHÍCULO", // 21 chars (Máx. 25)
    subtitle: "Definí el porte para calcular el material.", // 42 chars (Máx. 45)
    vehicles: [
      { id: "auto", name: "Auto", description: "Hatchback y sedán" },
      { id: "suv", name: "SUV", description: "Monovolumen y cross" },
      { id: "camioneta", name: "Camioneta", description: "Pick-up simple o doble" },
      { id: "camion", name: "Camión", description: "Cabina pesada y carga" },
      { id: "maquinaria", name: "Maquinaria", description: "Línea vial y agrícola" },
      { id: "otro", name: "Otro", description: "Especiales y furgones" },
    ] as VehicleOption[],
  },

  step2: {
    title: "ELEGÍ EL SERVICIO", // 17 chars (Máx. 25)
    subtitle: "Elegí la protección técnica para tu unidad.", // 43 chars (Máx. 45)
    services: [
      {
        id: "polarizado",
        name: "Polarizado",
        description: "Control térmico y filtro UV.",
        badge: "COTIZACIÓN INMEDIATA",
        isInstantQuote: true,
      },
      {
        id: "ppf",
        name: "PPF 3M Pro Series",
        description: "Blindaje de pintura autorreparable.",
        badge: "ASESORÍA A MEDIDA",
        isInstantQuote: false,
      },
      {
        id: "antivandalico",
        name: "Antivandálico",
        description: "Lámina de seguridad contra golpes.",
        badge: "ASESORÍA A MEDIDA",
        isInstantQuote: false,
      },
      {
        id: "wpf",
        name: "WPF Parabrisas",
        description: "Escudo contra piedras en ruta.",
        badge: "ASESORÍA A MEDIDA",
        isInstantQuote: false,
      },
      {
        id: "otros",
        name: "Equipamiento LED",
        description: "Iluminación de alta potencia.",
        badge: "ASESORÍA A MEDIDA",
        isInstantQuote: false,
      },
    ] as ServiceOption[],
  },

  step3: {
    title: "TONALIDAD Y TECNOLOGÍA", // 22 chars (Máx. 25)
    subtitle: "Elegí privacidad y rechazo térmico.", // 35 chars (Máx. 45)

    tonalitySection: {
      sectionTitle: "Tonalidad del Cristal",
      tonalities: [
        {
          id: "suave",
          name: "Suave (50% VLT)",
          vlt: "50%",
          description: "Máxima visión nocturna y filtro UV.",
          isRtoRestricted: false,
        },
        {
          id: "intermedio",
          name: "Intermedio (20% VLT)",
          vlt: "20%",
          description: "Equilibrio entre confort y visión.",
          isRtoRestricted: false,
        },
        {
          id: "presidencial",
          name: "Presidencial (05% VLT)",
          vlt: "05%",
          description: "Privacidad total desde afuera.",
          isRtoRestricted: true,
        },
      ] as TonalityOption[],
      rtoWarning: {
        badge: "Aviso Normativo RTO",
        text: "Tonalidad no homologada para la Revisión Técnica Obligatoria (RTO). Instalación a criterio del usuario.", // 103 chars (Máx. 110)
      },
    },

    technologies: [
      {
        id: "glue",
        name: "Glue",
        price: 90500,
        formattedPrice: "$90.500",
        badge: "Económico", // 1 palabra
        bullets: [
          "Tinte incorporado en adhesivo con filtro UV.", // 44 chars (Máx. 55)
          "Reduce el brillo solar a costo accesible.", // 41 chars (Máx. 55)
        ],
      },
      {
        id: "dyed",
        name: "Dyed",
        price: 98500,
        formattedPrice: "$98.500",
        badge: "Estándar", // 1 palabra
        bullets: [
          "Poliéster teñido de mayor estabilidad óptica.", // 45 chars (Máx. 55)
          "Tono parejo sin decoloración prematura.", // 39 chars (Máx. 55)
        ],
      },
      {
        id: "dyed-hp",
        name: "Dyed HP",
        price: 117500,
        formattedPrice: "$117.500",
        badge: "Alto Rendimiento", // 2 palabras
        bullets: [
          "Capa híbrida metalizada con mayor rechazo solar.", // 48 chars (Máx. 55)
          "Disipa la radiación y protege el habitáculo.", // 44 chars (Máx. 55)
        ],
      },
      {
        id: "nano-carbon",
        name: "Nano Carbon",
        price: 127500,
        formattedPrice: "$127.500",
        badge: "Larga Duración", // 2 palabras
        bullets: [
          "Partículas de carbón libre de metales.", // 38 chars (Máx. 55)
          "Cero interferencia con celulares, GPS o TAG.", // 44 chars (Máx. 55)
        ],
      },
      {
        id: "nano-ceramic-ps",
        name: "Nano Cerámica PS",
        price: 154500,
        formattedPrice: "$154.500",
        badge: "Alta Gama", // 2 palabras
        bullets: [
          "Frena el calor infrarrojo sin oscurecer de más.", // 47 chars (Máx. 55)
          "Visión cristalina hacia afuera de día y noche.", // 46 chars (Máx. 55)
        ],
      },
      {
        id: "nano-ceramic-llumar",
        name: "Nano Cerámica Llumar",
        price: 225500,
        formattedPrice: "$225.500",
        badge: "Ultra Premium", // 2 palabras
        bullets: [
          "Máxima disipación térmica del mercado mundial.", // 46 chars (Máx. 55)
          "Bloqueo infrarrojo superior y máxima garantía.", // 46 chars (Máx. 55)
        ],
      },
    ] as TechnologyOption[],

    alternativeStep3: {
      title: "ÁREA DE COBERTURA", // 17 chars (Máx. 25)
      subtitle: "Definí los sectores a proteger.", // 31 chars (Máx. 45)
      options: [
        { id: "frente", name: "Frente Completo", desc: "Trompa, capot, paragolpes y ópticas." },
        { id: "impacto", name: "Zonas de Impacto", desc: "Paragolpes delantero y ópticas." },
        { id: "laterales", name: "Laterales Completos", desc: "Puertas y paneles laterales." },
        { id: "total", name: "Vehículo Total", desc: "Protección integral de carrocería." },
      ],
      notice: "Presupuesto exacto según medidas y despiece en taller.",
    },
  },

  step4: {
    title: "RESUMEN DE COTIZACIÓN", // 21 chars (Máx. 25)
    subtitle: "Revisá tu configuración para agendar turno.", // 42 chars (Máx. 45)
    ticketLabels: {
      header: "ORDEN TÉCNICA ESTIMADA",
      vehicle: "VEHÍCULO",
      service: "SERVICIO",
      tonality: "TONALIDAD",
      technology: "TECNOLOGÍA",
      coverage: "COBERTURA",
      priceLabel: "PRESUPUESTO ESTIMADO",
      disclaimer: "Valores para automóvil estándar. Garantía escrita emitida en taller.",
    },
    ctaWhatsApp: "COTIZAR POR WHATSAPP", // 20 chars (Máx. 28)
  },
};
```

---

## 3. Desglose Estructurado Paso por Paso (Copy-Paste para HTML / React)

### Paso 1: Selección de Tipo de Vehículo

#### Encabezado:
* **H2:** `SELECCIONÁ TU VEHÍCULO` *(21 caracteres — Cumple máx. 25)*
* **Subtítulo:** `Definí el porte para calcular el material.` *(42 caracteres — Cumple máx. 45)*

#### Opciones de Tarjetas:
```html
<!-- Opción 1: Auto -->
<div class="card">
  <span class="label">Auto</span>
  <span class="subtext">Hatchback y sedán</span>
</div>

<!-- Opción 2: SUV -->
<div class="card">
  <span class="label">SUV</span>
  <span class="subtext">Monovolumen y cross</span>
</div>

<!-- Opción 3: Camioneta -->
<div class="card">
  <span class="label">Camioneta</span>
  <span class="subtext">Pick-up simple o doble</span>
</div>

<!-- Opción 4: Camión -->
<div class="card">
  <span class="label">Camión</span>
  <span class="subtext">Cabina pesada y carga</span>
</div>

<!-- Opción 5: Maquinaria -->
<div class="card">
  <span class="label">Maquinaria</span>
  <span class="subtext">Línea vial y agrícola</span>
</div>

<!-- Opción 6: Otro -->
<div class="card">
  <span class="label">Otro</span>
  <span class="subtext">Especiales y furgones</span>
</div>
```

---

### Paso 2: Selección de Servicio Principal

#### Encabezado:
* **H2:** `ELEGÍ EL SERVICIO` *(17 caracteres — Cumple máx. 25)*
* **Subtítulo:** `Elegí la protección técnica para tu unidad.` *(43 caracteres — Cumple máx. 45)*

#### Opciones de Tarjetas:
```html
<!-- Servicio 1: Polarizado -->
<div class="card">
  <span class="badge">COTIZACIÓN INMEDIATA</span>
  <h3 class="title">Polarizado</h3>
  <p class="description">Control térmico y filtro UV.</p>
</div>

<!-- Servicio 2: PPF -->
<div class="card">
  <span class="badge">ASESORÍA A MEDIDA</span>
  <h3 class="title">PPF 3M Pro Series</h3>
  <p class="description">Blindaje de pintura autorreparable.</p>
</div>

<!-- Servicio 3: Antivandálico -->
<div class="card">
  <span class="badge">ASESORÍA A MEDIDA</span>
  <h3 class="title">Antivandálico</h3>
  <p class="description">Lámina de seguridad contra golpes.</p>
</div>

<!-- Servicio 4: WPF -->
<div class="card">
  <span class="badge">ASESORÍA A MEDIDA</span>
  <h3 class="title">WPF Parabrisas</h3>
  <p class="description">Escudo contra piedras en ruta.</p>
</div>

<!-- Servicio 5: Equipamiento LED -->
<div class="card">
  <span class="badge">ASESORÍA A MEDIDA</span>
  <h3 class="title">Equipamiento LED</h3>
  <p class="description">Iluminación de alta potencia.</p>
</div>
```

---

### Paso 3: Tonalidad y Matriz de Tecnologías (Si Polarizado)

#### Encabezado General:
* **H2:** `TONALIDAD Y TECNOLOGÍA` *(22 caracteres — Cumple máx. 25)*
* **Subtítulo:** `Elegí privacidad y rechazo térmico.` *(35 caracteres — Cumple máx. 45)*

#### Sub-Paso 3A: Tonalidades de Cristal
```html
<!-- Tonalidad 1: Suave -->
<button class="tonality-btn">
  <span class="name">Suave (50% VLT)</span>
  <span class="desc">Máxima visión nocturna y filtro UV.</span>
</button>

<!-- Tonalidad 2: Intermedio -->
<button class="tonality-btn">
  <span class="name">Intermedio (20% VLT)</span>
  <span class="desc">Equilibrio entre confort y visión.</span>
</button>

<!-- Tonalidad 3: Presidencial -->
<button class="tonality-btn">
  <span class="name">Presidencial (05% VLT)</span>
  <span class="desc">Privacidad total desde afuera.</span>
</button>
```

#### Alerta Condicional de RTO (Aparece únicamente al marcar Presidencial):
```html
<div class="rto-alert-box" role="alert">
  <span class="alert-badge">AVISO NORMATIVO RTO</span>
  <p class="alert-text">
    Tonalidad no homologada para la Revisión Técnica Obligatoria (RTO). Instalación a criterio del usuario.
  </p>
</div>
```
*Conteo exacto del texto de advertencia:* **103 caracteres** *(Cumple estrictamente el límite de máx. 110)*.

---

### Sub-Paso 3B: Matriz de Tecnologías (Precios y Bullets Explicativos)

#### 1. Tecnología Glue
```html
<div class="tech-card">
  <span class="badge">Económico</span>
  <h3 class="tech-name">Glue</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">90.500</span>
  </div>
  <ul class="bullets">
    <li>Tinte incorporado en adhesivo con filtro UV.</li>
    <li>Reduce el brillo solar a costo accesible.</li>
  </ul>
</div>
```
* Badge: `Económico` *(1 palabra — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Tinte incorporado en adhesivo con filtro UV.` *(44 car. — Cumple máx. 55)*
* Bullet 2: `Reduce el brillo solar a costo accesible.` *(41 car. — Cumple máx. 55)*

#### 2. Tecnología Dyed
```html
<div class="tech-card">
  <span class="badge">Estándar</span>
  <h3 class="tech-name">Dyed</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">98.500</span>
  </div>
  <ul class="bullets">
    <li>Poliéster teñido de mayor estabilidad óptica.</li>
    <li>Tono parejo sin decoloración prematura.</li>
  </ul>
</div>
```
* Badge: `Estándar` *(1 palabra — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Poliéster teñido de mayor estabilidad óptica.` *(45 car. — Cumple máx. 55)*
* Bullet 2: `Tono parejo sin decoloración prematura.` *(39 car. — Cumple máx. 55)*

#### 3. Tecnología Dyed HP
```html
<div class="tech-card">
  <span class="badge">Alto Rendimiento</span>
  <h3 class="tech-name">Dyed HP</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">117.500</span>
  </div>
  <ul class="bullets">
    <li>Capa híbrida metalizada con mayor rechazo solar.</li>
    <li>Disipa la radiación y protege el habitáculo.</li>
  </ul>
</div>
```
* Badge: `Alto Rendimiento` *(2 palabras — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Capa híbrida metalizada con mayor rechazo solar.` *(48 car. — Cumple máx. 55)*
* Bullet 2: `Disipa la radiación y protege el habitáculo.` *(44 car. — Cumple máx. 55)*

#### 4. Tecnología Nano Carbon
```html
<div class="tech-card">
  <span class="badge">Larga Duración</span>
  <h3 class="tech-name">Nano Carbon</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">127.500</span>
  </div>
  <ul class="bullets">
    <li>Partículas de carbón libre de metales.</li>
    <li>Cero interferencia con celulares, GPS o TAG.</li>
  </ul>
</div>
```
* Badge: `Larga Duración` *(2 palabras — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Partículas de carbón libre de metales.` *(38 car. — Cumple máx. 55)*
* Bullet 2: `Cero interferencia con celulares, GPS o TAG.` *(44 car. — Cumple máx. 55)*

#### 5. Tecnología Nano Cerámica PS
```html
<div class="tech-card">
  <span class="badge">Alta Gama</span>
  <h3 class="tech-name">Nano Cerámica PS</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">154.500</span>
  </div>
  <ul class="bullets">
    <li>Frena el calor infrarrojo sin oscurecer de más.</li>
    <li>Visión cristalina hacia afuera de día y noche.</li>
  </ul>
</div>
```
* Badge: `Alta Gama` *(2 palabras — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Frena el calor infrarrojo sin oscurecer de más.` *(47 car. — Cumple máx. 55)*
* Bullet 2: `Visión cristalina hacia afuera de día y noche.` *(46 car. — Cumple máx. 55)*

#### 6. Tecnología Nano Cerámica Llumar
```html
<div class="tech-card">
  <span class="badge">Ultra Premium</span>
  <h3 class="tech-name">Nano Cerámica Llumar</h3>
  <div class="price-container">
    <span class="currency">$</span>
    <span class="amount">225.500</span>
  </div>
  <ul class="bullets">
    <li>Máxima disipación térmica del mercado mundial.</li>
    <li>Bloqueo infrarrojo superior y máxima garantía.</li>
  </ul>
</div>
```
* Badge: `Ultra Premium` *(2 palabras — Cumple regla de máx. 2 palabras)*
* Bullet 1: `Máxima disipación térmica del mercado mundial.` *(46 car. — Cumple máx. 55)*
* Bullet 2: `Bloqueo infrarrojo superior y máxima garantía.` *(46 car. — Cumple máx. 55)*

---

### Paso 3 Alternativo: Cobertura Técnica (Para PPF, Antivandálico, WPF y Equipamiento)

* **H2:** `ÁREA DE COBERTURA` *(17 caracteres — Cumple máx. 25)*
* **Subtítulo:** `Definí los sectores a proteger.` *(31 caracteres — Cumple máx. 45)*

```html
<div class="coverage-grid">
  <div class="card">
    <h4>Frente Completo</h4>
    <p>Trompa, capot, paragolpes y ópticas.</p>
  </div>
  <div class="card">
    <h4>Zonas de Impacto</h4>
    <p>Paragolpes delantero y ópticas.</p>
  </div>
  <div class="card">
    <h4>Laterales Completos</h4>
    <p>Puertas y paneles laterales.</p>
  </div>
  <div class="card">
    <h4>Vehículo Total</h4>
    <p>Protección integral de carrocería.</p>
  </div>
</div>
<p class="notice">Presupuesto exacto según medidas y despiece en taller.</p>
```

---

### Paso 4: Resumen de Cotización & Conversión WhatsApp

#### Encabezado:
* **H2:** `RESUMEN DE COTIZACIÓN` *(21 caracteres — Cumple máx. 25)*
* **Subtítulo:** `Revisá tu configuración para agendar turno.` *(42 caracteres — Cumple máx. 45)*

#### Tarjeta de Orden Técnica:
```html
<div class="ticket-container">
  <div class="ticket-header">ORDEN TÉCNICA ESTIMADA</div>
  
  <div class="ticket-row">
    <span class="field">VEHÍCULO</span>
    <span class="value" id="summary-vehicle">Pick-up / Camioneta</span>
  </div>
  <div class="ticket-row">
    <span class="field">SERVICIO</span>
    <span class="value" id="summary-service">Polarizado Automotriz</span>
  </div>
  <div class="ticket-row">
    <span class="field">TONALIDAD</span>
    <span class="value" id="summary-tonality">Intermedio (20% VLT)</span>
  </div>
  <div class="ticket-row">
    <span class="field">TECNOLOGÍA</span>
    <span class="value" id="summary-tech">Nano Cerámica PS</span>
  </div>
  <div class="ticket-row highlight">
    <span class="field">PRESUPUESTO ESTIMADO</span>
    <span class="price-value" id="summary-price">$154.500</span>
  </div>
  
  <p class="ticket-legal">
    Valores para automóvil estándar. Garantía escrita emitida en taller.
  </p>
</div>
```

#### Botón CTA Principal a WhatsApp:
* **Texto de Acción:** `COTIZAR POR WHATSAPP` *(20 caracteres — Cumple estrictamente máx. 28)*

```html
<a 
  href="#" 
  id="whatsapp-cta-btn" 
  class="btn-whatsapp"
  target="_blank" 
  rel="noopener noreferrer"
>
  <svg class="whatsapp-icon" viewBox="0 0 24 24">...</svg>
  <span>COTIZAR POR WHATSAPP</span>
</a>
```

---

## 4. Generador de Mensaje Preformateado de WhatsApp

Para asegurar que el lead llegue precalificado al WhatsApp del taller (`+54 9 2615 190186`), utilizá esta función constructora:

```typescript
export function buildWhatsAppLink(selection: {
  vehicle: string;
  service: string;
  tonality?: string;
  technology?: string;
  price?: string;
  isPresidencial?: boolean;
}): string {
  const phone = "5492615190186";
  
  let message = "";
  if (selection.service === "Polarizado") {
    message = `¡Hola Pol-Art Mendoza! 👋 Vengo desde el cotizador web y quiero reservar mi turno:\n\n` +
      `🚗 Vehículo: ${selection.vehicle}\n` +
      `🛠️ Servicio: Polarizado\n` +
      `🕶️ Tonalidad: ${selection.tonality || "No especificada"}${selection.isPresidencial ? " (Aviso: Tono Presidencial)" : ""}\n` +
      `🔬 Tecnología: ${selection.technology || "No especificada"}\n` +
      `💰 Presupuesto estimado web: ${selection.price || "A confirmar"}\n\n` +
      `¿Tienen turnos disponibles para esta semana? Mi nombre es: `;
  } else {
    message = `¡Hola Pol-Art Mendoza! 👋 Armé mi consulta desde el cotizador web:\n\n` +
      `🚗 Vehículo: ${selection.vehicle}\n` +
      `🛠️ Servicio: ${selection.service}\n` +
      `🎯 Cobertura: ${selection.technology || "A coordinar"}\n` +
      `💰 Presupuesto: A cotizar según modelo en taller\n\n` +
      `¿Podrían indicarme disponibilidad y presupuesto para mi modelo? Mi nombre es: `;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

---

## 5. Tabla de Auditoría: Validación Rigurosa de Restricciones

| Campo | Límite Máximo Permitido | Longitud Real del Copy | Estado |
|---|---|---|---|
| **H2 Paso 1** | Máx. 25 caracteres | `SELECCIONÁ TU VEHÍCULO` (21 car.) | ✅ CUMPLE |
| **Subtítulo Paso 1** | Máx. 45 caracteres | `Definí el porte para calcular el material.` (42 car.) | ✅ CUMPLE |
| **H2 Paso 2** | Máx. 25 caracteres | `ELEGÍ EL SERVICIO` (17 car.) | ✅ CUMPLE |
| **Subtítulo Paso 2** | Máx. 45 caracteres | `Elegí la protección técnica para tu unidad.` (43 car.) | ✅ CUMPLE |
| **H2 Paso 3** | Máx. 25 caracteres | `TONALIDAD Y TECNOLOGÍA` (22 car.) | ✅ CUMPLE |
| **Subtítulo Paso 3** | Máx. 45 caracteres | `Elegí privacidad y rechazo térmico.` (35 car.) | ✅ CUMPLE |
| **Advertencia RTO** | Máx. 110 caracteres | `Tonalidad no homologada para la Revisión Técnica Obligatoria (RTO). Instalación a criterio del usuario.` (103 car.) | ✅ CUMPLE |
| **Badge Glue** | Máx. 2 palabras | `Económico` (1 palabra) | ✅ CUMPLE |
| **Bullet Glue 1** | Máx. 55 caracteres | `Tinte incorporado en adhesivo con filtro UV.` (44 car.) | ✅ CUMPLE |
| **Bullet Glue 2** | Máx. 55 caracteres | `Reduce el brillo solar a costo accesible.` (41 car.) | ✅ CUMPLE |
| **Badge Dyed** | Máx. 2 palabras | `Estándar` (1 palabra) | ✅ CUMPLE |
| **Bullet Dyed 1** | Máx. 55 caracteres | `Poliéster teñido de mayor estabilidad óptica.` (45 car.) | ✅ CUMPLE |
| **Bullet Dyed 2** | Máx. 55 caracteres | `Tono parejo sin decoloración prematura.` (39 car.) | ✅ CUMPLE |
| **Badge Dyed HP** | Máx. 2 palabras | `Alto Rendimiento` (2 palabras) | ✅ CUMPLE |
| **Bullet Dyed HP 1** | Máx. 55 caracteres | `Capa híbrida metalizada con mayor rechazo solar.` (48 car.) | ✅ CUMPLE |
| **Bullet Dyed HP 2** | Máx. 55 caracteres | `Disipa la radiación y protege el habitáculo.` (44 car.) | ✅ CUMPLE |
| **Badge Nano Carbon** | Máx. 2 palabras | `Larga Duración` (2 palabras) | ✅ CUMPLE |
| **Bullet Carbon 1** | Máx. 55 caracteres | `Partículas de carbón libre de metales.` (38 car.) | ✅ CUMPLE |
| **Bullet Carbon 2** | Máx. 55 caracteres | `Cero interferencia con celulares, GPS o TAG.` (44 car.) | ✅ CUMPLE |
| **Badge Cerámica PS** | Máx. 2 palabras | `Alta Gama` (2 palabras) | ✅ CUMPLE |
| **Bullet Cerámica PS 1** | Máx. 55 caracteres | `Frena el calor infrarrojo sin oscurecer de más.` (47 car.) | ✅ CUMPLE |
| **Bullet Cerámica PS 2** | Máx. 55 caracteres | `Visión cristalina hacia afuera de día y noche.` (46 car.) | ✅ CUMPLE |
| **Badge Cerámica Llumar**| Máx. 2 palabras | `Ultra Premium` (2 palabras) | ✅ CUMPLE |
| **Bullet Llumar 1** | Máx. 55 caracteres | `Máxima disipación térmica del mercado mundial.` (46 car.) | ✅ CUMPLE |
| **Bullet Llumar 2** | Máx. 55 caracteres | `Bloqueo infrarrojo superior y máxima garantía.` (46 car.) | ✅ CUMPLE |
| **H2 Paso 4** | Máx. 25 caracteres | `RESUMEN DE COTIZACIÓN` (21 car.) | ✅ CUMPLE |
| **Subtítulo Paso 4** | Máx. 45 caracteres | `Revisá tu configuración para agendar turno.` (42 car.) | ✅ CUMPLE |
| **CTA WhatsApp** | Máx. 28 caracteres | `COTIZAR POR WHATSAPP` (20 car.) | ✅ CUMPLE |
| **Botón Anterior** | Máx. 12 caracteres | `ANTERIOR` (8 car.) | ✅ CUMPLE |
| **Botón Siguiente** | Máx. 12 caracteres | `SIGUIENTE` (9 car.) | ✅ CUMPLE |

---
*Documento final de Copywriting emitido por WAFLERS. Listo para integración sin modificaciones.*
