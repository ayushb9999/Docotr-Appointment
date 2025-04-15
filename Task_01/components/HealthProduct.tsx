import colors from "@/constants/Color";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

export default function HealthProduct() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const handleNavigation = () => {
    router.push("./medicine/");
  };

  return (
    <View>
      <View style={[styles.container, { padding: isTablet ? 24 : 2 }]}>
        <View
          style={[
            styles.container__card,
            { width: isTablet ? 300 : 220, padding: isTablet ? 20 : 14 },
          ]}
        >
          <View style={[styles.discount__card, { flexDirection: "row" }]}>
            <Text
              style={[
                styles.discount__title,
                {
                  fontSize: isTablet ? 18 : 16,
                  paddingVertical: isTablet ? 6 : 4,
                },
              ]}
            >
              UPTO
            </Text>
            <Text
              style={[
                styles.discount__percent,
                {
                  fontSize: isTablet ? 52 : 46,
                  marginLeft: isTablet ? -22 : -18,
                },
              ]}
            >
              80%
            </Text>
            <Text
              style={[styles.discount__offer, { fontSize: isTablet ? 20 : 17 }]}
            >
              OFFER
            </Text>
          </View>
          <Text
            style={[
              styles.container__subtitle,
              { fontSize: isTablet ? 20 : 18 },
            ]}
          >
            On Health Products!
          </Text>
          <TouchableOpacity
            style={[
              styles.container__button,
              {
                width: isTablet ? 180 : 120,
                paddingVertical: isTablet ? 14 : 12,
                marginTop: isTablet ? 16 : 14,
                borderRadius: isTablet ? 10 : 8,
              },
            ]}
            onPress={handleNavigation}
          >
            <Text style={[styles.btn__txt, { fontSize: isTablet ? 18 : 14 }]}>
              SHOP NOW
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: "https://m.media-amazon.com/images/G/01/wg/lp/storefront/new-logo-update/hand_with_bottle_mobile.png",
          }}
          style={{
            width: isTablet ? 260 : 130,
            height: isTablet ? 250 : 172,
            position: "absolute",
            bottom: 0,
            right: isTablet ? 0 : 0,
            borderBottomRightRadius: 20,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: colors.lightPrimary,
    borderRadius: 20,
    flexDirection: "row",
    elevation: 4,
  },
  container__card: {},
  discount__card: {
    flexDirection: "row",
  },
  discount__title: {
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.black,
    borderRadius: 4,
    transform: [{ rotate: "-90deg" }],
  },
  discount__percent: {
    fontWeight: "bold",
    color: colors.primary,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
  discount__offer: {
    fontWeight: "500",
    color: colors.black,
  },
  container__subtitle: {
    fontWeight: "700",
    color: colors.black,
  },
  container__button: {
    backgroundColor: colors.primary,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  btn__txt: {
    color: colors.white,
    alignSelf: "center",
    fontWeight: "500",
  },
});
