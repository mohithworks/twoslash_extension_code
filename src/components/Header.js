import React from 'react'
import { Flex, Text, Button, Image, Box } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { goBack, goTo } from 'react-chrome-extension-router';
import { useGlobalContext } from '../context/GlobalContext';
import MainPage from '../pages/MainPage';
import InitialPage from '../pages/InitialPage';
import AuthPage from '../pages/AuthPage';
import image from '../images/TwoSlash_Logo_Full.svg';

function Header() {
  const { user, back, setBack, status, setStatus } = useGlobalContext();
  return (
    <Flex justifyContent={`space-between`} gap={2} p={5} borderBottomWidth={1} borderBottomColor={'indigo.800'}>
        <Flex direction={'row'} gap={4}>
          {
              back && <button onClick={() => {setBack(false); setStatus(''); status === 'subscribe' ? user.email ? goTo(MainPage) : goTo(InitialPage) : goBack()}}>
                  <ArrowLeftIcon className={`w-5 h-5`} />
              </button>
          }
          <Flex mt={1}>
              {/* <Text fontSize="lg" textAlign={'center'} className='text-bold' alignItems={'flex-start'} fontWeight="semibold">Twoslash</Text> */}
                <Image src={image} className='w-30 h-6' />
          </Flex>
        </Flex>
        <Flex gap={2}>
          {
            status === '' ? (user && !user.email) ? 
            <Button
              colorScheme='indigo.600'
              color={'indigo.600'}
              size={'sm'}
              leftIcon={<i className="las la-user la-lg"></i>}
              variant={'outline'}
              className="group relative flex w-full border-indigo-600 justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold"
              onClick={() => {goTo(AuthPage)}}
            >
              <Text fontSize={'xs'}>Signup</Text>
            </Button>
            :
            <Button
              disabled={true}
              colorScheme='indigo.600'
              color={'green.600'}
              size={'sm'}
              variant={'outline'}
              className="group relative flex w-full border-indigo-600 justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold list-outside " 
            >
              <li className="font-sm" >Active</li>
            </Button>
            : null
          }
          <Button
            colorScheme='indigo-600'
            size={'sm'}
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => window.open('http://twoslash.ai/all-commands', '_blank')}
          >
            <Text fontSize={'xs'}>Get Help</Text>
          </Button>
        </Flex>
        {/* { back && <div></div> } */}
    </Flex>
  )
}

export default Header