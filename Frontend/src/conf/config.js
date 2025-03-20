const config = {
    baseUrl:String(import.meta.env.VITE_BASE_FRONTEND_URL),
    vapidPublicKey:String(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    apiURL:String(import.meta.env.VITE_API_BACKEND_URL)
};
export default config;
