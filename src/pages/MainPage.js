import React, { useState } from 'react'
import { Flex, Text, Image, AlertIcon, Badge, Grid, GridItem, Button } from '@chakra-ui/react';
import { useGlobalContext } from '../context/GlobalContext';
import Card from '../components/Card';
import Commands from '../components/Commands';
import image from '../images/robot.png';
import { getPaymentURL } from './PricingPage';

function MainPage() {
  const { user, userDet } = useGlobalContext();
  const { prompts, account_type, trial } = userDet;

  const [btnLoading, setBtnLoading] = useState(false);

  const listofCommands = [
    'rewrite',
    'spanish',
    'french',
    'answer',
    'code',
  ]  

  const getLink = (type) => {
    console.log('clicked')
    setBtnLoading(true)
    getPaymentURL(user.uid, user.email, userDet.phone, type).then((res) => {
      console.log(res);
      if(res.body.status === '400') {
        alert('There was an error with the extension. Please try again later with stable internet connection.');
        return;
      }
      setBtnLoading(false)
      window.open(res.body.data, '_blank');
    })
  }

  return (
    <Flex direction="column" gap="2" mt={2} px={5}>
        <Text mt={2} fontSize={'md'}>Hello, {userDet.name} 👋</Text>
        <Card>
          {
            prompts <= 5 && account_type === null ?
            <>
              <Flex className='bg-orange-100 text-orange-600 justify-center items-center px-3 py-1 rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
              </Flex>
              <Flex direction={'column'}>
                <Text fontSize="md" className='font-extrabold text-orange-600'>{prompts}</Text>
                <Text fontSize='xs'>Free Commands Left</Text>
              </Flex>
            </>
            :
            <>
              <Flex className={`${trial <= 10 ? `bg-orange-100` : `bg-indigo-200`} text-orange-600 justify-center items-center px-3 py-1 rounded-md`}>
                {
                  trial <= 10 ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                  :
                  <Image src={image} width={7} height={7}  />  
                }
              </Flex>
              <Flex direction={'column'}>
                <Text fontSize="md" className={`font-extrabold ${trial <= 10 ? `text-orange-600` : `text-indigo-600`}`}>{trial} days left</Text>
                {
                  trial <= 10 ? 
                  <Flex
                      justifyContent={'flex-start'}
                      textAlign={'left'}
                      className="text-indigo-600 text-sm font-semibold text-white cursor-pointer"
                      onClick={() => btnLoading === false && getLink('Subscription')}
                  >
                    <Text fontSize={'xs'} textAlign={'left'} className='text-orange-800'>Renew Now</Text>
                  </Flex>
                  :
                  <Text fontSize='xs'>for Renewal</Text>
                }
              </Flex>
            </>
          }
        </Card>
        <Commands />
        {/* <Text fontSize="md" fontWeight="normal">No of Prompts left - </Text>
        <Text fontSize="md" fontWeight="medium">{prompts}</Text> */}
    </Flex>
  )
}

export default MainPage