const express = require("express"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
io.origins(['http://localhost:3000']);

// io.configure(function(){
//     io.enable('browser client minification');
//     io.enable('browser client etag');
//     io.enable('browser client gzip');
//     io.set('transports', [
//         'websocket'
//         , 'flashsocket'
//         , 'htmlfile'
//         , 'xhr-polling'
//         , 'jsonp-polling'
//     ]);
// });

// app.use( (req, res, next) => {
//     //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("origin-when-cross-origin", "http://localhost:3000");
//     next();
//  });

io.on("connection", socket => {
  console.log("Nova Conexão", socket.id);

  socket.on("hello", message => {
    console.log(message);
  });

  setTimeout(() => {
    socket.emit("world", {
      message: "OmniStack"
    });
  }, 5000);
});

mongoose.connect(
  "mongodb+srv://fabio:123mudar@cluster0-bto15.mongodb.net/rocketseat?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//app.use(cors());
//app.use(cors({credentials: true, origin: ['http://localhost:3000', 'http://192.168.56.1:3000']}));
app.use(cors({origin: ['http://localhost:3000', 'http://192.168.56.1:3000']}));

// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': 'http://localhost:3000',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));

app.use(express.json());
app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333);
