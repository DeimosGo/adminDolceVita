import axios from "axios";

class Rol {
    constructor() {
        this.url = `https://restdolcevita.herokuapp.com/api/v1/roles/`;
        this.token = sessionStorage.getItem("token");
    }
    async getRoles(){
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
            return error;
        }
    }
}
export default Rol;
