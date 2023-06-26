import { useState, useEffect } from 'react';
import { Flex, Text, Alert, AlertIcon, AlertDescription, Spinner } from '@chakra-ui/react';
import { signInAnonymously } from "firebase/auth";
import supabaseClient from '../utils/supabaseClient';
import { auth } from '../utils/firebase-init';
import { Link } from 'react-chrome-extension-router';
import AuthPage from './AuthPage';
import Error from '../components/Error';
import Card from '../components/Card';
import Commands from '../components/Commands';
import { useGlobalContext } from '../context/GlobalContext';

const configState = {
  name: '',
  apiKey: '',
  prompt: 'write a reply message: ',
  model: "text-davinci-003",
  temperature: 0.7,
  maxTokens: 1024,
};

var userid;

function InitialPage() {
  const [models, setModels] = useState(["text-davinci-003"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [config, setConfig] = useState(configState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, userDet } = useGlobalContext();

  const { prompts } = userDet;

  return (
    <div>
        <div>
          <Flex direction="column" gap="2" mt={2} px={5}>
              <Text mt={2} fontSize={'md'}>Hello, Anonymous 😊</Text>
              <Card>
                <Flex className='bg-orange-100 text-orange-600 justify-center items-center px-3 py-1 rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                </Flex>
                <Flex direction={'column'}>
                  <Text fontSize="md" className='font-extrabold text-orange-600'>{prompts}</Text>
                  <Text fontSize='xs'>Free Commands Left</Text>
                </Flex>
              </Card>
              <Commands />
              {/* <Text fontSize="md" fontWeight="normal">No of Prompts left - </Text>
              <Text fontSize="md" fontWeight="medium">{prompts}</Text> */}
          </Flex>
        </div>
    </div>
  );
}

export default InitialPage;
