export const CHECKOUT_PARAM_STORAGE_KEYS = {
  ref: "luna.checkout.ref",
  phone: "luna.checkout.phone",
} as const;

type CheckoutParamName = keyof typeof CHECKOUT_PARAM_STORAGE_KEYS;

function getRawUrlParam(name: CheckoutParamName): string {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search).get(name) ?? "";
  } catch {
    return "";
  }
}

function getStoredParam(name: CheckoutParamName): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(CHECKOUT_PARAM_STORAGE_KEYS[name]) ?? "";
  } catch {
    return "";
  }
}

function storeParam(name: CheckoutParamName, value: string) {
  if (typeof window === "undefined" || !value) return;
  try {
    window.localStorage.setItem(CHECKOUT_PARAM_STORAGE_KEYS[name], value);
  } catch {
    // Ignore storage failures; checkout can still use in-memory URL values.
  }
}

export function captureCheckoutParamsFromUrl() {
  const ref = getRawUrlParam("ref");
  const phone = getRawUrlParam("phone");

  storeParam("ref", ref);
  storeParam("phone", phone);

  return { ref, phone };
}

export function readCheckoutParam(name: CheckoutParamName): string {
  return getRawUrlParam(name) || getStoredParam(name);
}

export const INITIAL_CHECKOUT_PARAMS = captureCheckoutParamsFromUrl();