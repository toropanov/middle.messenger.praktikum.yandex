import ProfileAPI from "../api/profile";

import {
  ProfileChangeRequestData,
  ProfilePasswordChangeRequestData,
  IDispatch
} from '../types';

export const changeProfile = async (dispatch: IDispatch, data: ProfileChangeRequestData) => {
  const { response } = await ProfileAPI.changeProfile(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changeAvatar = async (dispatch: IDispatch, avatar: File) => {
  const data = new FormData() as FormData;
  data.append('avatar', avatar);

  const { response } = await ProfileAPI.changeAvatar(data).then(res => res);

  dispatch({
    user: JSON.parse(response)
  });
}

export const changePassword = async (
  _dispatch: IDispatch,
  data: ProfilePasswordChangeRequestData
) => {
  await ProfileAPI.changePassword(data).then(res => res);
}
