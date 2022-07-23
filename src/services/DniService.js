import axios from "axios";

class Dni {
    constructor() {
        this.url = `https://apiperu.dev/api/dni`;
        this.token = `34f2d93176259228c6e483bf1eb5d5e3e52b43d827a694ca61726b2db5d5abdf`;
    }
    async getNombre(dni) {
        try {
            const respuesta = await axios.get(`${this.url}/${dni}?api_token=${this.token}`);
            return respuesta;
        } catch (error) {
            return error;
        }
    }
}
export default Dni;
