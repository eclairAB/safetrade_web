module.exports = {
  // production
  API_URL: process.env.VUE_APP_API_URL || 'http://199.68.188.230:8000/api/',
  SOCKET_KEY: process.env.VUE_APP_SOCKET_KEY || '',
  SOCKET_URL: process.env.VUE_APP_SOCKET_URL || 'http://199.68.188.230:6001',
}
