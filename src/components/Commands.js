import React from 'react'
import { Flex, Text, Button, Grid, GridItem, Tooltip } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

function Commands() {

    const listofCommands = [
        'AI',
        'Rewrite',
        'Email',
        'Answer',
        'Sheets',
        'Grammar',
        'Explain',
        'Code',
    ]  
  
  return (
    <Flex mt={5} direction={'column'}>
        <Flex direction={'row'} gap={2}>
          <Text className={'m-0 p-0 rounded-xl font-body'}>Commands</Text>
          <Tooltip label='Type //the-command followed by your prompt. End the prompt with //'>
            <InfoIcon cursor={'pointer'} mt={1} opacity={0.7} />
          </Tooltip>
        </Flex>
        <Grid gap={3} templateColumns='repeat(4, 1fr)' mt={3} className='justify-center items-center' justifyContent={'center'} alignItems={'center'}>
          {
            listofCommands.map((command, index) => {
              return (
                <GridItem key={index}><Flex color='indigo.600' justifyContent={'center'} alignItems={'center'} borderWidth={2} borderRadius={5} py={1} borderColor={'indigo.300'} variant={'outline'}>
                    <Text fontSize={'xs'}>{command}</Text>
                </Flex></GridItem>
              )
            })
          }
        </Grid>
        <Button
            colorScheme='indigo-600'
            width={'60%'}
            mt={5}
            variant='link'
            justifyContent={'flex-start'}
            className="group relative flex justify-start rounded-md text-indigo-600 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => window.open('https://twoslash.ai/all-commands', '_blank')}
        >
          <Text fontSize={'xs'}>View all commands</Text>
        </Button>
    </Flex>
  )
}

export default Commands