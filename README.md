# socket.io-messenger

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/face-image.gif?raw=true)

When we think in the comunication with other peoples, we remember the apps like Facebook Mensager, Telegram, Intagram Direct, and, the most famous chat message: Whats App. But, if i'm programmer, how can I create an simple chat using my knoledge for that. Answer: Socket io.
Socket.io change the link between client and server, with a fast road easy and an easy implementation in an aplication web with basic HTML and node.js. Therefore, for this guide, you need to know basis of node js, as express API. Look the follow and try this in your machine to abract in detail:

> 1) Preparing work enviroment
> 2) Buildding an aplication
> 3) Inserting socket.io…
> 4) Chat message
> 5) Finish


---

## 1) Preparing work enviroment

In case that you have already installed node and express, keep to step 2.

---
### 1.1) Checking node.js

I'll use express and node.js for the server. Verify if the node.js is intalled in your machine typing this in the terminal:
> node -v

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/promp-node-v.png?raw=true)

If node installed corectly, it's show an line with the vertion (don't worry with the version, but find the last that your PC support's), else, install node.js in https://nodejs.org/en/ .

---
### 1.2) A folder

In this step, you will create an folder, that we'll use to save our archives. In the terminal, navigate to open it. Dependding the OS(operatting sistem), the route change. To get easy, click in your favorite archive app, go to the folder, right click and select "open in terminal" or similar.

---
### 1.3) Creatting an project with NPM

NPM is an package manager that's installed with node.js. Try this in your terminal, and answer the questions (Project name, version, licence…):
> npm init
---
### 1.4) Installing express

Express is an very complete pack for create routes for web pages easily, with node.js. To use it, install with:
> npm install express
Wait a few instansts and it's installed.

---
## 2) Buildding an aplication

Next, we are going to code an server that help us to create our app.
In the folder we're using, create an file "index.js" and type this code:
```javascript
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const port = 3000
app.get("/", function(req, res){
    res.send("<h1>Hello, world!!</h1>")
})
http.listen(port, function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("Open the server in <localhost:" + port + ">")
    }
})
```
In terminal, type

> node index.js

Then, you could go to your navigator and text localhost:3000 :

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/hello-world.png?raw=true)

Now, lets replace the response to an page web. For this, create an folder in root folder with name "public" and add an css and html files.

The next step is change the "index.js" in "app.get(…" for this:
```javascript
app.use('/', express.static(__dirname + "/public"))
```
Now, restart the server in terminal pressing CTRL + C, and type node index.js.
If you reload the page in navigator, you'll see the page bellow:

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/chat.png?raw=true)

---
## 3) Inserting socket.io…

Right!!! We have created the base of our code in steps before. Lets insert socket.io and look it DOING MAGIC.
In prompt, type
> npm install socket.io

---
### 3.1) …in the server

It's easy to implement this. In the "index.js" file, require the socket.io module that we just installed.
var io = require('socket.io')
Then, right below the line [app.use(… ], insert this:
io.on('connection', function(socket){
console.log("A user has connected")
})
Leaving the server on hold, next to client side…

---
### 3.2) …in the client

In this part of app, the thinks's not hard. All you should do is insert two script tags right up the close of tag </body>, create an script tag below and add the socket:
```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io()
</script>
```
Restarting the server and reload the page, it's possible to look in terminal this:

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/promp-has-conected.png?raw=true)

# Prety good!!!!

---
## 4) Chat message

Socket.io work's with comunication using json, blob(type of data in binary format) and textplain. Then, its allow we to send data to server and the inverse with litle code.
In the server, we are going to add a new 3 lines.
Our frontend code will have tree parts: one that can render the messages, other that receive messages and an third that send messages.

---
### 4.1) Server

In server, we can use socket.on("some event", ()=>{}) to execute an code when the event was issued.
```javascript
io.on("connection", socket=>{
  socket.on('chat message', msg=>{
    console.log("message: " + msg)
    socket.emit("chat message", msg) //emit the message to all clients
  })
})
```
---
### 4.2) Client

#### 4.2.1) Preparing the apresentation

We'll use a function that receive the side of message("right" or "left") and the message. It can render the messages in the screen:
```javascript
$(function(){
  function showNewLine(rightOrLeft, msg){
    if(rightOrLeft == "right"){
      $('#messages').append('<div class="msg msgr"><div class="text right">'+ msg +'</div></div>')
      $('input').val('')
    }else if(rightOrLeft == "left"){
      $('#messages').append('<div class="msg msgl"><div class="text left">'+ msg +'</div></div>')
    }
  }
})
```
---
#### 4.2.2) Send Messages

To socket send messages/data for the server, we use the method emit. It have this sintax
> socket.emit("some event", data)
Add in bellow the function this code that can emit the text data to the server:
```javascript
$(function(){
  function showNewLine(){}
  $('form').submit(event=>{
    event.preventDefault() //prevent page reload
    socket.emit('chat message', $('input').val())
    showNewLine('right', $('input').val()) //script to create new lines
    $('input').val('')
  })
})
```
Reloadding server. If we type a message and send in the page, in terminal it will show the message sent.

![socket.io-messager](https://github.com/laube-developer/socket.io-messager/blob/main/Imgs/show-in-prompt.gif?raw=true)

---
#### 4.2.3) Receiving messages
Finish, we need to add the part that receive the messages emited from the server.
socket.on('chat message', msg=>{
showNewLine('left', msg)
})

---
## 5) Finish

In this guide we learn how to create an project with node.js, Express and Socket.io, integratting the cliente and the server with a simple mensager chat. You can add more function in your app, as login sistem, users, and other things. The documentation of this 3 techs, and the jQuery docs are below.
doc node.js     -> https://nodejs.org/en/
doc express     -> https://expressjs.com/pt-br/
doc socket.io   -> https://socket.io/docs/
doc jquery      -> https://jquery.com/download/

---

### Thank you for read this article!!! For more guides, see my page here
