import Api from "./api";

const NotesService = {
    index: () => Api.get('/notes', {
        headers: { 'access-token': localStorage.getItem('token') } //isso é um parâmetro do axios que posso usar 'header'
    }),
    create: () => Api.post('/notes', { 'title': 'Nova nota', 'body': 'Nova nota...' }, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    delete: (id) => Api.delete(`/notes/${id}`, { //esse metodo precisa do id, usamos a sintaxe do js
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    update: (id, params) => Api.put(`/notes/${id}`, params, { //esse metodo precisa do id, usamos a sintaxe do js
        headers: { 'access-token': localStorage.getItem('token') }
    }), //alem do id, update recebe params que ja vem formatados
    search: (query) => Api.get(`/notes/search/?query=${query}`, { 
        headers: { 'access-token': localStorage.getItem('token') }
    }) //alem do id, update recebe params que ja vem formatados
}

export default NotesService;