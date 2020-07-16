import React, { Fragment, useState } from 'react';
import { Button } from "rbx";
import UsersService from '../../../services/users';
import { Redirect } from "react-router-dom";

function UserDelete() {
    const [redirectToHome, setRedirectToHome] = useState(false)

    const deleteUser = async () => {
        const confirmationDelete = window.confirm("Are you sure you want to delete your account?");
        //poderia ter feito no if direto - if(window.confirm(blabala))
        if (confirmationDelete == true) {
            await UsersService.delete();
            setTimeout(() => setRedirectToHome(true), 1500)
        }
    };

    if(redirectToHome == true) {
    return <Redirect to={{ pathname: "/" }} />;
    };

    return (
        <Fragment>
            <Button className="is-gray"
                onClick={() => deleteUser()}
                outlined>Delete User</Button>
        </Fragment>
    )
};

export default UserDelete;
