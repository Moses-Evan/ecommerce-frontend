import API from "./client";

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  paymentMethod: "PAYPAL";
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface LocalOrder {
  id: string | number;
  totalAmount: number;
}

export interface OrderItemResponse {
  productId: number;
  productImage: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  subtotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderItemResponse[];
}

export interface PayPalApproval {
  paypalOrderId: string;
  approvalUrl: string;
}

export interface PayPalCapture {
  paymentStatus: string;
}

export async function createOrder(order: CreateOrderRequest) {
  const response = await API.post<LocalOrder>("/orders", order);
  return response.data;
}

export async function getOrderById(id: number | string) {
  const response = await API.get<OrderResponse>(`/orders/${id}`);
  return response.data;
}

export async function getOrdersByCustomerEmail(email: string) {
  const response = await API.get<OrderResponse[]>(
    `/orders/customer/${encodeURIComponent(email)}`,
  );
  return response.data;
}

export async function startPayPalApproval(orderId: string | number) {
  const response = await API.post<PayPalApproval>(`/orders/${orderId}/paypal`);
  return response.data;
}

export async function capturePayPalOrder(orderId: string | number) {
  const response = await API.post<PayPalCapture>(
    `/orders/${orderId}/paypal/capture`,
  );
  return response.data;
}

export async function cancelPayPalOrder(orderId: string | number) {
  const response = await API.post<void>(`/orders/${orderId}/paypal/cancel`);
  return response.data;
}
