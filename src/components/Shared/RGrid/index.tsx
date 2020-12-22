/* tslint:disable */
import React, { useState, useEffect } from "react";
import { Button, Table, Input, Space, Modal } from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import * as AntIcon from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import "./grid.scss";
import { HEAD_DATA } from "./HeadTemplate";
import ReactDragListView from "react-drag-listview";

interface RGridProps {
  data: any[];
  colDef: ColumnsType<any>;
  headDef: HeaderType[];
  loading?: boolean;
  expandRender?: ExpandedRowRender<any>;
  showSelection?: boolean;
  pagination?: boolean;
}

declare type ExpandedRowRender<ValueType> = (
  record: ValueType,
  index: number,
  indent: number,
  expanded: boolean
) => React.ReactNode;

interface HeaderType {
  icon?: string;
  name?: string;
  selection?: "multiple" | "single" | undefined;
  onClick?: (rows: any[], setSelectedRow: Function) => void;
  type?: HeaderBtnType;
  confirm?: boolean;
  confirmMessage?: string;
  loading?: boolean;
  disabled?: boolean;
}

type HeaderBtnType =
  | "create"
  | "update"
  | "delete"
  | "refresh"
  | "detail";

function getNestedPath(data: any, path: string) {
  if (!Array.isArray(path)) return data[path];
  for (let p of path) {
    data = data[p];
  }
  return data;
}

export default function RGrid(props: RGridProps) {
  let {
    pagination = true,
    data,
    colDef,
    headDef,
    loading = false,
    expandRender,
    showSelection = true,
  } = props;
  

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [dataResult, setDataResult] = useState<any>([]);
  var searchInput: Input | null;

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  }, [data]);

  useEffect(() => {
    setDataResult(data)
  }, [data])


  const onDragEnd = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0) return; // Ignores if outside designated area

    const items = [...dataResult];
    const item = items.splice(fromIndex-1, 1)[0];
    items.splice(toIndex-1, 0, item);
    setDataResult(items)
  };
  

  // Filter =>
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      getNestedPath(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) =>
      visible && setTimeout(() => searchInput?.select()),
  });
  function handleSearch(confirm: any) {
    confirm();
  }
  function handleReset(clearFilters: any) {
    clearFilters();
  }
  // <= Filter

  // Sorter =>
  const getSorterProps = (cd: any) => ({
    sorter: (a: any, b: any) => {
      const aVal = getNestedPath(a, cd.dataIndex);
      const bVal = getNestedPath(b, cd.dataIndex);
      if (aVal > bVal) return 1;
      if (aVal < bVal) return -1;
      return 0;
    },
  });
  // => Sorter

  colDef = colDef.map((cd: any) => ({
    ...cd,
    ...getColumnSearchProps(cd.dataIndex),
    ...getSorterProps(cd),
  }));

  return (
    <div>
      {headDef?.length && !loading && (
        <div className={`rui-grid-btn ${!data?.length ? 'reset' : ''}`}>

          <Space>
            {headDef &&
              headDef.map(
                ({
                  disabled = false,
                  icon,
                  selection,
                  name,
                  onClick = () => {},
                  type,
                  confirm,
                  confirmMessage,
                  loading = false,
                }) => {
                  icon = icon || HEAD_DATA[type || "create"]?.icon;
                  name = name || HEAD_DATA[type || "create"]?.name;
                  selection = selection || (type && HEAD_DATA[type].selection);
                  confirm = confirm || HEAD_DATA[type || "create"]?.confirm;
                 
                  // @ts-ignore
                  const Icon = AntIcon[icon];
                  const singleError =
                    selection === "single" && selectedRows.length !== 1;
                  const multipleError =
                    selection === "multiple" && selectedRows.length === 0;
                  const isDisabled =
                    disabled || singleError
                      ? true
                      : multipleError
                      ? true
                      : false;

                  function confirmClick(cb: any) {
                    Modal.confirm({
                      title:
                        confirmMessage ||
                        "Are you sure?",
                      icon: <ExclamationCircleOutlined />,
                      onOk: () => cb(selectedRows, setSelectedRows),
                    });
                  }
                  return (
                    <Button
                      loading={loading}
                      key={name}
                      disabled={isDisabled}
                      onClick={() =>
                        confirm
                          ? confirmClick(onClick)
                          : onClick(selectedRows, setSelectedRows)
                      }
                      icon={Icon && <Icon />}
                    >
                      {name}
                    </Button>
                  );
                }
              )}
          </Space>
          
        </div>
      )}

      <ReactDragListView
        nodeSelector="tr"
        onDragEnd={onDragEnd}
      >
      <Table
        className="rui-grid-table"
        size="small"
        scroll={{x : true}}
        tableLayout="auto"
        showSorterTooltip={false}
        pagination={pagination && { defaultPageSize: 8, position: ['topRight','bottomCenter'] }}
        loading={loading}
        columns={colDef}
        dataSource={dataResult}
        rowKey="_id"
        expandedRowRender={expandRender}
        locale={{
          emptyText: "Data empty!",
        }}
        rowSelection={
          showSelection
            ? {
                type: "radio",
                onChange: (keys, rows) => {
                  setSelectedRows(rows);
                  setSelectedRowKeys(keys);
                },
                selectedRowKeys,
                preserveSelectedRowKeys: false,
              }
            : undefined
        }
      />
      </ReactDragListView>
    </div>
  );
}
