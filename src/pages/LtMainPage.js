import React from 'react'
import { Flex, Text, Image, AlertIcon, Badge, Grid, GridItem, Button } from '@chakra-ui/react';
import { useGlobalContext } from '../context/GlobalContext';
import Card from '../components/Card';
import Commands from '../components/Commands';
import image from '../images/robot.png';
import CustomApi from '../components/CustomApi';

function LtMainPage() {
  const { userDet, setUserDet, setapiKeyT, modelT, setModelT } = useGlobalContext();
  
  const { prompts } = userDet;

  const handleEdit = () => {
    setModelT(userDet.model);
    setapiKeyT(userDet.api_key);
    setUserDet({ ...userDet, api_key: null, model: modelT });
  }

  return (
    <Flex direction="column" gap="2" mt={2} px={5}>
        <Text mt={2} textAlign={userDet.api_key ? 'left' : 'center'} fontSize={'md'}>Hello, {userDet.name} 👋</Text>
        {
          userDet.api_key && <Card>
          <Flex className='bg-indigo-200 text-orange-600 justify-center items-center px-3 py-1 rounded-md'>
            <Image src={image} width={7} height={7}  />  
          </Flex>
          <Flex direction={'column'}>
            <Text fontSize="md" className='font-extrabold text-indigo-600'>{prompts}</Text>
            <Text fontSize='xs'>Commands</Text>
          </Flex>
        </Card>
        }
        <Flex direction={'column'}>
          {
            userDet.api_key ? <Commands /> : <CustomApi />
          }
          {
            userDet.api_key && <Flex direction={'column'} mt={4} ml={300} position={'absolute'}>
              <Button
                  colorScheme='indigo.100'
                  color={'indigo.600'} 
                  variant='solid'
                  className="group w-full flex justify-center rounded-md text-sm font-semibold"
                  onClick={handleEdit}
              >
                  <Text fontSize={'xs'}>Edit API Key</Text>
              </Button>
            </Flex>
          }
        </Flex>
    </Flex>
  )
}

export default LtMainPage