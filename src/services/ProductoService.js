import axios from "axios";

class Producto {
    constructor() {
        this.url = `https://restdolcevita.herokuapp.com//api/v1/productos/`;
        this.token = sessionStorage.getItem("token");
    }
    async getProductos(limit = 10, offset = 0) {
        try {
            const respuesta = await axios.get(
                `${this.url}?limit=${limit}&offset=${offset}`, {
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
    async getProductosChart(limit = 6, offset = 0) {
        try {
            const respuesta = await axios.get(
                `${this.url}chart/?limit=${limit}&offset=${offset}`, {
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
    async getProductosVenta() {
        try {
            const respuesta = await axios.get(
                `${this.url}venta`, {
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
        try {
            const respuesta = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return respuesta;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async patchProductos(id, body) {
        try {
            const respuesta = await axios.patch(`${this.url}${id}`, body, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return respuesta;
        } catch (error) {
            console.error(error);
            return error;
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
            return error;
        }
    }

    async getProductosId(idProducto) {
        try {
            const respuesta = await axios.get(
                `${this.url}${idProducto}`, {
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
    async deleteProducto(idProducto) {
        try {
            const respuesta = await axios.delete(
                `${this.url}${idProducto}`, {
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
                `${this.url}name/${value}`, {
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
    async getProductosSearchVenta(value) {
        try {
            const respuesta = await axios.get(
                `${this.url}venta/${value}`, {
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
