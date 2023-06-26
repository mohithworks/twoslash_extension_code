import React from 'react'
import { Flex, Text, Image, AlertIcon, AlertDescription, Spinner, Button } from '@chakra-ui/react';
import { Link } from 'react-chrome-extension-router';
import AuthPage from '../pages/AuthPage';
import image from '../images/love-heart 1.png';

function Subscribe() {
  return (
    <Flex direction={'row'} gap={1} p={2} mt={5}>
        <Image src={image} width={20} height={20} mt={5} mb={5} />  
        <Flex direction={'column'} justifyContent={'center'} gap={2} pr={5}>
            <Text fontSize={14} fontWeight={600} color={'grey.800'}>Upgrade and utilize the full power of Twoslash.ai 💪</Text>
            <Link component={AuthPage} mt={5}>
                <Button
                    width={'60%'}
                    size={'sm'}
                    colorScheme='indigo-600'
                    className="group relative flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 font-sm focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <Text fontSize={'xs'}>Upgrade Now!</Text>
                </Button>
            </Link>
            <Flex justifyItems={'center'}>
                <Text fontSize={'xs'} color={'gray.400'}>Literally costs lesser than a pizza!</Text>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default Subscribe