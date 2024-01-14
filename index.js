
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 }); 
var indice = 0;
const preguntas = [
    {
      "pregunta": "¿Cuál de los siguientes dispositivos es comúnmente conocido como un teléfono inteligente?",
      "opciones": ["Refrigerador", "Televisor", "Smartphone"],
      "respuesta_correcta": "Smartphone"
    },
    {
      "pregunta": "¿Qué tipo de planta produce grandes flores amarillas y sigue la dirección del sol durante el día?",
      "opciones": ["Rosa", "Girasol", "Tulipán"],
      "respuesta_correcta": "Girasol"
    },
    {
      "pregunta": "¿Cómo se denomina una elevación natural y prominente de la Tierra con una cumbre puntiaguda?",
      "opciones": ["Océano", "Desierto", "Montaña"],
      "respuesta_correcta": "Montaña"
    }
  ]
  
  wss.on("connection", (cliente) => {
    console.log("cliente: conectado");

    cliente.send(JSON.stringify(preguntas[indice]));

    cliente.on('message', (message) => {
       
  

        if (preguntas[indice].respuesta_correcta === message.toString()) {
    
            indice++;

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    console.log("mando");
                    
                    if (indice < preguntas.length) {
                        client.send(JSON.stringify(preguntas[indice]));
                    } else {
                        client.send("Terminaste todas las preguntas");
                    }
                }
            });
        }else{
            wss.clients.forEach((client) => {
                if ( client.readyState === WebSocket.OPEN) {
                    
                    if (indice < preguntas.length) {
                        client.send(JSON.stringify(preguntas[indice]));
                    } else {
                        client.send("Terminaste todas las preguntas");
                    }
                }
            });
        }
    });
});
