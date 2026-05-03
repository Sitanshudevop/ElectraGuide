/**
 * Type declarations for Google Identity Services (GIS).
 * Adds the `google.accounts` namespace used by One Tap Sign-In.
 */

interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: { credential: string }) => void;
  auto_select: boolean;
  cancel_on_tap_outside: boolean;
}

interface GoogleAccountsId {
  initialize: (config: GoogleOneTapConfig) => void;
  prompt: () => void;
  renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
}

interface GoogleGIS {
  accounts: GoogleAccounts;
}

interface Window {
  google?: GoogleGIS & typeof google;
}
