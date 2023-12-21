import { StyleSheet, Text, View, Image, ImageProps } from "react-native";
import React, { useMemo } from "react";

import { Buffer } from "buffer";

const bucket = "sfido";
const URL = process.env.SERVERLESS_HANDLER_URL;

type Props = Omit<ImageProps, "source"> & {
  imgKey: string;
};

export const S3Image: React.FC<Props> = ({ imgKey, ...rest }) => {
  const imageUri = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: imgKey,
      edits: {
        resize: {
          width: 500,
          height: 1000,
          fit: "cover",
        },
      },
    });

    const encoded = Buffer.from(imageRequest).toString("base64");
    return `${URL}/${encoded}`;
  }, [imgKey]);

  return <Image {...rest} source={{ uri: imageUri }} />;
};

const styles = StyleSheet.create({});
