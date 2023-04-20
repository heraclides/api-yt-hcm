import { Router } from "express";

import { UserRepository } from "../modules/user/repository/UserRepository";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/sign-up' , (request, response) => {
// users e um route params, que e uilisado na nossa rota https://localhost:4000/users
    //response.send('Voce acessou o servidor');
    //response.json([{name:'Heraclides', age: 44},{name:'Monique', age: 44} ])
    //criando parametros para inclusão de dados no BD
    userRepository.create(request, response)
})

userRoutes.post('/sign-in' , (request, response) => {
// users e um route params, que e uilisado na nossa rota https://localhost:4000/users
    //response.send('Voce acessou o servidor');
    //response.json([{name:'Heraclides', age: 44},{name:'Monique', age: 44} ])
    //criando parametros para inclusão de dados no BD
    userRepository.login(request, response)
})

export { userRoutes };

