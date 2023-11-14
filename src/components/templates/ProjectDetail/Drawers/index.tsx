import { getColor } from "@/lib/getColor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Drawer, IconButton, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import AttachmentsDrawer from "../Attachments";

type DrawerButton = {
  key: string;
  icon: JSX.Element;
  drawerContent: JSX.Element;
};

const ProjectDetailDrawers = ({
  priority,
  projectId,
  comments,
  activityLog,
  media,
}: {
  priority: string;
  projectId: string;
  comments: {
    user: {
      fullName: string;
    };
    createdAt: string;
    text: string;
  }[];
  activityLog: {
    user: {
      fullName: string;
    };
    after: {
      values: {
        message: string;
      }[];
    };
    createdAt: string;
  }[];
  media: {
    fileName: string;
    fileUrl: string;
    origin: string;
  }[];
}) => {
  const [selectedButton, setSelectedButton] = useState<DrawerButton | null>(
    null
  );

  const handleButtonClick = (button: DrawerButton) => {
    setSelectedButton(button);
  };

  const handleCloseDrawer = () => {
    setSelectedButton(null);
  };

  const drawerButtons: DrawerButton[] = [
    // {
    //   key: "Comments",
    //   icon: <CommentIcon fontSize="inherit" />,
    //   drawerContent: (
    //     <CommentsDrawer
    //       mobileHandleCloseDrawer={handleCloseDrawer}
    //       projectId={projectId}
    //       comments={comments}
    //     />
    //   ),
    // },
    {
      key: "Uploads",
      icon: <CloudUploadIcon fontSize="inherit" />,
      drawerContent: (
        <AttachmentsDrawer
          mobileHandleCloseDrawer={handleCloseDrawer}
          projectId={projectId}
          media={media}
        />
      ),
    },
    // {
    //   key: "Activity Logs",
    //   icon: <AvTimerIcon fontSize="inherit" />,
    //   drawerContent: (
    //     <ActivityLogsDrawer
    //       mobileHandleCloseDrawer={handleCloseDrawer}
    //       activityLog={activityLog}
    //     />
    //   ),
    // },
  ];

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box
        sx={{
          backgroundColor: getColor(priority),
          fontSize: 18,
          fontWeight: 700,
          color: "#ffffff",
          width: "fit-content",
          padding: 0.5,
        }}
      >
        {priority}
      </Box>
      <Box mt={1} display="flex" gap={3}>
        {drawerButtons.map((button) => (
          <>
            <Tooltip title={button.key}>
              <IconButton
                key={button.key}
                size="small"
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#246BFD",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#246BFD",
                  },
                }}
                onClick={() => handleButtonClick(button)}
              >
                {button.icon}
              </IconButton>
            </Tooltip>
          </>
        ))}
        <Drawer
          anchor="right"
          open={selectedButton !== null}
          onClose={handleCloseDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 500,
              pt: 12,
              px: 2,
            },
          }}
        >
          {selectedButton?.drawerContent}
        </Drawer>
      </Box>
    </Stack>
  );
};

export default ProjectDetailDrawers;
