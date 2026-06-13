let IS_PROD = true;
const server = IS_PROD ?
    "https://sigmagpt-backend-mypi.onrender.com" :

    "http://localhost:8080"


export default server;