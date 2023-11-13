/* eslint-disable prettier/prettier */

import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {BASE_URL} from '../baseUrl';
// import {DRAW_URL} from '../baseUrl';

const loadATokenFromKeychain = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'accessTokens',
    });
    if (credentials) {
      const token = credentials.password;
      return token;
    } else {
      console.error('저장된 토큰이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('토큰 불러오기에 실패했습니다.', error);
    return null;
  }
};

// animals
// 전체 동물 데이터
export const animalWholeData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/animals`);
    return response;
  } catch (error) {
    console.log('전체 동물 데이터 조회 실패:', error);
    const response = error.response;
    return response;
  }
};
// 선택 동물 테두리 가져오기
export const animalBorder = async animalId => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/animals/${animalId}`);
    return response;
  } catch (error) {
    console.log('선택 동물 테두리 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 선택 동물 유사도 검사
// { MultipartFile 원본테두리이미지, MultipartFile 사용자가그린테두리이미지 }

// export const animalCheckSimilarity = async (sessionId, originBorderFileUri, compareBorderFileUri,) => {
export const animalCheckSimilarity = async (
  roomId,
  originBorderFileUri,
  compareBorderFileUri,
) => {
  try {
    const formData = new FormData();
    // formData.append('roomId', roomId);
    formData.append('roomId', roomId);

    formData.append('originalFile', {
      uri: originBorderFileUri,
      type: 'image/png',
      name: 'originalFile.png',
    });

    formData.append('newFile', {
      uri: compareBorderFileUri,
      type: 'image/png',
      name: 'newFile.png',
    });
    const response = await axios.post(
      `${BASE_URL}/draws/animals/similarcheck`,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response;
  } catch (error) {
    if (error.response.status !== 404) {
      console.error('선택 동물 유사도 검사 실패:', error);
      return error.response;
    }
  }
};

// 완성된 동물 마이페이지에 저장
export const animalSaveToMypage = async (workId, completeDrawUri, gifUrl) => {
  try {
    const accessToken = await loadATokenFromKeychain();
    const formData = new FormData();
    formData.append('workId', workId);
    formData.append('imageFile', {
      uri: completeDrawUri,
      type: 'image/png',
      name: 'originalFile.png',
    });
    if (gifUrl !== '' && gifUrl !== undefined) {
      formData.append('gifUrl', JSON.stringify(gifUrl));
    }

    const response = await axios.post(
      `${BASE_URL}/draws/child_work/animal`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log('완성된 동물 마이페이지에 저장 실패 에러:', error);
    const response = error.response;
    return response;
  }
};

//animalType
// 전체 동물 이름 조회하기
export const animalWholeNameInquiry = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/animal-types`);
    return response;
  } catch (error) {
    console.log('전체 동물 이름 조회하기 실패:', error);
    const response = error.response;
    return response;
  }
};

//friends
// 다른 사람이 올린 사진 전체 가져오기
export const friendsWholePicture = async (animalTypeId, page) => {
  try {
    // page-0 이면 30개
    const response = await axios.get(
      `${BASE_URL}/draws/friends?animalTypeId=${animalTypeId}&page=${page}`,
    );
    // const response = await axios.get(`${BASE_URL}/draws/friends`);
    return response;
  } catch (error) {
    console.log('다른 사람이 올린 사진 전체 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 다른 사람이 올린 사진 테두리 가져오기
export const friendsPictureBorder = async friendsAnimalId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/draws/friends/${friendsAnimalId}`,
    );
    return response;
  } catch (error) {
    console.log('다른 사람이 올린 사진 테두리 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 다른 사람이 올린 사진 그리기 유사도 검사
export const friendsPictureSimilarity = async (
  roomId,
  originBorderFileUri,
  compareBorderFileUri,
) => {
  try {
    const formData = new FormData();
    formData.append('roomId', roomId);

    formData.append('originalFile', {
      uri: originBorderFileUri,
      type: 'image/png',
      name: 'originalFile.png',
    });

    formData.append('newFile', {
      uri: compareBorderFileUri,
      type: 'image/png',
      name: 'newFile.png',
    });
    const response = await axios.post(
      `${BASE_URL}/draws/animals/similarcheck`,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log('다른 사람이 올린 사진 그리기 유사도 검사 실패:', error);
    const response = error.response;
    return response;
  }
};
// 완성된 사진그리기 마이페이지에 저장
export const friendsPictureSaveToMypage = async (
  workId,
  completeDrawUri,
  gifUrl,
) => {
  try {
    const accessToken = await loadATokenFromKeychain();
    const formData = new FormData();
    formData.append('workId', workId);
    formData.append('imageFile', {
      uri: completeDrawUri,
      type: 'image/png',
      name: 'originalFile.png',
    });
    if (gifUrl !== '' && gifUrl !== undefined) {
      formData.append('gifUrl', JSON.stringify(gifUrl));
    }

    const response = await axios.post(
      `${BASE_URL}/draws/child_work/friendsAnimal`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log('완성된 동물 마이페이지에 저장 실패 에러:', error);
    const response = error.response;
    return response;
  }
};
// 내 사진 올리기
export const friendsPictureCommmit = async (
  title,
  detail,
  registImage,
  movable,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/friends`, {
      title,
      detail,
      registImage,
      movable,
    });
    return response;
  } catch (error) {
    console.log('내 사진 올리기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 등록 동물 종류 수정하기
export const friendsPictureModifyAnimal = async (
  friendsAnimalId,
  animalTypeId,
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/draws/friends/${friendsAnimalId}`,
      animalTypeId,
    );
    return response;
  } catch (error) {
    console.log('사진 등록 동물 종류 수정하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 등록 취소 및 삭제하기
export const friendsPictureCancel = async friendsAnimalId => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/draws/friends/${friendsAnimalId}`,
      null,
    );
    return response;
  } catch (error) {
    console.log('사진 등록 취소 및 삭제하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 등록하기
export const friendsPictureRegist = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/friends/comm`, null);
    return response;
  } catch (error) {
    console.log('사진 등록하기 실패:', error);
    const response = error.response;
    return response;
  }
};

//tales
// 동화 색칠하기
export const taleColoring = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/tales/paint`, null);
    return response;
  } catch (error) {
    console.log('동화 색칠하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 전체 동화 목록 조회하기
export const taleListInquiry = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/tales`);
    return response;
  } catch (error) {
    console.log('전체 동화 목록 조회하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 페이지 전체 데이터 조회하기
export const talePageListInquiry = async taleId => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/tale-pages/${taleId}`);
    return response;
  } catch (error) {
    console.log('동화 페이지 전체 데이터 조회하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 그림 마이페이지에 저장하기
// talePageData에 talePageId와 urlGif, imageFile가 다 들어있음
export const taleSaveToMypage = async (taleId, talePageData) => {
  try {
    const accessToken = await loadATokenFromKeychain();
    const formData = new FormData();
    talePageData.forEach((data, index) => {
      formData.append(
        `addChildWorkTaleReqDtoList[${index}].pageId`,
        data.pageId,
      );
      formData.append(
        `addChildWorkTaleReqDtoList[${index}].gifUrl`,
        JSON.stringify(data.urlGif),
      );
      formData.append(`addChildWorkTaleReqDtoList[${index}].imageFile`, {
        uri: data.completeDrawUri,
        type: 'image/png',
        name: 'originalFile.png',
      });
    });

    const response = await axios.post(
      `${BASE_URL}/draws/child_work_tale/${taleId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log('동화 그림 마이페이지에 저장하기 실패:', error);
    const response = error.response;
    return response;
  }
};

// // 동화 페이지 조회하기
// export const talePageInquiry = async (talesId, pageNum) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/draws/tales/${talesId}/${pageNum}`);
//     return response;
//   } catch (error) {
//     console.log('동화 페이지 조회하기 실패:', error);
//     const response = error.response;
//     return response;
//   }
// };
// // 동화 페이지 다시 조회
// export const talePageReinquiry = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/draws/tales/exist`);
//     return response;
//   } catch (error) {
//     console.log('동화 페이지 다시 조회 실패:', error);
//     const response = error.response;
//     return response;
//   }
// };
// 동화 유사도 검사
export const taleCheckSimilarity = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/draws/tales/comm-similarity`,
      null,
    );
    return response;
  } catch (error) {
    console.log('동화 유사도 검사 실패:', error);
    const response = error.response;
    return response;
  }
};

//myUpload
// 생성한 동화 그림 모두 저장하기
export const taleSaveEveryDrawn = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/tales/all`, null);
    return response;
  } catch (error) {
    console.log('동화 유사도 검사 실패:', error);
    const response = error.response;
    return response;
  }
};

//animations
// 동물 애니메이션
export const animalAnimations = async (animalType, drawCaptureImageURI) => {
  console.log(animalType, drawCaptureImageURI);
  try {
    const formData = new FormData();
    formData.append('animalType ', animalType);

    formData.append('image', {
      uri: drawCaptureImageURI,
      type: 'image/png',
      name: 'originalFile.png',
    });
    console.log(formData._parts);
    const response = await axios.post(
      `${BASE_URL}/draws/animations/animals`,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response;
  } catch (error) {
    console.log('동물 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 애니메이션
export const taleAnimations = async (
  taleTitle,
  pageNum,
  drawCaptureImageURI,
) => {
  try {
    const formData = new FormData();
    formData.append('taleTitle ', taleTitle);
    formData.append('pageNum ', pageNum);
    formData.append('originalFile', {
      uri: drawCaptureImageURI,
      type: 'image/png',
      name: 'originalFile.png',
    });
    const response = await axios.post(
      `${BASE_URL}/draws/animations/tales`,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response;
  } catch (error) {
    console.log('동화 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
// // 친구 그림 애니메이션
// export const friendsAnimations = async (animalType, drawCaptureImageURI) => {
//   try {
//     const formData = new FormData();
//     formData.append('animalType ', animalType);

//     formData.append('originalFile', {
//       uri: drawCaptureImageURI,
//       type: 'image/png',
//       name: 'originalFile.png',
//     });
//     const response = await axios.post(`${BASE_URL}/draws/animations/friends`, formData, {headers: {'Content-Type': 'multipart/form-data'}},);
//     return response;
//   } catch (error) {
//     console.log('친구 그림 애니메이션 실패:', error);
//     const response = error.response;
//     return response;
//   }
// };

//images
// 내 동물 사진 올리기
export const imageRegistMypicture = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/images/comm/myAnimal`, null);
    return response;
  } catch (error) {
    console.log('내 동물 사진 올리기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 내 동물 사진 삭제
export const imageDeleteMypicture = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/image/comm/friends`, null);
    return response;
  } catch (error) {
    console.log('내 동물 사진 삭제 실패:', error);
    const response = error.response;
    return response;
  }
};
// // 마이페이지에 그림 저장하기
// export const imageRegistMypage = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/images/comm/myWork`, null);
//     return response;
//   } catch (error) {
//     console.log('마이페이지에 그림 저장하기 실패:', error);
//     const response = error.response;
//     return response;
//   }
// };
// 동물 소리 URL 요청
export const soundAnimalRequest = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/images/comm/animals`, null);
    return response;
  } catch (error) {
    console.log('동물 소리 URL 요청 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 소리 URL 요청
export const soundTaleRequest = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/images/comm/tales`, null);
    return response;
  } catch (error) {
    console.log('동화 소리 URL 요청 실패:', error);
    const response = error.response;
    return response;
  }
};

// detection
// 사진 분석
export const detectionPicture = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/detection/comm`, null);
    return response;
  } catch (error) {
    console.log('사진 분석 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 테두리 검출
export const detectionPictureBorder = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/detections/border`, null);
    return response;
  } catch (error) {
    console.log('사진 테두리 검출 실패:', error);
    const response = error.response;
    return response;
  }
};

// friend
// 전체 친구 데이터
export const friendWholeData = async () => {
  try {
    const accessToken = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`${BASE_URL}/draws/person`, {headers});
    return response;
  } catch (error) {
    console.log('전체 친구 데이터 조회 실패:', error);
    const response = error.response;
    return response;
  }
};
// 선택 친구 테두리 가져오기
export const FriendBorder = async Id => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/person/${Id}`);
    return response;
  } catch (error) {
    console.log('선택 친구 테두리 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 선택 친구 유사도 검사
// { MultipartFile 원본테두리이미지, MultipartFile 사용자가그린테두리이미지 }

// export const animalCheckSimilarity = async (sessionId, originBorderFileUri, compareBorderFileUri,) => {
export const friendCheckSimilarity = async (
  roomId,
  originBorderFileUri,
  compareBorderFileUri,
) => {
  try {
    const formData = new FormData();
    // formData.append('roomId', roomId);
    formData.append('roomId', roomId);

    formData.append('originalFile', {
      uri: originBorderFileUri,
      type: 'image/png',
      name: 'originalFile.png',
    });

    formData.append('newFile', {
      uri: compareBorderFileUri,
      type: 'image/png',
      name: 'newFile.png',
    });
    const response = await axios.post(
      `${BASE_URL}/draws/person/similarcheck`,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response;
  } catch (error) {
    if (error.response.status !== 404) {
      console.error('선택 친구 유사도 검사 실패:', error);
      return error.response;
    }
  }
};

// 완성된 친구 마이페이지에 저장
export const friendSaveToMypage = async (workId, completeDrawUri, gifUrl) => {
  try {
    const accessToken = await loadATokenFromKeychain();
    const formData = new FormData();
    formData.append('workId', workId);
    formData.append('imageFile', {
      uri: completeDrawUri,
      type: 'image/png',
      name: 'originalFile.png',
    });
    if (gifUrl !== '' && gifUrl !== undefined) {
      formData.append('gifUrl', JSON.stringify(gifUrl));
    }

    const response = await axios.post(
      `${BASE_URL}/draws/child_work/animal`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log('완성된 친구 마이페이지에 저장 실패 에러:', error);
    const response = error.response;
    return response;
  }
};

// 친구 애니메이션
export const FriendAnimations = async (
  roomId,
  originImageURI,
  drawCaptureImageURI,
) => {
  console.log(drawCaptureImageURI);
  try {
    const accessToken = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('roomId', roomId);

    formData.append('originalFile', {
      uri: originImageURI,
      type: 'image/png',
      name: 'originalFile.png',
    });

    formData.append('newFile', {
      uri: drawCaptureImageURI,
      type: 'image/png',
      name: 'newFile.png',
    });
    console.log(formData._parts);
    const response = await axios.post(
      `${BASE_URL}/draws/animations/friends`,
      formData,
      {headers},
    );
    return response;
  } catch (error) {
    console.log('동물 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
