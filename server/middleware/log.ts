// NOTE LOG ALL REQUESTS
export default defineEventHandler((event) => {
  console.log('New request: ' + getRequestURL(event));
});
