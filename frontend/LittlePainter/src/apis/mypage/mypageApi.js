import axios from 'axios';
import {BASE_URL} from '../baseUrl';
import * as Keychain from 'react-native-keychain';

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

export const callUserData = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/user/child`, {headers});
    return response.data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const addUserChild = async data => {
  console.log(data);
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const response = await axios.post(`${BASE_URL}/user/child`, data, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    const response = error.response;
    return response;
  }
};

export const updateUserChild = async data => {
  console.log(data);
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const response = await axios.patch(`${BASE_URL}/user/child`, data, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    const response = error.response;
    return response;
  }
};

export const deleteUserChild = async data => {
  console.log(data);
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const response = await axios.delete(`${BASE_URL}/user/child/${data}`, {
      headers,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log('fall');
    console.error(error);
    const response = error.response;
    return response;
  }
};

export const updateUserIcon = async data => {
  console.log(data);
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const response = await axios.patch(`${BASE_URL}/user/icons`, data, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('fall');
    console.error(error);
    const response = error.response;
    return response;
  }
};

export const callIconList = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/user/icons`, {headers});
    const data = response.data;
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const selectKids = async param => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log('param');
    console.log(param);
    const response = await axios.patch(
      `${BASE_URL}/user/select-child/${param}`,
      null,
      {headers},
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const myAnimal = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/draws/child_work/my_animals`,
      {headers},
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const myFairy = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/draws/child_work_tale/my_tales`,
      {
        headers,
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const myUpload = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/draws/child_work/my_uploads`,
      {headers},
    );
    const data = response.data;
    console.log('good');
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const ttsTogle = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.patch(`${BASE_URL}/user/sound`, null, {
      headers,
    });
    const data = response.data;
    console.log('good');
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const deleteUser = async () => {
  try {
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${BASE_URL}/user`, {
      headers,
    });
    const data = response.data;
    console.log('good');
    return data;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};

export const myFairyImage = async taleId => {
  try {
    console.log(taleId);
    const token = await loadATokenFromKeychain();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/draws/child_work_tale/${taleId}`,
      {
        headers,
      },
    );
    return response;
  } catch (error) {
    console.log('fall');
    console.log(error);
    const response = error.response;
    return response;
  }
};
