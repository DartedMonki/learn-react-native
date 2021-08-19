import React, {useEffect, useState} from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'

import {fetchInitialDeals} from '../utils/ajax'

const App = () => {
  const [dealDatas, setDealDatas] = useState([])
  const [searchValue, setSearchValue] = useState([])

  const handleSearchValue = (text) => {
    console.log(text)
    setSearchValue(text)
  }

  const handleSearchButton = async () => {
    console.log('pressed')
    if (searchValue) {
      setDealDatas(
        dealDatas.filter((data) =>
          data?.title?.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      )
    } else {
      const deals = await fetchInitialDeals()
      setDealDatas(deals)
    }
  }

  useEffect(async () => {
    const deals = await fetchInitialDeals()
    setDealDatas(deals)
    console.log(deals)
  }, [])

  return (
    <View style={styles.body}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search ..."
          onChangeText={handleSearchValue}
          value={searchValue}></TextInput>
        <TouchableOpacity onPress={handleSearchButton}>
          <Image
            source={{
              uri: 'https://screenshots.imgix.net/mui-org/material-ui-icons/search-rounded/~v=3.9.2/dde2b5cd-4080-4c01-8206-e71c21af6051.png?ixlib=js-1.2.0&s=0deb0a3fdddf3844e70fb026b7a52f8a&w=300&h=200&fit=fillmax&fm=png',
            }}
            style={styles.imageIcon}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={dealDatas}
          renderItem={({item: data}) => (
            <View style={styles.card} key={data.key}>
              <View style={styles.cardContent}>
                <Image
                  source={{uri: data.media[0]}}
                  style={styles.imageTitle}></Image>
                <Text style={styles.cardTitle}>{data.title}</Text>
                <View style={styles.cardSubtitle}>
                  <Text style={styles.cardType}>{data.cause.name}</Text>
                  <Text style={styles.cardPrice}>{`$${data.price / 100}`}</Text>
                </View>
              </View>
            </View>
          )}></FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  body: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  cardSubtitle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  cardType: {
    fontSize: 16,
    color: '#555555',
    fontFamily: 'Poppins-Bold',
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    backgroundColor: 'white',
    fontSize: 24,
    marginVertical: 24,
    marginHorizontal: 12,
    fontFamily: 'Poppins-Bold',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  imageTitle: {
    width: '100%',
    height: 150,
  },
  imageIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
})

export default App
