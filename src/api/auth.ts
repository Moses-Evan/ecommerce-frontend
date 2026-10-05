const TOKEN_STORAGE_KEY = "niorra_access_token";

const authParameterNames = ["token", "access_token", "accessToken", "jwt"];

export const API_ORIGIN = (
  import.meta.env.VITE_API_ORIGIN ?? "https://ql4zl5fz-8080.inc1.devtunnels.ms"
).replace(/\/$/, "");

export const getGoogleAuthUrl = () =>
  import.meta.env.VITE_GOOGLE_AUTH_URL ??
  `${API_ORIGIN}/oauth2/authorization/google`;

export const getAccessToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export interface AuthenticatedProfile {
  name?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  picture?: string;
}

export function getAuthenticatedProfile(): AuthenticatedProfile {
  const token = getAccessToken();
  if (!token) return {};

  try {
    const payload = token.split(".")[1];
    if (!payload) return {};

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
      name,
      givenName,
      familyName,
      email: typeof claims.email === "string" ? claims.email : undefined,
      picture:
        (typeof claims.picture === "string" && claims.picture) ||
        (typeof claims.avatar_url === "string" ? claims.avatar_url : undefined),
    };
  } catch {
    return {};
  }
}

export const clearAccessToken = () =>
  localStorage.removeItem(TOKEN_STORAGE_KEY);

export function initializeAuthFromRedirect() {
  const url = new URL(window.location.href);
  const fragmentParams = new URLSearchParams(url.hash.slice(1));
  const token = authParameterNames
    .map((name) => url.searchParams.get(name) ?? fragmentParams.get(name))
    .find((value) => value);

  if (!token) return;

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  authParameterNames.forEach((name) => {
    url.searchParams.delete(name);
    fragmentParams.delete(name);
  });

  const nextUrl = `${url.pathname}${url.search}#account`;
  window.history.replaceState({ page: "account", params: {} }, "", nextUrl);
}
