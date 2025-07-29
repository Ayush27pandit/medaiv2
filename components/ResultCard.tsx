import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Linking, StyleSheet, View } from 'react-native';

interface ResultCardProps {
  title: string;
  content: string | string[];
}

const isUrl = (str: string) => /^https?:\/\//i.test(str);

const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => (
  <Card style={[{ marginVertical: 8 }, styles.cardBox]}>
    <Card.Content>
      <Title>{title}</Title>
      {Array.isArray(content) ? (
        <View style={styles.listContainer}>
          {content.map((item, idx) => (
            <Paragraph key={idx} style={styles.listItem}>
              {'\u2022 '} {isUrl(item) ? (
                <Paragraph style={styles.link} onPress={() => Linking.openURL(item)}>{item}</Paragraph>
              ) : (
                item
              )}
            </Paragraph>
          ))}
        </View>
      ) : (
        // If content is a string, check if it's a URL
        isUrl(content) ? (
          <Paragraph style={styles.link} onPress={() => Linking.openURL(content)}>{content}</Paragraph>
        ) : (
          <Paragraph>{content}</Paragraph>
        )
      )}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardBox: {
    minHeight: 90, // Adjust as needed for your design
    justifyContent: 'center',
  },
  listContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  listItem: {
    marginLeft: 8,
    marginBottom: 2,
  },
  link: {
    color: '#1976D2',
    textDecorationLine: 'underline',
  },
});

export default ResultCard;
