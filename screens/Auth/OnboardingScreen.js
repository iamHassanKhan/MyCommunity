import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../theme/theme";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      key: "slide1",
      title: "Welcome to VillageConnect",
      text: "Connecting people in your community for support and help and get to know about events.",
      image: require("../../images/community1.png"),
    },
    {
      key: "slide2",
      title: "Blood Donation",
      text: "Easily find and connect with donors in emergencies.",
      image: require("../../images/community1.png"),
    },
    {
      key: "slide3",
      title: "Stay Connected",
      text: "Join community chats and never feel alone in a crisis.",
      image: require("../../images/community1.png"),
    },
  ];

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      swiperRef.current.scrollBy(1);
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryLight, COLORS.primaryDark]}
      style={{ flex: 1 }}
    >
      <Swiper
        loop={false}
        showsPagination={false}
        ref={swiperRef}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={styles.slide}>
            <Image
              source={slide.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </Swiper>

      {/* Bottom row: dots + button */}
      <View style={styles.bottomRow}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 17,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.primaryDark,
    fontWeight: "bold",
    fontSize: 16,
  },
});
