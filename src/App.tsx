import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const App: React.FC = () => {
  const webcamRef: any = useRef(null);

  const time = 5; // ทุก 5 วินาที

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const response = await axios.post("http://localhost:3001/upload", {
          imageSrc,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

//   const [selectedFile, setSelectedFile]: any = useState(null);

//   const handleFileSelect = (event: any) => {
//     convertToBase64(event.target.files[0]);
//   };

//   const convertToBase64 = (file: any) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setSelectedFile(reader.result);
//     };
//     reader.onerror = (error) => {
//       console.log("Error converting to base64:", error);
//     };
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/upload",
//         {
//           imageSrc: selectedFile,
//         }
//       );
//       console.log("File uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
         if (webcamRef.current) {
              webcamRef.current.srcObject = stream;
         }
    })
    .catch((error) => console.error('Error accessing webcam:', error));
    const captureInterval = setInterval(captureImage, time * 1000)
    return () => {
         clearInterval(captureInterval);
         if (webcamRef.current && webcamRef.current.srcObject) {
              const tracks = webcamRef.current.srcObject.getTracks();
              tracks.forEach((track: any) => track.stop());
         }
    };
  }, []);

  return (
//     <div>
//       <input type="file" onChange={handleFileSelect} required />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
    <div>
         <Webcam
              audio={false}
              ref={webcamRef}
         />
    </div>
  );
};

export default App;
