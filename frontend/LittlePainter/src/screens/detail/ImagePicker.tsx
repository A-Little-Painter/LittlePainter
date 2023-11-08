import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

export const openImagePicker = () => {
  return new Promise<{
    uri: string;
    fileName: string;
    originalPath: string;
    type: string;
  } | null>((resolve, reject) => {
    const options = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        reject(response.errorMessage);
      } else if (
        response.assets &&
        response.assets[0] &&
        response.assets[0].uri
      ) {
        const source = {
          uri: response.assets[0].uri,
          fileName: response.assets[0].fileName,
          originalPath: response.assets[0].originalPath,
          type: response.assets[0].type,
        };
        console.log(response.assets[0]);
        resolve(source);
      } else {
        console.log('Image not found in response');
        resolve(null);
      }
    });
  });
};
