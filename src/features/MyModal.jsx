
import { useRef, useState } from 'react';
import { AiFillCloseCircle, AiFillCopy, AiOutlineShareAlt, AiFillFacebook, AiFillLinkedin, AiOutlineWhatsApp, AiFillMail, AiFillTwitterSquare, AiFillCheckCircle } from 'react-icons/ai';

function MyModal({ setShowShareModal }) {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef(null);
  const currentURL = window.location.href;

  const handleCopy = () => {
    setCopied(true);
    copyRef.current?.select();
    copyRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(currentURL);
  };

  return (
    <div className='h-screen w-screen fixed inset-0 bg-black bg-opacity-50 backdrop-blur-none flex justify-center items-center'>
      <div className='bg-white w-full max-w-[500px] h-[30%] md:w-[60%] lg:w-[40%] rounded-md'>
        <div className='flex justify-end mt-2 pr-2'>
          <AiFillCloseCircle className='text-gray-800 cursor-pointer hover:text-red-800' size={25} onClick={() => setShowShareModal(false)} />
        </div>
        <div className='mt-5 '>
          <span className='ml-10 text-xl font-bold'>Share</span>
          <div className='flex justify-center px-8 mt-3 '>
            <div className='flex gap-x-4 py-1 px-4 border-blue-500 border-dashed border-[3px] rounded-md'>
              <span className='text-lg'>Link:</span>
              <input type="text" className='focus:outline-none' readOnly ref={copyRef} value={currentURL} />
            </div>
            {!copied ? <AiFillCopy size={30} className='ml-8 mt-1 cursor-pointer' onClick={handleCopy} /> : <AiFillCheckCircle size={30} className='ml-8 mt-1' />}
            <AiOutlineShareAlt size={30} className='ml-2 mt-1' />
          </div>

          <div className='flex justify-center mt-7 gap-x-10'>
            <a href='https://facebook.com' target='_blank' className='bg-gray-300 hover:bg-gray-400 rounded-md p-1 cursor-pointer'><AiFillFacebook size={30} /></a>
            <a href='https://linkedin.com' target='_blank' className='bg-gray-300 hover:bg-gray-400 rounded-md p-1 cursor-pointer'><AiFillLinkedin size={30} /></a>
            <a href='https://web.whatsapp.com' target='_blank' className='bg-gray-300 hover:bg-gray-400 rounded-md p-1 cursor-pointer'><AiOutlineWhatsApp size={30} /></a>
            <a href='https://twitter.com' target='_blank' className='bg-gray-300 hover:bg-gray-400 rounded-md p-1 cursor-pointer'><AiFillTwitterSquare size={30} /></a>
            <a href='mailto:amrishkush@gmail.com' target='_blank' className='bg-gray-300 hover:bg-gray-400 rounded-md p-1 cursor-pointer'><AiFillMail size={30} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModal;
