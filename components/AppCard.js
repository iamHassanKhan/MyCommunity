import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Video } from "expo-av";

const AppCard = ({ post, onLike, onComment, onShare, onReport }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const { width } = useWindowDimensions();

  const MAX_CHARACTERS = 120;
  const textExceedsLimit =
    post.description && post.description.length > MAX_CHARACTERS;

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(newLikedState ? likesCount + 1 : likesCount - 1);
    onLike?.(post.id, newLikedState);
  };

  const handleReport = () => {
    Alert.alert("Report Post", "Why are you reporting this post?", [
      { text: "Cancel", style: "cancel" },
      { text: "Spam", onPress: () => onReport?.(post.id, "spam") },
      {
        text: "Inappropriate",
        onPress: () => onReport?.(post.id, "inappropriate"),
      },
      { text: "Other", onPress: () => onReport?.(post.id, "other") },
    ]);
  };

  const handleShare = () => onShare?.(post);

  const handleDocumentPress = async (url) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert("Error", "Cannot open document");
    }
  };

  const getAspectRatio = () => (post.isVertical ? 9 / 16 : 16 / 9);

  const renderMedia = () => {
    if (post.video) {
      return (
        <View style={styles.mediaContainer}>
          <Video
            source={{ uri: post.video }}
            style={[
              styles.video,
              { width: width - 64, aspectRatio: getAspectRatio() },
            ]}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      );
    }

    if (post.image) {
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: post.image }}
            style={[
              styles.image,
              { width: width - 64, aspectRatio: getAspectRatio() },
            ]}
            resizeMode="cover"
          />
        </View>
      );
    }

    return null;
  };

  const renderDocument = () =>
    post.document ? (
      <TouchableOpacity
        style={styles.documentContainer}
        onPress={() => handleDocumentPress(post.document)}
      >
        <MaterialIcons name="description" size={20} color="#4a6fa5" />
        <Text style={styles.documentText} numberOfLines={1}>
          {post.documentName || "Document"}
        </Text>
      </TouchableOpacity>
    ) : null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <Text style={styles.userName}>{post.userName}</Text>
        </View>

        <TouchableOpacity onPress={handleReport}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Highlighted headline */}
      {post.headline && (
        <Text style={styles.headline}>{post.headline.toUpperCase()}:</Text>
      )}

      {/* Description */}
      {post.description && (
        <View style={styles.textContainer}>
          <Text
            style={styles.description}
            onPress={() => {
              if (textExceedsLimit) setExpanded(!expanded);
            }}
          >
            {expanded
              ? post.description
              : post.description.slice(0, MAX_CHARACTERS)}

            {textExceedsLimit && (
              <Text style={styles.readMore}>
                {expanded ? "" : "... See more"}
              </Text>
            )}
          </Text>
        </View>
      )}

      {/* Media */}
      {renderMedia()}

      {/* Document */}
      {renderDocument()}

      {/* Comment + Engagement Row */}
      <View style={styles.commentRow}>
        <View style={styles.commentPreview}>
          <Image
            source={{ uri: post.userAvatar }}
            style={styles.commentAvatar}
          />
          <Text style={styles.commentText}>Comments here</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? "#e74c3c" : "#666"}
            />
            <Text style={styles.actionText}>{likesCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.actionText}>{post.commentsCount || 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="arrow-redo-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  userName: { fontWeight: "600", fontSize: 15, color: "#222" },
  headline: {
    fontWeight: "700",
    color: "#0a7d4f",
    fontSize: 13,
    marginBottom: 6,
  },
  textContainer: { marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 20, color: "#333" },
  readMore: { color: "#007AFF", marginTop: 4, fontWeight: "500" },
  mediaContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: { borderRadius: 12, maxHeight: 280 },
  video: { borderRadius: 12, maxHeight: 320 },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  documentText: { marginLeft: 8, fontSize: 14, color: "#333" },
  commentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  commentPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
  },
  commentAvatar: { width: 20, height: 20, borderRadius: 10, marginRight: 4 },
  commentText: { fontSize: 10, color: "#666" },
  actions: { flexDirection: "row", alignItems: "center" },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  actionText: { marginLeft: 4, color: "#666", fontSize: 13 },
});

export default AppCard;
