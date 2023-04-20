"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserRepository_1 = require("../modules/user/repository/UserRepository");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userRepository = new UserRepository_1.UserRepository();
userRoutes.post('/sign-up', (request, response) => {
    // users e um route params, que e uilisado na nossa rota https://localhost:4000/users
    //response.send('Voce acessou o servidor');
    //response.json([{name:'Heraclides', age: 44},{name:'Monique', age: 44} ])
    //criando parametros para inclusão de dados no BD
    userRepository.create(request, response);
});
userRoutes.post('/sign-in', (request, response) => {
    // users e um route params, que e uilisado na nossa rota https://localhost:4000/users
    //response.send('Voce acessou o servidor');
    //response.json([{name:'Heraclides', age: 44},{name:'Monique', age: 44} ])
    //criando parametros para inclusão de dados no BD
    userRepository.login(request, response);
});
