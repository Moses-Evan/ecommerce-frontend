# Premium Saree E-commerce Website (Community)

This is a code bundle for Premium Saree E-commerce Website (Community). The original project is available at https://www.figma.com/design/f1mhNRz6zH4ee4cInwlFQv/Premium-Saree-E-commerce-Website--Community-.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## PayPal checkout

Create a PayPal sandbox app and add its client ID to a local `.env` file:

```text
VITE_PAYPAL_CLIENT_ID=your_sandbox_client_id
```

Use a production PayPal client ID when deploying. The checkout uses EUR and
captures the order only after PayPal approves it. For production deployments,
move order creation and capture to a server endpoint so the server can validate
the cart total before fulfilling the order.

## Google OAuth

The login page starts Google OAuth at
`https://ql4zl5fz-8080.inc1.devtunnels.ms/oauth2/authorization/google`. Set
`VITE_API_ORIGIN` to the backend origin when deploying elsewhere, or set
`VITE_GOOGLE_AUTH_URL` to override the authorization URL entirely. Product API
requests use `${VITE_API_ORIGIN}/api`.

After successful authentication, redirect the browser back to the frontend with
the JWT in a `token`, `access_token`, `accessToken`, or `jwt` query parameter.
The frontend stores it and sends it as a Bearer token on API requests. The
callback URL is replaced with `#account` so the token is removed from the
address bar and browser history.
