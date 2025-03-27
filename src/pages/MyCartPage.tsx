import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyCartContainer from '../components/MyCartContainer'
import AddressCart from '../components/AddressCart'
import OrderSummary from '../components/OrderSummary'
import { useState } from 'react'

function MyCartPage() {
    const [isContinueClicked, setIsContinueClicked] = useState(false);

    return (
        <div>
            <Navbar />
            <MyCartContainer setIsContinueClicked={setIsContinueClicked} />
            <AddressCart isContinueClicked={isContinueClicked} />
            <OrderSummary />
            <Footer />
        </div>
    )
}

export default MyCartPage