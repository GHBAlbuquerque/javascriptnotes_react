import Api from "./api";

const NotesService = {
    index: () => Api.get('/notes', {
        headers: { 'access-token': localStorage.getItem('token') } //isso é um parâmetro do axios que posso usar 'header'
    }),
    create: () => Api.post('/notes', { 'title': 'Nova nota', 'body': 'Nova nota...' }, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),

}

export default NotesService;