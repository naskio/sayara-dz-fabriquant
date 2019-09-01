import React, {Component} from 'react';
// import * as PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
// import 'firebase/firestore';
// import 'firebase/auth';
import {uuidv4} from '../../../utils/uuid';
import ImageUploader from 'react-images-upload';
import {
    LinearProgress,
    CircularProgress,
    Typography,
    Avatar,
} from '@material-ui/core';
import config from '../../../config/firebase';

/**
 * Image uploader
 */
class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {percentage: 0,};
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    handleChange = (pictureFiles) => {
        const {setFieldTouched, name} = this.props;
        setFieldTouched(name, true);
        if (pictureFiles && pictureFiles.length) {
            const file = pictureFiles[0];
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const imagesRef = storageRef.child(`images/${uuidv4()}`);
            const task = imagesRef.put(file);
            const {
                setFieldValue,
                name,
                setFieldError,
            } = this.props;
            task.on(
                'state_changed',
                snapshot => {
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({percentage});
                },
                err => {
                    setFieldError(name, err.message);
                },
                () => {
                    task.snapshot.ref.getDownloadURL()
                        .then(downloadURL => {
                            setFieldValue(name, downloadURL);
                        });
                }
            );
        } else {
            const {
                setFieldValue,
            } = this.props;
            setFieldValue(name, '');
        }
    };

    render() {
        const {percentage} = this.state;
        const {
            name,
            error,
            helperText,
            value,
        } = this.props;
        return (
            <>
                {
                    percentage && <CircularProgress
                        variant="determinate" value={percentage}
                        size="24"
                    />
                }
                {
                    !percentage && value &&
                    <Avatar
                        src={value}
                        imgProps={{
                            objectFit: 'cover',
                        }}
                        sizes="24 24"
                    />
                }
                <ImageUploader
                    name={name}
                    withIcon
                    buttonText="Choisir une images"
                    onChange={this.handleChange}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                    singleImage
                    withPreview={!!value}
                    color="secondary"
                    errorClass={helperText}
                    label="'taille maximale: 5mb, formats: jpg,png"
                    fileSizeError="fichier trés volumineux, taille maximale: 5mb"
                    fileTypeError="Format non supportée"
                />
                {helperText && <Typography color={error ? 'error' : 'inherit'}>
                    {helperText}
                </Typography>}
            </>
        );
    }
}


export default Uploader;
