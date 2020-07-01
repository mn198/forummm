module.exports = {
    "db_url": "mongodb://mn198:mmn198@ds135796.mlab.com:15166/forum",
    "port": 8080,
    "appEndpoint": "http://localhost:8080",
    "apiEndpoint": "http://localhost:8080",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 7,
        "ADMIN": 31
    },
  }
  