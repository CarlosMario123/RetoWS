const WebSocket = require('ws'); // Importamos la librería

const wss = new WebSocket.Server({ port: 4000 }); // Creamos un servidor ws en el puerto 4000

const clientesId = new Map(); // Para mantener un identificador para los clientes

wss.on("connection", (cliente) => {
    const Id = generateUniqueId();
    // Procedemos a guardarlos en el map
    clientesId.set(Id, cliente);
    
    // Creamos un objeto con la información para enviar al cliente
    const nuevoCliente = { mensaje: "Hola cliente", id: Id };

    // Convertimos el objeto a JSON
    const nuevoClienteJSON = JSON.stringify(nuevoCliente);

    // Enviamos el mensaje al cliente
    cliente.send(nuevoClienteJSON);
});

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10);
}

function getclientes(){
    
}