import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import {uuidv4} from '../../../utils/uuid';
import ImageUploader from 'react-images-upload';
import {
    LinearProgress,
    Typography,
} from '@material-ui/core';
import config from '../../../config/firebase';
import styled from "styled-components";

const Preview = styled.img`
  height: 8rem;
  object-fit: contain;
  border-radius: 1rem;
  background-color: transparent;
`;

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
                    this.setState({percentage: 0});
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
            <div className="p-2 col-12 d-flex flex-column align-items-center justify-content-center">
                <Typography color="primary">Image</Typography>
                {
                    !!value &&
                    <Preview
                        src={value}
                    />
                }
                {
                    !!percentage &&
                    <LinearProgress
                        variant="determinate"
                        color="primary"
                        value={percentage}
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
                    color="secondary"
                    errorClass={helperText}
                    label="'taille maximale: 5mb, formats: jpg,png"
                    fileSizeError="fichier trés volumineux, taille maximale: 5mb"
                    fileTypeError="Format non supportée"
                />
                {helperText && <Typography color={error ? 'error' : 'inherit'}>
                    {helperText}
                </Typography>}
            </div>
        );
    }
}


export default Uploader;
