import { render, screen } from "@testing-library/react";
import BookPage from "../pages/BookPage";
import Navbar from "../components/Navbar";
import BookPageContainer from "../components/BookPageContainer";
import Footer from "../components/Footer";
import '@testing-library/jest-dom';

jest.mock("../components/Navbar",()=>()=><div data-testid="navbar">Navbar</div>);
jest.mock("../components/BookPageContainer",()=>()=><div data-testid="book-container">BookPageContainer</div>);
jest.mock("../components/Footer",()=>()=><div data-testid="footer">Footer</div>)


describe("BookPage Component",()=>{
    test("renders Navbar,BookPageCOntainer,and Footer",()=>{
        render(<BookPage/>);

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("book-container")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    })
})