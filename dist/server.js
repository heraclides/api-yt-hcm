"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
// require importa nossa dependencia JS no caso (express) criando uma contant com nome da dependencia
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const videos_routes_1 = require("./routes/videos.routes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// criamos uma constant com nome de app para executar nossa cosnstant que importou nossa dependencia
console.log(process.env.SECRET);
app.use(express_1.default.json());
//app.use utilizado para corrigir possiveis erros do json, caso ele venha apresentar algum 
//get cria nossa rota a'/' determina nosso localhost:4000 que foi a porta que determinando
//toda rota tem um requwest e o que o client faz e response e o que o servidor vai fazer
// app.get('/' , (request, response) => {
//     //response.send('Voce acessou o servidor');
//     response.json({name:'Heraclides', age: 43})
// });
//npm run dev inicializa nossa aplicação de forma automatica para que toda vez que salvamos algo nao precisarmos reiniciar o sistema
app.use('/user', user_routes_1.userRoutes);
app.use('/video', videos_routes_1.videosRoutes);
app.listen(4000);
// determina a porta local onde nossa aplicação ira trabalhar no caso a porta 4000
