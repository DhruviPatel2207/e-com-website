import { IAuth, ISignupFormInitialValues } from '../../../types/types';
import API from '../../../utility/API';
import { USER_ENDPOINTS } from '../../../utility/Constants/END_POINTS';

interface IState {
  error?: [
    {
      name: string;
      errors: [string];
    },
  ];
  data?: IAuth;
}
export default async (
  value: ISignupFormInitialValues
): Promise<IState | null> => {
  try {
    const { data } = await API.get(USER_ENDPOINTS.GET_ALL_AUTH_DATA);

    for (const datas of data) {
      if (datas.email === value.email) {
        return {
          error: [
            {
              name: 'email',
              errors: ['already register'],
            },
          ],
        };
      }

      if (datas.username === value.username) {
        return {
          error: [
            {
              name: 'username',
              errors: ['already register'],
            },
          ],
        };
      }
    }
    const { data: userdata } = await API.post<IAuth>(
      USER_ENDPOINTS.ADD_USER_AUTH_DATA,
      value
    );
    return {
      data: userdata,
    };
  } catch (error) {
    return null;
  }
};
