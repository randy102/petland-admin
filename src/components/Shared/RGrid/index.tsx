/* tslint:disable */
import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Space, Modal } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import * as AntIcon from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import './grid.scss';
import { HEAD_DATA } from './HeadTemplate';
import ReactDragListView from 'react-drag-listview';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { capitalize, removeAccents } from '../../../utils/string';

const DEFAULT_PAGE_SIZE = 10;
interface RGridProps {
  data: any[];
  colDef: ColumnsType<any>;
  headDef: HeaderType[];
  loading?: boolean;
  expandRender?: ExpandedRowRender<any>;
  showSelection?: boolean;
  pagination?: boolean;
  onDrag?: (from: number, to: number) => void;
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
  selection?: 'multiple' | 'single' | undefined;
  onClick?: (rows: any[], setSelectedRow: Function) => void;
  type?: HeaderBtnType;
  confirm?: boolean;
  confirmMessage?: string;
  loading?: boolean;
  disabled?: boolean;
}

type HeaderBtnType = 'create' | 'update' | 'delete' | 'refresh' | 'detail';

function getNestedPath(data: any, path: string = '') {
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
    onDrag = () => {},
  } = props;

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [dataResult, setDataResult] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPaginateReplica, setShowPaginateReplica] = useState<boolean>(
    false
  );

  var searchInput: Input | null;

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  }, [data]);

  useEffect(() => {
    setDataResult(data);
  }, [data]);

  function onDragEnd(fromIndex: number, toIndex: number) {
    if (toIndex < 0) return; // Ignores if outside designated area

    const offset = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    const from = offset + fromIndex - 1;
    const to = offset + toIndex - 1;

    const items = [...dataResult];
    const temp = items[from];
    items[from] = items[to];
    items[to] = temp;
    setDataResult(items);
    onDrag(from, to);
  }

  // Filter =>
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      removeAccents(
        getNestedPath(record, dataIndex)?.toString().toLowerCase()
      )?.includes(removeAccents(value.toLowerCase())),
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

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

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
    title: cd.title || capitalize(cd.dataIndex),
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
                  icon = icon || HEAD_DATA[type || 'create']?.icon;
                  name = name || HEAD_DATA[type || 'create']?.name;

                  selection = selection || (type && HEAD_DATA[type].selection);
                  confirm = confirm || HEAD_DATA[type || 'create']?.confirm;

                  // @ts-ignore
                  const Icon = AntIcon[icon];
                  const singleError =
                    selection === 'single' && selectedRows.length !== 1;
                  const multipleError =
                    selection === 'multiple' && selectedRows.length === 0;
                  const isDisabled =
                    disabled || singleError
                      ? true
                      : multipleError
                      ? true
                      : false;

                  function confirmClick(cb: any) {
                    Modal.confirm({
                      title: confirmMessage || 'Chắc chưa?',
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

      {showPaginateReplica && <div style={{ height: 55, width: '100%' }} />}

      <ReactDragListView nodeSelector="tr" onDragEnd={onDragEnd}>
        <Table
          onChange={(...props) => {
            setShowPaginateReplica(props[3].currentDataSource.length === 0);
          }}
          className="rui-grid-table"
          size="small"
          scroll={{ x: true }}
          tableLayout="auto"
          showSorterTooltip={false}
          pagination={
            pagination && {
              defaultPageSize: DEFAULT_PAGE_SIZE,
              position: ['topRight', 'bottomCenter'],
              current: currentPage,
              onChange: handlePageChange,
              showTotal: total => `Tổng ${total} mục`,
              showSizeChanger: true,
            }
          }
          loading={loading}
          columns={colDef}
          dataSource={dataResult}
          rowKey="_id"
          expandedRowRender={expandRender}
          locale={{
            emptyText: 'Không có dữ liệu!',
          }}
          rowSelection={
            showSelection
              ? {
                  type: 'checkbox',
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
