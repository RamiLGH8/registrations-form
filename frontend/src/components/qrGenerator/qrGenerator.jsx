import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import './qrGenerator.css';
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";
export const QrGenerator = () => {
    const location = useLocation();
    const [qrId, setQrId] = useState('');


    useEffect(() => {
        fetch(`http://localhost:4000/api/users/${location.state.email}`)
            .then(response => response.json())
            .then(data => {
                setQrId(data.userId);
                console.log(data.userId);
            })
            .catch(error => {
                console.error('Error fetching QR ID:', error);
            });
    }, []);
    const QrCodeDownload = async () => {
        const canvas = await (
          await html2canvas(document.getElementById("canvas"))
        ).toDataURL();
    
        if (canvas) {
         
          const a = document.createElement("a");
          a.download = "QrCode.png";
          a.href = canvas;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      };
    return (
        <div id='qrGenerator'>
            <h1>QR Code Generator</h1>
            <div id='canvas'>
            <QRCode
                size={400}
                value={qrId}
                viewBox="0 0 256 256"
            />
            </div>
          
            <button onClick={QrCodeDownload}>Download</button>
        </div>
    );
}

export default QrGenerator;
