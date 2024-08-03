import AdminOrders from "../features/Admin/AdminOrders";
import Navbar from "../features/Navbar";

function AdminOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
     );
}

export default AdminOrdersPage;