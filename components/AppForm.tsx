import { Formik, FormikHelpers } from "formik";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "./AppButton";

interface AppFormProps<T> {
  initialValues: T;
  validationSchema?: any;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  children: ReactNode | ((props: any) => ReactNode); // allow JSX or render prop
  submitButtonTitle?: string;
  showSubmitButton?: boolean;
}

export function AppForm<T>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  submitButtonTitle = "Submit",
  showSubmitButton = true,
}: AppFormProps<T>) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {formikProps => (
        <View style={styles.container}>
          {typeof children === "function" ? children(formikProps) : children}

          {showSubmitButton && (
            <AppButton
              title={submitButtonTitle}
              onPress={formikProps.handleSubmit as any}
              style={{ marginTop: 20 }}
              isLoading={formikProps.isSubmitting} // pass loading state to button
              disabled={formikProps.isSubmitting}  // optional: disable while submitting
            />
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
