
// Servidor de express
const express  = require ('express');
const http     = require ('http');
const socketio = require ('socket.io');
const path     = require ('path');
const Sockets  = require('./sockets');

class Server {


    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer( this.app );

        //Configuraciones de socket
        this.io  = socketio ( this.server, {/* */});

    }

    // Metodos

    // Desplegar el directorio publico
    middlewares() {
        this.app.use( express.static( path.resolve(__dirname, '../public') ) )
    }

    configurarSocket(){
        new Sockets( this.io );
    }

    execute() {

        // Inicializar middlewares

        this.middlewares();

        //Inicializar Sockets

        this.configurarSocket();

        //Inicializar el server

        this.server.listen(this.port, () => {
            console.log(`Servidor Escuchando el puerto:`, this.port);
        });
    }
}

module.exports = Server;