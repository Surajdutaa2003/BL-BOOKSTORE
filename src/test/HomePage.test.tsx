import{render,screen} from "@testing-library/react";
import HomePage from "../pages/HomePage";
import '@testing-library/jest-dom'

jest.mock("../components/Navbar",()=>()=><div data-testid="navbar">Navbar</div>);
jest.mock("../components/BooksContainer",()=>()=><div data-testid="books-container">BooksContainer</div>)
jest.mock("../components/Footer",()=>()=><div data-testid="footer">Footer</div>)

describe("HomePage Component",()=>{
    test("renders Navbar,BooksContainer,and Footer",()=>{
        render(<HomePage/>);
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("books-container")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    })
})
