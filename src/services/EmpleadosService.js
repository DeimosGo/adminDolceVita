import axios from "axios";

class Empleado {
    constructor() {
        this.url = `http://192.168.1.109:3000/api/v1/empleados/`;
        this.token = sessionStorage.getItem("token");
    }
    async getEmpleado(limit = 9, offset = 0) {
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
    async postEmpleado(body) {
        try {
            const respuesta = await axios.post(this.url, body, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return respuesta;
        } catch (error) {
            return error;
        }
    }
    async patchEmpleado(id, body) {
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

    async getEmpleadoId(idProducto) {
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
    async deleteEmpleado(idEmpleado) {
        try {
            const respuesta = await axios.delete(
                `${this.url}${idEmpleado}`, {
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
    async getEmpleadosCount() {
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
    async getEmpleadoSearch(value) {
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
}
export default Empleado;
