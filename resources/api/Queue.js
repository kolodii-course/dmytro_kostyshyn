import { sleep } from "../utils/sleep";

export class Queue {
    static #url = "/api/queue";
    static #pause = 2000;
    static #headers = { "Content-Type": "application/json" };

    static async getAll() {
        while (true) {
            try {
                const req = await fetch(this.#url);
                return await req.json();
            } catch (_) {
                return []
                await sleep(this.#pause);
            }
        }
    }

    static async create(name) {
        while (true) {
            try {
                const req = await fetch(this.#url, {
                    body: JSON.stringify({ name }),
                    headers: this.#headers,
                    method: "POST",
                });
                return await req.json();
            } catch (_) {
                break
                await sleep(this.#pause);
            }
        }
    }

    static async delete(id) {
        while (true) {
            try {
                const req = await fetch(this.#url + "/" + id, {
                    headers: this.#headers,
                    method: "DELETE",
                });
                return await req.json();
            } catch (_) {
                break
                await sleep(this.#pause);
            }
        }
    }
}
