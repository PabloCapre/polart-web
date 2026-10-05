# Informe de Aseguramiento de Calidad (QA Report)
## Precotizador Automático — Polarizados Pol-Art Mendoza (v3.0)
**Rol:** Agente Lead QA Auditor — WAFLERS  
**Fecha:** Octubre 2026  
**Ambiente:** Staging / Local Codebase (Modo Read-Only)  
**Documentos de Referencia:** [`PRD.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/PRD.md), [`design-system.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/design-system.md), [`dev-brief.md`](file:///g:/WAFLERS/waflers-agencia/polart-web/dev-brief.md)  
**Archivos Auditados:**
- [`index.html`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html)
- [`css/styles.css`](file:///g:/WAFLERS/waflers-agencia/polart-web/css/styles.css)
- [`js/main.js`](file:///g:/WAFLERS/waflers-agencia/polart-web/js/main.js)

---

## 1. Resumen Ejecutivo & Veredicto de Auditoría

```
+-------------------------------------------------------------------------------+
| ESTADO DE AUDITORÍA: ❌ RECHAZADO (CAMBIOS REQUERIDOS)                         |
| POLÍTICA APLICADA:   STAGING-FIRST GATEWAY — BLOQUEO DE PASO A PRODUCCIÓN     |
+-------------------------------------------------------------------------------+
```

El Frontend Engineer ha completado una base sólida para los Sprints 1 y 2, respetando gran parte de la paleta Dark Luxury, las fuentes institucionales y los textos del cotizador. Sin embargo, en cumplimiento estricto de la directiva **Staging-First**, la entrega **NO ES DECLARADA COMO PASSED** debido a la presencia de **desviaciones críticas de accesibilidad, omisión de un componente estructural del PRD, saltos de layout (CLS), redundancia en carga de activos y discrepancias en los tokens CSS**.

### Resumen Cuantitativo de Hallazgos
* 🔴 **Severidad Crítica (P0):** 2 hallazgos (Bloquean certificación WCAG y alcance PRD).
* 🟠 **Severidad Alta (P1):** 3 hallazgos (Afectan Core Web Vitals, CLS y rendimiento de red).
* 🟡 **Severidad Media (P2):** 3 hallazgos (Inconsistencia de tokens, UX y lectores de pantalla).
* 🟢 **Severidad Baja (P3):** 1 hallazgo (Discrepancia menor de copy).

---

## 2. Matriz de Auditoría por Categorías

| Categoría | Estado | Observación Principal |
|---|---|---|
| **1. Tokens CSS & Tailwind** | ⚠️ Desviación Menor | Se declararon tokens en `tailwind.config` pero se hardcodearon clases arbitrarias (`#25D366`, `#1A1300`). |
| **2. Tipografía & Jerarquía** | ✅ Cumple | Akira Expanded Super Bold y Lato aplicados correctamente con tracking y mayúsculas. |
| **3. Textos & Copy Exacto** | ⚠️ Desviación Menor | Coincidencia en un 98%; discrepancia en la nota al pie del Paso 3 Alternativo. |
| **4. Lógica de Estado & JS** | ✅ Cumple con reparos | Ramificación condicional y alerta RTO funcionan; navegación secundaria contradictoria en Paso 4. |
| **5. Enlace WhatsApp API** | ✅ Cumple | Codificación `encodeURIComponent` correcta y payload completo. |
| **6. Accesibilidad (a11y)** | ❌ FALLA (P0) | Tarjetas del Paso 3B maquetadas como `<div>` sin `tabindex="0"`; inaccesibles vía teclado. |
| **7. Performance Visual** | ❌ FALLA (P1) | Logotipo sin `loading="lazy"` ni dimensiones explícitas; doble import de fuentes en CSS y HTML. |
| **8. Alcance del PRD** | ❌ FALLA (P0) | Ausencia total del Widget de Google Maps estipulado en PRD.md (Sección 5.2). |

---

## 3. Desglose Detallado de Errores y Discrepancias

### 🔴 Hallazgo 01 (P0 - Crítico / Accesibilidad): Tarjetas de Tecnología (Paso 3B) inaccesibles por teclado
* **Ubicación:** [`index.html#L694-L850`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L694-L850)
* **Descripción del Error:** En los Pasos 1, 2, 3A y 3 Alternativo, las tarjetas se maquetaron como `<button type="button">`. Sin embargo, en el **Paso 3B (Matriz de Tecnologías)**, las 6 opciones (`Glue`, `Dyed`, `Dyed HP`, `Nano Carbon`, `Nano Cerámica PS`, `Nano Cerámica Llumar`) fueron creadas como elementos `<div>` con `role="radio"`, pero **sin `tabindex="0"`** ni listeners para eventos de teclado (`keydown` para `Enter` o `Espacio`).
* **Impacto:** Cualquier usuario que navegue usando la tecla `Tab` salta directamente por encima de toda la matriz de tecnologías hacia el footer, imposibilitando la selección de láminas sin ratón o puntero táctil. Viola la directiva de accesibilidad del `design-system.md` (Sección 7.2) y WCAG 2.1 AA.
* **Solución Requerida:** Reemplazar las etiquetas `<div>` por `<button type="button">` manteniendo las clases utilitarias y agregando `text-left w-full`.

---

### 🔴 Hallazgo 02 (P0 - Crítico / Alcance PRD): Omisión completa del Widget e Integración de Google Maps
* **Ubicación:** [`index.html`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html)
* **Descripción del Error:** La especificación de requerimientos de producto ([`PRD.md#L309-L318`](file:///g:/WAFLERS/waflers-agencia/polart-web/PRD.md#L309-L318)) establece obligatoriamente la integración de un **Widget de Google Maps** interactivo con carga diferida (`loading="lazy"`), tarjeta de autoridad local en Mendoza y botón directo *"Cómo llegar"*. En la maquetación entregada no existe ningún contenedor ni iframe de Google Maps.
* **Impacto:** Pérdida del pilar comercial de prueba social y ubicación local en Cuyo antes de enviar tráfico pago.
* **Solución Requerida:** Maquetar la sección institucional de Google Maps al pie del precotizador (antes del footer institucional) con su respectivo `iframe` y `loading="lazy"`.

---

### 🟠 Hallazgo 03 (P1 - Alto / Performance & Core Web Vitals): Logotipo oficial sin `loading="lazy"` ni dimensiones
* **Ubicación:** [`index.html#L88-L92`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L88-L92)
* **Descripción del Error:** La etiqueta `<img>` del isotipo Pol-Art (`./polart_onboarding/p-logo-blanco-sobre-negro-cuadrado.jpeg`) no cuenta con el atributo mandatorio `loading="lazy"` ni especifica atributos numéricos `width="40"` ni `height="40"`.
* **Impacto:** Puede provocar saltos de layout acumulados (CLS) durante el primer renderizado en conexiones móviles lentas.
* **Solución Requerida:** Añadir `loading="lazy" width="40" height="40" decoding="async"`.

---

### 🟠 Hallazgo 04 (P1 - Alto / Performance & Redundancia): Doble solicitud de fuentes web en HTML y CSS
* **Ubicación:** [`css/styles.css#L7-L8`](file:///g:/WAFLERS/waflers-agencia/polart-web/css/styles.css#L7-L8) vs [`index.html#L14-L17`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L14-L17)
* **Descripción del Error:** Las fuentes `Akira Expanded` y `Lato` se vinculan mediante etiquetas `<link>` pre-conectadas en el `<head>` de `index.html` y, de manera redundante, se vuelven a importar mediante directivas `@import url(...)` dentro de `css/styles.css`.
* **Impacto:** Los `@import` en hojas de estilo externas bloquean la cascada de renderizado, duplicando peticiones de red y penalizando el First Contentful Paint (FCP).
* **Solución Requerida:** Eliminar las líneas 7 y 8 de `css/styles.css`, conservando únicamente los `<link>` en `index.html`.

---

### 🟠 Hallazgo 05 (P1 - Alto / UI/UX & Layout Shift - CLS): Salto vertical en simulador de cristal
* **Ubicación:** [`index.html#L654`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L654) vs [`js/main.js#L383`](file:///g:/WAFLERS/waflers-agencia/polart-web/js/main.js#L383)
* **Descripción del Error:** En `index.html`, el elemento `#tint-glass-preview` inicia con altura `h-12` (48px). Sin embargo, cuando el usuario interactúa con cualquier tonalidad, la función `handleTonalitySelect` en `js/main.js` reescribe la clase a `h-14 sm:h-16` (56px en móvil, 64px en desktop).
* **Impacto:** Al hacer clic en las tonalidades se genera un movimiento brusco hacia abajo de todo el contenido subsiguiente (CLS detectable).
* **Solución Requerida:** Unificar la altura en `h-14 sm:h-16` tanto en el HTML como en la asignación dinámica de clases en JavaScript.

---

### 🟡 Hallazgo 06 (P2 - Medio / UX & Navegación): Contradicción en acción "Modificar selección anterior"
* **Ubicación:** [`index.html#L1061`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L1061) y [`js/main.js#L518-L521`](file:///g:/WAFLERS/waflers-agencia/polart-web/js/main.js#L518-L521)
* **Descripción del Error:** En el Paso 4, el enlace de texto dice `"← Modificar selección anterior"`, pero en `js/main.js` ejecuta `goToStep(1)` (enviando al usuario al inicio y desorientándolo). Simultáneamente, el botón `"Anterior"` del footer ejecuta `goToStep(3)`.
* **Impacto:** Dos botones con semántica de retroceso tienen comportamientos opuestos. Si el usuario desea ajustar la tecnología que acaba de elegir, el enlace lo expulsa hasta la selección de vehículos.
* **Solución Requerida:** Configurar `modifyBtn` para que invoque `goToStep(3)` (retroceder al paso de configuración tecnológica).

---

### 🟡 Hallazgo 07 (P2 - Medio / Sistema de Diseño): Clases utilitarias hardcodeadas en lugar de tokens
* **Ubicación:** [`index.html#L662`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L662) y [`index.html#L1046`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L1046)
* **Descripción del Error:** 
  - Alerta RTO: Se escribió `bg-[#1A1300] border-[#F59E0B]/60 text-[#F59E0B]` en vez de usar los tokens mapeados `bg-rto-bg border-rto-amber/60 text-rto-amber`.
  - Botón WhatsApp: Se escribió `bg-[#25D366] hover:bg-[#20BA5A] text-black shadow-[0_0_30px_-4px_rgba(37,211,102,0.4)]` en vez de `bg-whatsapp hover:bg-whatsapp-hover text-brand-black shadow-whatsapp-glow`.
* **Impacto:** Desacopla la vista del archivo `tailwind.config` y rompe la consistencia del Design System.
* **Solución Requerida:** Reemplazar por los tokens de Tailwind correspondientes.

---

### 🟡 Hallazgo 08 (P2 - Medio / Accesibilidad): Falta de atributo `aria-live="polite"` en datos dinámicos
* **Ubicación:** [`index.html#L157`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L157) y [`index.html#L1028`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L1028)
* **Descripción del Error:** Ni el contador de pasos (`#step-counter-text`) ni el precio final calculado (`#summary-price`) cuentan con `aria-live="polite"`, requerido en `design-system.md` (Sección 7.3).
* **Impacto:** Los usuarios de lectores de pantalla no reciben feedback auditivo cuando cambia el precio o se avanza de etapa.
* **Solución Requerida:** Añadir `aria-live="polite"` a ambas etiquetas.

---

### 🟢 Hallazgo 09 (P3 - Bajo / Copywriting): Texto no autorizado en Paso 3 Alternativo
* **Ubicación:** [`index.html#L959`](file:///g:/WAFLERS/waflers-agencia/polart-web/index.html#L959)
* **Descripción del Error:** En el contenedor de aviso de cobertura se incluyó la frase extra: `"<strong class="text-brand-white uppercase tracking-wider">Presupuesto a medida:</strong> Presupuesto exacto según medidas y despiece en taller. Incluye asesoramiento con muestras reales de película 3M."`
* **Impacto:** Discrepancia con el texto exacto aprobado en [`dev-brief.md#L188`](file:///g:/WAFLERS/waflers-agencia/polart-web/dev-brief.md#L188) (`notice: "Presupuesto exacto según medidas y despiece en taller."`).
* **Solución Requerida:** Limpiar el texto al string oficial aprobado por el Copywriter.

---

## 4. Diffs Exactos de Corrección (Unified Diff Format)

El equipo de Frontend debe aplicar los siguientes parches para subsanar los 9 hallazgos:

### Diff 1: Limpieza de `@import` en `css/styles.css`
```diff
--- a/css/styles.css
+++ b/css/styles.css
@@ -6,8 +6,6 @@
 
 /* 1. Inyección de Fuentes Web */
-@import url('https://fonts.cdnfonts.com/css/akira-expanded');
-@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Montserrat:wght@800;900&family=Syne:wght@700;800&display=swap');
 
 /* Fallback local para Akira Expanded */
 @font-face {
```

---

### Diff 2: Corrección de Tags, Tokens, a11y e Imágenes en `index.html`
```diff
--- a/index.html
+++ b/index.html
@@ -88,4 +88,7 @@
           <img 
             src="./polart_onboarding/p-logo-blanco-sobre-negro-cuadrado.jpeg" 
             alt="Isotipo Pol-Art" 
+            width="40"
+            height="40"
+            loading="lazy"
+            decoding="async"
             class="w-full h-full object-cover"
           >
@@ -157,3 +160,3 @@
-              <span id="step-counter-text" class="font-sans font-bold text-xs tracking-widest text-brand-gray-light uppercase bg-brand-black/60 px-2.5 py-1 rounded border border-brand-gray/30">
+              <span id="step-counter-text" aria-live="polite" class="font-sans font-bold text-xs tracking-widest text-brand-gray-light uppercase bg-brand-black/60 px-2.5 py-1 rounded border border-brand-gray/30">
                 PASO 01 / 04
               </span>
@@ -654,3 +657,3 @@
-              <div id="tint-glass-preview" class="w-full h-12 rounded-md border border-brand-gray/40 relative overflow-hidden flex items-center justify-between px-4 transition-all duration-300 bg-black/75">
+              <div id="tint-glass-preview" class="w-full h-14 sm:h-16 rounded-md border border-brand-gray/40 relative overflow-hidden flex items-center justify-between px-4 transition-all duration-300 bg-black/75">
                 <span class="text-[11px] font-sans font-bold tracking-wider text-neutral-400 z-10">INTERIOR CABINA</span>
@@ -662,3 +665,3 @@
-            <div id="rto-alert-box" class="hidden mt-4 p-4 rounded-md bg-[#1A1300] border border-[#F59E0B]/60 flex items-start gap-3 transition-all duration-300" role="alert">
-              <svg class="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
+            <div id="rto-alert-box" class="hidden mt-4 p-4 rounded-md bg-rto-bg border border-rto-amber/60 flex items-start gap-3 transition-all duration-300" role="alert">
+              <svg class="w-5 h-5 text-rto-amber shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
@@ -669,3 +672,3 @@
-                <p class="font-sans font-bold text-xs uppercase tracking-wider text-[#F59E0B]">
+                <p class="font-sans font-bold text-xs uppercase tracking-wider text-rto-amber">
                   Aviso Normativo RTO
@@ -694,5 +697,6 @@
-              <div 
-                role="radio" 
+              <button 
+                type="button"
+                role="radio" 
                 aria-checked="false"
                 data-tech-id="glue"
-                class="tech-card relative p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white"
+                class="tech-card w-full relative p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white"
@@ -717,3 +721,3 @@
-              </div>
+              </button>
@@ -959,3 +963,3 @@
-            <p class="font-sans text-xs text-neutral-300 leading-relaxed">
-              <strong class="text-brand-white uppercase tracking-wider">Presupuesto a medida:</strong> Presupuesto exacto según medidas y despiece en taller. Incluye asesoramiento con muestras reales de película 3M.
-            </p>
+            <p class="font-sans text-xs text-neutral-300 leading-relaxed">
+              Presupuesto exacto según medidas y despiece en taller.
+            </p>
@@ -1028,3 +1032,3 @@
-                <span id="summary-price" class="text-2xl sm:text-3xl font-display font-bold text-brand-white tracking-tight">
+                <span id="summary-price" aria-live="polite" class="text-2xl sm:text-3xl font-display font-bold text-brand-white tracking-tight">
                   $154.500
                 </span>
@@ -1046,3 +1050,3 @@
-              class="w-full py-4 px-6 rounded-md bg-[#25D366] hover:bg-[#20BA5A] text-black font-sans font-bold uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_0_30px_-4px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-[1.01] animate-whatsapp-pulse cursor-pointer"
+              class="w-full py-4 px-6 rounded-md bg-whatsapp hover:bg-whatsapp-hover text-brand-black font-sans font-bold uppercase tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 shadow-whatsapp-glow transition-all duration-300 hover:scale-[1.01] animate-whatsapp-pulse cursor-pointer"
```

---

### Diff 3: Adición de la Sección Google Maps en `index.html` (Requisito PRD 5.2)
```diff
--- a/index.html
+++ b/index.html
@@ -1134,6 +1134,29 @@
         </div>
       </div>
 
+      <!-- SECCIÓN INSTITUCIONAL: AUTORIDAD & GOOGLE MAPS (PRD 5.2) -->
+      <section class="mt-12 pt-8 border-t border-brand-gray/30">
+        <div class="text-center mb-6">
+          <span class="text-[11px] font-sans font-bold text-brand-gray-light uppercase tracking-widest block">Ubicación y Calificaciones</span>
+          <h3 class="text-lg sm:text-xl font-display tracking-wider text-brand-white uppercase mt-1">VISITÁ NUESTRO TALLER EN MENDOZA</h3>
+          <p class="text-xs font-sans text-brand-gray-light mt-1">Centro de instalación climatizado libre de polvo con garantía certificada.</p>
+        </div>
+        <div class="relative w-full h-72 sm:h-80 rounded-card overflow-hidden border border-brand-gray/40 shadow-luxury-card bg-brand-charcoal">
+          <iframe 
+            title="Ubicación Polarizados Pol-Art Mendoza"
+            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107198.81432882875!2d-68.8970425!3d-32.8894587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093ec45179bf%3A0x205a78f6d20efa3a!2sMendoza%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1710000000000!5m2!1ses!2sar"
+            width="100%" 
+            height="100%" 
+            style="border:0; filter: grayscale(85%) invert(90%) contrast(120%);" 
+            allowfullscreen="" 
+            loading="lazy" 
+            referrerpolicy="no-referrer-when-downgrade"
+            class="w-full h-full"
+          ></iframe>
+        </div>
+      </section>
+
     </div>
   </main>
```

---

### Diff 4: Corrección de Navegación Secundaria en `js/main.js`
```diff
--- a/js/main.js
+++ b/js/main.js
@@ -518,3 +518,3 @@
   if (modifyBtn) {
     modifyBtn.addEventListener("click", () => {
-      goToStep(1);
+      goToStep(3); // Retrocede a la configuración tecnológica en lugar de reiniciar al paso 1
     });
   }
```

---

## 5. Próximos Pasos & Instrucciones para el Frontend Engineer

1. Aplicar los diffs correspondientes a los 9 hallazgos enumerados.
2. Re-verificar que las 6 tarjetas de tecnología sean navegables utilizando únicamente la tecla `Tab` y seleccionables con `Enter` / `Espacio`.
3. Confirmar que la altura del simulador óptico sea estable (`h-14 sm:h-16`) sin provocar CLS al alternar entre Suave, Intermedio y Presidencial.
4. Solicitar una re-auditoría formal (Sprint Review 2.1) para levantar el bloqueo de Staging.

---
*Informe generado por el Agente Lead QA Auditor de WAFLERS. Bloqueo de Staging activo.*
