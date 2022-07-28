import axios from "axios";

class Venta {
    constructor(){
        this.url = `https://restdolcevita.herokuapp.com/api/v1/ventas`;
        this.token = sessionStorage.getItem("token");
    }
    async getVentas(limit = 9, offset = 0) {
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
    async getVentasCount() {
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
    async getVentasRaw(limit = 10, offset = 0) {
        try {
            const respuesta = await axios.get(
                `${this.url}/raw/?limit=${limit}&offset=${offset}`, {
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

    async getEmpleadosChart(fechaIn, fechOut) {
        try {
            const respuesta = await axios.get(
                `${this.url}/employes/${fechaIn}/${fechOut}`, {
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

    async getVentasChart() {
        try {
            const respuesta = await axios.get(
                `${this.url}/semester`, {
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

    async getVentasFecha(fechaIn, fechOut) {
        const body = {dateIn: fechaIn, dateOut: fechOut};
        console.log(body);
        try {
            const respuesta = await axios.post(
                `${this.url}/date`, body, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                }
            );
            console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async postVentas(body) {
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
    async deleteVenta(idVenta) {
        try {
            const respuesta = await axios.delete(
                `${this.url}/${idVenta}`, {
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
export default Venta;
