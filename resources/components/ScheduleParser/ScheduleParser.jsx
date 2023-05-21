import React, { useState, useEffect } from "react";
import { Input, Table, Button } from "antd";
import { textScheduleParser } from "../../utils/textScheduleParser";
import { convertTimeArray } from "../../utils/convertTimeArray";
import "./ScheduleParser.scss";
import { Queue } from "../../api/Queue";
import Outage from "../../api/Outage";

const COLUMNS = [
    {
        title: "Start At",
        dataIndex: "start_at",
        key: "start_at",
        render: (dateString) => dateString.slice(11, 16),
    },
    {
        title: "End At",
        dataIndex: "end_at",
        key: "end_at",
        render: (dateString) => dateString.slice(11, 16),
    },
    {
        title: "Queue Name",
        dataIndex: "queue_name",
        key: "queue_name",
    },
];

const Keywords = {
    on_msg: ["черги будуть з електропостачанням"],
    off_msg: ["черги будуть вимкнені", "знеструмленою"],
    maybe_msg: ["можливі вимкнення"],
    from: ["з", "та", ","],
    to: ["до"],
    split: ["Підчерга", "Підчерги"],
};

function getQueueId(queues, queue_name) {
    for (const queue of queues) {
        if (queue.name === queue_name) {
            return queue.id;
        }
    }
    return 0;
}

function isFindQueue(queues, queue_name) {
    for (const { name } of queues) {
        if (name === queue_name) {
            return true;
        }
    }
    return false;
}

export default function ScheduleParser() {
    const [queues, setQueues] = useState([]);
    const [outages, setOutages] = useState([]);
    const [needCreateQueues, setNeedCreateQueues] = useState([]);
    const [inputText, setInputText] = useState("");
    const [selectDate, setSelectDate] = useState(
        new Date().toJSON().split("T")[0]
    );

    useEffect(() => {
        Queue.getAll().then((data) => setQueues(data));
    }, []);

    function onChange(textInput) {
        const newOutages = [];

        textScheduleParser(textInput, Keywords).forEach((obj) => {
            const [start_at, end_at] = convertTimeArray(obj.offTime);

            obj.queues.forEach((queueName) => {
                for (let index = 0; index < start_at.length; index++) {
                    newOutages.push({
                        queue_name: queueName,
                        start_at: start_at[index],
                        end_at: end_at[index],
                    });
                }
            });
        });

        const newQueues = [];
        newOutages.forEach(({ queue_name }) => {
            if (!isFindQueue(queues, queue_name)) {
                newQueues.push(queue_name);
            }
        });

        setOutages(newOutages);
        setNeedCreateQueues([...new Set(newQueues)]);
    }

    async function onCreate() {
        await Promise.all([
            ...needCreateQueues.map((name) => Queue.create(name)),
        ]);
        await Queue.getAll().then((data) => setQueues(data));

        const newQueues = [];
        queues.forEach(({ queue_name }) => {
            if (!isFindQueue(queues, queue_name)) {
                newQueues.push(queue_name);
            }
        });
        setNeedCreateQueues([...new Set(newQueues)]);

        await Promise.all([
            ...outages.map((val) =>
                Outage.create(
                    val.start_at,
                    val.end_at,
                    getQueueId(queues, val.queue_name)
                )
            ),
        ]);

        setInputText("")
        setOutages([])
        setNeedCreateQueues([])
    }

    return (
        <div className="parser-container">
            <div className="parser-input">
                <Input.TextArea
                    value={inputText}
                    onChange={({ target }) => {
                        setInputText(target.value);
                        onChange(target.value);
                    }}
                    placeholder="Enter text"
                    style={{
                        height: 320,
                        resize: "none",
                    }}
                />
            </div>
            <div className="parser-button">
                <Input
                    className="outage-input-date"
                    onChange={({ target }) => setSelectDate(target.value)}
                    value={selectDate}
                    type="date"
                />
                <Button type="primary" onClick={onCreate}>
                    Create{" "}
                    {outages.length > 0
                        ? outages.length + " Outages"
                        : "Outage"}
                    {needCreateQueues.length !== 0
                        ? ` And ${needCreateQueues.length} Queues`
                        : ""}
                </Button>
            </div>
            <div className="parser-output">
                <Table
                    columns={COLUMNS}
                    dataSource={outages}
                    pagination={true}
                />
            </div>
        </div>
    );
}
