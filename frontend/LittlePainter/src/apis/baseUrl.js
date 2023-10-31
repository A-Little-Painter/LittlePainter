// import axios from 'axios';
// import * as Keychain from 'react-native-keychain';

export const BASE_URL = 'https://k9d106.p.ssafy.io:9001/api/v1';

// const getToken = () => {
//   Keychain.getGenericPassword('authTokens');
// };

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'content-type': 'application/json;charset=UTF-8',
//     accept: 'application/json,',
//   },
//   withCredentials: true,
// });

// const access_token = getToken('access_token');
// const refresh_token = getToken('refresh_token');

// api.interceptors.request.use(function (config) {
//   config.headers.common['Authorization'] = access_token;
//   config.headers.common['Refresh-Token'] = refresh_token;
//   return config;
// });
// // JWT 토큰 재발급 요청 함수
// async function refreshToken() {
//   try {
//     // 이 함수에서 서버로 토큰 재발급 요청을 보내고 새 토큰을 얻어옵니다.
//     const response = await axios.post('/refresh-token-endpoint', {
//       /* 필요한 데이터 */
//     });
//     const newToken = response.data.token;
//     // 얻어온 새 토큰을 저장하거나 다른 곳에서 사용할 수 있게 합니다.
//     // 예를 들어, 로컬 스토리지, 쿠키, 또는 상태 관리 라이브러리에 저장할 수 있습니다.
//     // 이 부분은 프로젝트의 요구사항에 따라 다를 수 있습니다.
//     return newToken;
//   } catch (error) {
//     // 토큰 재발급 요청에 실패한 경우 에러 처리
//     console.error('토큰 재발급 요청 실패', error);
//     throw error;
//   }
// }

// export const interceptor = () => {
//   axios.interceptors.response.use(
//     function (response) {
//       // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//       // 응답 데이터가 있는 작업 수행
//       return response;
//     },
//     async function (error) {
//       // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//       // 응답 오류가 있는 작업 수행

//       // 만료된 토큰인지 확인
//       if (error.response && error.response.status === 401) {
//         // 토큰을 재발급
//         const newToken = await refreshToken();
//         // 새로 얻은 토큰으로 이전 요청을 재시도
//         // 이때, 인터셉터를 다시 실행하지 않도록 설정해야 합니다.
//         // 이 부분은 프로젝트에 따라 구현 방식이 다를 수 있습니다.
//         // 예를 들어, axios 요청을 다시 보내는 로직을 작성해야 합니다.
//         // 재시도가 실패하면 오류 처리를 수행할 수 있습니다.
//         // 또한, 토큰 재발급 요청에 실패하면 사용자를 로그아웃 시키는 등의 추가 작업을 수행할 수 있습니다.
//       }

//       return Promise.reject(error);
//     },
//   );
// };
