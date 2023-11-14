/**
 * get the file extension.
 * @param path file path
 */
export const getMediaExtension = (path: string): string => {
  return path.split(".").pop() as string;
};

/**
 * get the file's original name without ext.
 * @param fileName file name
 */
export const getMediaNameWithoutExt = (fileName: string): string => {
  if (!fileName) return "";
  const name = fileName.split(".");
  name?.pop();

  if (!name?.length) return "";
  return name.join(".");
};
