import {connect} from "react-redux";
import View from "./signUp.view";
import {createSubscription} from "../../redux/logics/signUp";
import {setTitle} from "../../redux/logics/config";

const mapStateToProps = state => ({
    isSignedUp: state.signUp.isSignedUp,
});

const mapDispatchToProps = dispatch => ({
    submit: (data) => dispatch(createSubscription(data)),
    setTitle: (title) => dispatch(setTitle(title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
