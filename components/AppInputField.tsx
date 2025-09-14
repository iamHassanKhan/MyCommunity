import { useField } from "formik";
import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../theme/theme";
import AppInput from "./AppInput";

interface AppInputFieldProps {
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

 const AppInputField: React.FC<AppInputFieldProps> = ({
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <AppInput
        placeholder={placeholder}
        value={field.value}
        onChangeText={helpers.setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {meta.touched && meta.error ? (
        <Text style={{ color: COLORS.danger, marginTop: 4 }}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

export default AppInputField;