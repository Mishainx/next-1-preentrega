import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/ui/Footer/Footer'
import { CartProvider } from './components/context/CartContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/context/AuthContext';
import Header from './components/ui/Header/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce',
  description: 'Tienda de mate',
  icons:{
    icon:"/favicon.png",
    apple:"/favicon.png"
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header/>
            {children}
            <Footer/>
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    
    </html>
  )
}
