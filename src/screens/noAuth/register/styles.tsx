import {StyleSheet} from 'react-native';
import {Colors, Spacing, FontSize, FontWithBold_Barlow} from '@theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.width24,
  },
  form: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontSize: FontSize.Font24,
    marginTop: Spacing.height30,
    ...FontWithBold_Barlow.Bold_Barlow_500,
  },
  des: {
    color: Colors.black2,
    fontSize: FontSize.Font14,
    marginTop: Spacing.height8,
    ...FontWithBold_Barlow.Light_Barlow_400,
    marginBottom: Spacing.height44,
  },
  btn: {
    borderRadius: Spacing.height100,
    marginTop: Spacing.height16,
  },
  viewLoginSocial: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  txtOr: {
    fontSize: FontSize.Font14,
    marginVertical: Spacing.height16,
    color: '#7C7C7C',
    ...FontWithBold_Barlow.Light_Barlow_400,
    flex: 1,
    textAlign: 'center',
  },
  txtLogin: {
    fontSize: FontSize.Font14,
    color: Colors.blue,
    ...FontWithBold_Barlow.Bold_Barlow_600,
    flex: 1,
  },

  txtPolicyTerm: {
    fontSize: FontSize.Font12,
    color: '#2875D0',
    ...FontWithBold_Barlow.Light_Barlow_400,
  },
  txtPolicyNormal: {
    color: '#514F6E',
    fontSize: FontSize.Font12,
    ...FontWithBold_Barlow.Light_Barlow_400,
  },
});
