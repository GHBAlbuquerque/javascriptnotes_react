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
    logout: () => {
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null)
    }
}

export default UserService;