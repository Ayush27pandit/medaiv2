// import React from 'react';
// import { Card, Title, Paragraph } from 'react-native-paper';

// interface ResultCardProps {
//   title: string;
//   content: string;
// }

// const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => (
//   <Card style={{ marginVertical: 8 }}>
//     <Card.Content>
//       <Title>{title}</Title>
//       <Paragraph>{content}</Paragraph>
//     </Card.Content>
//   </Card>
// );

// export default ResultCard; 

// components/ResultCard.tsx

import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

interface ResultCardProps {
  title: string;
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => (
  <Card style={{ marginVertical: 8 }}>
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
    </Card.Content>
  </Card>
);

export default ResultCard;
