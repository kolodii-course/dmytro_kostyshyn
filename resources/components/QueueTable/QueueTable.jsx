import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { formatDate } from "../../utils/formatDate";
import "./QueueTable.scss";
import { Queue } from "../../api/Queue";

export default function QueueTable() {
    const [queues, setQueues] = useState([]);
    const [queueName, setQueueName] = useState("");

    useEffect(() => {
        Queue.getAll().then((data) => setQueues(data));
    }, []);

    function onDelete(id) {
        Queue.delete(id).finally(() => {
            Queue.getAll().then((data) => setQueues(data));
        });
    }

    function onCreate() {
        if (queueName === "") return;
        Queue.create(queueName).finally(() => {
            Queue.getAll().then((data) => setQueues(data));
            setQueueName("");
        });
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            rowScope: "row",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                <>
                    <a className="delete-button">
                        Edit
                    </a>
                    {" "}
                    <a onClick={() => onDelete(id)} className="delete-button">
                        Remove
                    </a>
                </>
            ),
        },
    ];

    return (
        <div className="queue-container">
            <div className="queue-input-container">
                <div>
                    <Input
                        placeholder="Queue name"
                        onChange={({ target }) => setQueueName(target.value)}
                        value={queueName}
                    />
                </div>

                <div className="queue-button">
                    <Button type="primary" onClick={onCreate}>
                        Create Queue
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={queues.map((queue) => ({
                    ...queue,
                    actions: queue.id,
                }))}
                pagination={true}
            />
        </div>
    );
}
