import {connect} from "react-redux";
import View from "./models.view";
import {
    createModel,
    deleteModel,
    // fetchModels,
    updateModel
} from "../../../redux/logics/models";

const mapStateToProps = state => ({
    models: state.data.models,
    versions: state.data.versions,
    colors: state.data.colors,
    images: state.data.images,
});

const mapDispatchToProps = dispatch => ({
    createModel: (data) => dispatch(createModel(data)),
    deleteModel: (data) => dispatch(deleteModel(data)),
    // fetchModels: () => dispatch(fetchModels()),
    updateModel: (data) => dispatch(updateModel(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
