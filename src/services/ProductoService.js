import axios from "axios";

class Producto {
    constructor() {
        this.url = `http://192.168.1.109:3000/api/v1/productos/`;
        this.token = sessionStorage.getItem("token");
         this.authAxios = axios.create({
            baseURL: "http://192.168.1.109:3000/api/v1/productos/",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }
    async getProductos(limit = 10, offset = 0) {
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
            return error;
        }
    }
    async postProductos(body) {
        console.log(body);
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
    async getProductosCategoria(idCategoria) {
        try {
            const respuesta = await axios.get(
                `${this.url}/categoria/${idCategoria}`, {
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
    async getProductosCount() {
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
    async getProductosSearch(value) {
        try {
            const respuesta = await axios.get(
                `http://localhost:3000/api/v1/productos/name/${value}`, {
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
export default Producto;
