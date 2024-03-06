
import { Document, Page, View, Text, Image} from '@react-pdf/renderer';

const PrintDownloadData = ({ filteredGroupCards}) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <View style={{ flexDirection: 'column', marginBottom: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
              FLASH CARD
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'left' }}>
            {filteredGroupCards.map((card, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>
                  {card.cardName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    src={card?.cardImage?.cardImageURL}
                    style={{ width: '180px', height: 'auto', marginRight: 10 }}
                  />
                  <Text style={{ flex: 1, fontSize: 10 }}>{card.cardDescription}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrintDownloadData;
