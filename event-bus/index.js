const express = require('express');
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/events', (req, res) => {


    const event = req.body

    const ports = [4000, 4001, 4002]    

    for(let port of ports) {
        axios.post(`http://localhost:${port}/events` , event)
        .then(() => {
            console.log(`evento ${event.type} recebido`)
            console.log('enviando evento para ms 4000')
        })
        .catch(() => console.log(`falha ao enviar para o ms ${port}`))
    }

    res.json({})
})

app.listen(4005, () => {
    console.log('listening on http://localhost:4005')
})