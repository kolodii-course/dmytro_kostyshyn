export function getListMinutes(isReversed = false) {
    const minutes = [];

    for (let minute = 0; minute <= 59; minute++) {
        minutes.push({
            value: minute,
            label: ("0" + minute).slice(-2),
        });
    }

    if (isReversed) {
        return minutes.reverse()
    }

    return minutes
}
