import { pool } from '../../../mysql';
//pool responsavel pela comunicação por enviar e receber os dados do banco de dados
import { v4 as uuidv4 } from 'uuid';
//uuid uma biblioteca que cria um identificação unica no banco de dados para que nao tenha dois usuarios identicos
import { compare, hash } from 'bcrypt';
//bcrypt e uma biblioteca onde tem a função de criptografar as senhas de usuarios
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express'

class VideoRepository {
    create(request: Request, response: Response){
        const { title, description, user_id } = request.body;
    pool.getConnection((err:any, connection: any) => {
            connection.query(
                'INSERT INTO videos (videos_id, user_id, title, description) VALUES(?,?,?,?)',
                [uuidv4(), user_id, title, description],
                    (error: any, result:any, fileds:any) =>{
                    connection.release();
                    //encerra a conexaõ para que nao fique varias conecções abertas pois isso pode ocasionar o travamento do sistema
                    if(error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({message: 'video criado com sucesso'});
                }
            )
        })
    
    }

    login( request: Request, response: Response ) {
        const {email, password } = request.body;
        pool.getConnection((err:any, connection: any) => {

            connection.query(
                //verificamos primeiro se nosso usuario existe se ja possui um cadastro
                'SELECT * FROM users WHERE email = ?',
                [email],(error: any, results:any, fileds:any) =>{
                    connection.release();
                    if(error) {
                        return response.status(400).json({error: "Erro na sua autenticação"})
                    }
                    //result[0] e um array dizendo onde ira começar a pesquisa no caso na posição [0] 
                    compare(password, results[0].password, (err, result) => {
                        if(err) {
                            return response.status(400).json({error: "Erro na sua autenticação"})
                        }
                        
                        if(result) {
                            //jsowebtoken e um conjuto de caracteres um token que volta um valor com um prazo de validade.
                            const token = sign ({
                                id: results[0].user_id,
                                email: results[0].email
                            }, process.env.SECRET as string ,{expiresIn: "1d"})

                            console.log(token)

                            return response.status(200).json({token: token})

                        }
                    })
                }
            )
            
        })
    }

    getVideos( request: Request, response: Response ) {
        const { user_id } = request.body;
        pool.getConnection((err:any, connection: any) => {

            connection.query(
                //verificamos primeiro se nosso usuario existe se ja possui um cadastro
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, results:any, fileds:any) =>{
                    connection.release();
                    if(error) {
                        return response.status(400).json({error: "Erro ao buscar vídeos"})
                    }

                    return response.status(200).json({message: "Vídeos retornados com sucesso", videos:results})      
                    
                }
            )
            
        })  
    }

    searchVideos( request: Request, response: Response ) {
        const { search } = request.query;
        pool.getConnection((err:any, connection: any) => {

            connection.query(
                //verificamos primeiro se nosso usuario existe se ja possui um cadastro
                'SELECT * FROM videos WHERE description LIKE ?',
                [`%${search}%`],
                (error: any, results:any, fileds:any) =>{
                    connection.release();
                    if(error) {
                        return response.status(400).json({error: "Erro ao buscar vídeos"})
                    }
                    
                    return response.status(200).json({message: "Vídeos retornados com sucesso", videos:results})      
                    
                }
            )
            
        })  
    }
}


export { VideoRepository };