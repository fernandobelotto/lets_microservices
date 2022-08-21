import axios from 'axios'
import { useState } from 'react';

export default function CommentCreate({ postId }) {


    const [content, setContent] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:5000/posts/${postId}/comments`, 
        {
            content
        })

        setContent('')
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Comentário</label>
        <input value={content} onChange={(e) => setContent(e.target.value)}></input>

        <button>Criar Comentário</button>
      </form>
    </>
  );
}
