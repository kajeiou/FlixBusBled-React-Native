import { StyleSheet, Text, View } from "react-native";

export default function Title({ text, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    color: "#F27438",
    fontWeight: 'bold',
  },
});
