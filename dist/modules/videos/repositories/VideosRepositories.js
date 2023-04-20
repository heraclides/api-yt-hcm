"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const mysql_1 = require("../../../mysql");
//pool responsavel pela comunicação por enviar e receber os dados do banco de dados
const uuid_1 = require("uuid");
//uuid uma biblioteca que cria um identificação unica no banco de dados para que nao tenha dois usuarios identicos
const bcrypt_1 = require("bcrypt");
//bcrypt e uma biblioteca onde tem a função de criptografar as senhas de usuarios
const jsonwebtoken_1 = require("jsonwebtoken");
class VideoRepository {
    create(request, response) {
        const { title, description, user_id } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (videos_id, user_id, title, description) VALUES(?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, result, fileds) => {
                connection.release();
                //encerra a conexaõ para que nao fique varias conecções abertas pois isso pode ocasionar o travamento do sistema
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({ message: 'video criado com sucesso' });
            });
        });
    }
    login(request, response) {
        const { email, password } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query(
            //verificamos primeiro se nosso usuario existe se ja possui um cadastro
            'SELECT * FROM users WHERE email = ?', [email], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro na sua autenticação" });
                }
                //result[0] e um array dizendo onde ira começar a pesquisa no caso na posição [0] 
                (0, bcrypt_1.compare)(password, results[0].password, (err, result) => {
                    if (err) {
                        return response.status(400).json({ error: "Erro na sua autenticação" });
                    }
                    if (result) {
                        //jsowebtoken e um conjuto de caracteres um token que volta um valor com um prazo de validade.
                        const token = (0, jsonwebtoken_1.sign)({
                            id: results[0].user_id,
                            email: results[0].email
                        }, process.env.SECRET, { expiresIn: "1d" });
                        console.log(token);
                        return response.status(200).json({ token: token });
                    }
                });
            });
        });
    }
    getVideos(request, response) {
        const { user_id } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query(
            //verificamos primeiro se nosso usuario existe se ja possui um cadastro
            'SELECT * FROM videos WHERE user_id = ?', [user_id], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar vídeos" });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso", videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query(
            //verificamos primeiro se nosso usuario existe se ja possui um cadastro
            'SELECT * FROM videos WHERE description LIKE ?', [`%${search}%`], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar vídeos" });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso", videos: results });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
