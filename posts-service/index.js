const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const posts = {
    'asdf': {
        id: 'asdf',
        title: 'Meu Primeiro Post',
        comments: []
    }
}

app.get('/posts', (_req, res) => {
    res.json(posts)

})

app.post('/posts', (req, res) => {

    const postId = (Math.random()*10000).toFixed().toString()
    req.body.id = postId
    req.body.comments = []

    posts[postId] = req.body

    res.json(req.body)
})

app.get('/', (_req, res) => {
    res.json({status: 'tudo ok!'})
})

app.listen(4000, () => {
    console.log('server running at http://localhost:4000')
})