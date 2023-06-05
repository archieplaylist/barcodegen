import QRCodeBarcodeGenerator from './QRCodeBarcodeGenerator';
// import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <QRCodeBarcodeGenerator />
      {/* <Footer /> */}
    </div>
  );
}
export default App;
