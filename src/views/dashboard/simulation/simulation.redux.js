import {connect} from "react-redux";
import View from "./simulation.view";
import {
    simulate,
} from "../../../redux/logics/simulation";

const mapStateToProps = state => ({
    models: state.data.models,
    versions: state.data.versions,
    options: state.data.options,
    colors: state.data.colors,
});

const mapDispatchToProps = dispatch => ({
    simulate,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
