import {connect} from "react-redux";
import View from "./videos.view";
import {
    createVideo,
    deleteVideo,
    // fetchVideos,
    updateVideo
} from "../../../redux/logics/videos";

const mapStateToProps = state => ({
    models: state.data.models,
    videos: state.data.videos,
});

const mapDispatchToProps = dispatch => ({
    createVideo: (data) => dispatch(createVideo(data)),
    deleteVideo: (data) => dispatch(deleteVideo(data)),
    // fetchVideos: () => dispatch(fetchVideos()),
    updateVideo: (data) => dispatch(updateVideo(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
