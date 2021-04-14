import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { HeaderType } from '.';
import { HEAD_DATA } from './HeadTemplate';
import * as AntIcon from '@ant-design/icons';

type Props = HeaderType & {
  selectedRows: any[];
  setSelectedRows: any;
};

export default function HeadButton(props: Props) {
  const {
    disabled = () => false,
    icon,
    onClick = () => {},
    type = 'create',
    name = HEAD_DATA[type].name,
    selection = HEAD_DATA[type].selection,
    confirm = HEAD_DATA[type].confirm,
    confirmMessage,
    loading = false,
    selectedRows,
    setSelectedRows,
  } = props;

  const isSingleSelectionError =
    selection === 'single' && selectedRows.length !== 1;

  const isMultipleSelectionError =
    selection === 'multiple' && selectedRows.length === 0;

  const isDisabled =
    isSingleSelectionError ||
    isMultipleSelectionError ||
    disabled(selectedRows);

  function confirmClick(cb: any) {
    Modal.confirm({
      title: confirmMessage || 'Chắc chưa?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => cb(selectedRows, setSelectedRows),
    });
  }

  const Icon = icon
    ? typeof icon === 'string'
      ? /* @ts-ignore */
        AntIcon[icon]
      : icon
    : /* @ts-ignore */
      AntIcon[HEAD_DATA[type].icon];

  return (
    <Button
      loading={loading}
      key={name}
      disabled={isDisabled}
      onClick={() =>
        confirm ? confirmClick(onClick) : onClick(selectedRows, setSelectedRows)
      }
      icon={Icon && <Icon />}
    >
      {name}
    </Button>
  );
}
