// import { useState, useEffect } from "react";
// import axios from "axios";
// // import { RAPID_API_KEY } from '@env';

// // const rapidApiKey = RAPID_API_KEY;

// const useFetch = (endpoint, query) => { // det der står i parantesen (endpoint) er en prop til vores useFetch hook
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // const options = {
//     //     method: 'GET',
//     //     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     //     headers: {
//     //         'X-RapidAPI-Key': '01d4f074f3mshee99cbf5a0f7eb8p15cae2jsnc07cda9649e5',
//     //         'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
//     //       },
//     //     params: { ...query }, // Det her gør vores parametre dynamiske
//     //   };

//       const options = {
//         method: 'GET',
//         url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//         headers: {
//             'X-RapidAPI-Key': '01d4f074f3mshee99cbf5a0f7eb8p15cae2jsnc07cda9649e5',
//             'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
//           },
//           params: { ...query }, // Det her gør vores parametre dynamiske
//       };
      
  
//     const fetchData = async () => {
//         setIsLoading(true);

//         try {
//             const response = await axios.request
//             (options);

//             setData(response.data.data);
//             setIsLoading(false);

//         } catch (error) {
//             setError(error);
//             alert("There is an error")

//         } finally {
//             setIsLoading(false);
//         }
//      }

//      useEffect(() => {
//         fetchData();
//      }, []);

//      const refetch = () => {
//         setIsLoading(true);
//         fetchData();
//      }

//      return { data, isLoading, error, refetch };
// };

// export default useFetch;

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '258f5a8e77msh864a0ced3e2c53ep1658bejsn5932fe1d5529',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;