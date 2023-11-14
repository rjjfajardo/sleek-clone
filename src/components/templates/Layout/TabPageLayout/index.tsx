import Box from "@mui/material/Box";
import { ReactNode } from "react";

import { Tabs, TabType } from "@/components/parts/Tabs";

import { useHooks } from "./hooks";

type Props = {
  initialKey: string;
  children: ReactNode;
  tabs: TabType[];
  title: string;
};

export function TabPageLayout({ initialKey, children, tabs, title }: Props) {
  const { onSetTabKey } = useHooks({ tabs });

  return (
    <>
      <Tabs tabs={tabs} initialKey={initialKey} onSetKey={onSetTabKey} />
      <Box pt={2.5}>{children}</Box>
    </>
  );
}
