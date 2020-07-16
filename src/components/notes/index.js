import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from 'rbx';
import "../../styles/notes.scss";
import { push as Menu } from 'react-burger-menu'; //importando meu menu baixado
import ListNotes from "../notes/list"; //importando meu menu baixado
import Editor from "../notes/editor";
import Search from "../notes/search";
import NotesService from '../../services/notes';

function Notes(props) {
    const [notes, setNotes] = useState([]); //array com todas as minhas notas
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });

    async function fetchNotes() {
        const response = await NotesService.index();
        if (response.data.length >= 1) {
            setNotes(response.data.reverse())
            setCurrentNote(response.data[0])
        } else {
            setNotes([]);
        }
    }

    const createNote = async (params) => {
        const note = await NotesService.create();
        fetchNotes();
    }

    const deleteNote = async (note) => {
        await NotesService.delete(note._id);
        fetchNotes();
    }

    const updateNote = async (oldNote, params) => { //esse é o método para atualizar a listagem de notas
        const updatedNote = await NotesService.update(oldNote._id, params); //vai devolver um json
        const index = notes.indexOf(oldNote);//dentro do meu array de notas, vou precisar descobrir a posição da minha nota para poder atualizar
        const newNotes = notes; //como nao posso atualizar direto as notas (pq preciso chamar o setNotes), vou guardar as notas aqui
        newNotes[index] = updatedNote.data; //para pegar o conteudo dele
        setNotes(newNotes); //atualizei minha listagem com a lista nova
        setCurrentNote(updatedNote.data);
    }

    const searchNote = async (query) => {
        const response = await NotesService.search(query);
        setNotes(response.data);// a resposta que vier vamos usar para setar as notas
    }

    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id === id;
        })
        setCurrentNote(note);
    }

    useEffect(() => { //uso o método que puxa
        fetchNotes();
    }, []); //não re-renderizo toda vez que muda ro state


    return (
        <Fragment>
            <div className="notes" id="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={props.isOpen}
                    onStateChange={(state) => props.setIsOpen(state.isOpen)}
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                    <Column size={10} offset={1}>
                    <Search searchNote={searchNote} fetchNotes={fetchNotes} /> 
                    </Column>
                    </Column.Group>
                    <ListNotes
                        notes={notes}
                        selectNote={selectNote}
                        createNote={createNote}
                        current_note={current_note}
                        deleteNote={deleteNote} />
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor note={current_note} updateNote={updateNote} />
                </Column>
            </div>
        </Fragment>
    )
}

export default Notes;