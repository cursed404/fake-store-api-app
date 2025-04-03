import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom' 
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'
import Header from './components/Header'
import AppRoutes from './routes'

const App = () => {
  return (
    <StrictMode>
      <Router> 
        <FilterProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 bg-gray-100">
                <AppRoutes />
              </main>
            </div>
          </CartProvider>
        </FilterProvider>
      </Router>
    </StrictMode>
  )
}

export default App