import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AcceptanceDialog from "../AcceptanceDialog";
import CollectionOfReceiptDialog from "../CollectionOfReceiptDialog";
import NoticeToProceedDialog from "../NoticeToProceedDialog";
import PostQualificationDialog from "../PostQualificationDialog";
import PurchaseOrderDialog from "../PurchaseOrderDialog";
import { styled } from "@mui/material/styles";

import { useHooks } from "./hooks";

export const steps = [
  {
    label: "Pre Bid",
  },
  {
    label: "Bidding",
  },
  {
    label: "Post Qualification",
  },
  {
    label: "Notice To Proceed",
  },
  {
    label: "Purchase Order",
  },

  {
    label: "Collection of Receipt",
  },
  {
    label: "Acceptance",
  },
];

interface StatusTrailProps {
  projectId: string;
  status: string;
  postQualificationResult: string;
  isNotDelivered: boolean;
}

interface PhaseItemStyledProps {
  isActive: boolean;
  isFirstPhase: boolean;
  isLastPhase: boolean;
  isClickable: boolean;
}

const sharedStyles = {
  top: 0,
  width: 0,
  height: 0,
  content: '" "',
  position: "absolute",
  borderTop: `19px solid transparent`,
  borderBottom: `17px solid transparent`,
};

const PhaseItem = styled(Box)<PhaseItemStyledProps>(
  ({
    theme: { palette, spacing },
    isActive,
    isFirstPhase,
    isLastPhase,
    isClickable,
  }) => {
    const edgeStyles = (color: string) => ({
      "&::before": {
        ...sharedStyles,
        zIndex: 0,
        left: 0,
        right: "auto",
        borderLeft: isFirstPhase ? "none" : "10px solid white",
      },
      "&::after": {
        ...sharedStyles,
        zIndex: 2,
        right: isLastPhase ? 0 : "-9.5px",
        width: "18px",
        backgroundColor: isActive ? palette.primary.main : color,
        clipPath: "polygon(0% 0%, 45% 0, 100% 50%, 45% 100%, 0% 100%)",
      },
    });

    return {
      backgroundColor: isActive ? palette.primary.main : palette.grey[400],
      color: isActive ? palette.common.white : palette.common.black,
      cursor: isClickable ? "pointer" : "not-allowed",
      minWidth: "100px",
      width: "auto",
      height: "36px",
      flex: 1,
      flexGrow: 1,
      float: "left",
      textAlign: "left",
      position: "relative",
      padding: spacing(1),
      paddingLeft: spacing(isFirstPhase ? 1 : 2),
      marginLeft: isFirstPhase ? 0 : "3px",
      borderRadius:
        (isFirstPhase && "3px 0 0 3px") || (isLastPhase && "0 3px 3px 0") || 0,
      ...edgeStyles(palette.grey[400]),
    };
  }
);

const StatusTrail = ({
  projectId,
  status,
  postQualificationResult,
  isNotDelivered,
}: StatusTrailProps) => {
  const {
    isAllowToUpdatePhase,
    findIndexByLabel,
    handleStatusUpdate,
    selectedPhaseName,
    openPostQualificationDialog,
    setOpenPostQualificationDialog,
    openNoticeToProceedDialog,
    setOpenNoticeToProceedDialog,
    openPurchaseOrderDialog,
    setOpenPurchaseOrderDialog,
    acceptanceDialog,
    setOpenAcceptanceDialog,
    collectionOfReceiptDialog,
    setOpenCollectionOfReceiptDialog,
    ref,
  } = useHooks({
    postQualificationResult,
    isNotDelivered,
  });

  return (
    <>
      <Box
        ref={ref}
        sx={{
          mt: 1,
          mb: 2,
          display: "flex",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey.300",
            borderRadius: "6px",
          },
          scrollbarWidth: "auto",
          scrollbarColor: "transparent",
        }}
      >
        {steps.map(({ label }, index) => (
          <Tooltip title={label} key={label}>
            <PhaseItem
              isFirstPhase={!index}
              isLastPhase={index + 1 === steps.length}
              isActive={index <= findIndexByLabel(status, steps)}
              isClickable={isAllowToUpdatePhase(
                findIndexByLabel(status, steps),
                index
              )}
              onClick={() => {
                if (
                  isAllowToUpdatePhase(findIndexByLabel(status, steps), index)
                ) {
                  handleStatusUpdate(label, projectId);
                }
              }}
            >
              <Typography
                fontSize={14}
                fontWeight={500}
                lineHeight={"20px"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {label}
              </Typography>
            </PhaseItem>
          </Tooltip>
        ))}
      </Box>

      <PostQualificationDialog
        status={selectedPhaseName}
        projectId={projectId}
        open={openPostQualificationDialog}
        handleClose={() => setOpenPostQualificationDialog(false)}
      />
      <NoticeToProceedDialog
        projectId={projectId}
        open={openNoticeToProceedDialog}
        status={selectedPhaseName}
        handleClose={() => setOpenNoticeToProceedDialog(false)}
      />
      <PurchaseOrderDialog
        projectId={projectId}
        status={selectedPhaseName}
        open={openPurchaseOrderDialog}
        handleClose={() => setOpenPurchaseOrderDialog(false)}
      />

      <CollectionOfReceiptDialog
        projectId={projectId}
        status={selectedPhaseName}
        open={collectionOfReceiptDialog}
        handleClose={() => setOpenCollectionOfReceiptDialog(false)}
      />

      <AcceptanceDialog
        projectId={projectId}
        status={selectedPhaseName}
        open={acceptanceDialog}
        handleClose={() => setOpenAcceptanceDialog(false)}
      />
    </>
  );
};

export default StatusTrail;
