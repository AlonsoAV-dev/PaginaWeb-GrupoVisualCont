import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const NOTICES_PER_PAGE = 10;

export const sidebarImages = [
  {
    src: "/images/noticias/sidebar/busco-trabajo.webp",
    alt: "busco trabajo",
    url: "https://buscotrabajo.pe",
  },
  {
    src: "/images/noticias/sidebar/ice.webp",
    alt: "instituto contable",
    url: "https://institutocontable.org/",
  },
  {
    src: "/images/noticias/sidebar/revista-contable.webp",
    alt: "revista consultoria",
    url: "https://revistadeconsultoria.com/",
  },
];

export const visualSolutions = [
  {
    alt: "visualcont",
    src: "/images/noticias/sidebar/visual-cont.webp",
    url: "/contable",
  },
  {
    alt: "visualfact",
    src: "/images/noticias/sidebar/visual-fact.webp",
    url: "/facturador",
  },
  {
    alt: "visualplan",
    src: "/images/noticias/sidebar/visual-plan.webp",
    url: "/planilla",
  },
  {
    alt: "visualerp",
    src: "/images/noticias/sidebar/visual-erp.webp",
    url: "/erp",
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Category {
  Tributacion = "tributación",
  Contabilidad = "contabilidad",
  Laboral = "laboral",
  Finanzas = "finanzas",
  Economia = "economía",
  Tecnologia = "tecnología",
  Coaching = "coaching",
}

interface AuthorComment {
  name: string;
  image?: string;
  comment: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
  };
}

interface Notice {
  slug: string; // para redirigir a la pagina
  title: string; // el titulo de la noticia
  author: AuthorComment; // autor de la noticia
  pubDate: string; // fecha de publicacion de la noticia
  shortDescription: string; // descripcion corta del CARD
  mainImage?: string; // imagen principal de la noticia
  categories: Category[]; // categorias a las que puede pertenecer la noticia
  content: string; // cuerpo de la noticia (NOTICIA COMPLETA)
  projectUrl?: string; // link a una pagina externa, si aplica
}

// AQUI ES DONDE VAN LAS NOTICIAS (EL MAS RECIENTE VA MAS ARRIBA)
export const NoticeData: Notice[] = [
  {
    slug: "recargo-al-consumo-rc-en-restaurantes-peru-2025",
    title: "¿Te están cobrando sin avisar? Recargo al Consumo (RC) – hasta 13% en restaurantes del Perú (2025)",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment: "Abogada tributarista con 15 años de experiencia en asesoría fiscal, laboral y defensa del consumidor.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/"
      }
    },
    pubDate: "2025-10-29",
    shortDescription:
      "Guía actualizada sobre el Recargo al Consumo (hasta 13%) en restaurantes: base legal, efectos tributarios y laborales, derechos del cliente y buenas prácticas 2025.",
    mainImage: "/images/noticias/noticia_30/mainImage.webp",
    categories: [Category.Tributacion],
    content: `
      <p>
        En el Perú, muchos restaurantes incluyen en la cuenta un <strong>Recargo al Consumo (RC)</strong> de hasta <strong>13%</strong>.
        Detrás de ese porcentaje hay reglas tributarias, laborales y de <em>protección al consumidor</em> que conviene conocer.
        Esta guía (2025) explica su origen, cómo debería informarse, quién lo recibe y cómo afecta a empresas, trabajadores y clientes.
      </p>

      <h3>1. Origen y marco normativo del RC</h3>
      <h4>1.1 Antecedentes</h4>
      <p>
        El RC nació como mecanismo para complementar ingresos del personal de servicio en hoteles y restaurantes (antecedentes en leyes de 1963 y 1967).
        En <strong>1992</strong>, el <strong>Decreto Ley 25988</strong> derogó un impuesto previo y, en su <strong>Quinta Disposición Complementaria</strong>,
        autorizó que, por acuerdo con los trabajadores, se cobre un <strong>recargo hasta 13%</strong>.
      </p>

      <h4>1.2 Normativa vigente</h4>
      <ul>
        <li><strong>DL 25988 (5ª Disposición):</strong> autoriza hasta 13%, indica que el RC <em>no es remunerativo</em> y que <em>no forma parte de la base del IGV</em> si se transfiere al personal.</li>
        <li><strong>Reglas tributarias y laborales generales:</strong> ingresos por trabajo personal están afectos a Impuesto a la Renta en cabeza del trabajador.</li>
        <li><strong>Protección al consumidor (Indecopi):</strong> el recargo debe <strong>informarse claramente</strong> antes de contratar el servicio.</li>
      </ul>

      <h4>1.3 Finalidad</h4>
      <p>
        <strong>Laboral:</strong> generar un fondo para el personal de atención. 
        <strong>Empresarial/tributaria:</strong> si se transfiere al personal, no integra remuneración ni IGV para la empresa.
        Falta un reglamento específico sobre <em>cómo</em> se distribuye y <em>cómo</em> se informa, lo que genera controversias.
      </p>

      <h3>2. ¿Cómo se aplica en la práctica?</h3>
      <h4>2.1 En la boleta del cliente</h4>
      <p>
        Aparece como “<strong>RC</strong>”, “<strong>Recargo al Consumo</strong>”, “<strong>DL 25988</strong>” o “<strong>Servicio</strong>”.
        Puede estar incluido en la carta o añadirse al final de la cuenta. La variabilidad produce confusión si no se advierte antes.
      </p>

      <h4>2.2 Quién cobra y quién recibe</h4>
      <p>
        El local <em>cobra</em> el RC y, en teoría, lo <em>transfiere</em> al personal de servicio. 
        En la práctica, sin reglas de reparto claras, pueden presentarse retenciones o usos distintos a su finalidad.
      </p>

      <h4>2.3 ¿Puedo negarme a pagar?</h4>
      <p>
        Si el establecimiento <strong>informó previamente</strong> el RC (carta/aviso visible) y usted aceptó el servicio, se presume su aceptación.
        Si <strong>no fue informado</strong> de forma clara y oportuna, puede cuestionarlo ante el local o <strong>reclamar ante Indecopi</strong>.
      </p>

      <h4>2.4 Efectos económicos</h4>
      <ul>
        <li><strong>Consumidor:</strong> encarece la cuenta y puede coexistir con propina voluntaria.</li>
        <li><strong>Empresa:</strong> si se transfiere, el RC no integra ingresos ni IGV; si no se transfiere, podría considerarse ingreso gravado.</li>
        <li><strong>Trabajador:</strong> lo que recibe por RC es renta de trabajo y <strong>paga Impuesto a la Renta</strong> (quinta categoría si hay planilla).</li>
      </ul>

      <h3>3. Vacíos, controversias y riesgos</h3>
      <ul>
        <li><strong>Transparencia:</strong> muchos locales no informan con claridad antes de la contratación, vulnerando el derecho a la información.</li>
        <li><strong>Reparto al personal:</strong> no hay reglas legales de distribución; pueden existir deducciones no transparentes.</li>
        <li><strong>Tratamiento tributario:</strong> empresa sin ingreso si transfiere; trabajador con IR. Falta de trazabilidad genera contingencias.</li>
        <li><strong>Competencia:</strong> locales que aplican RC pueden tener ventajas frente a quienes no lo aplican.</li>
      </ul>

      <h3>4. Tratamiento tributario del RC</h3>
      <h4>4.1 Empresa</h4>
      <p>
        Si existe acuerdo con trabajadores y el RC se <strong>transfiere íntegramente</strong>:
        <em>no es</em> ingreso empresarial ni forma parte de la <strong>base del IGV</strong>. 
        Si <strong>no se transfiere</strong> o se integra a la caja, puede considerarse <strong>ingreso gravado</strong>.
      </p>

      <h4>4.2 Trabajador</h4>
      <p>
        El RC recibido es <strong>renta de trabajo</strong> y está afecto a <strong>Impuesto a la Renta (quinta categoría)</strong> si hay vínculo laboral.
        No integra beneficios sociales (vacaciones, CTS, etc.) por su <em>naturaleza no remunerativa</em> en la empresa.
      </p>

      <h4>4.3 Recomendaciones contables</h4>
      <ul>
        <li>Registrar y <strong>conciliar</strong> lo cobrado y lo entregado al personal.</li>
        <li>Documentar <strong>política de reparto</strong> y su ejecución (actas/planillas internas).</li>
        <li>Informar a los trabajadores los montos y su tratamiento tributario personal.</li>
      </ul>

      <h3>5. Panorama 2025 y posibles reformas</h3>
      <p>
        En 2025 el RC sigue permitido (hasta 13%), con <strong>baja fiscalización</strong> y frecuentes reclamos por falta de información.
        Se discuten reformas para: <strong>información obligatoria</strong> visible al consumidor, <strong>formato estandarizado</strong> en boletas
        y <strong>trazabilidad del reparto</strong>. Algunas propuestas abogan por reemplazar el RC por <strong>propina voluntaria</strong>.
      </p>

      <h3>6. Guía práctica</h3>
      <h4>6.1 Consumidores</h4>
      <ul>
        <li>Busque en carta/aviso si el local aplica RC y el <strong>porcentaje</strong>.</li>
        <li>Revise la boleta y <strong>pregunte</strong> por el concepto. Si no fue informado, puede <strong>reclamar</strong>.</li>
      </ul>

      <h4>6.2 Trabajadores</h4>
      <ul>
        <li>Solicite la <strong>política de reparto</strong> y reportes de lo recaudado/entregado.</li>
        <li>Considere el RC recibido en su <strong>IR de quinta categoría</strong>.</li>
      </ul>

      <h4>6.3 Establecimientos</h4>
      <ul>
        <li>Formalice un <strong>acuerdo</strong> con el personal (porcentaje, criterios, periodicidad).</li>
        <li>Coloque <strong>aviso claro</strong> en carta y punto de pago: “Se aplica RC de X% (DL 25988)”.</li>
        <li>Lleve <strong>contabilidad y trazabilidad</strong> del RC y documente su entrega al personal.</li>
      </ul>

      <h3>7. Conclusión</h3>
      <p>
        El RC puede complementar ingresos del personal, pero su utilidad depende de <strong>transparencia</strong> y <strong>buena gestión</strong>.
        Consumidores informados, trabajadores con trazabilidad y empresas con políticas claras reducen conflictos y contingencias.
        Hasta que exista una reforma integral, <strong>informar, documentar y cumplir</strong> es la mejor práctica para todos.
      </p>
    `,
    projectUrl: ""
  },
  {
    slug: "cultura-digital-en-las-organizaciones-cambio-humano-2025",
    title:
      "CULTURA DIGITAL EN LAS ORGANIZACIONES: MÁS ALLÁ DE LA TECNOLOGÍA, EL CAMBIO HUMANO",
    author: {
      name: "Willy Huamali",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-28",
    shortDescription:
      "La verdadera transformación digital no ocurre en la tecnología, sino en la cultura humana que la adopta. Descubre cómo construir una cultura digital sostenible.",
    mainImage: "/images/noticias/noticia_29/mainImage.webp",
    categories: [Category.Economia, Category.Tecnologia],
    content: `
    <p class="italic">
      “En la era digital, la verdadera transformación no ocurre en los servidores, sino en la mente de las personas que los utilizan.”
    </p>

    <p>
      En la vorágine de la transformación digital, muchas organizaciones creen que basta con adoptar tecnología avanzada para lograr el cambio. 
      Sin embargo, la <strong>transformación digital</strong> va mucho más allá del software o la nube: es, ante todo, un proceso humano.
      Sin una cultura organizacional sólida y alineada al cambio, incluso la herramienta más poderosa pierde su valor.
    </p>

    <h3>¿Qué es realmente la Cultura Digital?</h3>
    <p>
      La <strong>cultura digital</strong> es el conjunto de valores, comportamientos y mentalidades que permiten a una empresa prosperar en un entorno digital.
      No se trata solo de saber usar herramientas, sino de transformar la forma de pensar, aprender y colaborar.
    </p>

    <ul>
      <li><strong>Agilidad y Adaptabilidad:</strong> capacidad para responder al cambio y aprender de los errores.</li>
      <li><strong>Colaboración Transparente:</strong> derribar silos y promover la inteligencia colectiva.</li>
      <li><strong>Orientación al Cliente:</strong> decisiones basadas en datos y centradas en la experiencia del usuario.</li>
      <li><strong>Mentalidad de Crecimiento:</strong> aprendizaje continuo y apertura al cambio.</li>
      <li><strong>Empoderamiento:</strong> autonomía para tomar decisiones y asumir responsabilidades.</li>
      <li><strong>Curiosidad y Experimentación:</strong> fomentar la innovación y aceptar el error como aprendizaje.</li>
    </ul>

    <h3>El error más común: creer que la transformación digital es solo comprar tecnología</h3>
    <p>
      Las empresas invierten en infraestructura, software o automatización, pero los resultados son pobres si no transforman la cultura.
      La tecnología sin cambio humano es como un “mueble caro”: está presente, pero no aporta valor.
    </p>

    <h4>Ejemplos reales de falta de cambio cultural:</h4>
    <ul>
      <li>
        <strong>CRM sin uso:</strong> se implementa el sistema, pero los equipos no confían ni registran datos correctamente.
        Falta liderazgo y comunicación.
      </li>
      <li>
        <strong>Facturación electrónica percibida como amenaza:</strong> sin una capacitación adecuada, los usuarios se resisten al cambio,
        generando errores y frustración.
      </li>
      <li>
        <strong>Software contable en la nube subutilizado:</strong> los equipos siguen trabajando de forma aislada por falta de cultura colaborativa.
      </li>
    </ul>

    <p>
      Implementar la herramienta es rápido; lograr su adopción genuina es un proceso humano que requiere liderazgo, formación y confianza.
    </p>

    <h3>Los pilares del cambio humano hacia una cultura digital</h3>

    <h4>1. Liderazgo como ejemplo, no como orden</h4>
    <p>
      Los líderes deben ser los primeros en adoptar herramientas digitales y comportamientos modernos: comunicación abierta, decisiones basadas en datos 
      y apertura al feedback. Un líder que exige transformación pero sigue trabajando en papel genera contradicción.
    </p>

    <h4>2. Comunicación clara y constante</h4>
    <p>
      Los colaboradores necesitan comprender el <em>por qué</em> del cambio, no solo el <em>cómo</em>.
      La comunicación debe ser transparente, empática y continua para reducir la resistencia natural.
    </p>

    <h4>3. Formación y capacitación continuas</h4>
    <p>
      La digitalización no reemplaza personas, las potencia. Es vital capacitar en nuevas competencias como análisis de datos,
      gestión ágil y pensamiento crítico. Una fuerza laboral actualizada es una organización resiliente.
    </p>

    <h4>4. Rediseño de procesos e incentivos</h4>
    <p>
      La cultura se refuerza con lo que se mide y se premia. Los incentivos deben alinear los nuevos comportamientos:
      colaboración, innovación y mejora continua.
    </p>

    <h4>5. Espacios para fallar y aprender</h4>
    <p>
      La innovación nace donde el error no se castiga, sino que se analiza. 
      Las metodologías ágiles y laboratorios de innovación son herramientas clave para fomentar esta mentalidad.
    </p>

    <h3>Conclusión: la ventaja competitiva sostenible</h3>
    <p>
      La tecnología es accesible; la <strong>cultura digital</strong> no lo es. 
      Lo que distingue a una organización verdaderamente transformada es su capacidad de aprendizaje, colaboración y adaptación constante.
    </p>

    <p>
      La transformación digital exitosa no es un cambio de sistemas, sino de <strong>mentalidad</strong>. 
      Invertir en el cambio humano no es un costo: es la única garantía de éxito sostenible en la era digital.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "notas-de-credito-en-sire-ventas-y-compras-sunat-2025",
    title: "Notas de Crédito en SIRE Ventas – Compras SUNAT",
    author: {
      name: "Monica Romero",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-27",
    shortDescription:
      "Guía práctica para anotar correctamente notas de crédito en SIRE Ventas y Compras SUNAT, según anexos 3 y 11, y las columnas 15 y 16.",
    mainImage: "/images/noticias/noticia_28/mainImage.webp",
    categories: [Category.Tributacion, Category.Contabilidad],
    content: `
    <h3>Notas de Crédito en SIRE Ventas SUNAT</h3>
    <p>
      Las <strong>Notas de Crédito</strong> en el módulo de Ventas del <strong>SIRE SUNAT</strong> deben anotarse correctamente para reflejar
      los descuentos o anulaciones de operaciones. Según el <strong>Anexo 3 del RVIE</strong>, las columnas relevantes son:
    </p>

    <img src="https://revistadeconsultoria.com/wp-content/uploads/2025/10/iiii-600x280.jpg" alt="Ejemplo estructura Anexo 3 RVIE SIRE Ventas" />

    <ul>
      <li><strong>Columna 15:</strong> Base Imponible Gravada</li>
      <li><strong>Columna 16:</strong> Descuento de la Base Imponible</li>
    </ul>

    <p>
      Estas columnas inciden directamente en cómo se registran las notas de crédito dentro del periodo tributario correspondiente.
    </p>

    <h4>¿Cómo se anotan las notas de crédito en el SIRE SUNAT?</h4>
    <ul>
      <li>
        Si la <strong>Nota de Crédito</strong> modifica una operación <em>del mismo periodo</em>, se registra en la 
        <strong>columna 15</strong>.
      </li>
      <li>
        Si la <strong>Nota de Crédito</strong> modifica una operación <em>de un periodo anterior</em>, se registra en la 
        <strong>columna 16</strong>.
      </li>
    </ul>

    <h3>Notas de Crédito en Compras SIRE SUNAT</h3>
    <p>
      En el módulo de Compras, las <strong>Notas de Crédito</strong> también se registran con un tratamiento diferenciado según el 
      <strong>Anexo 11 del RCE</strong>. En dicho formato se identifican las siguientes columnas:
    </p>

    <img src="https://revistadeconsultoria.com/wp-content/uploads/2025/10/774-1024x233.jpg" alt="Ejemplo estructura Anexo 11 RCE SIRE Compras" />

    <ul>
      <li><strong>Columna 15:</strong> Base Imponible Gravada</li>
      <li><strong>Columna 16:</strong> Descuento de la Base Imponible</li>
    </ul>

    <h4>Reglas para registrar Notas de Crédito en Compras Electrónico</h4>
    <ul>
      <li>Utiliza el <strong>Anexo 11</strong> para anotar notas de crédito que <em>no aparecen en la propuesta automática</em> de compras.</li>
      <li>Las notas de crédito deben registrarse <strong>solo en el periodo de su fecha de emisión</strong>.</li>
      <li>Los montos deben declararse con <strong>valores negativos</strong>.</li>
    </ul>

    <p>
      Una correcta anotación de las notas de crédito garantiza coherencia en los libros electrónicos, evita reparos por parte de SUNAT
      y mantiene actualizada la información del crédito fiscal y las ventas declaradas.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "credito-fiscal-igv-requisitos-errores-y-buenas-practicas-mype-2025",
    title:
      "Crédito Fiscal del IGV: requisitos, errores frecuentes y buenas prácticas para las MYPE en el Perú al 2025",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-27",
    shortDescription:
      "Qué es el crédito fiscal del IGV, requisitos sustanciales y formales, causales de pérdida, fiscalización SUNAT y buenas prácticas para MYPE en 2025.",
    mainImage: "/images/noticias/noticia_27/mainImage.webp",
    categories: [
      Category.Tributacion,
      Category.Contabilidad,
      Category.Economia,
    ],
    content: `
    <p>
      El <strong>crédito fiscal del IGV</strong> permite deducir del impuesto bruto (ventas) el IGV soportado en 
      <em>compras, servicios, contratos de construcción e importaciones</em> destinados a operaciones gravadas, 
      garantizando la neutralidad del impuesto. Su marco principal está en los <strong>arts. 18°–24°</strong> de la Ley del IGV
      (D.S. N.° 055-99-EF) y su Reglamento (D.S. N.° 029-94-EF).
    </p>

    <h3>1. Fundamento legal</h3>
    <ul>
      <li><strong>Art. 18°</strong>: define qué conforma el crédito fiscal (compras internas, servicios, construcción e importaciones).</li>
      <li><strong>Arts. 19°–20°</strong>: requisitos formales (comprobante válido, registro oportuno, sustento aduanero).</li>
      <li><strong>Art. 23° del Reglamento</strong>: prorrata cuando hay uso mixto (gravado y no gravado).</li>
      <li><strong>Art. 25°</strong>: supuestos de pérdida del derecho.</li>
    </ul>

    <h3>2. Requisitos sustanciales</h3>
    <ul>
      <li><strong>Destino gravado</strong>: los bienes/servicios deben emplearse en operaciones gravadas o que dan derecho a crédito (p. ej., exportación).</li>
      <li><strong>Vinculación/causalidad</strong>: relación necesaria y razonable con la actividad empresarial (criterio del art. 37° de la Ley del IR).</li>
      <li><strong>Sujeto afecto</strong>: contribuyente activo en RUC y afecto al IGV.</li>
    </ul>

    <h3>3. Requisitos formales</h3>
    <ul>
      <li><strong>Comprobante válido</strong> (Reglamento de Comprobantes de Pago): IGV discriminado, RUC correcto, emisión conforme a norma.</li>
      <li><strong>Registro en Compras</strong>: en el periodo de emisión o dentro de <strong>12 meses</strong> (art. 19°). Si SUNAT requiere y aún no se anotó, se pierde el derecho.</li>
      <li><strong>Proveedor hábil</strong>: RUC <em>activo y habido</em> al emitir.</li>
      <li><strong>Importaciones</strong>: sustento con <em>DAM</em> y constancia de pago del IGV aduanero.</li>
    </ul>

    <h3>4. Pérdida del derecho: casos frecuentes</h3>
    <ul>
      <li>Comprobantes de <em>no habidos</em> o RUC suspendido.</li>
      <li>Omisión de registro o registro fuera de plazo legal.</li>
      <li>Adquisiciones para operaciones <em>no gravadas/exoneradas</em> sin prorrata.</li>
      <li>Gastos personales o sin vinculación con la actividad.</li>
      <li>Comprobantes no fehacientes, duplicados o con fechas incongruentes.</li>
    </ul>

    <h3>5. Fiscalización y sustento probatorio</h3>
    <p>
      SUNAT puede requerir: comprobantes electrónicos, Registro de Compras (SIRE/PLE), contratos/OC, medios de pago 
      bancarizados (Ley 28194), guías de remisión y evidencias de recepción/uso. Desde 2024–2025 se intensifican 
      <strong>cruces electrónicos</strong> (emisor–receptor, aduanas, bancarización) y controles automáticos vía <strong>SIRE</strong>.
    </p>

    <h3>6. Jurisprudencia y criterios</h3>
    <ul>
      <li><strong>RTF 04564-5-2005</strong>: requisitos sustanciales y formales son <em>concurrentes</em>.</li>
      <li><strong>RTF 06913-2-2006</strong>: registro fuera de plazo implica pérdida del crédito.</li>
      <li><strong>Informe 060-2021-SUNAT</strong>: inadmisible crédito sin vinculación con operación gravada.</li>
      <li><strong>Informe 013-2023-SUNAT</strong>: conservación íntegra y accesible de CPE durante la prescripción.</li>
    </ul>

    <h3>7. Buenas prácticas para MYPE (2025)</h3>
    <ul>
      <li><strong>Validar proveedor</strong> (RUC activo/habido) antes de registrar.</li>
      <li><strong>Control documental</strong> físico/digital (CPE, contratos, O/C, guías, cargos de recepción).</li>
      <li><strong>Registro oportuno</strong> (periodo o dentro de 12 meses) y conciliación mensual de IGV (débito vs. crédito).</li>
      <li><strong>Bancarización</strong> &gt;= S/ 2,000 o USD 500.</li>
      <li><strong>Monitoreo SIRE/SOL</strong>: verificar aceptación y consistencia de CPE y DAM.</li>
      <li><strong>Prorrata</strong> documentada cuando exista uso mixto.</li>
    </ul>

    <h3>8. Actualizaciones 2025</h3>
    <ul>
      <li><strong>SIRE</strong> (RS 000040-2023/SUNAT): consolidación electrónica de Registros de Compras/Ventas y validaciones automáticas.</li>
      <li>Refuerzo de verificaciones: estado del emisor, montos entre partes y contraste con <strong>declaraciones aduaneras</strong>.</li>
    </ul>

    <h3>9. Conclusión</h3>
    <p>
      El crédito fiscal es clave para la neutralidad del IGV, pero su uso exige cumplir <strong>simultáneamente</strong> 
      requisitos sustanciales y formales. En 2025, con mayor digitalización y cruces automáticos, las MYPE deben robustecer 
      su <strong>gestión documental, registro oportuno y trazabilidad</strong>. Una falla en cualquiera de estos frentes puede 
      traducirse en reparos, intereses y sanciones que afectan la liquidez y la sostenibilidad del negocio.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "regimenes-tributarios-peru-2025-guia-para-elegir-y-cumplir",
    title:
      "🟢 Regímenes tributarios en el Perú 2025: guía detallada para elegir y cumplir con el régimen adecuado",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-24",
    shortDescription:
      "NRUS, RER, RMT y Régimen General en 2025: límites, tasas, libros, ventajas, desventajas y cómo elegir el régimen correcto ante SUNAT.",
    mainImage: "/images/noticias/noticia_26/mainImage.webp",
    categories: [
      Category.Tributacion,
      Category.Contabilidad,
      Category.Economia,
    ],
    content: `
    <p>
      En el Perú, todo negocio formal debe inscribirse en el <strong>RUC</strong> y acogerse a un régimen tributario. 
      En 2025 siguen vigentes cuatro: <strong>NRUS, RER, RMT</strong> y <strong>Régimen General</strong>. Esta guía resume 
      requisitos, tasas, obligaciones y cómo elegir el más conveniente.
    </p>

    <h3>1. ¿Qué es un régimen tributario y por qué importa?</h3>
    <p>
      Conjunto de reglas para <em>declarar, calcular y pagar</em> impuestos. Impacta en el monto a pagar, 
      libros contables, facturación electrónica, beneficios y nivel de fiscalización. La 
      <strong>digitalización SUNAT (SIRE, PLE, factura electrónica)</strong> exige conocer bien cada régimen.
    </p>

    <h3>2. Regímenes vigentes en 2025</h3>

    <h4>I. Nuevo RUS (NRUS)</h4>
    <ul>
      <li><strong>Enfoque:</strong> comerciantes/servicios de muy baja escala, máxima simplicidad.</li>
      <li><strong>Límites:</strong> ingresos o compras mensuales ≤ S/ 8,000; anuales ≤ S/ 96,000; 1 local; solo boletas.</li>
      <li><strong>No permite:</strong> facturas, crédito fiscal IGV, importaciones/exportaciones.</li>
    </ul>

    <h5>Cuota mensual fija</h5>
    <table>
      <thead>
        <tr><th>Categoría</th><th>Límite de ingresos/mes</th><th>Cuota mensual (2025)</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Hasta S/ 5,000</td><td>S/ 20</td></tr>
        <tr><td>2</td><td>De S/ 5,001 a S/ 8,000</td><td>S/ 50</td></tr>
      </tbody>
    </table>
    <p><strong>Ventajas:</strong> sin declaraciones mensuales ni libros. <strong>Desventajas:</strong> sin facturas ni crédito fiscal; no deducible para clientes empresa.</p>
    <p><strong>Ejemplo:</strong> Rosa vende jugos (S/ 6,500/mes): paga S/ 50 al mes y no declara IGV; si crece o necesita facturar, migra a RER/RMT.</p>

    <h4>II. Régimen Especial de Renta (RER)</h4>
    <ul>
      <li><strong>Enfoque:</strong> comercio/industria/servicios simples con volumen intermedio.</li>
      <li><strong>Límites:</strong> ingresos anuales ≤ S/ 525,000; activos fijos ≤ S/ 126,000; hasta 10 trabajadores por turno.</li>
      <li><strong>Impuesto:</strong> IR = <strong>1.5% de ingresos netos mensuales</strong> (sin deducir gastos). IGV 18% con crédito fiscal.</li>
      <li><strong>Libros:</strong> Registro de Compras y de Ventas; PDT/621 mensual.</li>
    </ul>
    <p><strong>Ventajas:</strong> cálculo simple, permite facturas y crédito fiscal. <strong>Desventajas:</strong> no deduce gastos ni pérdidas; no aplica a actividades profesionales/constructoras.</p>
    <p><strong>Ejemplo:</strong> Bodega con S/ 40,000/mes → IR 1.5% = S/ 600; declara IGV con crédito fiscal.</p>

    <h4>III. Régimen MYPE Tributario (RMT)</h4>
    <ul>
      <li><strong>Enfoque:</strong> MYPE con proyección de crecimiento (toda actividad).</li>
      <li><strong>Límite:</strong> ingresos netos anuales ≤ <strong>1,700 UIT</strong> (S/ 9,095,000 con UIT 2025 = S/ 5,350).</li>
      <li><strong>Base:</strong> <em>utilidad neta</em> (deduce gastos). Declaración mensual 621 y anual IR.</li>
      <li><strong>Libros:</strong> Ventas/Compras y Diario simplificado si ≤ 300 UIT; contabilidad completa si &gt; 300 UIT.</li>
    </ul>

    <h5>Tasa del Impuesto a la Renta (RMT)</h5>
    <table>
      <thead>
        <tr><th>Tramo de renta neta anual</th><th>Tasa aplicable</th></tr>
      </thead>
      <tbody>
        <tr><td>Hasta 15 UIT (S/ 80,250)</td><td>10%</td></tr>
        <tr><td>Exceso de 15 UIT</td><td>29.5%</td></tr>
      </tbody>
    </table>
    <p><strong>Ventajas:</strong> tramo inicial al 10% y deducciones. <strong>Desventajas:</strong> mayor formalidad y fiscalización.</p>
    <p><strong>Ejemplo:</strong> Panadería (utilidad neta S/ 200,000): 10% sobre 80,250 = S/ 8,025; 29.5% sobre 119,750 = S/ 35,331; <strong>IR total = S/ 43,356</strong>.</p>

    <h4>IV. Régimen General (RG)</h4>
    <ul>
      <li><strong>Enfoque:</strong> medianas/grandes o operaciones complejas; sin tope de ingresos.</li>
      <li><strong>IR:</strong> 29.5% sobre renta neta anual. Pagos a cuenta: 1.5% de ingresos o coeficiente del ejercicio anterior.</li>
      <li><strong>Libros:</strong> contabilidad completa (Diario, Mayor, Inventarios y Balances) y SIRE obligatorio.</li>
      <li><strong>Ventajas:</strong> deduce gastos/pérdidas, apto para licitaciones y exportaciones. <strong>Desventajas:</strong> alta carga administrativa y fiscalización.</li>
    </ul>

    <h3>3. Comparativo general 2025</h3>
    <table>
      <thead>
        <tr>
          <th>Característica</th>
          <th>NRUS</th>
          <th>RER</th>
          <th>RMT</th>
          <th>Régimen General</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Límite anual de ingresos</td>
          <td>S/ 96,000</td>
          <td>S/ 525,000</td>
          <td>1,700 UIT</td>
          <td>Sin límite</td>
        </tr>
        <tr>
          <td>Base del IR</td>
          <td>Cuota fija</td>
          <td>1.5% ingresos</td>
          <td>Utilidad neta</td>
          <td>Utilidad neta</td>
        </tr>
        <tr>
          <td>Tasa de IR</td>
          <td>S/ 20 o 50 mensual</td>
          <td>1.5%</td>
          <td>10% / 29.5%</td>
          <td>29.5%</td>
        </tr>
        <tr>
          <td>IGV</td>
          <td>No aplica</td>
          <td>18%</td>
          <td>18%</td>
          <td>18%</td>
        </tr>
        <tr>
          <td>Libros contables</td>
          <td>No lleva</td>
          <td>Compras y Ventas</td>
          <td>Simplificados o completos</td>
          <td>Completos</td>
        </tr>
        <tr>
          <td>Facturación electrónica</td>
          <td>No</td>
          <td>Sí</td>
          <td>Sí</td>
          <td>Sí</td>
        </tr>
        <tr>
          <td>Actividades</td>
          <td>Comercio minorista/servicios básicos</td>
          <td>Comercio, industria, servicios simples</td>
          <td>Todas</td>
          <td>Todas</td>
        </tr>
        <tr>
          <td>Ideal para</td>
          <td>Pequeños comerciantes</td>
          <td>Pequeñas empresas</td>
          <td>MYPE en crecimiento</td>
          <td>Empresas consolidadas</td>
        </tr>
      </tbody>
    </table>

    <h3>4. Cómo elegir el régimen correcto</h3>
    <ul>
      <li><strong>Nivel de ingresos y gastos:</strong> ≤ S/ 8,000/mes → NRUS; ingresos intermedios con pocas deducciones → RER; con gastos relevantes/expansión → RMT; gran escala/exportación → RG.</li>
      <li><strong>Actividad:</strong> servicios profesionales → RMT/RG; comercio minorista → NRUS/RER; manufactura/exportación → RMT/RG.</li>
      <li><strong>Proyección y formalidad:</strong> si vas a crecer o atender grandes clientes/Estado, prefiere RMT o RG.</li>
      <li><strong>Asesoría:</strong> un contador debe validar márgenes, gastos y flujos antes de decidir.</li>
    </ul>

    <h3>5. Fiscalización y digitalización 2025</h3>
    <ul>
      <li><strong>SIRE obligatorio</strong> para Registros de Compras y Ventas Electrónicos.</li>
      <li><strong>Facturación 100% electrónica</strong> (según régimen, excepto NRUS).</li>
      <li><strong>Cruces</strong> bancarios, laborales y aduaneros; <strong>notificaciones</strong> en buzón SOL.</li>
    </ul>

    <h3>6. Recomendaciones finales</h3>
    <ul>
      <li>Evalúa ingresos y estructura de gastos antes de elegir y evita cambios frecuentes.</li>
      <li>Usa el orientador de regímenes de SUNAT y formaliza libros electrónicos desde el inicio.</li>
      <li>Capacita al equipo en <strong>SIRE</strong> y planifica IGV/IR mensuales para cuidar la liquidez.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      Los regímenes 2025 se adaptan a distintos tamaños y etapas de negocio. 
      <strong>NRUS</strong> facilita la formalidad inicial; <strong>RER</strong> simplifica para pequeños con IGV; 
      <strong>RMT</strong> equilibra deducciones y tasa progresiva; el <strong>Régimen General</strong> 
      soporta operaciones complejas. Una contabilidad ordenada y asesoría adecuada
      maximizan beneficios y evitan contingencias con SUNAT.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "pago-de-utilidades-2025-peru-reglas-calculos-y-novedades",
    title:
      "Pago de utilidades 2025 en el Perú: reglas, cálculos y novedades que todo empleador debe conocer",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-22",
    shortDescription:
      "Qué empresas reparten utilidades en 2025, cómo se calculan, plazos, topes legales, multas SUNAFIL y controles cruzados con SUNAT.",
    mainImage: "/images/noticias/noticia_25/mainImage.webp",
    categories: [Category.Laboral, Category.Contabilidad],
    content: `
    <p><strong>Introducción ejecutiva.</strong> El pago de utilidades es un derecho laboral y una obligación empresarial para quienes generan rentas de tercera categoría y superan los 20 trabajadores. En 2025 rigen el <em>D. Leg. N.º 892</em> y su reglamento (<em>D.S. N.º 009-98-TR</em>), con mayor fiscalización y cruces de información entre <strong>SUNAFIL</strong>, <strong>SUNAT</strong> y el <strong>MTPE</strong>.</p>

    <h3>1. ¿Qué son las utilidades y cuál es su fundamento legal?</h3>
    <p>Es la participación de los trabajadores en la <strong>renta neta antes del Impuesto a la Renta</strong> generada por la empresa. Base legal: D. Leg. N.º 892, D.S. N.º 009-98-TR y TUO del D. Leg. N.º 728. No integra CTS, vacaciones ni gratificaciones.</p>

    <h3>2. ¿Qué empresas y trabajadores están comprendidos en 2025?</h3>
    <ul>
      <li><strong>Empresas obligadas:</strong> rentas de 3.ª categoría, más de 20 trabajadores en promedio anual y utilidad neta imponible.</li>
      <li><strong>Beneficiarios:</strong> todos los trabajadores en planilla (tiempo completo, parcial o a plazo fijo) que hayan laborado al menos un día.</li>
      <li><strong>No comprendidos:</strong> microempresas REMYPE, practicantes y modalidades formativas, empresas públicas y sin fines de lucro.</li>
    </ul>

    <h4>Porcentajes por actividad</h4>
    <table>
      <thead>
        <tr><th>Actividad</th><th>% renta neta antes del IR</th></tr>
      </thead>
      <tbody>
        <tr><td>Pesca / Telecomunicaciones / Industria</td><td>10%</td></tr>
        <tr><td>Minería / Comercio y restaurantes</td><td>8%</td></tr>
        <tr><td>Otras actividades</td><td>5%</td></tr>
      </tbody>
    </table>

    <h3>3. Cálculo de utilidades: paso a paso</h3>
    <ol>
      <li><strong>Monto global:</strong> aplicar el % sectorial sobre la renta neta antes del IR.</li>
      <li><strong>Distribución individual:</strong> 50% según <em>días efectivamente laborados</em> y 50% según <em>remuneraciones brutas</em>.</li>
    </ol>
    <p><em>Tope:</em> ningún trabajador puede percibir más de <strong>18 remuneraciones mensuales</strong> por este concepto; el excedente va a <strong>FONDOEMPLEO</strong>.</p>

    <h4>Qué se considera “día laborado” y “remuneración”</h4>
    <ul>
      <li>Días: incluye descanso semanal, vacaciones, licencias sindicales y descansos médicos con ESSALUD.</li>
      <li>Remuneración: base bruta habitual; no considerar conceptos extraordinarios no remunerativos.</li>
    </ul>

    <h3>4. Plazos y forma de pago</h3>
    <p>La empresa tiene <strong>30 días calendario</strong> desde la presentación de la <strong>DJ Anual del IR</strong> (marzo–abril 2025, según RUC) para pagar utilidades (abril–mayo 2025 aprox.). Se paga en efectivo o depósito y se entrega <strong>liquidación individual de cálculo</strong>.</p>

    <h3>5. Novedades de 2025 (enfoque de control)</h3>
    <ul>
      <li><strong>Operativos SUNAFIL</strong> priorizados en medianas y grandes.</li>
      <li><strong>Digitalización y cruces SUNAT–MTPE:</strong> conciliación de resultados contables (PLE/SIRE) con montos repartidos.</li>
      <li><strong>Teletrabajo e híbridos:</strong> confirman derecho en igualdad de condiciones (días y remuneración).</li>
      <li><strong>REMYPE:</strong> recordatorio: solo micro y pequeñas debidamente inscritas pueden tener trato diferenciado; si superan 20 trabajadores, deben cumplir.</li>
    </ul>

    <h3>6. Ejemplos prácticos</h3>
    <h4>Ejemplo 1 — Empresa industrial</h4>
    <ul>
      <li>Renta neta antes del IR: S/ 3,000,000 → 10% = S/ 300,000 a repartir.</li>
      <li>50% por días: S/ 150,000; 50% por remuneraciones: S/ 150,000.</li>
      <li>Totales: días del grupo = 17,500; remuneraciones del grupo = S/ 2,000,000.</li>
      <li>Trabajador A: 360 días y S/ 48,000/año → por días = (360/17,500)*150,000 = S/ 3,085.71; por remuneraciones = (48,000/2,000,000)*150,000 = S/ 3,600; <strong>Total: S/ 6,685.71</strong>.</li>
    </ul>

    <h4>Ejemplo 2 — Empresa comercial</h4>
    <ul>
      <li>Renta neta antes del IR: S/ 1,800,000 → 8% = S/ 144,000.</li>
      <li>Distribución: S/ 72,000 por días y S/ 72,000 por remuneraciones.</li>
      <li>Totales: días = 10,800; remuneraciones = S/ 1,200,000.</li>
      <li>Trabajador B: 300 días y S/ 36,000/año → por días = S/ 2,000; por remuneración = S/ 2,160; <strong>Total: S/ 4,160</strong>.</li>
    </ul>

    <h3>7. Sanciones y riesgos</h3>
    <p>El no pago o cálculo incorrecto es <strong>infracción grave</strong> (D.S. N.º 019-2006-TR). Multas referenciales 2025:</p>
    <table>
      <thead>
        <tr><th>Tipo de empresa</th><th>Multa máxima aprox.</th></tr>
      </thead>
      <tbody>
        <tr><td>Microempresa</td><td>S/ 2,310</td></tr>
        <tr><td>Pequeña empresa</td><td>S/ 23,100</td></tr>
        <tr><td>Mediana y gran empresa</td><td>S/ 230,000</td></tr>
      </tbody>
    </table>
    <p>Además, se devengan <strong>intereses legales laborales</strong> desde el día siguiente al vencimiento y pueden iniciarse inspecciones y sanciones automáticas por denuncias o cruces SUNAT–SUNAFIL.</p>

    <h3>8. Buenas prácticas para 2025</h3>
    <ul>
      <li><strong>Cierre contable ordenado</strong> y conciliado con PLE/SIRE.</li>
      <li><strong>Simular</strong> el reparto antes de presentar la DJ Anual (reserva de liquidez).</li>
      <li><strong>Documentar</strong> el cálculo y entregar constancias individuales.</li>
      <li><strong>Cumplir el plazo de 30 días</strong> para evitar contingencias.</li>
      <li><strong>Comunicar</strong> criterios de cómputo (días y remuneraciones) para transparencia.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>El reparto de utilidades refuerza el vínculo empresa–trabajador y, en 2025, se inserta en un entorno de <strong>fiscalización digital</strong>. Cumplir a tiempo, calcular correctamente y transparentar la información evita multas y mejora el clima laboral. Toda empresa con más de 20 trabajadores y utilidades debe repartirlas dentro de los <strong>30 días</strong> posteriores a su DJ Anual; los trabajadores, a su vez, deben conocer las reglas para verificar su cálculo.</p>
  `,
    projectUrl: "",
  },
  {
    slug: "transformacion-digital-facturador-electronico-y-sistemas-contables",
    title:
      "La transformación digital en el contexto de un facturador electrónico y los sistemas contables",
    author: {
      name: "Willy Huamali",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-20",
    shortDescription:
      "Cómo la transformación digital redefine la contabilidad y la facturación electrónica en el Perú: automatización, integración con SUNAT y eficiencia empresarial en 2025.",
    mainImage: "/images/noticias/noticia_24/mainImage.webp",
    categories: [Category.Tecnologia, Category.Contabilidad],
    content: `
    <p>
      La <strong>transformación digital</strong> implica integrar tecnologías digitales en todos los procesos empresariales
      para mejorar la eficiencia, la comunicación y la capacidad de adaptación. En el ámbito contable y tributario,
      el <strong>facturador electrónico</strong> y los <strong>sistemas contables digitales</strong> son los pilares
      de esta evolución, cambiando radicalmente cómo las empresas operan, gestionan y cumplen con la SUNAT.
    </p>

    <h3>1. Transformación digital = tecnología + cambio cultural + mejora continua</h3>
    <p>
      No se trata solo de usar software o computadoras, sino de transformar la cultura organizacional
      para adoptar herramientas digitales, automatizar tareas y tomar decisiones basadas en datos.
    </p>
    <ul>
      <li>Optimizar procesos y ahorrar recursos.</li>
      <li>Mejorar la experiencia del cliente y del usuario interno.</li>
      <li>Fomentar la innovación y la agilidad empresarial.</li>
      <li>Basar las decisiones en datos en tiempo real.</li>
      <li>Aumentar la competitividad y el cumplimiento regulatorio.</li>
    </ul>

    <h3>2. El facturador electrónico: eje de la modernización tributaria</h3>
    <p>
      El <strong>facturador electrónico</strong> no es un simple PDF: es un documento con <strong>validez legal y fiscal</strong>,
      estructurado en formatos como XML o JSON, firmado digitalmente y transmitido automáticamente a la <strong>SUNAT</strong> y al cliente.
    </p>

    <h4>Antes</h4>
    <ul>
      <li>Facturas físicas impresas y firmadas manualmente.</li>
      <li>Archivo físico de comprobantes.</li>
      <li>Reportes elaborados manualmente o en Excel.</li>
    </ul>

    <h4>Ahora</h4>
    <ul>
      <li>Facturas electrónicas generadas mediante software conectado a la SUNAT.</li>
      <li>Firma digital y almacenamiento seguro en la nube.</li>
      <li>Envío automático al cliente y a la SUNAT.</li>
      <li>Reducción de errores humanos y costos operativos.</li>
    </ul>

    <h3>3. Sistemas contables digitales: el cerebro financiero</h3>
    <p>
      Un sistema contable moderno ya no es un registro aislado, sino una <strong>plataforma integrada</strong>
      que centraliza la información financiera, se conecta con el facturador y genera análisis automáticos.
    </p>

    <h4>Antes</h4>
    <ul>
      <li>Ingreso manual de datos (ventas, compras, planillas, etc.).</li>
      <li>Reportes en hojas de cálculo y conciliaciones lentas.</li>
      <li>Sin conexión directa con facturación ni con SUNAT.</li>
    </ul>

    <h4>Ahora</h4>
    <ul>
      <li>Integración automática con el facturador electrónico.</li>
      <li>Balances, libros electrónicos y reportes en segundos.</li>
      <li>Análisis financiero en tiempo real.</li>
      <li>Cumplimiento automático con SUNAT (declaraciones y libros electrónicos).</li>
    </ul>

    <blockquote>
      <p>
        <em>La transformación digital contable y fiscal consiste en pasar de procesos manuales a sistemas electrónicos integrados,
        mejorando la eficiencia, el control y la transparencia.</em>
      </p>
    </blockquote>

    <h3>4. Beneficios clave de la transformación digital</h3>
    <ul>
      <li>Ahorro significativo de tiempo y costos operativos.</li>
      <li>Reducción de errores humanos en registros y declaraciones.</li>
      <li>Cumplimiento automático y trazabilidad total ante SUNAT.</li>
      <li>Acceso a información en tiempo real para decisiones estratégicas.</li>
      <li>Seguridad y respaldo digital de toda la información financiera.</li>
    </ul>

    <h3>5. Impacto estratégico para las empresas peruanas</h3>
    <p>
      En 2025, la transformación digital impulsada por la <strong>facturación electrónica</strong> y los
      <strong>sistemas contables integrados</strong> no es opcional, sino una <strong>necesidad estratégica</strong>
      para sobrevivir y competir. Ya no se trata solo de cumplir con la SUNAT, sino de reimaginar todo el
      <strong>ciclo financiero</strong> —desde la venta hasta el análisis contable— de forma automatizada, inteligente y ágil.
    </p>

    <h3>Conclusión</h3>
    <p>
      La transformación digital redefine el rol del contador y del empresario. Al adoptar facturadores electrónicos y
      sistemas contables integrados, las organizaciones ganan eficiencia, seguridad y visión estratégica. 
      La tecnología no reemplaza la contabilidad: la <strong>potencia</strong>, permitiendo que los profesionales se 
      enfoquen en el análisis, la planificación y la toma de decisiones informadas.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "igv-importaciones-peru-2025-calculo-pago-tratamiento-aduanero",
    title:
      "IGV de Importaciones en el Perú 2025: Todo lo que debes saber sobre su cálculo, pago y tratamiento aduanero",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-17",
    shortDescription:
      "Guía 2025 del IGV en importaciones: base legal, sujetos obligados, cómo se calcula y paga en Aduanas, uso como crédito fiscal, casos especiales y tres tablas prácticas.",
    mainImage: "/images/noticias/noticia_23/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      El <strong>IGV de importaciones</strong> garantiza neutralidad entre bienes locales y los que ingresan del exterior.
      En 2025, su correcta determinación y pago ante Aduanas es clave para evitar sanciones y aprovechar el
      <strong>crédito fiscal</strong> cuando corresponda. Esta guía resume el marco legal, el cálculo, el pago,
      los documentos sustentatorios y ofrece <strong>tres tablas prácticas</strong> para aplicar el procedimiento.
    </p>

    <h3>1) Base legal vigente</h3>
    <ul>
      <li><strong>TUO de la Ley del IGV e ISC</strong> (DS 055-99-EF) y modificatorias.</li>
      <li><strong>TUO de la Ley General de Aduanas</strong> (DS 010-2009-EF) y reglamentos.</li>
      <li><strong>Código Tributario</strong> (facultades de determinación, recaudación y sanción).</li>
      <li>Resoluciones de Superintendencia SUNAT (pagos, garantías, declaraciones anticipadas).</li>
      <li>Tasa del IGV 2025: <strong>18%</strong> (16% IGV + 2% IPM).</li>
    </ul>

    <h3>2) Hecho generador y sujetos obligados</h3>
    <p>
      La <strong>importación</strong> es un hecho imponible autónomo del IGV. Está obligado quien realiza el ingreso legal de
      mercancías para uso o consumo: <em>personas jurídicas</em> (actividad empresarial) y <em>personas naturales</em>
      (consumo propio u ocasional).
    </p>

    <h3>3) Determinación del IGV de importación</h3>
    <p>
      La base imponible es el <strong>Valor en Aduana (CIF)</strong> en soles, más <strong>derechos arancelarios</strong> y
      otros tributos que gravan la importación. El IGV se aplica sobre esa suma.
    </p>

    <h4>Tabla 1: Cálculo del IGV – Empresa (ejemplo)</h4>
    <table>
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Monto</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Valor FOB (USD)</td>
          <td>10,000.00</td>
          <td>Precio de compra</td>
        </tr>
        <tr>
          <td>Flete (USD)</td>
          <td>500.00</td>
          <td>Transporte internacional</td>
        </tr>
        <tr>
          <td>Seguro (USD)</td>
          <td>100.00</td>
          <td>Póliza internacional</td>
        </tr>
        <tr>
          <td>Valor CIF (USD)</td>
          <td>10,600.00</td>
          <td>FOB + flete + seguro</td>
        </tr>
        <tr>
          <td>Tipo de cambio (S/ por USD)</td>
          <td>3.80</td>
          <td>Publicación vigente</td>
        </tr>
        <tr>
          <td>Valor CIF (S/)</td>
          <td>40,280.00</td>
          <td>10,600 × 3.80</td>
        </tr>
        <tr>
          <td>Derechos arancelarios (6%)</td>
          <td>2,416.80</td>
          <td>6% de 40,280</td>
        </tr>
        <tr>
          <td><strong>Base imponible IGV</strong></td>
          <td><strong>42,696.80</strong></td>
          <td>CIF S/ + arancel</td>
        </tr>
        <tr>
          <td><strong>IGV (18%)</strong></td>
          <td><strong>7,685.42</strong></td>
          <td>18% de 42,696.80</td>
        </tr>
      </tbody>
    </table>

    <h4>Tabla 2: Cálculo del IGV – Persona natural (ejemplo)</h4>
    <table>
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Monto</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Valor CIF (USD)</td>
          <td>500.00</td>
          <td>Televisor para uso personal</td>
        </tr>
        <tr>
          <td>Derechos arancelarios</td>
          <td>0.00</td>
          <td>Exento por TLC</td>
        </tr>
        <tr>
          <td>Tipo de cambio (S/ por USD)</td>
          <td>3.80</td>
          <td>Publicación vigente</td>
        </tr>
        <tr>
          <td><strong>Base imponible IGV</strong></td>
          <td><strong>1,900.00</strong></td>
          <td>500 × 3.80</td>
        </tr>
        <tr>
          <td><strong>IGV (18%)</strong></td>
          <td><strong>342.00</strong></td>
          <td>18% de 1,900.00</td>
        </tr>
      </tbody>
    </table>

    <h3>4) Nacimiento de la obligación y pago</h3>
    <ul>
      <li><strong>Nace</strong> con la <strong>numeración de la DAM</strong> (o declaración anticipada con garantía).</li>
      <li><strong>Pago</strong> vía SPTA en bancos autorizados, débito en cuenta, compensación o con <em>garantías aduaneras</em> (despacho anticipado).</li>
      <li>El pago es requisito para el <strong>levante</strong> de la mercancía.</li>
    </ul>

    <h3>5) Crédito fiscal del IGV de importación</h3>
    <p>
      Para contribuyentes afectos al IGV, el impuesto pagado en la importación es <strong>crédito fiscal</strong> si:
      (i) está inscrito en RUC y afecto al IGV; (ii) los bienes se destinan a operaciones gravadas o mixtas;
      (iii) el IGV está pagado y <strong>anotado oportunamente</strong> en el Registro de Compras; (iv) se sustenta en la <strong>DAM</strong>.
    </p>

    <h4>Tabla 3: Tratamiento contable – Asientos típicos (empresa)</h4>
    <table>
      <thead>
        <tr>
          <th>Cuenta</th>
          <th>Descripción</th>
          <th>Debe (S/)</th>
          <th>Haber (S/)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>601</td>
          <td>Mercaderías (registro del CIF)</td>
          <td>40,280.00</td>
          <td></td>
        </tr>
        <tr>
          <td>4011</td>
          <td>IGV por pagar (importación)</td>
          <td>7,685.42</td>
          <td></td>
        </tr>
        <tr>
          <td>421</td>
          <td>Proveedores del exterior</td>
          <td></td>
          <td>47,965.42</td>
        </tr>
        <tr>
          <td>4011</td>
          <td>IGV por pagar (cancelación en Aduanas)</td>
          <td>7,685.42</td>
          <td></td>
        </tr>
        <tr>
          <td>104</td>
          <td>Banco</td>
          <td></td>
          <td>7,685.42</td>
        </tr>
        <tr>
          <td>4017</td>
          <td>Crédito fiscal IGV (reconocimiento)</td>
          <td>7,685.42</td>
          <td></td>
        </tr>
        <tr>
          <td>4011</td>
          <td>IGV por pagar</td>
          <td></td>
          <td>7,685.42</td>
        </tr>
      </tbody>
    </table>

    <h3>6) Exoneraciones y casos especiales</h3>
    <ul>
      <li>Donaciones al Estado o a entidades sin fines de lucro registradas.</li>
      <li>Régimen de <strong>importación temporal</strong> (suspensivo) con reexportación.</li>
      <li>Programas de bienes de capital (p. ej., DL 973, según vigencia/applicabilidad).</li>
      <li>Mercancías diplomáticas y menaje bajo regímenes especiales.</li>
    </ul>

    <h3>7) Garantías y fiscalización</h3>
    <p>
      Aduanas puede exigir <strong>garantías</strong> (carta fianza, póliza de caución) en despacho anticipado o por riesgo tributario.
      La SUNAT cruza DAM, RUC y Registro de Compras Electrónico; la subvaluación o errores de valor/origen generan ajustes,
      intereses y sanciones.
    </p>

    <h3>8) Sanciones por incumplimiento</h3>
    <ul>
      <li>Multas por tributo omitido e <strong>intereses moratorios</strong>.</li>
      <li>Inmovilización o comiso de mercancías en casos graves.</li>
      <li>Suspensión de despacho por reincidencia o riesgo.</li>
    </ul>

    <h3>9) Recomendaciones 2025</h3>
    <ul>
      <li>Determinar <strong>CIF</strong> correctamente (incoterms, flete y seguro) y tipo de cambio aplicable.</li>
      <li>Conservar y conciliar documentación: factura, contrato, BL/AWB, seguro, DAM y pagos.</li>
      <li>Registrar el IGV en el <strong>Registro de Compras Electrónico</strong> (SIRE/RCE) dentro del plazo legal.</li>
      <li>Evitar <strong>subvaluaciones</strong>; usar referencias válidas y soporte de precios.</li>
      <li>Trabajar con <strong>despachadores de aduana</strong> certificados y revisar arancel/TLC aplicables.</li>
      <li>Diferenciar importaciones personales vs. empresariales (solo estas últimas permiten crédito fiscal).</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      El IGV de importación asegura la equidad tributaria frente a bienes nacionales. Su gestión correcta —cálculo,
      pago, registro y sustento— evita contingencias y optimiza el <strong>crédito fiscal</strong> en empresas.
      En 2025, con mayor interoperabilidad SUNAT–Aduanas, la precisión documental es determinante para un
      comercio exterior <em>compliant</em> y competitivo.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "exoneraciones-inafectaciones-igv-peru-2025-renuncia-correcta",
    title:
      "Exoneraciones e Inafectaciones del IGV en el Perú: Lo que Debes Saber en 2025 y Cómo Renunciar a Ellas Correctamente",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-15",
    shortDescription:
      "Diferencias clave entre exoneración e inafectación del IGV, efectos prácticos en 2025 y paso a paso para renunciar a la exoneración ante SUNAT (Formulario 2225).",
    mainImage: "/images/noticias/noticia_22/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      El <strong>IGV</strong> grava ventas, servicios, contratos de construcción, primera venta de inmuebles e importaciones.
      Aun así, la ley prevé <strong>operaciones no gravadas</strong> por razones sociales y económicas:
      <em>inafectas</em> (fuera del ámbito del impuesto) y <em>exoneradas</em> (dentro del ámbito, pero liberadas de pago).
      En 2025, los contribuyentes pueden <strong>renunciar a la exoneración</strong> para acceder a crédito fiscal y cadenas formales.
    </p>

    <h3>1) Marco legal</h3>
    <ul>
      <li><strong>TUO de la Ley del IGV e ISC</strong> (DS 055-99-EF) y <strong>Reglamento</strong> (DS 029-94-EF).</li>
      <li>Apéndices I (bienes) y II (servicios) listan exoneraciones; leyes especiales (p. ej., Amazonía) otorgan beneficios sectoriales.</li>
    </ul>

    <h3>2) Inafectación vs. Exoneración</h3>
    <h4>2.1 Inafectas (art. 2 LIGV)</h4>
    <ul>
      <li>Fuera del ámbito del IGV (no hay hecho imponible).</li>
      <li>Ejemplos: reorganizaciones societarias, transferencias por causa de muerte, venta de usados entre no empresarios, servicios públicos del Estado.</li>
      <li>No generan débito ni crédito fiscal; <strong>no se puede renunciar</strong>.</li>
    </ul>
    <h4>2.2 Exoneradas (Apéndices I y II)</h4>
    <ul>
      <li>Hecho imponible existe, pero la ley libera el pago.</li>
      <li>Ejemplos: ciertos productos agropecuarios; servicios educativos, de salud, transporte público, culturales.</li>
      <li>No se traslada IGV ni se usa <strong>crédito fiscal</strong>; <strong>sí puede renunciarse</strong> cumpliendo requisitos.</li>
    </ul>

    <h3>3) Efectos tributarios de la exoneración</h3>
    <h4>Limitaciones</h4>
    <ul>
      <li>Sin derecho a crédito fiscal por compras.</li>
      <li>Comprobantes sin IGV y restricciones para recuperar IGV en exportación.</li>
    </ul>
    <h4>Beneficios</h4>
    <ul>
      <li>Precio final menor y simplificación para servicios esenciales o pequeños operadores.</li>
    </ul>

    <h3>4) ¿Por qué renunciar a la exoneración?</h3>
    <ul>
      <li>Acceder a <strong>crédito fiscal</strong> y mejorar márgenes.</li>
      <li>Competir en cadenas formales (proveeduría pública/privada) que exigen facturas con IGV.</li>
      <li>Facilitar <strong>exportación</strong> con devolución de IGV.</li>
    </ul>

    <h3>5) Procedimiento 2025 para renunciar (SUNAT)</h3>
    <ol>
      <li><strong>Paso 1:</strong> Presentar el <strong>Formulario 2225</strong> “Solicitud de autorización para renunciar a la exoneración del IGV” (en oficina o SOL). Indicar RUC, actividad exonerada y fecha de inicio.</li>
      <li><strong>Paso 2:</strong> SUNAT <strong>verifica</strong> que la actividad sea exonerada (no inafecta), cumplimiento tributario y datos del RUC.</li>
      <li><strong>Paso 3:</strong> Emite <strong>resolución de autorización</strong>. La afectación rige <strong>desde el mes siguiente</strong> a la aprobación.</li>
      <li><strong>Paso 4:</strong> Desde ese mes, <strong>emitir comprobantes con IGV</strong> y declarar/pagar mensualmente (PDT 621 o SOL). El crédito fiscal se usará por compras posteriores a la vigencia.</li>
    </ol>

    <h3>6) Efectos de la renuncia</h3>
    <ul>
      <li>El contribuyente queda afecto al IGV de forma <strong>indefinida</strong> (no reversible salvo nueva ley).</li>
      <li>Obligatorio llevar <strong>Registros electrónicos</strong> de Ventas y Compras y conservar sustentos por el plazo de prescripción.</li>
    </ul>

    <h3>7) Ejemplo práctico</h3>
    <p>
      Una institución de <strong>capacitación técnica</strong> (servicio exonerado Apéndice II) solicita renunciar en mayo de 2025 vía F.2225.
      SUNAT autoriza en junio; desde el <strong>1/7/2025</strong> emite facturas con IGV (18%) y, en agosto, compensa el IGV de compras de julio como crédito.
    </p>

    <h3>8) Sanciones y obligaciones</h3>
    <ul>
      <li>Multas por no declarar (art. 176 CT) o no emitir comprobantes (art. 174 CT), intereses moratorios, medidas de cobranza.</li>
      <li>Mantener <strong>contabilidad electrónica al día</strong> y coherencia documental para fiscalización.</li>
    </ul>

    <h3>9) Recomendaciones 2025</h3>
    <ul>
      <li>Realizar un <strong>análisis financiero</strong> previo: impacto de precios, demanda y flujo de caja al trasladar IGV.</li>
      <li>Verificar si la actividad es <strong>exonerada</strong> (renunciable) y no <strong>inafecta</strong> (no renunciable).</li>
      <li>Sincronizar la renuncia con <strong>inversiones</strong> para maximizar crédito fiscal inicial.</li>
      <li>Atender regímenes especiales (p. ej., Amazonía) donde el efecto puede variar.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      Distinguir <strong>inafectación</strong> de <strong>exoneración</strong> evita errores de cumplimiento. 
      La <strong>renuncia</strong> al IGV, tramitada con el F.2225 y una adecuada planificación, 
      permite integrar al contribuyente en cadenas formales y aprovechar el <strong>crédito fiscal</strong>. 
      En 2025, la digitalización de SUNAT simplifica el proceso, pero exige disciplina contable y evaluación económica previa.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "el-sistema-de-detracciones-del-igv-en-peru-2025-guia-completa-novedades-y-retos",
    title:
      "El sistema de detracciones del IGV en Perú (2025): guía completa, novedades y retos para los contribuyentes",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-14",
    shortDescription:
      "Cómo funciona el SPOT de detracciones: sujetos obligados, porcentajes, plazos de depósito, sanciones, liberación de fondos y cambios clave 2025 (especial atención a sector minero).",
    mainImage: "/images/noticias/noticia_21/mainImage.webp",
    categories: [Category.Tributacion, Category.Contabilidad],
    content: `
    <p>
      El <strong>sistema de detracciones del IGV (SPOT)</strong> obliga al adquirente o usuario de ciertos bienes y servicios
      a detraer un porcentaje del valor de la operación y depositarlo en una cuenta del Banco de la Nación a nombre del proveedor.
      Con ello, se asegura el pago de tributos y se ordena el uso del crédito fiscal.
    </p>

    <h3>1. ¿Qué es y para qué sirve?</h3>
    <p>
      Es un mecanismo de <em>retención/depósito</em> que:
    </p>
    <ul>
      <li><strong>Asegura recaudación</strong> al inmovilizar parte del pago para obligaciones con SUNAT.</li>
      <li><strong>Controla el crédito fiscal</strong>: el adquirente solo lo usa si la detracción se efectuó.</li>
      <li><strong>Incentiva cumplimiento</strong> del proveedor al vincular fondos con sus deudas tributarias.</li>
    </ul>
    <p>Solo aplica a operaciones listadas en anexos de la normativa vigente.</p>

    <h3>2. Ámbito de aplicación</h3>
    <h4>2.1 Operaciones típicas sujetas</h4>
    <ul>
      <li>Venta interna de bienes y ciertos <strong>retiros/traslados</strong> de bienes.</li>
      <li><strong>Servicios gravados</strong> (incluye varios servicios empresariales) y <strong>contratos de construcción</strong>.</li>
      <li>Transporte de bienes por vía terrestre y, en supuestos específicos, transporte público terrestre de pasajeros.</li>
      <li>Operaciones alcanzadas por el <strong>IVAP</strong> (arroz pilado).</li>
    </ul>
    <h4>2.2 Umbrales y excepciones</h4>
    <ul>
      <li>Para varios bienes del Anexo 2, operaciones ≤ <strong>S/ 700</strong> no detraen.</li>
      <li>Excepciones por tipo de comprobante, montos, naturaleza del servicio, u operaciones con no domiciliados, entre otras.</li>
    </ul>

    <h3>3. ¿Quién debe detraer?</h3>
    <ul>
      <li><strong>Adquirente/usuario</strong> del bien o servicio (regla general).</li>
      <li><strong>Proveedor</strong>, si recibe el íntegro o en supuestos específicos.</li>
      <li>En <strong>retiro/traslado</strong> de bienes, el propietario/encargado.</li>
      <li>En <strong>transporte</strong>, según el caso: usuario, proveedor o transportista.</li>
    </ul>

    <h3>4. Momento del depósito</h3>
    <ul>
      <li><strong>Bienes/traslados:</strong> antes del retiro o según comprobante; en general, hasta el <em>5.º día hábil</em> siguiente cuando paga íntegro el proveedor.</li>
      <li><strong>Servicios y construcción:</strong> el usuario deposita al <em>pago (parcial/total)</em> o <em>anotación en Registro de Compras</em> (lo que ocurra primero). El proveedor, dentro del <em>5.º día hábil</em> de recibir el íntegro.</li>
      <li><strong>Transporte terrestre:</strong> al pago o dentro del 5.º día hábil siguiente, según quién sea el obligado.</li>
      <li><strong>IVAP:</strong> antes del retiro del molino/almacén en la primera venta.</li>
    </ul>

    <h3>5. Porcentajes de detracción (referenciales por anexos)</h3>
    <ul>
      <li><strong>Anexo 1 – bienes</strong> (p.e. azúcar, minerales): típicamente <strong>10%</strong>.</li>
      <li><strong>Anexo 2 – bienes específicos</strong> (recursos hidrobiológicos, maíz amarillo, madera, arena/piedra):
        <strong>4%–10%</strong> según bien; bienes exonerados con renta de 3.ª: <strong>1.5%</strong>.</li>
      <li><strong>Anexo 3 – servicios/contratos</strong>:
        servicios empresariales y varios: <strong>12%</strong>; arrendamiento/comisión: <strong>10%</strong>;
        construcción: <strong>4%</strong>.</li>
    </ul>
    <p><em>Tip:</em> verifique siempre la versión vigente de anexos y porcentajes.</p>

    <h3>6. Sanciones por incumplimiento</h3>
    <table>
      <thead><tr><th>Infracción</th><th>Sanción referencial</th></tr></thead>
      <tbody>
        <tr><td>No depositar íntegra y oportunamente</td><td>Multa del <strong>50%</strong> del importe no depositado</td></tr>
        <tr><td>Trasladar bienes cuando el depósito era previo</td><td><strong>50%</strong> del monto que debió depositarse</td></tr>
        <tr><td>Usar indebidamente fondos de la cuenta</td><td><strong>100%</strong> del importe indebidamente usado</td></tr>
      </tbody>
    </table>
    <p>
      Aplica <strong>gradualidad</strong> si se subsana (p.e. depósitos dentro de plazos adicionales).
      SUNAT puede ejercer <em>discrecionalidad</em> en fases de implementación de nuevas reglas.
    </p>

    <h3>7. Libre disposición de fondos</h3>
    <h4>7.1 Procedimiento general (trimestral)</h4>
    <ul>
      <li>Solicitar en los <strong>primeros 5 días hábiles</strong> de enero, abril, julio u octubre.</li>
      <li>Sin deudas exigibles, <em>domicilio habido</em>, libros/regs. al día, sin infracciones críticas recientes.</li>
    </ul>
    <h4>7.2 Procedimiento especial (Anexos 1 y 2)</h4>
    <ul>
      <li>Hasta <strong>dos solicitudes al mes</strong> (primeros 3 días hábiles de cada quincena).</li>
      <li>Se libera el saldo acumulado hasta el cierre de la quincena anterior.</li>
    </ul>

    <h3>8. Novedades 2025 (sector minero)</h3>
    <ul>
      <li><strong>RS 086-2025/SUNAT</strong>: ajustes del SPOT para bienes mineros metálicos (desde <strong>1/4/2025</strong>).</li>
      <li><strong>Exclusiones</strong> del SPOT para traslados de minerales (oro y no auríferos) fuera del centro de producción o desde zonas con beneficios, bajo condiciones (Cap. 26, minerales sin procesar).</li>
      <li><strong>RS 121-2025/SUNAT</strong>: esas exclusiones <em>no aplican</em> si el traslado proviene de una venta gravada.</li>
      <li><strong>RS 175-2025/SUNAT</strong>: precisiones complementarias sobre los supuestos de exclusión.</li>
      <li><strong>Transición</strong>: primeros <strong>60 días</strong> sin sanciones por las nuevas reglas en operaciones sujetas al SPOT.</li>
    </ul>

    <h3>9. Caso práctico</h3>
    <p>
      <strong>Servicio empresarial</strong> por S/ 38,000 + IGV (18%). Total: S/ 44,840. Anexo 3 → <strong>12%</strong> de detracción.
    </p>
    <ul>
      <li>Detracción: 44,840 × 12% = <strong>S/ 5,380.80</strong>.</li>
      <li>El usuario deposita al pagar o antes de anotar en el Registro de Compras.</li>
      <li>El usuario podrá usar el <strong>crédito fiscal</strong> si acredita el depósito.</li>
    </ul>

    <h3>10. Retos y recomendaciones</h3>
    <h4>Retos</h4>
    <ul>
      <li><strong>Complejidad</strong> de anexos, umbrales y excepciones.</li>
      <li><strong>Cambios frecuentes</strong> (p.e. minería 2025).</li>
      <li><strong>Gestión de caja</strong>: inmovilización de fondos en la cuenta.</li>
    </ul>
    <h4>Recomendaciones</h4>
    <ul>
      <li>Actualizarse con las <strong>RS vigentes</strong> y revisar anexos antes de facturar/cotizar.</li>
      <li>Llevar <strong>control fino</strong> de depósitos, uso de fondos y solicitudes de libre disposición.</li>
      <li>Modelar <strong>flujo de caja</strong> considerando el % de detracción.</li>
      <li>Usar <strong>herramientas electrónicas</strong> de SUNAT y buena trazabilidad documental.</li>
      <li>Buscar <strong>asesoría</strong> contable/tributaria para operaciones complejas (minería, construcción, transporte).</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      El SPOT de detracciones es clave para el control del IGV. Su correcta aplicación exige identificar el tipo de operación,
      confirmar el porcentaje y <strong>depositar oportunamente</strong>. En 2025 destacan cambios en traslados de minerales:
      revisar exclusiones y condiciones para evitar sanciones. Una gestión rigurosa (depósitos, crédito fiscal, liberaciones y
      seguimiento normativo) protege la caja y reduce riesgos tributarios.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "tributos-leyes-y-justicia-fiscal-panorama-del-derecho-tributario-en-el-peru-2025",
    title:
      "Tributos, Leyes y Justicia Fiscal: Panorama del Derecho Tributario en el Perú 2025",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-06",
    shortDescription:
      "Guía clara del derecho tributario peruano en 2025: principios, fuentes, SUNAT, obligación tributaria, fiscalización, sanciones y los cambios normativos más recientes.",
    mainImage: "/images/noticias/noticia_04/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      El derecho tributario es pilar de la financiación del Estado y del contrato social entre ciudadanos y gobierno.
      En el Perú, su importancia se intensifica por la necesidad de financiar servicios públicos y, a la vez,
      promover formalización, inversión y crecimiento. Este artículo explica su fundamento teórico y aplicación práctica en 2025.
    </p>

    <h3>1. Concepto y objeto del derecho tributario</h3>
    <p>
      El derecho tributario regula la creación, aplicación y extinción de los tributos, así como la relación entre
      la Administración Tributaria y los contribuyentes. Define <em>cuándo</em>, <em>cómo</em>, <em>quién</em> y
      <em>cuánto</em> se paga, bajo qué procedimientos y con qué consecuencias por el incumplimiento.
    </p>
    <ul>
      <li>Recaudar recursos para funciones públicas.</li>
      <li>Lograr equidad y progresividad según capacidad contributiva.</li>
      <li>Brindar certeza y seguridad jurídica.</li>
      <li>Equilibrar recaudación con competitividad e inversión.</li>
      <li>Regular derechos y obligaciones de contribuyentes y Administración.</li>
    </ul>

    <h3>2. Principios del derecho tributario</h3>
    <p>
      Principios-guía con respaldo constitucional, legal y jurisprudencial: 
      <strong>legalidad</strong> (reserva de ley), <strong>irretroactividad</strong>, 
      <strong>generalidad e igualdad</strong>, <strong>capacidad contributiva</strong>, 
      <strong>proporcionalidad</strong>, <strong>seguridad jurídica</strong>, 
      <strong>transparencia</strong>, <strong>eficacia recaudatoria</strong> y 
      <strong>no confiscatoriedad</strong>.
    </p>

    <h3>3. Fuentes del derecho tributario peruano</h3>
    <ul>
      <li><strong>Constitución Política</strong>: norma suprema y principios tributarios.</li>
      <li><strong>Leyes</strong> y <strong>decretos legislativos</strong> delegados.</li>
      <li><strong>Decretos supremos reglamentarios</strong> (aplicación de la ley).</li>
      <li><strong>Resoluciones de SUNAT</strong> y normas de entidades competentes.</li>
      <li><strong>Tratados</strong> (doble imposición, intercambio de información).</li>
      <li><strong>Jurisprudencia, doctrina e interpretación administrativa</strong> como referentes.</li>
    </ul>

    <h3>4. Sistema tributario peruano: estructura y actores</h3>
    <p>
      Conjunto de tributos <strong>nacionales</strong> (IR, IGV, ISC, entre otros) administrados por <strong>SUNAT</strong>,
      y tributos <strong>regionales y locales</strong> (predial, vehicular, arbitrios). El MEF diseña la política,
      el Congreso legisla, y el <strong>Tribunal Fiscal</strong> resuelve controversias. El contribuyente tiene
      derechos (debido proceso, defensa, confidencialidad) y obligaciones (declarar, pagar, informar).
    </p>

    <h3>5. Obligación tributaria y elementos esenciales</h3>
    <ul>
      <li><strong>Sujeto activo:</strong> Estado (SUNAT u otra entidad).</li>
      <li><strong>Sujeto pasivo:</strong> contribuyente (persona natural o jurídica).</li>
      <li><strong>Hecho imponible</strong>, <strong>base imponible</strong> y <strong>tasa</strong>.</li>
      <li><strong>Periodo</strong> y <strong>exigibilidad</strong>.</li>
      <li><strong>Forma y lugar</strong> de declaración y pago.</li>
      <li><strong>Extinción</strong>: pago, compensación, prescripción, condonación, entre otros.</li>
    </ul>
    <p>
      El ciclo tributario comprende gestación, determinación, declaración, pago, fiscalización, sanción/corrección y extinción.
      Además, existen <strong>obligaciones formales</strong> (libros y registros, emisión de comprobantes, declaraciones
      informativas, RUC, conservación de documentos y, en 2025, declaración de beneficiario final).
    </p>

    <h3>6. Administración, fiscalización y sanciones</h3>
    <p>
      La SUNAT cuenta con facultades de determinación, fiscalización, sanción, ejecución coactiva y control formal,
      siempre bajo debido proceso y respeto a derechos fundamentales. Procedimientos clave:
    </p>
    <ul>
      <li><strong>Fiscalización</strong> parcial o completa (incluye expedientes electrónicos en aduanas vía SIEV).</li>
      <li><strong>Determinación de oficio</strong> por omisiones o errores.</li>
      <li><strong>Impugnaciones</strong> y apelación al <strong>Tribunal Fiscal</strong>.</li>
      <li><strong>Ejecución coactiva</strong> ante falta de pago; <strong>fraccionamientos</strong> especiales vigentes.</li>
      <li><strong>Régimen sancionador</strong> con criterios de gradualidad y proporcionalidad.</li>
    </ul>

    <h3>7. Cambios normativos destacados al 2025</h3>
    <h4>7.1 IR, IGV, ISC y obligaciones formales</h4>
    <ul>
      <li>Ajustes al Reglamento del IR (uso de fondos de financiamiento).</li>
      <li>Propuesta de elevar el mínimo inafecto del <em>ITAN</em>.</li>
      <li>Revisión del régimen sancionador con énfasis en <em>pymes</em> y gradualidad.</li>
      <li>Régimen de retenciones para servicios de cabotaje de no domiciliados.</li>
    </ul>
    <h4>7.2 Declaración de Beneficiario Final</h4>
    <p>
      Ampliación de obligados mediante <strong>RS 168-2025/SUNAT</strong>, complementando RS 185-2019/SUNAT y RS 041-2022/SUNAT, 
      para mayor transparencia y lucha contra evasión y lavado.
    </p>
    <h4>7.3 SPOT y minerales</h4>
    <p>
      <strong>RS 000175-2025/SUNAT</strong> excluye del SPOT traslados de minerales sin operación gravada con IGV.
    </p>
    <h4>7.4 Fraccionamiento especial de deudas</h4>
    <p>
      <strong>DL 1634</strong> regula fraccionamiento especial; la <strong>Ley 32220</strong> discute el plazo de acogimiento
      con independencia de la modalidad de pago.
    </p>
    <h4>7.5 Incentivos y TUO actualizado</h4>
    <ul>
      <li>Actualización del <strong>TUO del Código Tributario</strong>.</li>
      <li><strong>DS 133-2025-EF</strong>: entidades exceptuadas de percepción de IGV.</li>
      <li><strong>Nueva Ley General de Turismo</strong> (junio 2025): incentivos sectoriales.</li>
      <li><strong>Ley 32201</strong> (junio 2025): régimen excepcional de IR para formalización de rentas no declaradas hasta 31/12/2022.</li>
    </ul>
    <h4>7.6 Gradualidad y otras reglas</h4>
    <p>
      <strong>RS 000300-2024/SUNAT</strong> (documentos de transporte y remisión) y 
      <strong>RS 000007-2025/SUNAT</strong> (gradualidad) apuntan a sanciones más proporcionales.
    </p>

    <h3>8. Retos y perspectivas</h3>
    <ul>
      <li><strong>Formalización</strong> de la economía informal sin cargas excesivas.</li>
      <li><strong>Equilibrio</strong> entre recaudación y competitividad.</li>
      <li><strong>Transformación digital</strong> y expansión del expediente/comprobante electrónico.</li>
      <li><strong>Evasión y elusión</strong>: beneficiario final, intercambio de información, normas antiabuso.</li>
      <li><strong>Actualización normativa</strong> frente a comercio digital y criptoactivos.</li>
      <li><strong>Justicia tributaria</strong>: transparencia, participación, confianza institucional.</li>
      <li><strong>Coordinación intergubernamental</strong> para armonizar tributos nacionales y locales.</li>
      <li><strong>Capacidad institucional</strong> (talento y tecnología) en SUNAT, MEF y gobiernos subnacionales.</li>
    </ul>

    <h3>9. Conclusiones</h3>
    <p>
      El Perú transita hacia un sistema más moderno, proporcional y transparente. 
      Las reformas 2024–2025 muestran vocación por la gradualidad sancionadora, 
      la transparencia (beneficiario final), mecanismos de regularización de deudas e incentivos sectoriales,
      sin descuidar la certeza jurídica. Persisten desafíos estructurales como la informalidad y la
      lucha contra evasión y elusión, que exigen coordinación, tecnología y reglas claras.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "nuevo-plazo-maximo-atraso-libros-pdt-0625-2025",
    title:
      "Nuevo plazo máximo de atraso de registro de libros vinculados al PDT – Formulario Virtual N° 0625",
    author: {
      name: "Monica Romero",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-02",
    shortDescription:
      "Desde el 01/08/2025 rige un nuevo plazo máximo de atraso para el Libro de Inventarios y Balances, Libro Diario (y simplificado) y Libro Mayor cuando se presenta el PDT–FV N.º 0625.",
    mainImage: "/images/noticias/noticia_05/mainImage.webp",
    categories: [Category.Tributacion, Category.Contabilidad],
    content: `
    <p>
      A partir del <strong>1 de agosto de 2025</strong> se modificó el <strong>plazo máximo de atraso</strong> del registro de los
      <em>libros vinculados</em> a la presentación del <strong>PDT – Formulario Virtual N.º 0625</strong>, declaración jurada que
      contiene el estado de ganancias y pérdidas al 30 de abril y/o al 31 de julio y que permite <em>modificar o suspender</em>
      los pagos a cuenta del Impuesto a la Renta.
    </p>

    <h3>¿A quiénes alcanza?</h3>
    <p>
      A los contribuyentes que presenten el PDT – FV N.º 0625 para modificar o suspender sus pagos a cuenta del IR. 
      Para estos casos, se actualiza el límite de atraso permitido en los libros que respaldan dicha información.
    </p>

    <h3>Libros comprendidos</h3>
    <ul>
      <li><strong>Libro de Inventarios y Balances.</strong></li>
      <li><strong>Libro Diario</strong> y <strong>Libro Diario en formato simplificado</strong>.</li>
      <li><strong>Libro Mayor.</strong></li>
    </ul>

    <h3>Objetivo de la medida</h3>
    <ul>
      <li>Propiciar la <strong>correcta determinación</strong> de los pagos a cuenta del Impuesto a la Renta.</li>
      <li><strong>Facilitar la verificación</strong> de la información anotada en los libros vinculados a la declaración.</li>
      <li>Adecuar la normativa sobre el <strong>envío del resumen</strong> del Libro de Inventarios y Balances.</li>
    </ul>

    <h3>Plazos de atraso (cuadro referencial)</h3>
    <p>
      La RS N.º 000257-2025/SUNAT establece los nuevos plazos de atraso para los libros vinculados a la presentación del PDT 0625.
      A continuación, un cuadro referencial tomado de la fuente indicada:
    </p>
    <figure>
      <img src="https://revistadeconsultoria.com/wp-content/uploads/2025/10/Screenshot_1.jpg" alt="Plazos de atraso para libros vinculados al PDT 0625" />
      <figcaption>(*) RS N.º 000257-2025/SUNAT. (**) Según Anexo 2 de la RS N.º 234-2006/SUNAT.</figcaption>
    </figure>

    <h3>Notas importantes</h3>
    <ul>
      <li>El atraso permitido se refiere al <em>límite máximo</em> para registrar operaciones en los libros indicados.</li>
      <li>La consistencia entre la información del PDT 0625 y los libros es clave para evitar observaciones en fiscalización.</li>
      <li>Los contribuyentes obligados al llevado electrónico deben considerar además los plazos y validaciones del PLE.</li>
    </ul>

    <h3>Base legal</h3>
    <ul>
      <li>
        <a href="https://www.sunat.gob.pe/legislacion/superin/2006/234.htm" target="_blank" rel="noopener">Resolución de Superintendencia Nº 234-2006/SUNAT</a> – Establece normas de libros y registros vinculados a asuntos tributarios (30.12.2006).
      </li>
      <li>
        <a href="https://www.sunat.gob.pe/legislacion/superin/2009/286-09.pdf" target="_blank" rel="noopener">Resolución de Superintendencia Nº 286-2009/SUNAT</a> – Implementa el llevado de determinados libros y registros vinculados a asuntos tributarios (31.12.2009).
      </li>
      <li>
        <a href="https://www.sunat.gob.pe/legislacion/superin/2010/196-10.pdf" target="_blank" rel="noopener">Resolución de Superintendencia Nº 196-2010/SUNAT</a> – Modifica la RS Nº 286-2009/SUNAT para facilitar el acceso al sistema electrónico (27.07.2010).
      </li>
      <li>
        <a href="https://www.sunat.gob.pe/legislacion/superin/2025/000257-2025.pdf" target="_blank" rel="noopener">Resolución de Superintendencia Nº 000257-2025/SUNAT</a> – Modifica el plazo máximo de atraso de determinados libros vinculados a asuntos tributarios para casos de PDT – FV N.º 0625 (31.07.2025).
      </li>
    </ul>

    <h3>Recomendaciones prácticas</h3>
    <ul>
      <li>Alinear calendarios contables para <strong>cerrar y registrar</strong> dentro del nuevo límite.</li>
      <li>Verificar que el <strong>estado de resultados</strong> del PDT 0625 tenga sustento contable en libros.</li>
      <li>Mantener control de versiones y respaldos del PLE y constancias de envío/validación.</li>
      <li>Monitorear posibles <strong>criterios de gradualidad</strong> aplicables ante eventuales infracciones.</li>
    </ul>
  `,
    projectUrl: "",
  },
  {
    slug: "elusion-tributaria-peru-2025",
    title:
      "Elusión tributaria en el Perú (2025): mecanismos, normas vigentes y retos para su control",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-02",
    shortDescription:
      "La elusión tributaria opera en el límite de la ley: aprovecha vacíos e interpretaciones para reducir impuestos. En Perú, la Norma XVI y el DS 145-2019-EF buscan frenarla con enfoque en la sustancia económica.",
    mainImage: "/images/noticias/noticia_01/mainImage.webp",
    categories: [Category.Economia, Category.Tributacion],
    content: `
    <p>
      La elusión tributaria afecta la equidad del sistema fiscal y la sostenibilidad de la recaudación. 
      A diferencia de la evasión —que quebranta la ley mediante ocultamiento u omisión deliberada—, 
      la elusión opera en el límite legal aprovechando vacíos, ambigüedades o estructuras permitidas 
      para reducir la carga fiscal. El MEF ha señalado que la elusión constituye una forma indirecta de 
      violar la legislación tributaria y ha impulsado normas antielusivas como la <strong>Norma XVI</strong> del Código Tributario.
    </p>

    <h3>1. Concepto y diferencias clave</h3>
    <p>
      <strong>Evasión:</strong> ilícita; falsea u oculta información y se sanciona administrativa o penalmente.<br>
      <strong>Elusión:</strong> usa artificios legales (o semilegales) para disminuir el impuesto sin violar 
      literalmente la norma, pero desconociendo su finalidad.<br>
      <strong>Economía de opción:</strong> planificación fiscal legítima cuando la ley ofrece opciones claras y 
      se elige una sin artificios ni abuso.
    </p>
    <p>
      La línea entre economía de opción y elusión depende de la <em>sustancia económica</em>: 
      si una estructura carece de contenido real o su único fin es el ahorro tributario, puede calificarse como elusiva.
    </p>

    <h3>2. Marco legal peruano vigente (2025)</h3>
    <h4>2.1 Norma XVI del Código Tributario</h4>
    <p>
      Faculta a la SUNAT a prescindir de formas jurídicas que no guarden sustancia económica y a 
      determinar los tributos según la <em>verdadera naturaleza</em> del hecho imponible.
    </p>
    <h4>2.1.1 Parámetros de fondo y forma (DS 145-2019-EF)</h4>
    <ul>
      <li>Identifica supuestos elusivos: operaciones de baja rentabilidad no alineadas a mercado; 
          reorganizaciones sin sustancia; esquemas contractuales inusuales que difieren o anticipan resultados.</li>
      <li>Incluye garantías procedimentales y la opinión previa de un <strong>Comité Revisor</strong> para evitar arbitrariedades.</li>
    </ul>
    <h4>2.2 Transparencia financiera e intercambio de información</h4>
    <ul>
      <li>Obligaciones de reporte por parte del sistema financiero para cruces de datos.</li>
      <li>Acuerdos y convenios internacionales que permiten obtener información sobre operaciones y activos en el exterior.</li>
    </ul>
    <h4>2.3 Gasto tributario e incentivos</h4>
    <p>
      Los <em>gastos tributarios</em> (exoneraciones, deducciones, regímenes especiales) reducen la recaudación efectiva; 
      si están mal diseñados o controlados, pueden incentivar estrategias elusivas.
    </p>
    <h4>2.4 Planes y metas institucionales</h4>
    <p>
      La agenda 2024-2027 exige elevar la presión tributaria y reducir incumplimientos, 
      lo que implica mejorar la eficacia de la fiscalización de conductas elusivas.
    </p>

    <h3>3. Señales típicas de elusión</h3>
    <ul>
      <li>Precios de transferencia intragrupo apartados del valor de mercado.</li>
      <li>Reestructuraciones societarias sin cambios reales en funciones, activos o riesgos.</li>
      <li>Uso de entidades en jurisdicciones de baja o nula tributación sin empleados ni oficinas.</li>
      <li>Contratos complejos sin justificación económica (solo efectos fiscales).</li>
      <li>Anticipación de gastos o pérdidas no sustentadas para compensar utilidades.</li>
    </ul>

    <h3>4. Herramientas institucionales</h3>
    <ul>
      <li><strong>Comité Revisor:</strong> salvaguarda técnica previa a la aplicación de la Norma XVI.</li>
      <li><strong>Fiscalización especializada:</strong> equipos con competencias en finanzas internacionales, 
          contabilidad y análisis económico.</li>
      <li><strong>Big Data y cruces de información:</strong> datos bancarios, operaciones transfronterizas 
          y movimientos intragrupo para detectar incongruencias.</li>
      <li><strong>Coordinación internacional:</strong> convenios de intercambio de información y 
          renegociación de tratados para prevenir elusión y evasión.</li>
      <li><strong>Responsabilidad de asesores:</strong> consideración de sanciones a quienes diseñen esquemas abusivos.</li>
    </ul>

    <h3>5. Retos, limitaciones y riesgos</h3>
    <ul>
      <li><strong>Ambigüedad normativa:</strong> riesgo de decisiones subjetivas e inseguridad jurídica.</li>
      <li><strong>Carga probatoria:</strong> demostrar artificio o falta de sustancia exige evidencia extensa y análisis comparables.</li>
      <li><strong>Capacidades operativas:</strong> necesidad de tecnología y talento especializado para casos complejos.</li>
      <li><strong>Coordinación internacional:</strong> tiempos y restricciones procedimentales pueden ralentizar casos.</li>
      <li><strong>Incentivos mal diseñados:</strong> potenciales vehículos de elusión si no se controlan.</li>
    </ul>

    <h3>6. Ejemplos ilustrativos (contexto peruano)</h3>
    <h4>6.1 Servicios interempresariales sin sustento</h4>
    <p>
      Facturación de “asesorías” intragrupo a precios elevados sin informes, personal asignado ni evidencias: 
      la SUNAT puede recalificar como distribución encubierta de utilidades y exigir la tributación correspondiente.
    </p>
    <h4>6.2 Sociedad interpuesta en paraíso fiscal</h4>
    <p>
      Entidad sin sustancia (sin empleados/oficinas) que capta ingresos del negocio real: 
      la administración puede desestimar a la interpuesta y atribuir los resultados al contribuyente peruano.
    </p>
    <h4>6.3 Reorganización societaria sospechosa</h4>
    <p>
      Transferencias intragrupo que no cambian la actividad ni generan sinergias: 
      pueden considerarse artificiosas si su único efecto es diferir o reducir impuestos.
    </p>
    <h4>6.4 Abuso de incentivos o exoneraciones</h4>
    <p>
      Extender indebidamente un régimen especial a operaciones no elegibles mediante contratos complejos o subsidiarias.
    </p>

    <h3>7. Recomendaciones para mayor eficacia</h3>
    <ul>
      <li><strong>Criterios objetivos mínimos:</strong> umbrales de precios, pruebas de sustancia y comparables internacionales que activen revisión.</li>
      <li><strong>Transparencia:</strong> motivación técnica pública de casos complejos para fortalecer la seguridad jurídica.</li>
      <li><strong>Capacitación y especialización:</strong> equipos SUNAT en precios de transferencia, valoración y fiscalidad internacional.</li>
      <li><strong>Agilidad internacional:</strong> mejorar plazos y mecanismos de intercambio de información.</li>
      <li><strong>Responsabilidad de asesores:</strong> sanciones proporcionales por diseño de estructuras abusivas.</li>
      <li><strong>Consultas vinculantes preventivas:</strong> canal oficial para esquemas complejos que otorgue certidumbre previa.</li>
      <li><strong>Revisión de incentivos:</strong> evaluación periódica para evitar distorsiones y usos elusivos.</li>
      <li><strong>Justicia especializada:</strong> salas con pericia tributaria para resoluciones consistentes y oportunas.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      El Perú cuenta con un marco antielusivo que prioriza la sustancia por sobre la forma. 
      El desafío es aplicarlo con técnica, proporcionalidad y transparencia, 
      cerrando espacios a la conducta abusiva sin penalizar la planificación legítima. 
      Fortalecer capacidades, clarificar criterios y ofrecer certidumbre son los pilares para un sistema más justo y eficaz.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "tecnologia-de-la-informacion-fracaso-implementacion-erp-2025",
    title: "Tecnología de la información: fracaso al implementar software ERP",
    author: {
      name: "Roberto Maldonado Ortega",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-10-01",
    shortDescription:
      "Más del 50 % de las empresas experimentan interrupciones al implementar un ERP. Este artículo identifica los errores más comunes y propone soluciones prácticas para evitar el fracaso.",
    mainImage: "/images/noticias/noticia_06/mainImage.webp",
    categories: [Category.Tecnologia, Category.Finanzas],
    content: `
    <p>
      Implementar un sistema ERP puede ser una de las decisiones más transformadoras —y desafiantes— para cualquier empresa. 
      Según un estudio de 2024, más del <strong>50 %</strong> de las compañías sufre interrupciones o pérdida de productividad durante la adopción del nuevo sistema. 
      Sin embargo, con una planificación adecuada, estos problemas pueden prevenirse.
    </p>

    <h3>1. Un proceso que exige compromiso total</h3>
    <p>
      Los beneficios a largo plazo superan ampliamente los obstáculos: automatización, eficiencia, comunicación interna optimizada y una gestión integral. 
      Pero la implantación es un proceso <em>delicado</em> que requiere la implicación de toda la organización y una gestión del cambio progresiva.
    </p>

    <h3>2. Principales errores en la implementación de un ERP</h3>
    <h4>Falta de claridad en los requerimientos</h4>
    <p>
      Escoger un ERP sin analizar a fondo las necesidades de la empresa es uno de los mayores errores. 
      Se debe elaborar un listado detallado de requerimientos actuales y futuros, y comparar proveedores mediante metodologías como <strong>RFI/RFP</strong>. 
      La selección debe ser estratégica, no impulsiva.
    </p>

    <h4>Mala planificación del proyecto</h4>
    <p>
      Un ERP exitoso exige un plan detallado con cronograma, responsables y fases. 
      La falta de planificación genera interrupciones y pérdidas de productividad. 
      El análisis de procesos, riesgos y estructura organizativa debe preceder a cualquier implementación.
    </p>

    <h4>Débil liderazgo e implicación</h4>
    <p>
      El <strong>CEO</strong> debe liderar el cambio y contar con el apoyo de directivos departamentales. 
      La comunicación clara y el compromiso de todos los niveles jerárquicos son esenciales. 
      La resistencia interna o la falta de liderazgo suele ser una causa directa de fracaso.
    </p>

    <h4>Ausencia de entorno de pruebas</h4>
    <p>
      Lanzar el ERP sin pruebas reales es un error crítico. 
      Se deben realizar simulaciones con datos representativos y un entorno de prueba idéntico al productivo. 
      Grandes empresas, como HP, sufrieron pérdidas por no probar a fondo sus sistemas antes del lanzamiento.
    </p>

    <h4>Migración de datos deficiente</h4>
    <p>
      La transferencia de información del sistema anterior debe realizarse con limpieza y validación previa. 
      Una migración errónea puede causar pérdida de datos y caos operativo. 
      La compatibilidad entre sistemas y un entorno de pruebas son claves para evitar errores.
    </p>

    <h4>Falta de personal o recursos técnicos</h4>
    <p>
      El éxito requiere personal IT capacitado y soporte técnico continuo. 
      La ausencia de profesionales especializados o la subcontratación inadecuada puede afectar la post-implementación. 
      Además, los usuarios deben recibir <strong>formación adecuada</strong> para usar el sistema.
    </p>

    <h4>ERP no escalable ni flexible</h4>
    <p>
      El sistema debe adaptarse al crecimiento y evolución de la empresa. 
      Un ERP escalable y personalizable evita futuras migraciones costosas. 
      No obstante, elegir un sistema demasiado grande también puede resultar contraproducente.
    </p>

    <h3>3. Otros errores comunes</h3>
    <ul>
      <li>Decisiones ambiguas o tardías durante la implementación.</li>
      <li>Resistencia al cambio y falta de comunicación interna.</li>
      <li>Presupuesto insuficiente para un proyecto estratégico.</li>
      <li>Expectativas irreales o exceso de optimismo que impiden prever contingencias.</li>
    </ul>

    <h3>4. Conclusiones y recomendaciones</h3>
    <p>
      Implementar un ERP no es un gasto, sino una <strong>inversión</strong> a largo plazo. 
      Los beneficios —eficiencia, integración y control— compensan la complejidad del proceso. 
      Planificar, liderar, capacitar y probar son los pilares del éxito.
    </p>
    <p>
      En <a href="https://grupovisualcont.com/" target="_blank" rel="noopener"><strong>grupovisualcont.com</strong></a> 
      ofrecemos acompañamiento integral para la <strong>selección e implementación de ERP</strong>. 
      Nuestros consultores te guiarán desde la planificación hasta la puesta en marcha, garantizando un proceso seguro y exitoso.
    </p>

    <blockquote>
      <p>
        “Cumple todas las reglas y tendrás éxito; falla en una y tu proyecto se caerá.” — Consejo final para toda implementación ERP.
      </p>
    </blockquote>
  `,
    projectUrl: "https://grupovisualcont.com/",
  },
  {
    slug: "comprar-facturas-delito-peru-2025",
    title:
      "¿Comprar facturas es considerado un delito en el Perú? Un análisis completo al 2025",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-26",
    shortDescription:
      "Comprar facturas falsas o de 'favor' para reducir impuestos constituye una práctica ilegal que puede configurar delito de defraudación tributaria en el Perú, con penas de hasta 12 años de prisión.",
    mainImage: "/images/noticias/noticia_07/mainImage.webp",
    categories: [Category.Tributacion, Category.Contabilidad],
    content: `
    <p>
      En el ámbito tributario peruano, la compra-venta de facturas falsas o de “favor” se ha convertido en una práctica recurrente y peligrosa.
      Este mecanismo busca reducir la carga fiscal o generar créditos indebidos en el IGV y el Impuesto a la Renta, y puede derivar en sanciones penales graves.
    </p>

    <h3>1. ¿Qué significa “comprar facturas”?</h3>
    <p>
      Consiste en adquirir comprobantes de pago emitidos por empresas reales o ficticias, por operaciones inexistentes, 
      con el propósito de inflar gastos, reducir la base imponible o generar créditos fiscales indebidos.
    </p>
    <p>
      Estas operaciones pueden involucrar facturas clonadas, proveedores fantasmas o simulaciones de servicios.
      La finalidad es aparentar transacciones que nunca ocurrieron para obtener beneficios tributarios ilícitos.
    </p>

    <h3>2. Normativa peruana aplicable (2025)</h3>
    <ul>
      <li><strong>Ley del IGV e ISC – Artículo 44°:</strong> declara improcedente el crédito fiscal en operaciones no reales. Distingue entre simulación absoluta (sin operación) y relativa (con irregularidades).</li>
      <li><strong>Ley Penal Tributaria (DL N.º 813):</strong> tipifica el delito de defraudación tributaria, sancionando la simulación o manipulación de hechos para obtener beneficios fiscales indebidos.</li>
      <li><strong>Decreto Legislativo N.º 1532:</strong> regula la identificación de <strong>Sujetos Sin Capacidad Operativa (SSCO)</strong>, cuyos comprobantes no generan crédito fiscal.</li>
      <li><strong>Código Tributario – Art. 189:</strong> permite la <strong>regularización voluntaria</strong> antes del inicio de una acción fiscalizadora o penal, como mecanismo atenuante.</li>
    </ul>

    <h3>3. ¿Cuándo se configura el delito?</h3>
    <table>
      <thead>
        <tr>
          <th>Elemento</th>
          <th>Condición para tipificar delito</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Objeto material</strong></td>
          <td>Facturas falsas o comprobantes que simulan operaciones no reales para obtener beneficios tributarios.</td>
        </tr>
        <tr>
          <td><strong>Elemento subjetivo (dolo)</strong></td>
          <td>Conocimiento o presunción razonable de la falsedad del comprobante.</td>
        </tr>
        <tr>
          <td><strong>Medio fraudulento</strong></td>
          <td>Uso de empresas sin capacidad operativa o simulación de servicios.</td>
        </tr>
        <tr>
          <td><strong>Resultado</strong></td>
          <td>Obtención de créditos o devoluciones indebidas, o evasión del pago de tributos.</td>
        </tr>
      </tbody>
    </table>

    <p>
      Cuando concurren estos elementos, la compra de facturas configura el delito de <strong>defraudación tributaria</strong>.
    </p>

    <h3>4. Sanciones y consecuencias</h3>
    <p>
      Según <em>Noticiero Contable</em>, la defraudación tributaria vinculada al uso de facturas falsas puede acarrear:
    </p>
    <ul>
      <li><strong>Pena de prisión:</strong> no menor de 8 ni mayor de 12 años.</li>
      <li><strong>Multa:</strong> entre 730 y 1,460 días-multa.</li>
      <li><strong>Sanciones administrativas:</strong> pérdida del crédito fiscal, reparos tributarios, intereses y exclusión de beneficios.</li>
    </ul>

    <h3>5. ¿Qué hacer si la SUNAT detecta el uso de facturas falsas?</h3>
    <ul>
      <li><strong>Revisar y corregir declaraciones</strong> que incluyan comprobantes no válidos.</li>
      <li><strong>Regularizar voluntariamente</strong> antes de que se inicie fiscalización, según Art. 189 del Código Tributario.</li>
      <li><strong>Buscar asesoría legal y contable</strong> especializada para determinar si hubo dolo o error de buena fe.</li>
      <li><strong>Conservar documentación</strong> que respalde que la operación fue real o que el proveedor tenía capacidad operativa.</li>
    </ul>

    <h3>6. Reformas y tendencias al 2025</h3>
    <ul>
      <li><strong>SSCO (Sujetos Sin Capacidad Operativa):</strong> SUNAT puede declarar a proveedores sin capacidad operativa, anulando la validez de sus comprobantes.</li>
      <li><strong>Fiscalización digital:</strong> uso de auditoría forense, cruces automáticos de datos y análisis de riesgo tributario.</li>
      <li><strong>Mayor vigilancia pública:</strong> medios y autoridades atentos al uso indebido de facturas.</li>
      <li><strong>Jurisprudencia emergente:</strong> precisará el grado de conocimiento exigido para acreditar dolo o buena fe.</li>
    </ul>

    <h3>7. Conclusión</h3>
    <p>
      <strong>Comprar facturas sí puede ser delito en el Perú</strong>, siempre que se demuestre simulación de operaciones y 
      dolo o conocimiento de la falsedad. En tales casos, se configura defraudación tributaria con pena de prisión y multa.
      Si no hay dolo comprobado, pueden aplicarse sanciones administrativas, pero no penales.
    </p>
    <p>
      Para prevenir riesgos:
    </p>
    <ul>
      <li>Verificar la <strong>capacidad operativa</strong> de los proveedores.</li>
      <li>Conservar evidencia documental real de las operaciones.</li>
      <li>Evitar prácticas de simulación o emisión de comprobantes sin respaldo.</li>
      <li>Regularizar oportunamente ante cualquier observación de SUNAT.</li>
    </ul>

    <p>
      En definitiva, la cultura de <strong>cumplimiento tributario</strong> y la asesoría preventiva son las mejores herramientas 
      para evitar sanciones graves y mantener la transparencia empresarial.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "sunat-desconocer-credito-fiscal-requisitos-2025",
    title:
      "SUNAT puede desconocer ese crédito si no cumples con los requisitos y documentos de sustento",
    author: {
      name: "Monica Romero",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-24",
    shortDescription:
      "Tener la factura no basta: SUNAT puede desconocer el crédito fiscal del IGV si no cumples con los requisitos formales y documentarios que acrediten la realidad de la operación.",
    mainImage: "/images/noticias/noticia_08/mainImage.webp",
    categories: [Category.Tributacion, Category.Contabilidad],
    content: `
    <p>
      <strong>¡Atención empresarios y emprendedores!</strong> No basta con tener la factura física para usar el 
      <strong>IGV como crédito fiscal</strong>. La <strong>SUNAT</strong> puede desconocer ese crédito si no cumples con 
      los requisitos formales y documentarios que acrediten la realidad de la operación.
    </p>

    <h3>Documentos necesarios para sustentar el crédito fiscal</h3>

    <h4>1. Guía de remisión</h4>
    <p>
      Acredita el traslado físico de los bienes y demuestra que la operación fue real.
      Es esencial para validar que los productos fueron efectivamente entregados.
    </p>

    <h4>2. Pago de detracción (cuando aplica)</h4>
    <p>
      Si la operación está sujeta al <strong>Sistema de Detracciones</strong>, el crédito fiscal solo se mantiene válido 
      si realizas el pago de la detracción antes del vencimiento del mes siguiente.
    </p>

    <h4>3. Cotización o proforma</h4>
    <p>
      Aunque no es un documento exigido directamente por SUNAT, 
      sirve como evidencia complementaria de la intención de compra o contratación del servicio.
    </p>

    <h4>4. Orden de servicio o de compra</h4>
    <p>
      Documento interno que sustenta la decisión de contratar un servicio o adquirir un bien. 
      Refuerza la trazabilidad del gasto y ayuda a demostrar que la operación fue planificada y no ficticia.
    </p>

    <h4>5. Pago bancarizado (medio de pago válido)</h4>
    <p>
      Las operaciones mayores a <strong>S/ 2,000</strong> o <strong>USD 500</strong> deben realizarse mediante 
      medios de pago permitidos (transferencias, depósitos, cheques u otros medios financieros).
      Si no se usa un medio bancarizado, el crédito fiscal puede perderse.
    </p>

    <h3>Consejo práctico</h3>
    <p>
      Antes de registrar cualquier compra o gasto, <strong>verifica que tu proveedor esté Activo y Habido</strong> 
      en el RUC. Si el proveedor no tiene capacidad operativa o no está hábil ante SUNAT, 
      tu crédito fiscal podría ser observado o desconocido.
    </p>

    <h3>En resumen</h3>
    <ul>
      <li>No basta la factura: se requiere sustento documental de la operación.</li>
      <li>El incumplimiento formal puede implicar la pérdida del crédito fiscal.</li>
      <li>La prevención y documentación adecuada son claves para evitar reparos.</li>
    </ul>

    <p>
      Mantén tus operaciones respaldadas y cumple con los requisitos formales para evitar reparos tributarios. 
      Un control documentario adecuado asegura la validez de tus créditos fiscales ante SUNAT.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "lavado-de-dinero-y-crimen-organizado-2025",
    title: "Lavado de dinero y crimen organizado",
    author: {
      name: "Roberto Maldonado Ortega",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-24",
    shortDescription:
      "La 'Operación Dinero Fantasma' reveló una red global de lavado de dinero que mezclaba criptomonedas, empresas fachada y corrupción financiera a gran escala.",
    mainImage: "/images/noticias/noticia_09/mainImage.webp",
    categories: [Category.Finanzas, Category.Economia],
    content: `
    <p>
      En las entrañas de la Ciudad de México se gestaba una red invisible de transacciones ilícitas: 
      la llamada <strong>“Operación Dinero Fantasma”</strong>, uno de los casos de <strong>lavado de dinero</strong> más sofisticados del continente. 
      Detrás de ella se encontraba un economista apodado <em>“El Contador”</em>, un genio financiero con talento para manipular estructuras corporativas, 
      flujos transfronterizos y criptomonedas con el fin de blanquear miles de millones de dólares provenientes del narcotráfico y el contrabando.
    </p>

    <h3>La mente maestra: “El Contador”</h3>
    <p>
      A diferencia de los capos tradicionales, “El Contador” era un profesional con amplio conocimiento de finanzas internacionales. 
      Utilizaba <strong>empresas fachada</strong>, <strong>transferencias electrónicas</strong> y <strong>criptomonedas</strong> 
      para ocultar el origen ilícito de los fondos. Su red abarcaba desde banqueros corruptos hasta abogados y políticos ambiciosos, 
      todos atraídos por la promesa de dinero fácil y anonimato financiero.
    </p>

    <p>
      Las reuniones se realizaban en entornos contrastantes: penthouses de lujo en Polanco y sótanos clandestinos en Tepito, 
      donde los maletines llenos de efectivo cambiaban de manos y las estrategias se perfeccionaban.
    </p>

    <h3>Investigación y desmantelamiento</h3>
    <p>
      La operación conjunta entre agencias de seguridad de México, Estados Unidos y Europa se extendió durante años. 
      A través de auditorías financieras y monitoreo de <em>blockchain</em>, los investigadores lograron trazar los flujos ilícitos y 
      coordinar <strong>arrestos simultáneos</strong> en varios países. “El Contador” fue capturado en un aeropuerto privado 
      cuando intentaba huir con documentación falsificada.
    </p>

    <p>
      Su detención permitió revelar cómo el dinero ilícito se infiltraba en la economía legal: 
      inversiones inmobiliarias, fundaciones, importaciones falsas y negocios de fachada que distorsionaban el mercado y financiaban la violencia.
    </p>

    <h3>Implicaciones globales</h3>
    <ul>
      <li>Demostró la <strong>adaptabilidad del crimen organizado</strong> al entorno digital.</li>
      <li>Reafirmó la necesidad de la <strong>cooperación internacional</strong> y el intercambio de información financiera.</li>
      <li>Destacó la vulnerabilidad del sistema bancario ante operaciones con criptomonedas sin trazabilidad clara.</li>
      <li>Exhibió cómo el lavado de dinero impacta la estabilidad económica y política de los Estados.</li>
    </ul>

    <h3>Reflexión final</h3>
    <p>
      El caso “Dinero Fantasma” se convirtió en un ejemplo de cómo el <strong>crimen organizado</strong> evoluciona con la tecnología, 
      sofisticando sus métodos para evadir los controles financieros. También evidencia la importancia de fortalecer 
      la <strong>inteligencia financiera</strong> y los mecanismos de trazabilidad en las operaciones económicas globales.
    </p>

    <blockquote>
      <p>
        “Muévete y el mundo se moverá contigo, detente y el mundo se moverá sin ti.”
      </p>
    </blockquote>

    <p>
      En tiempos de transformación digital y mercados globales, la vigilancia constante y la cooperación entre instituciones 
      son las mejores herramientas para combatir el <strong>lavado de activos</strong> y proteger la integridad de las economías.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "nuevos-obligados-inscripcion-ruc-2025",
    title:
      "Información sobre los supuestos para los nuevos obligados a inscribirse en el RUC",
    author: {
      name: "Monica Moreno",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-19",
    shortDescription:
      "La Resolución de Superintendencia N° 130-2024/SUNAT amplía los supuestos de inscripción obligatoria en el RUC, incluyendo propietarios de múltiples predios, accionistas, personas con altos saldos bancarios y adquirentes sujetos a percepciones del IGV.",
    mainImage: "/images/noticias/noticia_10/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      Mediante la <strong>Resolución de Superintendencia N.º 130-2024/SUNAT</strong>, 
      se ampliaron los <strong>supuestos de inscripción obligatoria en el RUC</strong> (Registro Único de Contribuyentes). 
      A partir del ejercicio 2025, más personas naturales deberán inscribirse bajo determinados criterios patrimoniales, financieros y tributarios.
    </p>

    <h3>1. Propietarios de 5 o más predios</h3>
    <p>
      Sujetos obligados a inscribirse por ser <strong>propietarios de cinco o más predios</strong> 
      cuyo valor conjunto supere las <strong>126 UIT</strong>.
    </p>
    <ul>
      <li>Incluye predios rústicos y urbanos, tanto en el Perú como en el extranjero.</li>
      <li>Departamento, cochera y depósito se consideran un único predio.</li>
      <li>Valoración de predios:
        <ul>
          <li><strong>En el Perú:</strong> se considera el valor de autoavalúo correspondiente al año de evaluación.</li>
          <li><strong>En el extranjero:</strong> se utiliza el valor sobre el cual se calcula el impuesto local, o, de no existir, el valor de adquisición.</li>
        </ul>
      </li>
      <li>Predios en copropiedad: cada copropietario debe considerar su porcentaje de participación.</li>
    </ul>

    <h3>2. Propietarios de acciones o participaciones</h3>
    <p>
      Personas naturales propietarias de <strong>acciones o participaciones</strong> en sociedades peruanas o extranjeras 
      cuyo valor total supere las <strong>100 UIT</strong>.
    </p>
    <ul>
      <li>Acciones cotizadas: se valoran según su <strong>cotización al 31 de diciembre</strong>.</li>
      <li>No cotizadas: se toma el <strong>valor de adquisición o el valor nominal</strong>, el que sea mayor.</li>
      <li>Valores en moneda extranjera: deben convertirse a soles con el tipo de cambio promedio ponderado compra publicado por la SBS al 31 de diciembre.</li>
      <li>En caso de copropiedad, se considera la participación proporcional de cada titular.</li>
    </ul>

    <h3>3. Adquisiciones sujetas a percepciones del IGV</h3>
    <p>
      Personas naturales que realicen <strong>adquisiciones de bienes sujetas a percepciones del IGV</strong> 
      que superen las <strong>10 UIT</strong> anuales. 
      Para el cálculo se consideran las operaciones con comprobantes de percepción emitidos.
    </p>

    <h3>4. Sujetos con altos saldos en cuentas del sistema financiero</h3>
    <p>
      Se incluyen quienes perciban intereses por depósitos en entidades financieras y 
      cuyo <strong>saldo total de cuentas supere las 300 UIT</strong>.
    </p>
    <ul>
      <li>Aplica a todas las cuentas excepto CTS.</li>
      <li>Se considera el saldo al <strong>31 de diciembre</strong> de cada año.</li>
      <li>Si la cuenta tiene más de un titular, cada uno debe considerar el saldo total.</li>
      <li>Los saldos en moneda extranjera deben convertirse a soles al tipo de cambio promedio ponderado compra SBS.</li>
    </ul>

    <h3>5. Sujetos obligados por actos ante el sistema financiero o de seguros</h3>
    <ul>
      <li><strong>Solicitudes de crédito</strong> (corporativo, gran, mediana o pequeña empresa) cuando el monto del crédito solicitado, 
      más el saldo de endeudamiento directo, <strong>supere las 10 UIT</strong>.</li>
      <li>No se incluyen créditos de consumo revolvente, no revolvente ni hipotecarios para vivienda.</li>
      <li><strong>Contratación del SOAT</strong> con empresas aseguradoras para vehículos de categorías <strong>N2 y N3</strong>.</li>
    </ul>

    <h3>Plazo de inscripción en el RUC</h3>
    <p>
      Los sujetos que cumplan cualquiera de los supuestos al <strong>31 de diciembre</strong> de un año 
      deberán inscribirse en el <strong>RUC hasta el último día útil de enero</strong> del año siguiente.
    </p>

    <h3>Inscripción de oficio</h3>
    <p>
      La SUNAT podrá <strong>inscribir de oficio</strong> en el RUC a aquellos que, 
      pese a cumplir con los criterios de inscripción, no lo hagan voluntariamente dentro del plazo.
    </p>

    <h3>Importante</h3>
    <p>
      Si realizas <strong>actividades económicas generadoras de obligaciones tributarias</strong>, 
      la inscripción en el RUC sigue siendo obligatoria, incluso fuera de estos nuevos supuestos.
    </p>

    <p>
      Esta medida busca ampliar la base tributaria, mejorar la fiscalización patrimonial 
      y fomentar la transparencia en la información económica de las personas naturales.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "rentas-quinta-categoria-peru-2025-sunat",
    title:
      "Rentas de Quinta Categoría en el Perú 2025: Todo lo que debes saber para cumplir con la SUNAT",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-18",
    shortDescription:
      "Guía 2025 sobre rentas de quinta categoría: qué ingresos incluye, deducciones (7 UIT), tramos y tasas progresivas, declaración (FV 709), novedades y ejemplos prácticos.",
    mainImage: "/images/noticias/noticia_02/mainImage.webp",
    categories: [Category.Tributacion],
    content: `
    <p><strong>Introducción.</strong> En el sistema tributario peruano, las rentas de trabajo se clasifican por categorías.
    La <strong>Quinta Categoría</strong> corresponde a ingresos por <em>relación de dependencia</em>. Esta guía 2025 explica qué se considera quinta categoría, quiénes están sujetos, cómo se calcula el impuesto (deducciones, tramos y tasas), cómo y cuándo declarar, novedades recientes y dos ejemplos completos.</p>

    <h3>¿Qué son las Rentas de Quinta Categoría?</h3>
    <p>Según la SUNAT, son los ingresos que una persona natural obtiene por la prestación de servicios en <strong>relación de dependencia</strong>.</p>
    <ul>
      <li><strong>Incluye:</strong> sueldos, salarios, asignaciones, primas/bonificaciones, aguinaldos, comisiones, utilidades; retribuciones en dinero o especie por trabajo dependiente; retribuciones a socios/titulares cuando existe dependencia.</li>
      <li><strong>Casos fronterizos:</strong> servicios “independientes” que, por la forma de ejecución (horario, lugar, medios provistos, subordinación), se asimilan a dependencia.</li>
    </ul>

    <h3>Ingresos no sujetos / exonerados</h3>
    <ul>
      <li>Indemnizaciones laborales.</li>
      <li>Compensación por Tiempo de Servicios (CTS).</li>
      <li>Subsidios por maternidad, lactancia, incapacidad temporal.</li>
      <li>Pensiones y rentas vitalicias de origen laboral.</li>
      <li>Viáticos (movilidad, hospedaje, alimentación) cuando son necesarios, razonables y <em>comprobados</em> según norma.</li>
    </ul>

    <h3>Marco legal aplicable</h3>
    <ul>
      <li><strong>Ley del Impuesto a la Renta (LIR)</strong> y su Reglamento: define el concepto de renta, deducciones, exoneraciones y procedimientos.</li>
      <li><strong>Resoluciones SUNAT</strong>: precisan formularios, cronogramas y reglas operativas (p. ej., <strong>FV N.º 709</strong> para personas naturales sin negocio).</li>
      <li><strong>Actualizaciones 2025</strong>: verificar valor de la UIT (UIT_2025), eventuales precisiones de cronograma y formatos.</li>
    </ul>

    <h3>Valor de la UIT en 2025</h3>
    <p>La UIT es la referencia para umbrales, deducciones y tramos. En quinta categoría, la deducción especial es de <strong>7 UIT</strong>.
    <br><em>Usa el valor vigente confirmado (UIT_2025) en tu implementación.</em></p>

    <h3>Cálculo del Impuesto a la Renta (IR) de Quinta Categoría</h3>
    <ol>
      <li><strong>Suma de ingresos brutos anuales:</strong> sueldos, gratificaciones, bonos, comisiones, utilidades, etc.</li>
      <li><strong>Resta deducción especial de 7 UIT:</strong> Base Imponible = Ingresos brutos – (7 × UIT_2025). Si no superas 7 UIT, no hay impuesto.</li>
      <li><strong>Aplica tasas progresivas por tramos</strong> sobre la base imponible:
        <table border="1" cellpadding="6" cellspacing="0">
          <thead><tr><th>Tramo (en UIT)</th><th>Tasa</th></tr></thead>
          <tbody>
            <tr><td>0 – 5 UIT</td><td>8%</td></tr>
            <tr><td>&gt; 5 – 20 UIT</td><td>14%</td></tr>
            <tr><td>&gt; 20 – 35 UIT</td><td>17%</td></tr>
            <tr><td>&gt; 35 – 45 UIT</td><td>20%</td></tr>
            <tr><td>&gt; 45 UIT</td><td>30%</td></tr>
          </tbody>
        </table>
      </li>
      <li><strong>Descuenta retenciones mensuales</strong> practicadas por el empleador durante el año.</li>
      <li><strong>Impuesto final:</strong> si el resultado es positivo, pagas la diferencia; si es negativo, tienes saldo a favor (posible devolución).</li>
    </ol>

    <h3>Deducciones y beneficios</h3>
    <ul>
      <li><strong>Deducción especial:</strong> 7 × UIT_2025.</li>
      <li><strong>Otros gastos deducibles</strong> permitidos por ley (p. ej., alquileres y otros, con topes y condiciones). Requieren comprobantes válidos.</li>
      <li>Si tienes ingresos de cuarta categoría además de quinta, considera que pueden <em>sumarse</em> para determinar si debes declarar.</li>
    </ul>

    <h3>Declaración anual y plazos</h3>
    <ul>
      <li><strong>Formulario Virtual N.º 709</strong> (Personas naturales sin negocio) en SUNAT Virtual o App Personas.</li>
      <li><strong>Cronograma</strong> según el último dígito del RUC (fechas fijadas por SUNAT para el ejercicio anterior). Para 2024, la ventana fue entre marzo y mayo/junio de 2025; para próximos ejercicios, revisa el nuevo cronograma.</li>
      <li><strong>Obligación de declarar:</strong> si solo percibes quinta y no superas 7 UIT, usualmente no declaras; sí podrías estar obligado si también generas cuarta u otras rentas.</li>
    </ul>

    <h3>Novedades y recordatorios 2025</h3>
    <ul>
      <li>Continuidad del <strong>FV N.º 709</strong> para rentas de trabajo.</li>
      <li>Respeta el <strong>cronograma por RUC</strong> y confirma eventuales ajustes.</li>
      <li>Confirma <strong>UIT_2025</strong> (impacta deducciones y tramos).</li>
      <li>Revisa reglas de <strong>devolución automática</strong> o de oficio cuando corresponda.</li>
    </ul>

    <h3>Ejemplos prácticos</h3>
    <h4>Ejemplo 1: Ingresos por debajo de 7 UIT</h4>
    <p><strong>Supuestos:</strong> Ingresos anuales = S/ 30,000; UIT_2025 = S/ 5,350 (ejemplo ilustrativo).
    <br>7 × 5,350 = S/ 37,450. Como 30,000 &lt; 37,450, <strong>no hay impuesto</strong> anual a pagar (las retenciones podrían ser mínimas o nulas).</p>

    <h4>Ejemplo 2: Ingresos mayores con saldo a pagar</h4>
    <p><strong>Supuestos:</strong> Ingresos brutos anuales = S/ 70,000; UIT_2025 = S/ 5,350 (ejemplo).
    <br>Deducción: 7 × 5,350 = S/ 37,450 → Base = 70,000 – 37,450 = <strong>S/ 32,550</strong>.
    <br>Aplicación de tramos:
      <ul>
        <li>Hasta 5 UIT: 5×5,350 = 26,750 → 8% = S/ 2,140</li>
        <li>Excedente: 32,550 – 26,750 = 5,800 → cae en &gt;5–20 UIT → 14% = S/ 812</li>
      </ul>
      <strong>IR anual</strong> = 2,140 + 812 = <strong>S/ 2,952</strong>.
      <br>Si las <strong>retenciones</strong> del año sumaron S/ 2,400 → <strong>saldo por pagar</strong> = 2,952 – 2,400 = <strong>S/ 552</strong>.
    </p>

    <h3>Procedimiento para declarar/pagar</h3>
    <ol>
      <li>Reúne: ingresos totales, retenciones, otros ingresos (si aplica), gastos deducibles con comprobantes.</li>
      <li>Ingresa al <strong>FV N.º 709</strong> (SUNAT Virtual/App Personas).</li>
      <li>Declara dentro del <strong>cronograma</strong> por RUC.</li>
      <li>Liquida: calcula IR anual, descuenta retenciones, determina saldo a pagar/a favor.</li>
      <li>Paga o solicita devolución (según corresponda).</li>
    </ol>

    <h3>Consejos prácticos</h3>
    <ul>
      <li>Conserva comprobantes y boletas de pago.</li>
      <li>Verifica cada año la <strong>UIT</strong> vigente.</li>
      <li>Si combinas rentas (cuarta + quinta), planifica y evalúa tus deducciones dentro del marco legal.</li>
      <li>No pierdas de vista los <strong>plazos</strong> para evitar multas e intereses.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>Las rentas de quinta categoría alcanzan a la mayoría de trabajadores dependientes. Entender qué ingresos incluye,
    cómo opera la deducción de 7 UIT, los tramos progresivos y el proceso de declaración (FV 709) es clave para evitar
    sorpresas al cierre del año. Con 2025, confirma la <strong>UIT_2025</strong>, el cronograma y conserva tus sustentos: cumplir bien hoy
    evita contingencias mañana.</p>
  `,
    projectUrl: "",
  },
  {
    slug: "renta-cuarta-categoria-peru-2025-guia-completa",
    title:
      "Renta de Cuarta Categoría en Perú 2025: Guía Completa, Actualizada y Práctica",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-17",
    shortDescription:
      "Qué es cuarta categoría, quiénes la generan, UIT 2025 (S/ 5,350), deducciones (20% + 7 UIT), tasas por tramos, suspensión de retenciones (FV 1609), obligación de declarar y casos prácticos.",
    mainImage: "/images/noticias/noticia_03/mainImage.webp",
    categories: [Category.Tributacion],
    content: `
    <p>En este artículo encontrarás una explicación detallada y actualizada a 2025 sobre la tributación por <strong>Renta de Cuarta Categoría</strong> según SUNAT. Aborda conceptos, UIT vigente, deducciones, tasas, suspensión de retenciones/pagos a cuenta, declaración anual y casos prácticos.</p>

    <h3>Índice</h3>
    <ol>
      <li>¿Qué es la Renta de Cuarta Categoría?</li>
      <li>¿Quiénes generan rentas de cuarta categoría?</li>
      <li>Valor de la UIT en 2025 y su importancia</li>
      <li>Deducciones permitidas y base imponible</li>
      <li>Escalas y tasas aplicables para 2025</li>
      <li>Obligaciones: comprobantes, retenciones, pagos a cuenta</li>
      <li>Suspensión de retenciones y pagos a cuenta 2025</li>
      <li>Declaración anual: quiénes declaran y cuándo</li>
      <li>Casos prácticos 2025</li>
      <li>Consecuencias de incumplimiento</li>
      <li>Recomendaciones finales</li>
    </ol>

    <h3>1. ¿Qué es la Renta de Cuarta Categoría?</h3>
    <p>Comprende los ingresos que percibe una persona natural por <strong>servicios independientes</strong>, sin relación de dependencia: profesiones, artes, oficios. Incluye a consultores, abogados, contadores, diseñadores, técnicos, entre otros.</p>
    <ul>
      <li>Puede incluir CAS sin subordinación directa.</li>
      <li>Dietas por funciones (directorio, síndico, mandatario, gestor de negocios, albacea, regidor, consejero regional), cuando no hay relación de dependencia.</li>
    </ul>
    <p>Si existe relación de dependencia (planilla), corresponde <strong>Quinta Categoría</strong>. Si la actividad deviene empresarial, podría pasar a <strong>Tercera Categoría</strong>.</p>

    <h3>2. ¿Quiénes generan rentas de cuarta categoría?</h3>
    <ul>
      <li>Personas naturales que prestan servicios independientes (sin empleador que imponga subordinación habitual).</li>
      <li>Profesionales, técnicos, traductores, diseñadores, artesanos, consultores, etc.</li>
      <li>Quienes emiten <strong>Recibos por Honorarios electrónicos</strong>.</li>
      <li>Quienes perciben <strong>dietas</strong> por funciones sin dependencia (director, síndico, etc.).</li>
    </ul>

    <h3>3. Valor de la UIT en 2025 y su importancia</h3>
    <ul>
      <li><strong>UIT 2025:</strong> S/ 5,350 (reemplaza la UIT 2024 de S/ 5,150), vigente desde el 1 de enero de 2025.</li>
      <li>La UIT impacta deducciones, límites de suspensión, tramos y multas.</li>
    </ul>

    <h3>4. Deducciones permitidas y base imponible</h3>
    <ol>
      <li><strong>Ingresos brutos del año:</strong> suma de todos los honorarios (cuarta categoría).</li>
      <li><strong>Deducción automática 20%:</strong> estimación de gastos sin necesidad de sustento individual.</li>
      <li><strong>Deducción de 7 UIT:</strong> 7 × S/ 5,350 = <strong>S/ 37,450</strong>.</li>
    </ol>
    <p>Base imponible = Ingresos brutos – 20% – 7 UIT. Si la base es cero o negativa, no hay impuesto anual de cuarta por ese año.</p>

    <h3>5. Escalas y tasas aplicables para 2025</h3>
    <p>La base imponible positiva se grava con escala progresiva acumulativa para rentas de trabajo (cuarta y quinta):</p>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr><th>Tramo (en UIT)</th><th>Tasa</th></tr>
      </thead>
      <tbody>
        <tr><td>0 – 5 UIT</td><td>8%</td></tr>
        <tr><td>&gt; 5 – 20 UIT</td><td>14%</td></tr>
        <tr><td>&gt; 20 – 35 UIT</td><td>17%</td></tr>
        <tr><td>&gt; 35 – 45 UIT</td><td>20%</td></tr>
        <tr><td>&gt; 45 UIT</td><td>30%</td></tr>
      </tbody>
    </table>

    <h3>6. Obligaciones: emisión de comprobantes, retenciones, pagos a cuenta</h3>
    <ul>
      <li><strong>Recibos por Honorarios electrónicos</strong> obligatorios.</li>
      <li><strong>Retenciones 8%</strong> cuando el pagador es agente de retención.</li>
      <li><strong>No hay retención</strong> si el recibo es ≤ S/ 1,500 <em>o</em> si cuentas con <strong>suspensión vigente</strong>.</li>
      <li><strong>Pagos a cuenta mensuales:</strong> cuando retenciones no cubren el impuesto estimado (regla general 8% sobre ingresos del mes, menos retenciones).</li>
    </ul>

    <h3>7. Suspensión de retenciones y pagos a cuenta: requisitos y montos 2025</h3>
    <p>Si tus ingresos proyectados no superan los límites publicados por SUNAT, puedes solicitar suspensión vía <strong>FV N.º 1609</strong> (SUNAT Virtual). La constancia rige desde el día siguiente hasta el 31 de diciembre de 2025.</p>
    <ul>
      <li><strong>Solo cuarta categoría:</strong> Límite mensual <strong>S/ 3,901</strong> — Límite anual proyectado <strong>S/ 46,813</strong>.</li>
      <li><strong>Funciones especiales (p. ej., directores, síndicos):</strong> Límite mensual <strong>S/ 3,121</strong> — Límite anual <strong>S/ 37,450</strong>.</li>
    </ul>
    <p>Si luego excedes límites o cambia tu proyección, debes <strong>reiniciar retenciones/pagos a cuenta</strong> desde el periodo afectado.</p>

    <h3>8. Declaración anual: quiénes deben declarar y cuándo</h3>
    <ul>
      <li>Podrías estar obligado aunque tengas suspensión, si superas límites o combinaste rentas (cuarta + quinta).</li>
      <li>La DJ anual se presenta a inicios del año siguiente (para 2025, a inicios de 2026, según cronograma por RUC).</li>
      <li>Usa el <strong>Formulario Virtual N.º 709</strong> (Personas Naturales sin negocio).</li>
    </ul>

    <h3>9. Casos prácticos 2025</h3>
    <h4>Caso 1: Ingresos bajos, sin impuesto</h4>
    <p><strong>María</strong> (solo cuarta) proyecta S/ 40,000. Deducción 20%: S/ 8,000 → queda S/ 32,000. Resta 7 UIT (S/ 37,450) → base <strong>negativa</strong>. No paga IR anual. Puede solicitar suspensión si no supera S/ 3,901/mes o S/ 46,813/año.</p>

    <h4>Caso 2: Ingresos medios, paga algo de impuesto</h4>
    <p><strong>Juan</strong> proyecta S/ 66,000.</p>
    <ul>
      <li>Deducción 20%: S/ 13,200 → remanente: S/ 52,800.</li>
      <li>Resta 7 UIT: S/ 37,450 → Base: <strong>S/ 15,350</strong>.</li>
      <li>Como 5 UIT = S/ 26,750, todo cae en el primer tramo (8%).</li>
      <li><strong>IR anual:</strong> 15,350 × 8% = <strong>S/ 1,228</strong> (luego se restan retenciones/pagos a cuenta).</li>
    </ul>

    <h4>Caso 3: Ingresos altos, varios tramos</h4>
    <p><strong>Carla</strong> proyecta S/ 200,000.</p>
    <ul>
      <li>Deducción 20%: S/ 40,000 → remanente: S/ 160,000.</li>
      <li>Resta 7 UIT: S/ 37,450 → Base imponible: <strong>S/ 122,550</strong>.</li>
    </ul>
    <p>Distribución por tramos (UIT = S/ 5,350):</p>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr>
          <th>Tramo</th>
          <th>Límite en S/</th>
          <th>%</th>
          <th>Base gravada en el tramo (S/)</th>
          <th>Impuesto por tramo (S/)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0 – 5 UIT</td>
          <td>0 – 26,750</td>
          <td>8%</td>
          <td>26,750</td>
          <td>2,140.00</td>
        </tr>
        <tr>
          <td>&gt; 5 – 20 UIT</td>
          <td>26,750 – 107,000</td>
          <td>14%</td>
          <td>80,250</td>
          <td>11,235.00</td>
        </tr>
        <tr>
          <td>&gt; 20 – 35 UIT</td>
          <td>107,000 – 187,250</td>
          <td>17%</td>
          <td>15,550</td>
          <td>2,643.50</td>
        </tr>
        <tr>
          <td colspan="4"><strong>Total impuesto anual</strong></td>
          <td><strong>16,018.50</strong></td>
        </tr>
      </tbody>
    </table>
    <p><em>Luego se descuentan retenciones y pagos a cuenta del año para obtener el saldo final a pagar o a favor.</em></p>

    <h3>10. Consecuencias de incumplimiento</h3>
    <ul>
      <li>Multas por no emitir recibos electrónicos, no declarar o no pagar a tiempo.</li>
      <li>Intereses moratorios.</li>
      <li>Fiscalizaciones y cruces de información (honorarios, retenciones, bancos).</li>
      <li>Pérdida de la suspensión si se falsea la proyección o se superan límites sin regularizar.</li>
    </ul>

    <h3>11. Recomendaciones finales</h3>
    <ul>
      <li>Proyecta ingresos desde inicios de año; solicita suspensión si calificas (FV N.º 1609).</li>
      <li>Conserva comprobantes, constancias de retención y reportes de pagos a cuenta.</li>
      <li>Monitorea mensualmente tus ingresos y ajusta cuando superes límites.</li>
      <li>Si combinas rentas (cuarta + quinta), planifica deducciones y revisa obligación de declarar.</li>
      <li>Usa plataformas y simuladores SUNAT para evitar errores.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>En 2025, la Renta de Cuarta Categoría sigue siendo clave para independientes. Con UIT de <strong>S/ 5,350</strong>, cambian límites y montos. La clave: proyectar ingresos, aprovechar deducciones (20% + 7 UIT), solicitar suspensión cuando aplique, emitir correctamente recibos electrónicos y presentar tu declaración anual. Así, pagas lo justo y evitas contingencias.</p>
  `,
    projectUrl: "",
  },
  {
    slug: "impuesto-renta-tercera-categoria-2025",
    title:
      "Impuesto a la Renta de Tercera Categoría en el Perú: Guía Completa 2025",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-10",
    shortDescription:
      "Conoce todo sobre el Impuesto a la Renta de Tercera Categoría en 2025: sujetos obligados, tasas, deducciones, pagos a cuenta, beneficios y cambios normativos vigentes.",
    mainImage: "/images/noticias/noticia_11/mainImage.webp",
    categories: [Category.Tributacion],
    content: `
    <p>
      El <strong>Impuesto a la Renta (IR)</strong> constituye una de las principales fuentes de financiamiento del Estado peruano.
      En particular, la <strong>Tercera Categoría</strong> grava las utilidades generadas por las empresas y negocios 
      que desarrollan actividades empresariales en el país.
    </p>

    <h3>1. Concepto y base legal</h3>
    <p>
      Este impuesto recae sobre las rentas netas obtenidas por actividades empresariales, 
      es decir, las utilidades que resultan después de restar los costos y gastos deducibles.
    </p>
    <ul>
      <li><strong>TUO de la Ley del Impuesto a la Renta</strong> – Decreto Supremo N.º 179-2004-EF.</li>
      <li><strong>Reglamento</strong> – Decreto Supremo N.º 122-94-EF.</li>
      <li>Normas complementarias y resoluciones emitidas por la SUNAT.</li>
    </ul>

    <h3>2. Sujetos obligados</h3>
    <p>Están sujetos al impuesto los contribuyentes que generan rentas de tipo empresarial:</p>
    <ul>
      <li>Sociedades comerciales (S.A., S.R.L., etc.).</li>
      <li>Empresas Individuales de Responsabilidad Limitada (EIRL).</li>
      <li>Sucursales de empresas extranjeras.</li>
      <li>Asociaciones y fundaciones con actividad empresarial.</li>
      <li>Personas naturales que desarrollan actividad empresarial bajo el <strong>Régimen General</strong> o el <strong>RMT</strong>.</li>
    </ul>

    <h3>3. Determinación de la renta neta</h3>
    <ul>
      <li><strong>Ingresos brutos:</strong> ventas, servicios, ganancias de capital e ingresos financieros.</li>
      <li><strong>Renta bruta:</strong> ingresos menos costo de ventas.</li>
      <li><strong>Renta neta:</strong> renta bruta menos gastos deducibles (sueldos, alquileres, depreciación, etc.).</li>
      <li><strong>Ajustes:</strong> diferencias temporales o permanentes según normas contables y tributarias.</li>
      <li><strong>Participación en utilidades:</strong> deducción obligatoria previa al cálculo del impuesto.</li>
    </ul>

    <h3>4. Tasas aplicables</h3>
    <h4>Régimen General</h4>
    <p>Tasa única del <strong>29.5%</strong> sobre la renta neta imponible.</p>

    <h4>Régimen MYPE Tributario (RMT)</h4>
    <ul>
      <li>Ingresos anuales hasta 1,700 UIT (S/ 9,180,000 para 2025).</li>
      <li>Para los primeros 15 UIT de utilidad neta: <strong>10%</strong>.</li>
      <li>Exceso: <strong>29.5%</strong>.</li>
    </ul>

    <h4>Beneficios especiales</h4>
    <ul>
      <li>Amazonía: tasa reducida de <strong>10% o 5%</strong> según actividad.</li>
      <li>Agrario, acuícola y forestal: <strong>15%</strong>.</li>
      <li>Zonas económicas especiales y de frontera: exoneraciones parciales o totales.</li>
    </ul>

    <h3>5. Pagos a cuenta</h3>
    <p>
      Durante el año, las empresas deben realizar pagos mensuales a cuenta del impuesto anual:
    </p>
    <ul>
      <li><strong>Coeficiente:</strong> se calcula sobre la base del resultado del ejercicio anterior.</li>
      <li><strong>Sistema fijo:</strong> 1.5% de los ingresos netos mensuales.</li>
      <li><strong>RMT:</strong> si los ingresos no superan 300 UIT, el pago mensual es del 1%.</li>
    </ul>

    <h3>6. Créditos tributarios</h3>
    <ul>
      <li>Saldos a favor de ejercicios anteriores.</li>
      <li>Pagos a cuenta, retenciones y percepciones.</li>
      <li>Impuesto pagado en el extranjero (hasta tasa media).</li>
      <li>Crédito del ITAN.</li>
    </ul>

    <h3>7. Compensación de pérdidas</h3>
    <ul>
      <li><strong>Sistema A:</strong> arrastre hasta por 4 ejercicios.</li>
      <li><strong>Sistema B:</strong> compensación con el 50% de utilidades de ejercicios futuros sin límite de años.</li>
    </ul>

    <h3>8. Declaración jurada anual</h3>
    <ul>
      <li><strong>Formulario Virtual N.º 710</strong> (simplificado o completo).</li>
      <li><strong>Plazos:</strong> según cronograma SUNAT (marzo–abril 2025).</li>
      <li>Debe incluir balance de comprobación, estados financieros y libros contables.</li>
    </ul>

    <h3>9. Sanciones y fiscalización</h3>
    <p>
      El incumplimiento de la declaración o el pago oportuno genera multas, intereses y fiscalización por parte de SUNAT.
    </p>

    <h3>10. Cambios relevantes al 2025</h3>
    <ul>
      <li>UIT fijada en <strong>S/ 5,400</strong>.</li>
      <li>Entrada en vigencia del <strong>SIRE</strong> (Sistema Integrado de Registros Electrónicos) desde enero 2025.</li>
      <li>Mayor fiscalización sobre crédito fiscal y gastos no fehacientes.</li>
      <li>Ajustes en beneficios para sectores agrario y acuícola.</li>
    </ul>

    <h3>11. Estrategias de cumplimiento</h3>
    <ul>
      <li>Implementar control contable electrónico.</li>
      <li>Identificar gastos deducibles y no deducibles.</li>
      <li>Elegir el régimen tributario más conveniente.</li>
      <li>Simular pagos a cuenta para evitar diferencias al cierre.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      El <strong>Impuesto a la Renta de Tercera Categoría</strong> es un pilar de la tributación empresarial en el Perú. 
      Cumplir con sus obligaciones y planificar adecuadamente la carga tributaria permite a las empresas 
      evitar sanciones y mejorar su gestión financiera.
    </p>
    <p>
      Con la entrada del <strong>SIRE</strong> y una mayor fiscalización, la transparencia contable será clave para un 2025 más eficiente y ordenado.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "rentas-de-segunda-categoria-peru-guia-venta-inmuebles-2025",
    title:
      "Rentas de Segunda Categoría en el Perú: Guía Completa sobre el Impuesto en la Venta de Inmuebles y Otras Operaciones",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-09",
    shortDescription:
      "Guía clara de las rentas de segunda categoría con foco en venta de inmuebles: cuándo aplica, exoneraciones (casa habitación), cómo calcular la ganancia y declarar con el FV 1665.",
    mainImage: "/images/noticias/noticia_12/mainImage.webp",
    categories: [Category.Tributacion, Category.Finanzas],
    content: `
    <p>
      El sistema peruano clasifica los ingresos de personas naturales por categorías. Las <strong>rentas de segunda categoría</strong> 
      abarcan ganancias de capital y otros ingresos ocasionales no derivados de trabajo ni de actividad empresarial. 
      La <strong>venta de inmuebles</strong> es el caso más frecuente y, si se cumplen ciertas condiciones, paga un impuesto del <strong>5%</strong> sobre la ganancia.
    </p>

    <h3>1. ¿Qué son las rentas de segunda categoría?</h3>
    <p>Según el <em>art. 24 del TUO de la Ley del IR</em>, incluyen:</p>
    <ul>
      <li><strong>Ganancias de capital:</strong> venta de inmuebles sin habitualidad, enajenación de valores, cesión temporal de derechos.</li>
      <li><strong>Cesión de intangibles:</strong> marcas, patentes, derechos de autor, concesiones.</li>
      <li><strong>Ingresos financieros:</strong> intereses entre particulares, ciertos depósitos, <strong>dividendos</strong> y utilidades.</li>
    </ul>

    <h3>2. Venta de inmuebles: cuándo paga impuesto</h3>
    <p>Paga 5% sobre la <em>ganancia de capital</em> si se cumplen todos estos supuestos:</p>
    <ul>
      <li>El inmueble fue <strong>adquirido desde el 01.01.2004</strong>.</li>
      <li><strong>No</strong> es <em>casa habitación</em> del vendedor.</li>
      <li>Existe <strong>ganancia</strong> (valor de venta &gt; costo computable).</li>
      <li><strong>No hay habitualidad</strong> (si la hay, pasa a 3.ª categoría).</li>
    </ul>

    <h4>2.1 ¿Cómo se calcula la ganancia?</h4>
    <p><strong>Ganancia = Precio de venta – Costo computable</strong> (valor de adquisición ajustado por el índice de corrección monetaria).</p>
    <p><em>Ejemplo:</em> Compra 2008: S/ 200,000; índice 1.20 → costo: S/ 240,000. Venta 2025: S/ 300,000. Ganancia: S/ 60,000. Impuesto: 5% = S/ 3,000.</p>

    <h4>2.2 Exoneraciones y casos sin pago</h4>
    <ul>
      <li><strong>Adquiridos antes del 01.01.2004:</strong> no gravan.</li>
      <li><strong>Casa habitación:</strong> propiedad ≥ 2 años; uso no comercial; aplica también si fue heredado.</li>
      <li><strong>Sin ganancia:</strong> si el precio ≤ costo computable.</li>
      <li><strong>Habitualidad:</strong> desde la tercera venta en el año se considera 3.ª categoría (ya no 5%).</li>
    </ul>

    <h4>2.3 Notario y control</h4>
    <p>Para elevar la escritura y registrar la compraventa, el notario exige:</p>
    <ul>
      <li>El <strong>Formulario Virtual 1665</strong> (pago del impuesto), o</li>
      <li>Una <strong>Comunicación Jurada</strong> si no corresponde pagar.</li>
    </ul>

    <h3>3. Marco normativo</h3>
    <ul>
      <li><strong>TUO de la Ley del IR</strong> – DS N.º 179-2004-EF.</li>
      <li><strong>Reglamento</strong> – DS N.º 122-94-EF.</li>
      <li>Resoluciones SUNAT sobre procedimientos y formularios (p.ej., <strong>FV 1665</strong>).</li>
      <li><strong>Tasa vigente:</strong> 5% para venta de inmuebles (desde 2009; antes 6.25%).</li>
    </ul>

    <h3>4. Declaración y pago</h3>
    <h4>4.1 Plazo</h4>
    <p>Declarar y pagar <strong>hasta el mes siguiente</strong> de percibir el ingreso (cobro o cancelación).</p>
    <h4>4.2 Formularios</h4>
    <ul>
      <li><strong>FV 1665 (SUNAT Virtual):</strong> declara y paga en un paso.</li>
      <li><strong>1662 – Boleta de Pago:</strong> primero se paga en banco y luego se declara en el 1665 consignando el pago.</li>
      <li><strong>PDT 617:</strong> cuando el vendedor es <em>no domiciliado</em> (retiene el comprador).</li>
    </ul>

    <h3>5. Otras rentas de segunda categoría</h3>
    <ul>
      <li><strong>Dividendos y utilidades:</strong> 5% (retención en la fuente).</li>
      <li><strong>Intereses y regalías:</strong> tasa efectiva 5% sobre ingreso bruto.</li>
      <li><strong>Cesión de derechos</strong> (llave, marcas, patentes, fórmulas, etc.).</li>
      <li><strong>Enajenación/rescate de valores</strong> (acciones, bonos, certificados de participación).</li>
    </ul>

    <h3>6. Habitualidad en inmuebles</h3>
    <p>La SUNAT presume habitualidad <strong>desde la tercera venta</strong> en un año calendario. En tal caso, tributa como 3.ª categoría:</p>
    <ul>
      <li><strong>RMT:</strong> 10% sobre los primeros 15 UIT de utilidad; exceso 29.5%.</li>
      <li><strong>Régimen General:</strong> 29.5%.</li>
    </ul>

    <h3>7. Paso a paso</h3>
    <ol>
      <li>Verifica si la operación está gravada (año de adquisición, casa habitación, existencia de ganancia).</li>
      <li>Calcula la ganancia: venta – costo computable (ajustado).</li>
      <li>Aplica <strong>5%</strong> y declara/paga con <strong>FV 1665</strong> dentro del plazo.</li>
      <li>Entrega al notario el comprobante o la comunicación jurada.</li>
    </ol>

    <h3>8. Ejemplos</h3>
    <ul>
      <li><strong>Gravada:</strong> compra 2015 S/ 250,000; venta 2025 S/ 350,000 → ganancia S/ 100,000 → impuesto S/ 5,000.</li>
      <li><strong>Casa habitación:</strong> compra 2010 S/ 200,000; venta 2025 S/ 500,000; uso ≥ 2 años → exonerado.</li>
      <li><strong>Sin ganancia:</strong> compra 2016 S/ 300,000; venta 2025 S/ 280,000 → no paga.</li>
    </ul>

    <h3>9. Preguntas frecuentes</h3>
    <ul>
      <li><strong>¿Y si no pago a tiempo?</strong> Intereses y multas por omisión.</li>
      <li><strong>¿Puedo fraccionar?</strong> Sí, vía mecanismos de fraccionamiento (p.ej., RAF/RESIT).</li>
      <li><strong>¿Inmueble heredado?</strong> Costo del causante; puede aplicar exoneración por casa habitación.</li>
      <li><strong>¿El notario verifica?</strong> Sí, sin constancia no eleva la escritura.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      Conocer las reglas de la <strong>segunda categoría</strong>—especialmente en venta de inmuebles— evita contingencias y permite aprovechar exoneraciones. 
      Determina si la operación está gravada, calcula bien la ganancia y cumple los plazos de declaración y pago para una compraventa segura.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "renta-de-primera-categoria-peru-guia-2025",
    title:
      "Renta de Primera Categoría en Perú: Guía clara y completa para contribuyentes",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-05",
    shortDescription:
      "Todo sobre la Renta de Primera Categoría: qué ingresos califica, cómo se calcula (5% efectivo), formularios, plazos, multas y ejemplos prácticos para 2025.",
    mainImage: "/images/noticias/noticia_13/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      En el Perú, el Impuesto a la Renta clasifica los ingresos en cinco categorías. 
      La <strong>Primera Categoría</strong> grava las rentas por <em>arrendamiento, subarrendamiento, cesión temporal o gratuita</em> de bienes muebles e inmuebles, 
      además de las <strong>mejoras no reembolsables</strong> que queden a favor del propietario.
    </p>

    <h3>1. Marco legal</h3>
    <ul>
      <li><strong>TUO de la Ley del Impuesto a la Renta</strong> – DS N.º 179-2004-EF.</li>
      <li><strong>Reglamento</strong> – DS N.º 122-94-EF.</li>
      <li><strong>Resoluciones de Superintendencia SUNAT</strong> (p. ej., aprobación del <strong>Formulario Virtual 1683</strong> y cronogramas de pago).</li>
    </ul>

    <h3>2. ¿Qué ingresos califican como Primera Categoría?</h3>
    <h4>2.1 Arrendamiento de inmuebles</h4>
    <p>Alquiler de casas, departamentos, locales, terrenos o estacionamientos.</p>
    <h4>2.2 Subarrendamiento</h4>
    <p>Tributa la <em>diferencia</em> entre lo cobrado al subarrendatario y lo pagado al propietario.</p>
    <h4>2.3 Cesión gratuita de inmuebles (renta ficta)</h4>
    <p>Si cedes gratis, se presume renta anual de <strong>6% del autoavalúo</strong> (predial).</p>
    <h4>2.4 Cesión de bienes muebles</h4>
    <p>Aplica renta presunta de <strong>8% del valor actualizado</strong> si lo pactado es inferior.</p>
    <h4>2.5 Mejoras no reembolsables</h4>
    <p>El valor de la mejora recibida por el propietario constituye renta en el año de la devolución.</p>

    <h3>3. Sujetos obligados</h3>
    <ul>
      <li>Propietarios o copropietarios que arrienden o cedan bienes.</li>
      <li>Arrendatarios que <strong>subarrienden</strong>.</li>
      <li>Cesionarios de derechos (usufructo, superficie, servidumbres).</li>
    </ul>
    <p><em>Nota:</em> La obligación persiste aunque el inquilino no pague, salvo resolución o desalojo acreditado.</p>

    <h3>4. ¿Cómo se calcula el impuesto?</h3>
    <h4>4.1 Método estándar</h4>
    <ul>
      <li><strong>Renta Bruta (RB)</strong>: el alquiler pactado o la renta presunta/ficta.</li>
      <li><strong>Deducción 20%</strong> (gasto de mantenimiento).</li>
      <li><strong>Renta Neta (RN)</strong> = RB – 20%.</li>
      <li><strong>Impuesto</strong> = RN × 6.25%.</li>
    </ul>
    <h4>4.2 Método simplificado (tasa efectiva)</h4>
    <p><strong>Impuesto = RB × 5%</strong>.</p>

    <h4>4.3 Ejemplo práctico</h4>
    <p>Alquiler mensual S/ 2,000 → anual S/ 24,000.</p>
    <ul>
      <li><strong>Estándar:</strong> RN = 24,000 – 20% = 19,200; IR = 19,200 × 6.25% = <strong>S/ 1,200</strong>.</li>
      <li><strong>Simplificado:</strong> IR = 24,000 × 5% = <strong>S/ 1,200</strong>.</li>
    </ul>

    <h3>5. Declaración y pago</h3>
    <h4>5.1 Pagos mensuales</h4>
    <p>Se realizan con el <strong>FV 1683</strong> (SUNAT Virtual) según cronograma por último dígito de RUC.</p>
    <h4>5.2 Declaración jurada anual</h4>
    <p>Corresponde si hay saldo, renta ficta o mejoras no reembolsadas (se compensan pagos a cuenta).</p>
    <h4>5.3 Canales de pago</h4>
    <ul>
      <li>Págalo.pe (Banco de la Nación) y portales de bancos (BBVA, BCP, Scotiabank, Interbank, BanBif).</li>
      <li>Agentes/ventanillas; SUNAT Virtual con tarjeta o apps (Yape/Plin).</li>
    </ul>

    <h3>6. Multas y sanciones</h3>
    <ul>
      <li>Multa por no declarar o declarar fuera de plazo: <strong>50% de la UIT</strong> (referencial 2025).</li>
      <li>Intereses moratorios por cada día de retraso.</li>
      <li>Ejecución coactiva ante omisiones reiteradas.</li>
    </ul>

    <h3>7. Casos prácticos</h3>
    <h4>7.1 Renta ficta por cesión gratuita</h4>
    <p>Autoavalúo S/ 150,000 → 6% = S/ 9,000 → IR = 9,000 × 5% = <strong>S/ 450</strong>.</p>
    <h4>7.2 Subarrendamiento</h4>
    <p>Paga al propietario S/ 2,000 y cobra S/ 2,800 → diferencia S/ 800/mes (S/ 9,600/año) → IR = 9,600 × 5% = <strong>S/ 480</strong>.</p>
    <h4>7.3 Mejoras no reembolsadas</h4>
    <p>Valor S/ 40,000 → IR = 40,000 × 5% = <strong>S/ 2,000</strong> (en el ejercicio de devolución).</p>

    <h3>8. Preguntas frecuentes</h3>
    <ul>
      <li><strong>¿Puedo deducir otros gastos?</strong> No; solo el 20% por mantenimiento.</li>
      <li><strong>¿Contrato sin registro?</strong> Igual hay obligación: SUNAT mira el <em>beneficio económico</em>.</li>
      <li><strong>¿Alquilo solo 2 meses?</strong> Se declara de forma proporcional.</li>
      <li><strong>¿Recibos por honorarios?</strong> No aplican; se usa el <strong>FV 1683</strong>.</li>
      <li><strong>¿Alquilo a una empresa?</strong> La empresa <strong>retiene 5%</strong> y entrega constancia.</li>
    </ul>

    <h3>9. Comparación rápida</h3>
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Tipo de ingreso</th>
          <th>Tasa</th>
          <th>Declaración</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1.ª</td>
          <td>Arrendamientos y cesiones</td>
          <td>5% sobre bruto (o 6.25% sobre RN)</td>
          <td>Mensual + posible anual</td>
        </tr>
        <tr>
          <td>2.ª</td>
          <td>Ganancias de capital, dividendos</td>
          <td>5%</td>
          <td>Según operación</td>
        </tr>
        <tr>
          <td>4.ª</td>
          <td>Servicios profesionales</td>
          <td>Escala</td>
          <td>Mensual + anual</td>
        </tr>
        <tr>
          <td>5.ª</td>
          <td>Trabajo dependiente</td>
          <td>Escala</td>
          <td>Retención por empleador</td>
        </tr>
      </tbody>
    </table>

    <h3>10. Recomendaciones</h3>
    <ul>
      <li>Formaliza el contrato (fecha, monto, moneda, reajustes, garantías y plazos).</li>
      <li>Declara a tiempo aunque no hayas cobrado.</li>
      <li>Conserva los <strong>FV 1683</strong> y constancias de retención.</li>
      <li>Para cesión gratuita, calcula la renta ficta (6% del autoavalúo).</li>
      <li>Revisa cada año el cronograma SUNAT por dígito de RUC.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      La <strong>Renta de Primera Categoría</strong> es directa y predecible si aplicas el 5% sobre la renta bruta y cumples los plazos. 
      Una gestión ordenada evita sanciones y fortalece la formalidad del mercado de alquileres.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "impuesto-a-la-renta-peru-guia-completa-personas-empresas-2025",
    title:
      "Impuesto a la Renta en el Perú: Guía completa para personas y empresas",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-04",
    shortDescription:
      "Resumen práctico del Impuesto a la Renta 2025: quiénes pagan, categorías, tasas para personas y empresas, deducciones, regímenes y obligaciones ante SUNAT.",
    mainImage: "/images/noticias/noticia_14/mainImage.webp",
    categories: [Category.Tributacion, Category.Economia],
    content: `
    <p>
      El <strong>Impuesto a la Renta (IR)</strong> es uno de los pilares del sistema tributario peruano. 
      Grava las rentas obtenidas por <strong>personas naturales</strong> y <strong>personas jurídicas</strong>, 
      constituyendo una fuente esencial de financiamiento público.
    </p>

    <h3>1) ¿Qué es y a quiénes alcanza?</h3>
    <p>
      El IR se aplica a las rentas de <em>fuente peruana</em> y, si eres <strong>domiciliado</strong>, también a las de fuente extranjera. 
      Abarca trabajadores dependientes e independientes, propietarios que arriendan, inversionistas y empresas.
    </p>

    <h3>2) Principios y características</h3>
    <ul>
      <li><strong>Periodicidad anual</strong> (1 de enero–31 de diciembre).</li>
      <li><strong>Personal y directo</strong>: según capacidad contributiva, grava la renta en el contribuyente.</li>
      <li><strong>Progresivo</strong> para personas naturales; <strong>obligatorio</strong> y fiscalizado por SUNAT.</li>
    </ul>

    <h3>3) Categorías de renta</h3>
    <ul>
      <li><strong>1.ª</strong>: alquileres y subarrendamientos de inmuebles.</li>
      <li><strong>2.ª</strong>: ganancias de capital, dividendos, intereses, regalías, etc.</li>
      <li><strong>3.ª</strong>: rentas empresariales (comercio, servicios, industria, etc.).</li>
      <li><strong>4.ª</strong>: trabajo independiente (honorarios).</li>
      <li><strong>5.ª</strong>: trabajo dependiente (planilla).</li>
    </ul>

    <h3>4) Domicilio fiscal y fuente</h3>
    <ul>
      <li><strong>Domiciliado</strong>: tributa por rentas de fuente peruana y extranjera.</li>
      <li><strong>No domiciliado</strong>: solo por rentas de fuente peruana (tasas fijas según renta).</li>
    </ul>

    <h3>5) Tasas principales (2025)</h3>
    <h4>Personas naturales (rentas del trabajo 4.ª/5.ª)</h4>
    <p>Escala progresiva: 8%, 14%, 17%, 20% y 30% por tramos. <em>UIT 2025 referencial: S/ 5,350.</em></p>
    <h4>Personas jurídicas</h4>
    <ul>
      <li><strong>Tasa general</strong>: 29.5% sobre renta neta.</li>
      <li><strong>Dividendos distribuidos</strong>: 5%.</li>
      <li><strong>Régimen MYPE Tributario</strong>: 10% hasta 15 UIT de utilidad; exceso 29.5%.</li>
    </ul>
    <h4>No domiciliados</h4>
    <p>Tasas típicas entre <strong>4.99% y 30%</strong> según tipo de renta (intereses, regalías, servicios, etc.).</p>

    <h3>6) Cálculo para personas naturales (ejemplo)</h3>
    <ol>
      <li><strong>Renta neta</strong> = ingresos anuales – deducciones (7 UIT + hasta 3 UIT adicionales por alquiler, intereses hipotecarios, salud, honorarios).</li>
      <li><strong>Aplicar escala</strong> progresiva sobre la renta neta imponible.</li>
      <li><strong>Pago</strong> vía retenciones/anticipos y ajuste en la DJ anual.</li>
    </ol>

    <h3>7) Cálculo para empresas (ejemplo)</h3>
    <ol>
      <li><strong>Renta neta imponible</strong> = ingresos – gastos deducibles – pérdidas arrastrables.</li>
      <li><strong>Impuesto</strong> = renta neta × 29.5%.</li>
      <li><strong>Pagos a cuenta</strong> mensuales durante el ejercicio (coeficiente o sistema fijo/RMT).</li>
    </ol>

    <h3>8) Deducciones personas naturales</h3>
    <p>
      Además de las <strong>7 UIT</strong> automáticas, se pueden deducir <strong>hasta 3 UIT</strong> adicionales 
      (alquiler de vivienda, intereses hipotecarios primera vivienda, servicios profesionales, salud/seguros aprobados).
    </p>

    <h3>9) Regímenes tributarios empresariales</h3>
    <ul>
      <li><strong>Nuevo RUS</strong>: micro negocios (límite anual bajo).</li>
      <li><strong>RER</strong>: hasta S/ 525,000 anuales.</li>
      <li><strong>RMT</strong>: micro y pequeñas empresas.</li>
      <li><strong>Régimen General</strong>: medianas y grandes.</li>
    </ul>

    <h3>10) Declaración y pago</h3>
    <ul>
      <li><strong>DJ Anual</strong>: marzo–abril según cronograma SUNAT (último dígito de RUC/DNI).</li>
      <li><strong>Personas naturales</strong>: Formulario Virtual <strong>709</strong>.</li>
      <li><strong>Empresas</strong>: Formulario Virtual <strong>710</strong>.</li>
      <li><strong>Pagos a cuenta</strong> mensuales para empresas durante el año.</li>
    </ul>

    <h3>11) Fiscalización y sanciones</h3>
    <p>
      SUNAT cruza información bancaria, notarial y financiera. El incumplimiento puede acarrear 
      <strong>multas</strong>, <strong>intereses</strong>, <strong>cobranza coactiva</strong> e incluso 
      <strong>denuncias penales</strong> en casos de evasión dolosa.
    </p>

    <h3>12) Evasión vs. elusión</h3>
    <ul>
      <li><strong>Evasión</strong>: ocultamiento/falseamiento de información (ilegal).</li>
      <li><strong>Elusión</strong>: uso de vacíos legales (límite: normas antiabuso y sustancia económica).</li>
    </ul>

    <h3>13) Beneficios de cumplir</h3>
    <ul>
      <li>Mejor acceso a <strong>crédito</strong> y financiamiento.</li>
      <li>Participación en <strong>licitaciones</strong> públicas.</li>
      <li>Evitar sanciones y mantener <strong>historial tributario</strong> limpio.</li>
    </ul>

    <h3>14) Transformación digital</h3>
    <p>
      SUNAT impulsa <strong>comprobantes y declaraciones electrónicas</strong> y refuerza 
      <strong>cruces automáticos</strong> para combatir la evasión y facilitar el cumplimiento.
    </p>

    <h3>Preguntas frecuentes</h3>
    <ul>
      <li><strong>¿Quiénes declaran?</strong> Personas naturales que superen umbrales y todas las empresas domiciliadas; 
      no domiciliados por rentas de fuente peruana.</li>
      <li><strong>¿Plazo de la DJ?</strong> Entre marzo y abril, según cronograma SUNAT.</li>
      <li><strong>¿Cómo reducir legalmente el IR?</strong> Planificación tributaria, uso de deducciones, contabilidad ordenada y asesoría profesional.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      Conocer categorías, tasas, deducciones y obligaciones del IR permite <strong>cumplir correctamente</strong> y 
      optimizar la carga fiscal dentro de la ley. En un entorno cada vez más digital y fiscalizado, 
      la <strong>planificación</strong> y la <strong>transparencia</strong> son ventajas competitivas.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "sunafil-politica-salarial-20-dias-habiles-obligacion-2025",
    title:
      "¿Ya enviaste tu política salarial? Sunafil da 20 días hábiles para cumplir con la obligación",
    author: {
      name: "Monica Romero",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-04",
    shortDescription:
      "Sunafil notificó a más de 18 mil empresas para presentar su política salarial en un plazo de 20 días hábiles. El incumplimiento puede generar multas por infracción muy grave.",
    mainImage: "/images/noticias/noticia_15/mainImage.webp",
    categories: [Category.Laboral],
    content: `
    <p>
      La <strong>Superintendencia Nacional de Fiscalización Laboral (Sunafil)</strong> 
      envió <strong>18,226 cartas inductivas</strong> a igual número de empresas en todo el país 
      para que presenten su <strong>política salarial</strong> formal y evidencia de haberla comunicado a sus trabajadores. 
      El objetivo es <strong>prevenir la discriminación salarial</strong> y fortalecer la igualdad remunerativa.
    </p>

    <h3>Plazo para cumplir</h3>
    <p>
      Las empresas tienen <strong>20 días hábiles</strong> contados desde la recepción de la carta en su 
      <em>casilla electrónica Sunafil</em> para enviar la documentación solicitada.
    </p>

    <h3>Alcance de la medida</h3>
    <ul>
      <li>Beneficiará a aproximadamente <strong>144,746 trabajadores</strong>.</li>
      <li>El <strong>90%</strong> pertenece a <strong>microempresas</strong> de los sectores comercio, servicios y enseñanza.</li>
      <li>Las cartas se enviaron a empresas <strong>activas y habidas</strong> en la PLAME, con cinco o más trabajadores.</li>
    </ul>

    <h3>Discriminación salarial</h3>
    <p>
      Sunafil recuerda que dar un trato salarial distinto a hombres y mujeres que cumplen las mismas funciones 
      y requisitos constituye una <strong>infracción muy grave</strong>, salvo cuando existan <strong>criterios objetivos</strong> 
      como experiencia, desempeño o responsabilidades diferentes.
    </p>

    <h3>¿Qué es la política salarial?</h3>
    <p>
      Es un documento interno que establece los <strong>criterios, condiciones y estructuras</strong> 
      usados para definir y revisar las remuneraciones del personal. 
      Debe ser <strong>formal, documentada y comunicada</strong> a los trabajadores.
    </p>
    <ul>
      <li>Escalas salariales por puesto o categoría.</li>
      <li>Criterios para incrementos o ajustes salariales.</li>
      <li>Condiciones de equidad y no discriminación.</li>
    </ul>

    <h3>Obligación ante Sunafil</h3>
    <ul>
      <li>Todas las empresas sujetas a fiscalización deben contar con una <strong>política salarial documentada</strong>.</li>
      <li>Si Sunafil solicita este documento, el empleador dispone de <strong>20 días hábiles</strong> para presentarlo.</li>
      <li>Debe incluir prueba de haber sido comunicada a los trabajadores.</li>
    </ul>

    <h3>Consecuencias del incumplimiento</h3>
    <p>
      No presentar la política salarial dentro del plazo puede generar <strong>multas administrativas</strong>, 
      cuya cuantía varía según el tipo de empresa (micro, pequeña, mediana o grande) y el número de trabajadores afectados.
    </p>
    <p>
      La falta constituye una <strong>infracción muy grave</strong> en materia de relaciones laborales.
    </p>

    <h3>Qué hacer ante el requerimiento</h3>
    <ul>
      <li><strong>Si ya la enviaste:</strong> guarda el cargo o acuse de recepción como prueba.</li>
      <li><strong>Si no la tienes:</strong> elabora o actualiza tu política salarial y preséntala dentro del plazo.</li>
      <li><strong>Si necesitas apoyo:</strong> consulta con un <strong>abogado laboral</strong> o <strong>consultor de RR.HH.</strong></li>
    </ul>

    <h3>Importancia de la medida</h3>
    <p>
      La igualdad salarial es un principio constitucional y parte de los compromisos internacionales del Perú 
      en materia de derechos laborales. Sunafil busca con esta acción promover la transparencia y la equidad 
      en las remuneraciones de los trabajadores.
    </p>

    <h3>Fuente</h3>
    <p><em>El Peruano – 01/09/2025</em></p>
  `,
    projectUrl: "",
  },
  {
    slug: "base-legal-igv-peru-analisis-tuo-reglamento-2025",
    title:
      "La Base Legal del IGV en el Perú: Análisis del TUO y su Reglamento para la Práctica Empresarial",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-09-02",
    shortDescription:
      "Guía práctica del IGV 2025: qué grava, quiénes son contribuyentes, base y tasa (18%), crédito fiscal, exportaciones y claves operativas del TUO (DS 055-99-EF) y su Reglamento (DS 29-94-EF).",
    mainImage: "/images/noticias/noticia_16/mainImage.webp",
    categories: [
      Category.Tributacion,
      Category.Contabilidad,
      Category.Economia,
    ],
    content: `
    <p>
      El <strong>Impuesto General a las Ventas (IGV)</strong> es el pilar de la imposición al consumo en el Perú. 
      Regula la venta interna de bienes, la prestación/uso de servicios, los contratos de construcción, la primera venta de inmuebles por el constructor y la importación de bienes.
    </p>

    <h3>1) Marco normativo base</h3>
    <ul>
      <li><strong>TUO de la Ley del IGV</strong> – <em>DS N.º 055-99-EF</em>: consolida las reglas sustantivas.</li>
      <li><strong>Reglamento de la Ley del IGV</strong> – <em>DS N.º 29-94-EF</em>: desarrolla definiciones, procedimientos y restricciones operativas.</li>
    </ul>

    <h3>2) Contexto y principios</h3>
    <ul>
      <li><strong>Neutralidad:</strong> el impuesto recae en el consumo final.</li>
      <li><strong>Traslación:</strong> el contribuyente lo cobra y lo entera al fisco.</li>
      <li><strong>Crédito fiscal:</strong> permite descontar el IGV de compras del IGV de ventas.</li>
    </ul>

    <h3>3) TUO del IGV (DS 055-99-EF)</h3>
    <h4>3.1 Hecho imponible</h4>
    <ul>
      <li>Venta de bienes muebles en el país.</li>
      <li>Prestación o <em>utilización</em> de servicios en el país.</li>
      <li>Contratos de construcción.</li>
      <li>Primera venta de inmuebles por el constructor.</li>
      <li>Importación de bienes.</li>
    </ul>

    <h4>3.2 Contribuyentes</h4>
    <p>Personas naturales con negocio, personas jurídicas, sociedades conyugales y sucesiones que realicen operaciones gravadas.</p>

    <h4>3.3 Base y tasa</h4>
    <p>
      <strong>Base imponible:</strong> valor de venta o importe del servicio. 
      <strong>Tasa:</strong> 16% IGV + 2% Impuesto de Promoción Municipal = <strong>18%</strong>.
    </p>

    <h4>3.4 Crédito fiscal</h4>
    <ul>
      <li><strong>Requisitos:</strong> comprobante válido, anotación oportuna, relación con operaciones gravadas y destino a la generación de renta.</li>
      <li><strong>Restricciones:</strong> adquisiciones para operaciones no gravadas o gastos no vinculados no otorgan crédito.</li>
    </ul>
    <p><em>Ejemplo:</em> IGV ventas = S/ 3,600; IGV compras = S/ 1,800 → a pagar = <strong>S/ 1,800</strong>.</p>

    <h4>3.5 Exportaciones</h4>
    <p>
      No están gravadas con IGV y <strong>generan saldo a favor</strong> del exportador, compensable con futuros tributos.
    </p>

    <h3>4) Reglamento del IGV (DS 29-94-EF)</h3>
    <h4>4.1 Alcance y definiciones</h4>
    <ul>
      <li>Precisa qué es “venta”, “servicio” y “construcción”.</li>
      <li>Servicios usados en el Perú están gravados aunque se ejecuten en el extranjero.</li>
      <li>Delimita la <strong>primera venta</strong> de inmuebles por el constructor.</li>
    </ul>

    <h4>4.2 Comprobantes de pago</h4>
    <ul>
      <li>Requisitos mínimos (RUC, identidad, detalle, base e IGV discriminado).</li>
      <li>Oportunidad de emisión y reglas para <strong>comprobantes electrónicos</strong>.</li>
    </ul>

    <h4>4.3 Crédito fiscal en detalle</h4>
    <ul>
      <li>Uso proporcional cuando hay operaciones gravadas y no gravadas.</li>
      <li>Plazos máximos para el uso del comprobante como sustento.</li>
      <li>Exclusiones específicas (gastos sin vinculación o destinados a operaciones exoneradas).</li>
    </ul>

    <h4>4.4 Exportación de servicios</h4>
    <p>
      Criterios de exportación: <em>aprovechamiento en el exterior</em>, contraprestación desde el extranjero, y demás requisitos reglamentarios.
    </p>

    <h3>5) Gestión empresarial: implicancias prácticas</h3>
    <ul>
      <li><strong>Registros electrónicos:</strong> control del Registro de Compras y Ventas y consistencia con declaraciones.</li>
      <li><strong>Servicios del exterior:</strong> verificar IGV por <em>utilización de servicios</em> en el país.</li>
      <li><strong>Exportadores:</strong> gestión del saldo a favor y sustentos de exportación.</li>
      <li><strong>Fiscalización:</strong> SUNAT revisa trazabilidad del crédito, validez de comprobantes y coherencia contable.</li>
    </ul>

    <h3>6) Casos de uso rápidos</h3>
    <ul>
      <li><strong>Venta local:</strong> TV S/ 2,000 → IGV S/ 360 → total S/ 2,360.</li>
      <li><strong>Exportación:</strong> textiles S/ 50,000 → no paga IGV; derecho a saldo a favor.</li>
      <li><strong>Servicio digital del exterior:</strong> publicidad online usada en Perú → IGV por utilización de servicios.</li>
    </ul>

    <h3>7) Notas sobre actualizaciones (hasta 2025)</h3>
    <ul>
      <li>Compilaciones recientes del TUO incorporan modificaciones previas (p. ej., ajustes para servicios digitales).</li>
      <li>Controles formales reforzados para el <strong>crédito fiscal</strong> (requisitos de comprobantes y registros).</li>
    </ul>

    <h3>Conclusiones</h3>
    <p>
      El <strong>TUO</strong> fija las reglas sustantivas (qué, quién y cuánto), mientras que el <strong>Reglamento</strong> 
      define el <em>cómo</em> (comprobantes, plazos, restricciones, casos especiales). 
      Dominar ambos textos es clave para optimizar el <strong>crédito fiscal</strong>, evitar sanciones y 
      sostener una gestión tributaria eficiente y defendible ante la SUNAT.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "liquidacion-beneficios-sociales-peru-2025",
    title:
      "Liquidación de beneficios sociales en el Perú: contenido obligatorio, cálculo y derechos del trabajador",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-08-28",
    shortDescription:
      "La liquidación debe entregarse dentro de 48 horas del cese. Incluye CTS, vacaciones, gratificación proporcional, remuneraciones pendientes e indemnización (si aplica), con descuentos previsionales y de renta.",
    mainImage: "/images/noticias/noticia_17/mainImage.webp",
    categories: [Category.Laboral],
    content: `
    <p>
      La <strong>liquidación de beneficios sociales</strong> es el documento que resume y sustenta los pagos que 
      el empleador adeuda al trabajador al finalizar el vínculo laboral. Su entrega es 
      <strong>obligatoria</strong> y debe realizarse en un <strong>máximo de 48 horas</strong> tras el cese.
    </p>

    <h3>1) ¿Qué es y por qué es obligatoria?</h3>
    <p>
      Es un instrumento <em>contable–legal</em> que materializa los derechos laborales acumulados (CTS, vacaciones, 
      gratificaciones, etc.). Aplica tanto en renuncia, vencimiento de contrato, mutuo disenso, como en despido.
    </p>

    <h3>2) Plazo legal</h3>
    <p>
      El empleador debe entregarla dentro de <strong>48 horas</strong> posteriores al cese. No hacerlo expone a 
      sanciones administrativas (SUNAFIL) y reclamos judiciales.
    </p>

    <h3>3) ¿Qué debe incluir?</h3>
    <ul>
      <li><strong>CTS</strong> devengada (proporcional a la fecha de cese).</li>
      <li><strong>Vacaciones</strong> pendientes (30 días) o <strong>truncas</strong> (proporcional si no completó el año).</li>
      <li><strong>Gratificación proporcional</strong> (meses completos del semestre en curso).</li>
      <li><strong>Remuneración pendiente</strong> del último periodo trabajado.</li>
      <li><strong>Indemnización por despido arbitrario</strong> cuando corresponda (ver sección 6.4).</li>
      <li><strong>Otros</strong>: asignación familiar, bonificaciones de convenio, utilidades no abonadas, etc.</li>
    </ul>

    <h3>4) Datos formales obligatorios</h3>
    <ul>
      <li>Nombre/RUC del empleador y datos del trabajador.</li>
      <li>Fecha de ingreso y <strong>fecha de cese</strong>; cargo y régimen laboral.</li>
      <li>Detalle y <strong>cálculo</strong> de cada concepto.</li>
      <li><strong>Descuentos</strong> aplicados (ONP/AFP, IR 5.ª si corresponde, otros autorizados).</li>
      <li>Firmas del representante y del trabajador (este puede firmar “bajo reserva”).</li>
    </ul>

    <h3>5) Descuentos permitidos</h3>
    <ul>
      <li><strong>Previsionales</strong>: ONP o AFP según afiliación.</li>
      <li><strong>Impuesto a la Renta de 5.ª</strong>: si corresponde por acumulado anual.</li>
      <li><strong>Autorizados</strong>: préstamos/adelantos con aceptación previa del trabajador.</li>
    </ul>

    <h3>6) Cómo se calculan los principales conceptos</h3>
    <h4>6.1 CTS</h4>
    <p>CTS = (Remuneración computable / 12) × meses completos + (Remuneración / 360) × días.</p>
    <h4>6.2 Vacaciones truncas</h4>
    <p>Vacaciones truncas = (Rem. computable / 12) × meses + (Rem. / 360) × días.</p>
    <h4>6.3 Gratificación proporcional</h4>
    <p>Gratificación = (Rem. computable / 6) × meses completos del semestre (enero–junio o julio–diciembre).</p>
    <h4>6.4 Indemnización por despido arbitrario</h4>
    <p>Indemnización = <strong>1.5</strong> × remuneración mensual × años de servicio (tope <strong>12 remuneraciones</strong>).</p>

    <h3>7) Ejemplo práctico</h3>
    <p><em>Datos:</em> Ingreso 01/01/2023; Cese 30/04/2024; Sueldo S/ 2,000; AFP 10%; Régimen general.</p>
    <ul>
      <li><strong>CTS</strong> (ene–abr): S/ 666.67</li>
      <li><strong>Vacaciones truncas</strong>: 4/12 × 2,000 = S/ 666.67</li>
      <li><strong>Gratificación prop.</strong> (ene–mar): 3/6 × 2,000 = S/ 1,000</li>
      <li><strong>Sueldo pendiente</strong> (abril): S/ 2,000</li>
      <li><strong>Total bruto</strong>: S/ 4,333.34</li>
      <li><strong>AFP 10%</strong> ref.: S/ 433.33</li>
      <li><strong>Total neto</strong>: S/ 3,900.01</li>
    </ul>

    <h3>8) Consecuencias de incumplir</h3>
    <ul>
      <li>Multas de <strong>SUNAFIL</strong> según tamaño de empresa y número de afectados.</li>
      <li>Intereses legales, costas y posible acción judicial.</li>
      <li>Riesgo reputacional y conflictos laborales.</li>
    </ul>

    <h3>9) Preguntas frecuentes</h3>
    <ul>
      <li><strong>¿Aplica en contratos temporales?</strong> Sí, todo vínculo laboral genera beneficios.</li>
      <li><strong>Si renuncio, ¿tengo indemnización?</strong> No; sí procede CTS, gratificación y vacaciones truncas.</li>
      <li><strong>¿Firmo sin pago?</strong> No es recomendable. Exigir documento y <em>depósito</em> conjunto.</li>
      <li><strong>No estoy de acuerdo</strong>: firmar “<em>bajo reserva</em>” y acudir a MTPE/SUNAFIL o vía judicial.</li>
    </ul>

    <h3>10) Buenas prácticas para empleadores</h3>
    <ul>
      <li>Preparar la liquidación <strong>antes</strong> del cese para cumplir las 48 horas.</li>
      <li>Detalle transparente de fórmulas, periodos y bases de cálculo.</li>
      <li>Entregar constancias de pago y retenciones.</li>
      <li>Guardar respaldos y comunicaciones internas de cierre.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      La liquidación de beneficios sociales asegura un cierre <strong>justo y legal</strong> de la relación laboral. 
      Entregarla en 48 horas, incluir todos los conceptos y documentar los cálculos es esencial para proteger derechos 
      del trabajador y reducir riesgos para la empresa.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "como-modificar-tipo-contribuyente-ruc-peru-2025",
    title: "¿Cómo modificar el tipo de contribuyente en tu RUC?",
    author: {
      name: "Monica Romero",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-08-28",
    shortDescription:
      "Modificar el tipo de contribuyente en el RUC (persona natural o jurídica) debe hacerse de forma presencial en los Centros de Servicios SUNAT o Centros MAC. Revisa los pasos y requisitos aquí.",
    mainImage: "/images/noticias/noticia_18/mainImage.webp",
    categories: [Category.Tributacion],
    content: `
    <p>
      Si necesitas <strong>modificar el tipo de contribuyente</strong> en tu RUC, recuerda que este trámite 
      <strong>solo puede hacerse de manera presencial</strong> en los Centros de Servicios SUNAT o en los 
      Centros MAC habilitados en distintas regiones del país.
    </p>

    <h3>¿Qué es el tipo de contribuyente?</h3>
    <p>
      El tipo de contribuyente define la <strong>forma jurídica o modalidad</strong> bajo la cual desarrollas tu negocio. 
      Puede ser como <strong>persona natural con negocio</strong> o como <strong>persona jurídica</strong> constituida 
      conforme a la <em>Ley General de Sociedades</em> u otras normas aplicables.
    </p>

    <h3>Tipos de contribuyente más comunes</h3>
    <ul>
      <li>Persona natural con negocio.</li>
      <li>Empresa Individual de Responsabilidad Limitada (E.I.R.L.).</li>
      <li>Sociedad Anónima (S.A.).</li>
      <li>Sociedad Anónima Abierta (S.A.A.).</li>
      <li>Sociedad Anónima Cerrada (S.A.C.).</li>
      <li>Sociedad Comercial de Responsabilidad Limitada (S.R.Ltda.).</li>
      <li>Instituciones públicas o gobiernos locales y regionales.</li>
    </ul>
    <p>Puedes revisar la lista completa en la <strong>Tabla Anexa N.º 2</strong> de la SUNAT.</p>

    <h3>Requisitos principales</h3>
    <ul>
      <li><strong>Si el negocio está inscrito en SUNARP:</strong> número de partida electrónica que indique la inscripción o transformación de la sociedad.</li>
      <li><strong>Si no está inscrito:</strong> original del documento que sustente la modificación (según Anexo 1 de la R.S. N.º 210-2004/SUNAT).</li>
      <li><strong>Documento de identidad original</strong> del titular o representante legal.</li>
      <li><strong>Si lo realiza un tercero:</strong> 
        <ul>
          <li>DNI vigente o documento de identidad del tercero.</li>
          <li>Formulario <strong>2127</strong> debidamente llenado y firmado por el representante legal.</li>
          <li>Autorización firmada por el contribuyente.</li>
        </ul>
      </li>
    </ul>

    <h3>Pasos para realizar el trámite</h3>
    <h4>Paso 1: Presenta los requisitos</h4>
    <p>
      Acércate al <strong>Centro de Servicios al Contribuyente (CSC)</strong> de SUNAT más cercano a tu domicilio fiscal 
      o en cualquiera de los <strong>Centros MAC</strong> (Piura, Cajamarca, Arequipa, Ventanilla, Lima Este, Lima Sur o Callao) 
      con los documentos señalados.
    </p>

    <h4>Paso 2: Obtén tu constancia</h4>
    <p>
      Una vez verificada la información, recibirás la <strong>Ficha Comprobante de Información Registrada (CIR)</strong> 
      debidamente sellada. Verifica que todos los datos estén correctos antes de retirarte.
    </p>

    <h3>Importante</h3>
    <ul>
      <li>Este trámite no puede hacerse por Internet.</li>
      <li>La modificación del tipo de contribuyente puede afectar tu <strong>régimen tributario</strong> (RUS, RER, RMT o Régimen General).</li>
      <li>Guarda tu CIR como prueba de actualización ante futuras fiscalizaciones.</li>
    </ul>

    <h3>Consejo útil</h3>
    <p>
      Si estás transformando tu negocio en una sociedad (por ejemplo, de persona natural a S.A.C.), 
      asegúrate de <strong>actualizar también tus libros electrónicos, cuentas bancarias y contratos</strong> 
      con el nuevo tipo de contribuyente para mantener coherencia legal y contable.
    </p>

    <h3>Conclusión</h3>
    <p>
      Modificar el tipo de contribuyente en tu RUC es un trámite sencillo, pero fundamental para 
      mantener actualizada tu información ante la <strong>SUNAT</strong>. 
      Realízalo presencialmente, presenta los documentos exigidos y conserva tu constancia de modificación 
      para acreditar la actualización de tu situación tributaria.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "estados-financieros-empresariales-radiografia-contable-2025",
    title:
      "Estados financieros empresariales: La radiografía contable que revela la salud y el futuro de tu negocio",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Contadora pública colegiada y consultora en normas NIIF, con más de 12 años de experiencia en auditoría y gestión financiera.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-08-27",
    shortDescription:
      "Los estados financieros son la radiografía económica de tu empresa. Conoce sus tipos, funciones, marco legal (NIIF y Ley General de Sociedades) y cómo interpretar sus resultados.",
    mainImage: "/images/noticias/noticia_19/mainImage.webp",
    categories: [Category.Contabilidad, Category.Economia],
    content: `
    <p>
      Los <strong>estados financieros empresariales</strong> son la radiografía contable que muestra la 
      verdadera salud económica de una organización. Reflejan cómo se utilizan los recursos, cuánto se gana, 
      cuánto se debe y cuál es la capacidad de la empresa para sostener su crecimiento.
    </p>

    <h3>1) ¿Qué son los estados financieros?</h3>
    <p>
      Son informes contables estandarizados que resumen la situación económica y financiera de una empresa 
      en un periodo determinado. Muestran activos, pasivos y patrimonio, así como los resultados, movimientos 
      de capital y flujos de efectivo.
    </p>
    <p>
      Funcionan como una <strong>herramienta de diagnóstico</strong> que permite responder preguntas clave: 
      ¿la empresa es rentable?, ¿tiene liquidez?, ¿puede cumplir con sus obligaciones?, ¿es atractiva para inversionistas?
    </p>

    <h3>2) Tipos principales de estados financieros</h3>
    <h4>2.1 Balance General o Estado de Situación Financiera</h4>
    <p>
      Resume lo que la empresa <strong>posee (activos)</strong>, <strong>debe (pasivos)</strong> y 
      <strong>vale (patrimonio)</strong> a una fecha específica. 
      Ejemplo: activos S/ 500,000, pasivos S/ 300,000 → patrimonio S/ 200,000.
    </p>

    <h4>2.2 Estado de Resultados o de Ganancias y Pérdidas</h4>
    <p>
      Mide si hubo utilidad o pérdida en un periodo determinado. 
      <strong>Fórmula:</strong> Ingresos – Costos – Gastos = Utilidad (o Pérdida). 
      Ejemplo: ventas S/ 1,000,000, costos S/ 700,000, gastos S/ 200,000 → utilidad S/ 100,000.
    </p>

    <h4>2.3 Estado de Cambios en el Patrimonio Neto</h4>
    <p>
      Explica variaciones en el capital contable: aportes, utilidades retenidas, distribución de dividendos y reservas. 
      Ejemplo: aportes +S/ 50,000, dividendos –S/ 30,000 → aumento neto S/ 20,000.
    </p>

    <h4>2.4 Estado de Flujos de Efectivo</h4>
    <p>
      Detalla los movimientos de dinero agrupados en tres actividades:
    </p>
    <ul>
      <li><strong>Operativas:</strong> ventas, pagos a proveedores y salarios.</li>
      <li><strong>Inversión:</strong> compra/venta de activos o inversiones.</li>
      <li><strong>Financiamiento:</strong> préstamos, pago de dividendos, emisión de acciones.</li>
    </ul>
    <p>
      Este estado muestra la liquidez real de la empresa: puede tener utilidades contables, 
      pero un flujo de efectivo negativo si no cobra a tiempo sus ventas.
    </p>

    <h3>3) Importancia estratégica</h3>
    <ul>
      <li><strong>Toma de decisiones:</strong> permiten evaluar rentabilidad y eficiencia operativa.</li>
      <li><strong>Acceso a crédito:</strong> son requisito para obtener financiamiento.</li>
      <li><strong>Confianza de inversionistas:</strong> muestran transparencia y sostenibilidad.</li>
      <li><strong>Cumplimiento tributario:</strong> respaldan declaraciones ante SUNAT.</li>
      <li><strong>Control interno:</strong> ayudan a detectar errores o desviaciones financieras.</li>
    </ul>

    <h3>4) Marco normativo peruano</h3>
    <ul>
      <li><strong>NIIF:</strong> adoptadas oficialmente como estándar contable.</li>
      <li><strong>Código de Comercio:</strong> exige contabilidad ordenada y verificable.</li>
      <li><strong>Ley General de Sociedades:</strong> obliga a presentar estados financieros anuales.</li>
      <li><strong>SUNAT y SMV:</strong> supervisan la presentación y coherencia de la información financiera.</li>
    </ul>

    <h3>5) Etapas de elaboración</h3>
    <ol>
      <li><strong>Recolección:</strong> registro de transacciones contables.</li>
      <li><strong>Ajustes:</strong> provisiones, depreciaciones y conciliaciones.</li>
      <li><strong>Preparación:</strong> estructuración de los cuatro estados principales.</li>
      <li><strong>Revisión/Auditoría:</strong> verificación de cumplimiento con NIIF.</li>
      <li><strong>Presentación:</strong> a socios, SUNAT, bancos o SMV.</li>
    </ol>

    <h3>6) Beneficios de tener estados financieros confiables</h3>
    <ul>
      <li>Mayor transparencia y control.</li>
      <li>Confianza de inversionistas y socios.</li>
      <li>Facilidad para acceder a créditos y licitaciones.</li>
      <li>Base sólida para estrategias de crecimiento.</li>
      <li>Prevención de sanciones tributarias y errores contables.</li>
    </ul>

    <h3>7) Consecuencias de no llevarlos adecuadamente</h3>
    <ul>
      <li>Multas y sanciones por parte de la SUNAT.</li>
      <li>Pérdida de acceso a financiamiento formal.</li>
      <li>Falta de información real para decisiones estratégicas.</li>
      <li>Riesgo de insolvencia o quiebra por mala gestión financiera.</li>
    </ul>

    <h3>8) Estados financieros en las Mypes</h3>
    <p>
      Aunque muchas micro y pequeñas empresas no están obligadas a auditarlos, 
      mantenerlos actualizados es esencial para profesionalizar la gestión, acceder a créditos 
      y participar en procesos de contratación pública.
    </p>

    <h3>9) Estados financieros proyectados</h3>
    <p>
      Además de los históricos, existen los <strong>proyectados</strong>, que estiman 
      resultados futuros. Son claves para evaluar inversiones, planes de expansión 
      y escenarios económicos diversos.
    </p>

    <h3>10) Ejemplo práctico</h3>
    <p>
      Una empresa muestra utilidades de S/ 80,000, pero su flujo de efectivo es negativo 
      porque gran parte de las ventas no se cobraron. Aunque parece rentable, 
      su liquidez está comprometida: los estados financieros actúan como una 
      <strong>alerta temprana</strong>.
    </p>

    <h3>11) Retos actuales</h3>
    <ul>
      <li><strong>Digitalización:</strong> adopción de sistemas contables electrónicos (SIRE SUNAT).</li>
      <li><strong>Normas internacionales:</strong> necesidad de actualización constante en NIIF.</li>
      <li><strong>Fiscalización intensiva:</strong> mayor exigencia documental por parte de SUNAT.</li>
      <li><strong>Formalización:</strong> en Mypes, persistente falta de cultura contable.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      Los <strong>estados financieros</strong> son mucho más que un requisito contable. 
      Constituyen la columna vertebral de la gestión moderna, pues revelan la 
      <strong>salud, eficiencia y proyección</strong> de cualquier empresa. 
      Con ellos, las decisiones se basan en datos y no en suposiciones.
    </p>
    <p>
      En un entorno donde la fiscalización y la competencia aumentan, 
      llevar estados financieros claros y confiables es clave para asegurar 
      el futuro y la sostenibilidad del negocio.
    </p>
  `,
    projectUrl: "",
  },
  {
    slug: "factoring-peru-liquidez-inmediata-sin-endeudarte-2025",
    title:
      "Factoring en el Perú: cómo obtener liquidez inmediata sin endeudarte ✅",
    author: {
      name: "Maira Alva García",
      image: "/images/noticias/autores/authorPlaceholder.webp",
      comment:
        "Abogada tributarista con 15 años de experiencia en asesoría fiscal y litigio.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://pe.linkedin.com/",
        twitter: "https://x.com/?lang=es",
        whatsapp: "https://web.whatsapp.com/",
      },
    },
    pubDate: "2025-08-20",
    shortDescription:
      "El factoring convierte facturas por cobrar en efectivo en 24–72 h sin generar deuda. Ideal para MYPES: evaluación se centra en tu cliente, no en ti.",
    mainImage: "/images/noticias/noticia_20/mainImage.webp",
    categories: [Category.Finanzas, Category.Economia],
    content: `
    <p>
      En un entorno donde muchas <strong>MYPES</strong> enfrentan barreras de crédito, el 
      <strong>factoring</strong> (adelanto de facturas) se consolidó como una opción ágil para 
      transformar ventas a crédito en <strong>liquidez inmediata</strong> sin incrementar el endeudamiento financiero.
    </p>

    <h3>1) ¿Qué es y cómo funciona?</h3>
    <p>
      Es la <em>cesión</em> de tus cuentas por cobrar a una entidad (banco, financiera o empresa de factoring) 
      que te adelanta el efectivo descontando una tasa y comisiones. 
    </p>
    <ol>
      <li><strong>Factura electrónica</strong> válida ante SUNAT.</li>
      <li><strong>Cesión</strong> a la entidad de factoring.</li>
      <li><strong>Evaluación</strong> del <em>pagador</em> (tu cliente), no del emisor.</li>
      <li><strong>Desembolso</strong>: 80%–95% en 24–72 h.</li>
      <li><strong>Cobro</strong> al vencimiento y <em>saldo</em> para ti menos costos.</li>
    </ol>
    <p><em>Ejemplo:</em> Factura S/ 50,000 a 60 días; adelanto 90% (S/ 45,000), tasa mensual 2% y comisión S/ 300. 
      Al cobrar el cliente, te entregan el saldo neto.</p>

    <h3>2) Factoring vs. préstamo</h3>
    <table>
      <thead><tr><th>Aspecto</th><th>Factoring</th><th>Préstamo bancario</th></tr></thead>
      <tbody>
        <tr><td>Naturaleza</td><td>Anticipo de derecho de cobro</td><td>Endeudamiento</td></tr>
        <tr><td>Garantía</td><td>La factura y el pagador</td><td>Avales/hipoteca/historial</td></tr>
        <tr><td>Evaluación</td><td>Solvencia del cliente</td><td>Solvencia del solicitante</td></tr>
        <tr><td>Impacto en deuda</td><td>No registra pasivo financiero</td><td>Incrementa deuda</td></tr>
        <tr><td>Rapidez</td><td>24–72 h</td><td>Semanas</td></tr>
        <tr><td>Flexibilidad</td><td>Por factura, según necesidad</td><td>Monto/plazo fijos</td></tr>
      </tbody>
    </table>

    <h3>3) Ventajas para emprendedores</h3>
    <ul>
      <li><strong>Liquidez inmediata</strong> para pagos operativos e inversión.</li>
      <li><strong>No afecta</strong> tu capacidad de endeudamiento futuro.</li>
      <li><strong>Acceso</strong> incluso con poco historial financiero.</li>
      <li><strong>Competitividad</strong>: puedes vender a crédito sin ahogar caja.</li>
      <li><strong>Flexibilidad</strong>: eliges qué facturas negociar y cuándo.</li>
    </ul>

    <h3>4) Claves para usarlo bien</h3>
    <ol>
      <li><strong>Formaliza</strong>: RUC activo, clave SOL y <strong>facturación electrónica</strong>.</li>
      <li><strong>Evalúa a tus clientes</strong>: mejor pagador = mejor tasa.</li>
      <li><strong>Compara</strong>: tasa de descuento, comisiones, % de adelanto y tiempos.</li>
      <li><strong>Planifica</strong>: úsalo en picos de demanda o proyectos; evita dependencia crónica.</li>
    </ol>

    <h3>5) Consideraciones y riesgos</h3>
    <ul>
      <li><strong>Costos variables</strong> entre entidades; siempre cotiza y lee el contrato.</li>
      <li><strong>Dependencia</strong>: si lo usas para todo, puede erosionar tu margen.</li>
      <li><strong>Bancarización</strong> y trazabilidad de operaciones (requisito de formalidad).</li>
    </ul>

    <h3>6) Casos de uso</h3>
    <ul>
      <li><strong>Agroexportación</strong>: financia cadena de frío con facturas a supermercados.</li>
      <li><strong>Textil</strong>: aumenta capacidad en temporada escolar con adelanto de facturas a colegios.</li>
      <li><strong>Software B2B</strong>: contrata talento con facturas emitidas a corporativos.</li>
    </ul>

    <h3>7) Buenas prácticas</h3>
    <ul>
      <li>Negocia <strong>sin exclusividad</strong> para cotizar con varios actores.</li>
      <li>Consolida un <strong>historial</strong> de pagadores confiables.</li>
      <li>Integra el factoring a tu <strong>flujo de caja proyectado</strong> y KPIs financieros.</li>
    </ul>

    <h3>Conclusión</h3>
    <p>
      El <strong>factoring</strong> es una palanca de liquidez <em>sin deuda</em> para MYPES y pymes. 
      Bien gestionado —con formalidad, evaluación de clientes y comparación de ofertas— 
      fortalece la caja, mejora la competitividad y puede impulsar un crecimiento sostenible.
    </p>
  `,
    projectUrl: "",
  },
  {
  slug: "igv-a-los-servicios-digitales-2025",
  title: "IGV a los servicios digitales: una estrategia en favor de los usuarios",
  author: {
    name: "Maira Alva García",
    image: "/images/noticias/autores/authorPlaceholder.webp",
    comment: "Abogada tributarista especializada en fiscalidad digital y normativa del IGV en el Perú.",
    socials: {
      facebook: "https://www.facebook.com/",
      linkedin: "https://pe.linkedin.com/",
      twitter: "https://x.com/?lang=es",
      whatsapp: "https://web.whatsapp.com/"
    }
  },
  pubDate: "2025-08-10",
  shortDescription:
    "El Decreto Legislativo N.º 1623 incorpora al IGV los servicios digitales y la importación de bienes intangibles, obligando a proveedores extranjeros a recaudar y declarar el impuesto en Perú.",
    mainImage: "/images/noticias/noticia_31/mainImage.webp",
  categories: [Category.Tributacion, Category.Tecnologia],
  content: `
    <p>
      Con la publicación de la <strong>Ley N.º 32089</strong> y la emisión del <strong>Decreto Legislativo N.º 1623</strong>,
      el Perú da un paso importante hacia la <strong>tributación de la economía digital</strong>. Desde octubre de 2024,
      los servicios digitales —como plataformas de streaming, redes sociales, almacenamiento en la nube o videoconferencias—
      estarán sujetos al <strong>Impuesto General a las Ventas (IGV)</strong>, bajo un nuevo sistema de recaudación adaptado
      a la realidad tecnológica global.
    </p>

    <h3>1. Contexto normativo</h3>
    <p>
      La Ley N.º 32089 (publicada el 4 de julio de 2024) delegó al Poder Ejecutivo la facultad de legislar en materia tributaria por 90 días.
      Entre las medidas aprobadas figura la modificación de la <strong>Ley del IGV e ISC</strong>, con el objetivo de establecer
      un mecanismo para recaudar el impuesto por operaciones realizadas con <em>proveedores no domiciliados</em> en el marco de la economía digital.
    </p>

    <p>
      En ese contexto, el <strong>Decreto Legislativo N.º 1623</strong> introduce cambios en la regulación del IGV sobre la
      <strong>utilización de servicios digitales</strong> y la <strong>importación de bienes intangibles</strong> a través de Internet.
    </p>

    <h3>2. Principales modificaciones introducidas</h3>

    <h4>2.1 Contribuyentes del IGV</h4>
    <p>
      Se considera como <strong>contribuyentes del IGV</strong> a las personas naturales que utilicen servicios digitales o importen bienes intangibles
      en el país, aun cuando no desarrollen actividad empresarial habitual. Esto amplía la base de contribuyentes a usuarios finales que consuman
      servicios como streaming, almacenamiento digital, videojuegos o aplicaciones.
    </p>

    <h4>2.2 Definición de servicios digitales e intangibles</h4>
    <ul>
      <li><strong>Servicios digitales:</strong> aquellos puestos a disposición del usuario por Internet, incluyendo acceso y transmisión de contenido digital, almacenamiento, redes sociales o conferencias remotas.</li>
      <li><strong>Bienes intangibles:</strong> aquellos descargados de manera definitiva desde Internet (por ejemplo, software o contenido multimedia).</li>
    </ul>

    <h4>2.3 Criterios para considerar el consumo en el Perú</h4>
    <p>
      Se considera que el servicio o bien intangible se consume en el país si se cumple alguno de los siguientes criterios:
    </p>
    <ul>
      <li>La dirección IP o el medio de geolocalización del dispositivo corresponde al Perú.</li>
      <li>El código país del SIM o dispositivo electrónico es peruano.</li>
      <li>El pago se realiza con tarjeta o medio electrónico emitido por una entidad financiera peruana.</li>
      <li>El domicilio registrado por el usuario ante el proveedor se encuentra en el Perú.</li>
    </ul>

    <h3>3. Mecanismo de recaudación del IGV</h3>
    <p>
      Los <strong>proveedores o intermediarios no domiciliados</strong> que ofrezcan servicios digitales o vendan bienes intangibles
      deben <strong>inscribirse en el RUC</strong> y actuar como <strong>agentes de retención o percepción del IGV</strong> desde el mes siguiente
      al inicio de sus operaciones en el país.
    </p>

    <p>
      La <strong>retención o percepción</strong> del impuesto se realiza en el momento del cobro del servicio digital o bien intangible,
      y la <strong>declaración y pago</strong> debe efectuarse <strong>dentro de los primeros 10 días hábiles del mes siguiente</strong>.
    </p>

    <h4>3.1 Facilitadores del pago</h4>
    <p>
      Si el proveedor extranjero no cumple con inscribirse o declarar, se designará como <strong>facilitador de pago</strong> a las entidades
      financieras o tecnológicas que procesen el cobro, tales como:
    </p>
    <ul>
      <li>Empresas del sistema financiero y emisoras de dinero electrónico.</li>
      <li>El Banco de la Nación, cuando el pago se realice mediante tarjeta o transferencia.</li>
      <li>Empresas operadoras de telecomunicaciones que reciban pagos por servicios digitales.</li>
      <li>Otros sujetos designados por decreto supremo.</li>
    </ul>

    <p>
      Estas entidades asumirán la retención o percepción del IGV cuando el proveedor extranjero no cumpla con sus obligaciones.
    </p>

    <h3>4. Consideraciones adicionales</h3>
    <ul>
      <li>Si una persona natural con actividad empresarial sufre retención de IGV, podrá usarlo como <strong>crédito fiscal</strong>, siempre que el proveedor no domiciliado haya pagado el monto retenido.</li>
      <li>Los proveedores extranjeros que inicien operaciones antes del 30 de septiembre de 2024 aplicarán el sistema a partir del <strong>1 de octubre de 2024</strong>.</li>
      <li>El Ministerio de Economía y Finanzas emitirá el <strong>reglamento complementario</strong> dentro de los 30 días posteriores a la publicación del decreto.</li>
    </ul>

    <h3>5. Vigencia</h3>
    <p>
      El nuevo régimen entrará en vigor una vez publicado su reglamento, salvo el artículo referente a los <strong>facilitadores de pago</strong>,
      cuya aplicación iniciará en la misma fecha que la norma reglamentaria específica.
    </p>

    <h3>6. Impacto esperado y conclusión</h3>
    <p>
      La incorporación del IGV a los <strong>servicios digitales</strong> representa un paso hacia la <strong>equidad tributaria</strong> entre proveedores nacionales y extranjeros.
      Permite al Estado ampliar su base de recaudación y, al mismo tiempo, ofrecer un marco regulatorio claro a los usuarios peruanos de plataformas internacionales.
    </p>

    <p>
      Aunque la implementación inicial podría generar ajustes en precios y sistemas de pago, se espera que el nuevo esquema impulse la <strong>formalización digital</strong>
      y fortalezca la posición del Perú frente a los desafíos tributarios de la economía global.
    </p>
  `,
  projectUrl: ""
  },
  {
  slug: "efectos-peores-perfiles-cumplimiento-peru-2025",
  title: "Efectos de los peores perfiles de cumplimiento en el Perú",
  author: {
    name: "Maira Alva García",
    image: "/images/noticias/autores/authorPlaceholder.webp",
    comment: "Abogada tributarista y especialista en cumplimiento normativo corporativo en el Perú.",
    socials: {
      facebook: "https://www.facebook.com/",
      linkedin: "https://pe.linkedin.com/",
      twitter: "https://x.com/?lang=es",
      whatsapp: "https://web.whatsapp.com/"
    }
  },
  pubDate: "2025-10-30",
  shortDescription:
    "Los perfiles de bajo cumplimiento generan graves consecuencias para empresas y profesionales: sanciones económicas, juicios, pérdida de licencias, y daños reputacionales.",
  mainImage: "/images/noticias/noticia_32/mainImage.webp",
  categories: [Category.Tributacion],
  content: `
    <p>
      En el contexto peruano, los <strong>perfiles de cumplimiento deficientes</strong> representan un riesgo significativo para empresas e individuos.
      El incumplimiento de normas tributarias, laborales, financieras o regulatorias no solo genera sanciones, sino que puede comprometer
      la sostenibilidad operativa y la reputación corporativa.
    </p>

    <h3>1. Sanciones económicas y multas</h3>
    <p>
      Las principales autoridades —<strong>SUNAT</strong>, <strong>SMV</strong>, <strong>Susalud</strong> y otras entidades reguladoras— 
      pueden imponer <strong>multas severas</strong> por incumplimientos fiscales, financieros o laborales.
    </p>
    <p>
      <strong>Impacto:</strong> estas multas pueden poner en riesgo la viabilidad financiera de las empresas, además de generar costos adicionales
      por procesos administrativos y apelaciones. Incluso una sola sanción puede afectar gravemente el flujo de caja y el acceso al crédito.
    </p>

    <h3>2. Acciones legales y juicios</h3>
    <p>
      El incumplimiento normativo puede derivar en <strong>procesos judiciales</strong> o demandas por parte de autoridades, consumidores, trabajadores o competidores.
    </p>
    <p>
      <strong>Impacto:</strong> los costos legales y posibles indemnizaciones pueden ser elevados. 
      Además, los litigios prolongados deterioran la reputación corporativa y la confianza de los socios comerciales.
    </p>

    <h3>3. Pérdida de licencias y permisos</h3>
    <p>
      En sectores como el financiero, energético, salud y telecomunicaciones, la falta de cumplimiento puede conllevar la <strong>suspensión o pérdida de licencias</strong>.
    </p>
    <p>
      <strong>Impacto:</strong> la suspensión o cancelación de permisos puede paralizar temporal o definitivamente las operaciones,
      afectando ingresos y posicionamiento en el mercado.
    </p>

    <h3>4. Interrupciones operativas</h3>
    <p>
      Las autoridades pueden imponer <strong>restricciones operativas</strong> o clausuras temporales ante incumplimientos graves.
      Estas medidas pueden incluir la suspensión de actividades, bloqueo de sistemas o cierre de locales.
    </p>
    <p>
      <strong>Impacto:</strong> las interrupciones generan pérdidas económicas directas, afectan la cadena de suministro y reducen la satisfacción del cliente.
      En casos extremos, pueden comprometer contratos con terceros o proveedores estratégicos.
    </p>

    <h3>5. Daño reputacional y pérdida de confianza</h3>
    <p>
      El incumplimiento reiterado o grave tiene un efecto devastador sobre la <strong>reputación empresarial</strong>.
      En una economía donde la transparencia y la confianza son pilares clave, las sanciones públicas o denuncias pueden causar
      una pérdida masiva de clientes y credibilidad.
    </p>
    <p>
      <strong>Impacto:</strong> la pérdida de confianza limita las oportunidades de negocio, dificulta atraer inversionistas
      y obstaculiza relaciones con entidades financieras o socios internacionales.
    </p>

    <h3>Conclusión</h3>
    <p>
      Mantener un perfil de cumplimiento alto no es solo una obligación legal, sino una estrategia de sostenibilidad empresarial.
      Las empresas que invierten en <strong>gobernanza, ética y cumplimiento normativo</strong> reducen riesgos, fortalecen su reputación
      y garantizan su permanencia en el mercado.
    </p>
    <p>
      En cambio, los peores perfiles de cumplimiento enfrentan sanciones, pérdidas económicas y un daño reputacional difícil de revertir.
      En el Perú, la prevención sigue siendo la herramienta más efectiva para proteger la continuidad y el crecimiento empresarial.
    </p>
  `,
  projectUrl: ""
}

];

export function paginateNotices(
  notices: Notice[],
  page: number = 1,
  perPage: number = NOTICES_PER_PAGE
) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    notices: notices.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(notices.length / perPage),
      totalNotices: notices.length,
      hasNextPage: endIndex < notices.length,
      hasPrevPage: page > 1,
      perPage: perPage,
    },
  };
}

export function getFilteredAndPaginatedNotices(
  category?: Category,
  page: number = 1,
  searchTerm?: string
) {
  let filteredNotices = [...NoticeData];

  // Filtrar por categoría
  if (category) {
    filteredNotices = filteredNotices.filter((notice) =>
      notice.categories.includes(category)
    );
  }

  // Filtrar por término de búsqueda
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredNotices = filteredNotices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(term) ||
        notice.shortDescription.toLowerCase().includes(term) ||
        notice.author.name.toLowerCase().includes(term)
    );
  }

  return paginateNotices(filteredNotices, page);
}
