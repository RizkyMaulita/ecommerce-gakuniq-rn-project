import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import { useContext, useState } from "react";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { AuthStackScreenProps } from "@/navigations/AuthStack";
import { AuthContext } from "@/context/AuthContext";
import { FormInputText } from "@/components/FormInputText";

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<"Login">) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setTokenLogin } = useContext(AuthContext);

  const onChangeForm = (value: string, key: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async () => {
    // Todo: handle login
    await setTokenLogin("token_login");
    navigation.navigate("Home", { screen: "ProductList" });
  };

  const goRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginBottom: 20 }}>
        <Logo />
      </View>
      <View style={{ width: "95%", alignSelf: "center" }}>
        <FormInputText
          name={"email"}
          labelName="Email"
          placeholder="Input Your Email"
          value={form.email}
          type={"email-address"}
          onChange={onChangeForm}
        />
        <FormInputText
          name={"password"}
          labelName="Password"
          placeholder="Input Your Password"
          value={form.password}
          onChange={onChangeForm}
          isSecureText
          style={{ marginBottom: 20 }}
        />
        <TouchableOpacity
          style={[globalStyle.primaryButton, { width: "100%" }]}
          onPress={onLogin}
        >
          <Text style={globalStyle.textButton}>SIGN IN</Text>
        </TouchableOpacity>

        <View
          style={{
            alignSelf: "center",
            gap: utilities.margin.xs,
            marginTop: utilities.margin.sm,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: utilities.fontColor.gray900,
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goRegister}>
            <Text
              style={{
                textAlign: "center",
                color: utilities.fontColor.gray600,
              }}
            >
              Don't have an account ?{" "}
              <Text style={{ color: utilities.fontColor.gray900 }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: utilities.padding.xl,
  },
});
