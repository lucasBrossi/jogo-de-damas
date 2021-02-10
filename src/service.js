const { readFile, writeFile } = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
 
class Database {

    constructor(ARCHIVE_NAME) {
        this.ARCHIVE_NAME = ARCHIVE_NAME
    }

    async getData() {
        const archive = await readFileAsync(this.ARCHIVE_NAME, 'utf8')
        return JSON.parse(archive.toString())
    }

    async postData(data) {
        await writeFileAsync(this.ARCHIVE_NAME, JSON.stringify(data))
        return true
    }

    async read(id) {
        const data = await this.getData()
        const dataFilter = data.filter(item => id ? item.id===id : true)
        return dataFilter
    } 

    async create(data) {
        const dataArchive = await this.getData()

        const newDate = {
            ...data
        }

        const finalDate = [
            ...dataArchive,
            newDate
        ]

        const response = await this.postData(finalDate)
        return response
    }

    async delete(id) {
        if(!id) {
            return await this.postData([])
        }

        const data = await this.getData()
        const index = data.findIndex(item => item.id===id)
        if(index===-1) {
            throw Error('Id n~ao cadastrado')
        }

        data.splice(index, 1)
        return this.postData(data)
    }

    async update(id, sets) {
        const data = await this.getData()
        const index = data.findIndex(item => item.id===id)

        if(index===-1) {
            throw Error('Id n~ao cadastrado')
        }

        const old = data[index]
        const objectUpdate = { 
            ...old,
            ...sets
        }

        data.splice(index, 1)

        return await this.postData([
            ...data,
            objectUpdate
        ])
    }
}

module.exports = Database