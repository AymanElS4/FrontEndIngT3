import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';

interface SubscriptionPageProps {
  onSelectPlan: (plan: { name: string; price: string; features: string[] }) => void;
}

export function SubscriptionPage({ onSelectPlan }: SubscriptionPageProps) {
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
      ],
      isCurrent: false
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
      isCurrent: true,
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
      ],
      isCurrent: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
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
                tier.isCurrent
                  ? 'border-2 border-blue-600 shadow-lg'
                  : 'border-2 border-gray-200'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600">Más Popular</Badge>
                </div>
              )}
              {tier.isCurrent && !tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-600">Plan Actual</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full ${
                    tier.isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      tier.isCurrent ? 'text-blue-600' : 'text-gray-600'
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
                  {tier.isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>
                      Plan Actual
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => onSelectPlan(tier)}
                    >
                      {tier.price < '$79' ? 'Cambiar Plan' : 'Actualizar'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2">Facturación</h4>
              <p className="text-sm text-gray-600">
                Todos los planes se facturan mensualmente. Puede cancelar o cambiar su plan en
                cualquier momento sin penalizaciones.
              </p>
            </div>
            <div>
              <h4 className="mb-2">Período de Prueba</h4>
              <p className="text-sm text-gray-600">
                Los nuevos usuarios obtienen 14 días de prueba gratuita del plan Profesional.
                No se requiere tarjeta de crédito.
              </p>
            </div>
            <div>
              <h4 className="mb-2">Garantía de Reembolso</h4>
              <p className="text-sm text-gray-600">
                Si no está satisfecho con nuestro servicio, ofrecemos una garantía de reembolso
                completo de 30 días.
              </p>
            </div>
            <div>
              <h4 className="mb-2">Soporte Técnico</h4>
              <p className="text-sm text-gray-600">
                Todos los planes incluyen acceso a nuestra base de conocimientos y tutoriales
                en video. El soporte varía según el plan.
              </p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">
              ¿Necesita un plan personalizado para su firma? Contáctenos para discutir
              opciones empresariales personalizadas.
            </p>
            <Button variant="outline" className="mt-3">
              Contactar Ventas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
