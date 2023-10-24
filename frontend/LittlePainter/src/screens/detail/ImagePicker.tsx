import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

export const openImagePicker = (
  setImageSource: (source: {uri: string} | null) => void,
) => {
  console.log('1');
  const options = {
    mediaType: 'photo' as MediaType,
  };
  console.log('2');

  launchImageLibrary(options, (response: ImagePickerResponse) => {
    console.log('3');
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (
      response.assets &&
      response.assets[0] &&
      response.assets[0].uri
    ) {
      const source = {uri: response.assets[0].uri};
      setImageSource(source);
      console.log(response.assets);
    } else {
      console.log('Image not found in response');
    }
  });
};
