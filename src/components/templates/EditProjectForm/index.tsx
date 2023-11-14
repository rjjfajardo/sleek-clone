import FileDropzone from "@/components/parts/FileDropzone";
import FormBase from "@/components/parts/FormBase";
import SelectInput from "@/components/parts/SelectInput";
import TextInput from "@/components/parts/TextInput/index";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { useHooks } from "./hooks";

const EditProjectForm = ({
  projectId,
  setEditing,
}: {
  projectId: string;
  setEditing: () => void;
}) => {
  const { control, onSubmit } = useHooks({ projectId, setEditing });

  return (
    <FormBase onSubmit={onSubmit}>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} lg={6} zeroMinWidth>
          <TextInput
            name="title"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Title"
          />
          <TextInput
            name="procuringEntity"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Procuring Entity"
          />
          <TextInput
            name="referenceNumber"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Reference Number"
          />
          <TextInput
            name="areaOfDelivery"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Area of Delivery"
          />
          <TextInput
            name="approvedBudgetContract"
            control={control}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Approve Budget Contract"
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <TextInput
              name="contractDuration"
              control={control}
              formControlProps={{ sx: { mb: 3 } }}
              label="Contract Duration"
            />
            <Typography color="#000000">Day/s</Typography>
          </Box>
          <SelectInput
            name="procurementMode"
            control={control}
            options={[
              { id: "Negotiate Procurement", label: "Negotiate Procurement" },
              {
                id: "Small Value Procurement",
                label: "Small Value Procurement",
              },
              { id: "Public Bidding", label: "Public Bidding" },
            ]}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Procurement Mode"
          />
          <SelectInput
            name="priority"
            control={control}
            options={[
              { id: "High", label: "High" },
              { id: "Medium", label: "Medium" },
              { id: "Low", label: "Low" },
            ]}
            formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
            label="Priority"
          />

          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ width: 150 }}
            >
              Save Changes
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormBase>
  );
};

export default EditProjectForm;
