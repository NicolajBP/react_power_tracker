import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    width: Dimensions.get("window").width,
    height: 75,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xsmall / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    // borderRadius: SIZES.small / 10,
  }),
});

export default styles;
