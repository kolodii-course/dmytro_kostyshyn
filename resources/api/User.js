export class User {
    static #url = "/api/user";
    static #headers = { "Content-Type": "application/json" };

    static async getAll(token = localStorage.getItem("token")) {
        const req = await fetch(this.#url, {
            headers: {
                ...this.#headers,
                Authorization: "Bearer " + token,
            },
        });
        return await req.json();
    }

    static async getByEmail(email = "") {
        const req = await fetch(this.#url + '/' + email, {
            headers: this.#headers
        });
        return await req.json();
    }
}
