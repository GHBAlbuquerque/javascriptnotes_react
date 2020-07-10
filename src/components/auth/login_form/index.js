import React, { Fragment, useState } from 'react'; //depois vou ter estados aqui dentro
import { Button, Label, Field, Control, Input, Column, Section, Help } from "rbx";
import { Redirect } from "react-router-dom";
import UserService from '../../../services/users'; //aqui estou importando meu serviço, e vou precisar de um método que lide com ele (no caso aqui, com o submit)


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToRegister, setRedirectToRegister] = useState(false); //quando for true, vai me redirecionar
    const [redirectToNotes, setRedirectToNotes] = useState(false); //quando for true, vai me redirecionar
    const [error, setError] = useState(false);


    const HandleSubmit = async (event) => {
        event.preventDefault();

        try{
            const user = await UserService.login({email:email, password:password}) //sao os states que setei
            setRedirectToNotes(true);
        } catch(error){
            setError(true);
        }
    }


    if (redirectToRegister == true) {
        return <Redirect to={{ pathname: "/register" }} />
    } else if (redirectToNotes == true) {
        return <Redirect to={{ pathname: "/notes" }} />
    }


    return (
        <Fragment>
            <Column.Group centered>
                <form onSubmit={HandleSubmit}>
                    <Column size={12}>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a onClick={e => setRedirectToRegister(true)} className="button is-white has-text-custom-purple">Register or</a>
                                    </Column>
                                    <Column>
                                        <Button color="custom-purple" outlined>Login</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                            {error && <Help color="danger">E-mail or Password invalid</Help>}
                        </Field>
                    </Column>
                </form>
            </Column.Group>
        </Fragment>
    )
};

export default LoginForm;