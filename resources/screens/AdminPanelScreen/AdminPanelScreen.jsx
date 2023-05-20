import React from "react";
import QueueTable from "../../components/QueueTable/QueueTable";
import OutageTable from "../../components/OutageTable/OutageTable";
import './AdminPanelScreen.scss'

export default function AdminPanelScreen() {
    return <div className="admin-panel-container">
        <QueueTable />
        <OutageTable />
    </div>
}
