import createRequestsRepository from './requests'
import {useAuthStore} from "@/stores/auth";

export default {
    install: (app) => {
        let authStore = useAuthStore()
        const repositories = {
            sendConfirmationCodeToBoth: createRequestsRepository(app, 'Account/SendConfirmationCodeToBoth', authStore),
            signUp: createRequestsRepository(app, 'Account/SignUp', authStore),
            signIn: createRequestsRepository(app, 'Account/SignIn', authStore),
            forgetPassword: createRequestsRepository(app, 'Account/ForgotPassword', authStore),
            getUserById: createRequestsRepository(app, 'User/Get', authStore),
            getUserByToken: createRequestsRepository(app, 'User/GetById', authStore),
            updateUser: createRequestsRepository(app, 'User/Update', authStore),
            updateUserByAdmin: createRequestsRepository(app, 'User/UpdateByAdmin', authStore),
            getAllOrders: createRequestsRepository(app, 'Order/GetAll', authStore),
            createOrder: createRequestsRepository(app, 'Order/Create', authStore),
            getOrderDetail: createRequestsRepository(app, 'Order/Get', authStore),
            changeOrderStatus: createRequestsRepository(app, 'Order/ChangeOrderStatus', authStore),
            changeOrdersStatus: createRequestsRepository(app, 'Order/ChangeOrdersStatus', authStore),
            changePaymentTime: createRequestsRepository(app, 'Order/ChangePaymentTime', authStore),
            getAllUsers: createRequestsRepository(app, 'User/GetAll', authStore),
            createUser: createRequestsRepository(app, 'User/Create', authStore),
            getMenu: createRequestsRepository(app, 'Message/GetMenu', authStore),
            getConversation: createRequestsRepository(app, 'Message/GetConversation', authStore),
            readMessage: createRequestsRepository(app, 'Message/ReadMessage', authStore),
            sendMessage: createRequestsRepository(app, 'Message/SendMessage', authStore),
            deliverMessage: createRequestsRepository(app, 'Message/DeliverMessage', authStore),
            getShopsByUserId: createRequestsRepository(app, 'Shop/GetByUserId', authStore),
            createShop: createRequestsRepository(app, 'Shop/Create', authStore),
            getAllShop: createRequestsRepository(app, 'Shop/GetAll', authStore),
            createShopByAdmin: createRequestsRepository(app, 'Shop/CreateByAdmin', authStore),
            updateShop: createRequestsRepository(app, 'Shop/Update', authStore),
            deleteShop: createRequestsRepository(app, 'Shop/Delete', authStore),
            updateOrder: createRequestsRepository(app, 'Order/Update', authStore),
            sendSmsToAllUsers: createRequestsRepository(app, 'SMS/SendToALL', authStore),
            sendSmstoCustomUsers: createRequestsRepository(app, 'SMS/SendToUsers', authStore),
            //----------------------
            createBrand: createRequestsRepository(app, 'Brand/Create', authStore),
            updateBrand: createRequestsRepository(app, 'Brand/Update', authStore),
            deleteBrand: createRequestsRepository(app, 'Brand/Delete', authStore),
            getBrands: createRequestsRepository(app, 'Brand/GetAll', authStore),
            createProductCategory: createRequestsRepository(app, 'ProductCategory/Create', authStore),
            updateProductCategory: createRequestsRepository(app, 'ProductCategory/Update', authStore),
            deleteProductCategory: createRequestsRepository(app, 'ProductCategory/Delete', authStore),
            getProductCategory: createRequestsRepository(app, 'ProductCategory/GetAll', authStore),
            createProduct: createRequestsRepository(app, 'Product/Create', authStore),
            updateProduct: createRequestsRepository(app, 'Product/Update', authStore),
            deleteProduct: createRequestsRepository(app, 'Product/Delete', authStore),
            getProduct: createRequestsRepository(app, 'Product/GetAll', authStore),
            getOrdersByToken: createRequestsRepository(app, 'Order/GetOrderByToken', authStore),
            changeUserRole: createRequestsRepository(app, 'User/ChangeUserRole', authStore),
            getAllProducts: createRequestsRepository(app, 'Product/GetAll', authStore),
            addOrderNote: createRequestsRepository(app, 'Order/SetNoteForOrderByAdmin', authStore),
            getAllPriceList:createRequestsRepository(app,'ProductPrice/GetAll',authStore),
            createPriceList: createRequestsRepository(app, 'ProductPrice/Create', authStore),
            updatePriceList: createRequestsRepository(app, 'ProductPrice/Update', authStore),
            deletePriceList: createRequestsRepository(app, 'ProductPrice/Delete', authStore),


        }
        app.provide('repositories', repositories)
    }
}
