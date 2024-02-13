import { StyleSheet } from "react-native";
import { utilities } from "./utilities";

export const globalStyle = StyleSheet.create({
  logo: {
    fontSize: 35,
    marginBottom: utilities.margin.md,
    fontWeight: "700",
    color: utilities.color.primary,
  },
  logoSm: {
    fontSize: 20,
    color: utilities.color.primary,
  },
  textInput: {
    marginBottom: utilities.margin.md,
    color: utilities.fontColor.gray800,
    fontSize: utilities.fontSize.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: utilities.color.primary,
    padding: utilities.padding.md,
    width: "100%",
    textAlignVertical: "top",
  },
  textInputSm: {
    marginBottom: utilities.margin.sm,
    color: utilities.fontColor.gray800,
    fontSize: utilities.fontSize.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: utilities.color.primary,
    padding: utilities.padding.xs,
    width: "100%",
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: utilities.color.primary,
    padding: utilities.padding.md,
    borderRadius: 16,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: utilities.margin.lg,
  },
  primarySmButton: {
    backgroundColor: utilities.color.primary,
    padding: utilities.padding.xs,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: utilities.margin.xs,
  },
  textButton: {
    color: "white",
    fontSize: utilities.fontSize.sm,
    fontWeight: "600",
  },
  textError: {
    color: utilities.fontColor.gray800,
    fontSize: utilities.fontSize.md,
    marginBottom: 5,
  },
});
