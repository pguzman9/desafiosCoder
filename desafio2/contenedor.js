const fs = require('fs')

class Contenedor {
    constructor(filename) {
        console.log("Iniciando Contenedor")
        this.countID = 0
        this.file = filename
        this.lista = []

    }

    async save(objeto) {
        this.countID++;
        objeto["id"] = this.countID

        this.lista.push(objeto)

        await this.write()

        return this.countID;
    }

    async deleteById(id) {

        this.lista = this.lista.filter(element => element.id != id)

        await this.write()
    }

    async deleteAll() {
        this.lista = []
        await this.write()
    }

    async write() {
        let string = JSON.stringify(this.lista, null, '\t')
        await fs.promises.writeFile(this.file, string)
    }

    getAll() {
        return this.lista
    }

    getByID(idBuscado){
    return this.lista.find(item => item.id === idBuscado)
    }

    async init() {
        try {
            let data = await fs.promises.readFile(this.file)
            this.lista = JSON.parse(data)
            
            for(const element of this.lista) {
                if(element.id > this.countID) this.countID = element.id
            }

            console.log("Last ID: ", this.countID)
        } catch (error) {
            console.log("Aun no hay archivo")
        }
    }
}

module.exports = Contenedor;
