import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';
import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";
import { FlatList } from "react-native-gesture-handler";



const PopularJobCardBlue = ({ item, selectedJob, handleCardPress }) => {
  const now = new Date();
  const hour = now.getHours();
  const hourString = hour.toString();
  const minute = now.getMinutes();
  const date = now.getDate();
  const dateString = date.toString();
  const month = now.getMonth() + 1;
  const monthString = month.toString();
  const year = now.getFullYear();
  
  var N = 23;
  var moveMean = [];
  var moveMeanNow = [];
  
  
  let [isloading1, setisLoading1] = useState(true);
  let [error, setError] = useState();
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
          (error) => {
              setisLoading1(false);
              setError(error);
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
     const maximumNow = Math.max(...moveMeanNow)

     var savingDisplayed = false;



  return (

    <View>


    


    <TouchableOpacity // Denne knap er selve boksen hvor der er en mindre boks indeni
      style={styles.containerBlue(selectedJob, item)}
    //   onPress={() => handleCardPress(item)}
    >
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
            {indexMinimum > hour ?
            <View>
                <Text style={styles.publisher}>
                    {(moveMean[hour]-minimum).toFixed(2)}kr.
                </Text>
                    {savingDisplayed = true}
            </View>
                    : savingDisplayed = false
            }

            {indexMinimumNow > hour && savingDisplayed === false ? 
            <View>
                <Text style={styles.publisher}>
                    {(moveMean[hour]-minimumNow).toFixed(2)} kr.
                </Text>
                    {savingDisplayed = true}
            </View>
                    : savingDisplayed = false
            }

            {indexMinimumNow <= hour && savingDisplayed === false ? 
            <View>
                <Text style={styles.publisher}>
                    0.00kr.
                </Text>
            </View>
                    : null
            }
        </TouchableOpacity>
        
  
    </TouchableOpacity>

    {indexMinimum > hour ?
    <View>
        <Text style={styles.publisher}>
            pr kWh hvis du sætter et delay til:
        </Text>
        <Text style={styles.antalTimer}>
        {indexMinimum-hour} timer
    </Text>
            {savingDisplayed = true}
        </View>
            : savingDisplayed = false
    }


    {indexMinimumNow > hour && savingDisplayed === false ? 
    <View>
        <Text style={styles.publisher}>
            pr. kWh hvis du sætter et delay til:
    </Text>
    <Text style={styles.antalTimer}>
        {indexMinimumNow-hour} timer
    </Text>
            {savingDisplayed = true}
    </View>
            : savingDisplayed = false
    }

    {indexMinimumNow <= hour && savingDisplayed === false ? 
    <View>
        <Text style={styles.publisher}>
            pr. kWh ved at sætte en timer. Det er{"\n"}billigst at sætte maskinen i gang nu.
        </Text>
    </View>
        : null
    }
    </View>
      

  );
};

export default PopularJobCardBlue;