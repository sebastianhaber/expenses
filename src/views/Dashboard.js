import { ArrowRightIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Heading, Text, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Circle,
  Tooltip,
  useDisclosure,
  Image,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EXPENSES_CONTEXT } from '../App'
import AddExpense from '../components/addExpense/AddExpense';
import { db } from '../firebase';

export default function Dashboard() {
    const context = useContext(EXPENSES_CONTEXT);
    let user = context.user;
    const history = useHistory();

    const { isOpen, onClose, onOpen } = useDisclosure();
    const btnRef = useRef();
    const setData = context.setData;
    const data = context.data;

    const docRef = db.collection('expenses').doc(user?.email).collection('activities');
    const toast = useToast();

    useEffect(() => {
        try {
            docRef.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => doc.data())
                setData(data)
            })
        } catch (error) {
            console.log(error);
            toast({
                title: `Coś poszło nie tak...`,
                description: 'Nie możemy uzyskać danych z serwera.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) history.push('/');

    const createDate = () => {
        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth()).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const tableValues = () => {
        const limit = 3;
        
        return data.slice(0, limit).map((activity, index) => (
            <Tr key={index}>
                <Td>{
                    activity.category === '' ? 'Przychód' : activity.category
                }</Td>
                <Td>{activity.note}</Td>
                <Td isNumeric color={activity.category ? 'red.400' : 'green.400'} fontWeight='bold'>{activity.amount}</Td>
            </Tr>
        ))
    }

    if (!data) {
        return (
            <Flex
                pos='absolute'
                top='0'
                left='0'
                w='100%'
                h='100vh'
                justifyContent='center'
                alignItems='center'>
                <Spinner size='lg' />
            </Flex>
        )
    }

    return (
        <Box>
            <AddExpense isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
            <Tooltip
                label='Dodaj wydatek/przychód'
                hasArrow placement='top'>
                <Circle
                    pos='fixed'
                    right={['25px', '25px', '50px']}
                    bottom={['25px', '25px', '50px']}
                    w='50px'
                    h='50px'
                    bgColor={context.colorScheme + `.600`}
                    fontSize='2xl'
                    onClick={() => onOpen()}
                >
                    <PlusSquareIcon />
                </Circle>
            </Tooltip>

            <Flex p='6' justifyContent='space-between' alignItems='center'>
                <Heading>Dashboard</Heading>
                <Text isTruncated>{ createDate() }</Text>
            </Flex>
            <Divider />
            <Flex
                py='6'
                px='3'
                justifyContent={['normal', 'normal', 'space-evenly']}
                flexDir={['column', 'column', 'column', 'row-reverse']}>
                <Box textAlign='center' flex='1'>
                    <Flex flexDir='column' alignItems='center'>
                        <Image
                            src={user?.photoURL}
                            borderRadius='full'
                            mb='6'
                            w='72px'
                            h='72px' />
                        <Text>Witaj,</Text>
                        <Heading>{ user?.displayName }</Heading>
                    </Flex>
                    <Flex my='10' fontWeight='bold' justifyContent='space-between'>
                        <Flex>
                            <Text mr='2'>Wydatki: </Text>
                            <Text color='green.400'>{ user?.expenses?.total || 0 } PLN</Text>
                        </Flex>
                        <Flex>
                            <Text mr='2'>Zarobki: </Text>
                            <Text color='green.400'>{ user?.incomes?.total || 0 } PLN</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                </Box>
                <Box w='10%' />
                <Box
                    flex='2'
                    textAlign='center'
                    my='6'>
                    <Flex
                        justifyContent='space-between'
                        alignItems='center'>
                        <Heading fontSize={['xl', 'xl', '4xl']}>Ostatnie wydatki</Heading>
                        <Text as={Link} to='/dashboard/all-expenses' cursor='pointer'>Sprawdź wszystkie <ArrowRightIcon fontSize='xs' /></Text>
                    </Flex>
                    <Table variant="simple" mt='6'>
                        <Thead>
                            <Tr>
                                <Th>Kategoria</Th>
                                <Th>Notatka</Th>
                                <Th isNumeric>$$</Th>
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
            <Divider />
            
        </Box>
    )
}
