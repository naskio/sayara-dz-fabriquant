import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
// import 'firebase/firestore';
// import 'firebase/auth';
import ImageUploader from 'react-images-upload';
import {LinearProgress} from '@material-ui/core';
import config from '../../../config/firebase';

/**
 * Image uploader
 */
export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            percentage: 0,
            errorMsg: '',
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    handleChange = (pictureFiles) => {
        const file = pictureFiles[0];
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imagesRef = storageRef.child(`images/${file.name}`);
        const task = imagesRef.put(file);
        const {handleUploaded} = this.props;
        task.on(
            'state_changed',
            snapshot => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({percentage});
            },
            err => {
                this.setState({errorMsg: err.message});
            },
            () => {
                this.setState({uploaded: true});
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                    handleUploaded(downloadURL);
                });
            }
        );
    };

    render() {
        const {uploaded, percentage, errorMsg} = this.state;
        return (
            <div style={{width: '100%'}}>
                <LinearProgress variant="determinate" value={percentage}/>
                <ImageUploader
                    withIcon
                    buttonText="Choisir une images"
                    onChange={this.handleChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage
                    withPreview={uploaded}
                    color="secondary"
                    errorClass={errorMsg}
                />
            </div>
        );
    }
}
