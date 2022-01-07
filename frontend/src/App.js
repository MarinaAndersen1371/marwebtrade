import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FranchiseInfoScreen from "./screens/FranchiseInfoScreen";
import FranchiseProductListScreen from "./screens/FranchiseProductListScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminProductEditScreen from "./screens/AdminProductEditScreen";
import AdminCustomerListScreen from "./screens/AdminCustomerListScreen";
import AdminCustomerEditScreen from "./screens/AdminCustomerEditScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminTicketListScreen from "./screens/AdminTicketListScreen";
import ManagerProductListScreen from "./screens/ManagerProductListScreen";
import ManagerProductEditScreen from "./screens/ManagerProductEditScreen";
import ManagerCustomerListScreen from "./screens/ManagerCustomerListScreen";
import ManagerCustomerEditScreen from "./screens/ManagerCustomerEditScreen";
import ManagerPrimeListScreen from "./screens/ManagerPrimeListScreen";
import ManagerFranchiseListScreen from "./screens/ManagerFranchiseListScreen";
import ManagerOrderListScreen from "./screens/ManagerOrderListScreen";
import ManagerOrderEditScreen from "./screens/ManagerOrderEditScreen";
import ManagerOrderReturnScreen from "./screens/ManagerOrderReturnScreen";
import ManagerInvoiceListScreen from "./screens/ManagerInvoiceListScreen";
import ManagerDeliveryListScreen from "./screens/ManagerDeliveryListScreen";
import ManagerDeviceListScreen from "./screens/ManagerDeviceListScreen";
import ManagerVoucherListScreen from "./screens/ManagerVoucherListScreen";
import ManagerTicketListScreen from "./screens/ManagerTicketListScreen";
import SupportTicketListScreen from "./screens/SupportTicketListScreen";
import SupportOrderListScreen from "./screens/SupportOrderListScreen";
import SupportOrderEditScreen from "./screens/SupportOrderEditScreen";
import SupportDeliveryListScreen from "./screens/SupportDeliveryListScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import ShippingScreen from "./screens/ShippingScreen";
import InvoiceAddressScreen from "./screens/InvoiceAddressScreen";
import SupportScreen from "./screens/SupportScreen";
import TicketScreen from "./screens/TicketScreen";
import MyOrderListScreen from "./screens/MyOrderListScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import CustomerTestScreen from "./screens/CustomerTestScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import InfoScreen from "./screens/InfoScreen";
import InfoGermanScreen from "./screens/InfoGermanScreen";
import InfoSpanishScreen from "./screens/InfoSpanishScreen";
import InfoRussianScreen from "./screens/InfoRussianScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderReturnRequestScreen from "./screens/OrderReturnRequestScreen";
import OrderReturnScreen from "./screens/OrderReturnScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import DeliveryNoteScreen from "./screens/DeliveryNoteScreen";
import DeviceProtectionScreen from "./screens/DeviceProtectionScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/cart' component={CartScreen} />
          <Route path='/customertest/:id' component={CustomerTestScreen} />
          <Route path='/ticket/:id' component={TicketScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/order/:id' component={OrderScreen} exact />
          <Route path='/invoice/:id' component={InvoiceScreen} exact />
          <Route
            path='/deliverynote/:id'
            component={DeliveryNoteScreen}
            exact
          />
          <Route path='/device/:id' component={DeviceProtectionScreen} exact />
          <Route
            path='/confirmreturn/:id'
            component={OrderReturnRequestScreen}
            exact
          />
          <Route
            path='/returnedorder/:id'
            component={OrderReturnScreen}
            exact
          />
          <Route
            path='/support/ticketlist'
            component={SupportTicketListScreen}
          />
          <Route path='/support/orderlist' component={SupportOrderListScreen} />
          <Route
            path='/support/deliverylist'
            component={SupportDeliveryListScreen}
          />
          <Route
            path='/support/order/:id/edit'
            component={SupportOrderEditScreen}
          />
          <Route path='/franchise/info' component={FranchiseInfoScreen} />
          <Route
            path='/franchise/productlist'
            component={FranchiseProductListScreen}
            exact
          />
          <Route
            path='/franchise/productlist/page/:pageNumber'
            component={FranchiseProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist'
            component={AdminProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/page/:pageNumber'
            component={AdminProductListScreen}
            exact
          />
          <Route
            path='/admin/product/:id/edit'
            component={AdminProductEditScreen}
          />
          <Route path='/admin/ticketlist' component={AdminTicketListScreen} />
          <Route path='/admin/orderlist' component={AdminOrderListScreen} />
          <Route
            path='/admin/customerlist'
            component={AdminCustomerListScreen}
          />
          <Route
            path='/admin/customer/:id/edit'
            component={AdminCustomerEditScreen}
          />
          <Route
            path='/manager/productlist'
            component={ManagerProductListScreen}
            exact
          />
          <Route
            path='/manager/productlist/page/:pageNumber'
            component={ManagerProductListScreen}
            exact
          />
          <Route
            path='/manager/product/:id/edit'
            component={ManagerProductEditScreen}
          />
          <Route
            path='/manager/ticketlist'
            component={ManagerTicketListScreen}
          />
          <Route path='/manager/orderlist' component={ManagerOrderListScreen} />
          <Route
            path='/manager/returnlist'
            component={ManagerOrderReturnScreen}
          />
          <Route
            path='/manager/order/:id/edit'
            component={ManagerOrderEditScreen}
          />
          <Route path='/manager/primelist' component={ManagerPrimeListScreen} />

          <Route
            path='/manager/franchiselist'
            component={ManagerFranchiseListScreen}
          />
          <Route
            path='/manager/invoicelist'
            component={ManagerInvoiceListScreen}
          />
          <Route
            path='/manager/deliverylist'
            component={ManagerDeliveryListScreen}
          />
          <Route
            path='/manager/devicelist'
            component={ManagerDeviceListScreen}
          />
          <Route
            path='/manager/voucherlist'
            component={ManagerVoucherListScreen}
          />
          <Route
            path='/manager/customerlist'
            component={ManagerCustomerListScreen}
          />
          <Route
            path='/manager/customer/:id/edit'
            component={ManagerCustomerEditScreen}
          />
          <Route path='/myorders' component={MyOrderListScreen} />
          <Route path='/support' component={SupportScreen} exact />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/invoiceaddress' component={InvoiceAddressScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/subscription' component={SubscriptionScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/contact' component={ContactScreen} />
          <Route path='/info' component={InfoScreen} />
          <Route path='/infogerman' component={InfoGermanScreen} />
          <Route path='/infospanish' component={InfoSpanishScreen} />
          <Route path='/inforussian' component={InfoRussianScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
