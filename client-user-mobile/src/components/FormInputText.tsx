import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface FormInputTextProps {
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
}

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
}: FormInputTextProps) {
  return (
    <View style={style}>
      <Text style={[styles.label, styleLabel]}>{labelName}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type}
        onChangeText={(text: string) => onChange(text, name)}
        style={[globalStyle.textInput, styleInput]}
        secureTextEntry={isSecureText}
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
