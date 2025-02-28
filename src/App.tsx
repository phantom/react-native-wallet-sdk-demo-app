import { createPhantom, PhantomConfig } from "@phantom/react-native-wallet-sdk";
import { View, StyleSheet, Button, Alert } from "react-native";
import * as Linking from "expo-linking";
import { useState } from "react";
import createTransferTransactionV0 from "./createTransferTransactionV0";
import { Connection, PublicKey } from "@solana/web3.js";

const opts: PhantomConfig = {
  redirectURI: Linking.createURL(""),
  sdkKey: "my-sdk-key",
};

const phantom = createPhantom(opts);

export default function App() {
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);

  const handleLogin = async () => {
    const addresses = await phantom.loginWithGoogle();
    setSolanaAddress(addresses[0].solana);
    // Persist the user's Solana address to storage
    // The account will stay logged in until the user logs out
  };

  if (!solanaAddress) {
    return (
      <View style={styles.container}>
        <Button title="Login with Phantom" onPress={handleLogin} />
      </View>
    );
  }

  // Sign a message or transaction with the Phantom Embedded wallet
  const handleSignMessage = async () => {
    const { signature } = await phantom.providers.solana.signMessage(
      new TextEncoder().encode("Hello, world!")
    );
    Alert.alert("Signature", JSON.stringify(signature));
  };

  const handleSignTransaction = async () => {
    const transaction = await createTransferTransactionV0(
      new PublicKey(solanaAddress),
      new Connection("https://api.mainnet-beta.solana.com")
    );
    const signedTransaction = await phantom.providers.solana.signTransaction(
      transaction
    );
    Alert.alert("Signature", JSON.stringify(signedTransaction.serialize()));
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Message" onPress={handleSignMessage} />
      <Button title="Sign Transaction" onPress={handleSignTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});
