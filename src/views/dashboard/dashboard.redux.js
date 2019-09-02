import {connect} from "react-redux";
import View from "./dashboard.view";
import {getSessionToken} from "../../utils/session";
import {logout, fetchProfile} from "../../redux/logics/user";
import {setIsLoaded, setTitle} from "../../redux/logics/config";
import {fetchModels} from "../../redux/logics/models";
import {fetchVersions} from "../../redux/logics/versions";
import {fetchCategories} from "../../redux/logics/categories";
import {fetchOptions} from "../../redux/logics/options";
import {fetchColors} from "../../redux/logics/colors";
import {fetchVideos} from "../../redux/logics/videos";
import {fetchImages} from "../../redux/logics/images";
import {fetchPricing} from "../../redux/logics/pricing";
import {fetchVehicles} from "../../redux/logics/vehicles";
import {fetchOrders} from "../../redux/logics/orders";

const mapStateToProps = state => ({
    token: (!!state.user.token ? state.user.token : getSessionToken()),
    isLoaded: state.user.isLoaded,
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
    fetchPricing: () => dispatch(fetchPricing()),
    fetchVehicles: () => dispatch(fetchVehicles()),
    fetchOrders: () => dispatch(fetchOrders()),
    setIsLoaded: (isLoaded) => dispatch(setIsLoaded(isLoaded)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
