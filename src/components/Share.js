import React from 'react'
import { Flex, Text, Image, AlertIcon, AlertDescription, Spinner, Button } from '@chakra-ui/react';
import { Link } from 'react-chrome-extension-router';
import AuthPage from '../pages/AuthPage';
import image from '../images/love-heart 2.png';
import image2 from '../images/share.png';

function Share() {
  return (
    <Flex direction={'row'} gap={3} p={2} mt={5} ml={3}>
        <Image src={image} width={20} height={20} mt={5} mb={5} />  
        <Flex direction={'column'} justifyContent={'center'} gap={3} pr={5}>
            <Text fontSize={14} fontWeight={600} color={'grey.800'}>Liked TwoSlash? Help us spread the word, please? 🥺</Text>
            <Link component={AuthPage} mt={5}>
                <Button
                    width={'80%'}
                    size={'sm'}
                    py={4}
                    leftIcon={
                        <Flex p={1.5} backgroundColor={'#fff'} justifyContent={'flex-start'} borderRadius={50}>
                            <Image src={image2} width={3} height={3} />  
                        </Flex>
                    }
                    colorScheme='indigo-600'
                    className="rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 font-sm focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => window.open('https://chrome.google.com/webstore/detail/twoslash/nejdeohbihmiaamplfbgdoeaoikcanjm?hl=en-GB&authuser=6', '_blank')}
                >
                    <Text fontSize={'xs'}>Share TwoSlash with your friends</Text>
                </Button>
            </Link>
        </Flex>
    </Flex>
  )
}

export default Share