// import { BsArrowLeftSquareFill, BsPrinterFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { BiArrowFromRight, BiSolidDownload } from 'react-icons/bi';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import PrintDownloadData from "../features/PrintDownloadData";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import MyModal from '../features/MyModal';
import { useNavigate } from 'react-router-dom';
import { AiFillPrinter } from 'react-icons/ai';

function FlashCardPage({ selectedGroupId, activeGroupName, activeGroupDesc }) {
  const [cards, setCards] = useState([]);
  const navigateBack = useNavigate();

  useEffect(() => {
    const cardsList = JSON.parse(localStorage.getItem("cards"));
    if (cardsList) {
      setCards(cardsList);
    }
  }, []);

  const [cardIndex, setCardIndex] = useState(0);
  const filteredGroupCards = cards.filter(
    (card) => card.groupId === selectedGroupId
  );
  const isDataAvailable =
    filteredGroupCards.length > 0 &&
    cardIndex >= 0 &&
    cardIndex < filteredGroupCards.length;

  const handleDownload = async () => {
    const pdfContent = <PrintDownloadData filteredGroupCards={filteredGroupCards} activeGroupName={activeGroupName} activeGroupDesc={activeGroupDesc} />;
    const blob = await pdf(pdfContent).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
    saveAs(blob, `${activeGroupName}-flashCards.pdf`);
  };

  const handlePrint = async () => {
    const printContent = <PrintDownloadData filteredGroupCards={filteredGroupCards} />;
    const blob = await pdf(printContent).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl);

    if (printWindow) {
      printWindow.print();
    }
  };

  const [showShareModal , setShowShareModal] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="p-5 flex flex-col lg:flex-row items-center gap-x-2">
        <BiArrowFromRight size={30} className='cursor-pointer' onClick={() => navigateBack(-1)} />
        <div className="text-center lg:text-left">
        <h2 className="font-black text-xl  break-all lg:break-normal">
            {activeGroupName}
          </h2>
          <p className="break-all">{activeGroupDesc}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-2">
        
        <div className="w-full lg:w-1/5 bg-gray-50 p-2 break-words">
        <div className='font-semibold text-lg mb-3 border-b-[5px] border-red-700 text-center rounded-lg'>Flashcards ({filteredGroupCards.length})</div>
          {filteredGroupCards.map((card, index) => (
            <div
              key={index}
              id={index}
              onClick={() => setCardIndex(index)}
              className={`cursor-pointer hover:text-red-500 font-semibold hover:font-bold py-1 ${index === cardIndex ? 'text-red-500 font-bold border-r-4 border-red-500 ' : 'text-gray-900'}`}
            >
              {card.cardName}
            </div>
          ))}
        </div>

        <div className="p-5 w-full lg:w-3/5 break-words flex flex-col md:flex-row bg-gray-50">
          <div className="w-full md:w-1/2">
            <img
              src={filteredGroupCards[cardIndex]?.cardImage?.cardImageURL}
              alt="Group Image"
              className="w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 min-h-[350px]">
            <p className="w-full text-gray-500 font-bold p-2">
              {isDataAvailable
                ? filteredGroupCards[cardIndex].cardDescription
                : 'No card selected or data unavailable'}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:w-1/5 text-gray-600 font-bold">
          <button className="bg-gray-50 py-1 flex w-full mb-2" type="button" onClick={() => setShowShareModal(true)}>
            <FaShare size={40} className="pl-5" /> <span className="pl-4 mt-2">Share</span>
          </button>

          <button className="bg-gray-50 py-1 flex w-full mb-2" type="button" onClick={handleDownload}>
            <BiSolidDownload size={45} className="pl-5" /> <span className="pl-4 mt-2">Download</span>
          </button>

          <button className="bg-gray-50 py-1 flex w-full mb-2" type="button" onClick={handlePrint}>
            <AiFillPrinter size={44} className="pl-6" /> <span className="pl-4 mt-2">Print</span>
          </button>
        </div>
      </div>

      {showShareModal ? <MyModal setShowShareModal={setShowShareModal}/> : null}
      <div className="flex justify-center items-center mt-2">
              <span className="cursor-pointer" onClick={() => (cardIndex > 0 ? setCardIndex(cardIndex - 1) : null)}>
                <FaLessThan />
              </span>
              <span className="mx-2">{cardIndex + 1} / {filteredGroupCards.length}</span>
              <span className="cursor-pointer" onClick={() => (cardIndex < filteredGroupCards.length - 1 ? setCardIndex(cardIndex + 1) : null)}>
                <FaGreaterThan />
              </span>
            </div>
    </div>
  );
}

export default FlashCardPage;

