import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import { useContext, useState } from "react";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { AuthStackScreenProps } from "@/navigations/AuthStack";
import { AuthContext } from "@/context/AuthContext";
import { FormInputText } from "@/components/FormInputText";

type FormRegistType = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};
export default function RegisterScreen({
  navigation,
}: AuthStackScreenProps<"Register">) {
  const [form, setForm] = useState<FormRegistType>({
    fullName: "",
    username: "",
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

  const onRegist = async () => {
    // Todo: handle register
    await setTokenLogin("token_login");
    navigation.navigate("Home", { screen: "ProductList" });
  };

  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginBottom: 30 }}>
        <Text style={globalStyle.logo}>Create Account</Text>
      </View>
      <View style={{ width: "95%", alignSelf: "center" }}>
        <FormInputText
          name={"username"}
          labelName="Username"
          placeholder="Input Your Username"
          value={form.username}
          onChange={onChangeForm}
        />
        <FormInputText
          name={"fullName"}
          labelName="Full Name"
          placeholder="Input Your Full Name"
          value={form.fullName}
          onChange={onChangeForm}
        />
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
          onPress={onRegist}
        >
          <Text style={globalStyle.textButton}>SIGN UP</Text>
        </TouchableOpacity>

        <View
          style={{
            alignSelf: "center",
            marginTop: utilities.margin.sm,
          }}
        >
          <TouchableOpacity onPress={goLogin}>
            <Text
              style={{
                textAlign: "center",
                color: utilities.fontColor.gray600,
              }}
            >
              Have an account ?{" "}
              <Text style={{ color: utilities.fontColor.gray900 }}>
                Sign In
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
