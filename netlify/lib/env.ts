export function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export function appUrl(): string {
  return (process.env.APP_URL || process.env.URL || "http://localhost:8888").replace(/\/$/, "");
}
