# Sistema de Diseño UI/UX: Dark Luxury Automotriz
## Polarizados Pol-Art Mendoza — Versión 3.0
**Rol:** Agente Diseñador UI/UX — WAFLERS  
**Fecha:** Octubre 2026  
**Documento Fuente:** [`PRD.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/PRD.md) & `polart_onboarding/polart-manual-de-marca.pdf`  
**Estado:** Especificación Técnica Aprobada  

---

## 1. Fundamentos Visuales & Filosofía Dark Luxury

El sistema de diseño de **Polarizados Pol-Art Mendoza** traslada la experiencia de un taller de detailing y blindaje de alta gama al entorno digital:
* **Minimalismo Técnico y Funcional:** Cada elemento de interfaz responde a un propósito de conversión o clarificación técnica. Se eliminan ornamentos innecesarios, degradados ruidosos o elementos fuera de la normativa de marca.
* **Atmósfera Dark Luxury:** Fondo negro absoluto (`#000000`) combinado con tarjetas en carbón técnico (`#0D0D0D`), bordes estructurados en gris institucional (`#414141`) y contrastes nítidos en blanco puro (`#FFFFFF`).
* **Microinteracciones Hápticas/Táctiles:** Estados de selección precisos con resplandores controlados (*subtle glow*), bordes activos definidos y feedback visual inmediato para dispositivos móviles (donde ocurrirá más del 75% del tráfico).

---

## 2. Tokens CSS y Configuración para Tailwind

### 2.1 Paleta Cromática Institucional & Roles de Interfaz

| Nombre del Token | Código HEX | Código RGB | Rol Semántico / Uso en UI |
|---|---|---|---|
| `brand-black` | `#000000` | `rgb(0, 0, 0)` | Canvas principal, body background, header y footer. |
| `brand-charcoal` | `#0D0D0D` | `rgb(13, 13, 13)` | Superficie de tarjetas en estado inactivo / contenedores modales. |
| `brand-elevated` | `#141414` | `rgb(20, 20, 20)` | Tarjetas en hover, inputs activos y paneles secundarios. |
| `brand-active` | `#1A1A1A` | `rgb(26, 26, 26)` | Superficie de tarjeta seleccionada / activa en el precotizador. |
| `brand-gray` | `#414141` | `rgb(65, 65, 65)` | Bordes estructurales de 1px, divisores y elementos neutros (Manual oficial). |
| `brand-gray-light` | `#8C8C8C` | `rgb(140, 140, 140)` | Tipografía secundaria, microtextos, metadatos y subtítulos técnicos. |
| `brand-white` | `#FFFFFF` | `rgb(255, 255, 255)` | Tipografía primaria, logotipo oficial, bordes activos y botones primarios invertidos. |
| `whatsapp-green` | `#25D366` | `rgb(37, 211, 102)` | Botón principal de conversión en Paso 4 y botón flotante de WhatsApp. |
| `whatsapp-hover` | `#20BA5A` | `rgb(32, 186, 90)` | Estado hover del CTA de WhatsApp. |
| `rto-amber` | `#F59E0B` | `rgb(245, 158, 11)` | Alerta técnica y disclaimer legal al seleccionar tonalidad Presidencial. |
| `rto-amber-bg` | `#1A1300` | `rgb(26, 19, 0)` | Fondo del contenedor de advertencia RTO. |

---

### 2.2 Variables CSS Nativas (`:root` / Dark Mode)

```css
:root {
  /* Paleta Base */
  --color-brand-black: #000000;
  --color-brand-charcoal: #0D0D0D;
  --color-brand-elevated: #141414;
  --color-brand-active: #1A1A1A;
  --color-brand-gray: #414141;
  --color-brand-gray-light: #8C8C8C;
  --color-brand-white: #FFFFFF;

  /* Colores Funcionales / Conversión */
  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #20BA5A;
  --color-rto-amber: #F59E0B;
  --color-rto-amber-bg: #1A1300;

  /* Bordes & Superficies */
  --border-subtle: 1px solid rgba(65, 65, 65, 0.4);
  --border-default: 1px solid #414141;
  --border-focus: 1px solid #FFFFFF;
  --border-active: 1px solid rgba(255, 255, 255, 0.85);

  /* Sombras Dark Luxury */
  --shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.7);
  --shadow-active: 0 0 25px -5px rgba(255, 255, 255, 0.12);
  --shadow-whatsapp: 0 0 30px -4px rgba(37, 211, 102, 0.35);

  /* Radios de Esquinas */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Tipografías */
  --font-display: 'Akira Expanded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sans: 'Lato', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

---

### 2.3 Mapeo de Tokens para `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          charcoal: '#0D0D0D',
          elevated: '#141414',
          active: '#1A1A1A',
          gray: '#414141',
          'gray-light': '#8C8C8C',
          white: '#FFFFFF',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA5A',
        },
        rto: {
          amber: '#F59E0B',
          bg: '#1A1300',
        },
      },
      fontFamily: {
        display: ['Akira Expanded', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'luxury-card': '0 4px 24px -4px rgba(0, 0, 0, 0.8)',
        'luxury-active': '0 0 25px -2px rgba(255, 255, 255, 0.14)',
        'whatsapp-glow': '0 0 30px -4px rgba(37, 211, 102, 0.4)',
      },
      borderRadius: {
        card: '14px',
        badge: '6px',
        pill: '9999px',
      },
      letterSpacing: {
        'display-tight': '0.05em',
        'display-wide': '0.12em',
        'display-widest': '0.20em',
      },
    },
  },
  plugins: [],
};
```

---

## 3. Tipografía & Reglas de Composición

El manual de marca define dos familias tipográficas con funciones estrictamente divididas:

```
+-------------------------------------------------------------------------+
|                  AKIRA EXPANDED SUPER BOLD                              |
|   (Display / Titulares H1-H3 / Precios / Nombres de Marca / Mayúsculas)   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                             LATO REGULAR                                |
|   (Cuerpo de texto / Párrafos / Badges / UI / Formularios / Microcopy)  |
+-------------------------------------------------------------------------+
```

### 3.1 Reglas Mandatorias para **Akira Expanded Super Bold**
1. **Mayúsculas Estrictas:** Esta fuente **JAMÁS** debe usarse en minúsculas ni en formato *Title Case*. Usar siempre la clase utilitaria `uppercase`.
2. **Espaciado Obligatorio (`letter-spacing`):** Debido al ancho de sus glifos, requiere espaciado positivo para evitar que las letras se toquen:
   - Encabezados principales (H1 / Hero): `tracking-[0.15em]` o `tracking-widest`.
   - Encabezados de sección y pasos (H2): `tracking-[0.10em]` o `tracking-wider`.
   - Tarjetas y etiquetas cortas (H3): `tracking-[0.08em]`.
3. **Interlineado (`line-height`):** Mantenerlo ceñido para evitar saltos verticales excesivos (`leading-none` o `leading-tight`).
4. **Restricción de Densidad:** No usar Akira Expanded para párrafos, explicaciones ni textos de más de 4 palabras consecutivas.
5. **Declaración Web (@font-face) & Fallbacks:**
```css
@font-face {
  font-family: 'Akira Expanded';
  src: url('/fonts/AkiraExpanded-SuperBold.woff2') format('woff2'),
       url('/fonts/AkiraExpanded-SuperBold.woff') format('woff');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```
*Stack de Fallback Web:* `'Akira Expanded', 'Syne', 'Montserrat', -apple-system, sans-serif`.

---

### 3.2 Reglas para **Lato** (Lectura, Microcopy y UI)
1. **Jerarquía de Pesos:**
   - `font-light` (300): Textos auxiliares y notas al pie.
   - `font-normal` (400): Párrafos, descripciones de tecnología y cuerpo general.
   - `font-medium` (500): Labels de formularios y navegación.
   - `font-bold` (700): Badges técnicos, montos en moneda y botones de acción.
2. **Interlineado Respirable:** `leading-relaxed` (1.6) en párrafos y explicaciones de FAQs; `leading-normal` (1.4) en microcopys dentro de tarjetas.
3. **Legibilidad:** Color de texto en `text-brand-white` para elementos activos o primarios, y `text-brand-gray-light` (`#8C8C8C`) para descripciones secundarias.

---

### 3.3 Escala Tipográfica del Precotizador

| Nivel Jerárquico | Familia | Peso | Tamaño Móvil | Tamaño Desktop | Letter Spacing | Caso de Uso |
|---|---|---|---|---|---|---|
| **H1 (Hero)** | Akira Expanded | 800 | `1.75rem` (28px) | `2.50rem` (40px) | `+0.15em` | Título principal de la web / Precotizador |
| **H2 (Step Title)** | Akira Expanded | 800 | `1.25rem` (20px) | `1.65rem` (26px) | `+0.10em` | Encabezado de cada uno de los 4 pasos |
| **H3 (Card Title)** | Lato / Akira | 700 / 800 | `1.00rem` (16px) | `1.15rem` (18px) | `+0.05em` | Título de servicio o vehículo |
| **Precio Display** | Lato | 700 | `1.50rem` (24px) | `1.85rem` (30px) | `normal` | Precio de lámina (ej. `$154.500`) |
| **Párrafo / Body** | Lato | 400 | `0.95rem` (15px) | `1.00rem` (16px) | `normal` | Textos explicativos y respuestas FAQs |
| **Badges Técnicos** | Lato | 700 | `0.70rem` (11px) | `0.75rem` (12px) | `+0.05em` | Etiquetas de rendimiento en tarjetas |
| **Microcopy / Disclaimer** | Lato | 400 | `0.75rem` (12px) | `0.80rem` (13px) | `normal` | Advertencia RTO y notas legales |

---

## 4. Estructura UI del Precotizador Automático (The Core Feature)

El precotizador debe operar como un componente interactivo central, enmarcado dentro de un contenedor Dark Luxury con barra de progreso segmental y navegación persistente.

```
+-----------------------------------------------------------------------------------+
|  [P-LOGO] POL-ART PRECOTIZADOR               PASO [ 02 / 04 ]    [x] REINICIAR    |
|  [==========================--------------------------------------------------]  |
|                                                                                   |
|  PASO 02: SELECCIONÁ EL SERVICIO                                                 |
|  Elegí la solución técnica para tu vehículo.                                      |
|                                                                                   |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | [*] POLARIZADO     |  | [O] PPF 3M PRO     |  | [O] ANTIVANDÁLICO  |           |
|  | Control térmico    |  | Protección pintura |  | Seguridad cristales|           |
|  +--------------------+  +--------------------+  +--------------------+           |
|                                                                                   |
|  [<- ANTERIOR]                                                [SIGUIENTE ->]      |
+-----------------------------------------------------------------------------------+
```

---

### 4.1 Barra de Estado y Navegación del Precotizador
* **Indicador de Progreso:** Barra horizontal delgada (`h-[3px]`) con 4 segmentos. Los segmentos completados usan `bg-brand-white`; los pendientes usan `bg-brand-gray/30`.
* **Contador Numérico:** `01 / 04`, `02 / 04`, `03 / 04`, `04 / 04` en `font-sans font-bold text-xs text-brand-gray-light`.
* **Botones de Navegación:**
  * Botón *"Anterior"*: Texto secundario `text-brand-gray-light hover:text-brand-white` con icono de flecha hacia la izquierda.
  * Botón *"Siguiente"*: Botón con fondo blanco sólido `bg-brand-white text-brand-black font-bold uppercase rounded-md px-6 py-2.5 hover:bg-neutral-200 transition-all`.

---

### 4.2 Paso 1: Selección de Tipo de Vehículo
* **Disposición (Layout):** Grid de 6 tarjetas:
  * Móvil: `grid-cols-2 gap-3`
  * Tablet: `grid-cols-3 gap-4`
  * Desktop: `grid-cols-3 gap-5` (o 6 columnas horizontales si la pantalla es ancha).
* **Anatomía de la Tarjeta de Vehículo:**
  1. **Contenedor:** `bg-brand-charcoal border border-brand-gray/40 rounded-card p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:border-brand-gray hover:bg-brand-elevated hover:translate-y-[-2px]`.
  2. **Ícono SVG Vectorial:** Minimalista, trazo lineal de 1.5px en `stroke-brand-white` o `stroke-brand-gray-light` (40px x 40px).
  3. **Etiqueta (Label):** `font-sans font-bold text-sm uppercase tracking-wider text-brand-white mt-3`.
  4. **Estado Activo/Seleccionado:**
     * Borde: `border-brand-white`.
     * Fondo: `bg-brand-active`.
     * Resplandor: `shadow-luxury-active`.
     * Indicador: Checkmark circular de 18px en esquina superior derecha con fondo blanco e icono negro.
* **Opciones:** `Auto`, `SUV`, `Camioneta`, `Camión`, `Maquinaria`, `Otro`.

---

### 4.3 Paso 2: Selección de Servicio Principal
* **Disposición (Layout):** Grid de 5 tarjetas en 2 columnas (móvil) o 3 + 2 columnas equilibradas (desktop).
* **Anatomía de la Tarjeta de Servicio:**
  1. **Header de Tarjeta:** Ícono de servicio + Tag de categoría técnica (`font-sans text-[11px] font-bold text-brand-gray-light uppercase tracking-wider`).
  2. **Título de Servicio:** `font-display text-sm md:text-base uppercase tracking-wider text-brand-white mt-1`.
  3. **Micro-descripción:** 1 línea explicativa (`font-sans text-xs text-brand-gray-light mt-1`).
  4. **Badge de Dinámica:** 
     * Para Polarizado: `Píldora con borde blanco: "COTIZACIÓN INMEDIATA"`.
     * Para PPF / Antivandálico / WPF / Otros: `Píldora con borde gris: "ASESORÍA A MEDIDA"`.
* **Opciones:** `Polarizado`, `PPF 3M Pro Series`, `Antivandálico`, `WPF Parabrisas`, `Otros (LED / Detailing)`.

---

### 4.4 Paso 3: Matriz de Tecnologías & Tonalidades (Core Técnico)

#### Sub-Paso 3A: Selector de Tonalidad (Si Polarizado)
* **Selector Segmentado Horizontal (Tabs / Pills):**
  * Opciones: `Suave (50% VLT)`, `Intermedio (20% VLT)`, `Presidencial (05% VLT)`.
  * Visualizador interactivo de tintado: Un recuadro simulando un cristal con degradado que oscurece en tiempo real según la opción marcada.
* **Banner de Alerta RTO (Condicional Dinámico):**
  * **Disparador:** Se activa únicamente al seleccionar `Presidencial`.
  * **Estilos:**
    ```html
    <div class="mt-4 p-4 rounded-md bg-[#1A1300] border border-[#F59E0B]/60 flex items-start gap-3 animate-fade-in">
      <svg class="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" fill="currentColor">...</svg>
      <div>
        <p class="font-sans font-bold text-xs uppercase tracking-wider text-[#F59E0B]">
          Aviso Normativo RTO Mendoza
        </p>
        <p class="font-sans text-xs text-neutral-300 mt-1 leading-relaxed">
          Tonalidad de máxima privacidad. No homologada para la Revisión Técnica Obligatoria (RTO).
        </p>
      </div>
    </div>
    ```

#### Sub-Paso 3B: Matriz de Tecnologías (Lista / Grid con Precios)
* **Disposición:** Grid de 2 columnas en desktop (`grid-cols-2 gap-4`), lista vertical de 1 columna en móvil (`space-y-3`).
* **Anatomía de la Tarjeta de Tecnología:**

```
+-----------------------------------------------------------------------+
|  [ GLUE ]                                        [ BADGE: ECONÓMICO ] |
|                                                                       |
|  $90.500                                             (•) Seleccionar  |
|  PRECIO BASE ESTIMADO                                                 |
|                                                                       |
|  • Filtro solar UV estándar en masa.                                  |
|  • Reducción de resplandor básico para presupuestos medidos.          |
+-----------------------------------------------------------------------+
```

* **Elementos de la Tarjeta:**
  1. **Badge de Rendimiento (Píldora Superior Derecha):**
     * Glue -> `[ ECONÓMICO ]` (`border border-brand-gray text-brand-gray-light`)
     * Dyed -> `[ ESTÁNDAR ]` (`border border-brand-gray text-brand-white`)
     * Dyed HP -> `[ ALTO RENDIMIENTO ]` (`bg-neutral-800 text-brand-white`)
     * Nano Carbon -> `[ LARGA DURACIÓN ]` (`bg-neutral-800 text-brand-white`)
     * Nano Cerámica PS -> `[ ALTA GAMA ]` (`border border-brand-white text-brand-white font-bold`)
     * Nano Cerámica Llumar -> `[ ULTRA PREMIUM ]` (`bg-brand-white text-brand-black font-extrabold`)
  2. **Nombre de Tecnología:** `font-display text-sm md:text-base uppercase tracking-wider text-brand-white`.
  3. **Monto / Precio:** `font-sans font-bold text-2xl text-brand-white tracking-tight`.
  4. **Subtexto de Precio:** `"Precio base estimado"` en `text-[11px] text-brand-gray-light uppercase`.
  5. **Bullets Técnicos:** Máximo 2 líneas breves precedidas por punto blanco o tilde técnica minimalista.

#### Sub-Paso 3 Alternativo: Cobertura de PPF / Antivandálico / Otros
Si el usuario eligió un servicio diferente a Polarizado:
* Tarjetas de cobertura técnica (`Frente Completo`, `Paragolpes + Ópticas`, `Interiores`, `Vehículo Total`).
* Badge central: `"Presupuesto personalizado según medidas de fábrica"`.
* Precio indicado: `"A confirmar en taller"`.

---

### 4.5 Paso 4: Resumen de Precotización & Dispatch a WhatsApp

Diseño tipo **Orden de Trabajo Técnica / Ticket Dark Luxury**:

```
+-----------------------------------------------------------------------+
|  [P] POL-ART MENDOZA — RESUMEN DE COTIZACIÓN                         |
|  Centro Integral de Protección Vehicular                             |
|  -------------------------------------------------------------------  |
|  VEHÍCULO:              Pick-up / Camioneta                           |
|  SERVICIO:              Polarizado Automotriz                         |
|  TONALIDAD:             Intermedio (20% VLT)                          |
|  TECNOLOGÍA:            Nano Cerámica Premium Star                    |
|  GARANTÍA:              Garantía Escrita Oficial                      |
|  -------------------------------------------------------------------  |
|  PRESUPUESTO ESTIMADO:  $154.500                                      |
|  *Sujeto a confirmación dimensional en taller                         |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [WHATSAPP ICON]  COTIZAR POR WHATSAPP                          |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  [<- Modificar selección]                                             |
+-----------------------------------------------------------------------+
```

* **Botón Principal WhatsApp (CTA Flagship):**
  * Fondo: `bg-whatsapp (#25D366)`.
  * Hover: `hover:bg-whatsapp-hover (#20BA5A)`.
  * Texto: `text-black font-bold uppercase tracking-wider text-sm md:text-base`.
  * Padding: `py-4 px-8 w-full rounded-md flex items-center justify-center gap-3`.
  * Sombra / Resplandor: `shadow-whatsapp-glow transition-all duration-300 hover:scale-[1.01]`.
  * Microinteracción: Destello de luz diagonal sutil al cargar el paso 4 (*subtle shimmer keyframe*).

---

## 5. Restricciones Estrictas para el Copywriter (Character Limits)

Para garantizar que el diseño mantenga su carácter **Dark Luxury**, su respiración espacial y evite cualquier salto de línea desproporcionado en pantallas de 360px a 1440px, el equipo de Copywriting debe acatar obligatoriamente las siguientes restricciones:

| Elemento de Interfaz | Límite Máximo de Caracteres / Palabras | Ejemplo Permitido | Ejemplo Prohibido (Excede Límite) |
|---|---|---|---|
| **Título del Paso (H2)** | **Máx. 25 caracteres** | `ELEGÍ TU VEHÍCULO` (17) | `SELECCIONÁ EL TIPO Y MODELO DE TU VEHÍCULO` (44) |
| **Subtítulo del Paso** | **Máx. 45 caracteres** | `Para calcular dimensiones y material.` (39) | `Para que nuestro sistema calcule los rollos de material exactos.` (66) |
| **Label Vehículo (Paso 1)** | **Máx. 12 caracteres** | `Camioneta` (9) | `Camioneta Pick-Up Doble Cabina` (30) |
| **Título Servicio (Paso 2)** | **Máx. 18 caracteres** | `Antivandálico` (13) | `Láminas de Seguridad Antivandálicas` (36) |
| **Subtexto Servicio** | **Máx. 35 caracteres** | `Protección contra impactos.` (28) | `Blindaje total de ventanas para evitar robos y roturas.` (56) |
| **Badges de Tecnología** | **ESTRICTO: MÁX. 2 PALABRAS (16 chars)** | `Alta Gama` (9) | `Tecnología de Alta Gama Térmica para Cuyo` (42) |
| **Badges Permitidos:** | - | `Económico` / `Estándar` / `Alto Rendimiento` / `Larga Duración` / `Alta Gama` / `Ultra Premium` | Cualquier frase de 3 o más palabras |
| **Bullets de Tecnología** | **Máx. 2 bullets por card** | 2 items | 3 o más items |
| **Longitud por Bullet** | **Máx. 55 caracteres** | `Máximo rechazo térmico infrarrojo.` (34) | `Esta lámina de nanocerámica te va a rechazar todo el calor del sol mendocino.` (77) |
| **Aviso Legal RTO** | **Máx. 110 caracteres** | `Tonalidad de máxima privacidad. No homologada para RTO.` (55) | `Tené en cuenta que si ponés presidencial no vas a pasar la revisión técnica obligatoria de Mendoza porque es muy oscuro.` (121) |
| **CTA Botón WhatsApp** | **Máx. 28 caracteres** | `COTIZAR POR WHATSAPP` (20) | `ENVIAR MI PRESUPUESTO PERSONALIZADO AHORA POR WHATSAPP` (53) |
| **Botones Navegación** | **Máx. 12 caracteres** | `Siguiente` (9) / `Anterior` (8) | `Continuar al siguiente paso` (28) |

---

## 6. Estados de Interacción & Microinteracciones

### 6.1 Matriz de Estados de Componentes

| Estado | Fondo (`background`) | Borde (`border`) | Texto (`color`) | Sombra / Transformación |
|---|---|---|---|---|
| **Default (Inactivo)** | `#0D0D0D` | `1px solid rgba(65, 65, 65, 0.4)` | `#FFFFFF` (Títulos) / `#8C8C8C` (Desc) | Ninguna (`translate-y-0`) |
| **Hover (Puntero sobre card)** | `#141414` | `1px solid #414141` | `#FFFFFF` | `translate-y-[-2px]` / Transición 200ms ease-out |
| **Selected (Activo)** | `#1A1A1A` | `1px solid #FFFFFF` | `#FFFFFF` | `shadow-luxury-active` (`0 0 25px rgba(255,255,255,0.12)`) |
| **Focus-Visible (Teclado)** | `#141414` | `2px solid #FFFFFF` | `#FFFFFF` | `outline: 2px solid #FFFFFF; outline-offset: 2px` |
| **Disabled** | `#080808` | `1px solid rgba(65, 65, 65, 0.15)` | `#414141` | Opacidad 50% / `cursor-not-allowed` |

### 6.2 Animaciones Recomendadas
* **Transición entre pasos:** Desvanecimiento con desplazamiento horizontal sutil (`opacity: 0 -> 1`, `translateX: 12px -> 0px` en 250ms).
* **Aparición de Alerta RTO:** Expansión de altura suave con fade-in (`transition: all 200ms ease-in-out`).
* **Botón WhatsApp:** Pulso de resplandor atenuado cada 4 segundos (`@keyframes whatsappPulse { 0%, 100% { box-shadow: 0 0 20px rgba(37,211,102,0.3); } 50% { box-shadow: 0 0 35px rgba(37,211,102,0.6); } }`).

---

## 7. Directivas de Accesibilidad (a11y)
1. **Ratio de Contraste WCAG AAA:**
   - Texto blanco (`#FFFFFF`) sobre negro (`#000000` / `#0D0D0D`): Ratio **21:1** (Supera ampliamente el estándar 7:1).
   - Texto secundario gris (`#8C8C8C`) sobre `#0D0D0D`: Ratio **5.2:1** (Cumple WCAG AA para textos medianos y pequeños).
   - Botón WhatsApp verde (`#25D366`) con tipografía negra (`#000000`): Ratio **8.4:1** (Supera WCAG AAA).
2. **Navegación por Teclado:** Cada tarjeta del precotizador debe operar como un botón semántico (`<button type="button" role="radio" aria-checked="...">`) accesible mediante tabulador y operable con las teclas `Espacio` y `Enter`.
3. **Anuncios para Lectores de Pantalla:** El precio total calculado y el paso actual deben contar con el atributo `aria-live="polite"`.

---
*Documento emitido por el Agente Diseñador UI/UX de WAFLERS. Aprobado para implementación frontend.*
