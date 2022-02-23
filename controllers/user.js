const { request, response } = require('express');

const userGet = ( req = request, res = response) => {
    const { q, name, apikey, page = "1", limit = "10"} = req.query;
    res.json({
        msg: 'Get Api - Controller',
        q, 
        name, 
        apikey,
        page, 
        limit
    });
};

const userPost = ( req = request, res = response) => {
    const { name, age } = req.body;
    res.json({
        msg: 'Post Api - Controller',
        name,
        age
    });
};

const userPut = ( req = request, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put Api - Controller',
        id
    });
};

const userPatch = ( req = request, res = response) => {
    res.json({
        msg: 'Patch Api - Controller'
    });
};

const userDelete = ( req = request, res = response) => {
    res.json({
        msg: 'Delete Api - Controller'
    });
};


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}