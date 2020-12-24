import { message, Radio, Tag } from "antd";
import RGrid from "components/Shared/RGrid";
import React, { useState } from "react";
import { handleRequestError, useMutation, useSwap } from "utils/request";
import { filterLang } from "utils/languages";
import Update from "./Update";
import moment from "moment";
import { POST_STATUS_GRID } from "components/Shared/POST_STATUS";
import { NEWS_TYPES_GRID } from "./NEWS_TYPES";

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
  const [swapLoading, setSwapLoading] = useState<boolean>(false);
  const requestSwap = useSwap();
  const requestDelete = useMutation({ method: "delete" });

  function handleDelete(row: any[]) {
    setDeleteLoading(true);
    requestDelete({ api: "/news/" + row[0]._id })
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

  function handleSwap(fromIndex: number, toIndex: number) {
    const from = res?.data[fromIndex]["_id"];
    const to = res?.data[toIndex]["_id"];

    setSwapLoading(true)
    requestSwap({
      data: {
        from,
        to,
        model: "news",
      },
    })
      .then(() => refetch())
      .catch(handleRequestError)
      .finally(() => setSwapLoading(false));
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
        onDrag={handleSwap}
        loading={loading || swapLoading || deleteLoading}
        data={filterLang(lang, res?.data)}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          { type: "delete", onClick: handleDelete, loading: deleteLoading },
        ]}
        colDef={[
          {
            title: "Seq",
            dataIndex: "sequence",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Type",
            dataIndex: "type",
            render: (type) => <Tag color={NEWS_TYPES_GRID[type]?.color}>{NEWS_TYPES_GRID[type]?.name}</Tag>
          },
          {
            title: "Category",
            dataIndex: "category",
          },
          {
            title: "Primary",
            dataIndex: "isPrimary",
            render: (val) => val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (type) => <Tag color={POST_STATUS_GRID[type]?.color}>{POST_STATUS_GRID[type]?.name}</Tag>
          },
          {
            title: "Created",
            dataIndex: "createdAt",
            render: (val) => moment(val).format("D/M/YYYY"),
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
          setLang,
          lang,
          refetch,
        }}
      />
    </>
  );
}
