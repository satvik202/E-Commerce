import Navbar from "../features/Navbar";
import AdminProductList from "../features/Admin/AdminProductList"
function AdminHome() {
    return ( 
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
     );
}

export default AdminHome;