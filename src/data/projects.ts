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
    demo: 'https://clear-path-9008.onrender.com',
    image: '/images/project-clear-path.png',
    category: 'fullstack',
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
  },
]

export function getAllTechnologies(): string[] {
  const all = projects.flatMap((p) => p.technologies)
  return [...new Set(all)].sort()
}
