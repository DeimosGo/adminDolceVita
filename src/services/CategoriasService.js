import axios from "axios";

class Categoria {
    constructor() {
        this.url = `http://192.168.1.109:3000/api/v1/categorias`;
        this.token = sessionStorage.getItem("token");
    }
    async getCategorias(limit = 10, offset = 0) {
        try {
            const respuesta = await axios.get(
                `${this.url}/?limit=${limit}&offset=${offset}`, {
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
    async postCategorias(body) {
        try {
            const respuesta = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return respuesta;
        } catch (error) {
            console.error(error);
        }
    }
    async patchCategorias(body, id) {
        try {
            const respuesta = await axios.patch(`${this.url}/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return respuesta;
        } catch (error) {
            console.error(error);
        }
    }
    async getCategoriasCount() {
        try {
            const respuesta = await axios.get(
                `${this.url}/count`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                }
            );
            return respuesta;
        } catch (error) {
            return error;
        }
}
async getCategoriaId(id) {
    try {
        const respuesta = await axios.get(
            `${this.url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
        return respuesta;
    } catch (error) {
        return error;
    }
}
async deleteCategoria(id) {
    try {
        const respuesta = await axios.delete(
            `${this.url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );
        return respuesta;
    } catch (error) {
        return error;
    }
}
async getCategoriasName(name) {
    try {
        const respuesta = await axios.get(
            `${this.url}/name/${name}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            }
        );
        return respuesta;
    } catch (error) {
        return error;
    }
}
}

export default Categoria;
