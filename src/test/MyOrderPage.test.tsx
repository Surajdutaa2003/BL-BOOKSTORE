import react from 'react';
import { screen,render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from '../components/Footer'
import MyOrderPage from '../pages/MyOrderPage'

jest.mock("../components/Footer",()=>()=><div data-testid="footer">footer</div>)
jest.mock("../components/Navbar",()=>()=><div data-testid="navbar">navbar</div>)

describe("myOrderPage",()=>{
    test("render components in order page",()=>{
      render(
        <MyOrderPage/>
      )
      expect(screen.getByTestId("navbar")).toBeInTheDocument()
      expect(screen.getByTestId("footer")).toBeInTheDocument()
    })
})