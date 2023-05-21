import React from "react";
import QueueTable from "../../components/QueueTable/QueueTable";
import OutageTable from "../../components/OutageTable/OutageTable";
import './AdminPanelScreen.scss'
import ScheduleParser from "../../components/ScheduleParser/ScheduleParser";

export default function AdminPanelScreen() {
    return <div className="admin-panel-container">
        <ScheduleParser />
        <QueueTable />
        <OutageTable />
    </div>
}
