function isAuth() {
  if (localStorage.getItem('HD7-AuthToken')) {
    const expireTokenDate = localStorage.getItem('HD7-AuthTokenExpire');
    if (new Date() <= expireTokenDate * 1000) return true;
  }
  return false;
}


export default isAuth;
