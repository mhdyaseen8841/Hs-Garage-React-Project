import React, { useRef, useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Compressor from 'compressorjs';
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
            quality: 0.4,
            success: (compressedResult) => {

                console.log(compressedResult);
                getBase64(compressedResult).then((result) => {
                    setimgbase64(result);
                    console.log(localStorage.getItem('vId'));
                    console.log(result);
                    getProps.callback(result)
                  
                   



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
        <div sx={{ display: { xs: 'none', md: 'block' }}}>
            <i className="large material-icons" sx={{cursor: 'pointer'}} onClick={handleClick}><CameraAltIcon/></i>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                accept="images/*"
                capture="user"
                onChange={handleFileChange}
            /><br/>
            {imgPreview && <div style={{position: "relative",justifyContent:"center",alignItems:"center"}}> <img
                style={{width: 300, height: 'auto', objectFit: 'fill' }}
                id="blah"
                src={imgPreview}
                alt="your image"
            />
            </div> }
        </div>
    );
}

export default Camera;