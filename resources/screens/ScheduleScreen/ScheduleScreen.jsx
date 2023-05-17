import React, { useEffect, useState } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import { Calendar, Table } from "antd";
import { getOutages } from "./../../api/getOutages";
import "./ScheduleScreen.scss";

function getColumns(outages) {
    const columns = [
        {
            title: "Hour",
            dataIndex: "hour",
            key: 0,
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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [outages, setOutages] = useState([]);

    useEffect(() => {
        getOutages(currentDate).then((data) => setOutages(data));
    }, []);

    const [columns, dataSource] = getSchedule(outages);
    console.log(columns, dataSource);

    return (
        <div className="schedule-container">
            <div className="schedule-calendar">
                <Calendar
                    fullscreen={false}
                    onChange={(value) => setCurrentDate(new Date(value))}
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
