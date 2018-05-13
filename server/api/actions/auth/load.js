import { User } from '../../models';
import { parseToken } from '../../common/utils';

export default function load(req) {
  return new Promise((resolve, reject) => {
    if (req.cookies && req.cookies.accessToken) {
      console.log('>>>>>>>>>>>>>> Api > Actions > Auth > load > YES Cookies && AccessToken');
      let payload = {};
      try {
        payload = parseToken(req.cookies.accessToken);
      } catch (e) {
        reject(new Error('Cookie is not valid'));
      }

      if (Math.round(new Date().getTime() / 1000) < payload.exp) {
        User.findOne({ email: payload.sub.email }, (err, user) => {
          if (err) {
            reject(new Error('Something went wrong'));
            return;
          }

          if (!user) {
            reject(new Error('User not found!'));
            return;
          }

          resolve({
            accessToken: req.cookies.accessToken,
            user: {
              fullName: user.fullName,
              email: user.email
            }
          });
        });
      } else {
        reject(new Error('Cookie expired!'));
      }
    } else {
      console.log('>>>>>>>>>>>>>> Api > Actions > Auth > load > NO Cookies && AccessToken');
      resolve({ isAnonymous: true });
    }
  });
}
