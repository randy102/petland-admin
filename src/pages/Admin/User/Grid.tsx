import { message, Tag } from "antd";
import RDrawer from "components/Shared/RDrawer";
import { useForm } from "components/Shared/RForm";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { getUser } from "utils/auth";
import { useMutation } from "utils/request";
import Form from "./Form";

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [showForm, setShowForm] = useState(false);
  const [initRow, setInitRow] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const requestDelete = useMutation({ method: "delete" });
  const requestUpdate = useMutation({ method: "put" });
  const [form] = useForm();

  function handleDelete(row: any[]) {
    requestDelete({ api: "/user/" + row[0]._id })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch((error) => {
        message.error(`Error: ${error.response.data}`);
      });
  }

  function handleUpdate(row: any[]) {
    row[0].password = "";
    setInitRow(row[0]);
    setShowForm(true);
  }

  function handleClose() {
    setInitRow(undefined);
    setShowForm(false);
  }

  function handleSubmit() {
    form.validateFields().then((inputs) => {
      setSubmitLoading(true);
      requestUpdate({
        api: "/user/" + initRow?._id,
        data: inputs,
      })
        .then(() => {
          message.success("Success!");
          refetch();
          handleClose();
        })
        .catch((error) => message.error(`Error: ${error.response.data}`))
        .finally(() => setSubmitLoading(false));
    });
  }
  return (
    <>
      <RGrid
        loading={loading}
        data={res?.data}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          { type: "delete", onClick: handleDelete },
        ]}
        colDef={[
          {
            title: "Username",
            dataIndex: "username",
            key: "username",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Fullname",
            key: "fullname",
            render: (_, row) => `${row.lastName || ""} ${row.firstName || ""}`,
          },
          {
            title: "Role",
            dataIndex: "roleName",
            key: "role",
            render: (role) => (
              <Tag color={role === "Admin" ? "blue" : "default"}>{role}</Tag>
            ),
          },
        ]}
      />

      <RDrawer
        title="Edit"
        onClose={handleClose}
        visible={showForm}
        footDef={[
          {
            name: "Save",
            type: "primary",
            onClick: handleSubmit,
            loading: submitLoading,
          },
          {
            name: "Close",
            onClick: handleClose,
          },
        ]}
      >
        <Form
          form={form}
          init={initRow}
          requirePassword={false}
          roleDisabled={
            // As a SubUser, not able to change roles
            getUser("roleName") === "SubUser" ||
            // As a Admin, not able to change it's own role
            (initRow?.username === "admin" && getUser("username") === "admin")
          }
          // Not able to edit admin's username
          usernameDisabled={initRow?.username === "admin"}
        />
      </RDrawer>
    </>
  );
}
