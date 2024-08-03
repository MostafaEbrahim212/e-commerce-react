import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import './globals.css'

export default function Layout({ children }) {
  return (
    <>
      <html>
        <body className='w-full h-full flex flex-col font-thin transition-all duration-200'>
          <Navbar />
          <main className='flex-grow'>
            <div><Toaster /></div>
            {children}</main>
        </body>
      </html>
    </>
  );
}
