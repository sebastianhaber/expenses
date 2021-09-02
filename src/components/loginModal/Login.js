import {
    Button, Center, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast

} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { EXPENSES_CONTEXT } from '../../App';

const CustomInput = (props) => {
    const { id, type = 'text', label, placeholder, helperText, register } = props;
    return (
        <FormControl id={id} mb='6'>
            <FormLabel>{ label }</FormLabel>
            <Input type={type} placeholder={placeholder} {...register(id)} />
            <FormHelperText>{ helperText }</FormHelperText>
        </FormControl>
    )
}

const LOGIN_INIT = {
    name: '',
    email: '',
    password: '',
    password_repeat: '',
}

export default function Login({ isOpen, onClose }) {
    const [step, setStep] = useState('login');
    let history = useHistory();
    const context = useContext(EXPENSES_CONTEXT)
    const { register, handleSubmit, reset, getValues, formState: {isSubmitSuccessful} } = useForm({defaultValues: LOGIN_INIT});
    const toast = useToast();

    const toggleStep = () => {
        if (step === 'login') setStep('register');
        else setStep('login');
        reset({
            ...getValues(),
            password: '',
            password_repeat: ''
        })
    }

    const onSubmit = (data) => {
        
        const values = getValues();
        const renderToast = (description, type) => {
            toast({
                title: "Coś poszło nie tak...",
                description: description,
                status: type,
                duration: 9000,
                isClosable: true,
            })
        }

        if (step === 'register') {
            if (values.name.trim() === '' || values.email.trim() === '' || values.password.trim() === '') {
                renderToast('Wypełnij wszystkie pola.', 'error');
                return;
            }
            if (values.password === values.password_repeat) {
                if (values.password.indexOf(' ') > 0) {
                    renderToast('Hasło nie może zawierać znaków Spacji.', 'error');
                    return;
                }
                console.log('register', data);
            } else {
                renderToast('Wygląda na to, że hasła nie są takie same.', 'error');
                return;
            }
        } else {
            if (values.email.trim() === '' || values.password.trim() === '') {
                renderToast('Wypełnij wszystkie pola.', 'error');
                return;
            }
            // console.log('login', data);
            context.setUser({
                name: 'sebastian',
                email: values.email,
                expenses: {}
            })
            history.push('/dashboard');
            onClose();
        }
    }

    const LoginTab = () => {
        return (
            <>
                <CustomInput
                    id='email'
                    label='E-mail'
                    type='email'
                    placeholder='Wpisz swój adres e-mail'
                    register={register}
                />
                <CustomInput
                    id='password'
                    label='Hasło'
                    type='password'
                    placeholder='••••••••'
                    register={register}
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
                    register={register}
                />
                <CustomInput
                    id='email'
                    label='E-mail'
                    type='email'
                    placeholder='Wpisz swój adres e-mail'
                    register={register}
                    />
                <CustomInput
                    id='password'
                    label='Hasło'
                    type='password'
                    placeholder='••••••••'
                    register={register}
                    />
                <CustomInput
                    id='password_repeat'
                    label='Powtórz hasło'
                    type='password'
                    placeholder='••••••••'
                    register={register}
                />
            </>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent boxShadow='lg'>
                <ModalHeader>
                    {step === 'login' && 'Zaloguj się'}
                    {step === 'register' && 'Zarejestruj się'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {step === 'login' && <LoginTab />}
                    {step === 'register' && <RegisterTab />}
                    <Center mt='6' color='gray'>
                        <Text mr='2'>
                            {step === 'login' && 'Nie masz konta?'}
                            {step === 'register' && 'Masz już konto?'}
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
                            {step === 'login' && 'Zarejestruj się'}
                            {step === 'register' && 'Zaloguj się'}
                        </Text>
                    </Center>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="cyan" variant='ghost' mr={3} onClick={onClose}>
                        Zamknij
                    </Button>
                    <Button colorScheme='cyan' onClick={handleSubmit(onSubmit)}>
                        {step === 'login' && 'Zaloguj się'}
                        {step === 'register' && 'Zarejestruj się'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
