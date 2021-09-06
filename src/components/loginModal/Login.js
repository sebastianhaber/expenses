import {
    Button, Flex, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast
} from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react';
import { EXPENSES_CONTEXT } from '../../App';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ChevronRightIcon } from '@chakra-ui/icons';
import { db } from '../../firebase';
import { useState } from 'react';

export default function Login({ isOpen, onClose }) {
    const context = useContext(EXPENSES_CONTEXT)
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const showGoogleSignInButton = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                db.collection('expenses').doc(user.email).set({
                    email: user.email,
                    displayName: user.displayName
                })

                context.setUser(user);
                context.token = token;

                onClose();
            }).catch((error) => {
                const errorMessage = error.message;
                toast({
                    title: `Coś poszło nie tak...`,
                    description: errorMessage,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
        setLoading(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent boxShadow='lg'>
                <ModalHeader>
                    <Text>Zaloguj się za pomocą:</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir='column' justifyContent='space-evenly' alignItems='center' >
                        <Button
                            isLoading={isLoading}
                            colorScheme={context.colorScheme}
                            onClick={() => showGoogleSignInButton()}>
                            <ChevronRightIcon mr='2' /> Google
                        </Button>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="cyan" variant='ghost' mr={3} onClick={onClose}>
                        Zamknij
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
