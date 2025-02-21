const config = {
    baseUrl:String(import.meta.env.VITE_BASE_URL),
    vapidPublicKey:String(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    apiURL:String(import.meta.env.VITE_API_URL)
};
export default config;
