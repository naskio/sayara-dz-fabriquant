import {connect} from "react-redux";
import View from "./stock.view";
import {
    createVehicle,
    deleteVehicle,
    // fetchVehicles,
    updateVehicle,
    uploadVehicles,
} from "../../../redux/logics/vehicles";

const mapStateToProps = state => ({
    vehicles: state.data.vehicles,
    versions: state.data.versions,
    colors: state.data.colors,
    options: state.data.options,
    models: state.data.models,
});

const mapDispatchToProps = dispatch => ({
    createVehicle: (data) => dispatch(createVehicle(data)),
    deleteVehicle: (data) => dispatch(deleteVehicle(data)),
    // fetchVehicles: () => dispatch(fetchVehicles()),
    updateVehicle: (data) => dispatch(updateVehicle(data)),
    uploadVehicles: (data) => dispatch(uploadVehicles(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
