"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
//verify verifica um determinado 
//middleware e algo que fica ao meio e qualquer coisa que precisa ser feito antes de dar continuidade a uma aplicação.
// no nosso caso vamos vrificar se o usuario esta logado ou naõ.
// module.exports exporta uma função especifica 
const login = (req, res, next) => {
    //try / catch tenta fazer uma coisa e senão fizer cai dentro de um erro no caso catch
    try {
        const decode = (0, jsonwebtoken_1.verify)(req.headers.authorization, process.env.SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Não autorizado' });
    }
};
exports.login = login;
