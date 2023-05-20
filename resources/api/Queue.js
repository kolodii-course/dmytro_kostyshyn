export class Queue {
    static #url = "/api/queue";
    static #headers = { "Content-Type": "application/json" };

    static getAll() {
        return fetch(this.#url).then((date) => date.json());
    }

    static create(name) {
        return fetch(this.#url, {
            body: JSON.stringify({ name }),
            headers: this.#headers,
            method: "POST",
        }).then((date) => date.json());
    }

    static delete(id) {
        return fetch(this.#url + '/' + id, {
            headers: this.#headers,
            method: "DELETE",
        }).then((date) => date.json());
    }
}
