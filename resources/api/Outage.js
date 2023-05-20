export default class Outage {
    static #url = "/api/outage";
    static #headers = { "Content-Type": "application/json" };

    static getAll(date = "", queueId) {
        queueId = queueId != 0 ? String(queueId) : "";

        return fetch(
            this.#url +
                `?date=${
                    date ? date.toISOString().split("T")[0] : date
                }&queueId=${queueId}`
        ).then((data) => data.json());
    }

    static create(start_at, end_at, queue_id) {
        return fetch(this.#url, {
            body: JSON.stringify({ start_at, end_at, queue_id }),
            headers: this.#headers,
            method: "POST",
        }).then((date) => date.json());
    }

    static delete(id) {
        return fetch(this.#url + "/" + id, {
            headers: this.#headers,
            method: "DELETE",
        }).then((date) => date.json());
    }
}
