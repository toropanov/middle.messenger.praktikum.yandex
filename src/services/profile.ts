import ProfileAPI from "../api/profile";

export const changeProfile = async (dispatch, data) => {
  const { response } = await ProfileAPI.changeProfile(data).then(res => res);

  dispatch({
    user: JSON.parse(response) // to modify value
  });
}
