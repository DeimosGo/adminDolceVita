import axios from "axios";

class Categoria {
    constructor() {
        this.url = `http://192.168.1.109:3000/api/v1/categorias/`;
        this.token = sessionStorage.getItem("token");
    }
    async getCategorias() {
        try {
            const respuesta = await axios.get(
                this.url, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                }
            );
            return respuesta;
        } catch (error) {
            return
        }
    }
}

export default Categoria;
