import { message, Tag } from "antd";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import Update from "./Update";
import { STATUS_TYPE_GRID } from "./STATUS_TYPES";
import RImage from "../../../components/Shared/RImage";


interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [showForm, setShowForm] = useState(false);
  const [initRow, setInitRow] = useState<any>();


  function action(row: any[]) {
    const selected = row.map(r => r.name).toString();
    message.info("Multiple select with confirm: " + selected);
  }

  function handleUpdate([row]: any[]) {
    setInitRow(row);
    setShowForm(true);
  }


  return (
    <>
      <RGrid
        loading={loading}
        data={res}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          {
            name: "Action",
            icon: "LockFilled",
            selection: "multiple",
            confirm: true,
            onClick: action
          }
        ]}
        colDef={[
          { dataIndex: "name" },
          {
            dataIndex: "status",
            render: (type) => <Tag color={STATUS_TYPE_GRID[type]?.color}>{STATUS_TYPE_GRID[type]?.name}</Tag>
          },
          {
            dataIndex: ["profile", "age"],
            title: "Age"
          },
          {
            dataIndex: "profile",
            title: "Photo",
            render: (profile, record) => profile.avatar && <RImage id={record.profile.avatar} width={120}/>,
          },
          {
            dataIndex: "isActive",
            title: "Active",
            render: (isActive) => isActive ?
              <Tag color={"success"}>Active</Tag> :
              <Tag color={"default"}>Locked</Tag>
          }
        ]}
      />

      <Update
        {...{
          setInitRow,
          initRow,
          showForm,
          setShowForm,
          refetch,
        }}
      />
    </>
  );
}
