import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, Phone, MapPin, Send, FileText, BookOpen, FolderOpen, Check, Crown, Star, Zap, ArrowRight, Calendar } from 'lucide-react';
import { useState } from 'react';

interface HomePageProps {
  onSelectPlan: (plan: { name: string; price: string; features: string[] }) => void;
  onNavigateToNews?: () => void;
}

export function HomePage({ onSelectPlan, onNavigateToNews }: HomePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const subscriptionTiers = [
    {
      name: 'Básico',
      price: '$29',
      icon: Star,
      features: [
        '5 Casos Activos',
        '10 GB de Almacenamiento',
        'Soporte por Email',
        'Acceso a Códigos Legales',
        'Búsqueda Básica'
      ]
    },
    {
      name: 'Profesional',
      price: '$79',
      icon: Crown,
      features: [
        'Casos Ilimitados',
        '100 GB de Almacenamiento',
        'Soporte Prioritario',
        'Analítica Avanzada',
        'Búsqueda Avanzada',
        'Exportación de Reportes',
        'Integraciones Básicas'
      ],
      isPopular: true
    },
    {
      name: 'Empresarial',
      price: '$199',
      icon: Zap,
      features: [
        'Todo Ilimitado',
        '1 TB de Almacenamiento',
        'Soporte 24/7 Telefónico',
        'Integraciones Personalizadas',
        'API Completa',
        'Gestión de Equipos',
        'Seguridad Avanzada',
        'Capacitación Personalizada'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Gracias por contactarnos. Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const newsArticles = [
    {
      id: 1,
      title: 'Nueva Reforma al Código Civil Federal',
      date: '15 de Enero, 2025',
      category: 'Legislación',
      excerpt: 'El Congreso aprobó importantes cambios al Código Civil Federal que entrarán en vigor el próximo mes.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'
    },
    {
      id: 2,
      title: 'Jurisprudencia Relevante en Derecho Laboral',
      date: '12 de Enero, 2025',
      category: 'Jurisprudencia',
      excerpt: 'La Suprema Corte de Justicia establece nuevos criterios sobre prestaciones laborales.',
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400'
    },
    {
      id: 3,
      title: 'Actualización en Procedimientos Penales',
      date: '10 de Enero, 2025',
      category: 'Procedimientos',
      excerpt: 'Nuevas disposiciones para agilizar los procesos penales en todo el país.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400'
    }
  ];

  return (
    <div className="space-y-0">
      {/* News Section */}
      <section className="mb-12">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-gray-900">Noticias Recientes</h2>
              <p className="text-gray-600 mt-1 text-sm">Manténgase actualizado con las últimas noticias legales</p>
            </div>
            {onNavigateToNews && (
              <Button variant="outline" onClick={onNavigateToNews} className="gap-2" size="sm">
                Ver Todas
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {newsArticles.map((article) => (
            <Card 
              key={article.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={onNavigateToNews}
            >
              <div className="relative h-32 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-blue-600 text-xs">
                  {article.category}
                </Badge>
              </div>
              <CardHeader className="pb-2 pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </div>
                <CardTitle className="text-base line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-xs line-clamp-2">{article.excerpt}</p>
                <div className="mt-3">
                  <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto text-xs hover:bg-transparent">
                    Leer más
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 border-b">
        <div className="mb-8">
          <h2 className="text-3xl text-gray-900">Nuestros Servicios</h2>
          <p className="text-gray-600 mt-2">Herramientas completas para la gestión legal profesional</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group">
            <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <FolderOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl mb-2">Gestión de Casos</h3>
            <p className="text-gray-600">
              Organice y administre todos sus casos legales en un solo lugar con herramientas
              avanzadas de búsqueda y filtrado.
            </p>
          </div>

          <div className="group">
            <div className="bg-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl mb-2">Códigos Legales</h3>
            <p className="text-gray-600">
              Acceda a una biblioteca completa de códigos y artículos legales con funcionalidad
              de búsqueda rápida.
            </p>
          </div>

          <div className="group">
            <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Documentación</h3>
            <p className="text-gray-600">
              Cargue, descargue y administre todos sus documentos legales de forma segura en
              directorios organizados.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="py-12 border-b">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-gray-900 mb-2">Planes de Suscripción</h2>
          <p className="text-gray-600">
            Elija el plan que mejor se adapte a sus necesidades profesionales
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {subscriptionTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.isPopular
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border-2 border-gray-200'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600">Más Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full ${
                      tier.isPopular ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        tier.isPopular ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl">{tier.price}</span>
                    <span className="text-gray-600">/mes</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full text-sm px-3 py-2 h-9"
                      onClick={() => onSelectPlan(tier)}
                    >
                      Seleccionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 border-b">
        <div className="mb-8">
          <h2 className="text-3xl text-gray-900">Contáctenos</h2>
          <p className="text-gray-600 mt-2">
            ¿Tiene alguna pregunta? Envíenos un mensaje y nos pondremos en contacto con usted.
          </p>
        </div>
        <div className="bg-white rounded-lg border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Su nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="su@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+52 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Escriba su mensaje aquí..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white rounded-lg p-8 mt-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5" />
                <div>
                  <p>info@legalmanagement.com</p>
                  <p>soporte@legalmanagement.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5" />
                <div>
                  <p>+52 (555) 123-4567</p>
                  <p>+52 (555) 765-4321</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5" />
                <p>Av. Paseo de la Reforma 123<br />Ciudad de México, 06600</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Acerca de Nosotros</a></li>
              <li><a href="#" className="hover:text-white">Servicios</a></li>
              <li><a href="#" className="hover:text-white">Precios</a></li>
              <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Horario de Atención</h3>
            <div className="space-y-2 text-gray-300">
              <p>Lunes - Viernes: 9:00 AM - 7:00 PM</p>
              <p>Sábados: 10:00 AM - 2:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
            <div className="mt-4">
              <h4 className="mb-2">Soporte Técnico 24/7</h4>
              <p className="text-gray-300">Disponible para suscriptores Premium</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Gestor de Archivos Legales. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
