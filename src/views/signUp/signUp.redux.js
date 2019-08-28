import {connect} from "react-redux";
import View from "./signUp.view";
import {createSubscription} from "../../redux/logics/signUp";

const mapStateToProps = state => ({
    isSignedUp: state.signUp.isSignedUp,
});

const mapDispatchToProps = dispatch => ({
    submit: (data) => dispatch(createSubscription(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
