import React, { Fragment} from 'react';
import { Column, Button, Tag, Title, List } from 'rbx';
import Moment from 'moment';

function ListNotes(props) {

    return (
        <Fragment>
            <Column.Group breakpoint="mobile">
                <Column size={6} offset={1}>
                    <Title size={6}>
                        {props.notes.length} Notes
            </Title>
                </Column>
            </Column.Group>
            <List className="notes-list">
                {props.notes.map((item, key) => //esse é meu looping que vai criar cada item
                    //esse método on click está no meu component fora, e é chamado quando clico em uma nota, pois é lá que recebo a api
                    <List.Item key={key} onClick={() => props.selectNote(item._id)} active={item == props.current_note} className="notes-element"> 
                        <Title size={6}> 
                            {item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
                        </Title>
                        <Title size={7} subtitle spaced={false}>
                            {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
                        </Title>
                        <Column.Group breakpoint="mobile">
                            <Column size={10}>
                                <Tag color="dark text-is-small">
                                    {Moment(item.updated_at).format('DD/MM')}
                                </Tag>
                            </Column>
                        </Column.Group>
                        <hr/>
                    </List.Item>
                )}
            </List>
        </Fragment>
    )
}

export default ListNotes;