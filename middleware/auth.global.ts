export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Check if the route starts with /app
  const isProtectedRoute = to.path.startsWith("/app");

  // Wait for the Capacitor storage check to finish
  if (!auth.initialized) {
    await auth.init();
  }

  // If it's a protected route and user isn't logged in, boot them to login
  if (isProtectedRoute && !auth.user) {
    return navigateTo("/");
  }

  // If user is logged in and tries to go to /login, send them to the app
  if (to.path === "/login" && auth.user) {
    return navigateTo("/app"); // or wherever your app starts
  }
});
