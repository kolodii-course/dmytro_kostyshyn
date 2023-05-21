import { sleep } from "../utils/sleep";

export default class Outage {
    static #url = "/api/outage";
    static #pause = 2000;
    static #headers = { "Content-Type": "application/json" };

    static async getAll(date = "", queueId = "") {
        queueId = queueId != 0 ? String(queueId) : "";

        while (true) {
            try {
                const req = await fetch(
                    this.#url +
                        `?date=${
                            date ? date.toISOString().split("T")[0] : date
                        }&queueId=${queueId}`
                );
                return await req.json();
            } catch (_) {
                return []
                await sleep(this.#pause);
            }
        }
    }

    static async create(start_at, end_at, queue_id) {
        while (true) {
            try {
                const req = await fetch(this.#url, {
                    body: JSON.stringify({ start_at, end_at, queue_id }),
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
