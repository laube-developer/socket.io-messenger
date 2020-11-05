console.log("> OPENNING...")
const express = require('express')
const app = express()
const http = require('http').createServer(app)

const socket = require('socket.io')
const port = 3000

var io = socket(http)

//Express.public
app.use("/", express.static(__dirname + "/public"))

//Socket.io
io.on('connection', socket=>{
	console.log("> A client has connected")
	//		Socket.on('some event', data)
	//  	Broadcast emit the msg for all
	// 	clients except the emiter.
	socket.on('chat message', msg=>{
		console.log(msg)
		socket.broadcast.emit('chat message', msg) //
	})

	socket.on('disconnect', socket=>{
		console.log("> A client has disconnected!")
	})
})

http.listen(port, (err)=>{
	console.log("> localhost:" + port)
})