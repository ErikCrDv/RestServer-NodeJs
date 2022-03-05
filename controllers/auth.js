const bcryptjs = require('bcryptjs');
const { response } = require('express');
const generateJWT = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        
        // Verificar Email
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        // Usuario Activo
        if( !user.status ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - status'
            })
        }

        // Verificar password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar Jwt
        const token = await generateJWT( user.id );

         res.json({
            user,
            token
        });

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Error Interno, por favor comuniquese con el administrador'
        });
    }

}

module.exports = {
    login
}