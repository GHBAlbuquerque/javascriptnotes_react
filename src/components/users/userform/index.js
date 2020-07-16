import React, { Fragment, useState, useEffect } from 'react';
import UsersService from '../../../services/users'; //vou chamar o update
import { Button, Field, Control, Input, Column, Title, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null); //para ver se deu tudo certo
    const [redirectToNotes, setRedirectToNotes] = useState(false); //quando for true, vai me redirecionar


    useEffect (() => { //SEMPRE TEM QUE ESTAR EM CIMA
        startUser()
    }, []);

    const startUser = async () => { //isso é uma funçào para puxar meus dados atuais do user
        const user = await JSON.parse(localStorage.getItem('user')); //parse transforma um JSON em um objeto
        setName(user['name']);
        setEmail(user['email']); //assim tenho algo ja no meu user caso ele na preencha nada, que é o atual
    };

    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await UsersService.update({ name: name, email: email }) //sao os states que setei
            setStatus("success");
            setTimeout(()=> setRedirectToNotes(true),3000)
        } catch (error) {
            setStatus("error");
        }
    }

    if(redirectToNotes === true ) {
        return <Redirect to={{pathname: "/notes"}}/>
    };


    return (
        <Fragment>
            <form onSubmit={HandleSubmit}>
                <Field>
                    <Control>
                        <Label className="has-text-grey">Full Name</Label>
                        <Input
                            type="name"
                            value={name || ""}
                            onChange={e => setName(e.target.value)}
                            required
                            name="name"
                        />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Label className="has-text-grey">Email</Label>
                        <Input
                            type="email"
                            value={email || ""}
                            onChange={e => setEmail(e.target.value)}
                            required
                            name="email"
                        />
                    </Control>
                </Field>

                <Field>
                    <Control>
                        <Column.Group>
                            <Column className="has-text-right">
                                <Button color="custom-purple" outlined>Update</Button>
                            </Column>
                        </Column.Group>
                    </Control>
                </Field>
                {status == "error" &&
                    <Help color="danger">Problem in update</Help>
                }
                {status == "success" &&
                    <Help color="primary">Updated with success</Help>
                }
            </form>
        </Fragment>
    )

}

export default UserForm;