import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Login from '../loginModal/Login'

export default function Nav({user, setUser}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory()
    const auth = getAuth();

    const handleLogOut = () => {
        signOut(auth).then(() => {
            history.push('/');
            setUser(null);
        }).catch((error) => {
            console.log(error);
        })
    }
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
                <Text as={Link} to={user ? '/dashboard' : '/'} fontWeight='bold' fontSize='xl'>Expenses</Text>
                {user ? (
                    <Text
                        onClick={handleLogOut}
                        cursor='pointer'>Wyloguj się</Text>
                ): (
                    <Text onClick={onOpen} cursor='pointer'>Zaloguj się</Text>
                )}
                <Login isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Box>
    )
}
