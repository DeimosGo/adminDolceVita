import axios from "axios";

class DetallesVenta {
    constructor(){
        this.url = `https://restdolcevita.herokuapp.com//api/v1/detallesVenta`;
        this.token = sessionStorage.getItem("token");
    }
    async getDetails(id) {
        try {
            const respuesta = await axios.get(
                `${this.url}/details/${id}`, {
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
    async createDetalles(body) {
        try {
            const respuesta = await axios.post(this.url, body,{
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
export default DetallesVenta;
