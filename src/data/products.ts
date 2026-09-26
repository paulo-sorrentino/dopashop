import { Product, Coupon } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'super-yacht-gold',
    name: 'Super Iate Transatlântico Ouro 24k "Dopa Queen"',
    category: 'luxo',
    price: 350000000,
    koreanWon: 85000000000,
    originalPrice: 420000000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=80',
    description: 'Vem equipado com 3 helipontos, cinema privativo IMAX, jacuzzi com vista para o infinito e um mordomo que aplaude suas piadas 24h por dia.',
    dopamineLevel: 99,
    rating: 5.0,
    reviewsCount: 1420,
    badge: '👑 TOPO DA DOPAMINA',
    tagline: 'Ideal para fingir que você vai ancorar em Mônaco neste fim de semana.'
  },
  {
    id: 'cyber-gamer-setup',
    name: 'Setup Gamer Holográfico com 8 Monitores Quantum',
    category: 'tech',
    price: 185000,
    koreanWon: 45000000,
    originalPrice: 240000,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    description: 'Cadeira com gravidade zero, refrigeração com nitrogênio líquido e 128 Terabytes de pura estética RGB para rodar joguinhos a 1000 FPS.',
    dopamineLevel: 96,
    rating: 4.9,
    reviewsCount: 3890,
    badge: '⚡ RECOMENDADO PRO',
    tagline: 'Sua produtividade vai cair a zero, mas com estilo inigualável.'
  },
  {
    id: 'private-cyber-island',
    name: 'Ilha Privativa Tropical no Oceano Pacífico',
    category: 'luxo',
    price: 180000000,
    koreanWon: 44000000000,
    originalPrice: 220000000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    description: 'Praia de areia branca privativa, lago de água termal cristalina, sinal Wi-Fi 7 espacial e 0% de vizinhos chatos tocando música alta.',
    dopamineLevel: 100,
    rating: 5.0,
    reviewsCount: 654,
    badge: '🏝️ EXCLUSIVO',
    tagline: 'Não precisa declarar no Imposto de Renda porque é 100% psicológico.'
  },
  {
    id: 'hyper-sneakers-levitating',
    name: 'Tênis Hypebeast NASA com Levitação Magnética',
    category: 'hype',
    price: 45000,
    koreanWon: 11000000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
    description: 'Você nunca mais vai sujar a sola. Flutue 5 centímetros acima de poças d\'água enquanto atrai olhares invejosos de todos no shopping.',
    dopamineLevel: 94,
    rating: 4.8,
    reviewsCount: 5210,
    badge: '🔥 HYPE MÁXIMO',
    tagline: 'Passadas macias como pisar em nuvens de algodão doce.'
  },
  {
    id: 'private-supersonic-jet',
    name: 'Jato Supersônico com Piscina de Bolinhas Térmica',
    category: 'luxo',
    price: 520000000,
    koreanWon: 125000000000,
    originalPrice: 610000000,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
    description: 'Cruza de São Paulo a Tóquio em 2 horas. Inclui poltronas de veludo italiano, chef particular estrelado e kit de descanso absoluto.',
    dopamineLevel: 98,
    rating: 5.0,
    reviewsCount: 890,
    badge: '✈️ 0 ATRASOS',
    tagline: 'Diga adeus à fila do aeroporto no conforto da sua imaginação.'
  },
  {
    id: 'infinite-chocolate-mountain',
    name: '1 Tonelada de Chocolate Suíço Artesanal com Avelã',
    category: 'conforto',
    price: 32000,
    koreanWon: 7800000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80',
    description: 'Chega em um caminhão refrigerado direto para sua despensa. Teor de felicidade comprovado em 999% sem calorias metabólicas.',
    dopamineLevel: 92,
    rating: 4.9,
    reviewsCount: 8740,
    badge: '🍫 PURO PRAZER',
    tagline: 'Seu dentista não vai reclamar porque foi comprado no DopaShop.'
  },
  {
    id: 'cybertruck-diamond-edition',
    name: 'Cybercarro Blindado Banho de Titânio & Diamantes',
    category: 'tech',
    price: 1200000,
    koreanWon: 290000000,
    originalPrice: 1500000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    description: 'Resistente a apocalipse zumbi, com inteligência artificial conversacional que elogia seu corte de cabelo sempre que você entra.',
    dopamineLevel: 97,
    rating: 4.9,
    reviewsCount: 2130,
    badge: '💎 INDESTRUTÍVEL',
    tagline: 'Não precisa de vaga de garagem, cabe perfeitamente na sua mente.'
  },
  {
    id: 'luxury-meteorite-watch',
    name: 'Relógio Suíço Forjado com Fragmentos de Marte',
    category: 'luxo',
    price: 890000,
    koreanWon: 215000000,
    originalPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
    description: 'Movimento turbilhão infinito que mede o tempo terrestre e o tempo cósmico. Acabamento em safira ultra resistente a arranhões.',
    dopamineLevel: 95,
    rating: 4.8,
    reviewsCount: 1490,
    badge: '🪐 CÓSMICO',
    tagline: 'O tempo voa quando você não gasta dinheiro de verdade.'
  },
  {
    id: 'endless-coffee-machine',
    name: 'Estação Barista Quântica com Grãos Raros de Java',
    category: 'conforto',
    price: 18500,
    koreanWon: 4500000,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80',
    description: 'Moedor micrométrico de cerâmica com controle térmico a laser. Tira espressos cremosos perfeitos com crema aveludada instantânea.',
    dopamineLevel: 91,
    rating: 4.9,
    reviewsCount: 4320,
    badge: '☕ AROMA REAL',
    tagline: 'O cheiro de café novo para despertar seu cérebro sem cafeína.'
  },
  {
    id: 'zero-gravity-cloud-bed',
    name: 'Cama Magnética de Gravidade Zero com Plumas de Ganso',
    category: 'conforto',
    price: 78000,
    koreanWon: 19000000,
    originalPrice: 99000,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description: 'Flutua 30cm do chão com massagem integrada, regulação automática de temperatura e cancelamento ativo de barulho externo.',
    dopamineLevel: 97,
    rating: 5.0,
    reviewsCount: 3100,
    badge: '☁️ SONO DOS DEUSES',
    tagline: 'Acorde sentindo que dormiu 14 horas em um resort suíço.'
  },
  {
    id: 'penthouse-manhattan-skyline',
    name: 'Cobertura Duplex no 90º Andar com Vista 360°',
    category: 'luxo',
    price: 95000000,
    koreanWon: 23000000000,
    originalPrice: 120000000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    description: 'Paredes de vidro do chão ao teto, lareira suspensa, adega para 5.000 garrafas e elevador privativo com leitor biométrico.',
    dopamineLevel: 99,
    rating: 4.9,
    reviewsCount: 970,
    badge: '🏙️ VISTA SUPREMA',
    tagline: 'O pôr do sol mais caro do mundo, de graça na sua tela.'
  },
  {
    id: 'hermes-infinite-bag',
    name: 'Bolsa Hype de Grife com Espaço Dimensional Infinito',
    category: 'hype',
    price: 195000,
    koreanWon: 47000000,
    originalPrice: 280000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    description: 'Couro vegano ultra-macio costurado à mão. Por fora tem o tamanho de uma clutch, por dentro cabe até o seu carrinho de compras.',
    dopamineLevel: 93,
    rating: 4.8,
    reviewsCount: 1840,
    badge: '✨ IT-BAG',
    tagline: 'A bolsa que celebridades passam 3 anos na fila para conseguir.'
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'DOPAMINA99',
    discountPercent: 99,
    label: '99% DE DESCONTO',
    description: 'O clássico cupom coreano da dopamina pura.'
  },
  {
    code: 'COREIA100',
    discountPercent: 99.9,
    label: '99.9% QUASE DE GRAÇA',
    description: 'Inspirado na febre de compras de Seul.'
  },
  {
    code: 'QUEROTUDO',
    discountPercent: 95,
    label: '95% SUPER DESCONTO',
    description: 'Para quem colocou meio bilhão no carrinho.'
  },
  {
    code: 'FALENCIAZERO',
    discountPercent: 90,
    label: '90% SALVA-BOLSO',
    description: 'Sua conta bancária real agradece profundamente.'
  },
  {
    code: 'BILIONARIO',
    discountPercent: 98,
    label: '98% CLUB VIP',
    description: 'Acesso VIP da alta sociedade imaginária.'
  }
];
