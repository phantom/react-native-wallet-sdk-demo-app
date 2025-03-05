import {
  createPhantom,
  LoginOptions,
  PhantomConfig,
} from "@phantom/react-native-wallet-sdk";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoginWithGoogle = async () => {
    const addresses = await phantom.loginWithGoogle();
    setSolanaAddress(addresses[0].solana);
    // Persist the user's Solana address to storage
    // The account will stay logged in until the user logs out
  };

  const handleLoginWithApple = async () => {
    const addresses = await phantom.loginWithApple();
    setSolanaAddress(addresses[0].solana);
    // Persist the user's Solana address to storage
    // The account will stay logged in until the user logs out
  };

  // Sign a message or transaction with the Phantom Embedded wallet
  const handleSignMessage = async () => {
    const { signature } = await phantom.providers.solana.signMessage(
      new TextEncoder().encode("Hello, world!")
    );
    Alert.alert("Signature", JSON.stringify(signature));
  };

  const handleSignTransaction = async () => {
    const transaction = await createTransferTransactionV0(
      new PublicKey(solanaAddress || ""),
      new Connection("https://api.mainnet-beta.solana.com")
    );
    const signedTransaction = await phantom.providers.solana.signTransaction(
      transaction
    );
    Alert.alert("Signature", JSON.stringify(signedTransaction.serialize()));
  };

  const handleLogout = async () => {
    await phantom.logout();
    setSolanaAddress(null);
  };

  const handleDismissBrowserIn10Seconds = async () => {
    setTimeout(() => {
      phantom.dismissBrowser();
    }, 10_000);
  };

  if (!solanaAddress) {
    return (
      <View style={styles.container}>
        <Button
          title="Login with Phantom"
          onPress={() => setIsModalVisible(true)}
        />
        {isModalVisible && (
          <View>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "flex-end",
                }}
                activeOpacity={1}
                onPress={() => setIsModalVisible(false)}
              >
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      backgroundColor: "#181818",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      width: "100%",
                    }}
                  >
                    <LoginOptions
                      onGoogleLogin={() => handleLoginWithGoogle()}
                      onAppleLogin={() => handleLoginWithApple()}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Button title="Sign Message" onPress={handleSignMessage} />
      <Button title="Sign Transaction" onPress={handleSignTransaction} />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Dismiss Browser in 10 seconds" onPress={handleDismissBrowserIn10Seconds} />
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
