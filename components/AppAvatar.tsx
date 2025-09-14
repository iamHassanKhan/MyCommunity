import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface AppAvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  rounded?: boolean;
  style?: object;
  placeholderColor?: string;
}

const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  size = 50,
  rounded = true,
  style,
  placeholderColor = "#ccc",
}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: rounded ? size / 2 : 8,
          backgroundColor: placeholderColor,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {source && <Image source={source} style={{ width: size, height: size }} />}
    </View>
  );
};

export default AppAvatar;
