import {connect} from "react-redux";
import View from "./pricing.view";
import {
    createPricing,
    deletePricing,
    // fetchPricing,
    updatePricing,
    uploadPricing,
} from "../../../redux/logics/pricing";

const mapStateToProps = state => ({
    versions: state.data.versions,
    options: state.data.options,
    colors: state.data.colors,
    pricing: state.data.pricing,
    models: state.data.models,
});

const mapDispatchToProps = dispatch => ({
    createPricing: (data) => dispatch(createPricing(data)),
    deletePricing: (data) => dispatch(deletePricing(data)),
    // fetchPricing: () => dispatch(fetchPricing()),
    updatePricing: (data) => dispatch(updatePricing(data)),
    uploadPricing: (data) => dispatch(uploadPricing(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
