import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

export function NewsSection() {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Corte Suprema Emite Fallo Importante sobre Privacidad Digital',
      description: 'La Corte Suprema ha emitido una decisión histórica sobre los derechos de privacidad digital, estableciendo nuevos precedentes para la protección de datos en la era moderna.',
      date: '2024-11-01',
      category: 'Derecho Constitucional',
      readTime: '5 min de lectura'
    },
    {
      id: '2',
      title: 'Nuevas Regulaciones Federales sobre Gobierno Corporativo',
      description: 'Las agencias federales han anunciado nuevas regulaciones que afectan las estructuras de gobierno corporativo y los requisitos de cumplimiento para empresas públicas.',
      date: '2024-10-28',
      category: 'Derecho Corporativo',
      readTime: '8 min de lectura'
    },
    {
      id: '3',
      title: 'Legislatura Estatal Aprueba Reforma de Justicia Penal',
      description: 'La legislatura estatal ha aprobado una legislación integral de reforma de justicia penal, introduciendo cambios significativos en las directrices de sentencias.',
      date: '2024-10-25',
      category: 'Derecho Penal',
      readTime: '6 min de lectura'
    },
    {
      id: '4',
      title: 'Actualización de Normas de Protección Ambiental',
      description: 'Se han establecido nuevas normas de protección ambiental, impactando las operaciones industriales y los requisitos de cumplimiento ambiental.',
      date: '2024-10-22',
      category: 'Derecho Ambiental',
      readTime: '7 min de lectura'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Noticias y Actualizaciones Legales</h2>
        <p className="text-gray-600 mt-1">Manténgase informado con los últimos desarrollos legales</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {newsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{item.category}</Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTime}
                </span>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-2">
                <Calendar className="w-4 h-4" />
                {new Date(item.date).toLocaleDateString('es-MX', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
