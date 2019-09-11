import {connect} from "react-redux";
import View from "./versions.view";
import {
    createVersion,
    deleteVersion,
    // fetchVersions,
    updateVersion
} from "../../../redux/logics/versions";

const mapStateToProps = state => ({
    models: state.data.models,
    versions: state.data.versions,
    options: state.data.options,
});

const mapDispatchToProps = dispatch => ({
    createVersion: (data) => dispatch(createVersion(data)),
    deleteVersion: (data) => dispatch(deleteVersion(data)),
    // fetchVersions: () => dispatch(fetchVersions()),
    updateVersion: (data) => dispatch(updateVersion(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
