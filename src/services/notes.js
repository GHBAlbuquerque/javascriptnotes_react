import Api from "./api";

const NotesService = {
    index: () => Api.get('/notes', {
        headers: {'access-token': localStorage.getItem('token') } //isso é um parâmetro do axios que posso usar 'header'
    }),

}

export default NotesService;