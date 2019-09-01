import {connect} from "react-redux";
import View from "./colors.view";
import {
    createColor,
    deleteColor,
    // fetchColors,
    updateColor
} from "../../../redux/logics/colors";

const mapStateToProps = state => ({
    models: state.data.models,
    colors: state.data.colors,
});

const mapDispatchToProps = dispatch => ({
    createColor: (data) => dispatch(createColor(data)),
    deleteColor: (data) => dispatch(deleteColor(data)),
    // fetchColors: () => dispatch(fetchColors()),
    updateColor: (data) => dispatch(updateColor(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
