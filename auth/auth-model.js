const db = require("../database/dbConfig")

module.exports = {
    add,
    findById,
    find,
    findBy
}

function add(body){
    return db("users").insert(body).then(([id]) => findById(id))
}

function findById(id){
    return db("users").where({ id }).first()
}

function find(){
    return db("users")
}

function findBy(filter){
    return db("users").where(filter)
}