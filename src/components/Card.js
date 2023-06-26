import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function Card({children}) {
  return (
    <Flex borderWidth={1} borderColor={'grey.800'} mt={2} width={250} gap={3} borderRadius={7} p={3}>
        {children}
    </Flex>
  )
}

export default Card