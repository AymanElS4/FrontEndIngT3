import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';

interface PaymentPageProps {
  selectedPlan: {
    name: string;
    price: string;
    features: string[];
  };
  onConfirm: () => void;
  onBack: () => void;
}

export function PaymentPage({ selectedPlan, onConfirm, onBack }: PaymentPageProps) {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onConfirm();
    }, 1000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <div>
          <h2 className="text-2xl text-gray-900">Información de Pago</h2>
          <p className="text-gray-600 mt-1">Complete sus datos para procesar el pago</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Plan Seleccionado</span>
                  <Badge>{selectedPlan.name}</Badge>
                </div>
                <div className="text-2xl mb-4">{selectedPlan.price}</div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Características incluidas:</p>
                  <ul className="text-sm space-y-1">
                    {selectedPlan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-gray-700">• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (16%)</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total</span>
                  <span>{selectedPlan.price}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4" />
                  <span>Pago Seguro</span>
                </div>
                <p className="text-xs">Todos los pagos están encriptados y protegidos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Información de Pago
              </CardTitle>
              <CardDescription>
                Ingrese los datos de su tarjeta de crédito o débito
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                    <Input
                      id="cardName"
                      placeholder="Juan Pérez"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value.slice(0, 19));
                        setFormData({ ...formData, cardNumber: formatted });
                      }}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Fecha de Expiración *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData({ ...formData, expiryDate: formatted });
                        }}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value.slice(0, 4) })}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="border-t pt-6">
                  <h3 className="mb-4">Información de Facturación</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="su@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Dirección *</Label>
                      <Input
                        id="billingAddress"
                        placeholder="Calle y número"
                        value={formData.billingAddress}
                        onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          placeholder="Ciudad de México"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Código Postal *</Label>
                        <Input
                          id="zipCode"
                          placeholder="06600"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.slice(0, 5) })}
                          maxLength={5}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">País *</Label>
                      <Input
                        id="country"
                        placeholder="México"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 gap-2">
                    <Lock className="w-4 h-4" />
                    Confirmar Pago
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
