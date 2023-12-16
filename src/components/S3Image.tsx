import { StyleSheet, Text, View, Image, ImageProps } from 'react-native'
import React from 'react'

import {Buffer} from 'buffer'

// const s3Bucket = 'https://sfido.s3.amazonaws.com'
const bucket = 'sfido'
const URL = 'https://d2sd8hw6m6r03j.cloudfront.net'

type Props = Omit<ImageProps, 'source'> & {
    imgKey: string;
};

export const S3Image: React.FC<Props> = ({ imgKey, ...rest }) => {
 const imageRequest = JSON.stringify({
    bucket,
    key: imgKey,
    edits: {
        resize: {
        width: 500,
        height: 1000,
        fit: 'cover'
        }
    } 
 })

 const encoded = Buffer.from(imageRequest).toString('base64')
 const imageUri = `${URL}/${encoded}`;

 
    return <Image {...rest} source={{uri: imageUri}} />
}

const styles = StyleSheet.create({})