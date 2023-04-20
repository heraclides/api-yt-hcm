import { verify } from 'jsonwebtoken';
//verify verifica um determinado 
//middleware e algo que fica ao meio e qualquer coisa que precisa ser feito antes de dar continuidade a uma aplicação.
// no nosso caso vamos vrificar se o usuario esta logado ou naõ.
// module.exports exporta uma função especifica 

const login = (req: any, res: any, next:any) => {
    //try / catch tenta fazer uma coisa e senão fizer cai dentro de um erro no caso catch
    try {
        const decode = verify(req.headers.authorization, process.env.SECRET as string);
        req.user = decode;
        next();
    } catch(error){
        return res.status(401).json({message:'Não autorizado'});
    }
}

export { login };