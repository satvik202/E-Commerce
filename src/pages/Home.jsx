import Footer from "../features/Footer"
import Navbar from "../features/Navbar"
import ProductList from "../features/ProductList"

const Home = ()=>{
    return (
        <div>
            <Navbar>
                <ProductList/>
            </Navbar>
            <Footer></Footer>
        </div>
    )
}

export default Home