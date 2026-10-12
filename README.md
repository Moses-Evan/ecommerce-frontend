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
they differ from the defaults. The current Google sign-in flow returns to the
web frontend; native-app sign-in also requires configuring the OAuth backend
to redirect to an app deep link and handling that link in Capacitor.

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
