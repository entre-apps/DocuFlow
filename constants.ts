
import { InternetPlan, TVPlan, TVAddon, PlayhubApp } from './types';

export const PLAN_DETAILS: Record<string, InternetPlan> = {
  "ER-ENTRE 500": {
      id: "ER-ENTRE 500",
      name: "ER-ENTRE 500",
      total: 99.90,
      services: [
          { un: 1, desc: "PORTA ÓPTICA 500Mbps", emp: "BIGDOT TELECOMUNICAÇÕES LTDA", val: 35.00 },
          { un: 1, desc: "Acesso à Internet 500Mbps", emp: "I-CONECTA REDES DE TELECOM.", val: 34.90 },
          { un: 1, desc: "TERMINAL ÓPTICO (ONU)", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 10.00 },
          { un: 1, desc: "COMODATO ROTEADOR WIFI", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 20.00 }
      ]
  },
  "ER-ENTRE 600": {
      id: "ER-ENTRE 600",
      name: "ER-ENTRE 600",
      total: 112.90,
      services: [
          { un: 1, desc: "PORTA ÓPTICA 600Mbps", emp: "BIGDOT TELECOMUNICAÇÕES LTDA", val: 42.00 },
          { un: 1, desc: "Acesso à Internet 600Mbps", emp: "I-CONECTA REDES DE TELECOM.", val: 40.90 },
          { un: 1, desc: "TERMINAL ÓPTICO (ONU)", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 10.00 },
          { un: 1, desc: "COMODATO ROTEADOR WIFI", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 20.00 }
      ]
  },
  "ER-ENTRE 800": {
      id: "ER-ENTRE 800",
      name: "ER-ENTRE 800",
      total: 114.90,
      promoPrice: 89.90,
      promoText: "Valor promocional (3 meses)",
      services: [
          { un: 1, desc: "PORTA ÓPTICA 800Mbps", emp: "BIGDOT TELECOMUNICAÇÕES LTDA", val: 40.00 },
          { un: 1, desc: "Acesso à Internet 800Mbps", emp: "I-CONECTA REDES DE TELECOM.", val: 39.90 },
          { un: 1, desc: "TERMINAL ÓPTICO (ONU) WIFI", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 35.00 }
      ]
  },
  "ER-ENTRE 920": {
      id: "ER-ENTRE 920",
      name: "ER-ENTRE 920",
      total: 169.90,
      services: [
          { un: 1, desc: "PORTA ÓPTICA 920Mbps", emp: "BIGDOT TELECOMUNICAÇÕES LTDA", val: 74.90 },
          { un: 1, desc: "Acesso à Internet 920Mbps", emp: "I-CONECTA REDES DE TELECOM.", val: 60.00 },
          { un: 1, desc: "TERMINAL ÓPTICO (ONU) WIFI", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 35.00 },
          { un: 1, desc: "COMODATO PONTO ADICIONAL OMNI WIFI", emp: "I-NEXT LOCAÇÕES E SERVIÇOS", val: 0.00 }
      ]
  }
};

export const TV_PLANS: Record<string, TVPlan> = {
  "Nenhum": { id: "Nenhum", name: "Nenhum", label: "Nenhum (R$ 0,00)", price: 0.00 },
  "Essential": { id: "Essential", name: "ESSENTIAL", label: "Essential (R$ 15,00)", price: 15.00 },
  "Cine&Sports": { id: "Cine&Sports", name: "CINE & SPORTS", label: "Cine&Sports (R$ 30,00)", price: 30.00 },
  "Plus": { id: "Plus", name: "PLUS", label: "Plus (R$ 60,00)", price: 60.00 },
  "Premium": { id: "Premium", name: "PREMIUM", label: "Premium (R$ 90,00)", price: 90.00 }
};

export const TV_ADDONS: Record<string, TVAddon> = {
  "Max": { id: "Max", name: "MAX", price: 39.90 },
  "Telecine": { id: "Telecine", name: "TELECINE", price: 29.90 },
  "Premiere": { id: "Premiere", name: "PREMIERE", price: 59.90 },
  "Combate": { id: "Combate", name: "COMBATE", price: 34.90 },
  "Awdio": { id: "Awdio", name: "AWDIO", price: 5.00 }
};

export const PLAYHUB_APPS: PlayhubApp[] = [
  {
    "id": "app-sky-light",
    "name": "SKY Light",
    "tier": "Standard",
    "category": "SKY",
    "details": "Acesso básico aos canais SKY com a melhor programação para sua família.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-sky-light-globo",
    "name": "SKY Light + Globo",
    "tier": "Advanced",
    "category": "SKY",
    "details": "Pacote SKY Light incluindo a programação completa da Globo para não perder nada.",
    "price": 30,
    "comboPrice": 25
  },
  {
    "id": "app-sky-light-amazon",
    "name": "SKY Light + Amazon",
    "tier": "Top",
    "category": "SKY",
    "details": "SKY Light turbinado com Amazon Prime para o melhor do streaming e entregas grátis.",
    "price": 35,
    "comboPrice": 30
  },
  {
    "id": "app-sky-full",
    "name": "SKY Full",
    "tier": "SKY FULL",
    "category": "SKY",
    "details": "A experiência completa SKY com todos os canais e recursos disponíveis.",
    "price": 89.90,
    "comboPrice": 89.90
  },
  {
    "id": "app-deezer",
    "name": "Deezer",
    "tier": "Standard",
    "category": "Música",
    "details": "Streaming de música e podcasts com playlists, rádios e recomendações personalizadas.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-looke",
    "name": "Looke",
    "tier": "Standard",
    "category": "Séries e Filmes",
    "details": "Streaming brasileiro com filmes, séries e área infantil (Looke Kids).",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-kiddle-1",
    "name": "Kiddle Pass 1 usuário",
    "tier": "Standard",
    "category": "Infantil",
    "details": "Plataforma de experiências educacionais ao vivo e em vídeo para crianças até 12 anos.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-nutri",
    "name": "+QNutri",
    "tier": "Standard",
    "category": "Saúde e Bem estar",
    "details": "Aplicativo de acompanhamento nutricional e bem‑estar (curadoria e planos alimentares).",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-kaspersky-1",
    "name": "Kaspersky Standard (1 licença)",
    "tier": "Standard",
    "category": "Segurança Digital",
    "details": "Antivírus e proteção essencial com navegação segura e recursos básicos.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-exitlag",
    "name": "Exit Lag",
    "tier": "Standard",
    "category": "Games",
    "details": "Otimizador de rotas para jogos online que reduz lag, perda de pacotes e jitter.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-playkids",
    "name": "PlayKids+",
    "tier": "Standard",
    "category": "Infantil",
    "details": "Plataforma infantil segura com desenhos, jogos educativos e livros digitais.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-hubvantagens",
    "name": "Hub Vantagens",
    "tier": "Standard",
    "category": "Descontos",
    "details": "Clube de benefícios com cupons, descontos em marcas parceiras e cashback.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-ubook",
    "name": "Ubook Plus",
    "tier": "Standard",
    "category": "Educação e Leitura",
    "details": "App de audiolivros, e‑books, podcasts e revistas em um só catálogo.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-estuda",
    "name": "Estuda+",
    "tier": "Standard",
    "category": "Educação e Leitura",
    "details": "App educacional com apostilas em áudio e materiais para reforço e vestibulares.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-pequenosleitores",
    "name": "Pequenos Leitores",
    "tier": "Standard",
    "category": "Infantil",
    "details": "Biblioteca infantil com ebooks e audiobooks selecionados por faixa etária.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-fluid",
    "name": "Fluid",
    "tier": "Standard",
    "category": "Saúde e Bem estar",
    "details": "App de bem‑estar com yoga, meditação guiada, respiração e sons relaxantes.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-socialcomics",
    "name": "Social Comics",
    "tier": "Standard",
    "category": "Educação e Leitura",
    "details": "Streaming de HQs e quadrinhos digitais com catálogo atualizado diariamente.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-revistaria",
    "name": "Revistaria",
    "tier": "Standard",
    "category": "Educação e Leitura",
    "details": "Banca digital com acesso a revistas brasileiras em formato digital/PDF.",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-playlist",
    "name": "Playlist",
    "tier": "Standard",
    "category": "Música",
    "details": "A plataforma oferece mais de 100 playlists de diversos gêneros e estilos musicais, todas elaboradas por profissionais do mercado. Os usuários também podem ouvir a rádio streaming, com músicas, notícias e entrevistas 24 horas por dia",
    "price": 20,
    "comboPrice": 15
  },
  {
    "id": "app-kiddle-2",
    "name": "Kiddle Pass 2 usuários",
    "tier": "Advanced",
    "category": "Infantil",
    "details": "Plataforma de atividades educacionais e de lazer para crianças, ao vivo e em vídeo.",
    "price": 30,
    "comboPrice": 25
  },
  {
    "id": "app-kaspersky-3",
    "name": "Kaspersky Standard (3 licenças)",
    "tier": "Advanced",
    "category": "Segurança Digital",
    "details": "Antivírus e proteção essencial com navegação segura e recursos básicos.",
    "price": 30,
    "comboPrice": 25
  },
  {
    "id": "app-curtaon",
    "name": "Curta ON",
    "tier": "Advanced",
    "category": "Séries e Filmes",
    "details": "Streaming do Canal Curta! com documentários e séries sobre artes e humanidades.",
    "price": 30,
    "comboPrice": 25
  },
  {
    "id": "app-ojornalista",
    "name": "O Jornalista",
    "tier": "Advanced",
    "category": "Educação e Leitura",
    "details": "App para ler e ouvir jornais, revistas e podcasts de notícias brasileiros.",
    "price": 30,
    "comboPrice": 25
  },
  {
    "id": "app-disney-ads",
    "name": "Disney+ (com anúncio)",
    "tier": "Top",
    "category": "Séries e Filmes",
    "details": "Streaming da Disney com anúncios; catálogo Disney, Pixar, Marvel, Star Wars e NatGeo.",
    "price": 35,
    "comboPrice": 30
  },
  {
    "id": "app-hbo-ads",
    "name": "HBO Max (com anúncio)",
    "tier": "Top",
    "category": "Séries e Filmes",
    "details": "Plano com anúncios do Max (HBO), com filmes, séries e esportes selecionados.",
    "price": 35,
    "comboPrice": 30
  },
  {
    "id": "app-cindie",
    "name": "C Indie",
    "tier": "Top",
    "category": "Séries e Filmes",
    "details": "Cindie: streaming de cinema e séries independentes, curadoria internacional.",
    "price": 35,
    "comboPrice": 30
  },
  {
    "id": "app-leitura360",
    "name": "Leitura 360",
    "tier": "Top",
    "category": "Educação e Leitura",
    "details": "Plataforma de leitura multimídia com audiolivros e revistas",
    "price": 35,
    "comboPrice": 30
  },
  {
    "id": "app-disney-noads",
    "name": "Disney+",
    "tier": "Premium",
    "category": "Séries e Filmes",
    "details": "Streaming da Disney sem anúncios em planos elegíveis; filmes e séries Disney, Pixar, Marvel, Star Wars e NatGeo.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-hbo-noads",
    "name": "HBO Max",
    "tier": "Premium",
    "category": "Séries e Filmes",
    "details": "Streaming Max (HBO) com filmes, séries e esportes; opções sem anúncios.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-kaspersky-plus",
    "name": "Kaspersky Plus",
    "tier": "Premium",
    "category": "Segurança Digital",
    "details": "Segurança avançada com antivírus e extras como VPN e monitoramento adicional.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-nba",
    "name": "NBA League Pass",
    "tier": "Premium",
    "category": "Esportes",
    "details": "Serviço oficial para assistir jogos da NBA ao vivo e on‑demand.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-smartcontent",
    "name": "Smart Content",
    "tier": "Premium",
    "category": "Educação e Leitura",
    "details": "App de aprendizado rápido com resumos, vídeos e áudios curados sobre inovação e negócios.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-queimadiaria",
    "name": "Queima Diária",
    "tier": "Premium",
    "category": "Saúde e Bem estar",
    "details": "App de treinos em casa focado em queima de gordura abdominal e condicionamento.",
    "price": 40,
    "comboPrice": 35
  },
  {
    "id": "app-zen",
    "name": "Zen",
    "tier": "Premium",
    "category": "Saúde e Bem estar",
    "details": "App de meditação e sono com conteúdos para ansiedade, sono e bem‑estar.",
    "price": 40,
    "comboPrice": 35
  }
];
