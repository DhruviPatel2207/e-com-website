import { message } from 'antd';
import API from '../../utility/API';
import { USER_ENDPOINTS } from '../../utility/Constants/END_POINTS';

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await API.get(
      USER_ENDPOINTS.GET_ALL_AUTH_DATA_ITEM(email)
    );
    if (data.length === 0) {
      return {
        error: [
          {
            name: 'email',
            errors: ['invalid email'],
          },
        ],
      };
    } else {
      const userobject = data[0];
      const userPassword = userobject.password;

      if (userPassword !== password) {
        return {
          error: [
            {
              name: 'password',
              errors: ['invalid password'],
            },
          ],
        };
      } else {
        return {
          data: data[0],
        };
      }
    }
  } catch (error) {
    message.error('Server Error happend');
    return {
      error: [],
    };
  }
};
