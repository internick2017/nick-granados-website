// src/data/projects.ts

export type Category = 'fullstack' | 'api' | 'frontend' | 'ecommerce' | 'mobile' | 'wordpress'

export type ProjectTranslation = {
  title: string
  description: string
}

export type CaseStudyContent = {
  summary: string      // one-line hook
  problem: string      // context / challenge (short prose)
  approach: string[]   // what was built and how
  outcome: string[]    // what it proves: verifiable outcomes
}

export type Project = {
  id: string
  translations: {
    en: ProjectTranslation
    es: ProjectTranslation
    pt: ProjectTranslation
  }
  technologies: string[]
  github: string | null
  demo: string | null
  /** Official WordPress.org listing, when the project is published there and `demo` already points somewhere else. */
  wporg?: string
  image: string
  category: Category
  caseStudy?: {
    en: CaseStudyContent
    es: CaseStudyContent
    pt: CaseStudyContent
  }
}

export const projects: Project[] = [
  {
    id: 'terra',
    translations: {
      en: {
        title: 'Terra - Headless Real Estate (WordPress + Next.js)',
        description: 'Bilingual real estate site running WordPress as a headless CMS behind a Next.js front end. Listings, neighborhoods and translations are authored in wp-admin and consumed over WPGraphQL, with Polylang driving EN/PT content in parallel. The front end renders static pages with incremental revalidation, filters listings by type, status and neighborhood, and draws property locations on OpenStreetMap tiles. Covered by 112 tests and deployed with the CMS on shared hosting and the front end on Vercel.',
      },
      es: {
        title: 'Terra - Inmobiliaria Headless (WordPress + Next.js)',
        description: 'Sitio inmobiliario bilingüe que usa WordPress como CMS headless detrás de un front end en Next.js. Las propiedades, los barrios y las traducciones se cargan desde wp-admin y se consumen por WPGraphQL, con Polylang manejando el contenido EN/PT en paralelo. El front end genera páginas estáticas con revalidación incremental, filtra propiedades por tipo, estado y barrio, y ubica cada propiedad sobre tiles de OpenStreetMap. Cubierto por 112 tests, con el CMS en hosting compartido y el front end en Vercel.',
      },
      pt: {
        title: 'Terra - Imobiliária Headless (WordPress + Next.js)',
        description: 'Site imobiliário bilíngue que usa WordPress como CMS headless atrás de um front end em Next.js. Os imóveis, os bairros e as traduções são cadastrados no wp-admin e consumidos via WPGraphQL, com Polylang cuidando do conteúdo EN/PT em paralelo. O front end gera páginas estáticas com revalidação incremental, filtra imóveis por tipo, situação e bairro, e posiciona cada imóvel sobre tiles do OpenStreetMap. Coberto por 112 testes, com o CMS em hospedagem compartilhada e o front end na Vercel.',
      },
    },
    technologies: ['WordPress', 'Headless CMS', 'WPGraphQL', 'Polylang', 'Next.js 15', 'TypeScript', 'ISR', 'OpenStreetMap', 'Vitest'],
    github: 'https://github.com/internick2017/terra-headless-realestate',
    demo: 'https://terra-headless-realestate.vercel.app',
    image: '/images/project-terra.png',
    category: 'wordpress',
    caseStudy: {
      en: {
        summary: 'WordPress kept as the editor experience clients already know, with a Next.js front end that never touches PHP rendering.',
        problem: 'Real estate clients want to manage their own listings, and WordPress is the admin they already understand. But a classic WP theme ties presentation to PHP templates and to whatever the host can serve. The goal was to keep wp-admin as the editing surface while the public site becomes a fast, statically rendered app, in two languages, without the CMS ever being the thing visitors load.',
        approach: [
          'WordPress runs as a headless CMS with custom post types for listings and neighborhoods, exposed through WPGraphQL.',
          'Polylang keeps English and Portuguese content in parallel, and the front end resolves the right translation per route.',
          'The Next.js front end renders static pages with incremental revalidation, so editors publish in wp-admin and the public site picks the change up on its own.',
          'Listings are filtered by type, status and neighborhood, and each property is placed on OpenStreetMap tiles rather than a paid map provider.',
          'The demo data seeds from inside wp-admin instead of requiring WP-CLI, so the project stays deployable on ordinary shared hosting.',
        ],
        outcome: [
          'Live front end on Vercel with the WordPress CMS running on its own subdomain.',
          '112 tests covering the GraphQL layer, filtering and translation resolution.',
          'Verified against production, including the bilingual routes and the map rendering.',
        ],
      },
      es: {
        summary: 'WordPress se mantiene como el editor que los clientes ya conocen, con un front end en Next.js que nunca pasa por el render de PHP.',
        problem: 'Los clientes inmobiliarios quieren manejar sus propias propiedades, y WordPress es el admin que ya entienden. Pero un tema clásico de WP ata la presentación a los templates PHP y a lo que el hosting pueda servir. La idea fue conservar wp-admin como superficie de edición mientras el sitio público se vuelve una app rápida y renderizada estáticamente, en dos idiomas, sin que el CMS sea nunca lo que carga el visitante.',
        approach: [
          'WordPress corre como CMS headless con custom post types para propiedades y barrios, expuestos por WPGraphQL.',
          'Polylang mantiene el contenido en inglés y portugués en paralelo, y el front end resuelve la traducción correcta según la ruta.',
          'El front end en Next.js genera páginas estáticas con revalidación incremental: el editor publica en wp-admin y el sitio público toma el cambio solo.',
          'Las propiedades se filtran por tipo, estado y barrio, y cada una se ubica sobre tiles de OpenStreetMap en vez de un proveedor de mapas pago.',
          'Los datos de demo se cargan desde adentro de wp-admin en lugar de exigir WP-CLI, así el proyecto sigue siendo desplegable en hosting compartido común.',
        ],
        outcome: [
          'Front end en vivo en Vercel con el CMS WordPress corriendo en su propio subdominio.',
          '112 tests que cubren la capa GraphQL, el filtrado y la resolución de traducciones.',
          'Verificado contra producción, incluidas las rutas bilingües y el render del mapa.',
        ],
      },
      pt: {
        summary: 'O WordPress continua sendo o editor que os clientes já conhecem, com um front end em Next.js que nunca passa pelo render do PHP.',
        problem: 'Clientes de imobiliária querem gerenciar os próprios imóveis, e o WordPress é o admin que eles já entendem. Mas um tema clássico de WP amarra a apresentação aos templates PHP e ao que a hospedagem consegue servir. A ideia foi manter o wp-admin como superfície de edição enquanto o site público vira um app rápido e renderizado estaticamente, em dois idiomas, sem que o CMS seja o que o visitante carrega.',
        approach: [
          'O WordPress roda como CMS headless com custom post types para imóveis e bairros, expostos por WPGraphQL.',
          'O Polylang mantém o conteúdo em inglês e português em paralelo, e o front end resolve a tradução certa conforme a rota.',
          'O front end em Next.js gera páginas estáticas com revalidação incremental: o editor publica no wp-admin e o site público absorve a mudança sozinho.',
          'Os imóveis são filtrados por tipo, situação e bairro, e cada um é posicionado sobre tiles do OpenStreetMap em vez de um provedor de mapas pago.',
          'Os dados de demo são carregados de dentro do wp-admin em vez de exigir WP-CLI, então o projeto continua implantável em hospedagem compartilhada comum.',
        ],
        outcome: [
          'Front end ao vivo na Vercel com o CMS WordPress rodando em seu próprio subdomínio.',
          '112 testes cobrindo a camada GraphQL, a filtragem e a resolução de traduções.',
          'Verificado contra produção, incluindo as rotas bilíngues e o render do mapa.',
        ],
      },
    },
  },
  {
    id: 'fixflow',
    translations: {
      en: {
        title: 'FixFlow - QR Service Intake with 3-Tier RLS',
        description: 'QR-based service-request intake built on Supabase. Customers scan a per-location QR code and file a ticket anonymously; staff triage behind authentication. Security is enforced in Postgres by 3-tier Row Level Security (anonymous can only create, técnicos see only the tickets assigned to them, admins see everything), covered by an integration test suite. Uses Supabase Auth, Storage for photo uploads, and an Edge Function that emails staff on each new ticket. Deployed on Vercel with a hosted Supabase backend.',
      },
      es: {
        title: 'FixFlow - Intake de Servicio con QR y RLS de 3 Niveles',
        description: 'Intake de solicitudes de servicio con QR construido sobre Supabase. El cliente escanea un QR por sucursal y crea un ticket de forma anónima; el staff lo gestiona detrás de login. La seguridad la impone Postgres con Row Level Security de 3 niveles (anónimo solo crea, el técnico ve solo sus tickets asignados, el admin ve todo), cubierta por una suite de tests de integración. Usa Supabase Auth, Storage para subir fotos y una Edge Function que avisa por email al staff en cada ticket nuevo. Desplegado en Vercel con backend Supabase en la nube.',
      },
      pt: {
        title: 'FixFlow - Intake de Serviço com QR e RLS de 3 Níveis',
        description: 'Intake de solicitações de serviço com QR construído sobre Supabase. O cliente escaneia um QR por filial e cria um ticket de forma anônima; a equipe gerencia atrás de login. A segurança é imposta pelo Postgres com Row Level Security de 3 níveis (anônimo só cria, o técnico vê apenas seus tickets atribuídos, o admin vê tudo), coberta por uma suíte de testes de integração. Usa Supabase Auth, Storage para upload de fotos e uma Edge Function que avisa a equipe por email a cada novo ticket. Implantado em Vercel com backend Supabase na nuvem.',
      },
    },
    technologies: ['Supabase', 'Row Level Security', 'Next.js 16', 'Edge Functions', 'TypeScript', 'PostgreSQL', 'Auth', 'Vitest'],
    github: 'https://github.com/internick2017/fixflow',
    demo: 'https://fixflow-jade.vercel.app',
    image: '/images/project-fixflow.png',
    category: 'fullstack',
    caseStudy: {
      en: {
        summary: 'A QR-based service intake app where security is enforced in the database itself, not just the UI.',
        problem: 'A repair or service business wants customers to file a request by scanning a QR code, with zero friction and no account. But that same data must stay locked down: a customer must never see another customer\'s ticket, and a technician must only see the jobs assigned to them. Enforcing that only in application code is fragile, one missed check leaks data.',
        approach: [
          'Customers scan a per-location QR code and file a ticket anonymously; staff triage behind authentication.',
          'Access is enforced in Postgres with three-tier Row Level Security: anonymous can only create, technicians see only tickets assigned to them, admins see everything.',
          'Uses Supabase Auth, Storage for photo uploads, and an Edge Function to email staff on each new ticket.',
          'The security rules are covered by an integration test suite, so a policy regression fails the build.',
        ],
        outcome: [
          'Live demo deployed on Vercel with a hosted Supabase backend.',
          'Three-tier Row Level Security verified live against each role.',
          'Security policies covered by automated integration tests.',
        ],
      },
      es: {
        summary: 'Una app de intake de servicio por QR donde la seguridad la impone la base de datos, no solo la interfaz.',
        problem: 'Un negocio de reparación o servicio quiere que el cliente cargue una solicitud escaneando un QR, sin fricción y sin cuenta. Pero esos datos tienen que quedar protegidos: un cliente nunca debe ver el ticket de otro, y un técnico solo debe ver los trabajos que tiene asignados. Imponer eso solo en el código de la app es frágil: un solo chequeo olvidado filtra datos.',
        approach: [
          'El cliente escanea un QR por sucursal y crea un ticket de forma anónima; el staff lo gestiona detrás de login.',
          'El acceso lo impone Postgres con Row Level Security de 3 niveles: anónimo solo crea, el técnico ve solo sus tickets asignados, el admin ve todo.',
          'Usa Supabase Auth, Storage para subir fotos y una Edge Function para avisar por email al staff en cada ticket nuevo.',
          'Las reglas de seguridad están cubiertas por una suite de tests de integración, así una regresión de política rompe el build.',
        ],
        outcome: [
          'Demo en vivo desplegada en Vercel con backend Supabase en la nube.',
          'Row Level Security de 3 niveles verificada en vivo contra cada rol.',
          'Políticas de seguridad cubiertas por tests de integración automatizados.',
        ],
      },
      pt: {
        summary: 'Um app de intake de serviço por QR onde a segurança é imposta pelo banco de dados, não apenas pela interface.',
        problem: 'Um negócio de reparo ou serviço quer que o cliente abra uma solicitação escaneando um QR, sem fricção e sem conta. Mas esses dados precisam ficar protegidos: um cliente nunca deve ver o ticket de outro, e um técnico só deve ver os trabalhos atribuídos a ele. Impor isso apenas no código do app é frágil: um único check esquecido vaza dados.',
        approach: [
          'O cliente escaneia um QR por filial e cria um ticket de forma anônima; a equipe gerencia atrás de login.',
          'O acesso é imposto pelo Postgres com Row Level Security de 3 níveis: anônimo só cria, o técnico vê apenas seus tickets atribuídos, o admin vê tudo.',
          'Usa Supabase Auth, Storage para upload de fotos e uma Edge Function para avisar a equipe por email a cada novo ticket.',
          'As regras de segurança são cobertas por uma suíte de testes de integração, então uma regressão de política quebra o build.',
        ],
        outcome: [
          'Demo ao vivo implantada na Vercel com backend Supabase na nuvem.',
          'Row Level Security de 3 níveis verificada ao vivo contra cada função.',
          'Políticas de segurança cobertas por testes de integração automatizados.',
        ],
      },
    },
  },
  {
    id: 'ecommerce-data-warehouse',
    translations: {
      en: {
        title: 'E-commerce Data Warehouse - ELT Pipeline on AWS',
        description: 'End-to-end ELT pipeline running against a live Shopify store and real AWS infrastructure. Extracts orders via the Shopify GraphQL API (cursor pagination, throttle-aware retries), stages raw JSON in S3, loads into PostgreSQL on AWS RDS with idempotent incremental upserts and load auditing, then builds a star schema in pure SQL (CTEs + window functions) feeding a Power BI dashboard. Extended with real-time Shopify webhooks (FastAPI, HMAC-verified), a legacy SQL Server ERP synced over ODBC for cost and margin, and scheduled runs on AWS Lambda + EventBridge declared in Terraform. 92 tests, SQL data-quality gates, and boto3 infrastructure automation.',
      },
      es: {
        title: 'E-commerce Data Warehouse - Pipeline ELT en AWS',
        description: 'Pipeline ELT de extremo a extremo contra una tienda Shopify real e infraestructura AWS. Extrae pedidos vía Shopify GraphQL API (paginación por cursor, reintentos con manejo de throttle), almacena JSON crudo en S3, carga en PostgreSQL sobre AWS RDS con upserts incrementales idempotentes y auditoría, y construye un esquema en estrella en SQL puro (CTEs + window functions) que alimenta un dashboard Power BI. Extendido con webhooks de Shopify en tiempo real (FastAPI, firma HMAC verificada), un ERP legacy en SQL Server sincronizado por ODBC para costo y margen, y corridas agendadas en AWS Lambda + EventBridge declaradas en Terraform. 92 tests, quality gates en SQL y automatización de infraestructura con boto3.',
      },
      pt: {
        title: 'E-commerce Data Warehouse - Pipeline ELT na AWS',
        description: 'Pipeline ELT de ponta a ponta contra uma loja Shopify real e infraestrutura AWS. Extrai pedidos via Shopify GraphQL API (paginação por cursor, retries com tratamento de throttle), armazena JSON bruto no S3, carrega em PostgreSQL no AWS RDS com upserts incrementais idempotentes e auditoria, e constrói um star schema em SQL puro (CTEs + window functions) que alimenta um dashboard Power BI. Estendido com webhooks da Shopify em tempo real (FastAPI, assinatura HMAC verificada), um ERP legado em SQL Server sincronizado por ODBC para custo e margem, e execuções agendadas em AWS Lambda + EventBridge declaradas em Terraform. 92 testes, quality gates em SQL e automação de infraestrutura com boto3.',
      },
    },
    technologies: ['Python', 'AWS RDS', 'AWS S3', 'AWS Lambda', 'EventBridge', 'Terraform', 'PostgreSQL', 'ETL/ELT', 'Shopify GraphQL', 'FastAPI', 'Webhooks', 'SQL Server / ODBC', 'Star Schema', 'Power BI', 'boto3', 'pydantic', 'pytest'],
    github: 'https://github.com/internick2017/ecommerce-data-warehouse',
    demo: null,
    image: '/images/project-ecommerce-dw.png',
    category: 'api',
    caseStudy: {
      en: {
        summary: 'A data pipeline built the way a team has to run one: idempotent, audited, and gated by quality checks that fail the run.',
        problem: 'Pulling orders from an API into a database is the easy part. What makes a pipeline trustworthy is everything around it: what happens when a run dies halfway, when the API returns a payload the schema does not expect, when someone re-runs yesterday\'s job by mistake, and how anyone proves afterwards that the numbers in the dashboard match the source. This project was built to answer those questions against real infrastructure rather than a local toy setup.',
        approach: [
          'Orders are extracted from the Shopify GraphQL API with cursor pagination and throttle-aware retries, staged as raw JSONL in S3, and loaded into PostgreSQL on AWS RDS across three layers: raw JSONB for replay and audit, typed staging, and a curated star schema for BI.',
          'Loads are idempotent: upserts keyed by the Shopify GID with load_id lineage, so a retry after a partial failure changes nothing. Watermarks only advance after both the transforms and the quality gates pass.',
          'Validation is a gate, not a crash: every payload is checked against a pydantic model, rejects land in raw.rejects with a reason, and the run still completes. Every run records extracted, loaded and rejected counts in meta.load_audit.',
          'Quality gates run in SQL on every execution and fail the run: fact-vs-staging reconciliation, per-order revenue reconciliation so errors cannot cancel out across orders, orphan foreign keys, and duplicate natural keys.',
          'Transforms are SQL-first. The cumulative revenue curve and per-customer order sequence are window functions in the curated layer, not calculations hidden inside the BI tool.',
          'A FastAPI receiver ingests Shopify webhooks in real time alongside the batch run, verifying HMAC-SHA256 signatures in constant time and deduplicating by webhook id, then normalizing the REST payload into the same canonical record the GraphQL extractor produces so no downstream SQL changes.',
          'A second source system, a legacy SQL Server ERP reached over ODBC, supplies per-SKU cost and inventory, enriching the fact table with line cost and margin through the same watermark mechanism.',
          'The batch run is scheduled as an AWS Lambda triggered by EventBridge, declared in Terraform with a least-privilege IAM role and secrets read from SSM Parameter Store. GitHub Actions runs the test suite against a Postgres service container on every push.',
          'AWS provisioning is cost-guarded and automated with boto3: a zero-spend budget alert is created first, then S3 with a 30-day lifecycle, a least-privilege IAM user, and a free-tier RDS instance locked to a single IP.',
        ],
        outcome: [
          '92 pytest tests covering extraction, loading, transforms, quality gates, webhook security and the ERP sync.',
          'Runs against real AWS infrastructure (RDS, S3, IAM, budgets), not a local simulation.',
          'Re-running or retrying a load is provably a no-op, and every run is auditable through meta.load_audit.',
          'Honest scope note kept in the README: the store is real but new, so order history is seeded through the same Admin API the pipeline consumes. Every other link in the chain runs against real infrastructure.',
        ],
      },
      es: {
        summary: 'Un pipeline de datos construido como lo tiene que correr un equipo: idempotente, auditado y con controles de calidad que cortan la corrida.',
        problem: 'Traer pedidos de una API a una base de datos es la parte fácil. Lo que vuelve confiable a un pipeline es todo lo que lo rodea: qué pasa cuando una corrida muere por la mitad, cuando la API devuelve un payload que el esquema no esperaba, cuando alguien re-ejecuta por error el trabajo de ayer, y cómo se demuestra después que los números del dashboard coinciden con el origen. Este proyecto se construyó para responder esas preguntas contra infraestructura real, no contra un armado local de juguete.',
        approach: [
          'Los pedidos se extraen de la API GraphQL de Shopify con paginación por cursor y reintentos que respetan el throttle, se guardan como JSONL crudo en S3 y se cargan en PostgreSQL sobre AWS RDS en tres capas: raw en JSONB para replay y auditoría, staging tipado, y un esquema en estrella curado para BI.',
          'Las cargas son idempotentes: upserts por el GID de Shopify con trazabilidad por load_id, así un reintento después de una falla parcial no cambia nada. Los watermarks solo avanzan cuando pasan las transformaciones Y los controles de calidad.',
          'La validación es una compuerta, no un crash: cada payload se valida contra un modelo pydantic, los rechazos caen en raw.rejects con su motivo, y la corrida igual termina. Cada ejecución registra extraídos, cargados y rechazados en meta.load_audit.',
          'Los controles de calidad corren en SQL en cada ejecución y cortan la corrida: reconciliación fact contra staging, reconciliación de ingresos por pedido para que los errores no se compensen entre sí, claves foráneas huérfanas y claves naturales duplicadas.',
          'Las transformaciones son SQL primero. La curva de ingresos acumulados y la secuencia de pedidos por cliente son window functions en la capa curada, no cálculos escondidos dentro de la herramienta de BI.',
          'Un receptor FastAPI ingiere webhooks de Shopify en tiempo real en paralelo al batch: verifica la firma HMAC-SHA256 en tiempo constante, deduplica por id de webhook y normaliza el payload REST al mismo registro canónico que produce el extractor GraphQL, así no cambia nada aguas abajo.',
          'Un segundo sistema de origen, un ERP legacy en SQL Server accedido por ODBC, aporta costo por SKU e inventario, y enriquece la tabla de hechos con costo y margen por línea usando el mismo mecanismo de watermarks.',
          'La corrida batch está agendada como una Lambda de AWS disparada por EventBridge, declarada en Terraform con un rol IAM de mínimo privilegio y secretos leídos de SSM Parameter Store. GitHub Actions corre la suite de tests contra un contenedor de Postgres en cada push.',
          'El aprovisionamiento de AWS está automatizado con boto3 y protegido en costos: primero se crea una alerta de presupuesto en cero, después S3 con ciclo de vida de 30 días, un usuario IAM de mínimo privilegio y una instancia RDS de free tier restringida a una sola IP.',
        ],
        outcome: [
          '92 tests de pytest que cubren extracción, carga, transformaciones, controles de calidad, seguridad del webhook y la sincronización con el ERP.',
          'Corre contra infraestructura AWS real (RDS, S3, IAM, budgets), no contra una simulación local.',
          'Re-ejecutar o reintentar una carga es demostrablemente inocuo, y cada corrida queda auditable en meta.load_audit.',
          'Nota honesta de alcance, mantenida en el README: la tienda es real pero nueva, así que el historial de pedidos se siembra por la misma Admin API que consume el pipeline. Todo el resto de la cadena corre contra infraestructura real.',
        ],
      },
      pt: {
        summary: 'Um pipeline de dados construído como uma equipe precisa rodar: idempotente, auditado e com portões de qualidade que derrubam a execução.',
        problem: 'Trazer pedidos de uma API para um banco é a parte fácil. O que torna um pipeline confiável é tudo em volta: o que acontece quando uma execução morre no meio, quando a API devolve um payload que o esquema não esperava, quando alguém re-executa por engano o job de ontem, e como se prova depois que os números do dashboard batem com a origem. Este projeto foi construído para responder essas perguntas contra infraestrutura real, não contra uma montagem local de brinquedo.',
        approach: [
          'Os pedidos são extraídos da API GraphQL da Shopify com paginação por cursor e retries que respeitam o throttle, gravados como JSONL bruto no S3 e carregados em PostgreSQL na AWS RDS em três camadas: raw em JSONB para replay e auditoria, staging tipado, e um star schema curado para BI.',
          'As cargas são idempotentes: upserts pelo GID da Shopify com rastreabilidade por load_id, então um retry depois de uma falha parcial não muda nada. Os watermarks só avançam quando as transformações E os portões de qualidade passam.',
          'A validação é um portão, não um crash: cada payload é validado contra um modelo pydantic, as rejeições caem em raw.rejects com o motivo, e a execução termina mesmo assim. Cada execução registra extraídos, carregados e rejeitados em meta.load_audit.',
          'Os portões de qualidade rodam em SQL a cada execução e derrubam a corrida: reconciliação fact contra staging, reconciliação de receita por pedido para que erros não se anulem entre si, chaves estrangeiras órfãs e chaves naturais duplicadas.',
          'As transformações são SQL primeiro. A curva de receita acumulada e a sequência de pedidos por cliente são window functions na camada curada, não cálculos escondidos dentro da ferramenta de BI.',
          'Um receptor FastAPI ingere webhooks da Shopify em tempo real junto ao batch: verifica a assinatura HMAC-SHA256 em tempo constante, deduplica por id de webhook e normaliza o payload REST para o mesmo registro canônico que o extrator GraphQL produz, sem mudar nada rio abaixo.',
          'Um segundo sistema de origem, um ERP legado em SQL Server acessado por ODBC, fornece custo por SKU e estoque, enriquecendo a tabela de fatos com custo e margem por linha usando o mesmo mecanismo de watermarks.',
          'A execução batch é agendada como uma Lambda da AWS disparada pelo EventBridge, declarada em Terraform com um papel IAM de privilégio mínimo e segredos lidos do SSM Parameter Store. O GitHub Actions roda a suíte de testes contra um container de Postgres a cada push.',
          'O provisionamento da AWS é automatizado com boto3 e protegido em custo: primeiro cria um alerta de orçamento zerado, depois S3 com ciclo de vida de 30 dias, um usuário IAM de privilégio mínimo e uma instância RDS de free tier restrita a um único IP.',
        ],
        outcome: [
          '92 testes pytest cobrindo extração, carga, transformações, portões de qualidade, segurança do webhook e a sincronização com o ERP.',
          'Roda contra infraestrutura AWS real (RDS, S3, IAM, budgets), não contra uma simulação local.',
          'Re-executar ou repetir uma carga é comprovadamente inofensivo, e cada execução fica auditável em meta.load_audit.',
          'Nota honesta de escopo, mantida no README: a loja é real mas nova, então o histórico de pedidos é semeado pela mesma Admin API que o pipeline consome. Todo o resto da cadeia roda contra infraestrutura real.',
        ],
      },
    },
  },
  {
    id: 'kindly-theme',
    translations: {
      en: {
        title: 'Kindly - Nonprofit WordPress Block Theme',
        description: 'Custom Full Site Editing (FSE) block theme built from scratch for nonprofits and churches. Lightweight with zero external requests (self-hosted fonts), WCAG 2.2 AA out of the box, a theme.json v3 design system with a semantic palette and fluid typography, 7 block templates, 15 block patterns, and 3 style variations, all using core blocks and no page builder. Passes the official Theme Check with 0 required issues.',
      },
      es: {
        title: 'Kindly - Tema de Bloques WordPress para ONGs',
        description: 'Tema de bloques Full Site Editing (FSE) hecho desde cero para ONGs e iglesias. Liviano y sin requests externos (fuentes self-hosted), WCAG 2.2 AA de fábrica, sistema de diseño theme.json v3 con paleta semántica y tipografía fluida, 7 plantillas de bloques, 15 patrones y 3 variaciones de estilo, todo con bloques del core y sin page builder. Pasa el Theme Check oficial con 0 errores requeridos.',
      },
      pt: {
        title: 'Kindly - Tema de Blocos WordPress para ONGs',
        description: 'Tema de blocos Full Site Editing (FSE) feito do zero para ONGs e igrejas. Leve e sem requests externos (fontes self-hosted), WCAG 2.2 AA de fábrica, sistema de design theme.json v3 com paleta semântica e tipografia fluida, 7 templates de blocos, 15 patterns e 3 variações de estilo, tudo com blocos do core e sem page builder. Passa no Theme Check oficial com 0 erros obrigatórios.',
      },
    },
    technologies: ['WordPress', 'PHP', 'Full Site Editing', 'theme.json', 'Block Patterns', 'HTML', 'CSS', 'WCAG 2.2 AA'],
    github: 'https://github.com/internick2017/kindly',
    demo: 'https://kindly.nickgranados.com',
    wporg: 'https://wordpress.org/themes/kindly/',
    image: '/images/project-kindly.png',
    category: 'wordpress',
    caseStudy: {
      en: {
        summary: 'A from-scratch WordPress block theme for nonprofits and congregations, accessible and lightweight by default.',
        problem: 'Nonprofits and churches usually reach for heavy multipurpose themes that load a page builder, make external font requests, lock features behind a Pro upgrade, and ship inaccessible markup. Small organizations end up with slow, non-compliant sites they cannot fully control.',
        approach: [
          'A Full Site Editing (FSE) block theme built from scratch using only core blocks, with no page builder.',
          'A theme.json v3 design system: semantic color palette, fluid typography, and a consistent spacing scale.',
          '7 block templates, 15 block patterns for the sections these sites actually need, and 3 style variations, every one passing WCAG AA color contrast.',
          'Fonts self-hosted so the theme makes zero external requests.',
        ],
        outcome: [
          'Live and running at kindly.nickgranados.com.',
          'WCAG 2.2 AA out of the box; passes the official Theme Check with zero required issues.',
          'Published in the official WordPress.org theme directory at wordpress.org/themes/kindly, having passed both the general and accessibility-ready reviews.',
        ],
      },
      es: {
        summary: 'Un tema de bloques de WordPress hecho desde cero para ONGs y congregaciones, accesible y liviano de fábrica.',
        problem: 'Las ONGs e iglesias suelen recurrir a temas multipropósito pesados que cargan un page builder, hacen requests externos de fuentes, lockean funciones tras un Pro y publican marcado inaccesible. Las organizaciones chicas terminan con sitios lentos, no conformes y que no pueden controlar del todo.',
        approach: [
          'Un tema de bloques Full Site Editing (FSE) hecho desde cero usando solo bloques del core, sin page builder.',
          'Un sistema de diseño theme.json v3: paleta de color semántica, tipografía fluida y una escala de espaciado consistente.',
          '7 plantillas de bloques, 15 patrones para las secciones que estos sitios de verdad necesitan y 3 variaciones de estilo, todas pasando el contraste de color WCAG AA.',
          'Fuentes self-hosted para que el tema no haga ningún request externo.',
        ],
        outcome: [
          'En vivo y funcionando en kindly.nickgranados.com.',
          'WCAG 2.2 AA de fábrica; pasa el Theme Check oficial con cero errores requeridos.',
          'Publicado en el directorio oficial de temas de WordPress.org en wordpress.org/themes/kindly, habiendo pasado la revisión general y la de accessibility-ready.',
        ],
      },
      pt: {
        summary: 'Um tema de blocos do WordPress feito do zero para ONGs e congregações, acessível e leve por padrão.',
        problem: 'ONGs e igrejas costumam recorrer a temas multipropósito pesados que carregam um page builder, fazem requests externos de fontes, travam recursos atrás de um Pro e publicam marcação inacessível. Organizações pequenas acabam com sites lentos, não conformes e que não conseguem controlar totalmente.',
        approach: [
          'Um tema de blocos Full Site Editing (FSE) feito do zero usando apenas blocos do core, sem page builder.',
          'Um sistema de design theme.json v3: paleta de cores semântica, tipografia fluida e uma escala de espaçamento consistente.',
          '7 templates de blocos, 15 patterns para as seções que esses sites realmente precisam e 3 variações de estilo, todas passando no contraste de cor WCAG AA.',
          'Fontes self-hosted para que o tema não faça nenhum request externo.',
        ],
        outcome: [
          'Ao vivo e funcionando em kindly.nickgranados.com.',
          'WCAG 2.2 AA por padrão; passa no Theme Check oficial com zero erros obrigatórios.',
          'Publicado no diretório oficial de temas do WordPress.org em wordpress.org/themes/kindly, tendo passado na revisão geral e na de accessibility-ready.',
        ],
      },
    },
  },
  {
    id: 'shopgraph',
    translations: {
      en: {
        title: 'Internick AI Product Schema - AI-Ready Products for WooCommerce',
        description: 'WooCommerce plugin that makes a store\'s products discoverable by AI shopping agents (ChatGPT, Gemini, Perplexity, Claude). It builds complete schema.org Product JSON-LD from live WooCommerce data and, crucially, coexists with the store\'s existing schema: it merges into WooCommerce Core\'s own Product node (and Yoast / Rank Math when present) via the woocommerce_structured_data_product filter instead of printing a duplicate. Adds AI product attributes (Q&A, compatible accessories, substitutes) in the product editor, serves an /llms.txt catalog index, and adds AI-crawler robots.txt directives. OOP PHP with PSR-4, a DDEV dev environment, and a PHPUnit + WooCommerce test suite; passes the official Plugin Check with zero errors.',
      },
      es: {
        title: 'Internick AI Product Schema - Productos Listos para IA en WooCommerce',
        description: 'Plugin de WooCommerce que hace los productos de una tienda descubribles por agentes de IA de compras (ChatGPT, Gemini, Perplexity, Claude). Construye JSON-LD schema.org Product completo desde los datos en vivo de WooCommerce y, lo más importante, coexiste con el schema existente de la tienda: fusiona en el nodo Product del propio WooCommerce (y de Yoast / Rank Math cuando están) vía el filtro woocommerce_structured_data_product en vez de imprimir un duplicado. Agrega atributos de IA de producto (Q&A, accesorios compatibles, substitutos) en el editor, sirve un índice de catálogo en /llms.txt y agrega directivas de robots.txt para crawlers de IA. PHP OOP con PSR-4, entorno DDEV y suite de tests PHPUnit + WooCommerce; pasa el Plugin Check oficial con cero errores.',
      },
      pt: {
        title: 'Internick AI Product Schema - Produtos Prontos para IA no WooCommerce',
        description: 'Plugin de WooCommerce que torna os produtos de uma loja descobríveis por agentes de IA de compras (ChatGPT, Gemini, Perplexity, Claude). Constrói JSON-LD schema.org Product completo a partir dos dados ao vivo do WooCommerce e, o mais importante, coexiste com o schema existente da loja: mescla no nó Product do próprio WooCommerce (e do Yoast / Rank Math quando presentes) via o filtro woocommerce_structured_data_product em vez de imprimir um duplicado. Adiciona atributos de IA de produto (Q&A, acessórios compatíveis, substitutos) no editor, serve um índice de catálogo em /llms.txt e adiciona diretivas de robots.txt para crawlers de IA. PHP OOP com PSR-4, ambiente DDEV e suíte de testes PHPUnit + WooCommerce; passa no Plugin Check oficial com zero erros.',
      },
    },
    technologies: ['WordPress', 'WooCommerce', 'PHP 8', 'PSR-4', 'JSON-LD', 'Schema.org', 'llms.txt', 'PHPUnit', 'DDEV'],
    github: 'https://github.com/internick2017/internick-ai-product-schema',
    demo: 'https://wordpress.org/plugins/internick-ai-product-schema/',
    image: '/images/project-shopgraph.png',
    category: 'wordpress',
    caseStudy: {
      en: {
        summary: 'A WooCommerce plugin that makes a store\'s products discoverable by AI shopping agents, without breaking the store\'s existing SEO.',
        problem: 'Shoppers increasingly ask ChatGPT, Gemini, and Perplexity where to buy things. Stores with no machine-readable product data are invisible to those agents. The usual fix, bolting on a second schema plugin, collides with the store\'s existing SEO markup and ships duplicate structured data that search engines penalize.',
        approach: [
          'Builds complete schema.org Product JSON-LD from live WooCommerce data: price, availability, ratings, variations.',
          'Merges into WooCommerce Core\'s own Product schema node, and into Yoast or Rank Math when active, instead of printing a duplicate node.',
          'Adds AI-specific product attributes in the editor (Q&A, compatible accessories, substitutes), serves an /llms.txt catalog index, and adds AI-crawler directives.',
          'OOP PHP with PSR-4 autoloading, a DDEV dev environment, and a PHPUnit + WooCommerce integration test suite.',
        ],
        outcome: [
          'Published in the official WordPress.org plugin directory at wordpress.org/plugins/internick-ai-product-schema.',
          '31 passing tests; passes the official Plugin Check with zero errors.',
          'Verified live against real Rank Math and Yoast installs: a single merged schema node, no duplication.',
        ],
      },
      es: {
        summary: 'Un plugin de WooCommerce que hace los productos de una tienda descubribles por agentes de IA de compras, sin romper el SEO existente.',
        problem: 'Cada vez más gente le pregunta a ChatGPT, Gemini y Perplexity dónde comprar algo. Las tiendas sin datos de producto legibles por máquina son invisibles para esos agentes. El arreglo típico, sumar un segundo plugin de schema, choca con el marcado SEO existente y publica datos estructurados duplicados que los buscadores penalizan.',
        approach: [
          'Construye JSON-LD schema.org Product completo desde los datos en vivo de WooCommerce: precio, disponibilidad, ratings, variaciones.',
          'Fusiona en el nodo Product del propio WooCommerce, y en Yoast o Rank Math cuando están activos, en vez de imprimir un nodo duplicado.',
          'Agrega atributos de producto para IA en el editor (Q&A, accesorios compatibles, substitutos), sirve un índice de catálogo /llms.txt y agrega directivas para crawlers de IA.',
          'PHP OOP con autoloading PSR-4, entorno DDEV y suite de tests PHPUnit + WooCommerce.',
        ],
        outcome: [
          'Publicado en el directorio oficial de plugins de WordPress.org, en wordpress.org/plugins/internick-ai-product-schema.',
          '31 tests verdes; pasa el Plugin Check oficial con cero errores.',
          'Verificado en vivo contra instalaciones reales de Rank Math y Yoast: un único nodo de schema fusionado, sin duplicación.',
        ],
      },
      pt: {
        summary: 'Um plugin de WooCommerce que torna os produtos de uma loja descobríveis por agentes de IA de compras, sem quebrar o SEO existente.',
        problem: 'Cada vez mais gente pergunta ao ChatGPT, Gemini e Perplexity onde comprar algo. Lojas sem dados de produto legíveis por máquina são invisíveis para esses agentes. A correção comum, adicionar um segundo plugin de schema, colide com a marcação de SEO existente e publica dados estruturados duplicados que os buscadores penalizam.',
        approach: [
          'Constrói JSON-LD schema.org Product completo a partir dos dados ao vivo do WooCommerce: preço, disponibilidade, avaliações, variações.',
          'Mescla no nó Product do próprio WooCommerce, e no Yoast ou Rank Math quando ativos, em vez de imprimir um nó duplicado.',
          'Adiciona atributos de produto para IA no editor (Q&A, acessórios compatíveis, substitutos), serve um índice de catálogo /llms.txt e adiciona diretivas para crawlers de IA.',
          'PHP OOP com autoloading PSR-4, ambiente DDEV e suíte de testes PHPUnit + WooCommerce.',
        ],
        outcome: [
          'Publicado no diretório oficial de plugins do WordPress.org, em wordpress.org/plugins/internick-ai-product-schema.',
          '31 testes verdes; passa no Plugin Check oficial com zero erros.',
          'Verificado ao vivo contra instalações reais de Rank Math e Yoast: um único nó de schema mesclado, sem duplicação.',
        ],
      },
    },
  },
  {
    id: 'gramtospoon',
    translations: {
      en: {
        title: 'GramToSpoon - Kitchen Conversion Tool',
        description: 'A cooking utility website that converts weight measurements (grams) into volume measurements (cups, tablespoons, and teaspoons) for 47 common kitchen ingredients across 9 categories. Features an interactive calculator and over 400 pre-built conversion pages optimized for SEO.',
      },
      es: {
        title: 'GramToSpoon - Herramienta de Conversión de Cocina',
        description: 'Un sitio web utilitario de cocina que convierte medidas de peso (gramos) a medidas de volumen (tazas, cucharadas y cucharaditas) para 47 ingredientes comunes en 9 categorías. Incluye calculadora interactiva y más de 400 páginas optimizadas para SEO.',
      },
      pt: {
        title: 'GramToSpoon - Ferramenta de Conversão Culinária',
        description: 'Um site utilitário de culinária que converte medidas de peso (gramas) em medidas de volume (xícaras, colheres de sopa e colheres de chá) para 47 ingredientes em 9 categorias. Possui calculadora interativa e mais de 400 páginas otimizadas para SEO.',
      },
    },
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'SEO Optimization', 'Schema.org', 'JSON-LD', 'Static Site Generation', 'Responsive Design'],
    github: 'https://github.com/internick2017',
    demo: 'https://gramtospoon.nickgranados.com/',
    image: '/images/project-gramtospoon.png',
    category: 'frontend',
    caseStudy: {
      en: {
        summary: 'A kitchen converter that answers the exact question people type into a search bar, on its own page, generated in bulk.',
        problem: 'Someone cooking does not search for a converter tool. They search for one specific thing: how many cups is 200 grams of flour. A single calculator page competes badly for that, because the page never contains the phrase the person actually typed. The interesting problem is producing hundreds of specific answer pages without hand-writing hundreds of files, and keeping them consistent when the underlying data changes.',
        approach: [
          'Ingredient data is the single source of truth: 47 ingredients, each carrying its grams per cup, per tablespoon and per teaspoon, so every conversion derives from one number rather than a hardcoded table.',
          'A Node generator reads that data and writes the site: 431 conversion pages, each one dedicated to a specific amount, ingredient and unit, plus an index of all conversions and the updated homepage.',
          'Which pages get generated is driven by a tier configuration that pairs amount ranges with units, so coverage can be widened or narrowed by editing config instead of writing files.',
          'The output is plain static HTML with a sitemap and robots file, so the site can be hosted anywhere and indexed cleanly.',
          'Regenerating is idempotent: correcting one ingredient value updates every page that depends on it in a single run.',
        ],
        outcome: [
          '431 individual conversion pages generated from 47 ingredient records.',
          'Adding an ingredient or fixing a ratio propagates to every affected page automatically.',
          'Pure static output with sitemap and robots, served from its own domain.',
          'Demonstrates programmatic content generation, not a single-page calculator.',
        ],
      },
      es: {
        summary: 'Un conversor de cocina que responde exactamente la pregunta que la gente escribe en el buscador, en su propia página, generada en masa.',
        problem: 'Alguien que está cocinando no busca una herramienta de conversión. Busca una cosa puntual: cuántas tazas son 200 gramos de harina. Una sola página con una calculadora compite mal por esa búsqueda, porque la página nunca contiene la frase que la persona realmente escribió. El problema interesante es producir cientos de páginas de respuesta específica sin escribir a mano cientos de archivos, y mantenerlas consistentes cuando los datos de base cambian.',
        approach: [
          'Los datos de ingredientes son la única fuente de verdad: 47 ingredientes, cada uno con sus gramos por taza, por cucharada y por cucharadita, así cada conversión se deriva de un número y no de una tabla hardcodeada.',
          'Un generador en Node lee esos datos y escribe el sitio: 431 páginas de conversión, cada una dedicada a una cantidad, un ingrediente y una unidad específicos, más un índice de todas las conversiones y la home actualizada.',
          'Qué páginas se generan lo decide una configuración por niveles que combina rangos de cantidad con unidades, así la cobertura se amplía o se recorta editando configuración en lugar de escribiendo archivos.',
          'La salida es HTML estático puro con sitemap y robots, así el sitio se puede hostear en cualquier lado y se indexa limpio.',
          'Regenerar es idempotente: corregir el valor de un ingrediente actualiza en una sola corrida todas las páginas que dependen de él.',
        ],
        outcome: [
          '431 páginas de conversión individuales generadas a partir de 47 registros de ingredientes.',
          'Agregar un ingrediente o corregir una proporción se propaga solo a todas las páginas afectadas.',
          'Salida estática pura con sitemap y robots, servida desde su propio dominio.',
          'Demuestra generación programática de contenido, no una calculadora de una sola página.',
        ],
      },
      pt: {
        summary: 'Um conversor de cozinha que responde exatamente a pergunta que as pessoas digitam na busca, em sua própria página, gerada em massa.',
        problem: 'Quem está cozinhando não procura uma ferramenta de conversão. Procura uma coisa pontual: quantas xícaras são 200 gramas de farinha. Uma única página com calculadora compete mal por essa busca, porque a página nunca contém a frase que a pessoa realmente digitou. O problema interessante é produzir centenas de páginas de resposta específica sem escrever à mão centenas de arquivos, e mantê-las consistentes quando os dados de base mudam.',
        approach: [
          'Os dados de ingredientes são a única fonte de verdade: 47 ingredientes, cada um com seus gramas por xícara, por colher de sopa e por colher de chá, então cada conversão deriva de um número e não de uma tabela fixa no código.',
          'Um gerador em Node lê esses dados e escreve o site: 431 páginas de conversão, cada uma dedicada a uma quantidade, um ingrediente e uma unidade específicos, mais um índice de todas as conversões e a home atualizada.',
          'Quais páginas são geradas é decidido por uma configuração em níveis que combina faixas de quantidade com unidades, então a cobertura se amplia ou se reduz editando configuração em vez de escrevendo arquivos.',
          'A saída é HTML estático puro com sitemap e robots, então o site pode ser hospedado em qualquer lugar e indexado de forma limpa.',
          'Regerar é idempotente: corrigir o valor de um ingrediente atualiza numa única execução todas as páginas que dependem dele.',
        ],
        outcome: [
          '431 páginas de conversão individuais geradas a partir de 47 registros de ingredientes.',
          'Adicionar um ingrediente ou corrigir uma proporção se propaga sozinho para todas as páginas afetadas.',
          'Saída estática pura com sitemap e robots, servida a partir do próprio domínio.',
          'Demonstra geração programática de conteúdo, não uma calculadora de página única.',
        ],
      },
    },
  },
  {
    id: 'repairshop',
    translations: {
      en: {
        title: 'Repair Shop Management System',
        description: 'Full-stack web application for managing a computer repair business. Features customer management, work order tracking, and technician assignments with role-based authentication via Kinde and a serverless Neon PostgreSQL database.',
      },
      es: {
        title: 'Sistema de Gestión de Taller de Reparación',
        description: 'Aplicación web full-stack para administrar un negocio de reparación de computadoras. Incluye gestión de clientes, seguimiento de órdenes de trabajo y autenticación por roles con base de datos PostgreSQL serverless.',
      },
      pt: {
        title: 'Sistema de Gestão de Oficina de Reparos',
        description: 'Aplicação web full-stack para gerenciar um negócio de reparo de computadores. Inclui gestão de clientes, rastreamento de ordens de serviço e autenticação por função com banco de dados PostgreSQL serverless.',
      },
    },
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Neon Database', 'Drizzle ORM', 'Kinde Auth', 'shadcn/ui', 'Sentry', 'React Hook Form', 'Zod', 'TanStack Table', 'Vitest'],
    github: null,
    demo: 'https://repairshop-puce.vercel.app/',
    image: '/images/project-repairshop.png',
    category: 'fullstack',
    caseStudy: {
      en: {
        summary: 'A work-order system for a repair business, with a one-click demo that logs a stranger in against a real hosted identity provider.',
        problem: 'A repair shop runs on work orders: who the customer is, what came in, which technician owns it, and whether it is still open. That is straightforward to model. The hard problem was the demo. The app authenticates against Kinde, a hosted identity provider, and a hosted provider deliberately gives you no way to hand a visitor a session. So either every prospective client has to create a real account before seeing anything, or the login has to be solved properly on the server.',
        approach: [
          'Customers, tickets and user permissions are modelled in Postgres with Drizzle ORM, running on Neon serverless, with indexes on the fields the permission checks actually filter by.',
          'Authentication is delegated to Kinde rather than hand-rolled, and a permissions table maps each Kinde user id to a role, so authorization stays in the application while identity stays with the provider.',
          'The one-click demo is the centerpiece: a server-side route drives the provider\'s real login flow end to end, extracting the hidden form fields, maintaining a cookie jar across redirects, and decoding the returned token, then sets the session cookies on the visitor. The visitor clicks once and is inside the app as the demo user, with no account and no shared password typed anywhere.',
          'Forms are validated with Zod schemas generated from the database schema, so the validation rules and the table definition cannot drift apart.',
          'Ticket and customer lists use TanStack Table for sorting, filtering and pagination against real data rather than a static mock.',
          'Sentry is wired in for error tracking, and a health endpoint plus a migration endpoint make the deployed instance inspectable and upgradable without shell access.',
        ],
        outcome: [
          'Live demo anyone can enter in one click, with no signup and no credentials to type.',
          'Automated tests cover the input sanitization layer and interactive components.',
          'Authorization is enforced by role in the database, not by hiding buttons in the UI.',
          'Deployed on Vercel against a serverless Neon Postgres instance.',
        ],
      },
      es: {
        summary: 'Un sistema de órdenes de trabajo para un taller de reparación, con un demo de un clic que loguea a un desconocido contra un proveedor de identidad real.',
        problem: 'Un taller de reparación funciona con órdenes de trabajo: quién es el cliente, qué entró, qué técnico se hace cargo y si sigue abierta. Eso es directo de modelar. El problema difícil era el demo. La app se autentica contra Kinde, un proveedor de identidad hosteado, y un proveedor hosteado a propósito no te da forma de entregarle una sesión a un visitante. Entonces, o cada cliente potencial se crea una cuenta real antes de ver nada, o el login se resuelve bien del lado del servidor.',
        approach: [
          'Clientes, tickets y permisos de usuario están modelados en Postgres con Drizzle ORM, corriendo sobre Neon serverless, con índices en los campos por los que realmente filtran los chequeos de permisos.',
          'La autenticación se delega en Kinde en vez de hacerla a mano, y una tabla de permisos mapea cada id de usuario de Kinde a un rol, así la autorización queda en la aplicación y la identidad en el proveedor.',
          'El demo de un clic es la pieza central: una ruta del lado del servidor recorre el flujo de login real del proveedor de punta a punta, extrayendo los campos ocultos del formulario, manteniendo un cookie jar entre redirecciones y decodificando el token devuelto, y después setea las cookies de sesión en el visitante. El visitante hace un clic y ya está adentro como usuario demo, sin cuenta y sin tener que tipear una contraseña compartida.',
          'Los formularios se validan con esquemas Zod generados desde el esquema de la base de datos, así las reglas de validación y la definición de la tabla no pueden desincronizarse.',
          'Las listas de tickets y clientes usan TanStack Table para ordenar, filtrar y paginar contra datos reales, no contra un mock estático.',
          'Sentry está integrado para seguimiento de errores, y un endpoint de health más uno de migraciones hacen que la instancia desplegada sea inspeccionable y actualizable sin acceso por shell.',
        ],
        outcome: [
          'Demo en vivo al que cualquiera entra con un clic, sin registro y sin credenciales para tipear.',
          'Tests automatizados que cubren la capa de sanitización de entradas y componentes interactivos.',
          'La autorización se impone por rol en la base de datos, no escondiendo botones en la interfaz.',
          'Desplegado en Vercel contra una instancia Postgres serverless de Neon.',
        ],
      },
      pt: {
        summary: 'Um sistema de ordens de serviço para uma oficina de reparos, com um demo de um clique que loga um desconhecido contra um provedor de identidade real.',
        problem: 'Uma oficina de reparos funciona com ordens de serviço: quem é o cliente, o que entrou, qual técnico assume e se ainda está aberta. Isso é direto de modelar. O problema difícil era o demo. O app autentica contra o Kinde, um provedor de identidade hospedado, e um provedor hospedado de propósito não te dá como entregar uma sessão a um visitante. Então, ou cada cliente em potencial cria uma conta real antes de ver qualquer coisa, ou o login é resolvido direito no servidor.',
        approach: [
          'Clientes, tickets e permissões de usuário são modelados em Postgres com Drizzle ORM, rodando sobre Neon serverless, com índices nos campos pelos quais as checagens de permissão realmente filtram.',
          'A autenticação é delegada ao Kinde em vez de feita à mão, e uma tabela de permissões mapeia cada id de usuário do Kinde para um papel, então a autorização fica na aplicação e a identidade no provedor.',
          'O demo de um clique é a peça central: uma rota no servidor percorre o fluxo de login real do provedor de ponta a ponta, extraindo os campos ocultos do formulário, mantendo um cookie jar entre redirecionamentos e decodificando o token devolvido, e então grava os cookies de sessão no visitante. O visitante dá um clique e já está dentro como usuário demo, sem conta e sem digitar senha compartilhada.',
          'Os formulários são validados com esquemas Zod gerados a partir do esquema do banco, então as regras de validação e a definição da tabela não podem se desencontrar.',
          'As listas de tickets e clientes usam TanStack Table para ordenar, filtrar e paginar contra dados reais, não contra um mock estático.',
          'O Sentry está integrado para rastreamento de erros, e um endpoint de health mais um de migrações tornam a instância implantada inspecionável e atualizável sem acesso por shell.',
        ],
        outcome: [
          'Demo ao vivo em que qualquer um entra com um clique, sem cadastro e sem credenciais para digitar.',
          'Testes automatizados cobrindo a camada de sanitização de entradas e componentes interativos.',
          'A autorização é imposta por papel no banco de dados, não escondendo botões na interface.',
          'Implantado na Vercel contra uma instância Postgres serverless da Neon.',
        ],
      },
    },
  },
  {
    id: 'jjj-investments',
    translations: {
      en: {
        title: 'J.J.J Investments - Family Portfolio Platform',
        description: 'Professional family investment management platform with real-time portfolio tracking, transaction history, performance analytics, and sector distribution charts. Built with enterprise-grade security and role-based access control.',
      },
      es: {
        title: 'J.J.J Investments - Plataforma de Portafolio Familiar',
        description: 'Plataforma profesional de gestión de inversiones familiares con seguimiento de portafolio en tiempo real, historial de transacciones, análisis de rendimiento y gráficos de distribución por sector.',
      },
      pt: {
        title: 'J.J.J Investments - Plataforma de Portfólio Familiar',
        description: 'Plataforma profissional de gestão de investimentos familiares com acompanhamento de portfólio em tempo real, histórico de transações, análise de desempenho e gráficos de distribuição setorial.',
      },
    },
    technologies: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'NextAuth.js', 'Recharts', 'shadcn/ui', 'Jest', 'Playwright'],
    github: null,
    demo: 'https://family-investments.netlify.app/',
    image: '/images/project-jjj.png',
    category: 'fullstack',
    caseStudy: {
      en: {
        summary: 'A multi-user investment platform where the hard part is not the charts, it is keeping the numbers correct across currencies, roles and redeploys.',
        problem: 'A family managing investments together has a problem a single-user app does not: several people touch the same portfolio, holdings sit in different currencies and on different exchanges, and every figure on screen has to reconcile with the transaction history behind it. On top of that, a portfolio app is only credible to a stranger if they can walk in and see real-looking data immediately, without creating an account.',
        approach: [
          'The domain is modelled in Prisma across seven entities: users, family members, investments, portfolio items, transactions, alerts and investment goals, with roles and transaction types as enums rather than loose strings.',
          'Roughly eighteen API routes cover portfolio, positions, transactions, family membership and invitations, goals, alerts and reports, so the front end never talks to the database directly.',
          'Holdings span Brazilian equities on B3 and US equities on NASDAQ, so values are held per currency and converted through a dedicated exchange-rate endpoint instead of assuming one currency.',
          'Authentication uses NextAuth with role-based access, and sign-in attempts pass through a rate limiter to make credential stuffing expensive.',
          'A one-click demo account lets anyone in without registering. The seeding endpoint is written with upserts, so re-running it after a deploy refreshes prices instead of duplicating or destroying the demo data.',
          'Errors and logging are centralized in their own modules rather than scattered console calls, which is what makes a production incident diagnosable.',
        ],
        outcome: [
          '121 automated tests: Jest for API routes, components and helpers, plus Playwright end-to-end specs covering authentication, dashboard and portfolio management.',
          'Live demo with visible credentials (demo@jjj.com / Demo1234!) and realistic seeded data, no signup required.',
          'The demo survives redeploys: an earlier deploy step used to wipe the demo user, and the seeding was made idempotent to fix it for good.',
          'Multi-currency portfolio values reconcile with the underlying transaction history.',
        ],
      },
      es: {
        summary: 'Una plataforma de inversiones multiusuario donde lo difícil no son los gráficos, sino mantener los números correctos entre monedas, roles y redeploys.',
        problem: 'Una familia que administra inversiones en conjunto tiene un problema que una app de un solo usuario no tiene: varias personas tocan la misma cartera, las posiciones están en monedas distintas y en bolsas distintas, y cada cifra en pantalla tiene que cuadrar con el historial de transacciones que la respalda. Además, una app de portafolio solo le resulta creíble a un desconocido si puede entrar y ver datos realistas de inmediato, sin crear una cuenta.',
        approach: [
          'El dominio está modelado en Prisma con siete entidades: usuarios, miembros de la familia, inversiones, posiciones del portafolio, transacciones, alertas y metas de inversión, con los roles y tipos de transacción como enums y no como strings sueltos.',
          'Unas dieciocho rutas de API cubren portafolio, posiciones, transacciones, membresía familiar e invitaciones, metas, alertas y reportes, así el front end nunca habla directo con la base de datos.',
          'Las posiciones incluyen acciones brasileñas en B3 y acciones estadounidenses en NASDAQ, así que los valores se guardan por moneda y se convierten con un endpoint dedicado de tipo de cambio, en vez de asumir una sola moneda.',
          'La autenticación usa NextAuth con acceso por roles, y los intentos de login pasan por un rate limiter para encarecer el credential stuffing.',
          'Una cuenta demo de un clic deja entrar a cualquiera sin registrarse. El endpoint de siembra está escrito con upserts, así que re-ejecutarlo después de un deploy actualiza precios en vez de duplicar o destruir los datos del demo.',
          'Los errores y el logging están centralizados en módulos propios, no en llamadas a console desparramadas, que es lo que hace diagnosticable un incidente en producción.',
        ],
        outcome: [
          '121 tests automatizados: Jest para rutas de API, componentes y helpers, más specs end-to-end de Playwright que cubren autenticación, dashboard y gestión de portafolio.',
          'Demo en vivo con credenciales visibles (demo@jjj.com / Demo1234!) y datos sembrados realistas, sin registro.',
          'El demo sobrevive a los redeploys: un paso del deploy borraba al usuario demo, y la siembra se volvió idempotente para arreglarlo de raíz.',
          'Los valores del portafolio multimoneda cuadran con el historial de transacciones que los respalda.',
        ],
      },
      pt: {
        summary: 'Uma plataforma de investimentos multiusuário onde o difícil não são os gráficos, e sim manter os números corretos entre moedas, papéis e redeploys.',
        problem: 'Uma família que administra investimentos em conjunto tem um problema que um app de usuário único não tem: várias pessoas mexem na mesma carteira, as posições estão em moedas e bolsas diferentes, e cada número na tela precisa bater com o histórico de transações que o sustenta. Além disso, um app de portfólio só é crível para um desconhecido se ele puder entrar e ver dados realistas na hora, sem criar conta.',
        approach: [
          'O domínio é modelado no Prisma em sete entidades: usuários, membros da família, investimentos, posições da carteira, transações, alertas e metas de investimento, com papéis e tipos de transação como enums, não como strings soltas.',
          'Cerca de dezoito rotas de API cobrem carteira, posições, transações, participação familiar e convites, metas, alertas e relatórios, então o front end nunca fala direto com o banco.',
          'As posições incluem ações brasileiras na B3 e ações americanas na NASDAQ, então os valores são guardados por moeda e convertidos por um endpoint dedicado de câmbio, em vez de assumir uma moeda só.',
          'A autenticação usa NextAuth com acesso por papéis, e as tentativas de login passam por um rate limiter para encarecer o credential stuffing.',
          'Uma conta demo de um clique deixa qualquer pessoa entrar sem se cadastrar. O endpoint de seed é escrito com upserts, então re-executá-lo depois de um deploy atualiza preços em vez de duplicar ou destruir os dados do demo.',
          'Erros e logging ficam centralizados em módulos próprios, não em chamadas de console espalhadas, que é o que torna um incidente em produção diagnosticável.',
        ],
        outcome: [
          '121 testes automatizados: Jest para rotas de API, componentes e helpers, mais specs end-to-end de Playwright cobrindo autenticação, dashboard e gestão de carteira.',
          'Demo ao vivo com credenciais visíveis (demo@jjj.com / Demo1234!) e dados semeados realistas, sem cadastro.',
          'O demo sobrevive aos redeploys: uma etapa do deploy apagava o usuário demo, e o seed virou idempotente para resolver de vez.',
          'Os valores da carteira multimoeda batem com o histórico de transações que os sustenta.',
        ],
      },
    },
  },
  {
    id: 'lanny-herrera',
    translations: {
      en: {
        title: 'Lanny Herrera - Language Teacher Website',
        description: 'Multilingual one-page website for an online language teacher. Built on WordPress with a custom Astra child theme, Polylang (PT/ES/EN), custom testimonials CPT, Contact Form 7, Yoast SEO with per-language meta, and CI/CD auto-deploy via GitHub Actions + SFTP.',
      },
      es: {
        title: 'Lanny Herrera - Sitio Web para Profesora de Idiomas',
        description: 'Sitio web one-page multilingüe para una profesora de idiomas online. Construido en WordPress con tema hijo personalizado de Astra, Polylang (PT/ES/EN), CPT de testimonios, Contact Form 7, Yoast SEO con meta por idioma y deploy automático via GitHub Actions + SFTP.',
      },
      pt: {
        title: 'Lanny Herrera - Site para Professora de Idiomas',
        description: 'Site one-page multilíngue para professora de idiomas online. Construído em WordPress com tema filho Astra customizado, Polylang (PT/ES/EN), CPT de depoimentos, Contact Form 7, Yoast SEO com meta por idioma e deploy automático via GitHub Actions + SFTP.',
      },
    },
    technologies: ['WordPress', 'PHP', 'Astra', 'Polylang', 'Contact Form 7', 'Yoast SEO', 'GitHub Actions', 'CSS3'],
    github: null,
    demo: 'https://lanny.nickgranados.com',
    image: '/images/project-lanny.png',
    category: 'wordpress',
    caseStudy: {
      en: {
        summary: 'A real client site in three languages, built as an Astra child theme so the client keeps a WordPress she can actually use.',
        problem: 'A private language teacher sells in three languages to three different audiences, and her site has to speak all of them without turning into three separate sites to maintain. The constraint that shapes everything: she is not a developer. Whatever gets built has to stay editable from wp-admin after the developer leaves, which rules out both a hand-coded static site and a page builder that locks the layout behind a proprietary editor.',
        approach: [
          'The site is an Astra child theme rather than a from-scratch theme, so security updates keep flowing from the parent while the customization stays isolated in the child.',
          'The homepage is a custom front-page template, so the layout is real PHP under version control instead of a page-builder blob that cannot be diffed.',
          'Every piece of interface copy lives in one strings function keyed by language, with Portuguese as the fallback. Polylang decides the active language and the template pulls the matching set, so adding a language means adding a block of strings, not rebuilding the page.',
          'Testimonials are a custom post type registered in the theme and explicitly opted into Polylang translation, with a custom admin column so the client can see at a glance what she is editing.',
          'A bootstrap script creates the initial page structure through the WordPress REST API, making the site reproducible instead of hand-assembled.',
        ],
        outcome: [
          'Live client site serving Portuguese, Spanish and English from one WordPress install.',
          'The client edits her own content in wp-admin, including testimonials, with no developer involved.',
          'Layout and copy are versioned in git as a child theme, so changes are reviewable and reversible.',
          'Parent theme updates stay safe to apply because no core theme file was modified.',
        ],
      },
      es: {
        summary: 'Un sitio de clienta real en tres idiomas, hecho como tema hijo de Astra para que ella se quede con un WordPress que sí puede usar.',
        problem: 'Una profesora de idiomas particular vende en tres idiomas a tres públicos distintos, y su sitio tiene que hablarlos todos sin convertirse en tres sitios separados para mantener. La restricción que ordena todo lo demás: ella no es programadora. Lo que se construya tiene que seguir siendo editable desde wp-admin después de que el desarrollador se va, lo que descarta tanto un sitio estático escrito a mano como un page builder que encierra el diseño en un editor propietario.',
        approach: [
          'El sitio es un tema hijo de Astra y no un tema desde cero, así las actualizaciones de seguridad siguen llegando desde el tema padre mientras la personalización queda aislada en el hijo.',
          'La home es una plantilla front-page propia, así el diseño es PHP real bajo control de versiones y no un bloque de page builder que no se puede diffear.',
          'Todo el texto de interfaz vive en una única función de strings indexada por idioma, con portugués como respaldo. Polylang decide el idioma activo y la plantilla toma el conjunto correspondiente, así que agregar un idioma es agregar un bloque de strings, no rehacer la página.',
          'Los testimonios son un custom post type registrado en el tema y habilitado explícitamente para la traducción de Polylang, con una columna propia en el admin para que la clienta vea de un vistazo qué está editando.',
          'Un script de bootstrap crea la estructura inicial de páginas por la REST API de WordPress, lo que hace el sitio reproducible en vez de armado a mano.',
        ],
        outcome: [
          'Sitio de clienta en vivo sirviendo portugués, español e inglés desde una sola instalación de WordPress.',
          'La clienta edita su propio contenido en wp-admin, testimonios incluidos, sin depender de un desarrollador.',
          'El diseño y los textos están versionados en git como tema hijo, así los cambios son revisables y reversibles.',
          'Las actualizaciones del tema padre se pueden aplicar sin miedo porque no se modificó ningún archivo del tema original.',
        ],
      },
      pt: {
        summary: 'Um site de cliente real em três idiomas, feito como tema filho do Astra para que ela fique com um WordPress que consegue usar de verdade.',
        problem: 'Uma professora de idiomas particular vende em três idiomas para três públicos diferentes, e o site dela precisa falar todos sem virar três sites separados para manter. A restrição que ordena todo o resto: ela não é programadora. O que for construído precisa continuar editável pelo wp-admin depois que o desenvolvedor sai, o que descarta tanto um site estático escrito à mão quanto um page builder que tranca o layout dentro de um editor proprietário.',
        approach: [
          'O site é um tema filho do Astra, não um tema do zero, então as atualizações de segurança continuam chegando pelo tema pai enquanto a personalização fica isolada no filho.',
          'A home é um template front-page próprio, então o layout é PHP de verdade sob controle de versão, e não um bloco de page builder que não dá para diferenciar.',
          'Todo o texto de interface vive em uma única função de strings indexada por idioma, com português como fallback. O Polylang decide o idioma ativo e o template puxa o conjunto correspondente, então adicionar um idioma é adicionar um bloco de strings, não refazer a página.',
          'Os depoimentos são um custom post type registrado no tema e habilitado explicitamente para a tradução do Polylang, com uma coluna própria no admin para a cliente ver de relance o que está editando.',
          'Um script de bootstrap cria a estrutura inicial de páginas pela REST API do WordPress, o que torna o site reproduzível em vez de montado à mão.',
        ],
        outcome: [
          'Site de cliente ao vivo servindo português, espanhol e inglês a partir de uma única instalação WordPress.',
          'A cliente edita o próprio conteúdo no wp-admin, incluindo depoimentos, sem depender de um desenvolvedor.',
          'Layout e textos ficam versionados no git como tema filho, então as mudanças são revisáveis e reversíveis.',
          'As atualizações do tema pai podem ser aplicadas com segurança porque nenhum arquivo do tema original foi modificado.',
        ],
      },
    },
  },
  {
    id: 'dose-time',
    translations: {
      en: {
        title: 'DoseTime - Medication Reminder App',
        description: 'Android app that generates automatic push notifications from doctor-prescribed medication schedules. Features a daily dose timeline, medication management, history with adherence tracking, and local SQLite storage, with no backend or account needed.',
      },
      es: {
        title: 'DoseTime - App de Recordatorio de Medicamentos',
        description: 'App Android que genera notificaciones push automáticas a partir de horarios médicos. Incluye línea de tiempo diaria de dosis, gestión de medicamentos, historial con porcentaje de adherencia y almacenamiento local SQLite, sin backend ni cuenta requerida.',
      },
      pt: {
        title: 'DoseTime - App de Lembretes de Medicamentos',
        description: 'App Android que gera notificações push automáticas a partir de horários médicos. Inclui linha do tempo diária de doses, gestão de medicamentos, histórico com aderência e armazenamento local SQLite, sem backend ou conta necessária.',
      },
    },
    technologies: ['React Native', 'Expo SDK 52', 'TypeScript', 'SQLite', 'Zustand', 'expo-notifications', 'React Navigation', 'EAS Build'],
    github: null,
    demo: 'https://expo.dev/accounts/internick/projects/dose-time/builds/7087ee49-0135-4e69-aa96-95b0a9068a57',
    image: '/images/project-dosetime.png',
    category: 'mobile',
    caseStudy: {
      en: {
        summary: 'A medication reminder that turns a prescription sentence into a concrete list of dose times, and then holds itself accountable for each one.',
        problem: 'A doctor prescribes in words: this pill, every eight hours, for seven days. A phone can only remind you if that sentence becomes a specific list of timestamps. And a reminder that fires is not enough on its own, because what matters clinically is whether the dose was actually taken. Both of those have to keep working offline, since someone should not need a connection to know when their next dose is due.',
        approach: [
          'A scheduling module expands the prescription into concrete dose times: the frequency is normalized to hours (whether entered in hours, days or weeks), then multiplied out across the treatment duration to produce every timestamp in advance.',
          'Each generated time becomes a dose log row with an explicit status of pending, taken or skipped, so the app records what actually happened rather than only what was planned.',
          'Notification identifiers are stored alongside their dose logs, which is what allows a medication to be edited or cancelled without leaving orphaned reminders firing on the phone.',
          'All data lives in on-device SQLite, so the schedule, the history and the adherence view work with no network and no account.',
          'Four screens keep the flow tight: today\'s doses, the medication list, adding a medication, and history with adherence tracking.',
          'AdMob is integrated as the monetization path, and the Play Store assets are prepared for submission.',
        ],
        outcome: [
          '43 automated tests covering the scheduling maths, the database layer and the dose flows.',
          'Works fully offline: local SQLite, no account, no backend.',
          'Cancelling or editing a medication cleans up its pending notifications instead of leaving them behind.',
          'Built with Expo and React Navigation, with AdMob wired in and store assets ready.',
        ],
      },
      es: {
        summary: 'Un recordatorio de medicación que convierte la frase de una receta en una lista concreta de horarios, y después se hace cargo de cada uno.',
        problem: 'El médico receta con palabras: esta pastilla, cada ocho horas, durante siete días. Un teléfono solo puede avisarte si esa frase se convierte en una lista específica de horarios. Y que suene una alarma no alcanza, porque lo que importa clínicamente es si la dosis se tomó de verdad. Las dos cosas tienen que seguir funcionando sin internet, porque nadie debería necesitar conexión para saber cuándo le toca la próxima dosis.',
        approach: [
          'Un módulo de agenda expande la receta en horarios concretos: la frecuencia se normaliza a horas (se haya cargado en horas, días o semanas) y después se multiplica por la duración del tratamiento para generar por adelantado todos los horarios.',
          'Cada horario generado se convierte en un registro de dosis con un estado explícito de pendiente, tomada u omitida, así la app registra lo que realmente pasó y no solo lo que estaba planeado.',
          'Los identificadores de notificación se guardan junto a su registro de dosis, que es lo que permite editar o cancelar un medicamento sin dejar recordatorios huérfanos sonando en el teléfono.',
          'Todos los datos viven en SQLite en el dispositivo, así que la agenda, el historial y la vista de adherencia funcionan sin red y sin cuenta.',
          'Cuatro pantallas mantienen el flujo corto: las dosis de hoy, la lista de medicamentos, alta de medicamento, e historial con seguimiento de adherencia.',
          'AdMob está integrado como vía de monetización, y los assets para Play Store quedaron preparados para publicar.',
        ],
        outcome: [
          '43 tests automatizados que cubren la matemática de la agenda, la capa de base de datos y los flujos de dosis.',
          'Funciona totalmente sin conexión: SQLite local, sin cuenta y sin backend.',
          'Cancelar o editar un medicamento limpia sus notificaciones pendientes en vez de dejarlas colgadas.',
          'Construida con Expo y React Navigation, con AdMob integrado y los assets de la tienda listos.',
        ],
      },
      pt: {
        summary: 'Um lembrete de medicação que transforma a frase de uma receita em uma lista concreta de horários, e depois se responsabiliza por cada um.',
        problem: 'O médico receita com palavras: este comprimido, a cada oito horas, por sete dias. Um celular só consegue te avisar se essa frase virar uma lista específica de horários. E disparar um alarme não basta, porque o que importa clinicamente é se a dose foi realmente tomada. As duas coisas precisam continuar funcionando sem internet, porque ninguém deveria precisar de conexão para saber quando é a próxima dose.',
        approach: [
          'Um módulo de agenda expande a receita em horários concretos: a frequência é normalizada para horas (tenha sido informada em horas, dias ou semanas) e então multiplicada pela duração do tratamento para gerar antecipadamente todos os horários.',
          'Cada horário gerado vira um registro de dose com status explícito de pendente, tomada ou pulada, então o app registra o que de fato aconteceu, e não apenas o que estava planejado.',
          'Os identificadores de notificação são guardados junto ao seu registro de dose, o que permite editar ou cancelar um medicamento sem deixar lembretes órfãos tocando no celular.',
          'Todos os dados ficam em SQLite no próprio aparelho, então a agenda, o histórico e a visão de adesão funcionam sem rede e sem conta.',
          'Quatro telas mantêm o fluxo curto: as doses de hoje, a lista de medicamentos, o cadastro de medicamento, e o histórico com acompanhamento de adesão.',
          'O AdMob está integrado como caminho de monetização, e os assets para a Play Store ficaram prontos para publicação.',
        ],
        outcome: [
          '43 testes automatizados cobrindo a matemática da agenda, a camada de banco de dados e os fluxos de dose.',
          'Funciona totalmente offline: SQLite local, sem conta e sem backend.',
          'Cancelar ou editar um medicamento limpa suas notificações pendentes em vez de deixá-las soltas.',
          'Construído com Expo e React Navigation, com AdMob integrado e os assets da loja prontos.',
        ],
      },
    },
  },
  {
    id: 'clear-path',
    translations: {
      en: {
        title: 'Clear Path - Personal Finance Dashboard',
        description: 'Full-stack personal finance app built with Laravel 12, Vue 3, and Inertia.js. Track expenses, set budgets, and monitor financial goals with an interactive dashboard.',
      },
      es: {
        title: 'Clear Path - Panel de Finanzas Personales',
        description: 'App de finanzas personales full-stack con Laravel 12, Vue 3 e Inertia.js. Registrá gastos, creá presupuestos y seguí tus metas financieras desde un dashboard interactivo.',
      },
      pt: {
        title: 'Clear Path - Painel de Finanças Pessoais',
        description: 'App de finanças pessoais full-stack com Laravel 12, Vue 3 e Inertia.js. Registre gastos, crie orçamentos e acompanhe suas metas financeiras em um dashboard interativo.',
      },
    },
    technologies: ['Laravel', 'Vue 3', 'Inertia.js', 'Tailwind CSS', 'SQLite', 'PHP'],
    github: 'https://github.com/internick2017/clear-path',
    // Demo temporarily unlinked: the Render free instance is suspended ("free usage limit reached"),
    // so the URL returns 503. Restore this line once the service is back up and verified.
    // Live URL when available: https://clear-path-9008.onrender.com
    demo: null,
    image: '/images/project-clear-path.png',
    category: 'fullstack',
    caseStudy: {
      en: {
        summary: 'A personal finance app that does the part most budget apps skip: telling you which debt to kill first, and proving how it got there.',
        problem: 'Most budgeting tools stop at recording what you spent. The harder and more useful question is what to do next, especially when several debts compete for the same limited money each month. Answering that means modelling interest rates, minimum payments and any extra amount available, then projecting the whole payoff order forward. And because the app handles money, every change to a record has to be traceable afterwards.',
        approach: [
          'A dedicated payoff service generates a full plan using either the snowball method (smallest balance first, for momentum) or the avalanche method (highest interest first, for lowest total cost), and accepts an extra monthly payment to show how much sooner the debts clear.',
          'Nine domain models cover transactions, budgets, goals, debts and their individual payments, reminders, currency rates and an audit log, so debts are first-class records rather than another expense category.',
          'Every mutation is written to an audit log that stores the action, the model touched, the old and new values, the IP address and the user agent, so any figure can be traced back to the change that produced it.',
          'Currency rates are stored with eight decimal places and an effective date, which means historical amounts stay converted at the rate that applied when they happened instead of today\'s rate.',
          'Scheduled reminders run through an artisan command covered by its own test, so notifications are a verifiable feature rather than a cron job nobody checks.',
          'The interface is Vue 3 through Inertia.js, so the app is a single Laravel codebase that renders a single-page experience without maintaining a separate API client.',
        ],
        outcome: [
          '77 feature tests covering authentication, budgets, debts, dashboard, profile and the scheduled notification command.',
          'Debt payoff plans computed server-side by an isolated service, testable independently of the interface.',
          'Every record change is auditable, with before and after values retained.',
          'Runs entirely on SQLite with file-based sessions and cache, and ships with its own Dockerfile, so it deploys to any container host without an external database.',
        ],
      },
      es: {
        summary: 'Una app de finanzas personales que hace lo que la mayoría de las apps de presupuesto evita: decirte qué deuda matar primero, y demostrar cómo llegó a esa conclusión.',
        problem: 'Casi todas las herramientas de presupuesto se detienen en registrar lo que gastaste. La pregunta más difícil y más útil es qué hacer después, sobre todo cuando varias deudas compiten por el mismo dinero limitado cada mes. Responderla implica modelar tasas de interés, pagos mínimos y cualquier monto extra disponible, y después proyectar hacia adelante todo el orden de pago. Y como la app maneja plata, cada cambio en un registro tiene que ser rastreable después.',
        approach: [
          'Un servicio dedicado de payoff genera el plan completo con el método snowball (primero el saldo más chico, para ganar impulso) o el método avalanche (primero la tasa más alta, para pagar menos en total), y acepta un pago extra mensual para mostrar cuánto antes se liquidan las deudas.',
          'Nueve modelos de dominio cubren transacciones, presupuestos, metas, deudas y sus pagos individuales, recordatorios, tasas de cambio y un log de auditoría, así las deudas son registros de primera clase y no una categoría más de gasto.',
          'Cada mutación se escribe en un log de auditoría que guarda la acción, el modelo tocado, los valores viejos y nuevos, la dirección IP y el user agent, así cualquier cifra se puede rastrear hasta el cambio que la produjo.',
          'Las tasas de cambio se guardan con ocho decimales y una fecha de vigencia, lo que significa que los montos históricos quedan convertidos a la tasa que regía cuando ocurrieron, y no a la de hoy.',
          'Los recordatorios programados corren por un comando de artisan cubierto por su propio test, así las notificaciones son una función verificable y no un cron que nadie mira.',
          'La interfaz es Vue 3 vía Inertia.js, así la app es un solo código Laravel que ofrece una experiencia de página única sin mantener un cliente de API aparte.',
        ],
        outcome: [
          '77 tests de feature que cubren autenticación, presupuestos, deudas, dashboard, perfil y el comando de notificaciones programadas.',
          'Los planes de pago de deuda se calculan en el servidor con un servicio aislado, testeable independientemente de la interfaz.',
          'Cada cambio de registro queda auditable, conservando los valores anteriores y posteriores.',
          'Corre entero sobre SQLite con sesiones y caché en archivo, y trae su propio Dockerfile, así que se despliega en cualquier host de contenedores sin base de datos externa.',
        ],
      },
      pt: {
        summary: 'Um app de finanças pessoais que faz o que a maioria dos apps de orçamento evita: dizer qual dívida matar primeiro, e provar como chegou lá.',
        problem: 'Quase toda ferramenta de orçamento para em registrar o que você gastou. A pergunta mais difícil e mais útil é o que fazer depois, principalmente quando várias dívidas disputam o mesmo dinheiro limitado todo mês. Responder isso exige modelar taxas de juros, pagamentos mínimos e qualquer valor extra disponível, e então projetar para a frente toda a ordem de quitação. E como o app lida com dinheiro, cada mudança em um registro precisa ser rastreável depois.',
        approach: [
          'Um serviço dedicado de payoff gera o plano completo pelo método snowball (menor saldo primeiro, para ganhar impulso) ou pelo método avalanche (maior juro primeiro, para pagar menos no total), e aceita um pagamento extra mensal para mostrar quanto antes as dívidas se encerram.',
          'Nove modelos de domínio cobrem transações, orçamentos, metas, dívidas e seus pagamentos individuais, lembretes, taxas de câmbio e um log de auditoria, então dívidas são registros de primeira classe e não mais uma categoria de despesa.',
          'Cada mutação é gravada em um log de auditoria que guarda a ação, o modelo tocado, os valores antigos e novos, o endereço IP e o user agent, então qualquer número pode ser rastreado até a mudança que o produziu.',
          'As taxas de câmbio são guardadas com oito casas decimais e uma data de vigência, o que significa que valores históricos ficam convertidos pela taxa que valia quando aconteceram, e não pela de hoje.',
          'Os lembretes agendados rodam por um comando artisan coberto pelo próprio teste, então as notificações são uma funcionalidade verificável e não um cron que ninguém olha.',
          'A interface é Vue 3 via Inertia.js, então o app é um único código Laravel que entrega uma experiência de página única sem manter um cliente de API separado.',
        ],
        outcome: [
          '77 testes de feature cobrindo autenticação, orçamentos, dívidas, dashboard, perfil e o comando de notificações agendadas.',
          'Os planos de quitação de dívida são calculados no servidor por um serviço isolado, testável independentemente da interface.',
          'Cada mudança de registro fica auditável, preservando os valores anteriores e posteriores.',
          'Roda inteiro sobre SQLite com sessões e cache em arquivo, e traz seu próprio Dockerfile, então implanta em qualquer host de containers sem banco de dados externo.',
        ],
      },
    },
  },
  {
    id: 'wp-ai-alt-text',
    translations: {
      en: {
        title: 'Internick Smart Alt Generator - WordPress Plugin',
        description: 'WordPress plugin that automatically generates descriptive alt text for images using AI. Supports WordPress 7.0 AI Connectors and OpenAI API, with Gutenberg block editor integration, bulk processing, and REST API.',
      },
      es: {
        title: 'Internick Smart Alt Generator - Plugin WordPress',
        description: 'Plugin de WordPress que genera automáticamente alt text descriptivo para imágenes usando IA. Compatible con WordPress 7.0 AI Connectors y OpenAI API, con integración en el editor de bloques, generación masiva y REST API.',
      },
      pt: {
        title: 'Internick Smart Alt Generator - Plugin WordPress',
        description: 'Plugin WordPress que gera automaticamente alt text descritivo para imagens usando IA. Suporta WordPress 7.0 AI Connectors e OpenAI API, com integração no editor de blocos, processamento em lote e REST API.',
      },
    },
    technologies: ['WordPress', 'PHP', 'React', 'Gutenberg', 'OpenAI API', 'REST API', 'PHPUnit', 'Docker'],
    github: 'https://github.com/internick2017/smart-alt-generator',
    demo: 'https://wordpress.org/plugins/internick-smart-alt-generator/',
    image: '/images/project-wp-ai-alt-text.png',
    category: 'wordpress',
    caseStudy: {
      en: {
        summary: 'A published WordPress plugin that writes descriptive alt text for images with AI, and audits what is missing across a whole site.',
        problem: 'Missing image alt text is one of the most common accessibility and SEO failures on WordPress sites. Writing it by hand across hundreds of images is tedious, so it never gets done, and site owners have no view of how bad the gap is.',
        approach: [
          'Generates descriptive alt text with AI, supporting both the WordPress 7.0 AI Connectors and the OpenAI API.',
          'Integrates directly into the Gutenberg block editor, with bulk processing and a REST API for automation.',
          'Adds an alt-text audit dashboard that surfaces every image missing alt text across the site.',
          'Ships full Spanish and Portuguese translations and a non-intrusive review prompt, built test-first.',
        ],
        outcome: [
          'Live on the WordPress.org directory since June 2026, with 185+ downloads.',
          '70 passing tests, developed test-first.',
          'Shipping real releases on a public cadence (currently v1.2.1).',
        ],
      },
      es: {
        summary: 'Un plugin de WordPress publicado que escribe alt text descriptivo para imágenes con IA, y audita lo que falta en todo el sitio.',
        problem: 'El alt text faltante en imágenes es una de las fallas de accesibilidad y SEO más comunes en sitios WordPress. Escribirlo a mano en cientos de imágenes es tedioso, así que nunca se hace, y el dueño del sitio no tiene visibilidad de cuán grande es el problema.',
        approach: [
          'Genera alt text descriptivo con IA, soportando tanto los AI Connectors de WordPress 7.0 como la API de OpenAI.',
          'Se integra directo en el editor de bloques Gutenberg, con procesamiento masivo y una REST API para automatización.',
          'Agrega un dashboard de auditoría que muestra cada imagen sin alt text en todo el sitio.',
          'Incluye traducciones completas al español y portugués y un aviso de reseña no intrusivo, construido test-first.',
        ],
        outcome: [
          'En vivo en el directorio de WordPress.org desde junio de 2026, con 185+ descargas.',
          '70 tests verdes, desarrollado test-first.',
          'Publicando releases reales en cadencia pública (actualmente v1.2.1).',
        ],
      },
      pt: {
        summary: 'Um plugin de WordPress publicado que escreve alt text descritivo para imagens com IA, e audita o que está faltando em todo o site.',
        problem: 'Alt text faltando em imagens é uma das falhas de acessibilidade e SEO mais comuns em sites WordPress. Escrevê-lo à mão em centenas de imagens é tedioso, então nunca é feito, e o dono do site não tem visibilidade de quão grande é o problema.',
        approach: [
          'Gera alt text descritivo com IA, suportando tanto os AI Connectors do WordPress 7.0 quanto a API da OpenAI.',
          'Integra-se direto no editor de blocos Gutenberg, com processamento em lote e uma REST API para automação.',
          'Adiciona um dashboard de auditoria que mostra cada imagem sem alt text em todo o site.',
          'Inclui traduções completas para espanhol e português e um aviso de avaliação não intrusivo, construído test-first.',
        ],
        outcome: [
          'Ao vivo no diretório do WordPress.org desde junho de 2026, com 185+ downloads.',
          '70 testes verdes, desenvolvido test-first.',
          'Publicando releases reais em cadência pública (atualmente v1.2.1).',
        ],
      },
    },
  },
  {
    id: 'shadcn-nextjs',
    translations: {
      en: {
        title: 'shadcn/ui Component Showcase',
        description: 'Next.js application demonstrating a complete design system built with shadcn/ui and Radix UI primitives. Features a full component library including forms, data tables, dialogs, navigation menus, and accessible UI patterns.',
      },
      es: {
        title: 'Showcase de Componentes shadcn/ui',
        description: 'Aplicación Next.js que demuestra un sistema de diseño completo con shadcn/ui y primitivos Radix UI. Incluye biblioteca de componentes con formularios, tablas, diálogos, menús de navegación y patrones de UI accesibles.',
      },
      pt: {
        title: 'Showcase de Componentes shadcn/ui',
        description: 'Aplicação Next.js demonstrando um sistema de design completo com shadcn/ui e primitivos Radix UI. Inclui biblioteca de componentes com formulários, tabelas, diálogos, menus de navegação e padrões de UI acessíveis.',
      },
    },
    technologies: ['Next.js', 'TypeScript', 'shadcn/ui', 'Radix UI', 'Tailwind CSS', 'React Hook Form'],
    github: null,
    demo: 'https://shadcn-nextjs-app-ten.vercel.app/',
    image: '/images/project-shadcn.png',
    category: 'frontend',
    caseStudy: {
      en: {
        summary: 'A working application used as a design system proof, rather than a gallery of components sitting on a page.',
        problem: 'Component showcases usually stop at a wall of buttons and inputs. That proves the components render, but not that they hold up. Real interfaces are where design systems break: a data table needs sorting and pagination, a form needs validation and error states, a dashboard needs charts that survive resizing, and every one of those has to work in light and dark mode and on a phone. So the showcase was built as an actual product surface instead of a catalogue.',
        approach: [
          'Twelve real routes stand in for a working product: dashboard, projects with detail and creation pages, users with individual profiles, payments, inbox, calendar, search and settings.',
          'The component library is assembled from twenty-six primitives built on fifteen Radix packages, so accessibility behaviours like focus management and keyboard navigation come from the primitives instead of being reimplemented.',
          'Data tables, forms and charts are exercised inside those routes with real interactions, which is where sorting, validation and empty states actually get tested.',
          'The stack is deliberately current: Next.js 15 with React 19, which also makes the project a check on whether the ecosystem libraries keep up.',
          'Dark mode and responsive behaviour are handled at the design-token level rather than patched per component.',
        ],
        outcome: [
          'A live application demonstrating twenty-six components across twelve routes, not a static component gallery.',
          'Accessibility primitives from Radix, kept rather than reimplemented.',
          'Running on Next.js 15 and React 19.',
          'Serves as the reusable design-system baseline for starting new projects quickly.',
        ],
      },
      es: {
        summary: 'Una aplicación funcionando usada como prueba del design system, en vez de una galería de componentes puestos en una página.',
        problem: 'Los showcases de componentes suelen quedarse en una pared de botones e inputs. Eso demuestra que los componentes renderizan, pero no que aguanten. Las interfaces reales son donde los design systems se rompen: una tabla de datos necesita orden y paginación, un formulario necesita validación y estados de error, un dashboard necesita gráficos que sobrevivan al cambio de tamaño, y todo eso tiene que funcionar en modo claro y oscuro y en un teléfono. Por eso el showcase se construyó como una superficie de producto real y no como un catálogo.',
        approach: [
          'Doce rutas reales hacen de producto en funcionamiento: dashboard, proyectos con páginas de detalle y de creación, usuarios con perfiles individuales, pagos, bandeja de entrada, calendario, búsqueda y configuración.',
          'La librería de componentes se arma con veintiséis primitivas construidas sobre quince paquetes de Radix, así los comportamientos de accesibilidad como el manejo del foco y la navegación por teclado vienen de las primitivas en lugar de reimplementarse.',
          'Las tablas de datos, los formularios y los gráficos se ejercitan dentro de esas rutas con interacciones reales, que es donde el ordenamiento, la validación y los estados vacíos se prueban de verdad.',
          'El stack es deliberadamente actual: Next.js 15 con React 19, lo que además convierte al proyecto en un chequeo de si las librerías del ecosistema acompañan.',
          'El modo oscuro y el comportamiento responsive se resuelven a nivel de tokens de diseño, no parcheando componente por componente.',
        ],
        outcome: [
          'Una aplicación en vivo que demuestra veintiséis componentes en doce rutas, no una galería estática.',
          'Primitivas de accesibilidad de Radix, conservadas en vez de reimplementadas.',
          'Corriendo sobre Next.js 15 y React 19.',
          'Sirve como base reutilizable de design system para arrancar proyectos nuevos rápido.',
        ],
      },
      pt: {
        summary: 'Uma aplicação funcionando usada como prova do design system, em vez de uma galeria de componentes colocada numa página.',
        problem: 'Showcases de componentes costumam parar numa parede de botões e inputs. Isso prova que os componentes renderizam, mas não que se sustentam. Interfaces reais são onde design systems quebram: uma tabela de dados precisa de ordenação e paginação, um formulário precisa de validação e estados de erro, um dashboard precisa de gráficos que sobrevivam ao redimensionamento, e tudo isso precisa funcionar em modo claro e escuro e num celular. Por isso o showcase foi construído como uma superfície de produto real, e não como um catálogo.',
        approach: [
          'Doze rotas reais fazem as vezes de um produto em funcionamento: dashboard, projetos com páginas de detalhe e de criação, usuários com perfis individuais, pagamentos, caixa de entrada, calendário, busca e configurações.',
          'A biblioteca de componentes é montada com vinte e seis primitivas construídas sobre quinze pacotes do Radix, então comportamentos de acessibilidade como gestão de foco e navegação por teclado vêm das primitivas em vez de serem reimplementados.',
          'Tabelas de dados, formulários e gráficos são exercitados dentro dessas rotas com interações reais, que é onde ordenação, validação e estados vazios realmente são testados.',
          'A stack é deliberadamente atual: Next.js 15 com React 19, o que também torna o projeto um teste de se as bibliotecas do ecossistema acompanham.',
          'Modo escuro e comportamento responsivo são resolvidos no nível dos tokens de design, não remendando componente a componente.',
        ],
        outcome: [
          'Uma aplicação ao vivo demonstrando vinte e seis componentes em doze rotas, não uma galeria estática.',
          'Primitivas de acessibilidade do Radix, preservadas em vez de reimplementadas.',
          'Rodando sobre Next.js 15 e React 19.',
          'Serve como base reutilizável de design system para começar projetos novos rapidamente.',
        ],
      },
    },
  },
  {
    id: 'store-up',
    translations: {
      en: {
        title: 'Store Up - Shopify E-commerce Store',
        description: 'Live Shopify store I built and run end-to-end: custom Liquid theme, conversion-focused product landing, multi-language (ES/EN/PT) and multi-currency checkout, and Node.js automation against the Shopify Admin API. It\'s also the live data source behind my E-commerce Data Warehouse project.',
      },
      es: {
        title: 'Store Up - Tienda E-commerce en Shopify',
        description: 'Tienda Shopify en vivo que construí y opero de punta a punta: tema Liquid personalizado, landing de producto orientada a conversión, checkout multi-idioma (ES/EN/PT) y multi-moneda, y automatización en Node.js contra la Shopify Admin API. Además es la fuente de datos real detrás de mi proyecto E-commerce Data Warehouse.',
      },
      pt: {
        title: 'Store Up - Loja E-commerce no Shopify',
        description: 'Loja Shopify ao vivo que construí e opero de ponta a ponta: tema Liquid customizado, landing de produto focada em conversão, checkout multilíngue (ES/EN/PT) e multi-moeda, e automação em Node.js contra a Shopify Admin API. É também a fonte de dados real por trás do meu projeto E-commerce Data Warehouse.',
      },
    },
    technologies: ['Shopify', 'Liquid', 'Shopify Admin API', 'Node.js', 'CSS3', 'E-commerce', 'Conversion Optimization'],
    github: null,
    demo: 'https://storeup.store',
    image: '/images/project-store-up.png',
    category: 'ecommerce',
    caseStudy: {
      en: {
        summary: 'A real storefront run end to end, where the interesting engineering is the store configuration that no theme editor exposes.',
        problem: 'Running a store is not the same as building one. Beyond the theme, a real storefront has to sell in several languages and currencies, keep its legal policies consistent, and manage a catalogue that changes. Much of that lives in configuration the visual editor either does not expose or makes impossibly tedious to repeat, which is exactly the part worth automating against the platform API.',
        approach: [
          'The storefront is a customized Shopify theme served from the store\'s own domain, not a default template.',
          'The store serves three languages with proper hreflang signalling for English, Spanish and Portuguese plus a default fallback, so search engines resolve the right version per market.',
          'Currency and locale are handled through Shopify\'s localization form, so pricing follows the visitor\'s market rather than one hardcoded currency.',
          'Store configuration is automated with Node against the Shopify Admin API, covering the parts the visual editor does not reach: registering translations, updating store policies, and rewriting navigation menus.',
          'The automation had to accommodate the API\'s real behaviour rather than its documented shape: translation registration requires the current content digest, policy updates fail silently unless the policy type is passed, and menu updates replace the entire menu instead of patching it.',
          'Product data is configured for a dropshipping model, where inventory is not tracked locally because fulfilment happens upstream.',
        ],
        outcome: [
          'Live storefront on its own domain, serving three languages and multi-currency checkout.',
          'Store configuration reproducible through scripted Admin API calls instead of manual clicking.',
          'Documented the API behaviours that fail silently, so the automation is repeatable rather than one-shot.',
          'Demonstrates operating a commerce platform, not only building a front end for one.',
        ],
      },
      es: {
        summary: 'Una tienda real gestionada de punta a punta, donde lo interesante en lo técnico es la configuración que ningún editor de temas expone.',
        problem: 'Operar una tienda no es lo mismo que construirla. Más allá del tema, una tienda real tiene que vender en varios idiomas y monedas, mantener coherentes sus políticas legales, y manejar un catálogo que cambia. Buena parte de eso vive en configuración que el editor visual o no expone o vuelve insoportablemente tedioso repetir, que es justamente la parte que vale la pena automatizar contra la API de la plataforma.',
        approach: [
          'La tienda es un tema de Shopify personalizado servido desde su propio dominio, no una plantilla por defecto.',
          'Sirve tres idiomas con señalización hreflang correcta para inglés, español y portugués más un fallback por defecto, así los buscadores resuelven la versión correcta según el mercado.',
          'La moneda y el locale se manejan con el formulario de localización de Shopify, así el precio sigue al mercado del visitante en vez de quedar fijo en una sola moneda.',
          'La configuración de la tienda se automatiza con Node contra la Shopify Admin API, cubriendo lo que el editor visual no alcanza: registrar traducciones, actualizar las políticas de la tienda y reescribir los menús de navegación.',
          'La automatización tuvo que acomodarse al comportamiento real de la API y no al documentado: registrar una traducción exige el digest del contenido actual, la actualización de políticas falla en silencio si no se pasa el tipo de política, y la actualización de menús reemplaza el menú entero en vez de parchearlo.',
          'Los datos de producto están configurados para un modelo de dropshipping, donde el inventario no se rastrea localmente porque el envío ocurre aguas arriba.',
        ],
        outcome: [
          'Tienda en vivo sobre su propio dominio, sirviendo tres idiomas y checkout multimoneda.',
          'Configuración de tienda reproducible mediante llamadas scripteadas a la Admin API en lugar de clics manuales.',
          'Quedaron documentados los comportamientos de la API que fallan en silencio, así la automatización es repetible y no de un solo uso.',
          'Demuestra operar una plataforma de comercio, no solo construirle un front end.',
        ],
      },
      pt: {
        summary: 'Uma loja real tocada de ponta a ponta, onde a engenharia interessante é a configuração que nenhum editor de temas expõe.',
        problem: 'Operar uma loja não é o mesmo que construí-la. Além do tema, uma loja real precisa vender em vários idiomas e moedas, manter coerentes suas políticas legais, e gerenciar um catálogo que muda. Boa parte disso vive em configuração que o editor visual ou não expõe ou torna insuportavelmente tedioso repetir, que é justamente a parte que vale automatizar contra a API da plataforma.',
        approach: [
          'A loja é um tema Shopify personalizado servido a partir do próprio domínio, não um template padrão.',
          'Serve três idiomas com sinalização hreflang correta para inglês, espanhol e português mais um fallback padrão, então os buscadores resolvem a versão certa por mercado.',
          'Moeda e locale são tratados pelo formulário de localização do Shopify, então o preço acompanha o mercado do visitante em vez de ficar fixo numa moeda só.',
          'A configuração da loja é automatizada com Node contra a Shopify Admin API, cobrindo o que o editor visual não alcança: registrar traduções, atualizar as políticas da loja e reescrever os menus de navegação.',
          'A automação teve que se acomodar ao comportamento real da API, e não ao documentado: registrar uma tradução exige o digest do conteúdo atual, a atualização de políticas falha em silêncio se o tipo da política não for passado, e a atualização de menus substitui o menu inteiro em vez de aplicar um patch.',
          'Os dados de produto são configurados para um modelo de dropshipping, onde o estoque não é rastreado localmente porque o envio acontece rio acima.',
        ],
        outcome: [
          'Loja ao vivo no próprio domínio, servindo três idiomas e checkout multimoeda.',
          'Configuração de loja reproduzível por chamadas scriptadas à Admin API em vez de cliques manuais.',
          'Ficaram documentados os comportamentos da API que falham em silêncio, então a automação é repetível e não de uso único.',
          'Demonstra operar uma plataforma de comércio, não apenas construir um front end para uma.',
        ],
      },
    },
  },

  {
    id: 'event-planner-api',
    translations: {
      en: {
        title: 'Event Planner API',
        description: 'RESTful API for managing events, venues, and RSVPs. Google OAuth2 authentication, full CRUD across events, venues, users and RSVPs, request validation, and a Jest test suite. The OpenAPI reference is published as a static page, so it is always reachable.',
      },
      es: {
        title: 'API de Planificación de Eventos',
        description: 'API RESTful para gestionar eventos, venues y RSVPs. Autenticación OAuth2 de Google, CRUD completo sobre eventos, venues, usuarios y RSVPs, validación de requests y suite de pruebas Jest. La referencia OpenAPI está publicada como página estática, así que siempre está disponible.',
      },
      pt: {
        title: 'API de Planejamento de Eventos',
        description: 'API RESTful para gerenciar eventos, venues e RSVPs. Autenticação OAuth2 do Google, CRUD completo sobre eventos, venues, usuários e RSVPs, validação de requests e suíte de testes Jest. A referência OpenAPI é publicada como página estática, então está sempre disponível.',
      },
    },
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'OAuth2', 'Passport.js', 'Swagger', 'Jest'],
    github: 'https://github.com/internick2017/event-planner-api',
    demo: 'https://internick2017.github.io/event-planner-api/',
    image: '/images/project-event-planner-api.png',
    category: 'api',
    caseStudy: {
      en: {
        summary: 'An events API where the modelling problem is that nothing stands alone: an RSVP only means something in relation to a person, an event and a venue.',
        problem: 'Events, venues, users and RSVPs look like four independent collections until you try to write them. An event without a venue is incomplete, an RSVP pointing at a deleted event is corrupt, and a guest count attached to nobody is meaningless. So the real work is not the CRUD, it is the relationships between records and the validation that keeps them coherent, plus letting a third party sign in without the API ever storing a password.',
        approach: [
          'Sixteen endpoints cover events, venues, users and RSVPs, with the related records referenced by identifier so an RSVP resolves to a real event and an event to a real venue.',
          'Authentication is delegated to Google via OAuth2, so the API never stores or verifies passwords itself.',
          'Every write path validates its payload before touching the database, and errors return a consistent shape rather than leaking raw exceptions.',
          'RSVPs carry their own state (going, interested, not going) plus guest count and an optional note, so attendance is a record with meaning rather than a boolean flag.',
          'A Jest test suite covers the routes, and the OpenAPI specification is generated from the route definitions instead of written separately.',
          'The generated reference is published as a static page, so the documented contract stays readable whether or not a server is running behind it.',
        ],
        outcome: [
          'Sixteen documented endpoints across four related resources.',
          'Google OAuth2 sign-in, with no password storage in the API.',
          'OpenAPI specification generated from the routes, published as an always-available static reference.',
          'Covered by a Jest test suite.',
        ],
      },
      es: {
        summary: 'Una API de eventos donde el problema de modelado es que nada existe solo: un RSVP solo significa algo en relación a una persona, un evento y un lugar.',
        problem: 'Eventos, venues, usuarios y RSVPs parecen cuatro colecciones independientes hasta que intentás escribirlas. Un evento sin lugar está incompleto, un RSVP que apunta a un evento borrado está corrupto, y una cantidad de invitados atada a nadie no significa nada. Así que el trabajo real no es el CRUD, son las relaciones entre registros y la validación que las mantiene coherentes, más permitir que un tercero inicie sesión sin que la API guarde nunca una contraseña.',
        approach: [
          'Dieciséis endpoints cubren eventos, venues, usuarios y RSVPs, con los registros relacionados referenciados por identificador, así un RSVP resuelve a un evento real y un evento a un lugar real.',
          'La autenticación se delega en Google vía OAuth2, así la API nunca guarda ni verifica contraseñas por su cuenta.',
          'Cada camino de escritura valida su payload antes de tocar la base de datos, y los errores devuelven una forma consistente en lugar de filtrar excepciones crudas.',
          'Los RSVPs llevan su propio estado (voy, me interesa, no voy) más cantidad de invitados y una nota opcional, así la asistencia es un registro con significado y no una bandera booleana.',
          'Una suite de tests Jest cubre las rutas, y la especificación OpenAPI se genera desde las definiciones de ruta en vez de escribirse aparte.',
          'La referencia generada se publica como página estática, así el contrato documentado sigue siendo legible haya o no un servidor corriendo detrás.',
        ],
        outcome: [
          'Dieciséis endpoints documentados sobre cuatro recursos relacionados.',
          'Inicio de sesión con Google OAuth2, sin almacenamiento de contraseñas en la API.',
          'Especificación OpenAPI generada desde las rutas, publicada como referencia estática siempre disponible.',
          'Cubierta por una suite de tests Jest.',
        ],
      },
      pt: {
        summary: 'Uma API de eventos onde o problema de modelagem é que nada existe sozinho: um RSVP só significa algo em relação a uma pessoa, um evento e um local.',
        problem: 'Eventos, venues, usuários e RSVPs parecem quatro coleções independentes até você tentar escrevê-las. Um evento sem local está incompleto, um RSVP apontando para um evento apagado está corrompido, e uma contagem de convidados presa a ninguém não significa nada. Então o trabalho real não é o CRUD, são as relações entre registros e a validação que as mantém coerentes, mais permitir que um terceiro faça login sem que a API jamais guarde uma senha.',
        approach: [
          'Dezesseis endpoints cobrem eventos, venues, usuários e RSVPs, com os registros relacionados referenciados por identificador, então um RSVP resolve para um evento real e um evento para um local real.',
          'A autenticação é delegada ao Google via OAuth2, então a API nunca guarda nem verifica senhas por conta própria.',
          'Todo caminho de escrita valida seu payload antes de tocar o banco, e os erros retornam um formato consistente em vez de vazar exceções cruas.',
          'Os RSVPs carregam o próprio estado (vou, tenho interesse, não vou) mais contagem de convidados e uma nota opcional, então a presença é um registro com significado e não uma flag booleana.',
          'Uma suíte de testes Jest cobre as rotas, e a especificação OpenAPI é gerada a partir das definições de rota em vez de escrita à parte.',
          'A referência gerada é publicada como página estática, então o contrato documentado continua legível havendo ou não um servidor rodando atrás.',
        ],
        outcome: [
          'Dezesseis endpoints documentados sobre quatro recursos relacionados.',
          'Login com Google OAuth2, sem armazenamento de senhas na API.',
          'Especificação OpenAPI gerada a partir das rotas, publicada como referência estática sempre disponível.',
          'Coberta por uma suíte de testes Jest.',
        ],
      },
    },
  },
  {
    id: 'drf-course-api',
    translations: {
      en: {
        title: 'DRF Course API - E-commerce REST API',
        description: 'Django REST Framework e-commerce API with JWT authentication, product/order management, filtering, pagination, and interactive Swagger docs. Covers DRF end to end: viewsets, serializers, permission classes, dynamic filtering and query profiling.',
      },
      es: {
        title: 'DRF Course API - REST API de E-commerce',
        description: 'API de e-commerce con Django REST Framework, autenticación JWT, gestión de productos y órdenes, filtrado dinámico, paginación y docs Swagger interactivos. Cubre DRF de punta a punta: viewsets, serializers, clases de permisos y profiling de queries.',
      },
      pt: {
        title: 'DRF Course API - REST API de E-commerce',
        description: 'API de e-commerce com Django REST Framework, autenticação JWT, gestão de produtos e pedidos, filtragem dinâmica, paginação e docs Swagger interativos. Cobre DRF de ponta a ponta: viewsets, serializers, classes de permissão e profiling de queries.',
      },
    },
    technologies: ['Python', 'Django', 'Django REST Framework', 'JWT', 'PostgreSQL', 'Swagger/OpenAPI', 'django-filter'],
    github: 'https://github.com/internick2017/drf-course-api',
    demo: 'https://internick2017.github.io/drf-course-api/',
    image: '/images/project-drf-course-api.png',
    category: 'api',
    caseStudy: {
      en: {
        summary: 'An e-commerce API used to push Django REST Framework as far as it goes, then documented so the surface is inspectable without running it.',
        problem: 'Most REST tutorials stop at listing and creating a resource. The parts that decide whether an API is usable in production come later: who is allowed to see which records, how a client narrows a large collection without fetching all of it, how pagination behaves under filtering, and whether the endpoints are discoverable by someone who did not write them. This project exists to work through all of that on one coherent domain instead of a toy endpoint.',
        approach: [
          'Thirty-six endpoints cover authentication, users, products, orders and order items, including an enhanced set of routes used to compare implementation approaches against the same data.',
          'Authentication is JWT-based, with registration and login issuing tokens that the documented endpoints accept directly.',
          'Permission classes control access per view rather than per route string, so authorization is a property of the resource instead of a list of URLs to remember.',
          'Filtering is dynamic: clients narrow collections by query parameters, and pagination is applied on top so a filtered collection stays navigable.',
          'The API surface is generated from the code with drf-spectacular, so the OpenAPI schema reflects the actual serializers and cannot drift from the implementation.',
          'Query profiling was set up to inspect what the ORM actually emits, which is where N+1 problems become visible rather than theoretical.',
        ],
        outcome: [
          'Thirty-six documented endpoints across authentication, users, products and orders.',
          'OpenAPI schema generated from the code itself, not hand-maintained.',
          'Reference published as a static page, so the documentation stays reachable independently of any running server.',
          'JWT authentication with per-view permission classes and dynamic filtering.',
        ],
      },
      es: {
        summary: 'Una API de e-commerce usada para llevar Django REST Framework hasta donde da, y después documentada para que la superficie se pueda inspeccionar sin ejecutarla.',
        problem: 'La mayoría de los tutoriales de REST se detienen en listar y crear un recurso. Las partes que deciden si una API sirve en producción vienen después: quién puede ver qué registros, cómo un cliente acota una colección grande sin traérsela entera, cómo se comporta la paginación cuando hay filtros, y si los endpoints son descubribles por alguien que no los escribió. Este proyecto existe para recorrer todo eso sobre un dominio coherente en vez de un endpoint de juguete.',
        approach: [
          'Treinta y seis endpoints cubren autenticación, usuarios, productos, órdenes e ítems de orden, incluido un conjunto de rutas ampliadas que se usa para comparar enfoques de implementación sobre los mismos datos.',
          'La autenticación es por JWT, con registro y login que emiten tokens que los endpoints documentados aceptan directamente.',
          'Las clases de permisos controlan el acceso por vista y no por cadena de ruta, así la autorización es una propiedad del recurso y no una lista de URLs para acordarse.',
          'El filtrado es dinámico: los clientes acotan colecciones por parámetros de consulta, y la paginación se aplica encima para que una colección filtrada siga siendo navegable.',
          'La superficie de la API se genera desde el código con drf-spectacular, así el esquema OpenAPI refleja los serializers reales y no puede desviarse de la implementación.',
          'Se configuró profiling de queries para inspeccionar qué emite realmente el ORM, que es donde los problemas N+1 se vuelven visibles en lugar de teóricos.',
        ],
        outcome: [
          'Treinta y seis endpoints documentados entre autenticación, usuarios, productos y órdenes.',
          'Esquema OpenAPI generado desde el propio código, no mantenido a mano.',
          'Referencia publicada como página estática, así la documentación sigue accesible independientemente de cualquier servidor corriendo.',
          'Autenticación JWT con clases de permisos por vista y filtrado dinámico.',
        ],
      },
      pt: {
        summary: 'Uma API de e-commerce usada para levar o Django REST Framework até onde dá, e depois documentada para que a superfície possa ser inspecionada sem executá-la.',
        problem: 'A maioria dos tutoriais de REST para em listar e criar um recurso. As partes que decidem se uma API serve em produção vêm depois: quem pode ver quais registros, como um cliente reduz uma coleção grande sem baixá-la inteira, como a paginação se comporta com filtros, e se os endpoints são descobríveis por alguém que não os escreveu. Este projeto existe para percorrer tudo isso sobre um domínio coerente, em vez de um endpoint de brinquedo.',
        approach: [
          'Trinta e seis endpoints cobrem autenticação, usuários, produtos, pedidos e itens de pedido, incluindo um conjunto de rotas ampliadas usado para comparar abordagens de implementação sobre os mesmos dados.',
          'A autenticação é por JWT, com registro e login emitindo tokens que os endpoints documentados aceitam diretamente.',
          'As classes de permissão controlam o acesso por view e não por string de rota, então a autorização é uma propriedade do recurso e não uma lista de URLs para lembrar.',
          'A filtragem é dinâmica: os clientes reduzem coleções por parâmetros de consulta, e a paginação é aplicada por cima para que uma coleção filtrada continue navegável.',
          'A superfície da API é gerada a partir do código com drf-spectacular, então o schema OpenAPI reflete os serializers reais e não pode divergir da implementação.',
          'Foi configurado profiling de queries para inspecionar o que o ORM realmente emite, que é onde problemas N+1 ficam visíveis em vez de teóricos.',
        ],
        outcome: [
          'Trinta e seis endpoints documentados entre autenticação, usuários, produtos e pedidos.',
          'Schema OpenAPI gerado a partir do próprio código, não mantido à mão.',
          'Referência publicada como página estática, então a documentação continua acessível independentemente de qualquer servidor rodando.',
          'Autenticação JWT com classes de permissão por view e filtragem dinâmica.',
        ],
      },
    },
  },
  {
    id: 'laravel-image-api',
    translations: {
      en: {
        title: 'Laravel Image Manipulation API',
        description: 'RESTful API for image resizing and album management, built with Laravel 8 and Sanctum. Features token authentication, album grouping, and interactive Swagger/OpenAPI documentation.',
      },
      es: {
        title: 'API de Manipulación de Imágenes con Laravel',
        description: 'API REST para redimensionado de imágenes y gestión de álbumes, construida con Laravel 8 y Sanctum. Autenticación por token, agrupación en álbumes y documentación Swagger interactiva.',
      },
      pt: {
        title: 'API de Manipulação de Imagens com Laravel',
        description: 'API REST para redimensionamento de imagens e gestão de álbuns, construída com Laravel 8 e Sanctum. Autenticação por token, agrupamento em álbuns e documentação Swagger interativa.',
      },
    },
    technologies: ['PHP', 'Laravel', 'Laravel Sanctum', 'MySQL', 'Swagger/OpenAPI', 'Intervention Image'],
    github: 'https://github.com/internick2017/laravel-image-manipulation-api',
    demo: 'https://image-api.nickgranados.com/api/documentation',
    image: '/images/project-laravel-image-api.png',
    category: 'api',
    caseStudy: {
      en: {
        summary: 'An image API where the interesting work is not the resizing, it is making sure one user can never touch another user\'s album.',
        problem: 'An image manipulation endpoint looks simple until it becomes multi-tenant. Once every user owns albums and images, the API has to answer a harder question on every single request: does this token belong to someone allowed to touch this specific record. Getting that wrong is not a bug that shows up in testing, it is a data leak. On top of that, an image can arrive two different ways, as an uploaded file or as a remote URL, and both paths have to end in the same validated state.',
        approach: [
          'Authentication uses Laravel Sanctum tokens, with every write route behind the auth middleware group and a versioned v1 prefix so the contract can evolve without breaking clients.',
          'Ownership is checked explicitly: before an image is attached to an album, the album is loaded and compared against the authenticated user, returning 403 rather than silently succeeding.',
          'The resize endpoint accepts either an uploaded file or a remote URL, normalizing both into the same stored record with its original name, path and manipulation metadata.',
          'Each upload lands in its own randomly named directory, so files cannot collide or be guessed by iterating predictable paths.',
          'Request validation lives in a dedicated form request class rather than inside the controller, keeping the rules declarative and reusable.',
          'The manipulation parameters are persisted alongside the image, so every derived image records how it was produced.',
        ],
        outcome: [
          'Multi-tenant API where album access is verified per request, not assumed from the token.',
          'Two input paths, file upload and remote URL, converge on one validated record shape.',
          'Interactive OpenAPI documentation published and reachable on its own domain.',
          'Token authentication with versioned routes, ready to evolve without breaking clients.',
        ],
      },
      es: {
        summary: 'Una API de imágenes donde lo interesante no es el redimensionado, sino garantizar que un usuario nunca pueda tocar el álbum de otro.',
        problem: 'Un endpoint de manipulación de imágenes parece simple hasta que se vuelve multiinquilino. Cuando cada usuario tiene sus álbumes e imágenes, la API tiene que responder una pregunta más difícil en cada petición: este token, ¿pertenece a alguien autorizado a tocar este registro puntual? Equivocarse ahí no es un bug que aparezca en las pruebas, es una fuga de datos. Encima, una imagen puede llegar de dos formas, como archivo subido o como URL remota, y los dos caminos tienen que terminar en el mismo estado validado.',
        approach: [
          'La autenticación usa tokens de Laravel Sanctum, con todas las rutas de escritura detrás del middleware de auth y un prefijo de versión v1, así el contrato puede evolucionar sin romper a los clientes.',
          'La propiedad se chequea explícitamente: antes de adjuntar una imagen a un álbum, se carga el álbum y se compara con el usuario autenticado, devolviendo 403 en vez de tener éxito en silencio.',
          'El endpoint de resize acepta tanto un archivo subido como una URL remota, y normaliza ambos al mismo registro almacenado con su nombre original, su ruta y los metadatos de la manipulación.',
          'Cada subida cae en su propio directorio de nombre aleatorio, así los archivos no pueden colisionar ni adivinarse iterando rutas predecibles.',
          'La validación vive en una clase de form request dedicada y no dentro del controlador, lo que mantiene las reglas declarativas y reutilizables.',
          'Los parámetros de la manipulación se persisten junto a la imagen, así cada imagen derivada deja registrado cómo fue producida.',
        ],
        outcome: [
          'API multiinquilino donde el acceso al álbum se verifica en cada petición, no se asume desde el token.',
          'Dos vías de entrada, subida de archivo y URL remota, convergen en una única forma de registro validada.',
          'Documentación OpenAPI interactiva publicada y accesible en su propio dominio.',
          'Autenticación por token con rutas versionadas, lista para evolucionar sin romper clientes.',
        ],
      },
      pt: {
        summary: 'Uma API de imagens onde o interessante não é o redimensionamento, e sim garantir que um usuário nunca consiga tocar o álbum de outro.',
        problem: 'Um endpoint de manipulação de imagens parece simples até virar multi-inquilino. Quando cada usuário tem seus álbuns e imagens, a API precisa responder uma pergunta mais difícil a cada requisição: este token pertence a alguém autorizado a tocar este registro específico? Errar aí não é um bug que aparece nos testes, é um vazamento de dados. Além disso, uma imagem pode chegar de duas formas, como arquivo enviado ou como URL remota, e os dois caminhos precisam terminar no mesmo estado validado.',
        approach: [
          'A autenticação usa tokens do Laravel Sanctum, com todas as rotas de escrita atrás do middleware de auth e um prefixo de versão v1, então o contrato pode evoluir sem quebrar os clientes.',
          'A propriedade é checada explicitamente: antes de anexar uma imagem a um álbum, o álbum é carregado e comparado com o usuário autenticado, devolvendo 403 em vez de ter sucesso em silêncio.',
          'O endpoint de resize aceita tanto um arquivo enviado quanto uma URL remota, e normaliza os dois no mesmo registro armazenado com nome original, caminho e metadados da manipulação.',
          'Cada upload cai em seu próprio diretório de nome aleatório, então os arquivos não colidem nem podem ser adivinhados iterando caminhos previsíveis.',
          'A validação vive em uma classe de form request dedicada, e não dentro do controller, mantendo as regras declarativas e reutilizáveis.',
          'Os parâmetros da manipulação são persistidos junto à imagem, então cada imagem derivada registra como foi produzida.',
        ],
        outcome: [
          'API multi-inquilino onde o acesso ao álbum é verificado a cada requisição, não presumido pelo token.',
          'Dois caminhos de entrada, upload de arquivo e URL remota, convergem em um único formato de registro validado.',
          'Documentação OpenAPI interativa publicada e acessível no próprio domínio.',
          'Autenticação por token com rotas versionadas, pronta para evoluir sem quebrar clientes.',
        ],
      },
    },
  },
  {
    id: 'sleepouside',
    translations: {
      en: {
        title: 'SleepOutside - Outdoor E-commerce',
        description: 'Vanilla JavaScript e-commerce SPA for outdoor gear. Features product listings with live API data, shopping cart with localStorage, checkout flow, and product detail pages.',
      },
      es: {
        title: 'SleepOutside - E-commerce de Camping',
        description: 'SPA de e-commerce en Vanilla JS para equipos de camping. Incluye listado de productos con API en vivo, carrito con localStorage, flujo de checkout y páginas de detalle.',
      },
      pt: {
        title: 'SleepOutside - E-commerce de Camping',
        description: 'SPA de e-commerce em Vanilla JS para equipamentos de camping. Inclui listagem de produtos com API ao vivo, carrinho com localStorage, fluxo de checkout e páginas de detalhe.',
      },
    },
    technologies: ['JavaScript', 'Vite', 'HTML5', 'CSS3', 'REST API', 'localStorage'],
    github: 'https://github.com/internick2017/wdd330-sleepouside',
    demo: 'https://internick2017.github.io/wdd330-sleepouside/',
    image: '/images/project-sleepouside.png',
    category: 'frontend',
    caseStudy: {
      en: {
        summary: 'A full e-commerce flow written in plain JavaScript modules, with no framework to hide the wiring.',
        problem: 'Frameworks do a lot of invisible work: rendering on state change, routing, keeping the cart in sync across pages. Building a complete store without one means every piece of that has to be written and understood explicitly. That is the point of the exercise, and it is also where the real questions appear: where does cart state live between page loads, how does a multi-page checkout survive a refresh, and what happens when the product API is slow or fails.',
        approach: [
          'The application is split into ES modules with clear responsibilities: product listing, product detail, shopping cart, checkout process and a services layer, rather than one script per page.',
          'All network access goes through a single external services module, so the API base URL is configurable through an environment variable and every request shares the same error handling.',
          'Responses are validated before use: a non-OK status throws with the status text, and malformed JSON is caught and reported instead of failing silently deeper in the UI.',
          'Cart state persists in localStorage, so the cart survives navigation and refreshes across a multi-page store without a server session.',
          'The checkout process is its own module handling totals, tax and shipping separately from the cart display.',
          'The build is bundled with Vite and deployed as a static site, with unit tests on the product logic.',
        ],
        outcome: [
          'Complete store flow: listing, product detail, cart and checkout, all in vanilla JavaScript.',
          'Cart survives page navigation and refreshes via localStorage.',
          'Network failures surface as handled errors rather than silent breakage.',
          'Deployed as a static build, consuming a live product API.',
        ],
      },
      es: {
        summary: 'Un flujo completo de e-commerce escrito en módulos de JavaScript puro, sin framework que esconda el cableado.',
        problem: 'Los frameworks hacen mucho trabajo invisible: renderizar cuando cambia el estado, rutear, mantener el carrito sincronizado entre páginas. Construir una tienda completa sin uno significa que cada una de esas piezas hay que escribirla y entenderla explícitamente. Ese es el punto del ejercicio, y también donde aparecen las preguntas reales: dónde vive el estado del carrito entre cargas de página, cómo sobrevive a un refresh un checkout de varias páginas, y qué pasa cuando la API de productos está lenta o falla.',
        approach: [
          'La aplicación está partida en módulos ES con responsabilidades claras: listado de productos, detalle, carrito, proceso de checkout y una capa de servicios, en vez de un script por página.',
          'Todo el acceso a red pasa por un único módulo de servicios externos, así la URL base de la API se configura por variable de entorno y todas las peticiones comparten el mismo manejo de errores.',
          'Las respuestas se validan antes de usarse: un status no-OK lanza error con su texto, y el JSON malformado se captura y se reporta en vez de fallar en silencio más adentro de la interfaz.',
          'El estado del carrito persiste en localStorage, así el carrito sobrevive a la navegación y a los refrescos en una tienda de varias páginas sin sesión de servidor.',
          'El proceso de checkout es su propio módulo, que maneja totales, impuestos y envío por separado de la vista del carrito.',
          'El build se empaqueta con Vite y se despliega como sitio estático, con tests unitarios sobre la lógica de productos.',
        ],
        outcome: [
          'Flujo de tienda completo: listado, detalle, carrito y checkout, todo en JavaScript puro.',
          'El carrito sobrevive a la navegación y a los refrescos vía localStorage.',
          'Las fallas de red aparecen como errores manejados y no como una rotura silenciosa.',
          'Desplegado como build estático, consumiendo una API de productos en vivo.',
        ],
      },
      pt: {
        summary: 'Um fluxo completo de e-commerce escrito em módulos de JavaScript puro, sem framework para esconder a fiação.',
        problem: 'Frameworks fazem muito trabalho invisível: renderizar quando o estado muda, rotear, manter o carrinho sincronizado entre páginas. Construir uma loja completa sem um significa que cada uma dessas peças precisa ser escrita e entendida explicitamente. Esse é o ponto do exercício, e também onde aparecem as perguntas reais: onde mora o estado do carrinho entre carregamentos de página, como um checkout de várias páginas sobrevive a um refresh, e o que acontece quando a API de produtos está lenta ou falha.',
        approach: [
          'A aplicação é dividida em módulos ES com responsabilidades claras: listagem de produtos, detalhe, carrinho, processo de checkout e uma camada de serviços, em vez de um script por página.',
          'Todo o acesso à rede passa por um único módulo de serviços externos, então a URL base da API é configurável por variável de ambiente e todas as requisições compartilham o mesmo tratamento de erros.',
          'As respostas são validadas antes do uso: um status não-OK lança erro com o texto do status, e JSON malformado é capturado e reportado em vez de falhar em silêncio mais adiante na interface.',
          'O estado do carrinho persiste em localStorage, então o carrinho sobrevive à navegação e aos refreshes numa loja de várias páginas sem sessão de servidor.',
          'O processo de checkout é um módulo próprio, que trata totais, impostos e frete separadamente da exibição do carrinho.',
          'O build é empacotado com Vite e implantado como site estático, com testes unitários sobre a lógica de produtos.',
        ],
        outcome: [
          'Fluxo de loja completo: listagem, detalhe, carrinho e checkout, tudo em JavaScript puro.',
          'O carrinho sobrevive à navegação e aos refreshes via localStorage.',
          'Falhas de rede aparecem como erros tratados, e não como quebra silenciosa.',
          'Implantado como build estático, consumindo uma API de produtos ao vivo.',
        ],
      },
    },
  },
]

export function getAllTechnologies(): string[] {
  const all = projects.flatMap((p) => p.technologies)
  return [...new Set(all)].sort()
}
