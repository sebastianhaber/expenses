import {
    Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table,
    Tbody, Td, Th, Thead, Tr, useDisclosure, useToast
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { EXPENSES_CONTEXT } from '../App'
import { db } from '../firebase';

export default function AllExpenses() {
    const context = useContext(EXPENSES_CONTEXT)
    const user = context.user;
    const data = context.data;
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [values, setValues] = useState({});
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);

    if (!user) {
        history.push('/');
        return false;
    }
    
    const saveEdit = async (editedValues) => {
        setLoading(true)
        try {
            await db.collection('expenses').doc(user.email)
                .collection('activities').doc(values.id).update(editedValues);
            
            await db.collection('expenses').doc(user.email)
                .collection('activities').orderBy('timestamp', 'desc').get()
                .then(data => {
                    const doc = data.docs.map(element => element.data())
                    context.setData(doc)
                });
            
            setValues({});
            onClose();
        } catch (error) {
            toast({
                title: `Nie udało się zmienić aktywności 😣`,
                description: 'Wystąpił błąd uniemożliwiający zmianę aktywności.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
    const deleteActivity = async () => {
        setLoading(true)
        try {
            await db.collection('expenses').doc(context.user.email)
                .collection('activities').doc(values.id).delete()
            onClose();
            setValues({});
        } catch (error) {
            toast({
                title: `Nie udało się usunąć aktywności 😣`,
                description: 'Wystąpił błąd uniemożliwiający usunięcie aktywności.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
    const handleEdit = (activity) => {
        setValues({
            id: activity.id,
            amount: activity.amount,
            note: activity.note,
        });
        onOpen();
    }
    
    const returnModal = () => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edytuj aktywność</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Kwota</FormLabel>
                            <Input {...register('amount', {
                                value: values.amount
                            })} defaultValue={ values.amount } />
                        </FormControl>
                        <FormControl mt='6'>
                            <FormLabel>Notatka</FormLabel>
                            <Input {...register('note', {
                                value: values.note
                            })} defaultValue={ values.note } />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant='outline'
                            colorScheme='red'
                            mr='6'
                            isLoading={isLoading}
                            onClick={deleteActivity}>Usuń</Button>
                        <Button
                            type='submit'
                            colorScheme={context.colorScheme}
                            mr={3}
                            onClick={handleSubmit(saveEdit)}
                            isLoading={isLoading}>Zapisz</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const tableValues = () => {
        return data.map((activity, index) => {
            const date = new Date(activity.timestamp.seconds * 1000);

            return (
                <Tr
                    key={index}
                    onDoubleClick={() => handleEdit(activity)}
                    userSelect='none'>
                    <Td>{
                        activity.category === null ? 'Przychód' : activity.category
                    }</Td>
                    <Td>{activity.note}</Td>
                    <Td>{date.toLocaleDateString()}</Td>
                    <Td isNumeric color={activity.category ? 'red.400' : 'green.400'} fontWeight='bold'>{activity.amount}</Td>
                    <Td onClick={() => handleEdit(activity)}>
                        <EditIcon />
                    </Td>
                </Tr>
            )
        })
    }

    return (
        <Flex flexDir={['column', 'row', 'row']}>
            <Flex
                flexDir='column'
                p='2'
                maxW='200px'
                w='100%'>
                <Box>szukanie</Box>
                <Box>sortowanie</Box>
                <Box>lista kategorii</Box>
            </Flex>
            <Box flex='1' p='2'>
                {returnModal()}
                <Table variant="striped" mt='6'>
                    <Thead>
                        <Tr>
                            <Th>Kategoria</Th>
                            <Th>Notatka</Th>
                            <Th>Data</Th>
                            <Th isNumeric>$$</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            tableValues()
                        }
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    )
}
