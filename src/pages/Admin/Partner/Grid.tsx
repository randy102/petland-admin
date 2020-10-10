import { message, Radio } from "antd";
import RGrid from "components/Shared/RGrid";
import React, {  useState } from "react";
import { handleRequestError, useMutation } from "utils/request";
import { filterLang } from "utils/languages";
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

  const [lang, setLang] = useState<string>("vi");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [initRow, setInitRow] = useState<any>();
 

  const requestDelete = useMutation({ method: "delete" });

  function handleDelete(row: any[]) {
    requestDelete({ api: "/partner/" + row[0]._id })
      .then(() => {
        message.success("Success!");
        refetch();
      })
      .catch(handleRequestError);
  }

  function handleUpdate(row: any[]) {
    setInitRow(res?.data.find((r: any) => r._id === row[0]._id));
    setShowForm(true)
  }

  const gridData: any = {
    en: filterLang("en", res?.data),
    vi: filterLang("vi", res?.data),
  };

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
        data={gridData[lang]}
        headDef={[
          { type: "refresh", onClick: () => refetch() },
          { type: "update", onClick: handleUpdate },
          { type: "delete", onClick: handleDelete },
        ]}
        colDef={[
          {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (id) => id && <RImage id={id} width={60}/>
          },
          { 
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Link",
            key: "link",
            dataIndex: "link",
          },
          {
            title: "Created",
            key: "created",
            dataIndex: "createdAt",
            render: (val) => val && moment(val).format("D/M/YYYY")
          },
          {
            title: "Updated",
            key: "updated",
            dataIndex: "updatedAt",
            render: (val) => val && moment(val).format("D/M/YYYY")
          }
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
          refetch
        }}
      />
    </>
  );
}
