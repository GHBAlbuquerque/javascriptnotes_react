import React, { Fragment, useState } from 'react';
import HeaderLogged from '../../components/header/header_logged';
import Notes from '../../components/notes';

const NotesScreen = () => {
    const [isOpen, setIsOpen] = useState(false); //aqui estou criando um estado pai que vai fornecer as informacoes para usar de método tanto no header quando na note

    // no header terei um botao que vai chamar esse menu lateral
    // no meu notes terei o menu lateral em si

    return (    
    <Fragment>
        <HeaderLogged setIsOpen={setIsOpen}/> 
        <Notes isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Fragment>
    )

}

export default NotesScreen;