import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from 'rbx';
import "../../styles/notes.scss";
import { push as Menu } from 'react-burger-menu'; //importando meu menu baixado
import ListNotes from './list'; //importando meu menu baixado
import NotesService from '../../services/notes';

function Notes(props) {
    const [notes, setNotes] = useState([]) //array com todas as minhas notas
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" })

    useEffect(() => { //uso o método que puxa
        fetchNotes();
    }, []); //não re-renderizo toda vez que muda ro state

    async function fetchNotes() { //esse é meu método que vai puxar as notas da API
        const response = await NotesService.index(); //meu serviço que pegou o path da API através do axios
        if (response.data.length >= 1) { //armazeno a resposta. Se minha qt de notas for igual ou maior que 1...
            setNotes(response.data.reverse()) //jogo no array set notes em ordem REVERSA (do mais novo para o mais velho)
            setCurrentNote(response.data[0]) //seleciono a primeira nota
        }
    }

    const selectNote = (id) => { //meu método para selecionar que cliquei
        const note = notes.find((note) => { //procuro no meu array notes, que veio do state, via id do elemento
            return note._id == id;
        })
        setCurrentNote(note); //jogo para dentro do current note a nota que achei com o id unico
    }

    return (
        <Fragment>
            <Column.Group className="notes" id="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={props.isOpen}
                    onStateChange={(state) => props.setIsOpen(state.isOpen)} //minha funcao veio como props. chamo o state change, passando como parametro 
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={10} offset={1}>
                            Search...
                    </Column>
                    </Column.Group>
                    <ListNotes
                        notes={notes}
                        selectNote={selectNote}
                        current_note={current_note} />
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    Editor...
                </Column>
            </Column.Group>
        </Fragment>
    )
}
export default Notes;