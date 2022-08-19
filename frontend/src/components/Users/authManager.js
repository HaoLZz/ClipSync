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
      const userInfo = await apiRequest('api/users/login', 'POST', {
        email,
        password,
      });
      if (userInfo && userInfo._id && userInfo.token) {
        this._isAuthenticated = true;
      }
    } catch (err) {
      error = err;
      console.error('SignIn failed');
      return error;
    } finally {
      return { userInfo, error };
    }
  }
  signout() {
    this._isAuthenticated = false;
  }
  getAuthStatus() {
    return this._isAuthenticated;
  }
}

const userLocalStore = JSON.parse(localStorage.getItem('userInfo'));
const userStored = userLocalStore._id && userLocalStore.token;

export const authManager = new AuthManager(userStored);
