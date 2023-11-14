import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CircleIcon from "@mui/icons-material/Circle";

// import Chip from "@mui/material/Chip";

const AssignedProjectTable = () => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      minWidth: 100,
    },
    {
      field: "referenceNumber",
      headerName: "Reference Number",
      width: 200,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 200,

      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{ backgroundColor: "#FF0000", color: "#ffffff", py: 1, px: 2 }}
        >
          {params.row.priority}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" gap={1} alignItems="center">
          <CircleIcon sx={{ fontSize: 8, color: "#18DB07" }} />
          {params.row.status}
        </Box>
      ),
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 200,
      editable: true,
      renderCell: (params) => <Avatar>{params.row.assignee[0]}</Avatar>,
    },
  ];

  const rows = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      referenceNumber: "RF12335",
      priority: "High",
      status: "NTP",
      assignee: "RJ",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      referenceNumber: "RF12335",
      priority: "High",
      status: "NTP",
      assignee: "RJ",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      referenceNumber: "RF12335",
      priority: "High",
      status: "NTP",
      assignee: "RJ",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      referenceNumber: "RF12335",
      priority: "High",
      status: "NTP",
      assignee: "RJ",
    },
  ];
  return (
    <Stack
      border={1}
      boxShadow={1}
      borderRadius={1}
      color="#f5f5f5"
      p={2}
      width="100%"
    >
      <DataGrid
        // sx={{ m: 2 }}
        rowHeight={80}
        rows={rows}
        columns={columns}
        // initialState={{
        //   pinnedColumns: { right: ['actions'] },
        // }}
        //pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Stack>
  );
};

export default AssignedProjectTable;
