import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

interface Props {
  mobileHandleCloseDrawer: (close: boolean) => void;
  activityLog: {
    user: {
      fullName: string;
    };
    after: {
      values: {
        message: string;
        info?: string;
      }[];
    };
    createdAt: string;
  }[];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ActivityLogsDrawer = ({
  mobileHandleCloseDrawer,
  activityLog,
}: Props) => {
  return (
    <Stack fontSize={20} fontWeight={600}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Activity Logs
      </Box>
      <Divider sx={{ marginTop: 1 }} />

      <Stack overflow="auto" maxHeight={500}>
        {activityLog.map((log) => (
          <>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" gap={1} mt={2}>
                <Avatar>{log.user.fullName[0]}</Avatar>
                <Typography fontWeight={600}>{log.user.fullName}</Typography>
                <Typography fontWeight={300}>
                  {log.after.values.map((a) => a.message)}
                </Typography>

                {log.after.values.map((a) =>
                  a.info ? (
                    <Typography fontWeight={600} key={a.info}>
                      ({a.info})
                    </Typography>
                  ) : (
                    <></>
                  )
                )}
              </Box>
              <Typography ml={6} fontSize={14} mt={-2.5}>
                {format(new Date(log.createdAt), "MM/dd/yyyy EEEE HH:mm bbbb")}
              </Typography>
            </Box>
          </>
        ))}
      </Stack>
    </Stack>
  );
};
export default ActivityLogsDrawer;
