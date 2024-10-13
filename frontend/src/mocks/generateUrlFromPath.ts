const baseURL = import.meta.env.VITE_BASE_URL;

export default (path: string) => {
  return new URL(path, baseURL).toString();
};

