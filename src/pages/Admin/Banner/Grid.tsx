import { message } from "antd";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import Update from "./Update";
import moment from "moment";
import RImage from "components/Shared/RImage";

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [initRow, setInitRow] = useState<any>();

  const requestDelete = useMutation({ method: "delete" });

  function handleDelete(row: any[]) {
    setDeleteLoading(true)
    requestDelete({ api: "/banner/" + row[0]._id })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => setDeleteLoading(false));
  }

  function handleUpdate(row: any[]) {
    setInitRow(res?.data.find((r: any) => r._id === row[0]._id));
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
          { type: "delete", onClick: handleDelete, loading: deleteLoading },
        ]}
        colDef={[
          {
            title: "Image",
            dataIndex: "image",
            render: (id) => id && <RImage id={id} width={60} />,
          },
          {
            title: "Key",
            dataIndex: "key",
          },
          {
            title: "Created",
            dataIndex: "createdAt",
            render: (val) => val && moment(val).format("D/M/YYYY"),
          },
          {
            title: "Updated",

            dataIndex: "updatedAt",
            render: (val) => val && moment(val).format("D/M/YYYY"),
          },
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
