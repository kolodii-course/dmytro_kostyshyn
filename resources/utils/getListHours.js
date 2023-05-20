export function getListHours(isReversed = false) {
    const hours = [];

    for (let hour = 0; hour <= 23; hour++) {
        hours.push({
            value: hour,
            label: ("0" + hour).slice(-2),
        });
    }

    if (isReversed) {
        return hours.reverse()
    }

    return hours
}
