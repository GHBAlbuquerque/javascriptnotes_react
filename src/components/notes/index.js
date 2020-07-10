import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from 'rbx';
import "../../styles/notes.scss";
import { push as Menu } from 'react-burger-menu'; //importando meu menu baixado
import ListNotes from "../notes/list"; //importando meu menu baixado
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
                    <ListNotes
                        notes={notes}
                        selectNote={selectNote}
                        createNote={createNote}
                        current_note={current_note} />
                </Menu>


                <Column size={12} className="notes-editor" id="notes-editor">
                    Editor...
        </Column>
            </div>
        </Fragment>
    )
}

export default Notes;