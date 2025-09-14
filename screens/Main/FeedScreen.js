import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import AppScreenUI from "../../components/AppScreenUI";
import { COLORS, SPACING, FONT_SIZES, RADIUS } from "../../theme/theme";
import AppHeader from "../../components/AppHeader";
import AppCard from "../../components/AppCard";

export default function FeedScreen({ navigation }) {
  const posts = [
    {
      id: "1",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80",
      userName: "John Doe",
      timestamp: "2 hours ago",
      description: "This is a post with a short description.",
      image:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=1000&q=80",
      likesCount: 24,
      commentsCount: 5,
      isLiked: false,
    },
    {
      id: "2",
      userAvatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
      userName: "Jane Smith",
      timestamp: "5 hours ago",
      description:
        "This is a post with a very long description that should be truncated. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // horizontal sample
      likesCount: 42,
      commentsCount: 12,
      isLiked: true,
    },
    {
      id: "3",
      userAvatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=500&q=80",
      userName: "Alex Johnson",
      timestamp: "1 day ago",
      description: "Check out this document I found!",
      document:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      documentName: "Important Report.pdf",
      likesCount: 7,
      commentsCount: 2,
      isLiked: false,
    },
    {
      id: "4",
      userAvatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
      userName: "Sarah Williams",
      timestamp: "2 days ago",
      description: "Loving this new photo I took!",
      likesCount: 15,
      commentsCount: 3,
      isLiked: false,
    },
    {
      id: "5",
      userAvatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
      userName: "TikTok Style",
      timestamp: "3 days ago",
      description: "Here’s a vertical TikTok-style video demo 🚀",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // vertical sample
      isVertical: true, // 👈 flag for vertical video
      likesCount: 120,
      commentsCount: 34,
      isLiked: false,
    },
  ];

  const handleLike = (postId, isLiked) => {
    console.log(`Post ${postId} was ${isLiked ? "liked" : "unliked"}`);
  };

  const handleComment = (postId) => {
    console.log(`Comment on post ${postId}`);
  };

  const handleShare = (post) => {
    console.log(`Share post ${post.id}`);
  };

  const handleReport = (postId, reason) => {
    console.log(`Report post ${postId} for reason: ${reason}`);
  };

  return (
    <AppScreenUI scroll={false}>
      {/* Header */}
      <AppHeader
        image={require("../../images/community1.png")}
        userName="Hassan Khan"
        welcomeMessage="Welcome back"
        rightIcons={[
          {
            name: "notifications-outline",
            onPress: () => console.log("Notifications pressed"),
          },
        ]}
      />

      {/* Post bar */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Post");
        }}
        style={styles.postContainer}
      >
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.postText}>Post your Activity</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {["News feed", "Top Traders", "Followers", "Following"].map(
          (tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, index === 0 && styles.tabButtonActive]}
            >
              <Text
                style={[styles.tabText, index === 0 && styles.tabTextActive]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Feed List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppCard
            post={item}
            onLike={handleLike}
            onComment={() => handleComment(item.id)}
            onShare={() => handleShare(item)}
            onReport={(postId, reason) => handleReport(postId, reason)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </AppScreenUI>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.sm,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.round,
    marginTop: SPACING.sm,
    elevation: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.round,
    marginRight: SPACING.sm,
  },
  postText: {
    color: COLORS.grayDark,
    fontSize: FONT_SIZES.xs,
    fontWeight: "500",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  tabButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.grayLight,
    marginHorizontal: SPACING.xxs,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
    fontWeight: "400",
  },
  tabTextActive: {
    color: COLORS.black,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
});
