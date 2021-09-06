import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { EXPENSES_CONTEXT } from '../../App'
import Login from '../loginModal/Login'

export default function Nav({user, setUser}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory()
    const auth = getAuth();
    const context = useContext(EXPENSES_CONTEXT)

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
                    <Popover>
                        {({ onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Button variant='ghost'>Wyloguj się</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Wyloguj się</PopoverHeader>
                                    <PopoverBody>
                                        <Text mb='6'>Czy na pewno chcesz się wylogować?</Text>
                                        <Button
                                            colorScheme={context.colorScheme}
                                            onClick={onClose}
                                            mr='6'
                                            variant='outline'>Anuluj</Button>
                                        <Button
                                            colorScheme='red'
                                            onClick={handleLogOut}>Wyloguj</Button>
                                    </PopoverBody>
                                </PopoverContent>
                            </>
                        )}
                    </Popover>
                    // <Text
                    //     onClick={handleLogOut}
                    //     cursor='pointer'>Wyloguj się</Text>
                ): (
                    <Text onClick={onOpen} cursor='pointer'>Zaloguj się</Text>
                )}
                <Login isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Box>
    )
}
