import {
    Container, Heading, Text, Button,
    Box, useDisclosure, Divider
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-scroll'
import Login from '../components/loginModal/Login'
import { ChevronRightIcon } from '@chakra-ui/icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { EXPENSES_CONTEXT } from '../App'
import { useHistory } from 'react-router-dom'

export default function HomePage() {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const gradient = 'linear(to-r, cyan, green.200)';
    const fontSize = {
        heading: ['5xl', '6xl', '8xl', '8xl'],
        subHeading: ['md', 'xl'],
    }
    const context = useContext(EXPENSES_CONTEXT)
    const history = useHistory();

    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    }, []);
    useEffect(() => {
        if (context.user) history.push('/dashboard');
    }, [context.user, history])

    return (
        <Box>
            <Login onClose={onClose} isOpen={isOpen} />
            <Box
                pos='relative'
                top='-20'
                data-aos='zoom-in'
                w='100%'
                h='100vh'>
                <Container
                    pos='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%,-50%)'
                    textAlign='center'>
                    <Heading
                        bgGradient={gradient}
                        bgClip='text'
                        mb='10'
                        fontSize={fontSize.heading}>Zaoszczędź.</Heading>
                    <Text fontSize={fontSize.subHeading}>
                        W przeciągu kilku tygodni, miesięcy lub lat jesteś w stanie zauważyć
                        od czego są uzależnione Twoje wydatki.
                    </Text>

                    <Button
                        fontSize={fontSize.subHeading}
                        p='6'
                        mt='10'
                        borderRadius='xl'
                        as={Link}
                        to='start'
                        smooth
                        colorScheme='cyan'>Zaczynajmy! 🚀</Button>
                </Container>
            </Box>

            <Box
                id='start'
                pos='relative'
                textAlign='center'
                bgColor='gray.700'
                h='100vh'>
                <Container
                    pos='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%,-50%)'>
                    <Heading
                        fontSize={fontSize.heading}
                        bgGradient={gradient}
                        data-aos='fade-down'
                        bgClip='text'>Expenses</Heading>
                    <Text fontSize={fontSize.subHeading}>
                        Wszystko jest w pełni darmowe.
                    </Text>

                    <Divider my='10' data-aos='zoom-in-right' />

                    <Box
                        data-aos='fade-up'>
                        <Text fontSize={fontSize.subHeading}>
                            Zacznij swoją przygodę z Expenses od zalogowania się 💝
                        </Text>
                        <Button
                            mt='10'
                            fontSize={fontSize.subHeading}
                            p='6'
                            borderRadius='xl'
                            onClick={onOpen}
                            colorScheme='cyan'>Zaloguj się <ChevronRightIcon ml='2' /></Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
