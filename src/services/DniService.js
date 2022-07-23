import axios from "axios";

class Dni {
    constructor() {
        this.url = `https://www.softwarelion.xyz/api/reniec/reniec-dni`;
        this.token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjA5LCJjb3JyZW8iOiJkYXZpbnNpZGVyMzQ1QGdtYWlsLmNvbSIsImlhdCI6MTY1ODU2MzM5OH0.8NTdDUf509ZIsx8UyuHFJSV6lBcx7k4x-QfOWvIn6ck`;
    }
    async getNombre(dni) {
        try {
            const respuesta = await axios.post(this.url, {dni: `${dni}`},{
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
export default Dni;
