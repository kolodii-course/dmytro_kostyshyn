export default class Outage {
    static #url = "/api/outage";
    static #headers = { "Content-Type": "application/json" };

    static async getAll(date = "", queueId = "") {
        queueId = queueId != 0 ? String(queueId) : "";

        const req = await fetch(
            this.#url +
                `?date=${
                    date ? date.toISOString().split("T")[0] : date
                }&queueId=${queueId}`
        );
        return await req.json();
    }

    static async create(start_at, end_at, queue_id, token = localStorage.getItem("token")) {
        const req = await fetch(this.#url, {
            body: JSON.stringify([{ start_at, end_at, queue_id }]),
            headers: {
                ...this.#headers,
                Authorization: "Bearer " + token,
            },
            method: "POST",
        });
        return await req.json();
    }

    static async createMore(outages = [], token = localStorage.getItem("token")) {
        const req = await fetch(this.#url, {
            body: JSON.stringify(outages),
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
