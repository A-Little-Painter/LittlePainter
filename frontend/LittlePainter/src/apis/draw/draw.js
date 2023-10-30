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
export const animalCheckSimilarity = async (originBorderFile, compareBorderFile) => {
  const data = {originBorderFile, compareBorderFile};
  try {
    const response = await axios.post(`${BASE_URL}/draws/animals/similarcheck`, data);
    return response;
  } catch (error) {
    console.log('선택 동물 유사도 검사 실패:', error);
    const response = error.response;
    return response;
  }
};
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
    console.log('사진 등록하기 실패:', error);
    const response = error.response;
    return response;
  }
};

//myUpload

//animations
