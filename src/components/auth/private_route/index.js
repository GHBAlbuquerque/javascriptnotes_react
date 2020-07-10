import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ component: Component, ...rest }) => ( //aqui estou criando uma HOF e passando como parâmetro o component que veio de uma rota, e o 'restante' em um spread
    <Route {...rest} render={props => ( //minha funcao vai devolver uma rota 'refeita'. Para isso, libero os rest aqui (exact path='/') e depois o componente que vou renderizar
        localStorage.getItem('user') //vou olhar no local storage se tenho um token de user, ou se tenho um user
            ? <Component {...props} /> //se sim, renderizo o component usando as props que recebi no meu component
            : <Redirect to={{ pathname: '/login' }} /> //se não, vou voltar para o login
    )} />
)

export default privateRoute;