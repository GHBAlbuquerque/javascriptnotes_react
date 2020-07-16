import Api from "./api";

const UserService = {
    register: (params) => Api.post('/users/register', params),
    //vou receber vários métodos dentro dos elementos do meu objetvo.
    //o primeiro serviço será REGISTER, que receberá parâmetros e vai chamar a api com um método
    login: async (params) => {
        const response = await Api.post('/users/login', params)
        localStorage.setItem('user', JSON.stringify(response.data.user)) //user vem da minha api e eu estou colocando dentro de response. Como meu user vem como um obejto json, preciso dar stringfy
        localStorage.setItem('token', response.data.token)
    },
    logout: () => { //NAO CHAMO A API, só deleto do localstorage
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null)
    },
    update: async (params) => {
        const response = await Api.put('/users', params, { //chamei minha api dando os params
            headers: { 'access-token': localStorage.getItem('token') } //pego o token no header
        })
        localStorage.setItem('user', JSON.stringify(response.data)); //preciso atualizar meu user no localstorage. por isso tenho uma funçao asincrona, preciso que ele encontre o usuario para poder criar a variavel
    },
    updatePassword: async (params) => {
        const response = await Api.put('/users/password', params, { //chamei minha api dando os params
            headers: { 'access-token': localStorage.getItem('token') } //pego o token no header
        })
    }, //nao preciso mudar isso no local storage.. PQ?
    delete: async () => {
        Api.delete("/users", { 
            headers: { 'access-token': localStorage.getItem('token') } //validacao pq tem withAuth
        })
        localStorage.removeItem('user', null); //deletando do local storage
        localStorage.removeItem('token', null);
    },
}


export default UserService;