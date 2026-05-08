import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

export function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { navigate } = useNavigation();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = totalPrice > 2999 ? 0 : 200;
  const finalTotal = totalPrice - discount + shipping;

  const applyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(totalPrice * 0.1);
    } else if (promoCode === "WELCOME20") {
      setDiscount(totalPrice * 0.2);
    } else {
      setDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate("category", { category: "all" })} size="lg">
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
        <h1 className="text-4xl mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                <div 
                  className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate("product", { productId: item.id })}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 
                    className="mb-1 cursor-pointer hover:text-primary"
                    onClick={() => navigate("product", { productId: item.id })}
                  >
                    {item.name}
                  </h3>
                  {item.fabric && (
                    <p className="text-sm text-muted-foreground mb-2">{item.fabric}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <p className="text-primary">₹{item.price.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-muted rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-background rounded-l-md transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-background rounded-r-md transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl mb-6">Order Summary</h3>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromo} variant="outline">
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 mt-2">Promo code applied!</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span>Total</span>
                <span className="text-2xl text-primary">₹{finalTotal.toLocaleString()}</span>
              </div>

              <Button onClick={() => navigate("checkout")} className="w-full mb-3" size="lg">
                Proceed to Checkout
              </Button>
              <Button 
                onClick={() => navigate("category", { category: "all" })} 
                variant="outline" 
                className="w-full"
              >
                Continue Shopping
              </Button>

              {totalPrice < 2999 && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Add ₹{(2999 - totalPrice).toLocaleString()} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
