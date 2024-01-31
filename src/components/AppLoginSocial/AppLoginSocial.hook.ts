import {TYPE_BTN_SOCIAL} from '@constants';
import appleAuth, {
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';
import {APP_SOCIAL_TYPES} from '@models';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
export function useModel(props: APP_SOCIAL_TYPES) {
  const {type} = props;
  const goToScreen = () => {
    navigate(SCREEN_ROUTE.HOME_PAGE);
  };
  //login gg
  const loginByGoogle = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
    } catch (error) {
      console.log(error);
    }
  };
  //login apple
  const loginByApple = async () => {
    const appleAuthRequestResponse: AppleRequestResponse =
      await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const tokenApple: string | null = appleAuthRequestResponse?.identityToken;
      console.log({tokenApple});
    } else {
      console.log('err');
    }
  };
  const loginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          console.log('USER CANCEL ACTION');
        } else {
          let params = {};

          AccessToken.getCurrentAccessToken().then(
            (data: AccessToken | null) => {
              params = {
                facebook_id: data?.userID,
                access_token: data?.accessToken,
              };
              Profile.getCurrentProfile().then(
                (dataProfile: Profile | null) => {
                  params = {
                    social_id: dataProfile?.userID,
                    email: dataProfile?.email || '',
                    full_name:
                      [dataProfile?.firstName, dataProfile?.lastName].join(
                        ' ',
                      ) || '',
                  };
                  console.log({params});
                },
              );
            },
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onPressSocial = () => {
    switch (type) {
      case TYPE_BTN_SOCIAL.GOOGLE: {
        return loginByGoogle();
      }
      case TYPE_BTN_SOCIAL.FACEBOOK: {
        return loginFacebook();
      }
      case TYPE_BTN_SOCIAL.APPLE: {
        return loginByApple();
      }
      default: {
        return;
      }
    }
  };

  return {
    onPressSocial,
  };
}
