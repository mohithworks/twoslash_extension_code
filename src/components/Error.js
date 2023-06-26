import React from 'react'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';


function Error() {
  return (
    <Alert status="error">
        <AlertIcon />
        <AlertDescription>There was an error logging in.</AlertDescription>
    </Alert>
  )
}

export default Error