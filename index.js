const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http');
require('dotenv').config({ path: '.env' })
const connectDB = require('./config/db')
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
connectDB()
const socketClient = require('./socket')
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes
app.use('/api/products', require('./routes/products'))
app.use('/api/companies', require('./routes/companies'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/requests', require('./routes/requests'))

io.on('connection', socket => {
  console.log(socket.id)
  socket.on('notifications', function(data) {
    console.log(data)
  });
})

server.listen( PORT, () => {
  console.log(`server on port ${PORT}`);
});