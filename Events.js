import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";

export default function Events() {
  const events = useQuery(api.events.myEvents);
  const [selectedCards, setSelectedCards] = useState([]);
  const [newEvent, setNewEvent] = useState({ Name: "", Location: "", Time: "" });

  const handleCardPress = (eventId) => {
    if (selectedCards.includes(eventId)) {
      setSelectedCards(selectedCards.filter((id) => id !== eventId));
    } else {
      setSelectedCards([...selectedCards, eventId]);
    }
  };

  const isCardSelected = (eventId) => {
    return selectedCards.includes(eventId);
  };

  const handleCreateEvent = () => {
    // Submit the new event to Convex database
    api.events.createEvent({
      Name: newEvent.Name,
      Location: newEvent.Location,
      Time: newEvent.Time,
    });

    // Clear the input fields
    setNewEvent({ Name: "", Location: "", Time: "" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.createEventCard}>
        <Text style={styles.cardTitle}>Create Event</Text>
        <TextInput
          placeholder="Event Name"
          style={styles.input}
          value={newEvent.Name}
          onChangeText={(text) => setNewEvent({ ...newEvent, Name: text })}
        />
        <TextInput
          placeholder="Location"
          style={styles.input}
          value={newEvent.Location}
          onChangeText={(text) => setNewEvent({ ...newEvent, Location: text })}
        />
        <TextInput
          placeholder="Time"
          style={styles.input}
          value={newEvent.Time}
          onChangeText={(text) => setNewEvent({ ...newEvent, Time: text })}
        />
        <Button title="Create" onPress={handleCreateEvent} />
      </View>
      {events?.map((item) => (
        <TouchableOpacity
          key={item.EventId}
          style={[
            styles.card,
            isCardSelected(item.EventId) && styles.selectedCard,
          ]}
          onPress={() => handleCardPress(item.EventId)}
        >
          <Text style={styles.cardTitle}>{item.Name}</Text>
          <Text style={styles.cardInfo}>{item.Location}</Text>
          <Text style={styles.cardInfo}>{item.Time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  createEventCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedCard: {
    borderColor: "blue",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardInfo: {
    fontSize: 14,
    color: "gray",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 5,
  },
});
