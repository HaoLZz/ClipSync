import axios from 'axios';

class AuthManager {
  _isAuthenticated = false;
  async signin(email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let userInfo = null;
    let error = null;
    try {
      const response = await axios.post(
        'api/users/login',
        { email, password },
        config,
      );
      userInfo = response.data;
      if (userInfo && userInfo._id && userInfo.token) {
        this._isAuthenticated = true;
      }
    } catch (err) {
      error = err;
      console.error('SignIn failed');
      return err;
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

export const authManager = new AuthManager();
