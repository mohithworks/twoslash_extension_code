/*global chrome*/
import { useState, useEffect } from 'react';
import { Flex, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import supabaseClient from '../utils/supabaseClient';
import { auth } from '../utils/firebase-init';
import { goTo } from 'react-chrome-extension-router';
import { EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { CheckCircleIcon } from '@heroicons/react/24/solid';
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

export const getPaymentURL = async (userid, email, phone, type) => { 
  const url = `https://twoslash-backend.onrender.com/createStripePayment?userid=${userid}&email=${email}&phone=${phone}&type=${type}`;

  const headers = {
      "Content-Type": "application/json",
  };

  const res = await fetch(url, {
      method: "POST",
      headers: headers,
  });

  if(res) {
      const json = await res.json();
      console.log(json);
      return json;
  }
}

function PricingPage() {
  const [btnTxt, setBtnTxt] = useState("Sign up");
  const [headerTxt, setheaderTxt] = useState("Create your account");
  const [footerTxt, setfooterTxt] = useState("Already have an account?");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMargin, seterrorMargin] = useState("mt-2");
  const [btnLoading, setBtnLoading] = useState(false);

  const { user, userDet, setStatus, setBack } = useGlobalContext();

  useEffect(()  => {
    setStatus('subscribe');
  }, [])

  const pricingFeatures = [
    '1000 monthly commands',
    'Priority Support',
    'Add your own commands (Soon)',
    'Train on your own data (Soon)',
  ]

  const getLink = (type) => {
    setBtnLoading(true);
    getPaymentURL(user.uid, user.email, userDet.phone, type).then((res) => {
      console.log(res);
      if(res.body.status === '400') {
        alert('There was an error with the extension. Please try again later with stable internet connection.');
        return;
      }
      setBtnLoading(false);
      window.open(res.body.data, '_blank');
    })
  }

  return (
    <Flex direction="column" flex={1} justifyContent={"space-between"} gap="2">
      <Flex direction="column" px={5} mt={5}>
        <Flex direction={'row'} gap={2}>
            <Text fontSize="3xl" fontWeight="semibold">$ 9</Text>
            <Text fontSize="sm" mt={4}>/month</Text>
        </Flex>
        <Text fontSize="xs" fontWeight="semibold" mt={3.5}>What's included</Text>
        <Grid gap={3} templateColumns='repeat(2, 1fr)' mt={3}>
            {
                pricingFeatures.map((feature, index) => (
                        <GridItem key={index}>
                            <Flex direction={'row'} gap={2}>
                                <CheckCircleIcon className='w-5 h-5 text-indigo-700' />
                                <Text fontSize="xs">{feature}</Text>
                            </Flex>
                        </GridItem>
                ))
            }
        </Grid>
        <Button
            colorScheme='indigo-600'
            width={'60%'}
            mt={5}
            isLoading={btnLoading}
            className="group relative flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => getLink('Subscription')}
        >
          <Text fontSize={'xs'}>Purchase Plan</Text>
        </Button>
      </Flex>
      <Flex direction={'column'} justifyContent={'flex-end'} px={5} py={5}>
        <Text fontSize={'sm'} fontWeight={'normal'}>Bring your own API Key</Text>
        <Text fontSize={'xs'} mt={2}>For users wanting to use their own OpenAI API key with TwoSlash</Text>
        <Button
            colorScheme='indigo-600'
            width={'60%'}
            mt={3}
            variant='link'
            isLoading={btnLoading}
            justifyContent={'flex-start'}
            className="group relative flex justify-start rounded-md text-indigo-600 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => getLink('Lifetime')}
        >
          <Text fontSize={'xs'}>Purchase at $19 /lifetime</Text>
        </Button>
      </Flex>
    </Flex>
  );
}

export default PricingPage;
