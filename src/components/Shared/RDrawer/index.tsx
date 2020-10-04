import React from "react";
import { Drawer as AntDrawer, Button } from "antd";
import "./drawer.scss";

export interface DrawerProps {
  visible: boolean;
  onClose: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  title: string;
  footDef?: FootDef[];
  children: any;
}

export interface FootDef {
  name: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  visible?: boolean;
  type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed";
}

export default function RDrawer(props: DrawerProps) {
  const { visible, onClose, title, footDef = [], children } = props;
  const footer =
    footDef.length &&
    footDef.map(({ name, onClick, visible = true, type }: FootDef) => {
      return (
        <Button
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
      width={600}
      visible={visible}
      onClose={onClose}
      title={title}
      footer={<div style={{ textAlign: "right" }}>{footer}</div>}
    >
      {children}
    </AntDrawer>
  );
}
