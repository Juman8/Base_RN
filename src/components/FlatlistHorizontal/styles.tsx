import {Colors, FontSize, FontWithBold_Poppins} from "@theme";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  viewText: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  txtLabel: {...FontWithBold_Poppins.Weight_600, fontSize: FontSize.Font24},
  viewMore: {color: Colors.green, textDecorationLine: 'underline', ...FontWithBold_Poppins.Weight_500}
})