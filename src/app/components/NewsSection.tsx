import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Edit3, PlusCircle } from 'lucide-react';
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
  const [activeNotification, setActiveNotification] = useState<NotificacionItem | null>(null);
  const [editingNotification, setEditingNotification] = useState<NotificacionItem | null>(null);
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
    loadNotifications();
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

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Notificaciones</h3>
            <p className="text-sm text-gray-600">Revisa las notificaciones asociadas a tu cuenta.</p>
          </div>
          <Badge variant="outline">{isAdmin ? 'Administrador' : 'Usuario'}</Badge>
        </div>

        {notifications.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No hay notificaciones disponibles en este momento.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {notifications.map((notification) => (
              <div key={notification.oid_notificacion} className="rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer" onClick={() => setActiveNotification(notification)}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{notification.titulo}</h4>
                    <p className="text-sm text-gray-500">{notification.tipo === 'in-app' ? 'Notificación interna' : notification.tipo}</p>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    {new Date(notification.fecha_creacion).toLocaleDateString('es-MX', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="mt-3 text-gray-700 line-clamp-2">{notification.mensaje}</p>
                {isAdmin && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => startEditing(notification)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      <Edit3 className="h-4 w-4" />
                      Editar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Active notification modal / drawer */}
      {activeNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-w-2xl w-full rounded-xl bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{activeNotification.titulo}</h3>
                <p className="text-sm text-gray-500">{new Date(activeNotification.fecha_creacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <button onClick={() => setActiveNotification(null)} className="text-gray-500">Cerrar</button>
            </div>
            <div className="mt-4 text-gray-700">
              {activeNotification.mensaje}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setActiveNotification(null)} className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {staticNewsItems.map((item) => (
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
