import { useState, useEffect, useQuery } from 'react';
import { View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Welcome2} from '../components';
import { set } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-web';
import { isLoaded } from 'expo-font';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import styles from './index.style'
import { FlatList } from 'react-native-gesture-handler';

// npm start = åben på PC
// expo-cli start --tunnel = start på iPhone

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")
    const now = new Date();
    const dateResult = now.toLocaleDateString(undefined, { // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })

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
        // month <= 9
        // ? 
        fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${('0' + monthString).slice(-2)}-${('0' + dateString).slice(-2)}_DK1.json`)
        // : fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${date}_DK1.json`)
        //     month <= 9 && date <= 9 ? fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/0${month}-0${date}_DK1.json`)
        // :   month >= 10 && date >= 10 ? fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${date}_DK1.json`)
        // :   month <= 9 && date >= 10  ? fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/0${month}-${date}_DK1.json`)
        // : fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-0${date}_DK1.json`)
        // fetch(`https://www.elprisenligenu.dk/api/v1/prices/2023/08-30_DK1.json`)
        .then(res => res.json())
        .then(
            (result) => {
                setisLoading1(false);
                setResponse(result);
                // console.log(dateResult.year)
                // console.log(dateResult.month)
                // console.log(('0' + dateString).slice(-2))
    
                // response = result;

            },
            (error) => {
                setisLoading1(false);
                setError(error);
            }
        )
    },[]);

    // if (response) { 
    // for (var i = 0; i < N-1; i++)
    // {
    //     var mean = (response[i]?.DKK_per_kWh + response[i+1]?.DKK_per_kWh + response[i+2]?.DKK_per_kWh)/3.0;
    //     moveMean.push([i,mean]);
    // }  } else
    //     moveMean = [];

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



    const getContent = ({ item }) => {
        if(isloading1) {
            return <ActivityIndicator size="large"/>
        }

        if(error) {
            return <Text>An error has ocurred</Text>
        }

        console.log(response);
        // console.log(response.records[0]);
        return ( 
        // <Text>Pris: {response.records[6].SpotPriceDKK/1000}, {item}</Text>
        <Text>Pris</Text>
              
        )
    };



    return (
  

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            // headerLeft: () => (
            //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            // ),
            header: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle: ""
        }}

        />
    
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                flex: 0.01,
                padding: SIZES.xSmall

            }}>
            
    
            <View>
        <View>
      <View>
        {/* <Text style={styles.userName}>Hej Mr. Schmeckels :D</Text> */}
        <Text style={styles.welcomeMessage}>Her kan du se om du kan spare penge på din elregning</Text>
        </View>
      </View>

{/* {indexMinimum > hour ?
<View>
    <Text style={styles.jobName}>Hvis du sætter et delay til {indexMinimum-hour} timer, sparer du {(moveMean[hour]-minimum).toFixed(2)} kr.
    </Text>
    {savingDisplayed = true}
</View>
:
savingDisplayed = false
}

{indexMinimumNow > hour && savingDisplayed === false ? 
<View>
<Text style={styles.jobName}>Hvis du sætter et delay til {indexMinimumNow-hour} timer, sparer du {(moveMean[hour]-minimumNow).toFixed(2)} kr.
    </Text>
    {savingDisplayed = true}
</View>
    : savingDisplayed = false

}

{indexMinimumNow <= hour && savingDisplayed === false ? 
    <Text style={styles.jobName}>{"\n"}Det er billigst at sætte maskinen i gang nu</Text>
: null
} */}

{console.log(savingDisplayed)}



    <Popularjobs />

    <Welcome 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if(searchTerm) {
                            router.push(`/search/${searchTerm}`)
                        }
                    }}
                />


{minute <= 9    ? <Text>Klokken er: {hour}:0{minute}</Text>
        : <Text>Klokken er: {hour}:{minute}</Text>
}

{<Text>El-prisen lige nu: {response ? (response[parseInt(hour)]?.DKK_per_kWh*1)?.toFixed(2) : null}kr pr. kWh</Text>
}

  { response ? 

  <View>

  <FlatList
          data={[0]}
          renderItem={({ item }) => (
            
  <BarChart
    const data={{
    //   labels: ["00-01", "01-02","02-03", "03-04","04-05", "05-06","06-07", "07-08","08-09", "10-11","11-12", "12-13","13-14", "14-15","15-16", "16-17","17-18", "18-19","19-20", "20-21","21-22", "22-23","23-24"],
      labels: ["00", "01","02", "03","04", "05","06", "07","08", "10","11", "12","13", "14","15", "16","17", "18","19", "20","21", "22","23"],
      datasets: [
        {
            data: [
            response[0]?.DKK_per_kWh,
            response[1]?.DKK_per_kWh,
            response[2]?.DKK_per_kWh,
            response[3]?.DKK_per_kWh,
            response[4]?.DKK_per_kWh,
            response[5]?.DKK_per_kWh,
            response[6]?.DKK_per_kWh,
            response[7]?.DKK_per_kWh,
            response[8]?.DKK_per_kWh,
            response[9]?.DKK_per_kWh,
            response[10]?.DKK_per_kWh,
            response[11]?.DKK_per_kWh,
            response[12]?.DKK_per_kWh,
            response[13]?.DKK_per_kWh,
            response[14]?.DKK_per_kWh,
            response[15]?.DKK_per_kWh,
            response[16]?.DKK_per_kWh,
            response[17]?.DKK_per_kWh,
            response[18]?.DKK_per_kWh,
            response[19]?.DKK_per_kWh,
            response[20]?.DKK_per_kWh,
            response[21]?.DKK_per_kWh,
            response[22]?.DKK_per_kWh,
            response[23]?.DKK_per_kWh,
          ]
        }
      ]
    }}

    width={Dimensions.get("window").width*1.5} // from react-native
    height={400}
    // yAxisLabel=""
    yAxisSuffix="kr"
    yAxisInterval={1} // optional, defaults to 1
    fromZero="true"
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      barPercentage: Dimensions.get("window").width/1250,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#ffa726"
      }
    }}
    // bezier
    style={{
      marginVertical: 8,

      borderRadius: 16
    }}

  />

  )}
          keyExtractor={item => item?.job_id} //job_id er en af vores keys som vi bruger når vi får data fra vores API
          contentContainerStyle={{ columnGap: SIZES.small / 4 }}
          horizontal
        />
  </View>

  : null
  }

 



</View>
 
{/* <Text style={styles.jobName}>
{"\n"}
Det billigste tidspunkt at sætte maskinen i gang er kl. {indexMinimum}. Dette koster {minimum.toFixed(2)} kr. plus afgifter
{"\n"}
Det dyreste tidspunkt at sætte maskinen i gang er kl. {indexMaximum}. Dette koster {maximum.toFixed(2)} kr. plus afgifter
{"\n"}

</Text> */}




                {/* <Nearbyjobs /> */}
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Home;