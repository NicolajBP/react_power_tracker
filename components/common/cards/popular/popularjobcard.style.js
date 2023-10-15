import { StyleSheet, Dimensions } from "react-native";


import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  containerGreen: (selectedJob, item) => ({
    width: Dimensions.get("window").width*0.225,
    height: Dimensions.get("window").height*0.05,
    padding: SIZES.small,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.small,
    textAlign: 'center',
            color: '#000000',
            textAlignVertical: 'center',
    ...SHADOWS.medium,
    shadowColor: COLORS.green,
  }),
  containerRed: (selectedJob, item) => ({
    width: Dimensions.get("window").width*0.225,
    height: Dimensions.get("window").height*0.05,
    padding: SIZES.small,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.small,
    textAlign: 'center',
            color: '#000000',
            textAlignVertical: 'center',
    ...SHADOWS.medium,
    shadowColor: COLORS.red,
  }),
  containerBlue: (selectedJob, item) => ({
    width: Dimensions.get("window").width*0.225,
    height: Dimensions.get("window").height*0.05,
    padding: SIZES.small,
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.small,
    textAlign: 'center',
            color: '#000000',
            textAlignVertical: 'center',
    ...SHADOWS.medium,
    shadowColor: COLORS.blue,
  }),
  logoContainer: (selectedJob, item) => ({
    width: Dimensions.get("window").width*0.225,
    height: Dimensions.get("window").height*0.05,
    // backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.small,
    justifyContent: "start",
    alignItems: "start",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: {
    fontSize: SIZES.large - 2,
    fontFamily: FONT.bold,
    color: "#000000",
  },
  antalTimer: {
    fontSize: SIZES.xLarge + 2,
    fontFamily: FONT.bold,
    color: "#000000",
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
