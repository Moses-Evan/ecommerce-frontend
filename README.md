# Premium Saree E-commerce Website (Community)

This is a code bundle for Premium Saree E-commerce Website (Community). The original project is available at https://www.figma.com/design/f1mhNRz6zH4ee4cInwlFQv/Premium-Saree-E-commerce-Website--Community-.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Android app

Capacitor packages the Vite production build as an Android app. Install Android
Studio (including its Android SDK and JDK), then from the project root run:

```text
npx cap add android
npm run android:sync
npm run android:open
```

In Android Studio, build the APK using **Build > Build Bundle(s) / APK(s) >
Build APK(s)**. Alternatively, on Windows run
`.\gradlew.bat assembleDebug` from the `android` folder. The debug APK is
written to `android\app\build\outputs\apk\debug\app-debug.apk`.

Set the production API and PayPal values in `.env.local` before building if
they differ from the defaults. For Android devices, set `VITE_API_ORIGIN` to
your Lightsail backend URL or set `localStorage.setItem('niorra_api_origin',
'https://your-backend-url')` before the app loads. The Google sign-in flow now
uses a custom `niorra://auth` deep-link callback for native-app OAuth and falls
back to the web app when it is running in a browser.

## PayPal checkout

Create a PayPal sandbox app and add its client ID to a local `.env` file:

```text
VITE_PAYPAL_CLIENT_ID=your_sandbox_client_id
```

Use a production PayPal client ID when deploying. The checkout uses EUR and
captures the order only after PayPal approves it. For production deployments,
move order creation and capture to a server endpoint so the server can validate
the cart total before fulfilling the order.

On Android, PayPal approval opens in a Capacitor browser tab. The backend must
keep its HTTPS return routes pointed at the frontend:
`https://niorra.eu/checkout/paypal/return` and
`https://niorra.eu/checkout/paypal/cancel`. On Android these hosted callback
pages forward PayPal's callback parameters to the app using an Android
`intent://` link. The frontend hosting must serve the SPA for both routes, and
the backend adds a `nativeApp=true` marker only for native checkout callbacks.
The secure browser tab's address bar is expected and cannot be hidden.

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
