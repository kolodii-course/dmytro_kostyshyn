export class Auth {
    static #url = "/api/auth";
    static #headers = { "Content-Type": "application/json" };

    static async registration(name = "", email = "", password = "") {
        const req = await fetch(this.#url + "/registration", {
            headers: this.#headers,
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        return await req.json();
    }

    static async login(email = "", password = "") {
        const req = await fetch(this.#url + "/login", {
            headers: this.#headers,
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        });
        return await req.json();

    }

    static async refresh(token = "") {
        const req = await fetch(this.#url + "/refresh", {
            headers: this.#headers,
            method: "POST",
            body: JSON.stringify({
                token,
            }),
        });
        return await req.json();
    }
}
