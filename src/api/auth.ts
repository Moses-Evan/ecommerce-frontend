const TOKEN_STORAGE_KEY = "niorra_access_token";
const PROFILE_STORAGE_KEY = "niorra_auth_profile";
const POST_LOGIN_DESTINATION_KEY = "niorra_post_login_destination";
const API_ORIGIN_STORAGE_KEY = "niorra_api_origin";
const PENDING_PAYPAL_ORDER_ID_KEY = "niorra_pending_paypal_order_id";

const authParameterNames = ["token", "access_token", "accessToken", "jwt"];

export const setApiOrigin = (origin: string) => {
  const normalizedOrigin = origin.trim().replace(/\/$/, "");
  if (!normalizedOrigin) return "";

  localStorage.setItem(API_ORIGIN_STORAGE_KEY, normalizedOrigin);
  return normalizedOrigin;
};

export const getApiOrigin = () => {
  const urlOrigin =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("apiOrigin")
      : null;

  if (urlOrigin) {
    return urlOrigin.replace(/\/$/, "");
  }

  const storedOrigin =
    typeof window !== "undefined"
      ? localStorage.getItem(API_ORIGIN_STORAGE_KEY)
      : null;

  if (storedOrigin) {
    return storedOrigin.replace(/\/$/, "");
  }

  const runtimeOrigin = import.meta.env.VITE_API_ORIGIN;
  if (runtimeOrigin) {
    return runtimeOrigin.replace(/\/$/, "");
  }

  const defaultOrigin = "https://api.niorra.eu";
  if (typeof window !== "undefined") {
    localStorage.setItem(API_ORIGIN_STORAGE_KEY, defaultOrigin);
  }
  return defaultOrigin;
};

export const API_ORIGIN = getApiOrigin();

export const getAppRedirectUrl = () => {
  if (typeof window !== "undefined" && (window as any)?.Capacitor?.isNativePlatform?.()) {
    return "niorra://auth";
  }

  const currentOrigin =
    typeof window !== "undefined" ? window.location.origin : "https://niorra.eu";
  return `${currentOrigin}/#account`;
};

export const getGoogleAuthUrl = () => {
  const configuredOauthUrl =
    import.meta.env.VITE_GOOGLE_AUTH_URL ||
    `${API_ORIGIN}/oauth2/authorization/google`;

  const authUrl = new URL(configuredOauthUrl, window.location.origin || "https://niorra.eu");
  if ((window as any)?.Capacitor?.isNativePlatform?.()) {
    authUrl.searchParams.set("redirect_uri", getAppRedirectUrl());
  }

  return authUrl.toString();
};

export const getAccessToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export interface AuthenticatedProfile {
  name?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  picture?: string;
}

let currentUserRequest: Promise<AuthenticatedProfile> | null = null;
let currentUserLoaded = false;

export function getAuthenticatedProfile(): AuthenticatedProfile {
  let savedProfile: AuthenticatedProfile = {};
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfile) {
      savedProfile = JSON.parse(storedProfile) as AuthenticatedProfile;
    }
  } catch {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }

  const token = getAccessToken();
  if (!token) return {};

  try {
    const payload = token.split(".")[1];
    if (!payload) return savedProfile;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
    const bytes = Uint8Array.from(decoded, (character) =>
      character.charCodeAt(0),
    );
    const claims = JSON.parse(new TextDecoder().decode(bytes)) as Record<
      string,
      unknown
    >;
    const givenName =
      typeof claims.given_name === "string" ? claims.given_name : undefined;
    const familyName =
      typeof claims.family_name === "string" ? claims.family_name : undefined;
    const name =
      (typeof claims.name === "string" && claims.name) ||
      [givenName, familyName].filter(Boolean).join(" ") ||
      (typeof claims.preferred_username === "string"
        ? claims.preferred_username
        : undefined);

    return {
      ...savedProfile,
      name: name || savedProfile.name,
      givenName: givenName || savedProfile.givenName,
      familyName: familyName || savedProfile.familyName,
      email:
        (typeof claims.email === "string" && claims.email) ||
        savedProfile.email,
      picture:
        (typeof claims.picture === "string" && claims.picture) ||
        (typeof claims.avatar_url === "string" && claims.avatar_url) ||
        savedProfile.picture,
    };
  } catch {
    return savedProfile;
  }
}

export async function getAuthenticatedProfileWithFallback() {
  const profile = getAuthenticatedProfile();
  if (!getAccessToken() || currentUserLoaded) return profile;
  if (profile.email && profile.name && profile.givenName && profile.familyName) {
    return profile;
  }

  if (!currentUserRequest) {
    const token = getAccessToken();
    if (!token) return profile;

    currentUserRequest = fetch(`${API_ORIGIN}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to load your account (${response.status}).`);
        }
        const user = (await response.json()) as Record<string, unknown>;
        const serverProfile: AuthenticatedProfile = {
          name: typeof user.name === "string" ? user.name : undefined,
          givenName:
            typeof user.firstName === "string"
              ? user.firstName
              : typeof user.givenName === "string"
                ? user.givenName
                : undefined,
          familyName:
            typeof user.lastName === "string"
              ? user.lastName
              : typeof user.familyName === "string"
                ? user.familyName
                : undefined,
          email:
            typeof user.email === "string"
              ? user.email
              : typeof user.username === "string"
                ? user.username
                : undefined,
          picture: typeof user.picture === "string" ? user.picture : undefined,
        };
        const existingProfile = getAuthenticatedProfile();
        const mergedProfile: AuthenticatedProfile = {
          name: serverProfile.name || existingProfile.name,
          givenName: serverProfile.givenName || existingProfile.givenName,
          familyName: serverProfile.familyName || existingProfile.familyName,
          email: serverProfile.email || existingProfile.email,
          picture: serverProfile.picture || existingProfile.picture,
        };
        if (Object.values(mergedProfile).some(Boolean)) {
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(mergedProfile));
        }
        currentUserLoaded = true;
        return mergedProfile;
      })
      .finally(() => {
        currentUserRequest = null;
      });
  }

  return currentUserRequest;
}

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  currentUserLoaded = false;
  currentUserRequest = null;
};

export function setPostLoginDestination(destination: "checkout") {
  localStorage.setItem(POST_LOGIN_DESTINATION_KEY, destination);
}

export function setPendingPayPalOrderId(orderId: string | number) {
  const value = String(orderId);
  localStorage.setItem(PENDING_PAYPAL_ORDER_ID_KEY, value);
  sessionStorage.setItem("pendingPayPalOrderId", value);
}

export function getPendingPayPalOrderId() {
  return (
    localStorage.getItem(PENDING_PAYPAL_ORDER_ID_KEY) ||
    sessionStorage.getItem("pendingPayPalOrderId")
  );
}

export function clearPendingPayPalOrderId() {
  localStorage.removeItem(PENDING_PAYPAL_ORDER_ID_KEY);
  sessionStorage.removeItem("pendingPayPalOrderId");
}

export function initializeAuthFromRedirect(callbackUrl?: string) {
  const url = new URL(callbackUrl ?? window.location.href);
  const hash = url.hash.slice(1);
  const fragmentParams = new URLSearchParams(
    hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : hash,
  );
  const callbackParams = [url.searchParams, fragmentParams];
  const getCallbackParameter = (name: string) =>
    callbackParams.map((params) => params.get(name)).find(Boolean);
  const callbackToken = getCallbackParameter("token");
  const hasOAuthTokenName = ["access_token", "accessToken", "jwt"].some(
    (name) => Boolean(getCallbackParameter(name)),
  );
  const hasOAuthProfile = ["email", "firstName", "lastName", "picture"].some(
    (name) => Boolean(getCallbackParameter(name)),
  );
  const hasJwtToken = callbackToken?.split(".").length === 3;
  const hasPayPalCallback =
    callbackParams.some((params) => params.has("PayerID")) ||
    (Boolean(callbackToken) &&
      !hasJwtToken &&
      !hasOAuthTokenName &&
      !hasOAuthProfile);
  const isPayPalReturn =
    url.pathname.endsWith("/checkout/paypal/return") ||
    url.pathname.endsWith("/checkout/paypal/cancel") ||
    url.pathname.endsWith("/paypal-return") ||
    (Boolean(getPendingPayPalOrderId()) &&
      hasPayPalCallback);
  if (isPayPalReturn) return null;

  const token = authParameterNames
    .map((name) => url.searchParams.get(name) ?? fragmentParams.get(name))
    .find((value) => value);

  if (!token) return null;

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  const getParameter = (name: string) =>
    url.searchParams.get(name) ?? fragmentParams.get(name) ?? undefined;
  const firstName = getParameter("firstName") || undefined;
  const lastName = getParameter("lastName") || undefined;
  const profile: AuthenticatedProfile = {
    name: [firstName, lastName].filter(Boolean).join(" ") || undefined,
    givenName: firstName,
    familyName: lastName,
    email: getParameter("email") || undefined,
    picture: getParameter("picture") || undefined,
  };

  localStorage.removeItem(PROFILE_STORAGE_KEY);
  if (Object.values(profile).some(Boolean)) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }

  const savedDestination = localStorage.getItem(POST_LOGIN_DESTINATION_KEY);
  const destination = savedDestination === "checkout" ? "checkout" : "account";
  localStorage.removeItem(POST_LOGIN_DESTINATION_KEY);

  const isNativeAppCallback =
    (window as any)?.Capacitor?.isNativePlatform?.() ||
    url.protocol === "niorra:";
  const nextUrl = isNativeAppCallback
    ? `/#${destination}`
    : `${url.origin}/#${destination}`;

  try {
    window.history.replaceState({ page: destination, params: {} }, "", nextUrl);
  } catch {
    if (!isNativeAppCallback) {
      window.location.assign(nextUrl);
    }
  }

  return destination;
}
