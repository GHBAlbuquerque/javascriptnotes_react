import React, { Fragment } from 'react';
import { Column, Section, Title, Container, Card, Button } from "rbx";
import HeaderLogged from '../../../components/header/header_logged';
import "../../../styles/user.scss";
import UserForm from '../../../components/users/userform';
import PasswordForm from '../../../components/users/passwordform';
import UserDelete from '../../../components/users/userDelete';

const UserEditScreen = () => (

        <Fragment>
            <HeaderLogged />
            <Section size="medium" className="users">
                <Container>
                    <Column.Group centered className="users-edit">
                        <Column size={4}>
                            <Title size={5} className="has-text-grey has-text-left">
                                Informações Pessoais
            </Title>
                            <Card>
                                <Card.Content>
                                    <UserForm />
                                </Card.Content>
                            </Card>
                        </Column>
                    </Column.Group>

                    <Column.Group centered className="users-edit">
                        <Column size={4}>
                            <Title size={5} className="has-text-grey has-text-left">
                                Password
            </Title>
                            <Card>
                                <Card.Content>
                                    <PasswordForm />
                                </Card.Content>
                            </Card>
                        </Column>
                    </Column.Group>
                    <Column.Group centered>
                        <Column size={4} className="has-text-right">
                            <UserDelete/>
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </Fragment>
    );

export default UserEditScreen;