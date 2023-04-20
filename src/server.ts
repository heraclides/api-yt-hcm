//const express = require('express');
// require importa nossa dependencia JS no caso (express) criando uma contant com nome da dependencia
import express from 'express'
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';
import { config } from 'dotenv';

config();

const app = express();
// criamos uma constant com nome de app para executar nossa cosnstant que importou nossa dependencia
console.log(process.env.SECRET)
app.use(express.json());
//app.use utilizado para corrigir possiveis erros do json, caso ele venha apresentar algum 

//get cria nossa rota a'/' determina nosso localhost:4000 que foi a porta que determinando
//toda rota tem um requwest e o que o client faz e response e o que o servidor vai fazer
// app.get('/' , (request, response) => {
//     //response.send('Voce acessou o servidor');
//     response.json({name:'Heraclides', age: 43})
// });
    //npm run dev inicializa nossa aplicação de forma automatica para que toda vez que salvamos algo nao precisarmos reiniciar o sistema

  app.use('/user', userRoutes) 
  app.use('/video', videosRoutes)  




app.listen(4000);
// determina a porta local onde nossa aplicação ira trabalhar no caso a porta 4000