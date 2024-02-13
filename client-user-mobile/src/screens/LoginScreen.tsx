import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import { useState } from "react";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigations/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (value: string, key: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = () => {
    // Todo: handle login
    navigation.navigate("Home" as never);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => onChangeForm(text, "email")}
        style={[globalStyle.textInput, { marginBottom: 25, marginTop: 20 }]}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => onChangeForm(text, "password")}
        style={[globalStyle.textInput, { marginBottom: 35 }]}
      />
      <TouchableOpacity style={globalStyle.primaryButton} onPress={onLogin}>
        <Text style={globalStyle.textButton}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: utilities.padding.xl,
  },
});
