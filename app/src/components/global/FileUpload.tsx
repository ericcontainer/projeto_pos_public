import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";

const FileUpload = () => {
  const [imageUrl, setImageUrl] = useState<Array<any>>();

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const file = event?.target.files;
    // const urlsImage = new Array<any>();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      //console.log(fileReader.result);
      setImageUrl([fileReader.result]);
    };

    // if (file != null) {
    //   for (let index = 0; index < file.length; index++) {
    //     new FileReader().onloadstart = (f) => {
    //       const element = file[index];
    //       urlsImage.push(f.target?.readAsDataURL(element));
    //     };
    //   }
    //   console.log(urlsImage);
    // }
    file && fileReader.readAsDataURL(file[0]);
    // imageUrl?.forEach((f, i) => {
    //   fileReader.readAsDataURL(file[i]);
    //   urlsImage.push(fileReader.result);
    // });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ mt: 2, mb: 2 }}
    >
      <label htmlFor="upload-image">
        <Button variant="contained" component="span">
          <PhotoCamera sx={{ marginRight: "10px" }} /> Upload
        </Button>
        <input
          id="upload-image"
          hidden
          accept="image/jpeg"
          type="file"
          onChange={handleFileUpload}
        />
      </label>
      <Box sx={{ borderColor: "black", borderStyle: "solid" }}>
        {imageUrl?.map((i) => (
          <img width="30%" height="30%" src={i} alt="Uploaded Image" />
        ))}
      </Box>
    </Stack>
  );
};
export default FileUpload;
