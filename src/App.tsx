import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './404'
import DailyStatment from './reports/daily-statment'



const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>hello home</h1>} />
        <Route path='/daily-statment' element={<DailyStatment />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App