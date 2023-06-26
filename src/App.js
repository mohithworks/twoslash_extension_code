/*global chrome*/
import React, { useEffect, useState } from 'react'
import { Flex, Text, Alert, AlertIcon, AlertDescription, Spinner, Button } from '@chakra-ui/react';
import { Link, Router } from 'react-chrome-extension-router';
import InitialPage from './pages/InitialPage';
import MainPage from './pages/MainPage';
import { auth } from './utils/firebase-init';
import AuthPage from './pages/AuthPage';
import { MyGlobalContext } from './context/GlobalContext';
import { signInAnonymously } from "firebase/auth";
import supabaseClient from './utils/supabaseClient';
import Header from './components/Header';
import Error from './components/Error';
import { onAuthStateChanged } from "firebase/auth";
import PricingPage from './pages/PricingPage';
import Subscribe from './components/Subscribe';
import Share from './components/Share';
import LtMainPage from './pages/LtMainPage';

var userid;
function App() {
  const [user, setUser] = useState(null);
  const [userDet, setUserDet] = useState(null);
  const [error, setError] = useState(false);
  const [back, setBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [apikeyT, setapiKeyT] = useState(null);
  const [modelT, setModelT] = useState('gpt-3.5-turbo-0301');

  const getCurrentUserDetails = async (user) => { 
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', user)

    return { data, error };
  }
  
  const createSupabaseUser = async (user) => { 
    const { data, error } = await supabaseClient
    .from('users')
    .insert([
        { id: user },
    ]).select()

    return { data, error };
  }

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if(user) {
        setUser(user)
        userid = user.uid;
        
        await getCurrentUserDetails(userid).then(({ data, error }) => { 
          if(error) { 
              setError(true);
              return;
          }
          if(data) {
            console.log(data)
            setUserDet(data[0]);
            chrome.storage.sync.set({ userid: userid });
            setLoading(false);
          }
        })

      }else {
        await signInAnonymously(auth)
        .then(async ({user}) => {
           await createSupabaseUser(user.uid).then(({ error }) => {
                if (error && error.code !== '23505') {
                    setError(true);
                    return;
                }
                setUser(user)
                userid = user.uid;
                console.log(userid)
            })
        })
        .catch((error) => {
          console.log(error)
          setError(true);
        });

      }
    });
  }, [])

  return (
    <MyGlobalContext.Provider value={{ user, setUser, userDet, setUserDet, back, setBack, status, setStatus, apikeyT, setapiKeyT, modelT, setModelT }}>
      <Flex direction="column" className={'m-0 p-0 rounded-xl font-body'} width={430} ro flex={1} justifyContent={"space-between"} height={520}>
        <Header />
        {
          loading ? 
          <Flex justifyContent={'center'} flex={1} alignItems={'center'}>
            <Spinner />
          </Flex> :
          error ? <Error /> :
          <Router>
            {user ? user.email ? userDet.account_type === 'Lifetime' ? <LtMainPage /> :<MainPage /> : <InitialPage /> : <AuthPage />}
          </Router>
        }
        {
          !loading && status === '' ? 
          <>
            {
              (userDet && !userDet.status) ? 
              <Subscribe />
              :
              <Share />
            }
          </>
          :
          <div></div>
        }
      </Flex>
    </MyGlobalContext.Provider>
  )
}

export default App