const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async ( role = '' ) => {
    const roleExists = await Role.findOne( { role } )
    if( !roleExists ) throw new Error(`El role ${ role } no esta registrado en la base de BD`);
}

const emailExists = async ( email = '' ) => {
    const emailExistsDb = await User.findOne( { email } );
    if( emailExistsDb ) throw new Error(`El correo ya ha sido registrado`);
}

const userExistsById = async ( id ) => {
    const userExistsDb = await User.findById( id );
    if( !userExistsDb ) throw new Error(`No existe un usuario con el ID ${ id }`);
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}