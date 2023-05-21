import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select } from "antd";
import { formatDate } from "../../utils/formatDate";
import "./OutageTable.scss";
import Outage from "../../api/Outage";
import { getListHours } from "../../utils/getListHours";
import { Queue } from "../../api/Queue";

export default function OutageTable() {
    const [outages, setOutages] = useState([]);
    const [queues, setQueues] = useState([]);
    const [isClear, setIsClear] = useState(
        localStorage.getItem("isClear") === "true" ? true : false
    );
    const [selectDate, setSelectDate] = useState(
        new Date().toJSON().split("T")[0]
    );
    const [selectStartH, setSelectStartH] = useState(12);
    const [selectStartM, setSelectStartM] = useState(0);
    const [selectEndH, setSelectEndH] = useState(13);
    const [selectEndM, setSelectEndM] = useState(0);
    const [selectQueueId, setSelectQueueId] = useState(0);

    function feathOutages() {
        Outage.getAll().then((data) =>
            setOutages(
                data.map((outage) => ({
                    ...outage,
                    queue_name: outage.queue.name,
                }))
            )
        );
    }

    function onCreate() {
        const startAt = new Date(selectDate);
        startAt.setHours(selectStartH + 3);
        startAt.setMinutes(selectStartM);

        const endAt = new Date(selectDate);
        endAt.setHours(selectEndH + 3);
        endAt.setMinutes(selectEndM);

        Outage.create(startAt, endAt, selectQueueId).finally(() => {
            feathOutages();
            if (isClear) {
                setSelectDate("");
                setSelectStartH(0);
                setSelectStartM(0);
                setSelectEndH(0);
                setSelectEndM(0);
                setSelectQueueId(0);
            }
        });
    }

    function onDelete(id) {
        Outage.delete(id).finally(() => feathOutages());
    }

    useEffect(() => {
        feathOutages();
        Queue.getAll().then((data) =>
            setQueues([{ id: 0, name: "No Select" }, ...data])
        );
    }, []);

    const COLUMNS = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            rowScope: "row",
        },
        {
            title: "Start At",
            dataIndex: "start_at",
            key: "start_at",
        },
        {
            title: "End At",
            dataIndex: "end_at",
            key: "end_at",
        },
        {
            title: "Queue Name",
            dataIndex: "queue_name",
            key: "queue_name",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (dateString) => formatDate(dateString),
        },
        {
            title: "Updated At",
            key: "updated_at",
            dataIndex: "updated_at",
            render: (dateString) => formatDate(dateString),
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
            render: (id) => (
                <a onClick={() => onDelete(id)} className="delete-button">
                    Remove
                </a>
            ),
        },
    ];

    return (
        <div className="outage-container">
            <div className="outage-input-container">
                <div className="outage-inputs">
                    <Input
                        className="outage-input-date"
                        onChange={({ target }) => setSelectDate(target.value)}
                        value={selectDate}
                        type="date"
                    />
                    <Select
                        className="outage-input-time"
                        showSearch
                        placeholder="start"
                        optionFilterProp="children"
                        options={getListHours()}
                        onChange={(value) => setSelectStartH(value)}
                        value={selectStartH}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    />
                    {/* <div className="outage-input-symbol">:</div>
                    <Select
                        className="outage-input-time"
                        showSearch
                        placeholder="start"
                        optionFilterProp="children"
                        options={getListMinutes()}
                        onChange={(value) => setSelectStartM(value)}
                        value={selectStartM}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    /> */}
                    <Select
                        className="outage-input-time"
                        showSearch
                        placeholder="end"
                        optionFilterProp="children"
                        options={getListHours(false)}
                        onChange={(value) => setSelectEndH(value)}
                        value={selectEndH}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    />
                    {/* <div className="outage-input-symbol">:</div>
                    <Select
                        className="outage-input-time"
                        showSearch
                        placeholder="end"
                        optionFilterProp="children"
                        options={getListMinutes(true)}
                        onChange={(value) => setSelectEndM(value)}
                        value={selectEndM}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    /> */}
                    <Select
                        className="outage-input-queue"
                        showSearch
                        placeholder="Queue: No Select"
                        optionFilterProp="children"
                        onChange={(value) => setSelectQueueId(value)}
                        value={selectQueueId}
                        options={queues.map((queue) => ({
                            value: queue.id,
                            label: "Queue: " + queue.name,
                        }))}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    />
                    <Input
                        className="outage-input-checkbox"
                        onChange={() => {
                            localStorage.setItem("isClear", !isClear);
                            setIsClear(!isClear);
                        }}
                        type="checkbox"
                        checked={isClear}
                    />
                    Auto clear
                </div>

                <div className="queue-button">
                    <Button type="primary" onClick={onCreate}>
                        Create Outage
                    </Button>
                </div>
            </div>
            <Table
                columns={COLUMNS}
                dataSource={outages.map((outage) => ({
                    ...outage,
                    actions: outage.id,
                }))}
                pagination={false}
            />
        </div>
    );
}
