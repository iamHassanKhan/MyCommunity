import React, { ReactNode } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ visible, onClose, children }) => {
  const { colors } = useTheme();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.card }]}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ color: colors.primary }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    borderRadius: 12,
    padding: 20,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
});

export default AppModal;
