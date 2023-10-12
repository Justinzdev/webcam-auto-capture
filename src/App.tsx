import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'

const App: React.FC = () => {
     const webcamRef: any = useRef(null)

     const time = 5 // ทุก 5 วินาที

     const captureImage = async () => {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
               try {
                    const response = await axios.post('http://localhost:3001/upload', { imageSrc });
                    console.log(response.data);
               } catch (error) {
                    console.error('Error uploading image:', error);
               }
          }
     }  

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
          <div>
               <Webcam
                    audio={false}
                    ref={webcamRef}
               />
          </div>
     );
}

export default App