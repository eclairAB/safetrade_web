module.exports = {
  // production
  API_URL: process.env.VUE_APP_API_URL || 'http://202.137.120.41:81/api/',
  SOCKET_KEY: process.env.VUE_APP_SOCKET_KEY || '',
  SOCKET_URL: process.env.VUE_APP_SOCKET_URL || 'http://202.137.120.41:6001',
}