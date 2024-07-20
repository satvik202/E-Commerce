import Navbar from "../features/Navbar"
import ProductList from "../features/ProductList"

const Home = ()=>{
    return (
        <div>
            <Navbar>
                <ProductList/>
            </Navbar>
        </div>
    )
}

export default Home