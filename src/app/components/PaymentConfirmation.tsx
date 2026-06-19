import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Download, Mail } from 'lucide-react';

interface PaymentConfirmationProps {
  plan: {
    name: string;
    price: string;
  };
  onGoHome: () => void;
}

export function PaymentConfirmation({ plan, onGoHome }: PaymentConfirmationProps) {
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`;
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="border-2 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="bg-blue-50 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-blue-600" />
              </div>
            </div>

            {/* Success Message */}
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">¡Solicitud Recibida!</h2>
              <p className="text-gray-600 text-lg">
                Su solicitud de suscripción está siendo procesada
              </p>
            </div>

            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-left">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600">Plan Solicitado</span>
                <span className="text-gray-900">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600">Monto del Plan</span>
                <span className="text-gray-900">{plan.price}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600">ID de Solicitud</span>
                <span className="text-gray-900 font-mono text-sm">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fecha y Hora</span>
                <span className="text-gray-900 text-sm">{currentDate}</span>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 animate-pulse" />
                <div className="text-sm">
                  <p className="text-blue-900 mb-1 font-semibold">
                    Se ha enviado una notificación de confirmación a su cuenta de LegalFileManager.
                  </p>
                  <p className="text-blue-700">
                    Un representante de nuestro equipo de facturación le contactará próximamente al correo electrónico registrado (ejemplo de contacto: <strong>pagos@legalfilemanager.com</strong>) para indicarle los pasos necesarios para realizar su pago. Su plan se activará inmediatamente una vez confirmado.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Descargar Recibo
              </Button>
              <Button onClick={onGoHome} className="flex-1">
                Ir a Inicio
              </Button>
            </div>

            {/* Support Info */}
            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>¿Necesita ayuda? Contáctenos en <a href="mailto:soporte@legalmanagement.com" className="text-blue-600 hover:underline">soporte@legalmanagement.com</a></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
