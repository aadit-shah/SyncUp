import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";

export default function Events() {
  const events = useQuery(api.events.myEvents);
  return (
    <View style={styles.container}>
      {events?.map(({ _id, Name }) => (
        <Text key={_id}>{Name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});