import { message, Radio, Tag } from "antd";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import { filterLang } from "utils/languages";
import Update from "./Update";
import moment from "moment";

interface GridProps {
  res: any;
  loading: boolean;
  refetch: Function;
}

export default function Grid(props: GridProps) {
  const { res, loading, refetch } = props;

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("vi");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [initRow, setInitRow] = useState<any>();

  const requestDelete = useMutation({ method: "delete" });

  function handleDelete(row: any[]) {
    setDeleteLoading(true)
    requestDelete({ api: "/contact/" + row[0]._id })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch(handleRequestError)
      .finally(() => setDeleteLoading(false))
  }

  function handleUpdate(row: any[]) {
    setInitRow(res?.data.find((r: any) => r._id === row[0]._id));
    setShowForm(true);
  }

  return (
    <>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: "Vi", value: "vi" },
          { label: "En", value: "en" },
        ]}
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      />
      <RGrid
        loading={loading}
        data={filterLang(lang, res?.data)}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          { type: "delete", onClick: handleDelete, loading: deleteLoading },
        ]}
        colDef={[
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Primary",
            dataIndex: "isPrimary",
            render: (val) => val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>
          },
          {
            title: "Fax",
            dataIndex: "fax",
          },
          {
            title: "Map",
            dataIndex: "map",
          },
          {
            title: "Manufactory",
            dataIndex: "isManufactory",
            render: (val) => val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>
          },
          {
            title: "Area",
            dataIndex: "area",
          },
          {
            title: "Core area",
            dataIndex: "coreArea",
          },
          {
            title: "Management",
            dataIndex: "managementSystem",
          },
          {
            title: "Total wattage",
            dataIndex: "totalWattage",
          },
          {
            title: "Created",
            dataIndex: "createdAt",
            render: (val) => moment(val).format("D/M/YYYY"),
          },
          {
            title: "Updated",
            dataIndex: "updatedAt",
            render: (val) => moment(val).format("D/M/YYYY"),
          },
        ]}
      />

      <Update
        {...{
          setInitRow,
          initRow,
          showForm,
          setShowForm,
          setLang,
          lang,
          refetch,
        }}
      />
    </>
  );
}
