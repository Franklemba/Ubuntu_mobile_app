import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";


const Recommendations = () => {
     // Dummy data for personalized Recommendations
  const recommendedProviders = [
    {
      id: "1",
      image:
        "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Type 2 Diabetes",
      specialty: "Latest Research and Treatment Options",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Managing Asthma",
      specialty: "Effective Strategies for Better Control",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Flu Season Alert",
      specialty: "Vaccination Clinics Open Across the Country",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Expert Q&A",
      specialty: "Managing Chronic Pain with Dr. Smith",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Telemedicine",
      specialty: " Revolutionizing Patient Care in Rural Areas",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1600",
      Title: "Ebola Outbreak",
      specialty: "Latest Updates and Response Efforts",
    },
  ];

    // Function to render an individual recommendation card
    const renderRecommendationCard = ({ item }) => (
        <View style={styles.recommendationCard}>
          <Image source={{ uri: item.image }} style={styles.recommendationImage} />
          <Text style={styles.recommendationTitle}>{item.Title}</Text>
          <Text style={styles.Recommendationspecialty}>{item.specialty}</Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      );

  return (
      <View style={styles.RecommendationsContainer}>
            <Text style={styles.RecommendationsTitle}>
              News Feed
            </Text>
            {/* Personalized Recommendations Section */}
            <View style={styles.RecommendationsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommendedProviders.map((item) =>
                  renderRecommendationCard({ item })
                )}
              </ScrollView>
            </View>
          </View>
  )
}

export default Recommendations

const styles = StyleSheet.create({
    RecommendationsContainer: {
        marginTop: 20,
      },
      RecommendationsTitle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      recommendationCard: {
        width: 200,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
      },
      recommendationImage: {
        width: "100%",
        height: 120,
        borderRadius: 10,
      },
      recommendationTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
      },
      Recommendationspecialty: {
        fontSize: 14,
        color: "#666",
      },
      learnMoreButton: {
        backgroundColor: "#00b894",
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        alignItems: "center",
      },
      learnMoreButtonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
      },
})