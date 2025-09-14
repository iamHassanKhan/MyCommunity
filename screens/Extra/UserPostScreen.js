// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   TextInput,
//   FlatList,
// } from "react-native";
// import AppScreenUI from "../../components/AppScreenUI";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS, SPACING } from "../../theme/theme";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";

// export default function UserPostScreen({ navigation }) {
//   const [postText, setPostText] = useState("");
//   const [media, setMedia] = useState([]);

//   // Pick image/video
//   const pickImageOrVideo = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setMedia((prev) => [
//         ...prev,
//         { type: "media", uri: result.assets[0].uri },
//       ]);
//     }
//   };

//   // Pick document
//   const pickDocument = async () => {
//     let result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//       copyToCacheDirectory: true,
//     });

//     if (result.type === "success") {
//       setMedia((prev) => [
//         ...prev,
//         { type: "document", name: result.name, uri: result.uri },
//       ]);
//     }
//   };

//   // Remove selected media
//   const removeMedia = (index) => {
//     setMedia((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Render media/document preview
//   const renderMediaItem = ({ item, index }) => {
//     if (item.type === "media") {
//       return (
//         <View style={styles.mediaWrapper}>
//           <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
//           <TouchableOpacity
//             style={styles.removeButton}
//             onPress={() => removeMedia(index)}
//           >
//             <Ionicons name="close-circle" size={20} color="red" />
//           </TouchableOpacity>
//         </View>
//       );
//     } else if (item.type === "document") {
//       return (
//         <View style={styles.documentWrapper}>
//           <Ionicons
//             name="document-text-outline"
//             size={24}
//             color={COLORS.primary}
//           />
//           <Text style={styles.documentName}>{item.name}</Text>
//           <TouchableOpacity
//             style={{ marginLeft: 4 }}
//             onPress={() => removeMedia(index)}
//           >
//             <Ionicons name="close-circle" size={20} color="red" />
//           </TouchableOpacity>
//         </View>
//       );
//     }
//     return null;
//   };

//   const handlePost = () => {
//     if (!postText.trim() && media.length === 0) return;
//     // ✅ Upload post to Firebase or backend
//     navigation.goBack();
//   };

//   return (
//     <AppScreenUI>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="close" size={28} color={COLORS.backgroundDark} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.postButton,
//             !postText.trim() && media.length === 0 && styles.postButtonDisabled,
//           ]}
//           disabled={!postText.trim() && media.length === 0}
//           onPress={handlePost}
//         >
//           <Text style={styles.postButtonText}>Post</Text>
//         </TouchableOpacity>
//       </View>

//       {/* User Row */}
//       <View style={styles.userRow}>
//         <Image
//           source={{ uri: "https://i.pravatar.cc/150" }}
//           style={styles.avatar}
//         />
//         <TextInput
//           value={postText}
//           onChangeText={setPostText}
//           placeholder="What's happening?"
//           placeholderTextColor={COLORS.gray}
//           multiline
//           style={styles.postInput}
//         />
//       </View>

//       {/* Media Preview */}
//       {media.length > 0 && (
//         <FlatList
//           data={media}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={renderMediaItem}
//           horizontal
//           style={styles.mediaList}
//           showsHorizontalScrollIndicator={false}
//         />
//       )}

//       {/* Bottom Action Bar */}
//       <View style={styles.actionsContainer}>
//         <TouchableOpacity onPress={pickImageOrVideo}>
//           <Ionicons name="image-outline" size={26} color={COLORS.primary} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={pickDocument}>
//           <Ionicons
//             name="document-text-outline"
//             size={26}
//             color={COLORS.secondary}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Ionicons name="happy-outline" size={26} color={COLORS.orange} />
//         </TouchableOpacity>
//       </View>
//     </AppScreenUI>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: SPACING.md,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.grayLight,
//   },
//   postButton: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   postButtonDisabled: {
//     backgroundColor: COLORS.gray,
//   },
//   postButtonText: {
//     color: COLORS.white,
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   userRow: {
//     flexDirection: "row",
//     padding: SPACING.md,
//   },
//   avatar: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     marginRight: SPACING.sm,
//   },
//   postInput: {
//     flex: 1,
//     fontSize: 16,
//     color: COLORS.backgroundDark,
//     minHeight: 80,
//   },
//   mediaList: {
//     marginLeft: 60,
//     marginVertical: SPACING.sm,
//   },
//   mediaWrapper: {
//     position: "relative",
//     marginRight: SPACING.sm,
//   },
//   mediaPreview: {
//     width: 120,
//     height: 120,
//     borderRadius: 12,
//   },
//   removeButton: {
//     position: "absolute",
//     top: -6,
//     right: -6,
//   },
//   documentWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//     padding: 8,
//     borderRadius: 8,
//     marginRight: SPACING.sm,
//   },
//   documentName: {
//     marginLeft: 6,
//     fontSize: 12,
//     color: COLORS.backgroundDark,
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//     paddingHorizontal: 60,
//     paddingVertical: 10,
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppScreenUI from "../../components/AppScreenUI";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../theme/theme";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function UserPostScreen({ navigation }) {
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState([]);

  // Pick image/video
  const pickImageOrVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia((prev) => [
        ...prev,
        { type: "media", uri: result.assets[0].uri },
      ]);
    }
  };

  // Pick document
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (result.type === "success") {
      setMedia((prev) => [
        ...prev,
        { type: "document", name: result.name, uri: result.uri },
      ]);
    }
  };

  // Remove selected media
  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  // Render media/document preview
  const renderMediaItem = ({ item, index }) => {
    if (item.type === "media") {
      return (
        <View style={styles.mediaWrapper}>
          <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeMedia(index)}
          >
            <Ionicons name="close-circle" size={20} color="red" />
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === "document") {
      return (
        <View style={styles.documentWrapper}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.documentName}>{item.name}</Text>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => removeMedia(index)}
          >
            <Ionicons name="close-circle" size={20} color="red" />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const handlePost = () => {
    if (!postText.trim() && media.length === 0) return;
    // ✅ Upload post to Firebase or backend
    navigation.goBack();
  };

  return (
    <AppScreenUI>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="on-drag"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color={COLORS.backgroundDark} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.postButton,
                !postText.trim() &&
                  media.length === 0 &&
                  styles.postButtonDisabled,
              ]}
              disabled={!postText.trim() && media.length === 0}
              onPress={handlePost}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* User Row */}
          <View style={styles.userRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
            <TextInput
              value={postText}
              onChangeText={setPostText}
              placeholder="What's happening?"
              placeholderTextColor={COLORS.gray}
              multiline
              style={styles.postInput}
            />
          </View>

          {/* Media Preview */}
          {media.length > 0 && (
            <FlatList
              data={media}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderMediaItem}
              horizontal
              style={styles.mediaList}
              showsHorizontalScrollIndicator={false}
            />
          )}

          {/* Bottom Action Bar */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={pickImageOrVideo}>
              <Ionicons name="image-outline" size={26} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickDocument}>
              <Ionicons
                name="document-text-outline"
                size={26}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="happy-outline" size={26} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenUI>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  postButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  postButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
  userRow: {
    flexDirection: "row",
    padding: SPACING.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: SPACING.sm,
  },
  postInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.backgroundDark,
    minHeight: 80,
  },
  mediaList: {
    marginLeft: 60,
    marginVertical: SPACING.sm,
  },
  mediaWrapper: {
    position: "relative",
    marginRight: SPACING.sm,
  },
  mediaPreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  removeButton: {
    position: "absolute",
    top: -6,
    right: -6,
  },
  documentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  documentName: {
    marginLeft: 6,
    fontSize: 12,
    color: COLORS.backgroundDark,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});
