import { User } from ".prisma/client";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { Avatar, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { UserWithProjectAssignee, useHooks } from "./hooks";

const StaffListTable = () => {
  const { users } = useHooks();

  const columns: GridColDef<UserWithProjectAssignee>[] = [
    {
      field: "fullName",
      headerName: "Name",
      width: 300,
      minWidth: 200,
      renderCell: (params) => (
        <Stack display="flex" flexDirection="row" gap={1} alignItems="center">
          <Avatar sx={{ height: 28, width: 28 }}>
            {params.row.fullName?.[0]}
          </Avatar>
          {params.row.fullName}
        </Stack>
      ),
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 300,
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      minWidth: 150,
      renderCell: (params) => params.row.role.toUpperCase(),
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 180,
      minWidth: 150,
      renderCell: (params) => params.row.contactNumber,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      minWidth: 150,
      renderCell: (params) =>
        format(new Date(params.row.createdAt), "yyyy-mm-dd"),
    },
    {
      field: "totalAssignProject",
      headerName: "Total Project",
      width: 230,
      minWidth: 100,
      renderCell: (params) => params.row.projectAssignee.length,
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
            label: "Edit",
            onClick: () => console.log(params.row.id),
          },
        ]}
      />,
    ];
  };

  return (
    <DataGrid
      rows={users}
      columns={columns}
      getRowId={(row: User) => row.userId}
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

export default StaffListTable;
