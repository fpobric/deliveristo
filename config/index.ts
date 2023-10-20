const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("incorrect environment configuration");
}

const config = {
  BACKEND_API_URL,
};

export default config;
