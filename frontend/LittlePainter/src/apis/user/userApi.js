import axios from 'axios';

export function signUp(user) {
  console.log(user);
  axios
    .post('http://k9d106.p.ssafy.io:8100/api/v1/auth/signup', user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}
