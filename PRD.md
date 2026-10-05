# Documento de Requerimientos de Producto (PRD)
## Plataforma Web & Precotizador Automático — Polarizados Pol-Art Mendoza (v3.0)

**Cliente:** Gino Lanzilotta — Polarizados Pol-Art Mendoza  
**Agencia:** WAFLERS  
**Fecha de Emisión:** Octubre 2026  
**Estado:** Aprobado (Onboarding v3.0)  
**Documento Fuente:** `polart_onboarding/polart-manual-de-marca.pdf` & Planilla de Onboarding v3.0  

---

## 1. Resumen Ejecutivo y Objetivos

### 1.1 Perfil Comercial del Cliente
**Polarizados Pol-Art Mendoza** se posiciona como el centro integral de referencia en la región de Cuyo especializado en:
- **Láminas de Control Solar y Seguridad** (Polarizados técnicos, antivandálicos, rechazo IR/UV).
- **PPF (Paint Protection Film)**: Protección de pintura con poliuretano de grado óptico.
- **WPF (Windshield Protection Film)**: Blindaje exterior para parabrisas.
- **Equipamiento y Estética Vehicular**: Iluminación LED premium y Detailing profesional.

La marca opera con un estándar técnico elevado, respaldado por certificaciones directas de fabricantes globales y una política innegociable de garantía escrita en cada instalación.

### 1.2 Objetivos del Proyecto y Metas de Conversión
El activo digital centralizará la captación y cualificación de prospectos con los siguientes objetivos operacionales:
1. **Generación de Autoridad Inmediata:** Posicionar a Pol-Art como el único taller certificado para **PPF 3M Pro Series 200** en Mendoza, respaldado por marcas líderes (**3M, Premium Star, Nexgard, Garware**) y prueba social validada vía Google Maps.
2. **Cualificación y Conversión Automatizada (Core Funnel):** Eliminar la fricción de cotización mediante un **Precotizador Automático de 4 pasos**. Este flujo interactivo filtra al usuario según vehículo, servicio y tecnología antes de transferirlo a WhatsApp con un lead 100% preparado para el cierre comercial.
3. **Transparencia Normativa y Pedagógica:** Asesorar al usuario sobre los límites legales de la RTO (Revisión Técnica Obligatoria en Mendoza) y educar sobre la brecha térmica entre láminas tintadas tradicionales y nano-cerámicas de alto rendimiento.
4. **Métrica Clave (KPI Principal):** Tasa de finalización del precotizador y ratio de clics a WhatsApp (CTR > 18% sobre sesiones únicas orientadas a tráfico pago / Google Search / Instagram Ads).

---

## 2. Arquitectura del Precotizador Automático

El precotizador debe implementarse como un componente interactivo de alto rendimiento (SPA/Client-Side Component), con transiciones fluidas, feedback visual instantáneo y persistencia de estado local durante la sesión.

```mermaid
flowchart TD
    A["Paso 1: Selección de Tipo de Vehículo"] --> B["Paso 2: Selección de Servicio Principal"]
    B -->|Servicio = Polarizado| C["Paso 3A: Selección de Tonalidad"]
    C --> D["Paso 3B: Selección de Tecnología & Gama"]
    B -->|Servicio != Polarizado (PPF, Antivandálico, WPF, Otros)| E["Paso 3 Alternativo: Configuración de Cobertura / Asesoría"]
    D --> F["Paso 4: Resumen de Precotización & Dispatch a WhatsApp"]
    E --> F
```

### 2.1 Lógica Estricta de 4 Pasos

#### Paso 1: Tipo de Vehículo
El usuario selecciona la categoría de su vehículo para contextualizar el presupuesto y las dimensiones de instalación:
- `Auto` (Hatchback / Sedán)
- `SUV` (Monovolumen / Crossover)
- `Camioneta` (Pick-up cabina simple o doble)
- `Camión` (Cabina comercial / Transporte de carga)
- `Maquinaria` (Agrícola / Vial / Industrial)
- `Otro` (Embarcaciones, motorhomes, prototipos)

*Regla Frontend:* Al seleccionar una opción, se almacena en el estado `vehicleType` y se avanza automáticamente (o con botón "Siguiente" con microanimación).

#### Paso 2: Servicio Requerido
El usuario especifica la solución técnica que necesita:
- `Polarizado` (Control térmico, privacidad y filtro UV) -> *Activa flujo de cotización con precios cerrados en Paso 3.*
- `PPF (Paint Protection Film)` (Protección transparente autorregenerativa contra piedras y rayas).
- `Antivandálico` (Lámina de seguridad multicapa resistente a impactos y roturas).
- `WPF (Windshield Protection Film)` (Escudo para parabrisas contra impactos de ruta).
- `Otros` (Iluminación LED de alta potencia, Detailing vehicular, pulido y sellado).

*Regla Frontend:* Si `service === 'Polarizado'`, el flujo se ramifica hacia la selección de Tonalidad + Tecnología con precios. Si `service !== 'Polarizado'`, se desvía a la ramificación de servicio a medida.

#### Paso 3 (Lógica de Ramificación Condicional)

##### Ramificación A: Servicio = Polarizado

El usuario completa dos selecciones consecutivas dentro del paso 3:

###### Sub-Paso 3.1: Selección de Tonalidad
| Tonalidad | Visibilidad Luminosa Transmitida (VLT aprox.) | Descripción / Recomendación de Uso | Alerta Legal / Disclaimer |
|---|---|---|---|
| **Suave** | 35% - 50% | Tono claro; ideal para quienes priorizan visión nocturna sin perder filtro UV. | Apto según criterio de visibilidad. |
| **Intermedio** | 20% | El equilibrio estándar más solicitado; privacidad moderada y confort visual diurno. | Apto para luneta y laterales traseros. |
| **Presidencial** | 05% | Máxima privacidad y oscuridad total desde el exterior. | ⚠️ **Disclaimer Obligatorio:** *Tonalidad de máxima privacidad. No permitido por normativa de RTO (Revisión Técnica Obligatoria).* |

*Regla Frontend:* Si el usuario selecciona **Presidencial**, se debe renderizar un banner/badge de advertencia visual ámbar o rojo técnico indicando de forma explícita el aviso de RTO, sin bloquear la selección.

###### Sub-Paso 3.2: Selección de Tecnología y Precios de Referencia
El Frontend debe estructurar esta matriz con tarjetas interactivas que expongan nombre, precio sugerido y badge de performance:

| Identificador | Tecnología / Denominación | Precio Referencia (ARS) | Características Técnicas Clave | Badge UI |
|---|---|---|---|---|
| `TECH_GLUE` | **Glue** | **$90.500** | Lámina económica tintada en adhesivo. Filtro UV estándar. Durabilidad básica. | *Económico* |
| `TECH_DYED` | **Dyed** | **$98.500** | Poliéster teñido en masa. Mayor estabilidad de tono sin decoloración rápida. | *Estándar* |
| `TECH_DYED_HP` | **Dyed HP (High Performance)** | **$117.500** | Híbrido metalizado con poliéster teñido. Mayor rechazo de calor que láminas simples. | *Rendimiento Superior* |
| `TECH_NANO_CARBON` | **Nano Carbon** | **$127.500** | Partículas de carbón no reflectivas. Cero interferencia de señal. Color negro mate profundo. | *Larga Duración* |
| `TECH_NANO_CERAMIC_PS` | **Nano Cerámica Premium Star** | **$154.500** | Máximo rechazo térmico infrarrojo (IR). Claridad óptica interna superior. Sin efecto espejo. | *Alta Gama Térmica* |
| `TECH_NANO_CERAMIC_LLUMAR` | **Nano Cerámica Llumar** | **$225.500** | Lámina insignia mundial. Rechazo de calor extremo (+85% IR). Garantía máxima de durabilidad y prestigio. | *Ultra Premium Flagship* |

*Reglas de Cálculo Frontend:*
- El precio base corresponde a la categoría `Auto`. Para `SUV` o `Camioneta` el Frontend puede desplegar una nota aclaratoria: *"Precios de referencia para tamaño estándar de automóvil. Para vehículos de mayor porte o cristales adicionales, se valida ajuste en taller"*.
- El estado registra: `tonality` y `technology` (con `techName` y `price`).

##### Ramificación B: Servicio != Polarizado (PPF, Antivandálico, WPF, Otros)
Dado que estos servicios dependen del modelo exacto, año y superficie a cubrir (ópticas, paragolpes, trompa completa o vehículo completo):
- El Frontend despliega un selector de sub-alcance:
  - *Para PPF:* `Frente Completo (Trompa)`, `Paragolpes + Ópticas`, `Interiores / Zonas de Desgaste`, `Cobertura Total`.
  - *Para Antivandálico:* `Laterales 4 puertas`, `Laterales + Luneta`, `Paquete Completo con Parabrisas`.
  - *Para WPF:* `Parabrisas estándar`, `Parabrisas térmico / sensorizado`.
  - *Para Otros:* `Iluminación LED`, `Detailing y Corrección`, `Tratamiento Mixto`.
- Se muestra el badge: *"Cotización de precisión según medidas y espesor de lámina"*.
- El campo `price` se marca como `"A confirmar según modelo exacto"`.

#### Paso 4: Output de Mensaje Preformateado y Redirección a WhatsApp

Al completar el flujo, la pantalla presenta un panel de resumen con los datos elegidos y el botón de acción principal (CTA): **"Enviar Cotización a WhatsApp"**.

##### Parámetros de Enlace WhatsApp:
- **Número de Destino Oficial:** `+54 9 2615 190186`
- **Formato Internacional Limpio:** `5492615190186`
- **URL Base:** `https://wa.me/5492615190186?text=`

##### Plantilla de Mensaje para Caso Polarizado:
```text
¡Hola Pol-Art Mendoza! 👋 Vengo desde el cotizador web y quiero reservar/confirmar mi presupuesto:

🚗 Vehículo: {vehicleType}
🛠️ Servicio: Polarizado
🕶️ Tonalidad: {tonality} {esPresidencial ? "(Atención: Tono Presidencial elegido)" : ""}
🔬 Tecnología: {techName}
💰 Presupuesto estimado web: ${priceFormatted}

¿Tienen turnos disponibles en el taller para esta semana? Mi nombre es:
```

##### Plantilla de Mensaje para Servicios Alternativos (PPF, Antivandálico, WPF, Otros):
```text
¡Hola Pol-Art Mendoza! 👋 Armé mi consulta desde el cotizador web:

🚗 Vehículo: {vehicleType}
🛠️ Servicio: {service}
🎯 Cobertura / Interés: {subServiceCoverage}
💰 Presupuesto: A cotizar según modelo

¿Podrían indicarme disponibilidad y presupuesto para mi modelo? Mi nombre es:
```

*Regla Frontend:* La cadena final debe ser codificada estrictamente con `encodeURIComponent()` para asegurar compatibilidad en navegadores móviles (iOS/Android) y escritorio.

---

## 3. Directivas UI/UX y Sistema de Diseño

Información extraída directamente del manual de identidad corporativa (`polart-manual-de-marca.pdf`).

### 3.1 Identidad de Marca y Filosofía Visual
- **Concepto:** Minimalismo técnico, sobriedad, precisión y funcionalidad automotriz de alta gama.
- **Atmósfera:** "Dark Luxury & High Performance". El sitio debe operar con fondo oscuro profundo, recreando la experiencia visual de un taller de detailing/polarizado de primer nivel (luces de inspección, superficies oscuras y cristales de alta definición).

### 3.2 Paleta Cromática Institucional Oficial

| Rol de Color | Nombre del Tono | Código HEX | Código RGB | Código CMYK | Uso en Interfaz |
|---|---|---|---|---|---|
| **Fondo Primario** | Negro Absoluto | `#000000` | `rgb(0, 0, 0)` | `0, 0, 0, 100` / `0, 0, 0` | Fondo general de la aplicación, canvas principal y header. |
| **Superficie de Tarjetas** | Carbón Técnico | `#0D0D0D` / `#141414` | `rgb(13, 13, 13)` | Derivado para capas UI | Fondos de cards del precotizador, modales y contenedores de features. |
| **Acento Neutro / Bordes** | Gris Institucional | `#414141` | `rgb(65, 65, 65)` | `65, 55, 55, 55` | Bordes de inputs, divisores, cards inactivas, estados hover sutiles. |
| **Gris Secundario** | Gris Acero | `#8C8C8C` | `rgb(140, 140, 140)` | Derivado UI | Textos secundarios, descripciones técnicas y metadatos. |
| **Contraste / Tipografía** | Blanco Puro | `#FFFFFF` | `rgb(255, 255, 255)` | `0, 0, 0, 0` | Títulos primarios, logotipos, botones con fondo blanco (inversión) e íconos activos. |
| **Acento Funcional CTA** | Verde WhatsApp Oficial | `#25D366` | `rgb(37, 211, 102)` | Estándar WhatsApp | Exclusivo para botón final de conversión a WhatsApp y botón flotante de soporte. |
| **Alerta Técnica** | Ámbar Advertencia RTO | `#F59E0B` | `rgb(245, 158, 11)` | Estándar UI | Banderas de advertencia legal (disclaimer de tonalidad Presidencial). |

### 3.3 Tipografías Institucionales

#### 1. Tipografía Display / Titulares: **Akira Expanded Super Bold**
- **Clasificación:** Geométrica extendida, súper bold, mayúsculas imponentes.
- **Uso:** Logotipo Pol-Art, encabezados principales (H1, H2), títulos del precotizador y números de precios destacados.
- **Implementación Web:**
  - Importar vía `@font-face` utilizando los activos locales.
  - *Web-Safe Fallback Stack:* `'Akira Expanded', 'Syne', 'Montserrat', -apple-system, sans-serif`.
  - En Tailwind CSS: `font-display: ['Akira Expanded', 'sans-serif']`.
  - Regla: Siempre en `uppercase` con espaciado entre letras positivo (`tracking-wider` o `tracking-widest`).

#### 2. Tipografía de Lectura y UI: **Lato Regular**
- **Clasificación:** Humanista sans-serif equilibrada, alta legibilidad en pantalla.
- **Uso:** Cuerpo de texto, párrafos explicativos, etiquetas de formularios, microcopy, botones de navegación, badges técnicos y FAQs.
- **Variantes en UI:** Lato Regular (400), Lato Medium (500), Lato Bold (700).
- **Implementación Web:**
  - Google Fonts / CDN o auto-hospedada.
  - *Web-Safe Fallback Stack:* `'Lato', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
  - En Tailwind CSS: `font-sans: ['Lato', 'sans-serif']`.

### 3.4 Normativa de Uso de Marca (Restricciones del Manual)
- **Usos Prohibidos (Manual pág. 06):**
  - ❌ Prohibido agrupar el isotipo 'P' y la palabra 'POLART' de formas no autorizadas.
  - ❌ Prohibido distorsionar, estirar o condensar la relación de aspecto del logotipo.
  - ❌ Prohibido alterar o sustituir los colores institucionales (la marca vive estrictamente en su versión blanco sobre fondo negro o escala de grises técnica).
- **Reducciones Mínimas (Manual pág. 07):**
  - Isotipo 'P' solo: tamaño mínimo `0,7 cm` (aprox. `24px` en web).
  - Logo completo (Isotipo + Wordmark): tamaño mínimo `1,5 cm` (aprox. `56px` en web). Para aplicaciones de lectura reducida, reforzar el trazo visual.
- **Activos disponibles en el repositorio:**
  - `polart_onboarding/p-logo-blanco-sobre-negro.jpeg`
  - `polart_onboarding/p-y-polart-logo-blanco-sobre-negro.jpeg`
  - `polart_onboarding/polart-logo-blanco-sobre-negro.jpeg`
  - `polart_onboarding/polart-logos.pdf`

---

## 4. Directivas de Copywriting y Estrategia de Mensajes

### 4.1 Tono de Voz Institucional
- **Técnico y Especializado:** Hablamos con el vocabulario exacto de la física del vidrio y la protección automotriz (nanopartículas cerámicas, rechazo infrarrojo, poliuretano alifático, protección UV 99%).
- **Directo y Resolutivo:** Sin promesas vacías ni marketing exagerado. El cliente busca resolver un problema concreto: calor sofocante en el habitáculo, rotura por inseguridad, deterioro de la pintura o estética premium.
- **Confiable y Riguroso:** Cada instalación cuenta con garantía por escrito y materiales trazables con sello de fábrica.
- **Tagline Oficial de Marca:**  
  > *"Especialistas en láminas de control solar y visual."*

### 4.2 Diferenciadores Clave para la Landing
1. **Únicos Instaladores de PPF 3M Pro Series 200 en Mendoza:** Certificación directa para manipular el estándar de protección contra impactos más avanzado de la industria.
2. **Respaldo de Marcas Oficiales:** Trabajo exclusivo con rollos cerrados originales de **3M, Premium Star, Nexgard y Garware**. Cero materiales genéricos o de descarte.
3. **Garantía Escrita:** Seguridad total contra desprendimiento, cambio de coloración o burbujas.
4. **Instalación en Taller Climatizado y Libre de Polvo:** Sala técnica adaptada para evitar contaminación en el curado de láminas.

### 4.3 Segmentación Técnica de Láminas (Argumentario de Venta)

Para que el usuario comprenda el valor de cada salto de precio en el precotizador:
1. **Glue ($90.500):** La opción básica accesible. Oscurece el cristal para privacidad y reducción del brillo diurno. Ideal para presupuestos ajustados.
2. **Dyed ($98.500):** Poliéster teñido en profundidad. Ofrece estabilidad de color uniforme a lo largo del tiempo sin degradarse a tonos violetas.
3. **Dyed HP ($117.500):** Estructura combinada con metalizado fino. Eleva el porcentaje de rechazo solar reflejando mayor radiación directa.
4. **Nano Carbon ($127.500):** Tecnología libre de metales. Brinda un acabado negro azabache de alta definición que jamás interfiere con sensores GPS, antenas integradas ni telefonía móvil.
5. **Nano Cerámica Premium Star ($154.500):** Bloqueo selectivo de calor. Sus partículas microscópicas de cerámica frenan la radiación infrarroja (la principal causante del calor sofocante) manteniendo una visibilidad cristalina hacia el exterior.
6. **Nano Cerámica Llumar ($225.500):** La referencia máxima en la industria automotriz mundial. Reducción térmica radical, confort de marcha insuperable bajo el sol mendocino y durabilidad de por vida.

### 4.4 Preguntas Frecuentes Requeridas (Sección FAQs)

#### FAQ 1: ¿Qué tonalidad de polarizado está permitida para aprobar la RTO en Mendoza?
> *Respuesta:* La normativa de la Revisión Técnica Obligatoria (RTO) exige que el parabrisas permanezca completamente transparente y que los cristales laterales y luneta mantengan niveles de transmisión luminosa seguros (tonalidades suaves o intermedias homologadas). La tonalidad **Presidencial (05%)** no cumple los requerimientos de visibilidad técnica para la RTO, por lo que su instalación queda bajo exclusiva elección del propietario para fines particulares o exhibición.

#### FAQ 2: ¿Cuál es la diferencia real entre una lámina estándar (Glue/Dyed) y una Nano Cerámica?
> *Respuesta:* Una lámina común solo reduce el paso de la luz visible (oscurece), pero deja pasar la mayor parte de la radiación infrarroja, que es la verdadera responsable de calentar el interior del auto. La tecnología **Nano Cerámica** contiene millones de micropartículas capaces de rechazar hasta más del 80% del calor infrarrojo sin necesidad de oscurecer excesivamente el cristal, logrando un habitáculo fresco y protegiendo tapizados y electrónica del vehículo.

#### FAQ 3: ¿Qué ventajas tiene el PPF (Paint Protection Film) frente a un tratamiento cerámico de pintura?
> *Respuesta:* El tratamiento cerámico es un recubrimiento químico líquido que aporta brillo e hidrofobia superficial, pero no resiste el impacto mecánico de piedrazos en ruta o raspones de estacionamiento. El **PPF (como el 3M Pro Series 200)** es una película física de poliuretano alifático de alto espesor con memoria elástica y capacidad autorregenerativa: ante un golpe de piedra o rayón superficial, la lámina absorbe el impacto y se repara sola con el calor del sol, preservando intacta la pintura original de fábrica.

#### FAQ 4: ¿Cuánto demora la colocación y cómo funciona la garantía escrita?
> *Respuesta:* Una instalación completa de polarizado toma entre 2 y 4 horas según el vehículo. Para aplicaciones de PPF o Antivandálico integral, el plazo promedio es de 24 a 48 horas debido al proceso de ajuste milimétrico y secado. Al retirar la unidad, te entregamos tu certificado de **garantía escrita**, que avala el material contra decoloración, burbujas o desprendimientos.

#### FAQ 5: ¿Las láminas polarizadas bloquean la señal del celular, TAG de peaje o GPS?
> *Respuesta:* Nuestras láminas de gama **Nano Carbon** y **Nano Cerámica** son 100% no metalizadas, por lo que garantizan cero interferencia electromagnética con dispositivos móviles, radares, sistemas de navegación satelital o telepeajes.

---

## 5. Requisitos Técnicos, Integraciones y Despliegue

### 5.1 Integración WhatsApp
- **Mecanismo:** Deep Linking HTTP y URL Scheme móvil (`wa.me` fallback a `api.whatsapp.com`).
- **Número Asignado:** `+54 9 2615 190186` (Contacto: Gino Lanzilotta).
- **Validación:**
  - El botón no debe dispararse con campos vacíos.
  - La URL resultante debe respetar codificación estricta de espacios (`%20`) y saltos de línea (`%0A`).
  - Evento de analítica: Lanzar evento de conversión `gtag('event', 'generate_lead', { service: selectedService, value: estimatedPrice })` antes del redirect.

### 5.2 Widget e Integración de Google Maps
- **Objetivo:** Generar confianza local en Mendoza, facilitar la llegada física del cliente y mostrar las valoraciones y reseñas del taller.
- **Implementación:**
  - Embed interactivo optimizado mediante `iframe` responsive con `loading="lazy"` para no penalizar el First Contentful Paint (FCP).
  - Tarjeta flotante con dirección física, horarios de atención, botón directo "Cómo llegar" (Google Maps Directions) y llamada a la acción de contacto rápido.
  - Bloque visual de autoridad destacando: *"Valoraciones 5 estrellas en Google Mendoza"*.

### 5.3 Stack Tecnológico y Optimización Web (Core Web Vitals)
- **Framework Recomendado:** Next.js (App Router) o React + Vite.
- **Estilos:** Tailwind CSS con variables de marca personalizadas (`colors.brand-black: #000000`, `colors.brand-gray: #414141`, `fontFamily.display: ['Akira Expanded']`, `fontFamily.sans: ['Lato']`).
- **Performance:**
  - Imágenes en formato `.webp` / `.avif` con compresión optimizada.
  - CSS purge estricto para mantener el bundle por debajo de 50 KB.
  - Tipografía `Akira Expanded` cargada con `font-display: swap;`.
- **Accesibilidad (a11y):**
  - Contraste visual conforme a WCAG AAA (texto blanco sobre negro `#000000` = ratio de contraste 21:1).
  - Soporte completo para navegación por teclado en el precotizador (teclas `Tab`, `Enter`, `Espacio`).
  - Atributos `aria-live="polite"` en el contenedor de resumen para anunciar los cambios de precio a lectores de pantalla.

### 5.4 Despliegue y CI/CD
- **Entorno de Producción:** Vercel / Netlify / Firebase Hosting.
- **Dominio:** Configuración con HTTPS forzado, encabezados de seguridad HSTS y compresión Brotli activada.
- **Testing Pre-Lanzamiento:**
  1. Verificación en resoluciones móviles estándar (360px, 390px, 414px) y desktop (1440px).
  2. Test de redirección de WhatsApp en navegadores Safari iOS, Chrome Android y navegadores embebidos de Instagram/Facebook.
  3. Comprobación del disclaimer de RTO al seleccionar la tonalidad Presidencial.

---

## 6. Checklist de Implementación por Disciplina

### Para el Equipo de Frontend:
- [ ] Configurar tokens de Tailwind con la paleta `#000000`, `#414141`, `#FFFFFF`, `#25D366`.
- [ ] Configurar fuentes `Akira Expanded Super Bold` para títulos y `Lato` para párrafos e interfaces.
- [ ] Desarrollar el componente interactivo `Precotizador` con gestión de estado de 4 pasos.
- [ ] Integrar advertencia condicional para la opción de polarizado "Presidencial" (Aviso RTO).
- [ ] Implementar la función de generación y escape de URL para WhatsApp con el número `5492615190186`.
- [ ] Integrar el iframe responsive de Google Maps con carga diferida (`loading="lazy"`).

### Para el Equipo de Copywriting y Contenido:
- [ ] Redactar microcopys explicativos para cada una de las 6 tecnologías de láminas.
- [ ] Asegurar presencia del disclaimer legal de RTO.
- [ ] Desplegar las 5 FAQs técnicas con el tono sobrio, confiable y directo de Pol-Art.
- [ ] Destacar la exclusividad de instalación de **PPF 3M Pro Series 200** en Mendoza.

### Para el Equipo de QA / Lanzamiento:
- [ ] Probar el flujo completo del cotizador en dispositivos móviles de distintas gamas.
- [ ] Verificar que la URL de WhatsApp abra correctamente en la aplicación nativa sin caracteres rotos.
- [ ] Comprobar tiempos de carga (Lighthouse score > 90 en Performance, SEO y Accesibilidad).

---
*Documento aprobado para inicio de desarrollo inmediato. Pol-Art Mendoza x WAFLERS.*
