import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

import auth from '@react-native-firebase/auth';

// Initialize Apple Sign-In

const SigningWithApple = () => {
  //   async function onAppleButtonPress() {
  //     // perform the Apple Sign-In request
  //     try {
  //       const appleAuthRequestResponse = await appleAuth.performRequest({
  //         requestedOperation: appleAuth.Operation.LOGIN,
  //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //       });

  //       // Get user token details
  //       console.log('Apple Sign-In Response', appleAuthRequestResponse);

  //         const { identityToken } = appleAuthRequestResponse;
  //         if (identityToken) {
  //             const provider = new OAthProfildr
  //         }
  //       /*
  //              if(get Email id){
  //                  1) store the email and user_id in database
  //              }
  //              2) call api to i send user_id and get response email id

  //              3) cheking google accoutn extist or not  => email

  //              reposense = true (email is reagister ) => dashboard
  //              reposense = false (email not register ) => register => email
  //         */
  //     } catch (error) {
  //       if (error.code === appleAuth.Error.CANCELED) {
  //         console.log('User canceled Apple Sign-In.');
  //       } else {
  //         console.error('Error occurred during Apple Sign-In.', error);
  //       }
  //     }
  //   }

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log(appleAuthRequestResponse, '=====apple resposne ===');
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    const user = await auth().signInWithCredential(appleCredential);
    console.log(user, '***** user ****');

    /*
      Main Point 
      -> if user first time in app 
    
        1) select fake email ==> store firebase database  ==> enter original email ==> register with fake and  original email both  ==> logout
        2) retrun in app after some time  ==> Login with apple  ==> fake email checking /google api => if user exist ==> login else ==> register 

        So final flow is
        1) user select signing with apple with fake email ==> checking fake email in database  ==> if not exist then register with fake and original email ==> if exist then Login.
        1) user select signing with apple with orignal email ==> checking orignal  email in database  ==> if not exist then register with fake and original email ==> if exist then Login.
        */

    // Sign the user in with the credential
    return user;
  }

  async function revokeSignInWithAppleToken() {
    // Get an authorizationCode from Apple
    const {authorizationCode} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.REFRESH,
    });

    // Ensure Apple returned an authorizationCode
    if (!authorizationCode) {
      throw new Error(
        'Apple Revocation failed - no authorizationCode returned',
      );
    }
    const remove = await auth().revokeToken(authorizationCode);
    // Revoke the token
    return remove;
  }
  //   async function performAppleSignOut() {
  //     try {
  //       const appleAuthRequestResponse = await appleAuth.performRequest({
  //         requestedOperation: appleAuth.Operation.LOGOUT,
  //       });

  //       // Check if the operation was successful
  //       if (appleAuthRequestResponse.success) {
  //         console.log('User successfully signed out from Apple.');
  //       } else {
  //         console.error(
  //           'Error occurred during Apple Sign-Out:',
  //           appleAuthRequestResponse,
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Error occurred during Apple Sign-Out:', error);
  //     }
  //   }

  return (
    <View
      style={{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      {/* <AppleButton
        onPress={onAppleButtonPress}
        title="Sign in with Apple"
        color="black"
      /> */}
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />

      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => revokeSignInWithAppleToken()}
      />
    </View>
  );
};

export default SigningWithApple;

const styles = StyleSheet.create({});
