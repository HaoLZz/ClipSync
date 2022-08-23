import apiRequest from '../../utils/api';

class AuthManager {
  constructor(userStored) {
    this._isAuthenticated = userStored ? true : false;

    this.getAuthStatus = this.getAuthStatus.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  async signin(email, password) {
    let userInfo = null;
    let error = null;
    try {
      userInfo = await apiRequest('api/users/login', 'POST', {
        email,
        password,
      });
      console.log(userInfo);
      if (userInfo && userInfo._id && userInfo.token) {
        this._isAuthenticated = true;
        console.log(this._isAuthenticated);
      }
    } catch (err) {
      error = err;
      console.error('SignIn failed');
      return error;
    } finally {
      return { userInfo, error };
    }
  }
  async signout() {
    try {
      const logout = await apiRequest('api/users/logout', 'GET');
      if (logout) {
        this._isAuthenticated = false;
        console.log('logout successful', logout);
      }
    } catch (err) {
      console.error('logout failed', err);
    }
  }
  getAuthStatus() {
    return this._isAuthenticated;
  }
}

const userLocalStore = JSON.parse(localStorage.getItem('userInfo'));
const userStored = userLocalStore?._id && userLocalStore?.token;

export const authManager = new AuthManager(userStored);
