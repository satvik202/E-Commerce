import Navbar from "../features/Navbar";
import ProductForm from "../features/Admin/ProductForm"
function AdminProductFormPage() {
    return ( 
        <div>
            <Navbar>
                <ProductForm></ProductForm>
            </Navbar>
        </div>
     );
}

export default AdminProductFormPage;