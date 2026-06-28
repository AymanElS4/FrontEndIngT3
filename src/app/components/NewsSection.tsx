import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Edit3 } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

interface NotificacionItem {
  oid_notificacion: number;
  oid_usuario: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  leida: boolean;
  fecha_creacion: string;
}

interface NotificacionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NotificacionItem[];
}

const staticNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Corte Suprema Emite Fallo Importante sobre Privacidad Digital',
    description: 'La Corte Suprema ha emitido una decisión histórica sobre los derechos de privacidad digital, estableciendo nuevos precedentes para la protección de datos en la era moderna.',
    date: '2024-11-01',
    category: 'Derecho Constitucional',
    readTime: '5 min de lectura'
  }
];

export function NewsSection() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificacionItem[]>([]);
  const [formData, setFormData] = useState({ titulo: '', mensaje: '', tipo: 'in-app' });
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [editingNotification, setEditingNotification] = useState<NotificacionItem | null>(null);

  const toggleExpandCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const isAdmin = user?.rol_nombre === 'Administrador';

  const loadNotifications = async () => {
    setError(null);
    try {
      const response = await api.get<NotificacionListResponse | NotificacionItem[]>('/notificaciones/');
      const items = Array.isArray(response) ? response : response.results;
      setNotifications(items);
    } catch (err) {
      setError((err as Error).message || 'No se pudieron cargar las notificaciones.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadNotifications();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ titulo: '', mensaje: '', tipo: 'in-app' });
    setEditingNotification(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!formData.titulo.trim() || !formData.mensaje.trim()) {
      setError('El título y el mensaje son obligatorios.');
      return;
    }


    try {
      if (editingNotification) {
        await api.patch<NotificacionItem>(`/notificaciones/${editingNotification.oid_notificacion}/`, {
          titulo: formData.titulo.trim(),
          mensaje: formData.mensaje.trim(),
          tipo: formData.tipo
        });
        setMessage('Notificación actualizada correctamente.');
      } else {
        const payload: any = {
          titulo: formData.titulo.trim(),
          mensaje: formData.mensaje.trim(),
          tipo: formData.tipo
        };
        await api.post<NotificacionItem>('/notificaciones/', payload);
        setMessage('Notificación creada correctamente.');
      }
      resetForm();
      loadNotifications();
    } catch (err) {
      setError((err as Error).message || 'No se pudo guardar la notificación.');
    }
  };

  const startEditing = (notification: NotificacionItem) => {
    setEditingNotification(notification);
    setFormData({ titulo: notification.titulo, mensaje: notification.mensaje, tipo: notification.tipo });
    setError(null);
    setMessage(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Noticias y Actualizaciones Legales</h2>
        <p className="text-gray-600 mt-1">Manténgase informado con los últimos desarrollos legales</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {isAdmin && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{editingNotification ? 'Editar notificación' : 'Crear notificación'}</h3>
              <p className="text-sm text-gray-600">Solo el administrador puede crear o modificar notificaciones aquí.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
              <input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={(event) => updateField('titulo', event.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el título de la notificación"
                required
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={(event) => updateField('mensaje', event.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe el texto de la notificación"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {editingNotification ? 'Guardar cambios' : 'Crear notificación'}
              </button>
              {editingNotification && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notificaciones dinámicas del administrador */}
        {notifications.map((notification) => {
          const cardId = `dyn-${notification.oid_notificacion}`;
          const isExpanded = !!expandedCards[cardId];
          return (
            <Card
              key={cardId}
              className="hover:shadow-lg transition-shadow cursor-pointer relative flex flex-col justify-between"
              onClick={() => toggleExpandCard(cardId)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">
                    {notification.tipo === 'in-app' ? 'Actualización' : notification.tipo}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {Math.max(1, Math.ceil(notification.mensaje.split(/\s+/).length / 150))} min de lectura
                  </span>
                </div>
                <CardTitle className="text-xl">{notification.titulo}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(notification.fecha_creacion).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className={`text-gray-700 mb-4 whitespace-pre-wrap transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {notification.mensaje}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-semibold hover:underline">
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita colapsar/expandir al hacer clic en editar
                        startEditing(notification);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Editar
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Noticias estáticas */}
        {staticNewsItems.map((item) => {
          const cardId = `static-${item.id}`;
          const isExpanded = !!expandedCards[cardId];
          return (
            <Card
              key={cardId}
              className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
              onClick={() => toggleExpandCard(cardId)}
            >
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
              <CardContent className="flex-col flex-grow flex justify-between">
                <p className={`text-gray-700 mb-4 whitespace-pre-wrap transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {item.description}
                </p>
                <div className="mt-auto">
                  <span className="text-xs text-blue-600 font-semibold hover:underline">
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
