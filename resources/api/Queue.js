export class Queue {
    static #url = "/api/queue";
    static #headers = { "Content-Type": "application/json" };

    static async getAll() {
        const req = await fetch(this.#url);
        return await req.json();
    }

    static async create(name = "", token = localStorage.getItem("token")) {
        const req = await fetch(this.#url, {
            body: JSON.stringify({ name }),
            headers: {
                ...this.#headers,
                Authorization: "Bearer " + token,
            },
            method: "POST",
        });
        return await req.json();
    }

    static async delete(id, token = localStorage.getItem("token")) {
        const req = await fetch(this.#url + "/" + id, {
            headers: {
                ...this.#headers,
                Authorization: "Bearer " + token,
            },
            method: "DELETE",
        });
        return await req.json();
    }
}
