import React, { Fragment, useState, useEffect } from 'react';

import ReactQuill from 'react-quill'; // ES6 importando o quill
import 'react-quill/dist/quill.snow.css'; // ES6

function Editor(props) {
    const [currentContent, setCurrentContent] = useState('')
    const [timer, setTimer] = useState(null);

    const updateNote = (content) => { //o content será passado para nós lá embaixo
        const paragraph = content.indexOf("</p>") //migué
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, paragraph-3) //split(/\r\n|\r|\n/g); -3 pq estou tirando <p> do início?
        props.updateNote(props.note, {'title':title, 'body': content}) //aqui chamei a funcao que veio da props. como oldnote passei a nota que recebi lá do select, e como parametros o title e o body (que é content no quill)
    }

    const handleChange = (content, delta, source)=> { //sao parametros do quill. NO CASO O SOURCE É DA ONDE VEIO A MUDANÇA
        clearTimeout(timer); //toda vez que o usuario digitar, ele vai zerar o timer [lá em cima colocamos o valor null]
        if(source == 'user') { //se a alteracao vier do user
            setCurrentContent(content); //vou mudar o conteudo da nota para o content que esta no quill, mas NÃO A API
            setTimer(setTimeout(()=>updateNote(content),5000)) //num intervalo de 5s ele chamará pra salvar, ai sim atualizará a API
        }
    };
    

    useEffect(() => { //quando renderizar a pagina, vou colocar o body do meu note no texto aqui
        setCurrentContent(props.note.body)
    }, [props.note]) //só vai salvar se a nota for alterada?

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <Fragment>
            <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
        </Fragment>
    )
}

export default Editor;