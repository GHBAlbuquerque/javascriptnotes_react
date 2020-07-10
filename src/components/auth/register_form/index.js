import React, { Fragment, useState } from 'react'; //depois vou ter estados aqui dentro
import { Button, Label, Field, Control, Input, Column, Section, Help } from "rbx";
import { Redirect } from "react-router-dom";
import UserService from '../../../services/users'; //aqui estou importando meu serviço, e vou precisar de um método que lide com ele (no caso aqui, com o submit)

function RegisterForm() {
    const [name, setName] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [redirectToLogin, setRedirectToLogin] = useState(false); //quando for true, vai me redirecionar
    const [error, setError] = useState(false);
    const handleChange = (event) => setName(event.target.value) //essa é minha funcao para mostrar o que é escrito ao alterar um campo

    const HandleSubmit = async (event) => {
        event.preventDefault();

        try{
            const user = await UserService.register({name:name, email:email, password:password}) //sao os states que setei
            setRedirectToLogin(true);
        } catch(error){
            setError(true);
        }
    }
    
    if(redirectToLogin === true ) { //esse é meu método para redirecionar
        return <Redirect to={{pathname: "/login"}} />
    };


    return (
        <Fragment>
            <Column.Group centered>
                <form onSubmit={HandleSubmit}>
                    <Column size={12}>
                        <Field> 
                            <Label size="small">Name:</Label>
                            <Control>
                                <Input
                                    type="name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={e=> setEmail(e.target.value)}
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
                                    onChange={e=> setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a onClick={e=> setRedirectToLogin(true)} className="button is-white has-text-custom-purple">Login or</a>
                                    </Column>
                                    <Column>
                                        <Button color="custom-purple" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        { error && <Help color="danger">Email or Password invalid</Help> }
                    </Column>
                </form>
            </Column.Group>
        </Fragment>
    )
};

//quando clico em login e quando dou submit no form, ele da um redirectToLogin(true), porém de formas diferentes. Uma chamando pelo evento on click, a outra pelo submit do form

export default RegisterForm;