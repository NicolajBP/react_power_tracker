import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({name, activeTab, onHandleSearchType}) => (
  <TouchableOpacity
    style={styles.btn(name,activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name,activeTab)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2}} // der er altid dobbelt {{}} når det er et object
                                                  // Objects bruger notationen ":" i stedet for "="
      />
    </View>
  )
}

export default Tabs