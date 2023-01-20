import ProfileAPI from "../api/profile";

export const changeProfile = async (dispatch, data) => {
  const { response } = await ProfileAPI.changeProfile(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changeAvatar = async (dispatch, avatar) => {
  const data = new FormData();
  data.append('avatar', avatar);

  const { response } = await ProfileAPI.changeAvatar(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changePassword = async (dispatch, data) => {
  await ProfileAPI.changePassword(data).then(res => res);
}
