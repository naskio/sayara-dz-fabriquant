import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import {uuidv4} from '../../../utils/uuid';
import ImageUploader from 'react-images-upload';
import {
    LinearProgress, TextField,
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

// const ENABLE_URL = false;

/**
 * Image uploader
 */

// TODO: add url input so we can add links directly from other websites
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
            label,
        } = this.props;
        return (
            <div className="p-2 col-12 d-flex flex-column align-items-center justify-content-center">
                <Typography color="primary">{label || 'Image'}</Typography>
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
                {/*{*/}
                {/*    ENABLE_URL && (*/}
                {/*        <TextField*/}
                {/*            margin="normal"*/}
                {/*            name={name}*/}
                {/*            className={classes.textField}*/}
                {/*            placeholder="Lien du l'image"*/}
                {/*            helperText={touched.code_modele ? errors.code_modele : ""}*/}
                {/*            error={touched.code_modele && Boolean(errors.code_modele)}*/}
                {/*            onChange={handleChange}*/}
                {/*            onBlur={handleBlur}*/}
                {/*            value={code_modele}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}
                <ImageUploader
                    name={name}
                    withIcon
                    buttonText="Choisir une images"
                    onChange={this.handleChange}
                    imgExtension={['.jpg', '.png', ['.jpeg']]}
                    maxFileSize={5242880}
                    singleImage
                    color="secondary"
                    errorClass={helperText}
                    label="'taille maximale: 5mb, formats: jpg,png,jpeg"
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
