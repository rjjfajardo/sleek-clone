import Link from "@/components/parts/Link";
import Loading from "@/components/parts/Loading";
import MoreVertMenu from "@/components/parts/MoreVertMenu";
import { formatToPhp } from "@/lib/formatToPhp";
import { getPriorityColor } from "@/lib/getColor";
import { Avatar, AvatarGroup, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FindAllProject, useHooks } from "./hooks";
import { format } from "date-fns";

const ArchiveProjectListTable = () => {
  const { rows, router } = useHooks();

  if (!rows) return <Loading />;

  const columns: GridColDef<FindAllProject>[] = [
    {
      field: "title",
      headerName: "Title",
      width: 400,
      minWidth: 200,
      editable: true,
      renderCell: (params) => params.row.title,
    },
    {
      field: "referenceNumber",
      headerName: "Reference Number",
      width: 200,
      minWidth: 100,
    },
    {
      field: "approvedBudgetContract",
      headerName: "Budget",
      width: 150,
      minWidth: 100,
      renderCell: (params) => formatToPhp(params.row.approvedBudgetContract),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      minWidth: 100,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.row.priority}
          color={getPriorityColor(params.row.priority)}
        />
      ),
    },
    {
      field: "deletedAt",
      headerName: "Date Deleted",
      width: 310,
      minWidth: 150,
      renderCell: (params) =>
        format(new Date(params.row.deletedAt || new Date()), "yyyy-mm-dd"),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
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

export default ArchiveProjectListTable;
