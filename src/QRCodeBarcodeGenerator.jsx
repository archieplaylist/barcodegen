import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { saveAs } from 'file-saver';

const QRCodeBarcodeGenerator = () => {
    const [text, setText] = useState('');
    const qrCodeRef = useRef(null);
    const barcodeRef = useRef(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handlePrintQRCode = () => {
        const qrCodeCanvas = document.getElementById('qrcode');
        const newWindow = window.open('', '_blank');
        newWindow.document.write("<html><head><style>" +
            "html { font-size: 0.75rem; font-family: monospace;}" +
            "svg  { display: block; margin: auto; margin-top: 0%; }" +
            "</style></head><body>" + qrCodeCanvas.innerHTML + "</body></html>");
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
    };

    const handlePrintBarcode = () => {
        const barcodeDiv = document.getElementById('barcode');
        const newWindow = window.open('', '_blank');
        newWindow.document.write("<html><head><style>" +
            "html { font-size: 0.75rem; font-family: monospace;}" +
            "svg  { display: block; margin: auto; }" +
            "</style></head><body>" + barcodeDiv.innerHTML + "</body></html>");
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
    };

    const handleSaveQRCode = () => {
        const qrCodeCanvas = qrCodeRef.current.querySelector('svg');
        const qrCodeData = new XMLSerializer().serializeToString(qrCodeCanvas);

        const blob = new Blob([qrCodeData], { type: 'image/svg+xml;charset=utf-8' });
        saveAs(blob, 'qrcode.svg');
    };

    const handleSaveBarcode = () => {
        const barcodeSVG = barcodeRef.current.querySelector('svg');
        const barcodeData = new XMLSerializer().serializeToString(barcodeSVG);

        const blob = new Blob([barcodeData], { type: 'image/svg+xml;charset=utf-8' });
        saveAs(blob, 'barcode.svg');
    };

    return (
        <div>
            {/* <h2 className='flex justify-center mb-4 text-2xl font-bold'>QR Code and Barcode Generator</h2> */}
            <div className='flex justify-center m-4'>
                <input className='p-2 text-center border rounded' type="text" placeholder='Input' value={text} onChange={handleTextChange} />
            </div>
            <div>
                <div className='flex justify-center gap-5 mb-4'>
                    <h3 className='flex items-center font-bold'>QR Code:</h3>
                    <div id="qrcode" className='qrcode' ref={qrCodeRef}>
                        {text && <QRCodeSVG value={text} />}
                    </div>
                    {text && (
                        <>
                            <button className='p-2 border rounded-lg hover:bg-green-600 hover:border-none hover:rounded-lg' onClick={handlePrintQRCode}>Print QR Code</button>
                            <button className='p-2 border rounded-lg hover:bg-green-600 hover:border-none hover:rounded-lg' onClick={handleSaveQRCode}>Save QR Code</button>
                        </>
                    )}
                </div>
                <div className='flex justify-center gap-5'>
                    <h3 className='flex items-center font-bold'>Barcode:</h3>
                    <div id="barcode" className='barcode' ref={barcodeRef}>
                        {text && <Barcode value={text} />}
                    </div>
                    {text && (
                        <>
                            <button className='p-2 border rounded-lg hover:bg-green-600 hover:border-none hover:rounded-lg' onClick={handlePrintBarcode}>Print Barcode</button>
                            <button className='p-2 border rounded-lg hover:bg-green-600 hover:border-none hover:rounded-lg' onClick={handleSaveBarcode}>Save Barcode</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeBarcodeGenerator;
