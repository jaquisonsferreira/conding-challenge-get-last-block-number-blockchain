import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 100 });

export const setCache = (key: string, value: any) => {
  myCache.set(key, value);
};

export const getCache = (key: string) => {
  return myCache.get(key);
};
