export function textScheduleParser(inputText = "", keywords) {
    const result = [];
    inputText = inputText.toLowerCase().replaceAll(" ", " ");

    for (const [key, values] of Object.entries(keywords)) {
        values.forEach((value) => {
            inputText = inputText.replaceAll(
                value.toLowerCase(),
                " " + key.toUpperCase() + " "
            );
        });
    }

    if (inputText.search("SPLIT") === -1) return result;

    const textLines = inputText.split("\n");

    for (let lineId = 0; lineId < textLines.length; lineId++) {
        if (textLines[lineId] === "") continue;

        if (textLines[lineId].search("SPLIT") !== -1) {
            const queues = [];
            const onTime = [];
            const offTime = [];
            const maybeTime = [];

            textLines[lineId]
                .split(" ")
                .forEach((val) =>
                    val == +val && val != 0 ? queues.push(val) : null
                );

            for (let localId = lineId; localId < textLines.length; localId++) {
                if (
                    textLines[localId].search(queues[0]) !== -1 ||
                    textLines[localId].search("SPLIT") === -1
                ) {
                    const curentLine = textLines[localId].replaceAll(" ", " ");
                    let times = [];
                    curentLine.split("FROM").forEach((value) => {
                        value.split("TO").forEach((value) => {
                            const timeIndex = value.search(":");
                            if (timeIndex !== -1)
                                times.push(
                                    value.slice(timeIndex - 2, timeIndex + 3)
                                );
                        });
                    });

                    if (curentLine.search("ON_MSG") !== -1) {
                        onTime.push(...times);
                    } else if (curentLine.search("OFF_MSG") !== -1) {
                        offTime.push(...times);
                    } else if (curentLine.search("MAYBE_MSG") !== -1) {
                        maybeTime.push(...times);
                    }
                } else {
                    break;
                }
            }

            result.push({
                queues,
                onTime,
                offTime,
                maybeTime,
            });
        }
    }
    return result;
}
