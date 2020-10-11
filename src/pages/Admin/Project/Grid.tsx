import { message, Radio } from "antd";
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

  const [lang, setLang] = useState<string>("vi");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [initRow, setInitRow] = useState<any>();

  const requestDelete = useMutation({ method: "delete" });

  function handleDelete(row: any[]) {
    requestDelete({ api: "/project/" + row[0]._id })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch(handleRequestError);
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
          { type: "delete", onClick: handleDelete },
        ]}
        colDef={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Address",
            key: "address",
            dataIndex: "address",
          },
          {
            title: "Year",
            dataIndex: "year",
            key: "year",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Investor",
            dataIndex: "investor",
            key: "investor",
          },
          {
            title: "Area",
            dataIndex: "area",
            key: "area",
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Created",
            key: "created",
            dataIndex: "createdAt",
            render: (val) => moment(val).format("D/M/YYYY"),
          },
          {
            title: "Updated",
            key: "updated",
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
