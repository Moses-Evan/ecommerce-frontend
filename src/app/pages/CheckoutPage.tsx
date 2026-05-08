import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { CreditCard, Wallet, Banknote, CheckCircle } from "lucide-react";

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { navigate } = useNavigation();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const shipping = totalPrice > 2999 ? 0 : 200;
  const finalTotal = totalPrice + shipping;

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && step !== "success") {
    navigate("cart");
    return null;
  }

  if (step === "success") {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl mb-4">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order confirmation has been sent to your email.
            </p>
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-2xl">#DV{Math.floor(Math.random() * 100000)}</p>
            </div>
            <Button onClick={() => navigate("home")} size="lg" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              <div className={`flex-1 flex items-center ${step === "info" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === "info" ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}>
                  1
                </div>
                <div className="ml-2">Shipping Info</div>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div className={`flex-1 flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === "payment" ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}>
                  2
                </div>
                <div className="ml-2">Payment</div>
              </div>
            </div>

            {step === "info" && (
              <form onSubmit={handleSubmitInfo} className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                  />
                  <Label htmlFor="sameAsShipping" className="cursor-pointer">
                    Billing address same as shipping
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl mb-4">Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Wallet className="h-5 w-5" />
                          UPI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep("info")} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Place Order
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <span className="text-muted-foreground">{item.quantity}x</span>
                    <span className="flex-1 line-clamp-1">{item.name}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-2xl text-primary">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
