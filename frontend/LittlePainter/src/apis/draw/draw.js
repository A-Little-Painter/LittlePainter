import axios from 'axios';
import {BASE_URL} from '../baseUrl';

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
export const animalBorder = async (animalId) => {
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
export const animalCheckSimilarity = async (sessionId, originBorderFileUri, compareBorderFileUri,) => {
  console.log('메롱', originBorderFileUri);
  console.log('메롱', compareBorderFileUri);
  try {
    const formData = new FormData();
    formData.append('sessionId', sessionId);

    formData.append('originalFile', {
      uri: originBorderFileUri,
      type: 'image/jpg',
      name: 'originalFile.jpg',
    });

    formData.append('newFile', {
      uri: compareBorderFileUri,
      type: 'image/jpg',
      name: 'newFile.jpg',
    });
    console.log(formData);
    const response = await axios.post(`${BASE_URL}/draws/animals/similarcheck`, formData, {headers: {'Content-Type': 'multipart/form-data'}},
    );
    console.log('선택 동물 유사도 검사 성공', response);
    return response;
  } catch (error) {
    console.error('선택 동물 유사도 검사 실패:', error);
    return error.response;
  }
};
// export const animalCheckSimilarity = async (sessionId, originBorderFileUri, compareBorderFileUri) => {
//   try {
//     const formData = new FormData();
//     // const originFormData = new FormData();
//     // const newFormData = new FormData();
//     const originBorderFileUriReplace = originBorderFileUri.replace('file:///', 'file://')
//     const compareBorderFileUriReplace = compareBorderFileUri.replace('file:///', 'file://')

//     // originFormData.append('originBorderFile', {
//     //   uri: originBorderFileUriReplace,
//     //   type: 'image/jpeg', // 이미지 MIME 타입에 맞게 수정
//     //   name: 'originalFile.jpg',
//     // });

//     // newFormData.append('compareBorderFile', {
//     //   uri: compareBorderFileUriReplace,
//     //   type: 'image/jpeg', // 이미지 MIME 타입에 맞게 수정
//     //   name: 'newFile.jpg',
//     // });
//     formData.append('originBorderFile', {
//       uri: originBorderFileUriReplace,
//       type: 'image/jpeg', // 이미지 MIME 타입에 맞게 수정
//       name: 'originalFile.jpg',
//     });

//     formData.append('compareBorderFile', {
//       uri: compareBorderFileUriReplace,
//       type: 'image/jpeg', // 이미지 MIME 타입에 맞게 수정
//       name: 'newFile.jpg',
//     });
//     const response = await axios.post(
//       `${BASE_URL}/draws/animals/similarcheck`,
//       // {sessionId, originFormData, newFormData},
//       {sessionId, formData},
//       {headers: {'Content-Type': 'multipart/form-data'}}, // 수정된 헤더 설정
//     );

//     return response;
//   } catch (error) {
//     console.log('선택 동물 유사도 검사 실패:', error);
//     return error.response;
//   }
// };

// 완성된 동물 마이페이지에 저장
export const animalSaveToMypage = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/animals`, null);
    return response;
  } catch (error) {
    console.log('완성된 동물 마이페이지에 저장 실패:', error);
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
// 다른 사람이 올린전체 사진 가져오기
export const friendsWholePicture = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/friends`);
    return response;
  } catch (error) {
    console.log('다른 사람이 올린전체 사진 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 다른 사람이 올린 사진 테두리 가져오기
export const friendsPictureBorder = async (friendsAnimalId) => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/friends/${friendsAnimalId}`);
    return response;
  } catch (error) {
    console.log('다른 사람이 올린 사진 테두리 가져오기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 다른 사람이 올린 사진 그리기 유사도 검사
export const friendsPictureSimilarity = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/friends/comm-similarity`, null);
    return response;
  } catch (error) {
    console.log('다른 사람이 올린 사진 그리기 유사도 검사 실패:', error);
    const response = error.response;
    return response;
  }
};
// 내 사진 올리기
export const friendsPictureCommmit = async (title, detail, registImage, movable) => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/friends`, {title, detail, registImage, movable});
    return response;
  } catch (error) {
    console.log('내 사진 올리기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 등록 동물 종류 수정하기
export const friendsPictureModifyAnimal = async (friendsAnimalId, animalTypeId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/draws/friends/${friendsAnimalId}`, animalTypeId);
    return response;
  } catch (error) {
    console.log('사진 등록 동물 종류 수정하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 사진 등록 취소 및 삭제하기
export const friendsPictureCancel = async (friendsAnimalId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/draws/friends/${friendsAnimalId}`, null);
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
// 동화 페이지 조회하기
export const talePageInquiry = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/tales/${talesId}/${pageNum}`);
    return response;
  } catch (error) {
    console.log('동화 페이지 조회하기 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 페이지 다시 조회
export const talePageReinquiry = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/draws/tales/exist`);
    return response;
  } catch (error) {
    console.log('동화 페이지 다시 조회 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 유사도 검사
export const taleCheckSimilarity = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/tales/comm-similarity`, null);
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
export const animalAnimations = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/animations/animals`, null);
    return response;
  } catch (error) {
    console.log('동물 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 애니메이션
export const taleAnimations = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/animations/tales`, null);
    return response;
  } catch (error) {
    console.log('동화 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
// 친구 그림 애니메이션
export const friendsAnimations = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/draws/animations/friends`, null);
    return response;
  } catch (error) {
    console.log('친구 그림 애니메이션 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동물 및 친구사진 애니메이션 생성
export const animationsCreateAnimalFriends = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/animations/comm/animals`, null);
    return response;
  } catch (error) {
    console.log('동물 및 친구사진 애니메이션 생성 실패:', error);
    const response = error.response;
    return response;
  }
};
// 동화 애니메이션 생성
export const animationsCreateTale = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/animations/comm/tales`, null);
    return response;
  } catch (error) {
    console.log('동화 애니메이션 생성 실패:', error);
    const response = error.response;
    return response;
  }
};

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
// 마이페이지에 그림 저장하기
export const imageRegistMypage = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/images/comm/myWork`, null);
    return response;
  } catch (error) {
    console.log('마이페이지에 그림 저장하기 실패:', error);
    const response = error.response;
    return response;
  }
};
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
