import AuthAPI from '../api/auth';

export const signin = async (store, action) => {
  const response = await AuthAPI.signIn(action);

  store.setState({
    user: response // to modify value
  });
}
