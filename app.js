const express = require('express')
const Container = require('./desafio2/contenedor.js')

const app = express()
const file = new Container('./productos.json')
file.init()

const PORT = 8080

const server = app.listen(PORT , ()=>{
    try{
        console.log(`Servidor escuchando en puerto ${PORT}`)
    }
    catch(err){
        console.log(err)
    }
})
app.get('/productos',(req, res) =>{
    try{
        const productos = file.getAll()
        res.send(`Productos disponibles: ${JSON.stringify(productos)}`)
    }
    catch(err){
        res.send(`Error al buscar los productos: ${err}`)
    }
})
app.get('/productoRandom',(req, res) =>{
    const id = Math.floor(Math.random() * 3) + 1
    try{   
        const productoRandom = file.getByID(id)
        res.send(`El producto con id ${id}, es ${JSON.stringify(productoRandom)}`)
    }
    catch(err){
        res.send(`Ocurrio un error al intentar obtener el producto por id ${err}`)
    }
})
