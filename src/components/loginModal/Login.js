import {
    Button, Center, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text

} from '@chakra-ui/react'
import React, { useState } from 'react'

const CustomInput = (props) => {
    const { id, type = 'text', label, placeholder, helperText } = props;
    return (
        <FormControl id={id} {...props}>
            <FormLabel>{ label }</FormLabel>
            <Input type={type} placeholder={placeholder} />
            <FormHelperText>{ helperText }</FormHelperText>
        </FormControl>
    )
}

export default function Login({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const toggleStep = () => {
        if (step === 1) setStep(2);
        else setStep(1);
    }

    const LoginTab = () => {
        return (
            <>
                <CustomInput
                    id='email'
                    label='E-mail'
                    type='email'
                    placeholder='Wpisz swój adres e-mail'
                    mb='6'
                />
                <CustomInput
                    id='password'
                    label='Hasło'
                    type='password'
                    placeholder='••••••••'
                    mb='6'
                />
            </>
        )
    }
    const RegisterTab = () => {
        return (
            <>
                <CustomInput
                    id='name'
                    label='Imię'
                    placeholder='Wpisz swoje imię'
                    mb='6'
                />
                <CustomInput
                    id='email'
                    label='E-mail'
                    type='email'
                    placeholder='Wpisz swój adres e-mail'
                    mb='6'
                    />
                <CustomInput
                    id='password'
                    label='Hasło'
                    type='password'
                    placeholder='••••••••'
                    mb='6'
                    />
                <CustomInput
                    id='password_repeat'
                    label='Powtórz hasło'
                    type='password'
                    placeholder='••••••••'
                    mb='6'
                />
            </>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent boxShadow='lg'>
                <ModalHeader>
                    {step === 1 && 'Zaloguj się'}
                    {step === 2 && 'Zarejestruj się'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {step === 1 && <LoginTab />}
                    {step === 2 && <RegisterTab />}
                    <Center mt='6' color='gray'>
                        <Text mr='2'>
                            {step === 1 && 'Nie masz konta?'}
                            {step === 2 && 'Masz już konto?'}
                        </Text>
                        <Text
                            transition='color .2s ease'
                            _hover={
                                {
                                    color: 'white',
                                }
                            }
                            onClick={toggleStep}
                            textDecor='underline'
                            cursor='pointer'>
                            {step === 1 && 'Zarejestruj się'}
                            {step === 2 && 'Zaloguj się'}
                        </Text>
                    </Center>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="cyan" variant='ghost' mr={3} onClick={onClose}>
                        Zamknij
                    </Button>
                    <Button colorScheme='cyan'>
                        {step === 1 && 'Zaloguj się'}
                        {step === 2 && 'Zarejestruj się'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
