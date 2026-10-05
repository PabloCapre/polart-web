/**
 * ==========================================================================
 * POLARIZADOS POL-ART MENDOZA — PRECOTIZADOR AUTOMÁTICO (v3.1)
 * Sprint 3: Lógica de Interacción, Gestión de Estado Central y WhatsApp Directo
 * WAFLERS Frontend Engineering
 * ==========================================================================
 */

// 1. DICCIONARIO DE DATOS Y CONSTANTES OFICIALES (dev-brief.md)
const PRECOTIZADOR_DATA = {
  vehicles: [
    { id: "auto", name: "Auto", description: "Hatchback y sedán" },
    { id: "suv", name: "SUV", description: "Monovolumen y cross" },
    { id: "camioneta", name: "Camioneta", description: "Pick-up simple o doble" },
    { id: "camion", name: "Camión", description: "Cabina pesada y carga" },
    { id: "maquinaria", name: "Maquinaria", description: "Línea vial y agrícola" },
    { id: "otro", name: "Otro", description: "Especiales y furgones" }
  ],

  services: [
    {
      id: "polarizado",
      name: "Polarizado",
      description: "Control térmico y filtro UV.",
      badge: "COTIZACION INMEDIATA",
      isInstantQuote: true
    },
    {
      id: "ppf",
      name: "PPF 3M Pro Series",
      description: "Blindaje de pintura autorreparable.",
      badge: "ASESORIA A MEDIDA",
      isInstantQuote: false
    },
    {
      id: "antivandalico",
      name: "Antivandálico",
      description: "Lámina de seguridad contra golpes.",
      badge: "ASESORIA A MEDIDA",
      isInstantQuote: false
    },
    {
      id: "wpf",
      name: "WPF Parabrisas",
      description: "Escudo contra piedras en ruta.",
      badge: "ASESORIA A MEDIDA",
      isInstantQuote: false
    },
    {
      id: "otros",
      name: "Equipamiento LED",
      description: "Iluminación de alta potencia.",
      badge: "ASESORIA A MEDIDA",
      isInstantQuote: false
    }
  ],

  tonalities: [
    {
      id: "suave",
      name: "Suave (35% VLT)",
      vlt: "35%",
      description: "Máxima visión nocturna y filtro UV.",
      isRtoRestricted: false,
      opacityClass: "bg-black/40"
    },
    {
      id: "intermedio",
      name: "Intermedio (15% VLT)",
      vlt: "15%",
      description: "Equilibrio entre confort y visión.",
      isRtoRestricted: false,
      opacityClass: "bg-black/75"
    },
    {
      id: "presidencial",
      name: "Presidencial (05% VLT)",
      vlt: "05%",
      description: "Privacidad total desde afuera.",
      isRtoRestricted: true,
      opacityClass: "bg-black/95"
    }
  ],

  technologies: [
    {
      id: "glue",
      name: "Glue",
      price: 90500,
      formattedPrice: "$90.500",
      badge: "Económico",
      bullets: [
        "Tinte incorporado en adhesivo con filtro UV.",
        "Reduce el brillo solar a costo accesible."
      ]
    },
    {
      id: "dyed",
      name: "Dyed",
      price: 98500,
      formattedPrice: "$98.500",
      badge: "Estándar",
      bullets: [
        "Poliéster teñido de mayor estabilidad óptica.",
        "Tono parejo sin decoloración prematura."
      ]
    },
    {
      id: "dyed-hp",
      name: "Dyed HP",
      price: 117500,
      formattedPrice: "$117.500",
      badge: "Alto Rendimiento",
      bullets: [
        "Capa híbrida metalizada con mayor rechazo solar.",
        "Disipa la radiación y protege el habitáculo."
      ]
    },
    {
      id: "nano-carbon",
      name: "Nano Carbon",
      price: 127500,
      formattedPrice: "$127.500",
      badge: "Larga Duración",
      bullets: [
        "Partículas de carbón libre de metales.",
        "Cero interferencia con celulares, GPS o TAG."
      ]
    },
    {
      id: "nano-ceramic-ps",
      name: "Nano Cerámica PS",
      price: 154500,
      formattedPrice: "$154.500",
      badge: "Alta Gama",
      bullets: [
        "Frena el calor infrarrojo sin oscurecer de más.",
        "Visión cristalina hacia afuera de día y noche."
      ]
    },
    {
      id: "nano-ceramic-llumar",
      name: "Nano Cerámica Llumar",
      price: 225500,
      formattedPrice: "$225.500",
      badge: "Ultra Premium",
      bullets: [
        "Máxima disipación térmica del mercado mundial.",
        "Bloqueo infrarrojo superior y máxima garantía."
      ]
    }
  ],

  coverages: [
    { id: "frente", name: "Frente Completo", desc: "Trompa, capot, paragolpes y ópticas." },
    { id: "impacto", name: "Zonas de Impacto", desc: "Paragolpes delantero y ópticas." },
    { id: "laterales", name: "Laterales Completos", desc: "Puertas y paneles laterales." },
    { id: "total", name: "Vehículo Total", desc: "Protección integral de carrocería." }
  ]
};

// 2. GESTIÓN DE ESTADO CENTRAL DEL PRECOTIZADOR
const state = {
  currentStep: 1,
  totalSteps: 4,
  vehicleType: PRECOTIZADOR_DATA.vehicles[0], // Auto por defecto
  vehicleDetails: "",                         // Marca, modelo y año (obligatorio)
  clientName: "",                             // Nombre del cliente (obligatorio)
  service: PRECOTIZADOR_DATA.services[0],      // Polarizado por defecto
  tonality: PRECOTIZADOR_DATA.tonalities[1],   // Intermedio (15% VLT) por defecto
  technology: PRECOTIZADOR_DATA.technologies[4], // Nano Cerámica PS por defecto
  coverage: PRECOTIZADOR_DATA.coverages[0],    // Frente Completo por defecto
  isPresidencial: false
};

// 3. GENERADOR DE ENLACE DE WHATSAPP (dev-brief.md)
function buildWhatsAppLink(selection) {
  const phone = "5492615190186";
  const vehicleStr = selection.vehicleDetails 
    ? `${selection.vehicle} (${selection.vehicleDetails})` 
    : selection.vehicle;
  const clientNameStr = selection.clientName ? selection.clientName.trim() : "";

  let message = "";

  if (selection.service === "Polarizado") {
    message = `¡Hola Pol-Art Mendoza! 👋 Vengo desde el cotizador web y quiero reservar mi turno:\n\n` +
      `🚗 Vehículo: ${vehicleStr}\n` +
      `🛠️ Servicio: Polarizado\n` +
      `🕶️ Tonalidad: ${selection.tonality || "No especificada"}${selection.isPresidencial ? " (Aviso: Tono Presidencial)" : ""}\n` +
      `🔬 Tecnología: ${selection.technology || "No especificada"}\n` +
      `💰 Presupuesto estimado web: ${selection.price || "A confirmar"}\n\n` +
      `¿Tienen turnos disponibles para esta semana? Mi nombre es: ${clientNameStr}`;
  } else if (selection.service === "Equipamiento LED") {
    message = `¡Hola Pol-Art Mendoza! 👋 Armé mi consulta desde el cotizador web:\n\n` +
      `🚗 Vehículo: ${vehicleStr}\n` +
      `🛠️ Servicio: Equipamiento LED\n` +
      `💡 Consulta: Instalación y asesoría de kits LED\n` +
      `💰 Presupuesto: A cotizar según modelo en taller\n\n` +
      `¿Podrían indicarme disponibilidad y presupuesto para mi modelo? Mi nombre es: ${clientNameStr}`;
  } else {
    message = `¡Hola Pol-Art Mendoza! 👋 Armé mi consulta desde el cotizador web:\n\n` +
      `🚗 Vehículo: ${vehicleStr}\n` +
      `🛠️ Servicio: ${selection.service}\n` +
      `🎯 Cobertura: ${selection.technology || "A coordinar"}\n` +
      `💰 Presupuesto: A cotizar según modelo en taller\n\n` +
      `¿Podrían indicarme disponibilidad y presupuesto para mi modelo? Mi nombre es: ${clientNameStr}`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// 4. CONTROLADOR DE NAVEGACIÓN Y RENDERIZADO DE PASOS
function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > state.totalSteps) return;

  state.currentStep = stepNumber;

  // Ocultar todos los contenedores de paso
  const allStepContainers = document.querySelectorAll(".step-container");
  allStepContainers.forEach((container) => {
    container.classList.add("hidden");
    container.classList.remove("animate-step-in");
  });

  // Mostrar el contenedor correspondiente
  let currentTargetEl;
  if (stepNumber === 1) {
    currentTargetEl = document.getElementById("step-1");
  } else if (stepNumber === 2) {
    currentTargetEl = document.getElementById("step-2");
  } else if (stepNumber === 3) {
    // Ramificación condicional del Paso 3
    if (state.service.id === "polarizado") {
      currentTargetEl = document.getElementById("step-3-polarizado");
      const altSection = document.getElementById("step-3-alternative");
      if (altSection) altSection.classList.add("hidden");
    } else {
      currentTargetEl = document.getElementById("step-3-alternative");
      const polSection = document.getElementById("step-3-polarizado");
      if (polSection) polSection.classList.add("hidden");
    }
  } else if (stepNumber === 4) {
    currentTargetEl = document.getElementById("step-4");
    renderSummaryTicket();
  }

  if (currentTargetEl) {
    currentTargetEl.classList.remove("hidden");
    // Forzar re-trigger de animación
    void currentTargetEl.offsetWidth;
    currentTargetEl.classList.add("animate-step-in");
  }

  // Actualizar la Barra de Progreso y el Contador
  updateProgressBar();
  updateNavigationButtons();

  // NOTA: Se eliminó el scrollIntoView para mantener la posición exacta de lectura sin saltos de pantalla
}

// Actualización visual de los 4 segmentos de progreso
function updateProgressBar() {
  const stepText = document.getElementById("step-counter-text");
  if (stepText) {
    stepText.textContent = `PASO 0${state.currentStep} / 0${state.totalSteps}`;
  }

  for (let i = 1; i <= state.totalSteps; i++) {
    const seg = document.getElementById(`prog-seg-${i}`);
    if (seg) {
      if (i <= state.currentStep) {
        seg.className = "h-[3px] bg-brand-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300";
      } else {
        seg.className = "h-[3px] bg-brand-gray/30 rounded-full transition-all duration-300";
      }
    }
  }
}

// Actualización de los botones "Anterior" y "Siguiente"
function updateNavigationButtons() {
  const prevBtn = document.getElementById("btn-prev-step");
  const nextBtn = document.getElementById("btn-next-step");

  if (prevBtn) {
    if (state.currentStep === 1) {
      prevBtn.disabled = true;
      prevBtn.className = "inline-flex items-center gap-2 text-brand-gray-light/40 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-3 sm:px-4 py-2.5 rounded-md cursor-not-allowed select-none transition-colors";
    } else {
      prevBtn.disabled = false;
      prevBtn.className = "inline-flex items-center gap-2 text-brand-gray-light hover:text-brand-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-3 sm:px-4 py-2.5 rounded-md transition-colors cursor-pointer";
    }
  }

  if (nextBtn) {
    if (state.currentStep === 4) {
      // En el paso 4 el CTA principal es WhatsApp; ocultamos el botón siguiente
      nextBtn.classList.add("hidden");
    } else {
      nextBtn.classList.remove("hidden");
      nextBtn.innerHTML = `
        <span>Siguiente</span>
        <svg class="w-4 h-4 stroke-current stroke-2" viewBox="0 0 24 24" fill="none">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
    }
  }
}

// 5. MANEJADORES DE SELECCIÓN DE ESTADO
function handleVehicleSelect(vehicleId) {
  const vehicle = PRECOTIZADOR_DATA.vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) return;

  state.vehicleType = vehicle;

  // Actualizar UI de tarjetas
  document.querySelectorAll("[data-vehicle-id]").forEach((card) => {
    const isCurrent = card.getAttribute("data-vehicle-id") === vehicleId;
    card.setAttribute("aria-checked", isCurrent ? "true" : "false");
    
    const checkBadge = card.querySelector(".vehicle-check-badge");

    if (isCurrent) {
      card.className = "vehicle-card relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-card bg-brand-active border border-brand-white shadow-luxury-active transition-all duration-200 cursor-pointer group text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (checkBadge) checkBadge.classList.remove("hidden");
      const icon = card.querySelector(".vehicle-icon-wrapper");
      if (icon) icon.className = "vehicle-icon-wrapper w-12 h-12 flex items-center justify-center text-brand-white transition-transform group-hover:scale-105";
    } else {
      card.className = "vehicle-card relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (checkBadge) checkBadge.classList.add("hidden");
      const icon = card.querySelector(".vehicle-icon-wrapper");
      if (icon) icon.className = "vehicle-icon-wrapper w-12 h-12 flex items-center justify-center text-brand-gray-light group-hover:text-brand-white transition-all group-hover:scale-105";
    }
  });

  updateWhatsAppCta();
}

function handleServiceSelect(serviceId) {
  const service = PRECOTIZADOR_DATA.services.find((s) => s.id === serviceId);
  if (!service) return;

  state.service = service;

  document.querySelectorAll("[data-service-id]").forEach((card) => {
    const isCurrent = card.getAttribute("data-service-id") === serviceId;
    card.setAttribute("aria-checked", isCurrent ? "true" : "false");

    const checkBadge = card.querySelector(".service-check-badge");

    if (isCurrent) {
      card.className = "service-card relative flex flex-col justify-between p-5 rounded-card bg-brand-active border border-brand-white shadow-luxury-active transition-all duration-200 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (checkBadge) checkBadge.classList.remove("hidden");
    } else {
      card.className = "service-card relative flex flex-col justify-between p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (checkBadge) checkBadge.classList.add("hidden");
    }
  });

  updateWhatsAppCta();
}

function handleTonalitySelect(tonalityId) {
  const tonality = PRECOTIZADOR_DATA.tonalities.find((t) => t.id === tonalityId);
  if (!tonality) return;

  state.tonality = tonality;
  state.isPresidencial = tonality.isRtoRestricted;

  // Actualizar botones de tonalidad
  document.querySelectorAll("[data-tonality-id]").forEach((btn) => {
    const isCurrent = btn.getAttribute("data-tonality-id") === tonalityId;
    btn.setAttribute("aria-checked", isCurrent ? "true" : "false");

    if (isCurrent) {
      btn.className = "tonality-btn p-3.5 sm:p-4 rounded-card bg-brand-active border border-brand-white shadow-luxury-active text-left transition-all duration-200 cursor-pointer flex flex-col justify-between";
    } else {
      btn.className = "tonality-btn p-3.5 sm:p-4 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated text-left transition-all duration-200 cursor-pointer flex flex-col justify-between";
    }
  });

  // Disparador dinámico: Banner RTO
  const rtoAlert = document.getElementById("rto-alert-box");
  if (rtoAlert) {
    if (state.isPresidencial) {
      rtoAlert.classList.remove("hidden");
    } else {
      rtoAlert.classList.add("hidden");
    }
  }

  // Visualizador interactivo de tintado (simulador de cristal)
  const tintGlassPreview = document.getElementById("tint-glass-preview");
  if (tintGlassPreview) {
    tintGlassPreview.className = `w-full h-14 sm:h-16 rounded-md border border-brand-gray/40 relative overflow-hidden flex items-center justify-between px-4 transition-all duration-300 ${tonality.opacityClass}`;
    const vltLabel = document.getElementById("preview-vlt-label");
    if (vltLabel) vltLabel.textContent = tonality.vlt + " VLT";
  }

  updateWhatsAppCta();
}

function handleTechnologySelect(techId) {
  const tech = PRECOTIZADOR_DATA.technologies.find((t) => t.id === techId);
  if (!tech) return;

  state.technology = tech;

  document.querySelectorAll("[data-tech-id]").forEach((card) => {
    const isCurrent = card.getAttribute("data-tech-id") === techId;
    card.setAttribute("aria-checked", isCurrent ? "true" : "false");

    const radioDot = card.querySelector(".tech-radio-dot");

    if (isCurrent) {
      card.className = "tech-card relative p-5 rounded-card bg-brand-active border border-brand-white shadow-luxury-active transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (radioDot) {
        radioDot.className = "tech-radio-dot w-4 h-4 rounded-full border border-brand-white bg-brand-white flex items-center justify-center";
        radioDot.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-brand-black"></span>';
      }
    } else {
      card.className = "tech-card relative p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white";
      if (radioDot) {
        radioDot.className = "tech-radio-dot w-4 h-4 rounded-full border border-brand-gray/60 flex items-center justify-center";
        radioDot.innerHTML = '';
      }
    }
  });

  updateWhatsAppCta();
}

function handleCoverageSelect(coverageId) {
  const cov = PRECOTIZADOR_DATA.coverages.find((c) => c.id === coverageId);
  if (!cov) return;

  state.coverage = cov;

  document.querySelectorAll("[data-coverage-id]").forEach((card) => {
    const isCurrent = card.getAttribute("data-coverage-id") === coverageId;
    card.setAttribute("aria-checked", isCurrent ? "true" : "false");

    if (isCurrent) {
      card.className = "coverage-card relative p-5 rounded-card bg-brand-active border border-brand-white shadow-luxury-active transition-all duration-200 cursor-pointer text-left";
    } else {
      card.className = "coverage-card relative p-5 rounded-card bg-brand-charcoal border border-brand-gray/40 hover:border-brand-gray hover:bg-brand-elevated hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left";
    }
  });

  updateWhatsAppCta();
}

// 6. ACTUALIZACIÓN DINÁMICA DEL ENLACE DE WHATSAPP
function updateWhatsAppCta() {
  const whatsappCtaBtn = document.getElementById("whatsapp-cta-btn");
  if (!whatsappCtaBtn) return;

  const isPolarizado = state.service.id === "polarizado";
  const isOtros = state.service.id === "otros";

  const waPayload = {
    vehicle: state.vehicleType.name,
    vehicleDetails: state.vehicleDetails,
    clientName: state.clientName,
    service: state.service.name,
    tonality: isPolarizado ? state.tonality.name : undefined,
    technology: isPolarizado 
      ? state.technology.name 
      : (isOtros ? "Kits LED / Iluminación" : state.coverage.name),
    price: isPolarizado ? state.technology.formattedPrice : undefined,
    isPresidencial: isPolarizado ? state.isPresidencial : undefined
  };

  const waLink = buildWhatsAppLink(waPayload);
  whatsappCtaBtn.setAttribute("href", waLink);
}

// 7. RENDERIZADO DEL RESUMEN TÉCNICO (Paso 4)
function renderSummaryTicket() {
  const isPolarizado = state.service.id === "polarizado";
  const isOtros = state.service.id === "otros";

  // Inyección de textos de la Orden Técnica
  const vehicleEl = document.getElementById("summary-vehicle");
  const serviceEl = document.getElementById("summary-service");
  const tonalityRow = document.getElementById("summary-tonality-row");
  const tonalityEl = document.getElementById("summary-tonality");
  const techLabelEl = document.getElementById("summary-tech-label");
  const techEl = document.getElementById("summary-tech");
  const priceEl = document.getElementById("summary-price");
  const legalEl = document.getElementById("summary-legal");

  if (vehicleEl) {
    vehicleEl.textContent = state.vehicleDetails 
      ? `${state.vehicleType.name} (${state.vehicleDetails})` 
      : state.vehicleType.name;
  }
  if (serviceEl) serviceEl.textContent = state.service.name;

  if (isPolarizado) {
    if (tonalityRow) tonalityRow.classList.remove("hidden");
    if (tonalityEl) {
      tonalityEl.textContent = state.tonality.name + (state.isPresidencial ? " (Aviso RTO)" : "");
    }
    if (techLabelEl) techLabelEl.textContent = "TECNOLOGÍA";
    if (techEl) techEl.textContent = state.technology.name;
    if (priceEl) priceEl.textContent = state.technology.formattedPrice;
    if (legalEl) {
      legalEl.textContent = "Valores para automóvil estándar. Garantía escrita emitida en taller.";
    }
  } else if (isOtros) {
    // Equipamiento LED
    if (tonalityRow) tonalityRow.classList.add("hidden");
    if (techLabelEl) techLabelEl.textContent = "EQUIPAMIENTO";
    if (techEl) techEl.textContent = "Kits LED / Iluminación";
    if (priceEl) priceEl.textContent = "A cotizar en taller";
    if (legalEl) {
      legalEl.textContent = "Presupuesto exacto según modelo de lámpara y óptica. Garantía oficial en taller.";
    }
  } else {
    // Servicios alternativos (PPF, Antivandálico, WPF)
    if (tonalityRow) tonalityRow.classList.add("hidden");
    if (techLabelEl) techLabelEl.textContent = "COBERTURA";
    if (techEl) techEl.textContent = state.coverage.name;
    if (priceEl) priceEl.textContent = "A cotizar en taller";
    if (legalEl) {
      legalEl.textContent = "Presupuesto exacto según medidas y despiece en taller. Garantía oficial.";
    }
  }

  updateWhatsAppCta();
}

// 8. INICIALIZACIÓN DE EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("btn-prev-step");
  const nextBtn = document.getElementById("btn-next-step");
  const restartBtn = document.getElementById("btn-restart");
  const modifyBtn = document.getElementById("btn-modify-ticket");
  const vehicleInput = document.getElementById("vehicle-details-input");
  const vehicleError = document.getElementById("vehicle-details-error");
  const clientNameInput = document.getElementById("client-name-input");
  const clientNameError = document.getElementById("client-name-error");
  const whatsappCtaBtn = document.getElementById("whatsapp-cta-btn");

  // Navegación de botón "Anterior"
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.currentStep === 4 && state.service.id === "otros") {
        goToStep(2); // Equipamiento LED salta directo al Paso 2
      } else {
        goToStep(state.currentStep - 1);
      }
    });
  }

  // Navegación de botón "Siguiente" con validación de inputs
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (state.currentStep === 1) {
        const val = vehicleInput ? vehicleInput.value.trim() : "";
        if (!val) {
          if (vehicleError) vehicleError.classList.remove("hidden");
          if (vehicleInput) {
            vehicleInput.classList.add("border-amber-500", "focus:border-amber-400");
            vehicleInput.focus();
          }
          return;
        }
        state.vehicleDetails = val;
        if (vehicleError) vehicleError.classList.add("hidden");
        if (vehicleInput) {
          vehicleInput.classList.remove("border-amber-500", "focus:border-amber-400");
        }
        goToStep(2);
      } else if (state.currentStep === 2) {
        if (state.service.id === "otros") {
          goToStep(4); // Equipamiento LED salta directo al Paso 4
        } else {
          goToStep(3);
        }
      } else if (state.currentStep === 3) {
        goToStep(4);
      }
    });
  }

  // Botón Reiniciar
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (vehicleInput) {
        vehicleInput.value = "";
        vehicleInput.classList.remove("border-amber-500", "focus:border-amber-400");
      }
      if (vehicleError) vehicleError.classList.add("hidden");
      state.vehicleDetails = "";

      if (clientNameInput) {
        clientNameInput.value = "";
        clientNameInput.classList.remove("border-amber-500", "focus:border-amber-400");
      }
      if (clientNameError) clientNameError.classList.add("hidden");
      state.clientName = "";

      goToStep(1);
    });
  }

  // Botón Modificar Selección del Ticket
  if (modifyBtn) {
    modifyBtn.addEventListener("click", () => {
      if (state.service.id === "otros") {
        goToStep(2); // Para Equipamiento LED vuelve al Paso 2
      } else {
        goToStep(3); // Para Polarizado y Coberturas vuelve al Paso 3
      }
    });
  }

  // Validación y despacho de WhatsApp CTA en Paso 4
  if (whatsappCtaBtn) {
    whatsappCtaBtn.addEventListener("click", (e) => {
      const nameVal = clientNameInput ? clientNameInput.value.trim() : "";
      if (!nameVal) {
        e.preventDefault();
        if (clientNameError) clientNameError.classList.remove("hidden");
        if (clientNameInput) {
          clientNameInput.classList.add("border-amber-500", "focus:border-amber-400");
          clientNameInput.focus();
        }
        return;
      }

      state.clientName = nameVal;
      if (clientNameError) clientNameError.classList.add("hidden");
      if (clientNameInput) {
        clientNameInput.classList.remove("border-amber-500", "focus:border-amber-400");
      }

      updateWhatsAppCta();
    });
  }

  // Escuchar inputs en tiempo real
  if (vehicleInput) {
    vehicleInput.addEventListener("input", () => {
      state.vehicleDetails = vehicleInput.value.trim();
      if (state.vehicleDetails && vehicleError) {
        vehicleError.classList.add("hidden");
        vehicleInput.classList.remove("border-amber-500", "focus:border-amber-400");
      }
      updateWhatsAppCta();
    });
  }

  if (clientNameInput) {
    clientNameInput.addEventListener("input", () => {
      state.clientName = clientNameInput.value.trim();
      if (state.clientName && clientNameError) {
        clientNameError.classList.add("hidden");
        clientNameInput.classList.remove("border-amber-500", "focus:border-amber-400");
      }
      updateWhatsAppCta();
    });
  }

  // Click listeners para tarjetas de vehículos (Paso 1)
  document.querySelectorAll("[data-vehicle-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const vid = card.getAttribute("data-vehicle-id");
      handleVehicleSelect(vid);
    });
  });

  // Click listeners para tarjetas de servicios (Paso 2)
  document.querySelectorAll("[data-service-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const sid = card.getAttribute("data-service-id");
      handleServiceSelect(sid);
    });
  });

  // Click listeners para tonalidades (Paso 3A)
  document.querySelectorAll("[data-tonality-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tid = btn.getAttribute("data-tonality-id");
      handleTonalitySelect(tid);
    });
  });

  // Click listeners para tecnologías (Paso 3B)
  document.querySelectorAll("[data-tech-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const techId = card.getAttribute("data-tech-id");
      handleTechnologySelect(techId);
    });
  });

  // Click listeners para coberturas alternativas (Paso 3 Alternativo)
  document.querySelectorAll("[data-coverage-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const covId = card.getAttribute("data-coverage-id");
      handleCoverageSelect(covId);
    });
  });

  // Acordeón interactivo exclusivo para FAQs
  const faqDetails = document.querySelectorAll("#faqs details");
  faqDetails.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        faqDetails.forEach((otherDetail) => {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.removeAttribute("open");
          }
        });
      }
    });
  });

  // Inicializar estado en UI
  handleVehicleSelect(state.vehicleType.id);
  handleServiceSelect(state.service.id);
  handleTonalitySelect(state.tonality.id);
  handleTechnologySelect(state.technology.id);
  handleCoverageSelect(state.coverage.id);
  goToStep(1);
});
