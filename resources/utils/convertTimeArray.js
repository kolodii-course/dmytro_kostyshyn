export function convertTimeArray(array = [], date = new Date()) {
    const dateStr = date.toJSON();
    const startAt = [];
    const endAt = [];

    for (let index = 0; index < array.length; index += 2) {
        startAt.push(
            `${dateStr.split("T")[0]}T${array[index]}:${dateStr.split(":")[2]}`
        );
        endAt.push(
            `${dateStr.split("T")[0]}T${array[index + 1]}:${
                dateStr.split(":")[2]
            }`
        );
    }

    return [startAt, endAt];
}
