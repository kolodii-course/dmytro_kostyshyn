import React from "react";
import QueueTable from "../../components/QueueTable/QueueTable";
import OutageTable from "../../components/OutageTable/OutageTable";
import ScheduleParser from "../../components/ScheduleParser/ScheduleParser";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import "./AdminPanelScreen.scss";
import UserTable from "../../components/UserTable/UserTable";

const items = [
    {
        key: "/panel/user",
        label: `User Table`,
    },
    {
        key: "/panel/queue",
        label: `Queues Table`,
    },
    {
        key: "/panel/outage",
        label: `Outage Table`,
    },
    {
        key: "/panel/parser",
        label: `Text Parser`,
    },
];

export default function AdminPanelScreen() {
    const navigate = useNavigate();

    const onChange = (key) => {
        navigate(key);
    };

    const TabsEl = (
        <div className="admin-tabs">
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                size="large"
            />
        </div>
    );

    switch (useLocation().pathname) {
        case items[0].key:
            return (
                <div className="admin-panel-container">
                    {TabsEl}
                    <UserTable />
                </div>
            );
        case items[1].key:
            return (
                <div className="admin-panel-container">
                    {TabsEl}
                    <QueueTable />
                </div>
            );

        case items[2].key:
            return (
                <div className="admin-panel-container">
                    {TabsEl}
                    <OutageTable />
                </div>
            );

        case items[3].key:
            return (
                <div className="admin-panel-container">
                    {TabsEl}
                    <ScheduleParser />
                </div>
            );

        default:
            return (
                <div className="admin-panel-container">
                    {TabsEl}
                    <UserTable />
                </div>
            );
    }
}
