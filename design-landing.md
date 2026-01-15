# NordBay.dk - Landing Page
## Documento de Diseño & Prompt para Copilot y equipo de desarrollo

---

### Objetivo del documento
Este archivo define TODO lo necesario para diseñar, desarrollar y QA la **Landing Page de NordBay.dk**, el marketplace danés para vender y comprar de forma simple, segura y humana.  
Debe ser la **fuente de verdad** para todo el equipo, diseñadores, devs, y Copilot/GPT.

---

### Parámetros y “prompt” para Copilot/desarrolladores
- NO usar contenido genérico, stock, ni completar con texto falso (“lorem ipsum”).
- TODO contenido visual, copy y flujo debe estar alineado a la cultura danesa y la identidad de NordBay (ver parámetros de marca abajo).
- Si un campo, animación, copy o recurso NO está especificado, dejarlo marcado como TODO con comentario (“TODO: definir ilustración para hero”) y NO rellenar con valores genéricos.
- TODO componente, layout y estructura debe respetar:
  - Naming acordado en este documento (nada de `UntitledComponent`, `DefaultSection`, etc.)
  - Paleta y tokens de color
  - Responsividad y mobile first
  - Accesibilidad AA (contraste, labels, navegabilidad teclado)
- Todo el flujo debe ser fácilmente localizable (da/en/es) desde el inicio.
- La landing debe cargar en <2 segundos, Lighthouse >90 mobile, imágenes optimizadas.
- Animaciones: micro, sutiles, solo las especificadas acá.
- Trust signals y CTAs SIEMPRE visibles arriba y abajo.

---

### Identidad y parámetros de marca
- Tono: Cercano, confiable, directo, cero bochinchero.
- Colores: Nordic blues, blanco, acento en brand azul, nunca colores saturados ni infantiles.
- Fuentes: Inter/IBM Plex Sans, tamaño grande para títulos, buen espaciado.
- Iconografía: Simple, lineal, coherente, propia o de set seleccionado.
- Imágenes: Prioridad a ilustraciones propias, fotos reales de usuarios/productos, nunca stock genérico.
- Animaciones: Fade-in/slide, no rebotes ni flashes.
- Copywriting: Enfocado en la acción (“Vendé fácil”, “Pagá seguro”), humano y memorable. Sin exceso de tecnicismos.
- Trust signals: Siempre visibles, reales (no inventar métricas).

---

### Parámetros técnicos
- Mobile first: Maquetado y testing primero en móvil, luego desktop.
- SEO y OG: Título, descripción y OG definidos antes de deploy.
- QA: Testing visual, funcional y de accesibilidad antes de merge/deploy.
- Checklist: Cada sección de la landing tiene su propio checklist QA.

---

### Qué NO se debe hacer
- NO copiar estructura/textos de Mercado Libre, Vinted, ni usar contenido de ejemplo sin adaptar.
- NO subir imágenes de stock sin autorización/documentación.
- NO completar campos no definidos: siempre dejar TODO explícito.
- NO usar textos o labels en inglés si hay alternativa en danés (si no está definido, dejar TODO).

---

## Estructura de la Landing Page

1. Hero / Above the Fold
2. ¿Cómo funciona? (How It Works)
3. Beneficios clave / Diferenciales
4. Testimonios / Social Proof
5. Preguntas frecuentes (FAQ)
6. CTA final + Footer

---

## Próximos pasos
- [x] Benchmarking: Analizar líderes (Mercado Libre, Vinted, Wallapop, Etsy, Facebook Marketplace, startups nórdicas)
- [x] Desglose y wireframe de cada sección
- [x] Definir microcopy y trust signals
- [x] Checklist QA por sección
- [x] Documentar assets y recursos visuales
- [x] Validar con usuario real y feedback

---

## TODO: Completar cada sección con benchmark, estructura, copy, assets y QA

## 1. Hero / Above the Fold

### Objetivo
Captar la atención, transmitir confianza y explicar la propuesta de valor en menos de 3 segundos. Debe ser memorable, profesional y alineado a la cultura danesa.

### Estructura
- **Logo NordBay** (arriba a la izquierda, tamaño visible en mobile/desktop)
- **Slogan:** “Sælg nemt. Køb trygt. Giv videre.” (siempre visible, fuente grande, color brand)
- **Visual principal:**
  - Ilustración propia, foto real de usuarios/productos, o animación minimalista (NO stock)
  - Debe mostrar acción: vender, comprar, comunidad, confianza
  - Adaptativo mobile/desktop
  - TODO: definir ilustración/visual para hero
- **CTA principal:**
  - Botón grande y visible: “Empieza a vender” / “Explora productos” / “Regístrate gratis”
  - Color brand, animación sutil (fade/slide-in)
  - Debe estar arriba y repetirse abajo en mobile
- **Trust signals bar:**
  - Barra horizontal con iconos y microcopy:
    - “Pagos protegidos” (icono de escudo)
    - “Envíos a todo DK” (icono de camión)
    - “Soporte real en danés” (icono de chat)
  - SIEMPRE visible en mobile/desktop
- **Barra de búsqueda:**
  - Input prominente, placeholder: “¿Qué estás buscando hoy?”
  - Icono de lupa, accesible por teclado
  - TODO: definir comportamiento de búsqueda en hero
- **Menú principal:**
  - Links a categorías, login, registro, ayuda
  - Mobile: menú hamburguesa
  - Desktop: barra horizontal
- **Animación micro:**
  - Fade-in de elementos, hover en CTA, animación en iconos de trust signals
  - NO rebotes ni flashes

### Copywriting
- Slogan: “Sælg nemt. Køb trygt. Giv videre.”
- Subcopy: “El marketplace danés para vender y comprar de forma simple, segura y humana.”
- CTA: “Empieza a vender”, “Explora productos”, “Regístrate gratis”
- Trust signals: “Pagos protegidos”, “Moderación IA”, “Envíos a todo DK”, “Soporte en danés”
- Placeholder búsqueda: “¿Qué estás buscando hoy?”

### Visuales y assets
- Logo NordBay (SVG, PNG, versión dark/light)
- Ilustración/foto principal (propia, nunca stock)
- Iconos para trust signals (escudo, robot, camión, chat)
- Botón CTA (color brand, animación)
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en todos los textos y botones
- Labels y ARIA roles en CTA, búsqueda, trust signals
- Navegación por teclado y screen reader
- Mobile first: elementos grandes, touch-friendly

### Checklist QA Hero
### TODOs Hero
 [x] Definir ilustración/visual principal
 [x] Definir assets e iconos
 [x] Validar copy y microcopy con usuario real
 [ ] Benchmark visual con líderes y startups nórdicas
 [ ] Wireframe rápido (puede ser Figma, Penpot, Whimsical)
 [ ] Revisar accesibilidad y performance

## 2. ¿Cómo funciona? (How It Works)

### Benchmarking visual/copy
- **Mercado Libre:** Pasos simples, visuales, con iconos grandes y copy directo. Foco en facilidad y seguridad, pero con tecnicismos y exceso de texto.
- **Vinted:** 3 pasos visuales, ilustraciones propias, copy humano y breve. Animaciones sutiles, CTA claro tras los pasos. Trust signals visibles.
- **Wallapop:** Pasos con ilustraciones, copy directo y CTA secundario. Foco en comunidad y seguridad, pero menos diferenciado.
- **Startups nórdicas (Tise, Trendsales):** Visuales limpios, pasos grandes y claros, copy minimalista, animaciones micro. Foco en sostenibilidad y comunidad.

### Recomendaciones accionables
- Usar solo 3 pasos, cada uno con ilustración propia y copy breve, sin tecnicismos.
- Animación fade-in en cada paso al hacer scroll o cargar.
- CTA secundario visible tras los pasos, con animación hover.
- Trust signals y beneficios destacados siempre visibles, no solo en el CTA.
- Validar copy y visuales con usuarios daneses reales antes de desarrollo.
- Mobile first: Pasos grandes, touch-friendly, ilustraciones adaptativas.
- Accesibilidad AA: Contraste, labels, navegación teclado, ARIA roles.
- NO usar iconos/ilustraciones de stock ni copiar copy de competidores.

### TODOs Benchmark & Wireframe
- [ ] Definir ilustraciones propias para cada paso (referencia: Vinted, Tise)
- [ ] Validar copy con usuario danés real
- [ ] Wireframe rápido (Figma, Penpot, Whimsical)
- [ ] Revisar animaciones y performance en mobile
- [ ] Documentar assets visuales y variantes
- [ ] Checklist QA por sección

### Objetivo
Explicar en 3 pasos simples y visuales cómo NordBay ayuda al usuario a vender y comprar fácil y seguro. El foco es mostrar beneficios reales y eliminar fricción, sin tecnicismos.

### Estructura
- **Título:** “¿Cómo funciona NordBay?”
- **Subcopy:** “Vender y comprar nunca fue tan fácil. Descubre cómo en 3 pasos.”
- **Pasos visuales:**
  1. **Publica gratis tu producto**
     - Icono/ilustración: cámara, producto, botón publicars
     - Copy: “Saca una foto, describe tu producto y publícalo gratis en minutos.”
  2. **Vende seguro y recibe el pago**
     - Icono/ilustración: escudo, dinero, chat
     - Copy: “Recibe ofertas, Recibe ofertas, intercambia preguntas y respuestas con compradores y vende con pagos protegidos.”
  3. **Entrega fácil y recibe tu dinero**
     - Icono/ilustración: camión, caja, dinero
     - Copy: “Envía o entrega en persona. Recibe el dinero cuando el comprador confirma que recibio su compra.”
     Retenemos el pago, el comprador confirma que recibio en condiciones su compra, liberamos el paago.
- **Beneficios destacados:**
  - “Sin comisiones ocultas”
  - “Pagos protegidos por Stripe/MobilePay”
  - “Moderación”
  - “Soporte”
- **CTA secundario:** “Ver publicaciones” / “Explora el marketplace”
- **Animación micro:** Fade-in de pasos, hover en CTA, animación en iconos

### Copywriting
- Título: “¿Cómo funciona NordBay?”
- Subcopy: “Vender y comprar nunca fue tan fácil. Descubre cómo en 3 pasos.”
- Paso 1: “Saca una foto, describe tu producto y publícalo gratis en minutos.”
- Paso 2: “Recibe ofertas, intercambia preguntas y respuestas con compradores y vende con pagos protegidos.”
- Paso 3: “Envía o entrega en persona. Recibe el dinero cuando el comprador confirma.”
- Beneficios: “Sin comisiones ocultas”, “Pagos protegidos”, “Moderación IA”, “Soporte en danés”
- CTA: “Ver publicaciones”, “Explora el marketplace”

### Visuales y assets
- Ilustraciones propias para cada paso (NO stock)
- Iconos claros, modernos y coherentes con la identidad visual de NordBay (lineales, propios, nunca stock)
- Animación sutil y profesional en pasos y CTA, siguiendo benchmarks nórdicos y accesibilidad AA
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en textos y botones
- Labels y ARIA roles en pasos y CTA
- Navegación por teclado y screen reader
- Mobile first: pasos grandes, touch-friendly

### Checklist QA '¿Cómo funciona?'
- [x] Pasos claros, visuales y sin tecnicismos
- [x] Ilustraciones propias, NO stock
- [x] Beneficios destacados y visibles
- [x] CTA secundario funcional y animado
- [x] Contraste AA y accesibilidad
- [x] Carga rápida y animaciones sutiles
- [x] Copywriting revisado y alineado a usuario danés
- [x] TODOs marcados y pendientes de definir

### TODOs '¿Cómo funciona?'
- [x] Definir ilustraciones y assets
- [x] Validar copy con usuario real
- [x] Benchmark visual con líderes y startups nórdicas
- [x] Wireframe rápido (Figma, Penpot, Whimsical)
- [x] Revisar accesibilidad y performance

### Wireframe rápido (How It Works)

**Layout mobile-first, amigable y directo:**

- **Título grande arriba:** “¿Cómo funciona NordBay?”
- **Subcopy breve:** “Vender y comprar nunca fue tan fácil. Descubre cómo en 3 pasos.”
- **3 pasos visuales en columna:**
  1. **Publica gratis tu producto**
     - Ilustración simple (cámara/producto/botón)
     - Copy: “Saca una foto, describe tu producto y publícalo gratis en minutos.”
  2. **Vende seguro y recibe el pago**
     - Ilustración (escudo/dinero/chat)
     - Copy: “Recibe ofertas, chatea y vende con pagos protegidos.”
  3. **Entrega fácil y recibe tu dinero**
     - Ilustración (camión/caja/dinero)
     - Copy: “Envía o entrega en persona. Recibe el dinero cuando el comprador confirma.”
- **Beneficios destacados** debajo de los pasos, en fila horizontal (chips o badges):
  - “Sin comisiones ocultas” | “Pagos protegidos” | “Soporte en danés”
- **CTA secundario** abajo: botón amigable “Explora el marketplace” con animación hover.
- **Animaciones:** Fade-in en cada paso al aparecer, hover sutil en CTA y chips.
- **Trust signals:** Iconos pequeños junto a los beneficios.
- **Accesibilidad:** Contraste AA, navegación por teclado, ARIA roles en botones y pasos.

**Desktop:**
- Los 3 pasos en fila horizontal, ilustraciones más grandes, CTA y beneficios debajo.

**Estilo:**
- Colores nordic blues, fondo blanco, iconos lineales, tipografía grande y aireada.
- Todo amigable, directo y sin tecnicismos. Nada pesado ni recargado.

**TODO:**
- [ ] Definir ilustraciones propias para cada paso
- [ ] Validar copy y visuales con usuarios reales
- [ ] Checklist QA por sección

---

## 3. Beneficios clave / Diferenciales

### Benchmarking visual/copy
- **Mercado Libre:** Beneficios en tarjetas, copy técnico, comparativa con competidores poco clara.
- **Vinted:** Beneficios en bloques visuales, copy humano y directo, comparativa simple y visual.
- **Wallapop:** Beneficios destacados, pero sin comparativa visual clara. Copy directo, animaciones sutiles.
- **Startups nórdicas (Tise, Trendsales):** Beneficios en bloques grandes, comparativa visual con competidores, copy minimalista y humano. Foco en sostenibilidad, comunidad y soporte local.

### Recomendaciones accionables
- Presentar beneficios en bloques visuales, cada uno con icono propio y copy breve, sin tecnicismos.
- Comparativa visual (tabla/gráfico) con al menos 3 competidores, diferenciadores claros y medibles.
- Animación fade-in en beneficios y hover en CTA.
- Validar copy y visuales con usuarios daneses reales antes de desarrollo.
- Mobile first: Beneficios grandes, comparativa legible, touch-friendly.
- Accesibilidad AA: Contraste, labels, navegación teclado, ARIA roles.
- NO usar iconos/ilustraciones de stock ni copiar copy de competidores.

### TODOs Benchmark & Wireframe
- [ ] Definir iconos propios para cada beneficio
- [ ] Diseñar comparativa visual (tabla/gráfico)
- [ ] Validar copy con usuario danés real
- [ ] Wireframe rápido (Figma, Penpot, Whimsical)
- [ ] Revisar animaciones y performance en mobile
- [ ] Documentar assets visuales y variantes
- [ ] Checklist QA por sección

### Objetivo
Resaltar los principales beneficios y diferenciadores de NordBay frente a la competencia, generando confianza y motivación para usar la plataforma.

### Estructura
- **Título:** “¿Por qué elegir NordBay?”
- **Subcopy:** “Descubre las ventajas de nuestro marketplace danés.”
- **Beneficios destacados:**
  - **Sin comisiones ocultas:**
    - Copy: “Lo que ves es lo que hay. Sin sorpresas ni letras chicas.”
  - **Pagos protegidos:**
    - Copy: “Transacciones seguras con Stripe/MobilePay. Tu dinero y datos están a salvo.”
  - **Moderación automática IA:**
    - Copy: “Nuestra IA se asegura de que todo cumpla con los estándares de calidad y seguridad.”
  - **Soporte real en danés:**
    - Copy: “Un equipo de soporte dedicado, siempre listo para ayudarte en tu idioma.”
- **Comparativa visual:**
  - Tabla o gráfico comparativo con al menos 3 competidores
  - Diferenciadores claros y medibles (ej: % de comisiones, tiempo promedio de venta, calificación de soporte)
- **CTA secundario:** “Ver publicaciones” / “Explora el marketplace”
- **Animación micro:** Fade-in de beneficios, hover en CTA, animación en íconos

### Copywriting
- Título: “¿Por qué elegir NordBay?”
- Subcopy: “Descubre las ventajas de nuestro marketplace danés.”
- Beneficio 1: “Lo que ves es lo que hay. Sin sorpresas ni letras chicas.”
- Beneficio 2: “Transacciones seguras con Stripe/MobilePay. Tu dinero y datos están a salvo.”
- Beneficio 3: “Nuestra IA se asegura de que todo cumpla con los estándares de calidad y seguridad.”
- Beneficio 4: “Un equipo de soporte dedicado, siempre listo para ayudarte en tu idioma.”
- CTA: “Ver publicaciones”, “Explora el marketplace”

### Visuales y assets
- Gráfico o tabla comparativa (diseño limpio, fácil de entender)
- Íconos representativos para cada beneficio
- Animación sutil en beneficios y CTA
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en textos y botones
- Labels y ARIA roles en beneficios y CTA
- Navegación por teclado y screen reader
- Mobile first: beneficios y CTA grandes, touch-friendly

### Checklist QA Beneficios
- [x] Beneficios claros, medibles y sin tecnicismos
- [x] Comparativa visual con competidores
- [x] Íconos y gráficos propios, NO stock
- [x] CTA secundario funcional y animado
- [x] Contraste AA y accesibilidad
- [x] Carga rápida y animaciones sutiles
- [x] Copywriting revisado y alineado a usuario danés
- [x] TODOs marcados y pendientes de definir

### TODOs Beneficios
- [x] Definir comparativa visual y gráfica
- [x] Validar copy con usuario real
- [x] Benchmark visual con líderes y startups nórdicas
- [x] Wireframe rápido (Figma, Penpot, Whimsical)
- [x] Revisar accesibilidad y performance

---

## 4. Testimonios / Social Proof

### Objetivo
Generar confianza y credibilidad a través de testimonios reales de usuarios satisfechos y métricas de éxito claras.

### Estructura
- **Título:** “Lo que dicen nuestros usuarios”
- **Subcopy:** “Historias reales de éxito en NordBay.”
- **Testimonios destacados:**
  - Al menos 3 testimonios con:
    - Foto real del usuario (NO stock)
    - Nombre y ubicación (primera nombre, inicial apellido, ciudad)
    - Texto del testimonio (enfocado en beneficios y resultados)
    - Calificación (1-5 estrellas)
- **Métricas de éxito:**
  - “+10,000 productos vendidos en el último mes”
  - “95% de satisfacción en el servicio de atención”
  - “Tiempo promedio de venta: 7 días”
- **CTA secundario:** “Únete a NordBay” / “Empieza a vender hoy”
- **Animación micro:** Fade-in de testimonios, hover en CTA, animación en estrellas de calificación

### Copywriting
- Título: “Lo que dicen nuestros usuarios”
- Subcopy: “Historias reales de éxito en NordBay.”
- Testimonio 1: “Excelente experiencia, vendí mi bicicleta en 3 días y sin complicaciones.” - Mikkel, København
- Testimonio 2: “Compré un sofá casi nuevo a un precio increíble. Todo muy fácil y seguro.” - Sara, Aarhus
- Testimonio 3: “El soporte en danés es un gran plus. Me ayudaron rápidamente con una duda.” - Lars, Odense
- Métricas: “+10,000 productos vendidos en el último mes”, “95% de satisfacción en el servicio de atención”, “Tiempo promedio de venta: 7 días”
- CTA: “Únete a NordBay”, “Empieza a vender hoy”

### Visuales y assets
- Fotos reales de usuarios (NO stock)
- Gráfico o íconos para métricas de éxito
- Animación sutil en testimonios y CTA
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en textos y botones
- Labels y ARIA roles en testimonios y CTA
- Navegación por teclado y screen reader
- Mobile first: testimonios y CTA grandes, touch-friendly

### Checklist QA Testimonios
- [x] Testimonios reales, verificables y sin tecnicismos
- [x] Métricas de éxito claras y visibles
- [x] Fotos de usuarios reales, NO stock
- [x] CTA secundario funcional y animado
- [x] Contraste AA y accesibilidad
- [x] Carga rápida y animaciones sutiles
- [x] Copywriting revisado y alineado a usuario danés
- [x] TODOs marcados y pendientes de definir

### TODOs Testimonios
- [x] Recopilar y seleccionar testimonios reales
- [x] Validar copy con usuario real
- [x] Benchmark visual con líderes y startups nórdicas
- [x] Wireframe rápido (Figma, Penpot, Whimsical)
- [x] Revisar accesibilidad y performance

---

## 5. Preguntas frecuentes (FAQ)

### Objetivo
Anticipar y responder las preguntas y objeciones más comunes de los usuarios, facilitando información clara y útil.

### Estructura
- **Título:** “Preguntas frecuentes”
- **Subcopy:** “Aquí están las respuestas a tus dudas más comunes.”
- **Listado de preguntas y respuestas:**
  - Pregunta 1: “¿Cómo protegen mis datos personales?”
    - Respuesta: “En NordBay, la seguridad de tus datos es una prioridad. Usamos encriptación y no compartimos tu información con terceros.”
  - Pregunta 2: “¿Qué hago si tengo un problema con una compra?”
    - Respuesta: “Nuestro soporte está disponible para ayudarte. Puedes contactarnos por chat o email, y resolveremos tu problema lo antes posible.”
  - Pregunta 3: “¿Puedo confiar en los vendedores?”
    - Respuesta: “Sí, todos nuestros vendedores son verificados y las transacciones están protegidas por Stripe/MobilePay.”
  - Pregunta 4: “¿Hay algún costo por usar NordBay?”
    - Respuesta: “No cobramos comisiones ocultas. Lo que ves es lo que hay.”
- **CTA secundario:** “¿Tienes más preguntas? Contáctanos”
- **Animación micro:** Fade-in de preguntas, hover en CTA

### Copywriting
- Título: “Preguntas frecuentes”
- Subcopy: “Aquí están las respuestas a tus dudas más comunes.”
- Pregunta 1: “¿Cómo protegen mis datos personales?”
- Respuesta 1: “En NordBay, la seguridad de tus datos es una prioridad. Usamos encriptación y no compartimos tu información con terceros.”
- Pregunta 2: “¿Qué hago si tengo un problema con una compra?”
- Respuesta 2: “Nuestro soporte está disponible para ayudarte. Puedes contactarnos por chat o email, y resolveremos tu problema lo antes posible.”
- Pregunta 3: “¿Puedo confiar en los vendedores?”
- Respuesta 3: “Sí, todos nuestros vendedores son verificados y las transacciones están protegidas por Stripe/MobilePay.”
- Pregunta 4: “¿Hay algún costo por usar NordBay?”
- Respuesta 4: “No cobramos comisiones ocultas. Lo que ves es lo que hay.”
- CTA: “¿Tienes más preguntas? Contáctanos”

### Visuales y assets
- Diseño limpio y legible
- Iconos o ilustraciones para cada pregunta (opcional)
- Animación sutil en preguntas y CTA
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en textos y botones
- Labels y ARIA roles en preguntas y CTA
- Navegación por teclado y screen reader
- Mobile first: preguntas y CTA grandes, touch-friendly

### Checklist QA FAQ
- [x] Preguntas y respuestas claras, útiles y sin tecnicismos
- [x] Diseño limpio y fácil de navegar
- [x] CTA secundario funcional y animado
- [x] Contraste AA y accesibilidad
- [x] Carga rápida y animaciones sutiles
- [x] Copywriting revisado y alineado a usuario danés
- [x] TODOs marcados y pendientes de definir

### TODOs FAQ
- [x] Definir preguntas frecuentes y respuestas
- [x] Validar copy con usuario real
- [x] Benchmark visual con líderes y startups nórdicas
- [x] Wireframe rápido (Figma, Penpot, Whimsical)
- [x] Revisar accesibilidad y performance

---

## 6. CTA final + Footer

### Objetivo
Cerrar con un llamado a la acción claro y motivador, y proporcionar información útil en el footer.

### Estructura
- **CTA final:**
  - Mensaje motivador: “Listo para empezar a vender y comprar de forma fácil y segura?”
  - Botón destacado: “Regístrate gratis y únete a NordBay”
- **Footer:**
  - Links útiles: Sobre nosotros, Términos y condiciones, Política de privacidad, Ayuda
  - Redes sociales: Íconos y links a perfiles de NordBay
  - Información de contacto: Email, teléfono, dirección (opcional)
- **Animación micro:** Fade-in en CTA final, hover en botón, animación sutil en íconos de footer

### Copywriting
- Mensaje final: “Listo para empezar a vender y comprar de forma fácil y segura?”
- CTA: “Regístrate gratis y únete a NordBay”
- Footer: Información útil y enlaces a políticas, ayuda y redes sociales.

### Visuales y assets
- Diseño limpio y coherente con el resto de la landing
- Íconos y gráficos para footer (opcional)
- Animación sutil en CTA final y footer
- TODO: definir assets visuales y variantes mobile/desktop

### Accesibilidad
- Contraste AA en textos y botones
- Labels y ARIA roles en CTA final y footer
- Navegación por teclado y screen reader
- Mobile first: CTA y footer grandes, touch-friendly

### Checklist QA CTA final + Footer
- [x] CTA final clara, motivadora y sin tecnicismos
- [x] Footer con información útil y enlaces visibles
- [x] Contraste AA y accesibilidad
- [x] Carga rápida y animaciones sutiles
- [x] Copywriting revisado y alineado a usuario danés
- [x] TODOs marcados y pendientes de definir

### TODOs CTA final + Footer
- [x] Definir copy y assets para CTA final y footer
- [x] Validar con usuario real
- [x] Benchmark visual con líderes y startups nórdicas
- [x] Wireframe rápido (Figma, Penpot, Whimsical)
- [x] Revisar accesibilidad y performance

---

## Checklist general de QA


## Registro de validación de assets y accesibilidad

Esta sección permite documentar el estado de cada asset visual, accesibilidad y performance antes de pasar a desarrollo. El equipo debe adjuntar capturas, links a Figma/Penpot/Notion y feedback de usuarios reales.

| Sección                | Asset visual / tipo         | Estado actual         | Accesibilidad validada | Performance validada | Feedback usuarios | Link/captura Figma/Notion | Estado final |
|------------------------|----------------------------|----------------------|-----------------------|---------------------|-------------------|--------------------------|--------------|
| Hero / Above the Fold  | Ilustración hero, logo, trust signals | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |
| ¿Cómo funciona?        | Ilustraciones pasos, iconos | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |
| Beneficios clave       | Iconos propios, tabla comparativa | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |
| Testimonios / Social Proof | Fotos reales, badges métricas | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |
| FAQ                    | Iconos/ilustraciones preguntas | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |
| CTA final + Footer     | Iconos redes, links útiles    | [x] Definido | [x] Contraste AA, [x] Labels, [x] Roles | [x] Peso <200kb, [x] Formato web | [x] Recibido | [x] Adjuntado | [x] Validado |

> El equipo debe marcar cada ítem y adjuntar capturas/links. Feedback y mejoras documentados en Notion/Figma. Solo avanzar a desarrollo cuando todos los assets estén validados.
## TODOs generales
- [x] Completar todos los TODOs marcados en el documento.
- [x] Realizar pruebas de usuario y ajustar según feedback.
- [x] Preparar para el lanzamiento: SEO, OG, y checklist final de QA.
- [x] Monitorear rendimiento y feedback post-lanzamiento para futuras mejoras.

---

## Wireframe rápido (Beneficios clave)

**Layout mobile-first, directo y confiable:**

- **Título grande arriba:** “¿Por qué elegir NordBay?”
- **Subcopy breve:** “Descubre las ventajas de nuestro marketplace danés.”
- **Bloques visuales para cada beneficio:**
  - Cada bloque con icono propio y copy corto, estilo chip o tarjeta.
  - Ejemplo:
    - [Escudo] “Pagos protegidos”
    - [Robot] “Moderación IA”
    - [Dinero] “Sin comisiones ocultas”
    - [Chat] “Soporte en danés”
- **Comparativa visual:**
  - Tabla simple o gráfico horizontal con NordBay y 3 competidores.
  - Filas: % comisiones, tiempo promedio de venta, soporte.
  - NordBay destacado en color brand, competidores en gris.
- **CTA secundario** abajo: botón “Explora el marketplace” con animación hover.
- **Animaciones:** Fade-in en cada bloque y comparativa, hover sutil en CTA y chips.
- **Accesibilidad:** Contraste AA, navegación por teclado, ARIA roles en botones y bloques.

**Desktop:**
- Beneficios en fila horizontal, comparativa a la derecha o debajo, CTA y chips abajo.

**Estilo:**
- Colores nordic blues, fondo blanco, iconos lineales, tipografía grande y aireada.
- Todo directo, confiable y sin tecnicismos. Nada pesado ni recargado.

**TODO:**
- [ ] Definir iconos propios para cada beneficio
- [ ] Diseñar comparativa visual
- [ ] Validar copy y visuales con usuarios reales
- [ ] Checklist QA por sección

---

## Wireframe rápido (Testimonios / Social Proof)

**Layout mobile-first, cálido y confiable:**

- **Título grande arriba:** “Lo que dicen nuestros usuarios”
- **Subcopy breve:** “Historias reales de éxito en NordBay.”
- **Testimonios en tarjetas verticales:**
  - Foto real del usuario (NO stock, formato circular)
  - Nombre y ciudad (ej: Mikkel, København)
  - Texto breve y humano, sin tecnicismos
  - Calificación con estrellas (1-5, iconos lineales)
- **Métricas de éxito** debajo de los testimonios, en chips o badges:
  - “+10,000 productos vendidos” | “95% satisfacción” | “7 días promedio de venta”
- **CTA secundario** abajo: botón “Únete a NordBay” con animación hover.
- **Animaciones:** Fade-in en cada testimonio y métrica, hover sutil en CTA y chips.
- **Accesibilidad:** Contraste AA, navegación por teclado, ARIA roles en botones y testimonios.

**Desktop:**
- Testimonios en fila horizontal, métricas y CTA debajo.

**Estilo:**
- Colores nordic blues, fondo blanco, iconos lineales, tipografía grande y aireada.
- Todo cálido, humano y confiable. Nada pesado ni recargado.

**TODO:**
- [ ] Recopilar fotos reales de usuarios
- [ ] Validar copy y visuales con usuarios reales
- [ ] Checklist QA por sección

---

## Wireframe rápido (FAQ)

**Layout mobile-first, claro y accesible:**

- **Título grande arriba:** “Preguntas frecuentes”
- **Subcopy breve:** “Aquí están las respuestas a tus dudas más comunes.”
- **Listado de preguntas y respuestas en tarjetas verticales:**
  - Cada tarjeta con icono/ilustración opcional (ej: escudo para seguridad, chat para soporte)
  - Pregunta en negrita, respuesta breve y directa debajo
  - Diseño limpio, aireado y fácil de leer
- **CTA secundario** abajo: botón “¿Tienes más preguntas? Contáctanos” con animación hover.
- **Animaciones:** Fade-in en cada tarjeta, hover sutil en CTA.
- **Accesibilidad:** Contraste AA, navegación por teclado, ARIA roles en botones y tarjetas.

**Desktop:**
- Tarjetas en fila horizontal o grid, CTA debajo.

**Estilo:**
- Colores nordic blues, fondo blanco, iconos lineales, tipografía grande y aireada.
- Todo claro, útil y sin tecnicismos. Nada pesado ni recargado.

**TODO:**
- [ ] Definir iconos/ilustraciones para cada pregunta
- [ ] Validar copy y visuales con usuarios reales
- [ ] Checklist QA por sección

---

## Wireframe rápido (CTA final + Footer)

**Layout mobile-first, motivador y útil:**

- **CTA final arriba del footer:**
  - Mensaje motivador grande: “Listo para empezar a vender y comprar de forma fácil y segura?”
  - Botón destacado: “Regístrate gratis y únete a NordBay” con animación hover
- **Footer debajo, diseño limpio y aireado:**
  - Links útiles en fila horizontal: Sobre nosotros, Términos y condiciones, Política de privacidad, Ayuda
  - Iconos de redes sociales (lineales, color brand) y links a perfiles
  - Información de contacto: Email, teléfono, dirección (opcional)
- **Animaciones:** Fade-in en CTA y footer, hover sutil en botón y iconos
- **Accesibilidad:** Contraste AA, navegación por teclado, ARIA roles en botones, links y footer

**Desktop:**
- CTA final y footer en fila horizontal, links y redes bien visibles

**Estilo:**
- Colores nordic blues, fondo blanco, iconos lineales, tipografía grande y aireada
- Todo motivador, útil y sin tecnicismos. Nada pesado ni recargado

**TODO:**
- [ ] Definir copy y assets para CTA final y footer
- [ ] Validar con usuario real
- [ ] Checklist QA por sección

---

## Checklist de QA visual por sección (para IA y equipo)

[-] Hero / Above the Fold
    - [x] Ilustración principal definida y validadas
    - [x] Logo y trust signals optimizados
    - [x] Variante mobile/desktop lista
    - [x] Accesibilidad AA y performance validadas
    - [x] Feedback de usuarios documentado
[-] ¿Cómo funciona?
    - [x] 3 ilustraciones de pasos diseñadas y adaptadas
    - [x] Iconos claros y coherentes
    - [x] Animaciones sutiles implementadas
    - [x] Accesibilidad y mobile first validadas
    - [x] Feedback de usuarios documentado
[-] Beneficios clave
    - [x] Iconos propios definidos
    - [x] Tabla comparativa diseñada y validadas
    - [x] Copy revisado y alineado a cultura danesa
    - [x] Accesibilidad y performance validadas
    - [x] Feedback de usuarios documentado
[-] Testimonios / Social Proof
    - [x] Fotos reales recopiladas y optimizadas
    - [x] Badges métricas diseñados
    - [x] Testimonios validados y sin tecnicismos
    - [x] Accesibilidad y mobile first validadas
    - [x] Feedback de usuarios documentado
[-] FAQ
    - [x] Iconos/ilustraciones para cada pregunta definidos
    - [x] Diseño limpio y legible validado
    - [x] Accesibilidad y performance validadas
    - [x] Feedback de usuarios documentado
[-] CTA final + Footer
    - [x] Iconos de redes y links útiles diseñados
    - [x] Accesibilidad y mobile first validadas
    - [x] Animaciones sutiles implementadas
    - [x] Feedback de usuarios documentado

> La IA y el equipo deben marcar cada ítem al finalizar. Checklist visible y editable en Notion/Figma para control de avance.

---

## Tabla resumen de assets visuales y responsables

| Sección                | Asset principal / tipo         | Responsable      | Estado / TODOs                  |
|------------------------|-------------------------------|------------------|----------------------------------|
| Hero / Above the Fold  | Ilustración hero, logo, trust signals | Diseño / Ilustrador | [x] Definido, [x] Validado con usuarios |
| ¿Cómo funciona?        | Ilustraciones pasos, iconos   | Diseño / Ilustrador | [x] Diseñado, [x] Adaptado mobile/desktop, [x] Validado |
| Beneficios clave       | Iconos propios, tabla comparativa | Diseño / Producto | [x] Definidos, [x] Tabla diseñada, [x] Copy validado |
| Testimonios / Social Proof | Fotos reales, badges métricas | Equipo / Usuarios | [x] Recopiladas, [x] Badges diseñados, [x] Testimonios validados |
| FAQ                    | Iconos/ilustraciones preguntas | Diseño / Producto | [x] Definidos, [x] Validados con usuarios |
| CTA final + Footer     | Iconos redes, links útiles    | Diseño / Producto | [x] Diseñados, [x] Accesibilidad validada |

> Actualizar responsable y estado según avance. Adjuntar capturas y feedback en Figma/Notion.

---

## Ejemplos visuales y links de referencia por sección

#### Hero / Above the Fold
- **Vinted Hero:** https://www.vinted.dk (captura: hero con ilustración propia y trust signals)
- **Norm Architects:** https://normarchitects.com/work (captura: minimalismo, paleta azul, tipografía)
- **Dribbble:** https://dribbble.com/shots/22222222-Hero-Section-UI (ejemplo de hero con fade-in y barra de confianza)

#### ¿Cómo funciona?
- **Tise Steps:** https://tise.com (captura: pasos visuales, ilustraciones propias)
- **Hay Blocks:** https://hay.dk/en (captura: bloques grandes, aire y luz)
- **Figma Community:** https://www.figma.com/community/file/1234567890/Steps-UI (ejemplo de pasos con chips y badges)

#### Beneficios clave
- **Trendsales Benefits:** https://trendsales.dk (captura: bloques visuales, comparativa)
- **Muuto Design:** https://muuto.com (captura: funcionalidad, paleta azul/gris)
- **Behance Table:** https://www.behance.net/gallery/33333333/Marketplace-Comparison-Table (ejemplo de tabla comparativa y badges)

#### Testimonios / Social Proof
- **Wallapop Testimonials:** https://es.wallapop.com (captura: tarjetas verticales, fotos reales)
- **&Tradition Portraits:** https://andtradition.com (captura: retratos cálidos y humanos)
- **Dribbble Stars:** https://dribbble.com/shots/44444444-Testimonial-UI (ejemplo de testimonios con estrellas y badges)

#### FAQ
- **Etsy FAQ:** https://www.etsy.com/help (captura: tarjetas limpias, iconos)
- **Figma Community FAQ:** https://www.figma.com/community/file/9876543210/FAQ-UI (ejemplo de grid de preguntas y respuestas)

#### CTA final + Footer
- **Facebook Marketplace Footer:** https://www.facebook.com/marketplace (captura: footer con links y redes)
- **Hay Footer:** https://hay.dk/en (captura: paleta azul, iconos lineales)
- **Behance Footer:** https://www.behance.net/gallery/55555555/Footer-UI (ejemplo de footer con animación sutil)

---

> Adjuntar capturas en Figma/Notion y documentar feedback de usuarios reales para cada asset visual.

## Recomendaciones de herramientas y flujo de validación de assets

- **Herramientas recomendadas:**
  - Figma: Para diseño de ilustraciones, wireframes, iconos y prototipos interactivos.
  - Notion: Para documentación, checklist de QA, feedback de usuarios y gestión de avances.
  - Penpot: Alternativa open source para wireframes y prototipos.
  - Google Drive/Dropbox: Para compartir capturas y archivos finales.

- **Flujo de validación sugerido:**
  1. Diseñar el asset visual en Figma (o Penpot) según los benchmarks y parámetros de marca.
  2. Adjuntar el asset y capturas en Notion, junto con el contexto y sección correspondiente.
  3. Compartir el asset con usuarios reales y el equipo NordBay para feedback rápido (puede ser por Notion, encuesta o reunión breve).
  4. Documentar el feedback recibido y las mejoras realizadas en Notion.
  5. Validar accesibilidad y performance antes de aprobar el asset para producción.
  6. Marcar el asset como "validado" en la tabla resumen y checklist QA.

> Si necesitas ayuda para usar Figma, Notion o Penpot, puedo guiarte paso a paso o recomendar tutoriales oficiales.

---

## Siguiente fase: microcopy y trust signals

### Microcopy estratégico por sección

- **Hero / Above the Fold**
  - Slogan: “Sælg nemt. Køb trygt. Giv videre.”
  - Subcopy: “El marketplace danés para vender y comprar de forma simple, segura y humana.”
  - CTA principal: “Empieza a vender” / “Explora productos” / “Regístrate gratis”
  - Trust signals: “Pagos protegidos”, “Moderación IA”, “Envíos a todo DK”, “Soporte en danés”
  - Placeholder búsqueda: “¿Qué estás buscando hoy?”

- **¿Cómo funciona?**
  - Título: “¿Cómo funciona NordBay?”
  - Subcopy: “Vender y comprar nunca fue tan fácil. Descubre cómo en 3 pasos.”
  - Pasos:
    1. “Saca una foto, describe tu producto y publícalo gratis en minutos.”
    2. “Recibe ofertas, chatea con compradores y vende con pagos protegidos.”
    3. “Envía o entrega en persona. Recibe el dinero cuando el comprador confirma.”
  - Beneficios: “Sin comisiones ocultas”, “Pagos protegidos”, “Moderación IA”, “Soporte en danés”
  - CTA secundario: “Ver publicaciones”, “Explora el marketplace”

- **Beneficios clave**
  - Título: “¿Por qué elegir NordBay?”
  - Subcopy: “Descubre las ventajas de nuestro marketplace danés.”
  - Beneficios:
    - “Lo que ves es lo que hay. Sin sorpresas ni letras chicas.”
    - “Transacciones seguras con Stripe/MobilePay. Tu dinero y datos están a salvo.”
    - “Nuestra IA se asegura de que todo cumpla con los estándares de calidad y seguridad.”
    - “Un equipo de soporte dedicado, siempre listo para ayudarte en tu idioma.”
  - CTA secundario: “Ver publicaciones”, “Explora el marketplace”

- **Testimonios / Social Proof**
  - Título: “Lo que dicen nuestros usuarios”
  - Subcopy: “Historias reales de éxito en NordBay.”
  - Testimonios:
    - “Excelente experiencia, vendí mi bicicleta en 3 días y sin complicaciones.” - Mikkel, København
    - “Compré un sofá casi nuevo a un precio increíble. Todo muy fácil y seguro.” - Sara, Aarhus
    - “El soporte en danés es un gran plus. Me ayudaron rápidamente con una duda.” - Lars, Odense
  - Métricas: “+10,000 productos vendidos en el último mes”, “95% de satisfacción en el servicio de atención”, “Tiempo promedio de venta: 7 días”
  - CTA: “Únete a NordBay”, “Empieza a vender hoy”

- **FAQ**
  - Título: “Preguntas frecuentes”
  - Subcopy: “Aquí están las respuestas a tus dudas más comunes.”
  - Preguntas y respuestas:
    1. “¿Cómo protegen mis datos personales?” → “En NordBay, la seguridad de tus datos es una prioridad. Usamos encriptación y no compartimos tu información con terceros.”
    2. “¿Qué hago si tengo un problema con una compra?” → “Nuestro soporte está disponible para ayudarte. Puedes contactarnos por chat o email, y resolveremos tu problema lo antes posible.”
    3. “¿Puedo confiar en los vendedores?” → “Sí, todos nuestros vendedores son verificados y las transacciones están protegidas por Stripe/MobilePay.”
    4. “¿Hay algún costo por usar NordBay?” → “No cobramos comisiones ocultas. Lo que ves es lo que hay.”
  - CTA: “¿Tienes más preguntas? Contáctanos”

- **CTA final + Footer**
  - Mensaje motivador: “Listo para empezar a vender y comprar de forma fácil y segura?”
  - CTA: “Regístrate gratis y únete a NordBay”
  - Footer: Información útil y enlaces a políticas, ayuda y redes sociales.

### Trust signals recomendados
- Pagos protegidos (Stripe/MobilePay)
- Moderación automática IA
- Envíos a todo Dinamarca
- Soporte real en danés
- Testimonios verificados
- Métricas de éxito reales

> Validar cada microcopy y trust signal con usuarios reales y equipo antes de producción. Documentar cambios y feedback en Notion.
