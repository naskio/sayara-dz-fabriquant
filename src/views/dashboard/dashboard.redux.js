import {connect} from "react-redux";
import View from "./dashboard.view";
import {getSessionToken} from "../../utils/session";
import {logout, fetchProfile} from "../../redux/logics/user";
import {setTitle} from "../../redux/logics/config";
import {fetchModels} from "../../redux/logics/models";
import {fetchVersions} from "../../redux/logics/versions";
import {fetchCategories} from "../../redux/logics/categories";
import {fetchOptions} from "../../redux/logics/options";
import {fetchColors} from "../../redux/logics/colors";
import {fetchVideos} from "../../redux/logics/videos";
import {fetchImages} from "../../redux/logics/images";

const mapStateToProps = state => ({
    token: (!!state.user.token ? state.user.token : getSessionToken()),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    setTitle: (title) => dispatch(setTitle(title)),
    fetchProfile: () => dispatch(fetchProfile()),
    fetchModels: () => dispatch(fetchModels()),
    fetchVersions: () => dispatch(fetchVersions()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchOptions: () => dispatch(fetchOptions()),
    fetchColors: () => dispatch(fetchColors()),
    fetchImages: () => dispatch(fetchImages()),
    fetchVideos: () => dispatch(fetchVideos()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
