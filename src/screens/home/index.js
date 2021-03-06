import React, { Fragment } from 'react';
import { Column, Section, Title, Container } from 'rbx';
import heroImage from '../../assets/images/presentation.png'; //é mais comum importarmos a imagem na variavel do que colocoar o codigo varias vezes
import Header from '../../components/header';
import "../../styles/home.scss";
import { Link } from 'react-router-dom';


const Home = () => (
    <Fragment>
        <Header />

        <Section size="medium" className="home">
            <Container>
                <Column.Group>
                    <Column size={5}>
                        <Title size={2} spaced className="has-text-white">
                            Create notes easily and access when you want. Everything on the cloud.</Title>
                        <Title size={5} spaced className="has-text-light" subtitle>
                            Have your notes ready whenever you want, wherever you need them. Quick and simple notepad editing experience. Taking notes with Javascript Notes is easier than any other notepad or memo pad app.</Title>
                        <Link to="/register" className="button is-outlined is-white is-large">
                            <strong>Register for free Now</strong>
                        </Link>
                    </Column>
                    <Column size={6} offset={1}>
                        <img src={heroImage} alt='hero' />
                    </Column>
                </Column.Group>
            </Container>
        </Section>
    </Fragment>
)

export default Home;