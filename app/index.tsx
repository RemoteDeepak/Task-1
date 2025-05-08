import CustomButton from "@/src/components/Button";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomButton title='Hello World'/>
    </View>
  );
}
