const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const comments = {
    'asdf': [
        { content: 'asdf', id: '1234', postId: 'asdf'}
    ]
}

app.get('/posts/:id/comments', (req, res) => {
    
    const postId = req.params.id

    res.json(comments[postId])

})

app.post('/posts/:id/comments', (req, res) => {

    const postId = req.params.id

    const content = req.body.content
    const commentId = (Math.random()*10000).toFixed().toString()

    const commentsArray = comments[req.params.id] || []

    commentsArray.push({ id: commentId, content, postId })

    comments[postId] = commentsArray

    res.status(201).json({})
})

app.get('/comments', (req, res) => {

    res.json(comments)

})
app.get('/', (_req, res) => {
    res.json({ status: 'ok' })
})

app.listen(4001, () => {
    console.log('comments service running at http://localhost:4001')
})