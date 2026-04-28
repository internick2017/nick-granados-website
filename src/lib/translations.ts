export type Language = 'en' | 'es' | 'pt'

export const translations = {
  en: {
    nav: {
      home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      subtitle: "Innovative Full Stack Developer | Transforming Ideas into Scalable Web Solutions | React & Next.js Enthusiast",
      viewWork: "View My Work",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      subtitle: "Get to know more about who I am and what I do",
      p1: "I'm a passionate Full Stack Developer with a strong background in creating robust, scalable web applications. With over 5 years of experience in the tech industry, I specialize in transforming complex business requirements into elegant, efficient digital solutions using cutting-edge technologies like React, Next.js, and Node.js.",
      p2: "My journey in web development began with a curiosity to solve real-world problems through technology. I've worked with startups and enterprises, delivering high-performance applications that drive business growth and enhance user experiences.",
      p3: "Beyond coding, I'm a continuous learner who believes in the power of clean code, innovative design, and collaborative problem-solving.",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Here are some of my recent projects",
      github: "GitHub",
      liveDemo: "Live Demo",
      items: [
        {
          title: "GramToSpoon - Kitchen Conversion Tool",
          description: "A cooking utility website that converts weight measurements (grams) into volume measurements (cups, tablespoons, and teaspoons) for 47 common kitchen ingredients across 9 categories. Features an interactive calculator and over 400 pre-built conversion pages optimized for SEO and bookmarking.",
        }
      ]
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Here are the technologies I work with and my proficiency levels",
      coreSkills: "Core Skills",
      techTools: "Technologies & Tools",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "I'm always open to discussing new opportunities and interesting projects",
      letsConnect: "Let's Connect",
      description: "Feel free to reach out if you have any questions, want to discuss a project, or just want to say hello!",
      emailLabel: "Email", phoneLabel: "Phone", locationLabel: "Location",
      nameLabel: "Name", namePlaceholder: "Your Name",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "Message", messagePlaceholder: "Your message...",
      send: "Send Message", sending: "Sending...",
      successTitle: "Message sent!",
      successDesc: "Thanks for reaching out. I'll get back to you as soon as possible.",
      sendAnother: "Send another message",
      error: "Something went wrong. Please try again or email me directly.",
    },
    footer: {
      portfolio: "Portfolio",
      tagline: "Building amazing digital experiences with passion and precision.",
      quickLinks: "Quick Links", connect: "Connect", rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      home: 'Inicio', about: 'Sobre mí', projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto',
    },
    hero: {
      greeting: "Hola, soy",
      subtitle: "Desarrollador Full Stack Innovador | Transformando Ideas en Soluciones Web Escalables | Entusiasta de React & Next.js",
      viewWork: "Ver mi trabajo",
      contactMe: "Contáctame",
    },
    about: {
      title: "Sobre mí",
      subtitle: "Conóceme mejor, quién soy y qué hago",
      p1: "Soy un apasionado Desarrollador Full Stack con sólida experiencia en la creación de aplicaciones web robustas y escalables. Con más de 5 años de experiencia en la industria tecnológica, me especializo en transformar requerimientos de negocio complejos en soluciones digitales elegantes usando tecnologías como React, Next.js y Node.js.",
      p2: "Mi camino en el desarrollo web comenzó con la curiosidad de resolver problemas del mundo real a través de la tecnología. He trabajado con startups y empresas, entregando aplicaciones de alto rendimiento que impulsan el crecimiento del negocio y mejoran la experiencia del usuario.",
      p3: "Más allá del código, soy un aprendiz continuo que cree en el poder del código limpio, el diseño innovador y la resolución colaborativa de problemas.",
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Aquí están algunos de mis proyectos recientes",
      github: "GitHub",
      liveDemo: "Demo en vivo",
      items: [
        {
          title: "GramToSpoon - Herramienta de Conversión de Cocina",
          description: "Un sitio web utilitario de cocina que convierte medidas de peso (gramos) a medidas de volumen (tazas, cucharadas y cucharaditas) para 47 ingredientes comunes en 9 categorías. Incluye una calculadora interactiva y más de 400 páginas de conversión optimizadas para SEO.",
        }
      ]
    },
    skills: {
      title: "Habilidades y Tecnologías",
      subtitle: "Estas son las tecnologías con las que trabajo y mis niveles de competencia",
      coreSkills: "Habilidades Principales",
      techTools: "Tecnologías y Herramientas",
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle: "Siempre estoy abierto a discutir nuevas oportunidades y proyectos interesantes",
      letsConnect: "Conectemos",
      description: "No dudes en contactarme si tienes preguntas, quieres discutir un proyecto, o simplemente quieres saludar.",
      emailLabel: "Correo", phoneLabel: "Teléfono", locationLabel: "Ubicación",
      nameLabel: "Nombre", namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu.correo@ejemplo.com",
      messageLabel: "Mensaje", messagePlaceholder: "Tu mensaje...",
      send: "Enviar mensaje", sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successDesc: "Gracias por contactarme. Te responderé lo antes posible.",
      sendAnother: "Enviar otro mensaje",
      error: "Algo salió mal. Por favor intenta de nuevo o escríbeme directamente.",
    },
    footer: {
      portfolio: "Portafolio",
      tagline: "Construyendo experiencias digitales increíbles con pasión y precisión.",
      quickLinks: "Enlaces rápidos", connect: "Conectar", rights: "Todos los derechos reservados.",
    },
  },
  pt: {
    nav: {
      home: 'Início', about: 'Sobre', projects: 'Projetos', skills: 'Habilidades', contact: 'Contato',
    },
    hero: {
      greeting: "Olá, sou",
      subtitle: "Desenvolvedor Full Stack Inovador | Transformando Ideias em Soluções Web Escaláveis | Entusiasta de React & Next.js",
      viewWork: "Ver meu trabalho",
      contactMe: "Fale comigo",
    },
    about: {
      title: "Sobre mim",
      subtitle: "Conheça mais sobre quem sou e o que faço",
      p1: "Sou um apaixonado Desenvolvedor Full Stack com forte experiência na criação de aplicações web robustas e escaláveis. Com mais de 5 anos de experiência na indústria de tecnologia, me especializo em transformar requisitos de negócio complexos em soluções digitais elegantes usando tecnologias como React, Next.js e Node.js.",
      p2: "Minha jornada no desenvolvimento web começou com a curiosidade de resolver problemas do mundo real através da tecnologia. Trabalhei com startups e empresas, entregando aplicações de alto desempenho que impulsionam o crescimento dos negócios e melhoram as experiências dos usuários.",
      p3: "Além de programar, sou um aprendiz contínuo que acredita no poder do código limpo, design inovador e resolução colaborativa de problemas.",
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Aqui estão alguns dos meus projetos recentes",
      github: "GitHub",
      liveDemo: "Demo ao vivo",
      items: [
        {
          title: "GramToSpoon - Ferramenta de Conversão Culinária",
          description: "Um site utilitário de culinária que converte medidas de peso (gramas) em medidas de volume (xícaras, colheres de sopa e colheres de chá) para 47 ingredientes comuns em 9 categorias. Possui uma calculadora interativa e mais de 400 páginas de conversão otimizadas para SEO.",
        }
      ]
    },
    skills: {
      title: "Habilidades e Tecnologias",
      subtitle: "Estas são as tecnologias com que trabalho e meus níveis de proficiência",
      coreSkills: "Habilidades Principais",
      techTools: "Tecnologias e Ferramentas",
    },
    contact: {
      title: "Entre em Contato",
      subtitle: "Estou sempre aberto a discutir novas oportunidades e projetos interessantes",
      letsConnect: "Vamos nos Conectar",
      description: "Fique à vontade para entrar em contato se tiver dúvidas, quiser discutir um projeto ou apenas quiser dizer olá!",
      emailLabel: "E-mail", phoneLabel: "Telefone", locationLabel: "Localização",
      nameLabel: "Nome", namePlaceholder: "Seu nome",
      emailPlaceholder: "seu.email@exemplo.com",
      messageLabel: "Mensagem", messagePlaceholder: "Sua mensagem...",
      send: "Enviar mensagem", sending: "Enviando...",
      successTitle: "Mensagem enviada!",
      successDesc: "Obrigado pelo contato. Responderei o mais breve possível.",
      sendAnother: "Enviar outra mensagem",
      error: "Algo deu errado. Por favor, tente novamente ou me envie um e-mail diretamente.",
    },
    footer: {
      portfolio: "Portfólio",
      tagline: "Construindo experiências digitais incríveis com paixão e precisão.",
      quickLinks: "Links Rápidos", connect: "Conectar", rights: "Todos os direitos reservados.",
    },
  },
}

export type Translations = typeof translations.en
