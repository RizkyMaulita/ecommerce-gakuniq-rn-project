import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import { useContext, useState } from "react";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { AuthStackScreenProps } from "@/navigations/AuthStack";
import { AuthContext } from "@/context/AuthContext";
import { FormInputText } from "@/components/FormInputText";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/apollo/mutations/user";

type FormLoginType = {
  email: string;
  password: string;
};

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<"Login">) {
  const [form, setForm] = useState<FormLoginType>({
    email: "",
    password: "",
  });
  const { setUserLogin } = useContext(AuthContext);

  const [dispatchLogin] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      if (res?.login?.data) {
        const { token, user } = res.login.data;

        await setUserLogin({
          token,
          userId: user?.id,
          username: user?.username,
        });

        navigation.navigate("ProductList");
      }
    },
  });

  const onChangeForm = (value: string, key: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async () => {
    try {
      await dispatchLogin({
        variables: {
          username: form.email,
          password: form.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const goRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginBottom: 20 }}>
        <Logo />
      </View>

      {/* Todo: Handle Error */}

      <View style={{ width: "95%", alignSelf: "center" }}>
        <FormInputText
          name={"email"}
          labelName="Email / Username"
          placeholder="Input Your Email / Username"
          value={form.email}
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
