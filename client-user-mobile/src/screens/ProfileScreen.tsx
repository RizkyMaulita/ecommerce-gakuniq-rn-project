import { AuthContext } from "@/context/AuthContext";
import { GET_MY_PROFILE } from "@/lib/apollo/queries/user";
import { UserType } from "@/lib/types/users.types";
import { MainTabScreenProps } from "@/navigations/MainTab";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function ProfileScreen({
  navigation,
}: MainTabScreenProps<"Profile">) {
  const { deleteUserLogin } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_MY_PROFILE);
  const dataUser: UserType = data?.getMyProfile?.data || {};

  const doLogout = async () => {
    await deleteUserLogin();
    navigation.navigate("AuthStack", {
      screen: "Login",
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: utilities.fontSize.lg, fontWeight: "600" }}>
          Akun Saya
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={
              dataUser.imgUrl
                ? { uri: dataUser.imgUrl }
                : require("assets/user.png")
            }
            style={{ height: 50, width: 50 }}
          />
        </View>
        <View style={{ flex: 3, gap: 5, paddingLeft: 5 }}>
          <Text style={{ fontSize: utilities.fontSize.lg }}>
            {dataUser.username || "-"}
          </Text>
          <View
            style={{
              width: "30%",
              borderWidth: 1,
              padding: 5,
              borderRadius: 8,
              backgroundColor: "red",
              borderColor: "red",
            }}
          >
            <Text
              style={{
                fontSize: utilities.fontSize.sm,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              {dataUser.statusVerify}
            </Text>
          </View>
          <Text style={{ fontSize: utilities.fontSize.md, marginBottom: 5 }}>
            {dataUser.email || "-"}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Feather name={"edit"} size={utilities.iconSize.lg - 2} />
        </View>
      </View>
      <View style={{ bottom: 0, position: "absolute", width: "100%" }}>
        <TouchableOpacity style={styles.btnLogout} onPress={doLogout}>
          <Text style={[globalStyle.textButton]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnLogout: {
    ...globalStyle.primaryButton,
    backgroundColor: utilities.fontColor.gray600,
    width: "85%",
    padding: 5,
    height: 45,
    borderRadius: 20,
    alignSelf: "center",
  },
});
