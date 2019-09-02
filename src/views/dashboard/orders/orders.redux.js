import {connect} from "react-redux";
import View from "./orders.view";
import {
    createOrder,
    deleteOrder,
    // fetchOptions,
    updateOrder,
} from "../../../redux/logics/orders";

const mapStateToProps = state => ({
    orders: state.data.orders,
    models: state.data.models,
    versions: state.data.versions,
    options: state.data.options,
    colors: state.data.colors,
});

const mapDispatchToProps = dispatch => ({
    createOrder: (data) => dispatch(createOrder(data)),
    deleteOrder: (data) => dispatch(deleteOrder(data)),
    // fetchOptions: () => dispatch(fetchOptions()),
    updateOrder: (data) => dispatch(updateOrder(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
