import axios from "axios";

class Comprobante {
    constructor(){
        this.url = `https://restdolcevita.herokuapp.com//api/v1/comprobantes`;
        this.token = sessionStorage.getItem("token");
    }
    async getComprobanteId(id) {
        try {
            const respuesta = await axios.get(
                `${this.url}/${id}`, {
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
    async postComprobante(body) {
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
}
export default Comprobante;
