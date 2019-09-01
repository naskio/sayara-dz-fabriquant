import {connect} from "react-redux";
import View from "./images.view";
import {
    createImage,
    deleteImage,
    // fetchImages,
    updateImage
} from "../../../redux/logics/images";

const mapStateToProps = state => ({
    models: state.data.models,
    images: state.data.images,
});

const mapDispatchToProps = dispatch => ({
    createImage: (data) => dispatch(createImage(data)),
    deleteImage: (data) => dispatch(deleteImage(data)),
    // fetchImages: () => dispatch(fetchImages()),
    updateImage: (data) => dispatch(updateImage(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
