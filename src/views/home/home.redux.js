import {connect} from "react-redux";
import View from "./home.view";
import {setTitle} from "../../redux/logics/config";

const mapDispatchToProps = dispatch => ({
    setTitle: (title) => dispatch(setTitle(title)),
});

export default connect(
    undefined,
    mapDispatchToProps,
)(View);
