export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  location: string;
  memberSince: string;
  avatar: string;
  rating: number;
  totalSales: number;
  totalPurchases: number;
  bio: string;
};

export type Review = {
  id: number;
  reviewerId: number;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  transactionType: 'sale' | 'purchase';
  productName: string;
};

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'TechStore Inc',
    username: 'techstore',
    email: 'contact@techstore.com',
    location: 'New York, NY',
    memberSince: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    rating: 4.8,
    totalSales: 127,
    totalPurchases: 15,
    bio: 'Tienda especializada en tecnología de alta gama. Vendemos productos nuevos y certificados con garantía.'
  },
  {
    id: 2,
    name: 'Mobile World',
    username: 'mobileworld',
    email: 'info@mobileworld.com',
    location: 'Los Angeles, CA',
    memberSince: '2023-03-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.9,
    totalSales: 89,
    totalPurchases: 8,
    bio: 'Expertos en smartphones y accesorios móviles. Todos nuestros productos están probados y verificados.'
  },
  {
    id: 3,
    name: 'GadgetHub',
    username: 'gadgethub',
    email: 'sales@gadgethub.com',
    location: 'Chicago, IL',
    memberSince: '2022-11-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    rating: 4.7,
    totalSales: 156,
    totalPurchases: 22,
    bio: 'Tu destino para gadgets y tecnología innovadora. Precios competitivos y envío rápido.'
  },
  {
    id: 4,
    name: 'PC Marketplace',
    username: 'pcmarket',
    email: 'hello@pcmarketplace.com',
    location: 'Austin, TX',
    memberSince: '2023-05-08',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 4.6,
    totalSales: 73,
    totalPurchases: 18,
    bio: 'Especialistas en computadoras y laptops. Ofrecemos equipos gaming y profesionales de segunda mano.'
  },
  {
    id: 5,
    name: 'Audio Pro',
    username: 'audiopro',
    email: 'support@audiopro.com',
    location: 'Seattle, WA',
    memberSince: '2023-07-12',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    rating: 5.0,
    totalSales: 45,
    totalPurchases: 5,
    bio: 'Amantes del audio de alta fidelidad. Vendemos auriculares y equipos de audio premium.'
  },
  {
    id: 6,
    name: 'Apple Reseller',
    username: 'applereseller',
    email: 'info@applereseller.com',
    location: 'Miami, FL',
    memberSince: '2022-09-25',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    rating: 4.9,
    totalSales: 198,
    totalPurchases: 30,
    bio: 'Revendedor autorizado de productos Apple. Garantía y autenticidad en cada producto.'
  },
  {
    id: 7,
    name: 'Gaming Central',
    username: 'gamingcentral',
    email: 'contact@gamingcentral.com',
    location: 'Denver, CO',
    memberSince: '2023-02-18',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    rating: 4.8,
    totalSales: 112,
    totalPurchases: 25,
    bio: 'Todo para gamers: PCs, consolas, periféricos y más. Construimos PCs personalizados.'
  },
  {
    id: 8,
    name: 'Photo Pro',
    username: 'photopro',
    email: 'sales@photopro.com',
    location: 'Portland, OR',
    memberSince: '2023-04-05',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    rating: 4.7,
    totalSales: 67,
    totalPurchases: 12,
    bio: 'Especialistas en equipos fotográficos profesionales. Cámaras, lentes y accesorios de calidad.'
  }
];

export const mockReviews: Record<number, Review[]> = {
  1: [ // TechStore Inc
    {
      id: 1,
      reviewerId: 101,
      reviewerName: 'Carlos Mendoza',
      reviewerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
      rating: 5,
      comment: 'Excelente vendedor! El MacBook llegó en perfectas condiciones, exactamente como se describió. Empaquetado profesional y envío rápido. 100% recomendado.',
      date: '2024-12-10',
      transactionType: 'sale',
      productName: 'MacBook Pro 16" M2'
    },
    {
      id: 2,
      reviewerId: 102,
      reviewerName: 'Ana García',
      reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      rating: 5,
      comment: 'Muy profesionales. Respondieron todas mis preguntas antes de comprar. El producto es auténtico y funciona perfectamente.',
      date: '2024-12-08',
      transactionType: 'sale',
      productName: 'iPad Pro 12.9"'
    },
    {
      id: 3,
      reviewerId: 103,
      reviewerName: 'Miguel Torres',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 4,
      comment: 'Buena experiencia en general. El producto llegó bien, aunque el envío tardó un poco más de lo esperado. La comunicación fue excelente.',
      date: '2024-12-05',
      transactionType: 'sale',
      productName: 'Dell XPS 15'
    },
    {
      id: 4,
      reviewerId: 104,
      reviewerName: 'Laura Jiménez',
      reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rating: 5,
      comment: 'Increíble servicio! Incluyen factura y garantía. El equipo está como nuevo. Definitivamente volveré a comprar aquí.',
      date: '2024-12-01',
      transactionType: 'sale',
      productName: 'MacBook Air M1'
    }
  ],
  2: [ // Mobile World
    {
      id: 5,
      reviewerId: 105,
      reviewerName: 'Roberto Sánchez',
      reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      rating: 5,
      comment: 'El iPhone llegó impecable! Batería al 100%, sin ningún rayón. El vendedor fue muy transparente con el estado del teléfono.',
      date: '2024-12-12',
      transactionType: 'sale',
      productName: 'iPhone 15 Pro Max'
    },
    {
      id: 6,
      reviewerId: 106,
      reviewerName: 'Patricia Ruiz',
      reviewerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
      rating: 5,
      comment: 'Excelente atención al cliente. Me ayudaron a elegir el modelo correcto para mis necesidades. Producto original y verificado.',
      date: '2024-12-09',
      transactionType: 'sale',
      productName: 'Samsung Galaxy S24'
    },
    {
      id: 7,
      reviewerId: 107,
      reviewerName: 'José Martínez',
      reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      rating: 4,
      comment: 'Buen vendedor, producto como se describe. Solo un pequeño detalle: el cargador no era original, pero el vendedor me hizo un descuento.',
      date: '2024-12-06',
      transactionType: 'sale',
      productName: 'iPhone 14 Pro'
    }
  ],
  3: [ // GadgetHub
    {
      id: 8,
      reviewerId: 108,
      reviewerName: 'Diana López',
      reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      rating: 5,
      comment: 'Samsung Galaxy perfectamente empaquetado con todos sus accesorios originales. El S Pen funciona genial. Vendedor de confianza!',
      date: '2024-12-13',
      transactionType: 'sale',
      productName: 'Samsung Galaxy S24 Ultra'
    },
    {
      id: 9,
      reviewerId: 109,
      reviewerName: 'Fernando Vargas',
      reviewerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      rating: 4,
      comment: 'Buena compra. El tablet funciona bien, aunque tenía una pequeña marca que no se mencionaba en la descripción. Nada grave.',
      date: '2024-12-07',
      transactionType: 'sale',
      productName: 'iPad Air'
    },
    {
      id: 10,
      reviewerId: 110,
      reviewerName: 'Gabriela Castro',
      reviewerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      rating: 5,
      comment: 'Súper rápidos en la entrega! El producto es exactamente como se muestra en las fotos. Muy satisfecha con la compra.',
      date: '2024-12-04',
      transactionType: 'sale',
      productName: 'Google Pixel 8 Pro'
    }
  ],
  4: [ // PC Marketplace
    {
      id: 11,
      reviewerId: 111,
      reviewerName: 'Ricardo Flores',
      reviewerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      rating: 5,
      comment: 'La laptop Dell está en excelente estado! Especificaciones verificadas, viene con Windows original. Perfecto para trabajo.',
      date: '2024-12-11',
      transactionType: 'sale',
      productName: 'Dell XPS 15'
    },
    {
      id: 12,
      reviewerId: 112,
      reviewerName: 'Sofía Morales',
      reviewerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
      rating: 4,
      comment: 'Buen equipo gaming. La tarjeta gráfica es potente como se prometió. Solo la caja venía un poco maltratada pero el contenido está bien.',
      date: '2024-12-03',
      transactionType: 'sale',
      productName: 'Laptop Gaming ASUS'
    }
  ],
  5: [ // Audio Pro
    {
      id: 13,
      reviewerId: 113,
      reviewerName: 'Andrés Reyes',
      reviewerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
      rating: 5,
      comment: 'Los Sony WH-1000XM5 son increíbles! Llegaron nuevos en caja sellada. La cancelación de ruido es espectacular. Vendedor 10/10.',
      date: '2024-12-14',
      transactionType: 'sale',
      productName: 'Sony WH-1000XM5'
    },
    {
      id: 14,
      reviewerId: 114,
      reviewerName: 'Valentina Cruz',
      reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      rating: 5,
      comment: 'Calidad de audio premium! El vendedor conoce muy bien los productos y me asesoró perfectamente. Muy recomendado.',
      date: '2024-12-10',
      transactionType: 'sale',
      productName: 'Bose QuietComfort 45'
    }
  ],
  6: [ // Apple Reseller
    {
      id: 15,
      reviewerId: 115,
      reviewerName: 'Pablo Herrera',
      reviewerAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
      rating: 5,
      comment: 'iPad Pro con Magic Keyboard, todo original de Apple. Batería nueva, pantalla perfecta. Excelente vendedor, muy confiable.',
      date: '2024-12-09',
      transactionType: 'sale',
      productName: 'iPad Pro 12.9"'
    },
    {
      id: 16,
      reviewerId: 116,
      reviewerName: 'Camila Ortiz',
      reviewerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      rating: 5,
      comment: 'AirPods Pro auténticos verificados! Incluyen todos los accesorios y factura. Servicio postventa excelente.',
      date: '2024-12-05',
      transactionType: 'sale',
      productName: 'AirPods Pro 2'
    },
    {
      id: 17,
      reviewerId: 117,
      reviewerName: 'Daniel Ramírez',
      reviewerAvatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400',
      rating: 4,
      comment: 'MacBook funciona perfectamente. Un poco de desgaste cosmético en la carcasa pero nada preocupante. Buen precio.',
      date: '2024-12-02',
      transactionType: 'sale',
      productName: 'MacBook Air M2'
    }
  ],
  7: [ // Gaming Central
    {
      id: 18,
      reviewerId: 118,
      reviewerName: 'Sebastián Díaz',
      reviewerAvatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400',
      rating: 5,
      comment: 'PC gaming bestial! RTX 4080 corriendo juegos en ultra sin problemas. Cable management impecable. Estos tipos saben lo que hacen.',
      date: '2024-12-08',
      transactionType: 'sale',
      productName: 'Gaming PC RTX 4080'
    },
    {
      id: 19,
      reviewerId: 119,
      reviewerName: 'Isabella Rojas',
      reviewerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      rating: 5,
      comment: 'Compramos una PC para mi hijo y quedó encantado. RGB personalizado como pedimos. Atención al cliente excepcional!',
      date: '2024-12-06',
      transactionType: 'sale',
      productName: 'Gaming PC Custom RGB'
    }
  ],
  8: [ // Photo Pro
    {
      id: 20,
      reviewerId: 120,
      reviewerName: 'Alejandro Silva',
      reviewerAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
      rating: 5,
      comment: 'Canon EOS R5 en estado impecable! Contador de disparos bajo, lente sin hongos. Vendedor muy profesional y conocedor.',
      date: '2024-12-07',
      transactionType: 'sale',
      productName: 'Canon EOS R5'
    },
    {
      id: 21,
      reviewerId: 121,
      reviewerName: 'Natalia Vega',
      reviewerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      rating: 4,
      comment: 'Buen equipo fotográfico. El lente tiene un pequeño polvo interno pero no afecta las fotos. Precio justo.',
      date: '2024-12-03',
      transactionType: 'sale',
      productName: 'Sony A7 III Kit'
    }
  ]
};

export function getUserById(id: number): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getReviewsByUserId(userId: number): Review[] {
  return mockReviews[userId] || [];
}
