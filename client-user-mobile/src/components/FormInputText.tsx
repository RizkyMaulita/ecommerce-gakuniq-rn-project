import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type FormInputTextProps = {
  name: string;
  labelName: string;
  value: string;
  placeholder: string;
  onChange: (text: string, name: string) => void;
  type?: KeyboardTypeOptions;
  style?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  styleInput?: StyleProp<TextStyle>;
  isSecureText?: boolean;
  isRequired?: boolean;
} & Omit<TextInputProps, "onChange">;

export function FormInputText({
  name,
  labelName,
  value,
  placeholder,
  onChange,
  type,
  style = {},
  styleLabel = {},
  styleInput = {},
  isSecureText,
  isRequired,
  ...propsTextInput
}: FormInputTextProps) {
  return (
    <View style={style}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.label, styleLabel]}>{labelName}</Text>
        {isRequired && <Text style={[styles.label]}>(required)</Text>}
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type}
        onChangeText={(text: string) => onChange(text, name)}
        style={[globalStyle.textInput, styleInput]}
        secureTextEntry={isSecureText}
        {...propsTextInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: utilities.padding.md,
    paddingVertical: utilities.padding.md / 2,
    color: utilities.fontColor.gray600,
  },
});
