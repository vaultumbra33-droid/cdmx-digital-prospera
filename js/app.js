// ── Acceso por PIN ──────────────────────────────────────────
const correctPin = "1251";
const pinModal = document.getElementById('pinModal');
const mainSite = document.getElementById('mainSite');
const pinDigits = document.querySelectorAll('.pin-digit');
const pinSubmit = document.getElementById('pinSubmit');
const pinError = document.getElementById('pinError');

let currentPin = ['', '', '', ''];

pinDigits.forEach((digit, index) => {
    digit.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;
        currentPin[index] = value;
        if (value && index < 3) pinDigits[index + 1].focus();
        if (value) digit.classList.add('filled');
        else digit.classList.remove('filled');
        pinError.textContent = '';
    });
    digit.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                pinDigits[index - 1].focus();
                pinDigits[index - 1].value = '';
                currentPin[index - 1] = '';
                pinDigits[index - 1].classList.remove('filled');
            }
            currentPin[index] = '';
            digit.classList.remove('filled');
        }
    });
});

pinSubmit.addEventListener('click', checkPin);
document.addEventListener('keydown', (e) => {
    if (pinModal.classList.contains('active') && e.key === 'Enter') checkPin();
});

function checkPin() {
    const entered = currentPin.join('');
    if (entered.length < 4) { pinError.textContent = 'Ingrese los 4 dígitos'; return; }
    if (entered === correctPin) {
        pinModal.style.transition = 'opacity 0.5s ease';
        pinModal.style.opacity = '0';
        setTimeout(() => {
            pinModal.classList.remove('active');
            mainSite.classList.add('active');
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
        }, 500);
    } else {
        pinError.textContent = 'PIN incorrecto. Intente nuevamente.';
        const content = pinModal.querySelector('.pin-modal-content');
        content.style.animation = 'shake 0.5s ease';
        setTimeout(() => { content.style.animation = 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)'; }, 500);
        pinDigits.forEach((d,i)=>{ d.value=''; currentPin[i]=''; d.classList.remove('filled'); });
        pinDigits[0].focus();
    }
}

setTimeout(() => { if (pinModal.classList.contains('active')) pinDigits[0].focus(); }, 150);

// ── Navegación ──────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.querySelector('.navbar').offsetHeight;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: pos, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(10, 30, 58, 0.995)';
        navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.35)';
    } else {
        navbar.style.background = 'rgba(10, 30, 58, 0.985)';
        navbar.style.boxShadow = '0 8px 24px rgba(10,30,58,0.12)';
    }
});

// ── Datos de los 8 proyectos ────────────────────────────────
const projectData = {
    P1: {
        id: 'P1',
        title: 'MiPuesto CDMX: padrón y permiso digital del comercio en vía pública',
        subtitle: 'Orden del Espacio Público y Economía Popular',
        problem: '2026 es el año del reordenamiento del comercio en vía pública, pero no hay un censo oficial: el último registro conocido (2022) contaba 11,542 puntos y la Secretaría de Gobierno reconoce que es parcial [5]. Los trámites son presenciales y por alcaldía, y los comerciantes pagan cuotas informales a intermediarios en lugar de aprovechamientos a la Ciudad [27]. Sin datos, cada reordenamiento se negocia calle por calle [6][7].',
        solution: 'Plataforma única para registrar, georreferenciar, autorizar y cobrar el uso de la vía pública: cada comerciante obtiene un permiso digital con QR verificable, paga desde el celular o en una tienda cercana, y la autoridad ve en un mapa en tiempo real quién está dónde y con qué permiso.',
        components: [
            'Registro con verificación de identidad (INE, CURP o Llave CDMX) y fotografía del puesto',
            'Permiso digital con QR y vigencia, verificable por inspectores y ciudadanos',
            'Mapa georreferenciado de zonas permitidas, horarios y cupos por calle; alertas de puestos fuera de zona',
            'Pago de aprovechamientos por tarjeta, transferencia, CoDi o en la red de abarrotes (P6), con recibo digital',
            'Tablero para la Secretaría de Gobierno y alcaldías; reubicación asistida (por ejemplo, a locales del Metro [6])',
            'Incentivos de orden y limpieza (certificación «Puesto Ejemplar») y acceso a crédito y seguridad social'
        ],
        market: [
            '2.2 millones de personas en la informalidad en la Ciudad y 1.4 millones en el sector informal [4]',
            'Estimación del equipo: 350 mil a 550 mil comerciantes en vía pública, 64% mujeres, con ingreso promedio de 4,980 pesos mensuales (mujeres) [27]',
            'Meta oficial de primera fase: 4,500 comerciantes reordenados en el Centro Histórico [5]; en la Alameda se redujo de 150 a 75 vendedores [6]',
            'Cuota de referencia: unos 13 pesos diarios por permiso semifijo y de 38 a 74 pesos por puesto fijo (estudio del equipo, por validar con el Código Fiscal vigente) [27]'
        ],
        impactEco: 'Convierte pagos informales en aprovechamientos para la Ciudad y las alcaldías. Escenarios de trabajo (13 pesos diarios): 50 mil comerciantes en padrón activo y 300 días de cobro ≈ 195 mdp anuales; 150 mil comerciantes ≈ 585 mdp; el techo estimado por el equipo, 350 mil comerciantes todo el año, ≈ 1,660 mdp [27]. No son proyecciones; dependen del padrón real y de la política de cuotas.',
        impactSoc: 'Certeza para el comerciante (protección frente a desalojos arbitrarios y cobros de intermediarios), puerta de entrada a crédito y seguridad social, y calles más ordenadas para peatones y comercio establecido.',
        model: 'Licencia SaaS o servicio por comerciante activo, más comisión por transacción de pago. La autorización y el cobro permanecen en la autoridad; el proveedor opera la tecnología. Opción de arranque sin costo para la Ciudad, financiado por comisión de pago.',
        investment: 'Media (plataforma, levantamiento en campo y capacitación). Sin hardware pesado.',
        pilot: 'Un polígono del Centro Histórico o la Alameda, ya en proceso de reordenamiento, más un corredor de una alcaldía, durante 90 a 120 días.',
        indicators: ['Comerciantes registrados y georreferenciados', '% con permiso vigente', 'Aprovechamientos cobrados', 'Puestos fuera de zona', 'Tiempo de trámite', 'Quejas vecinales'],
        risks: ['Resistencia de líderes que hoy cobran de forma informal (diseñar el registro con las organizaciones dispuestas y con beneficios tangibles)', 'Coordinación entre Gobierno central y alcaldías', 'Protección de datos personales', 'Brecha digital (registro asistido en campo)'],
        csi: 'Verificación de identidad para el alta de comerciantes, mesa de ayuda y contact center para atención a comerciantes, y gestión documental del expediente [28].'
    },
    P2: {
        id: 'P2',
        title: 'Nexum: regularización predial y catastral',
        subtitle: 'Certeza Patrimonial y Recaudación',
        problem: 'Hay predios y construcciones que no están en el padrón activo o están valuados con datos desactualizados. Herencias sin sucesión, escrituración cara y catastro y Registro Público desconectados crean un espacio para gestores informales y para el despojo [8][9]. La Ciudad no subirá el predial [2], así que el crecimiento debe venir de incorporar base.',
        solution: 'Capa digital que conecta al ciudadano, al notario y a la Tesorería para regularizar un predio en un solo flujo: identificación, expediente digital, validación notarial, actualización catastral y alta de la cuenta predial.',
        components: [
            'Ingreso con CURP o Llave CDMX y cuenta predial; expediente digital con firma electrónica',
            'Validación por una red de notarios aliados, con constancia digital y comprobante fiscal',
            'Detección de construcciones no registradas con imágenes aéreas y cruce de padrones (agua, predial, licencias)',
            'Tablero para la SAF: predios incorporados, base gravable adicional y recaudación incremental',
            'Informes de debida diligencia registral para bancos (fuente de ingreso privada)'
        ],
        market: [
            '294,660 viviendas propias sin escritura en la Ciudad (16.5%), según ENIGH 2024 [8]',
            'Escriturar cuesta de 5% a 8% del valor del inmueble [8]; el modelo Nexum reduce el costo para el ciudadano entre 60% y 70% (estimación del equipo) [27]',
            'El predial creció 23.7% en el primer semestre de 2026 y el Programa de Regularización Fiscal recaudó más de mil millones con 186 mil beneficiados [1]: la respuesta al cumplimiento facilitado es alta',
            'Estimación del equipo: 500 mil predios fuera del padrón activo y 4,700 mdp anuales no cobrados, por validar con la SAF [27]'
        ],
        impactEco: 'Más predial sin subir tasas y un catastro actualizado como subproducto. Ejercicio aritmético: si 10% de las viviendas sin escritura (unas 29,500) se regularizara en un año, con una comisión de 1,500 a 5,000 pesos por trámite, el ingreso privado sería de 44 a 147 mdp, y cada una de esas viviendas se integraría al padrón predial.',
        impactSoc: 'Patrimonio protegido, acceso a crédito hipotecario, herencias resueltas y menos espacio para gestores y redes de despojo.',
        model: 'Modelo de tres ganadores: comisión por regularización pagada por el ciudadano vía notario (1,500 a 5,000 pesos); suscripción SaaS para la Tesorería o alcaldías (15 mil a 60 mil pesos mensuales); facturación notarial por evento; informes para bancos [27]. Cualquier componente ligado a recaudación incremental requiere revisión jurídica.',
        investment: 'Media; el levantamiento aéreo y la depuración de datos son lo más intensivo.',
        pilot: 'Dos alcaldías (el estudio del equipo propone Iztapalapa e Iztacalco) y una red inicial de notarios, con 100 expedientes y 50 regularizaciones completas en 4 a 6 meses [27].',
        indicators: ['Predios incorporados', 'Base gravable adicional', 'Recaudación incremental frente a línea base', 'Costo y tiempo por regularización', 'Notarios activos'],
        risks: ['Acceso a la API catastral de la Tesorería', 'Calidad de datos', 'Participación del Colegio de Notarios', 'Propiedad social y asentamientos irregulares, que requieren tratamiento específico'],
        csi: 'Verificación de identidad del propietario (KYC) y gestión documental del expediente; su relación con banca facilita el producto de debida diligencia registral [28].'
    },
    P3: {
        id: 'P3',
        title: 'Escritura digital y alerta patrimonial contra despojo',
        subtitle: 'Certeza Patrimonial y Recaudación',
        problem: 'La escritura es cara (5% a 8% del valor) y lenta (de tres semanas a tres meses de inscripción) [8]. El despojo de inmuebles es un problema que la propia Jefa de Gobierno ha colocado en el centro, con una Defensoría especializada [9]. El propietario no se entera de un movimiento sobre su predio hasta que es demasiado tarde.',
        solution: 'Escritura digital por capas: se mantiene la fe pública del notario y se digitaliza el ciclo completo (preparación, firma, pago de impuestos, ingreso al Registro, consulta y certificados), con una alerta registral gratuita que avisa al propietario de cualquier movimiento sobre su inmueble.',
        components: [
            'Expediente notarial digital con firma electrónica avanzada, sellado de tiempo y verificación por QR',
            'Ingreso electrónico al Registro Público y certificados digitales',
            'Alerta patrimonial por SMS, correo o WhatsApp ante cualquier solicitud sobre el folio del propietario',
            'Integración con la Jornada Notarial y con el plan de regularización y la Defensoría contra el Despojo [8][9]',
            'Conexión con Nexum (P2): el predio regularizado sale con escritura y cuenta predial activas'
        ],
        market: [
            '294,660 viviendas propias sin escritura [8]',
            'Descuentos vigentes de 10% a 60% en escrituración y de 40% a 80% en sucesiones mediante la Jornada Notarial [8]: la demanda existe, falta reducir fricción',
            'La Ley de Economía Digital aprobada por el Senado crea el Expediente Digital Ciudadano [22], que favorece documentos digitales con validez',
            'Antecedente comparable: el Registro Público de Yucatán reporta 1.67 millones de predios con folio electrónico y un módulo de Notaría Digital (referencia de la propuesta del equipo para ese estado)'
        ],
        impactEco: 'Más derechos registrales y certificados, mejor cumplimiento del impuesto de adquisición de inmuebles y un mercado inmobiliario más líquido (los inmuebles escriturados pueden venderse e hipotecarse).',
        impactSoc: 'Protección del patrimonio familiar, sobre todo de adultos mayores y familias en sucesión, que son las más expuestas al despojo.',
        model: 'Contrato por fases con el Registro Público y la Consejería Jurídica; tarifa por trámite digital; la alerta básica gratuita para el ciudadano y una versión ampliada opcional. Se diseña con el Colegio de Notarios, no en su contra.',
        investment: 'Media a alta, según el grado de digitalización actual del Registro (dato por confirmar).',
        pilot: 'Alerta patrimonial abierta a toda la Ciudad (rápida y muy visible) y escritura digital con un grupo de notarías dentro de la Jornada Notarial, durante 4 a 6 meses.',
        indicators: ['Propietarios inscritos en la alerta', 'Intentos de fraude detectados', 'Tiempo de inscripción', 'Escrituras digitales emitidas', 'Costo promedio para el ciudadano'],
        risks: ['Requiere a notarios y al Registro Público y puede ser lento', 'Debe verificarse qué tiene ya digitalizado la Ciudad para no duplicar', 'Seguridad de la información registral, que es altamente sensible'],
        csi: 'Gestión documental y digitalización de acervos, verificación de identidad en la firma y mesa de ayuda para notarías [28].'
    },
    P4: {
        id: 'P4',
        title: 'Atención ciudadana por video P2P',
        subtitle: 'Atención Ciudadana y Servicios Urbanos',
        problem: 'Locatel atiende millones de personas por teléfono y chat [12], y Llave CDMX resuelve muchos trámites en línea [21], pero cuando un trámite necesita revisar un documento o explicar un caso, el ciudadano termina en una fila. Las suites comerciales de contact center exigen mínimos de 27 a 50 agentes y cuestan entre 75 y 240 dólares por agente al mes [27].',
        solution: 'Ventanilla por video desde el navegador: el ciudadano entra con un enlace o un QR, sin instalar nada ni crear cuenta, espera en una cola con horario y habla con un servidor público que puede ver su documento. La plataforma ya existe en versión funcional [27].',
        components: [
            'Acceso por enlace o QR (carteles en módulos, mercados, Utopías, PILARES y Metro)',
            'Cola, horarios y enrutamiento por tema; grabación y transcripción en el navegador para trazabilidad',
            'Marca blanca con la identidad de la Ciudad o de cada alcaldía',
            'Integración con Locatel y con Llave CDMX para identificar al ciudadano',
            'Tablero de espera, duración y satisfacción; agenda inteligente para anticipar picos'
        ],
        market: [
            'Locatel: 5.3 millones de personas atendidas, 177 mil trámites digitales y 744 mil folios canalizados de octubre de 2024 a agosto de 2025 [12]',
            'Llave MX: 28 millones de cuentas, 72.7% de accesos desde celular [21]',
            'Universo nacional de unas 65 mil organizaciones (empresas medianas, hoteles y 2,478 municipios y alcaldías), con un mercado anual estimado de 78 a 195 millones de dólares (estudio del equipo con INEGI e INAFED) [27]',
            'Precios del plan institucional: de 320 a 360 pesos por agente al mes, sin mínimo de asientos [27]'
        ],
        impactEco: 'Ahorro en traslados y en espacio de oficina; más trámites concluidos (y pagados) sin visita presencial. Ejemplo de costo: 100 agentes a 340 pesos al mes ≈ 408 mil pesos al año, una fracción del costo de una suite comercial.',
        impactSoc: 'Atención para personas mayores, con discapacidad o con horarios laborales largos; menos filas y menos gestores.',
        model: 'Licencia por agente (SaaS) más cuota única de implementación y marca blanca (16 mil a 50 mil pesos) [27]. Puede contratarse por adjudicación directa o invitación restringida según el monto.',
        investment: 'Baja.',
        pilot: 'Una ventanilla de alto volumen (por ejemplo, Registro Civil, Tesorería o una alcaldía) con 10 a 20 agentes durante 60 a 90 días.',
        indicators: ['Atenciones por video', 'Tiempo de espera', '% resuelto sin visita', 'Satisfacción', 'Disponibilidad del servicio'],
        risks: ['El gobierno pedirá seguridad, disponibilidad garantizada, protección de datos y casos de referencia: el piloto debe documentar métricas desde el primer día y pasar una revisión de seguridad independiente'],
        csi: 'Es el proyecto con mayor afinidad: CSI puede aportar la operación de agentes (contact center omnicanal), la verificación de identidad durante la llamada y la mesa de ayuda, con experiencia en banca y gobierno que sirve como caso de referencia [28].'
    },
    P5: {
        id: 'P5',
        title: 'VialIA: detección de baches con inteligencia artificial',
        subtitle: 'Atención Ciudadana y Servicios Urbanos',
        problem: 'La Ciudad ha invertido miles de millones en bacheo y repavimentación [10][11][3], pero trabaja con reportes ciudadanos: repara lo que ya falló o lo que más se reporta, y no puede demostrar con datos el estado de la red ni verificar la calidad de las reparaciones.',
        solution: 'Un celular montado en motocicletas municipales captura video mientras circulan; la IA detecta, clasifica y prioriza baches, grietas y hundimientos, y publica un mapa de calor de la red en 24 a 48 horas. No requiere drones, permisos de vuelo ni compra de equipo [27].',
        components: [
            'Detección en tiempo real, incluso sin internet; sincronización posterior',
            'Mapa de calor y ranking de vialidades por severidad, tránsito y seguridad vial',
            'Verificación antes y después de cada reparación, para Sobse y Contraloría',
            'Integración con Bachetel y los folios de Locatel [12]: el reporte ciudadano se confirma y se cierra con evidencia',
            'Reporte mensual público de kilómetros inspeccionados, deterioros y reparaciones'
        ],
        market: [
            '257,214 baches atendidos en 11 meses con 1,500 mdp [10]; Plan Integral de 2,250 mdp y promesa de atención en menos de 48 horas [11]; 450 km repavimentados con unos 4,000 mdp [3]',
            'Referentes: Seúl redujo 65% el tiempo de respuesta y 40% el costo de inspección; Chicago reporta 6 dólares de ahorro por cada dólar en detección preventiva [27]',
            'Prototipo del equipo: 52 km mapeados en Coapa y Tlalpan con menos de 10 mil pesos de hardware [27]',
            'Mercado estimado: 21.8 millones de dólares anuales en México y 198 millones en Latinoamérica [27]'
        ],
        impactEco: 'Mejor uso del presupuesto de bacheo y menos indemnizaciones por daños a vehículos. Una suscripción Premium (4,000 dólares al mes, unos 0.96 mdp al año) equivale a menos de 0.05% de los 2,250 mdp del Plan Integral.',
        impactSoc: 'Calles más seguras, sobre todo para motociclistas, ciclistas y personas en silla de ruedas; transparencia sobre cómo se gasta el presupuesto de vialidades.',
        model: 'Servicio mensual sin inversión de capital: de 1,200 dólares (hasta 200 km al mes) a 4,000 dólares (hasta 1,000 km al mes), o contrato Enterprise para toda la Ciudad [27]. El piloto se formaliza por convenio; el contrato permanente sigue la ley de adquisiciones.',
        investment: 'Nula para la Ciudad en el piloto; baja después.',
        pilot: 'Gratuito, con 2 motocicletas de una alcaldía o de Sobse durante 3 meses: instalación, mapeo y validación contra datos locales [27].',
        indicators: ['Kilómetros inspeccionados', 'Precisión validada', 'Tiempo entre detección y reparación', 'Reparaciones verificadas', 'Reclamaciones por daños'],
        risks: ['Definir quién paga la mensualidad después del piloto (Sobse o alcaldías)', 'Diferenciarse de Bachetel, que es un canal de reporte y no un inventario', 'Propiedad de los datos (del gobierno)'],
        csi: 'Fábrica de software para integraciones con Locatel y sistemas de obra, y mesa de ayuda a cuadrillas [28].'
    },
    P6: {
        id: 'P6',
        title: 'Red de abarrotes conectada: pagos, vales y servicios en la tienda de barrio',
        subtitle: 'Orden del Espacio Público y Economía Popular',
        problem: 'La tienda de barrio es el punto de contacto más cercano del ciudadano, pero opera en efectivo (85.5% de las compras menores a 500 pesos se pagan así [23]), enfrenta extorsión y robo, y 77.5% de los tenderos ve su negocio en riesgo [25]. Al mismo tiempo, la Ciudad ya canaliza apoyos a través de ellas con Mercomuna [24].',
        solution: 'Terminal de cobro gratuita en comodato que permite a la tienda aceptar pagos digitales, canjear vales de programas sociales en forma digital, cobrar trámites y servicios de la Ciudad, vender recargas y acceder a proveeduría y crédito.',
        components: [
            'Terminal en comodato financiada con comisiones de centavos por operación, con banco aliado como titular de los fondos',
            'Canje digital de vales (por ejemplo, Mercomuna) con QR, conciliación automática y pago rápido al tendero',
            'Cobro de aprovechamientos (MiPuesto, P1), predial y agua en la tienda',
            'Proveeduría a mejor precio y crédito de capital de trabajo basado en el historial de ventas',
            'Botón de alerta conectado con la Secretaría de Seguridad Ciudadana, por validar con la autoridad'
        ],
        market: [
            'Mercomuna: 900 mdp en 2025 para 335 mil familias y más de 30 mil comercios registrados [24]; en 2026 el programa se amplía a 700 mil familias [24]. Con 30 mil comercios, el promedio sería de unos 30 mil pesos en vales por comercio al año',
            'Ley de Economía Digital aprobada por el Senado: obliga a los gobiernos a aceptar medios digitales en trámites y pagos [22]',
            '53% de las tiendas las atienden mujeres y 84% sostienen a jefas o jefes de familia [25]'
        ],
        impactEco: 'Ingreso por comisión sin costo para la Ciudad; trazabilidad de los apoyos sociales (cada peso llega al comercio local y se concilia); más puntos de pago para las contribuciones. Ejemplo ilustrativo: 5,000 tiendas con 40 operaciones diarias a 0.50 pesos ≈ 3 mdp mensuales para sostener la red.',
        impactSoc: 'Pagos y trámites cerca de casa, menos efectivo en la tienda (menos riesgo de robo y extorsión), y crédito para negocios encabezados en su mayoría por mujeres.',
        model: 'Modelo privado con convenio: comisión por operación con banco aliado, ingresos de proveeduría y crédito. Con la Ciudad, convenio de colaboración para el canje digital de vales y el cobro de contribuciones.',
        investment: 'Baja a media; la recuperación depende del volumen de operaciones por tienda.',
        pilot: '500 a 1,000 tiendas ya registradas en Mercomuna en dos alcaldías, con canje digital de vales y cobro de servicios, durante 4 a 6 meses.',
        indicators: ['Tiendas activas', 'Operaciones diarias', 'Vales canjeados digitalmente', 'Tiempo de pago al tendero', 'Contribuciones cobradas', 'Créditos otorgados'],
        risks: ['Competencia de terminales existentes (Mercado Pago, Clip, bancos)', 'Temor del tendero a la visibilidad fiscal', 'Logística de surtido', 'Reglas de operación de Mercomuna', 'Publicación y reglamentación de la Ley de Economía Digital'],
        csi: 'Relación con banca para el banco aliado, verificación de identidad del tendero y contact center para soporte a la red [28].'
    },
    P7: {
        id: 'P7',
        title: 'Parquímetros digitales con empleo social en 10 alcaldías',
        subtitle: 'Movilidad e Ingresos No Tarifarios',
        problem: 'El sistema ecoParq funciona en 4 alcaldías y recauda más de 525 mdp al año [13][14], pero las 12 alcaldías restantes no tienen parquímetros: el estacionamiento en vía pública está tomado por la doble fila y el cobro informal.',
        solution: 'Operadora de parquímetros digitales para 20,000 cajones en 10 alcaldías (Azcapotzalco, Coyoacán, Gustavo A. Madero, Iztacalco, Iztapalapa, Magdalena Contreras, Milpa Alta, Tláhuac, Venustiano Carranza y Xochimilco), con tarifa social y supervisión a cargo de madres jefas de familia con empleo formal [27].',
        components: [
            '2,000 parquímetros solares con monedas, QR y NFC; pago por app y suscripciones para trabajadores',
            'Tarifa social de 10 pesos por hora; suscripción mensual de 250 pesos y anual de 1,750 pesos [27]',
            '167 supervisoras de calle con IMSS e INFONAVIT [27]',
            'Panel por alcaldía en tiempo real y reparto transparente de ingresos'
        ],
        market: [
            'ecoParq recaudó más de 525 mdp en 2024 [14] con unos 30 mil cajones [13]: cerca de 17 mil pesos por cajón al año',
            'Plan del equipo: 380.5 mdp brutos anuales (unos 19 mil pesos por cajón), 60% para las alcaldías (228 mdp el primer año), inversión de 138.6 mdp y recuperación en unos 21 meses [27]',
            'Sensibilidad: el plan supone una productividad por cajón parecida a la de Polanco o Roma en alcaldías con menor demanda; con la mitad de esa productividad, el ingreso sería de unos 190 mdp y la recuperación tardaría más. El estudio de demanda por polígono es el primer entregable'
        ],
        impactEco: 'Ingreso recurrente para las alcaldías sin inversión pública, menos doble fila y datos de movilidad para la Semovi.',
        impactSoc: 'Empleo formal para mujeres jefas de familia y tarifa accesible para trabajadores.',
        model: 'Concesión o permiso administrativo con reparto de ingresos (propuesta: 60% para la alcaldía), en coordinación con la Semovi. Requiere estudio de viabilidad, consulta vecinal y un contrato multianual.',
        investment: 'Alta (unos 138.6 mdp); requiere socio con capacidad financiera.',
        pilot: 'Uno o dos polígonos de alta demanda en una alcaldía receptiva, con unos 3,000 cajones [27].',
        indicators: ['Ocupación y rotación por cajón', 'Ingreso por cajón', 'Transferencia a la alcaldía', 'Reducción de doble fila', 'Satisfacción vecinal'],
        risks: ['Inversión alta', 'Cada alcaldía decide y el tema es políticamente sensible', 'Un contrato largo rebasa la administración', 'Vandalismo', 'Resistencia de cuidacoches. Conviene en una segunda fase'],
        csi: 'Contact center y mesa de ayuda para usuarios, fábrica de software para la app; su capacidad financiera para coinvertir debe validarse [28].'
    },
    P8: {
        id: 'P8',
        title: 'Metro Conectado: Wi-Fi, app y medios digitales',
        subtitle: 'Movilidad e Ingresos No Tarifarios',
        problem: 'El Metro mueve unos 3.4 millones de viajes diarios [17], pero sus ingresos no tarifarios son limitados: la publicidad está concesionada hasta 2030 con una contraprestación que en buena parte se paga en especie [18]. El Wi-Fi existente es parcial [19].',
        solution: 'Capa digital para el pasajero: Wi-Fi de alta capacidad con portal de acceso, app con tiempos de llegada y alertas, y medios digitales en pantallas, diseñada en coordinación con el titular actual de la publicidad para generar ingresos nuevos para el Metro.',
        components: [
            'Wi-Fi en 10 estaciones piloto de alto aforo (Pantitlán, Indios Verdes, Tacuba, Universidad, Centro Médico, Chabacano, Taxqueña, Polanco, Hidalgo y La Raza) [27]',
            'App con información en tiempo real, recargas y contenido patrocinado',
            'Suscripción opcional sin anuncios y mayor velocidad',
            'Analítica de flujos solo agregada y anónima, para operación y planeación',
            'Tarjetas patrocinadas y campañas de servicio público'
        ],
        market: [
            '1,241.6 millones de viajes en 2025, 6% más que en 2024 [17]',
            'La contraprestación pactada por la publicidad fue de 19.2 millones de pesos mensuales, unos 231 mdp al año, sobre 46,921 espacios [18]: referencia del valor de la audiencia',
            'Inversión estimada de la fase 1 por el equipo: unos 99 mdp para 10 estaciones [27]'
        ],
        impactEco: 'Ingresos no tarifarios para el Metro sin subsidio; información para la operación; canal directo de comunicación con millones de usuarios.',
        impactSoc: 'Conectividad para usuarios que pasan horas en el transporte; información de servicio en tiempo real.',
        model: 'Permiso administrativo temporal o asociación con el Metro; acuerdo con ISA Corporativo o diseño para la nueva licitación de 2030; publicidad digital y suscripciones.',
        investment: 'Alta; requiere socio financiero.',
        pilot: 'Una o dos estaciones de muy alto aforo, solo Wi-Fi y app, durante 6 meses.',
        indicators: ['Usuarios únicos conectados', 'Calidad del servicio', 'Ingreso por estación', 'Satisfacción'],
        risks: ['Régimen de concesiones del Metro (la publicidad está concedida hasta septiembre de 2030 [18])', 'Verificar el contrato de Wi-Fi vigente', 'Obras de modernización (Línea 3) [17]', 'Privacidad: no se propone la venta de datos personales, solo estadística anónima conforme a la nueva ley de datos [26]'],
        csi: 'Verificación de identidad para registro en el portal, gestión de consentimientos y atención a usuarios [28].'
    }
};

// ── Fichas completas integradas en la página ────────────────
function ffSection(icon, title, bodyHtml, isList) {
    return `
        <section class="ff-section">
            <h4><i class="fas ${icon}"></i> ${title}</h4>
            ${isList ? `<ul>${bodyHtml}</ul>` : `<p>${bodyHtml}</p>`}
        </section>`;
}

function renderFullFichas() {
    Object.values(projectData).forEach(d => {
        const article = document.getElementById(`ficha-${d.id}`);
        if (!article) return;
        article.innerHTML = `
            <header class="full-ficha-header">
                <div class="full-ficha-id">${d.id}</div>
                <div>
                    <h3>${d.title}</h3>
                    <p>${d.subtitle}</p>
                </div>
            </header>
            <div class="full-ficha-body">
                ${ffSection('fa-exclamation-circle', 'Problema que atiende', d.problem, false)}
                ${ffSection('fa-lightbulb', 'Solución propuesta', d.solution, false)}
                ${ffSection('fa-cubes', 'Componentes clave', d.components.map(c => `<li>${c}</li>`).join(''), true)}
                ${ffSection('fa-database', 'Datos de mercado que lo respaldan', d.market.map(m => `<li>${m}</li>`).join(''), true)}
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-chart-line"></i> Impacto en economía y recaudación</h4><p>${d.impactEco}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-users"></i> Impacto social</h4><p>${d.impactSoc}</p></section>
                </div>
                ${ffSection('fa-handshake', 'Modelo de contratación / negocio', d.model, false)}
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-coins"></i> Escala de inversión</h4><p>${d.investment}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-rocket"></i> Piloto sugerido</h4><p>${d.pilot}</p></section>
                </div>
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-chart-bar"></i> Indicadores de éxito</h4><ul class="ff-inline-list">${d.indicators.map(i => `<li>${i}</li>`).join('')}</ul></section>
                    <section class="ff-card"><h4><i class="fas fa-exclamation-triangle"></i> Riesgos y dependencias</h4><ul class="ff-inline-list">${d.risks.map(r => `<li>${r}</li>`).join('')}</ul></section>
                </div>
                ${ffSection('fa-building', 'Aporte de Grupo CSI', d.csi, false)}
            </div>`;
    });
}

renderFullFichas();

document.body.style.overflow = 'hidden';

// ── Fade in on scroll ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.full-ficha, .roadmap-card, .stat-card, .table-wrapper, .figure-card, .valor-card, .timeline-item, .glos-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

console.log('%c🏙️ Ciudad de México Digital y Próspera', 'color: #d4af37; font-size: 18px; font-weight: bold;');
console.log('%cPropuesta Estratégica v1.0 · Octubre 2026', 'color: #0f3460; font-size: 13px;');
console.log('%cDocumento Confidencial · XGT Group Technologies · Grupo CSI', 'color: #8b2635; font-size: 12px; font-weight: bold;');
