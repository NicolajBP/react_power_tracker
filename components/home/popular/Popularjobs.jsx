import { useState, useEffect } from 'react' // Det der står inde i tuborg-klammerne hedder en hook (vi importerer en hook)
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'



import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCardGreen from '../../common/cards/popular/PopularJobCardGreen';
import PopularJobCardRed from '../../common/cards/popular/PopularJobCardRed';
import PopularJobCardBlue from '../../common/cards/popular/PopularJobCardBlue';
import useFetch from "../../../hook/useFetch";


const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch
    ('search', {
    query: 'Studentermedhjælper',
    num_pages: 1
  });

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const now = new Date();
  const hour = now.getHours();
  const hourString = hour.toString();
  const minute = now.getMinutes();
  const date = now.getDate();
  const dateString = date.toString();
  const month = now.getMonth() + 1;
  const monthString = month.toString();
  const year = now.getFullYear();
  
  var savingDisplayed = false;
  
  var N = 23;
  var moveMean = [];
  var moveMeanNow = [];
  
  
  let [isloading1, setisLoading1] = useState(true);
  let [error1, setError] = useState();
  let [response, setResponse] = useState();

  let callCounter = 0;

  

  useEffect(() => {
      fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${('0' + monthString).slice(-2)}-${('0' + dateString).slice(-2)}_DK1.json`)
      .then(res => res.json())
      .then(
          (result) => {
              setisLoading1(false);
              setResponse(result);

          },
          (error1) => {
              setisLoading1(false);
              setError(error1);
          }
      )
  },[]);


  // MOVING AVERAGE
  if (response) { 
  for (var i = 0; i < N-1; i++)
  {
      var mean = (response[i]?.DKK_per_kWh + response[i+1]?.DKK_per_kWh + response[i+2]?.DKK_per_kWh)/3.0;
      moveMean.push([mean]);
  }  } else
      moveMean = [];

  // MOVING AVERAGE DER STARTER VED INDEVÆRENDE TIME
  if (response) { 
      for (var i = hour; i < N-1; i++)
      {
          var mean = (response[i]?.DKK_per_kWh + response[i+1]?.DKK_per_kWh + response[i+2]?.DKK_per_kWh)/3.0;
          moveMeanNow.push([mean]);
      }  } else
          moveMeanNow = [];


  function indexOfSmallest(a) {
      var lowest = 0;
      for (var i = 1; i < a.length; i++) {
       if (a[i] < a[lowest]) lowest = i;
      }
      return lowest;
     }

     function indexOfLargest(a) {
      var lowest = 0;
      for (var i = 1; i < a.length; i++) {
       if (a[i] > a[lowest]) lowest = i;
      }
      return lowest;
     }

     const indexMinimum = indexOfSmallest(moveMean)
     const indexMaximum = indexOfLargest(moveMean)
     const minimum = Math.min(...moveMean)
     const maximum = Math.max(...moveMean)

     
     const indexMinimumNow = indexOfSmallest(moveMeanNow) + hour
     const indexMaximumNow = indexOfLargest(moveMeanNow) + hour
     const minimumNow = Math.min(...moveMeanNow)


  
  // console.log(data);

  return (
    <View>


    
    <View style={styles.container}>
      {/* <View style = {styles.header}>
        <Text style={styles.headerTitle}>Hvor meget kan du spare?</Text>
      </View> */}
      <Text style={styles.publisher}>
            Du kan spare:
        </Text>
      <View style={styles.cardsContainer}>
        {
         (
          <FlatList
          data={[0]}
          renderItem={({ item }) => (
            <PopularJobCardBlue // Her fortæller vi hvilket data vi gerne vil have fra hver item
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={item => item?.job_id} //job_id er en af vores keys som vi bruger når vi får data fra vores API
          contentContainerStyle={{ columnGap: SIZES.small / 4 }}
          horizontal
        />
        
      )}
      </View>
    </View>
    
    
    <View style={styles.container}>
      <View style = {styles.header}>
        <Text style={styles.headerTitle}>Billigste tidspunkt: kl. {indexMinimum}</Text>
      </View>
      <View style={styles.cardsContainer}>
        {
         (
          <FlatList
          data={[0]}
          renderItem={({ item }) => (
            <PopularJobCardGreen // Her fortæller vi hvilket data vi gerne vil have fra hver item
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={item => item?.job_id} //job_id er en af vores keys som vi bruger når vi får data fra vores API
          contentContainerStyle={{ columnGap: SIZES.small / 4 }}
          horizontal
        />
        
      )}
      </View>
    </View>

    <View style={styles.container}>
      <View style = {styles.header}>
        <Text style={styles.headerTitle}>Dyreste tidspunkt: Kl. {indexMaximum}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {
         (
          <FlatList
          data={[0]}
          renderItem={({ item }) => (
            <PopularJobCardRed // Her fortæller vi hvilket data vi gerne vil have fra hver item
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={item => item?.job_id} //job_id er en af vores keys som vi bruger når vi får data fra vores API
          contentContainerStyle={{ columnGap: SIZES.small / 4 }}
          horizontal
        />
        
      )}
      </View>
    </View>

    </View>
    
  )
}

export default Popularjobs