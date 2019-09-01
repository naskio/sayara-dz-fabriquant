import {connect} from "react-redux";
import View from "./options.view";
import {
    createOption,
    deleteOption,
    // fetchOptions,
    updateOption
} from "../../../redux/logics/options";

const mapStateToProps = state => ({
    models: state.data.models,
    categories: state.data.categories,
    options: state.data.options,
});

const mapDispatchToProps = dispatch => ({
    createOption: (data) => dispatch(createOption(data)),
    deleteOption: (data) => dispatch(deleteOption(data)),
    // fetchOptions: () => dispatch(fetchOptions()),
    updateOption: (data) => dispatch(updateOption(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
