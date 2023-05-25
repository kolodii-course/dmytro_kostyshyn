import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { formatDate } from "../../utils/formatDate";
import { User } from "../../api/User";

export default function UserTable() {
    const [queues, setQueues] = useState([]);

    useEffect(() => {
        User.getAll().then((data) => setQueues(data));
    }, []);

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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Email Verified At",
            dataIndex: "email_verified_at",
            key: "email_verified_at",
            render: (val) => String(val)
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (val) => val.toLocaleUpperCase()
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
    ];

    return (
        <div className="queue-container">
            <Table columns={columns} dataSource={queues} pagination={true} />
        </div>
    );
}
