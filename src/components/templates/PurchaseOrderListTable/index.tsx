import { PurchaseOrderStatus } from ".prisma/client";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { PurchaseOrders, useHooks } from "./hooks";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import { Link } from "@/components/parts/Link/Link";

const PurchaseOrderListTable = () => {
  const { orders, router, isLoading } = useHooks();

  if (isLoading) return <Loading />;

  const columns: GridColDef<PurchaseOrders>[] = [
    {
      field: "purchaseOrderNumber",
      headerName: "Purchase Order #",
      width: 300,
      minWidth: 200,
      renderCell: (params) => (
        <Link
          href={`/order-management/${params.row.id}`}
          sx={{ textDecoration: "underline", color: "inherit" }}
        >
          {params.row.purchaseOrderNumber}
        </Link>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      minWidth: 150,
      valueGetter: ({ row }) => row.status,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={
            params.row.status !== PurchaseOrderStatus.Delivered
              ? "warning"
              : "success"
          }
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Order Created",
      width: 200,
      minWidth: 150,
      valueGetter: ({ row }) =>
        format(new Date(row.deliveredAt || new Date()), "yyyy-mm-dd"),
    },
    {
      field: "deliveredAt",
      headerName: "Date Delivered",
      width: 658,
      minWidth: 150,
      renderCell: (params) =>
        format(new Date(params.row.deliveredAt || new Date()), "yyyy-mm-dd"),
    },
    {
      field: "Action",
      type: "actions",
      align: "right",
      width: 100,
      minWidth: 60,
      getActions: (params) => getActionMenu(params),
    },
  ];

  const getActionMenu = (params: GridRowParams): JSX.Element[] => {
    return [
      <MoreVertMenu
        key={params.row.id}
        options={[
          {
            label: "View",
            onClick: () => router.push(`/order-management/${params.row.id}`),
          },
        ]}
      />,
    ];
  };

  return (
    <DataGrid
      rows={orders}
      columns={columns}
      getRowId={(row: PurchaseOrders) => row.id}
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-columnHeadersInner": {
          backgroundColor: "grey.200",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
        },
      }}
    />
  );
};

export default PurchaseOrderListTable;
