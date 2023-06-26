/*global chrome*/
import { useState, useEffect } from 'react';
import { Flex, Text, Alert, AlertIcon, AlertDescription, Spinner, Button } from '@chakra-ui/react';
import supabaseClient from '../utils/supabaseClient';
import { auth } from '../utils/firebase-init';
import { goTo } from 'react-chrome-extension-router';
import { EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from '../context/GlobalContext';

const configState = {
  name: '',
  apiKey: '',
  prompt: 'write a reply message: ',
  model: "text-davinci-003",
  temperature: 0.7,
  maxTokens: 1024,
};

function CustomApi() {

  const { user, userDet, setUserDet, apikeyT, setapiKeyT, modelT, setModelT } = useGlobalContext();

  const [apiKey, setApiKey] = useState(apikeyT);
  const [model, setModel] = useState(modelT);
  const [models, setModels] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(modelT)

  const handleCancel = () => {
    setUserDet({ ...userDet, api_key: apikeyT, model: modelT });
    setapiKeyT(null);
    setModelT('gpt-3.5-turbo-0301');
  }
  
  const handleApiChange = (e) => { 
    if(e.target.value.length === 51) {
        setApiKey(e.target.value);
        setError('');
    }else {
        setError('Incorrect API key provided. You can find your API key at https://platform.openai.com/account/api-keys.');
    }
  }

  const handleSubmit = async () => {
    console.log(model)
    setBtnLoading(true);

    const { data, error } = await supabaseClient
    .from('users')
    .update({ api_key: apiKey, model })
    .eq('id', user.uid)
    .select()

    if(error) { 
        setError("There was an error saving your api keys & model. Please try again after sometime");
        console.log(error);
        setBtnLoading(false);
    }
    if(data) {
        console.log(data)
        setUserDet({ ...userDet, api_key: apiKey, model });
        setBtnLoading(false);
    }
  }
  
  useEffect(() => {
    if (apiKey) {
        fetch("https://api.openai.com/v1/models", {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.error.code === "invalid_api_key" ? "Incorrect API key provided. You can find your API key at https://platform.openai.com/account/api-keys." : res.error.message);
                    console.log(res.error);
                }
                const model_ids = res.data.map((a) => a.id);
                const sorted = model_ids.sort();
                setModels(sorted);
            });
    }
  }, [apiKey]);

  return (
    <Flex direction="column" flex={1} justifyContent={"space-between"} gap="2">
        <Flex direction={'column'} gap={2} mt={3}>
             {error && ( 
                <Alert status="error" className='mx-1' px={3} borderRadius={10}>
                    <AlertIcon  />
                    <AlertDescription className='text-sm'>{error}</AlertDescription>
                </Alert>
             )}
            <Flex direction={'column'} justifyContent={'center'}>
                <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Api Key</label>
                <input type="text" name="apikey" defaultValue={apikeyT} id="apikey" className="bg-gray-50 border border-gray-300 text-gray-900 w-full sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-sm dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your API Key'
                onChange={(e) => handleApiChange(e)}/>
            </Flex>
            {
            models && <><Flex direction={'column'}>
                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                    <select id="model" onChange={(e) => setModel(e.target.value)} defaultValue={modelT} className="bg-gray-50 w-full border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 h-10 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {models.map((model, index) => <option key={index} value={model}>{model}</option>)}
                    </select>
                </Flex>
                <Flex mt={5} direction={'row'} gap={3}>
                    <Button
                        colorScheme='indigo.100'
                        color={'indigo.600'}
                        isLoading={btnLoading}
                        variant={'outline'}
                        disabled={btnLoading}
                        onClick={(e) => handleSubmit(e)}
                        className="group w-full flex justify-center rounded-md text-sm font-semibold"
                    >
                        <Text fontSize={'sm'}>Save</Text>
                    </Button>
                    {
                        apikeyT && <Button
                            colorScheme='red.100'
                            color={'red.600'}
                            variant={'outline'}
                            disabled={btnLoading}
                            onClick={(e) => handleCancel(e)}
                            className="group w-full flex justify-center rounded-md text-sm font-semibold"
                        >
                            <Text fontSize={'sm'}>Cancel</Text>
                        </Button>
                    }
                </Flex>
            </>
            }

        </Flex>
    </Flex>
  );
}

export default CustomApi;
