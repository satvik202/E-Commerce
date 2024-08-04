import Navbar from "../features/Navbar";
import AdminProductList from "../features/Admin/AdminProductList"
import Footer from "../features/Footer";
function AdminHome() {
    return ( 
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default AdminHome;