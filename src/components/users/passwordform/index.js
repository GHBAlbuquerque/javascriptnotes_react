import React, { Fragment, useState, useEffect } from 'react';
import UsersService from '../../../services/users';
import { Button, Field, Control, Input, Column, Title, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";

function PasswordForm() {
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [status, setStatus] = useState(null); //para ver se deu tudo certo
    const [redirectToNotes, setRedirectToNotes] = useState(false); //quando for true, vai me redirecionar

    const HandleSubmit = async (event) => {
        event.preventDefault();
        
        if (password == password_confirmation) {
            try {
                const user = await UsersService.updatePassword({ password: password }) //sao os states que setei
                setStatus("success");
                setTimeout(() => setRedirectToNotes(true), 2000)
            } catch (error) {
                setStatus("error_update");
            }
        } else {
            setStatus("error_confirmation_password");
        }

    };

    if (redirectToNotes === true) {
        return <Redirect to={{ pathname: "/notes" }} />
    };


    return (
        <Fragment>
            <form onSubmit={HandleSubmit}>
                <Field>
                    <Control>
                        <Label className="has-text-grey">Password</Label>
                        <Input
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            name="password"
                        />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Label className="has-text-grey">Password Confirmation</Label>
                        <Input
                            type="text"
                            value={password_confirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            required
                            name="password_confirmation"
                        />
                    </Control>
                </Field>

                <Field>
                    <Control>
                        <Column.Group>
                            <Column className="has-text-right">
                                <Button color="custom-purple" outlined>Update Password</Button>
                            </Column>
                        </Column.Group>
                    </Control>
                </Field>
                {status == "error_update" &&
                    <Help color="danger">Problem in password update</Help>
                }
                {status == "error_confirmation_password" &&
                    <Help color="danger">Password don't match</Help>
                }
                {status == "success" &&
                    <Help color="primary">Updated with success</Help>
                }
            </form>
        </Fragment>
    )
}

export default PasswordForm;