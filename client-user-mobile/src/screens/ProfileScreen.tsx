import { AuthContext } from "@/context/AuthContext";
import { ProfileStackScreenProps } from "@/navigations/ProfileStack";
import { globalStyle } from "@/styles/global";
import { utilities } from "@/styles/utilities";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"MainProfile">) {
  const { deleteUserLogin } = useContext(AuthContext);

  const doLogout = async () => {
    await deleteUserLogin();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={styles.btnLogout} onPress={doLogout}>
        <Text style={[globalStyle.textButton]}>Logout</Text>
      </TouchableOpacity>
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
