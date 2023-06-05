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
        <div className='w-full'>
            <div className='flex justify-center m-4'>
                <input className='w-full p-2 text-center border rounded-lg border-slate-400' type="text" placeholder='Input' value={text} onChange={handleTextChange} />
            </div>
            <div className='flex flex-row justify-center gap-10 overflow-x-auto'>
                <div className='flex flex-col justify-center gap-5'>
                    {/* <h3 className='flex justify-center font-bold'>QR CODE :</h3> */}
                    <div id="qrcode" className='qrcode' ref={qrCodeRef}>
                        {text && <QRCodeSVG value={text} />}
                    </div>
                    {text && (
                        <div className='flex flex-col gap-4 justify-evenly'>
                            <button className='p-2 border rounded-md shadow-inner hover:shadow-inner hover:bg-success hover:border-none hover:rounded-lg' onClick={handlePrintQRCode}>Print <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block w-6 h-6">
                                <path fillRule="evenodd"
                                    d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 9.375v-4.5zM4.875 4.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75A.75.75 0 016 7.5v-.75zm9.75 0A.75.75 0 0116.5 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 19.125v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875-.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM6 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm9.75 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm-3 3a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z"
                                    clipRule="evenodd" />
                            </svg></button>
                            <button className='p-2 border rounded-md shadow-inner hover:shadow-inner hover:bg-success hover:border-none hover:rounded-lg' onClick={handleSaveQRCode}>Save <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline-block w-6 h-6">
                                <path fillRule="evenodd"
                                    d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 9.375v-4.5zM4.875 4.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75A.75.75 0 016 7.5v-.75zm9.75 0A.75.75 0 0116.5 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 19.125v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875-.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM6 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm9.75 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm-3 3a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z"
                                    clipRule="evenodd" />
                            </svg></button>
                        </div>
                    )}
                </div>
                <div className='flex flex-col justify-center gap-5'>
                    {/* <h3 className='flex justify-center font-bold'>BARCODE :</h3> */}
                    <div id="barcode" className='barcode' ref={barcodeRef}>
                        {text && <Barcode value={text} />}
                    </div>
                    {text && (
                        <div className='flex flex-col gap-4 justify-evenly'>
                            <button className='p-2 border rounded-lg shadow-inner hover:bg-success hover:shadow-inner hover:border-none hover:rounded-lg' onClick={handlePrintBarcode}>Print <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" className='inline-block fill-current' viewBox="0 0 256 256"><path d="M224,48V208H32V48Z" opacity="0.2"></path><path d="M232,48V88a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h40A8,8,0,0,1,232,48ZM72,200H40V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16Zm152-40a8,8,0,0,0-8,8v32H184a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,224,160ZM32,96a8,8,0,0,0,8-8V56H72a8,8,0,0,0,0-16H32a8,8,0,0,0-8,8V88A8,8,0,0,0,32,96ZM80,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,80,80Zm104,88V88a8,8,0,0,0-16,0v80a8,8,0,0,0,16,0ZM144,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,144,80Zm-32,0a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,112,80Z"></path>
                            </svg></button>
                            <button className='inline-block p-2 border rounded-lg shadow-inner hover:bg-success hover:shadow-inner hover:border-none hover:rounded-lg' onClick={handleSaveBarcode}>Save <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" className='inline-block fill-current' viewBox="0 0 256 256"><path d="M224,48V208H32V48Z" opacity="0.2"></path><path d="M232,48V88a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h40A8,8,0,0,1,232,48ZM72,200H40V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16Zm152-40a8,8,0,0,0-8,8v32H184a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,224,160ZM32,96a8,8,0,0,0,8-8V56H72a8,8,0,0,0,0-16H32a8,8,0,0,0-8,8V88A8,8,0,0,0,32,96ZM80,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,80,80Zm104,88V88a8,8,0,0,0-16,0v80a8,8,0,0,0,16,0ZM144,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,144,80Zm-32,0a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,112,80Z"></path>
                            </svg></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeBarcodeGenerator;
