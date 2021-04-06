import { message, Tag } from "antd";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import Update from "./Update";


interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [showForm, setShowForm] = useState(false);
  const [initRow, setInitRow] = useState<any>();


  const requestLock = useMutation({ method: "put", api: "user/lockUser" });


  function toggleLock([row]: any[]) {
    requestLock({
      data: {
        isActive: !row?.isActive,
        id: row?._id,
      }
    })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch(handleRequestError);
  }

  function handleUpdate(row: any[]) {
    row[0].password = "";
    setInitRow(row[0]);
    setShowForm(true);
  }


  return (
    <>
      <RGrid

        loading={loading}
        data={res?.data}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          {
            name: "Toggle Lock",
            icon: "LockFilled",
            selection: "single",
            confirm: true,
            onClick: toggleLock
          }
        ]}
        colDef={[
          { dataIndex: "email" },
          { dataIndex: "phone" },
          { dataIndex: "name" },
          { dataIndex: "role" },
          { dataIndex: "city" },
          { dataIndex: "district" },
          {
            dataIndex: "isActive",
            title: "Status",
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