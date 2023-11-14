import FormBase from "@/components/parts/FormBase";
import PageTitle from "@/components/parts/PageTitlte";
import TextInput from "@/components/parts/TextInput";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DateInput from "@/components/parts/DateInput";
import InputLabel from "@/components/parts/InputLabel";
import Loading from "@/components/parts/Loading";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useHooks } from "./hooks";
const Profile = () => {
  const {
    control,
    onSubmitChangePassword,
    showPassword,
    handleClickShowPassword,
    onSubmitUpdateProfile,
    isChangePasswordOnly,
    setIsChangePasswordOnly,
    isLoading,
  } = useHooks();

  if (isLoading) return <Loading />;

  return (
    <>
      <PageTitle title="Profile" />
      <Stack
        height="auto"
        boxShadow={1}
        borderRadius={1}
        sx={{ backgroundColor: "#ffffff" }}
        p={2}
      >
        <FormBase onSubmit={onSubmitUpdateProfile}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} lg={6} zeroMinWidth>
              <TextInput
                name="fullName"
                control={control}
                formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
                label="Full Name"
              />
              <TextInput
                name="email"
                control={control}
                formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12} lg={6} zeroMinWidth>
              <Stack direction="column" mb={3}>
                <InputLabel>Date of Birth</InputLabel>

                <DateInput label="" control={control} name="dob" />
              </Stack>
              <TextInput
                name="contactNumber"
                control={control}
                formControlProps={{ fullWidth: true, sx: { mb: 3 } }}
                label="Contact Number"
              />
              <Stack direction="row" gap={2} mt={5} justifyContent="flex-end">
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
      </Stack>
      <Stack
        my={3}
        boxShadow={1}
        borderRadius={1}
        sx={{ backgroundColor: "#ffffff" }}
        p={2}
      >
        <Stack direction="column">
          <Typography fontWeight={700} color="red" ml={2} my={2}>
            Change Password
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Checkbox
              checked={isChangePasswordOnly}
              onChange={() => setIsChangePasswordOnly(!isChangePasswordOnly)}
            />
            <Typography variant="caption">
              Check this portin if you only need to update password
            </Typography>
          </Box>
        </Stack>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} lg={6} zeroMinWidth>
            <FormBase onSubmit={onSubmitChangePassword}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <>
                    <InputLabel>New Password</InputLabel>
                    <TextField
                      disabled={!isChangePasswordOnly}
                      helperText={error?.message ?? undefined}
                      fullWidth
                      name="password"
                      value={value}
                      error={invalid}
                      onChange={(value) => onChange(value)}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      sx={{ mb: 3 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              />
              <Stack direction="row" width="100%">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={!isChangePasswordOnly}
                >
                  Change Password
                </Button>
              </Stack>
            </FormBase>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default Profile;
