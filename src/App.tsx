import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './404'
import Income_exp_statement from './reports/Income_exp_statement'
import DailyStatment from './reports/daily-statment'
import Student_list from './reports/student_list'



const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>hello home</h1>} />
        <Route path='/daily-statment' element={<DailyStatment />} />
        <Route path='/income_exp_statement' element={<Income_exp_statement />} />
        <Route path='/student_list' element={<Student_list />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App