import type { Locale } from "@/lib/i18n";

// Datos identificativos del titular, tomados de las páginas legales del
// sitio oficial en vivo (positanopizzeriabcn.com/aviso-legal).
export const LEGAL_BUSINESS = {
  brand: "Positano · Pizzería Lounge Bar",
  legalName: "Antares Sunrise S.L.",
  taxId: "B44715100",
  address: "Carrer del Rosselló, 24, 08029 Barcelona (España)",
  phone: "+34 933 51 59 13",
  email: "positanopizzeria2023@gmail.com",
  // Encargados del tratamiento / terceros con los que se comparten datos.
  processors: ["Google (GA4 y Google Ads)", "Microsoft (Clarity)", "DISH / Hospitality Digital (reservas)", "Uber Eats", "Glovo"],
};

// Fecha de última actualización mostrada en cada documento.
export const LEGAL_UPDATED = { es: "30 de mayo de 2026", en: "30 May 2026" };

export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
};

const b = LEGAL_BUSINESS;

export const LEGAL: Record<Locale, { aviso: LegalDoc; privacidad: LegalDoc; cookies: LegalDoc }> = {
  es: {
    aviso: {
      eyebrow: "Información legal",
      title: "Aviso legal",
      metaTitle: "Aviso legal · Positano Pizzería",
      metaDescription:
        "Aviso legal de Positano Pizzería: datos identificativos del titular, condiciones de uso del sitio web y propiedad intelectual.",
      intro:
        "En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios los datos identificativos del titular de este sitio web.",
      sections: [
        {
          heading: "Datos identificativos",
          list: [
            `Titular: ${b.legalName}`,
            `Nombre comercial: ${b.brand}`,
            `NIF / CIF: ${b.taxId}`,
            `Domicilio: ${b.address}`,
            `Teléfono: ${b.phone}`,
            `Correo electrónico: ${b.email}`,
          ],
        },
        {
          heading: "Objeto",
          paragraphs: [
            "Este sitio web tiene por objeto facilitar información sobre el restaurante y sus servicios (carta, reservas, pedidos a domicilio y empleo). El acceso y uso del sitio atribuye la condición de usuario y supone la aceptación de las presentes condiciones.",
          ],
        },
        {
          heading: "Condiciones de uso",
          paragraphs: [
            "El usuario se compromete a hacer un uso adecuado de los contenidos del sitio y a no emplearlos para actividades ilícitas o contrarias a la buena fe. El titular se reserva el derecho de modificar, sin previo aviso, la información contenida en el sitio web.",
          ],
        },
        {
          heading: "Propiedad intelectual e industrial",
          paragraphs: [
            "Todos los contenidos del sitio (textos, fotografías, ilustraciones, logotipos, marcas y código) son titularidad del responsable o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.",
          ],
        },
        {
          heading: "Responsabilidad",
          paragraphs: [
            "El titular no se hace responsable de los daños derivados del uso del sitio ni de la indisponibilidad temporal del mismo por causas técnicas. Tampoco responde del contenido de sitios de terceros enlazados (Uber Eats, Glovo, redes sociales o el sistema de reservas).",
          ],
        },
        {
          heading: "Legislación aplicable",
          paragraphs: [
            "Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del usuario consumidor.",
          ],
        },
      ],
    },
    privacidad: {
      eyebrow: "Tus datos",
      title: "Política de privacidad",
      metaTitle: "Política de privacidad · Positano Pizzería",
      metaDescription:
        "Cómo Positano Pizzería trata tus datos personales conforme al RGPD: responsable, finalidad, base jurídica, conservación y tus derechos.",
      intro:
        "Conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD), te informamos de cómo tratamos los datos personales que nos facilitas a través de este sitio web.",
      sections: [
        {
          heading: "Responsable del tratamiento",
          list: [
            `Titular: ${b.legalName} (${b.brand})`,
            `NIF / CIF: ${b.taxId}`,
            `Domicilio: ${b.address}`,
            `Correo electrónico: ${b.email}`,
          ],
        },
        {
          heading: "Qué datos tratamos y con qué finalidad",
          paragraphs: [
            "Tratamos únicamente los datos que nos proporcionas voluntariamente:",
          ],
          list: [
            "Formulario de empleo: nombre, datos de contacto y currículum, para gestionar tu candidatura.",
            "Reservas: gestionadas a través del proveedor externo DISH; los datos los tratas directamente en su plataforma conforme a su propia política.",
            "Contacto por teléfono o correo: para atender tu consulta.",
            "Navegación: datos analíticos y publicitarios mediante cookies, solo si das tu consentimiento (ver Política de cookies).",
          ],
        },
        {
          heading: "Base jurídica",
          paragraphs: [
            "El tratamiento se basa en tu consentimiento (formularios y cookies) y, en su caso, en la aplicación de medidas precontractuales a petición del interesado (candidaturas de empleo).",
          ],
        },
        {
          heading: "Conservación de los datos",
          paragraphs: [
            "Conservamos los datos el tiempo necesario para la finalidad para la que se recogieron y, después, durante los plazos legalmente exigibles. Los CV se conservan un máximo de un año salvo que solicites su supresión antes.",
          ],
        },
        {
          heading: "Destinatarios",
          paragraphs: [
            `No cedemos tus datos a terceros salvo obligación legal. Utilizamos proveedores que actúan como encargados del tratamiento: ${b.processors.join(", ")}.`,
          ],
        },
        {
          heading: "Tus derechos",
          paragraphs: [
            `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${b.email}. Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`,
          ],
        },
      ],
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Política de cookies",
      metaTitle: "Política de cookies · Positano Pizzería",
      metaDescription:
        "Qué cookies utiliza Positano Pizzería, para qué sirven y cómo gestionar tu consentimiento (Google Consent Mode v2).",
      intro:
        "Este sitio utiliza cookies propias y de terceros. Solo activamos las cookies analíticas y publicitarias si aceptas en el banner de consentimiento; mientras tanto permanecen desactivadas (Google Consent Mode v2).",
      sections: [
        {
          heading: "Qué son las cookies",
          paragraphs: [
            "Una cookie es un pequeño archivo que se descarga en tu dispositivo al visitar una web y permite recordar información sobre tu navegación.",
          ],
        },
        {
          heading: "Tipos de cookies que usamos",
          list: [
            "Técnicas (necesarias): permiten el funcionamiento básico del sitio. No requieren consentimiento.",
            "Analíticas: Google Analytics 4 y Microsoft Clarity (mapas de calor y grabaciones de sesión anónimas), para medir el tráfico y entender cómo se usa la web. Requieren consentimiento.",
            "Publicitarias: Google Ads, para medir conversiones y optimizar campañas. Requieren consentimiento.",
            "De terceros: el contenido embebido (Google Maps y el sistema de reservas DISH) puede instalar sus propias cookies al cargarse.",
          ],
        },
        {
          heading: "Gestión del consentimiento",
          paragraphs: [
            "Al entrar por primera vez verás un banner para aceptar o rechazar las cookies no esenciales. Tu elección se guarda en tu navegador. Puedes cambiarla en cualquier momento borrando las cookies del sitio o desde la configuración de tu navegador.",
          ],
        },
        {
          heading: "Cómo desactivarlas",
          paragraphs: [
            "Puedes bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge). Ten en cuenta que desactivar algunas cookies puede afectar al funcionamiento del sitio.",
          ],
        },
      ],
    },
  },
  en: {
    aviso: {
      eyebrow: "Legal information",
      title: "Legal notice",
      metaTitle: "Legal notice · Positano Pizzería",
      metaDescription:
        "Legal notice for Positano Pizzería: owner's identifying details, website terms of use and intellectual property.",
      intro:
        "In compliance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the identifying details of the owner of this website are made available to users.",
      sections: [
        {
          heading: "Identifying details",
          list: [
            `Owner: ${b.legalName}`,
            `Trade name: ${b.brand}`,
            `Tax ID (NIF/CIF): ${b.taxId}`,
            `Address: ${b.address}`,
            `Phone: ${b.phone}`,
            `Email: ${b.email}`,
          ],
        },
        {
          heading: "Purpose",
          paragraphs: [
            "This website provides information about the restaurant and its services (menu, reservations, delivery and careers). Accessing and using the site grants you the status of user and implies acceptance of these terms.",
          ],
        },
        {
          heading: "Terms of use",
          paragraphs: [
            "Users undertake to make appropriate use of the site's content and not to use it for unlawful purposes or purposes contrary to good faith. The owner reserves the right to modify the information on the site without prior notice.",
          ],
        },
        {
          heading: "Intellectual and industrial property",
          paragraphs: [
            "All content on the site (texts, photographs, illustrations, logos, trademarks and code) belongs to the owner or to third parties who have authorised its use. Its reproduction, distribution or transformation without express authorisation is prohibited.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The owner is not liable for damages arising from the use of the site or for its temporary unavailability due to technical reasons. Nor is the owner responsible for the content of linked third-party sites (Uber Eats, Glovo, social media or the reservation system).",
          ],
        },
        {
          heading: "Applicable law",
          paragraphs: [
            "These terms are governed by Spanish law. For the resolution of any dispute, the parties submit to the courts of the consumer user's domicile.",
          ],
        },
      ],
    },
    privacidad: {
      eyebrow: "Your data",
      title: "Privacy policy",
      metaTitle: "Privacy policy · Positano Pizzería",
      metaDescription:
        "How Positano Pizzería processes your personal data under the GDPR: controller, purpose, legal basis, retention and your rights.",
      intro:
        "In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD), we explain how we process the personal data you provide through this website.",
      sections: [
        {
          heading: "Data controller",
          list: [
            `Owner: ${b.legalName} (${b.brand})`,
            `Tax ID (NIF/CIF): ${b.taxId}`,
            `Address: ${b.address}`,
            `Email: ${b.email}`,
          ],
        },
        {
          heading: "What data we process and why",
          paragraphs: ["We only process the data you provide voluntarily:"],
          list: [
            "Careers form: name, contact details and CV, to manage your application.",
            "Reservations: handled through the external provider DISH; you submit your data directly on their platform under their own policy.",
            "Contact by phone or email: to answer your enquiry.",
            "Browsing: analytics and advertising data via cookies, only if you give consent (see Cookie policy).",
          ],
        },
        {
          heading: "Legal basis",
          paragraphs: [
            "Processing is based on your consent (forms and cookies) and, where applicable, on pre-contractual measures taken at your request (job applications).",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "We keep the data for as long as necessary for the purpose for which it was collected and, afterwards, for the legally required periods. CVs are kept for a maximum of one year unless you request their deletion sooner.",
          ],
        },
        {
          heading: "Recipients",
          paragraphs: [
            `We do not share your data with third parties except where legally required. We use providers acting as data processors: ${b.processors.join(", ")}.`,
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${b.email}. If you believe the processing does not comply with the regulations, you may lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`,
          ],
        },
      ],
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Cookie policy",
      metaTitle: "Cookie policy · Positano Pizzería",
      metaDescription:
        "Which cookies Positano Pizzería uses, what they are for and how to manage your consent (Google Consent Mode v2).",
      intro:
        "This site uses first- and third-party cookies. We only enable analytics and advertising cookies if you accept in the consent banner; until then they remain disabled (Google Consent Mode v2).",
      sections: [
        {
          heading: "What cookies are",
          paragraphs: [
            "A cookie is a small file downloaded to your device when you visit a website, which allows information about your browsing to be remembered.",
          ],
        },
        {
          heading: "Types of cookies we use",
          list: [
            "Technical (necessary): enable the basic functioning of the site. No consent required.",
            "Analytics: Google Analytics 4 and Microsoft Clarity (heatmaps and anonymous session recordings), to measure traffic and understand how the site is used. Consent required.",
            "Advertising: Google Ads, to measure conversions and optimise campaigns. Consent required.",
            "Third-party: embedded content (Google Maps and the DISH reservation system) may set its own cookies when loaded.",
          ],
        },
        {
          heading: "Managing consent",
          paragraphs: [
            "On your first visit you'll see a banner to accept or decline non-essential cookies. Your choice is stored in your browser. You can change it at any time by clearing the site's cookies or from your browser settings.",
          ],
        },
        {
          heading: "How to disable them",
          paragraphs: [
            "You can block or delete cookies from your browser settings (Chrome, Firefox, Safari, Edge). Note that disabling some cookies may affect how the site works.",
          ],
        },
      ],
    },
  },
};
