export const isServer = () => typeof window === "undefined";

export const genericError = (message: string) => {
  return {
    title: "Error",
    variant: "destructive",
    description: message || "An error occurred",
  };
};

export const saveToLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const getTimeLeft = (expiresAt?: string) => {
  if (!expiresAt) return 0;

  const now = new Date().getTime();
  const expires = new Date(expiresAt).getTime();
  return Math.abs(expires - now);
};
