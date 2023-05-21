import React, { useEffect, useState } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import { Calendar, Table, Button, Dropdown, Space, Select } from "antd";
import "./ScheduleScreen.scss";
import Outage from "../../api/Outage";
import { Queue } from "../../api/Queue";

function getColumns(outages) {
    const currentHour = new Date().getHours();
    const columns = [
        {
            title: "Hour",
            dataIndex: "hour",
            key: 0,
            rowScope: "row",
            render: (val) => {
                if (Number(val.split(":")[0]) === currentHour) {
                    return <div style={{ fontSize: '20px' }}>{val}</div>;
                }
                return <div style={{ color: "gray" }}>{val}</div>;
            },
        },
    ];

    outages.forEach(({ queue }) => {
        for (const { key } of columns) {
            if (queue.id === key) return;
        }

        columns.push({
            title: queue.name,
            dataIndex: queue.id,
            key: queue.id,
        });
    });

    return columns;
}

function getDataSource(outages, columns) {
    let dataSource = [];

    if (!outages.length) {
        return dataSource;
    }

    for (let hour = 0; hour < 24; hour++) {
        dataSource.push({
            key: hour,
            hour: `${("0" + hour).slice(-2)}:00`,
        });
    }

    dataSource.forEach(({ hour }) => {
        hour = Number(hour.slice(0, 2));
        columns.forEach(({ dataIndex }) => {
            outages.forEach((outage) => {
                const startAt = Number(
                    outage.start_at.split(" ")[1].split(":")[0]
                );
                const endAt = Number(outage.end_at.split(" ")[1].split(":")[0]);

                if (
                    (hour >= endAt && startAt >= hour) ||
                    (hour >= startAt && endAt >= hour)
                ) {
                    if (dataIndex === outage.queue.id) {
                        dataSource[hour][dataIndex] = (
                            <img
                                src="icons/no-energy.svg"
                                alt="no-energy"
                                width={25}
                            />
                        );
                    }
                }
            });
        });
    });

    return dataSource;
}

function getSchedule(outages) {
    const columns = getColumns(outages);
    const dataSource = getDataSource(outages, columns);

    return [columns, dataSource];
}

export default function ScheduleScreen() {
    const [outages, setOutages] = useState([]);
    const [queues, setQueues] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentQueueId, setCurrentQueueId] = useState(
        localStorage.getItem("QueueId")
            ? Number(localStorage.getItem("QueueId"))
            : 0
    );

    function fetchOutages(currentDate, currentQueueId) {
        Outage.getAll(currentDate, currentQueueId).then((data) =>
            setOutages(data)
        );
    }

    function onChangeDate(date) {
        date = new Date(date);

        setCurrentDate(date);
        fetchOutages(date, currentQueueId);
    }

    function onChangeQueue(queueId) {
        setCurrentQueueId(queueId);
        localStorage.setItem("QueueId", queueId);
        fetchOutages(currentDate, queueId);
    }

    useEffect(() => {
        fetchOutages(currentDate, currentQueueId);
        Queue.getAll().then((data) =>
            setQueues([{ id: 0, name: "No Select" }, ...data])
        );
    }, []);

    const [columns, dataSource] = getSchedule(outages);

    return (
        <div className="schedule-container">
            <div className="schedule-calendar">
                <Calendar
                    fullscreen={false}
                    onChange={onChangeDate}
                    setCurrentDate={true}
                />

                <Select
                    showSearch
                    placeholder="Queue: No Select"
                    optionFilterProp="children"
                    className="schedule-select"
                    onChange={onChangeQueue}
                    options={queues.map((queue) => ({
                        value: queue.id,
                        label: "Queue: " + queue.name,
                    }))}
                    value={currentQueueId}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                />
            </div>

            <div className="schedule-table">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </div>
    );
}
