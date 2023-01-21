import ProfileAPI from "../api/profile";

import {
  ProfileChangeRequestData,
  ProfileAvatarChangeRequestData,
  ProfilePasswordChangeRequestData,
  IDispatch
} from '../types';

export const changeProfile = async (dispatch: IDispatch, data: ProfileChangeRequestData) => {
  const { response } = await ProfileAPI.changeProfile(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changeAvatar = async (dispatch: IDispatch, avatar: ProfileAvatarChangeRequestData) => {
  const data = new FormData();
  data.append('avatar', avatar);

  const { response } = await ProfileAPI.changeAvatar(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changePassword = async (
  dispatch: IDispatch,
  data: ProfilePasswordChangeRequestData
) => {
  await ProfileAPI.changePassword(data).then(res => res);
}
