import { generateComponents } from "@uploadthing/react";

import { OurFileRouter } from "../../server/uploadthings";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
