export const getEnv = (env: string): string => {
  const value = process.env[env];
  if (!value) {
    throw new Error(`Missing environment variable: ${env}`);
  }
  return value;
};
