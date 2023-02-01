import {Colors, deviceWidth, FontSize, FontWithBold_Barlow, Spacing} from '@theme';
import {DEVICE} from '@utils';
import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: deviceWidth,
  },

  upper: {
    marginTop: Spacing.height56,
    justifyContent: 'center',
  },

  main: {
    paddingHorizontal: Spacing.width24,
    flex: 1,
    // backgroundColor: 'red',
  },

  lower: {
    // backgroundColor: 'red',
    flex: 1,
    // marginTop: Spacing.height92,
    marginBottom: Spacing.height32,
    justifyContent: 'center',
    paddingHorizontal: Spacing.width24,
    alignItems: 'center',
    flexDirection: 'row',
  },

  heading: {
    ...FontWithBold_Barlow.Light_Barlow_400,
    fontSize: FontSize.Font35,
    color: Colors.white,
  },

  desc: {
    ...FontWithBold_Barlow.Light_Barlow_400,
    fontSize: FontSize.Font17,
    color: Colors.gray,
    marginTop: Spacing.height16,
    marginBottom: Spacing.height40,
    lineHeight: Spacing.height28,
    // lineHeight: Spacing.height20,
  },

  phone: {
    fontSize: FontSize.Font17,
    marginBottom: Spacing.height40,
  },

  input: {
    marginBottom: Spacing.height16,
    height: Spacing.height54,
  },
  iconMutil: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: Spacing.width24,
    width: Spacing.width24,
    tintColor: Colors.white,
  },
  headerPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockContainer: {
    flex: 1,
    marginLeft: Spacing.width8,
  },
  blockContent: {
    flexDirection: 'row',
    // flex: 1,
    // flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  postContent: {
    marginTop: Spacing.height16,
  },
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  blurImage: {
    width: DEVICE.width - Spacing.width30,
    aspectRatio: 1,
    borderRadius: Spacing.height14,
  },
  iconContainer: {
    position: 'absolute',
    opacity: 0.9,
  },
  tag: {
    position: 'absolute',
    opacity: 0.9,
    bottom: 10,
    left: 10,
  },
  rowMargin: {
    flexDirection: 'row',
    marginBottom: Spacing.height10,
  },
  rowMarginTop: {
    marginTop: Spacing.height16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerKrunk: {
    flex: 0.6,
  },
  contentKrunk: {
    width: Spacing.width44,
    height: Spacing.width44,
    borderRadius: Spacing.width44 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalUserContainer: {
    width: Spacing.width44,
    height: Spacing.width44,
    borderRadius: Spacing.width44 / 2,
    backgroundColor: Colors.gray2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButton: {
    paddingHorizontal: 20,
    flex: 0.6,
  },
  rowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.width18,
  },
  rowFooterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLike: {
    marginLeft: Spacing.width10,
    marginRight: Spacing.width15,
  },
  image: {
    width: Spacing.width52,
    height: Spacing.width52,
    borderRadius: Spacing.width52 / 2,
  },
  scroll: {
    flexGrow: 1,
    width: DEVICE.width - Spacing.width30,
  },
  button: {
    width: DEVICE.width - Spacing.width30,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    position: 'absolute',
    opacity: 0.9,
  },
  indexImageContainer: {
    position: 'absolute',
    top: Spacing.width10,
    right: Spacing.width10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: Spacing.width15,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
