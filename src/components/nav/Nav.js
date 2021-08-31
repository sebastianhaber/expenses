import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../loginModal/Login'

export default function Nav() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box
            pos='sticky'
            top='0'
            zIndex='sticky'
            bgColor='gray.800'>
            <Flex
                justifyContent='space-between'
                alignItems='center'
                w='full'
                h='20'
                margin='0 auto'
                px='6'
                maxW='1440px'>
                <Text as={Link} to='/' fontWeight='bold' fontSize='xl'>Expenses</Text>
                <Text onClick={onOpen} cursor='pointer'>Zaloguj się</Text>
                <Login isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Box>
    )
}
