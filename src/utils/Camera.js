import React, { useRef, useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Compressor from 'compressorjs';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from "@mui/material";
import { flexbox } from "@mui/system";

const Camera = (getProps) => {
    const inputRef = useRef(null);
    const [imgPreview, setImgPreview] = useState();
    const [imgbase64, setimgbase64] = useState('');
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };


     const getBase64 = (file) => {
        console.log('');
        return new Promise((resolve) => {
          // Make new FileReader
          const reader = new FileReader();
          // Convert the file to base64 text
          reader.readAsDataURL(file);
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            // console.log('Called', reader);
            let baseURL = '';
            baseURL = reader.result;
            // console.log(baseURL);
            resolve(baseURL);
          };
        });
      };
      
     

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setImgPreview(URL.createObjectURL(event.target.files[0]))
        new Compressor(event.target.files[0], {      
            quality: 0.1,
            success: (compressedResult) => {
                getBase64(compressedResult).then((result) => {
                    setimgbase64(result);
                    getProps.callback(result)
                    setImgPreview();

                    // setImageDetails([
                    //   {
                    //     base64: result,
                    //     type: acceptedFiles[0].type,
                    //     name: acceptedFiles[0].name,
                    //     size: acceptedFiles[0].size
                    //   }
                    // ]);
                  }).catch((err) => {
                  console.log("error", err);
                })
            },
          });

       

        // document.getElementById('blah').src = URL.createObjectURL(event.target.files[0]);
        // console.log('fileObj is', fileObj);
    };
    return (
      // <Stack sx={{ display: { xs: 'flex', md: 'none' }}} direction="row"> // for mobileview
        <Stack direction="row" >
            <CameraAltIcon sx={{cursor: 'pointer'}} onClick={handleClick}/>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                accept="images/*"
                capture="user"
                onChange={handleFileChange}
            />
            {getProps.status ? <CheckCircleSharpIcon style={{ color: "green" }}/>  : <CancelIcon style={{ color: "red" }} />}
        </Stack>
    );
}

export default Camera;