import React from "react";
import { Drawer as AntDrawer, Button } from "antd";
import "./drawer.scss";

export interface DrawerProps {
  visible: boolean;
  onClose: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  title: string;
  footDef?: FootDef[];
  children: any;
  width?: number | string;
}

export interface FootDef {
  name: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  visible?: boolean;
  type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed";
  loading?: boolean;
}

export default function RDrawer(props: DrawerProps) {
  const { visible, onClose, title, footDef = [], children, width = '60vw' } = props;
  const footer =
    footDef.length &&
    footDef.map(({ name, onClick, visible = true, type, loading=false }: FootDef) => {
      return (
        <Button
          loading={loading}
          key={name}
          type={type}
          onClick={onClick}
          style={{ display: !visible ? "none" : "", margin: "0 5px" }}
        >
          {name}
        </Button>
      );
    });

  return (
    <AntDrawer
      width={width}
      visible={visible}
      onClose={onClose}
      title={title}
      footer={<div style={{ textAlign: "right" }}>{footer}</div>}
    >
      {children}
    </AntDrawer>
  );
}
