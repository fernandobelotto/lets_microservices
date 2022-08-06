import axios from 'axios'
import { useState } from 'react';

export default function PostCreate() {


    const [title, setTitle] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        })

        setTitle('')
    }

    return (

        <>
            <form onSubmit={onSubmit}>
            
                <label>Título do post</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}

                ></input>

                <button>Criar</button>

            </form>
        </>
    )
}