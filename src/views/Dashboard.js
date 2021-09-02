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
} from '@chakra-ui/react';
import React, { useContext } from 'react'
import { useRef } from 'react';
import { EXPENSES_CONTEXT } from '../App'
import AddExpense from '../components/addExpense/AddExpense';

export default function Dashboard() {
    const context = useContext(EXPENSES_CONTEXT);
    let user = context.user;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const btnRef = useRef();
    
    if (!user) return null;

    const createDate = () => {
        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth()).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
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
                p='6'
                justifyContent={['normal', 'normal', 'space-evenly']}
                flexDir={['column', 'column', 'column', 'row-reverse']}>
                <Box textAlign='center' flex='1'>
                    <Box>
                        <Text>Witaj ponownie,</Text>
                        <Heading>{ user.name }</Heading>
                    </Box>
                    <Flex my='10' fontWeight='bold' justifyContent='space-between'>
                        <Flex>
                            <Text mr='2'>Wydatki: </Text>
                            <Text color='green.400'>{ user.expenses?.total || 0 } PLN</Text>
                        </Flex>
                        <Flex>
                            <Text mr='2'>Zarobki: </Text>
                            <Text color='green.400'>{ user.incomes?.total || 0 } PLN</Text>
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
                        <Text cursor='pointer'>Sprawdź wszystkie <ArrowRightIcon fontSize='xs' /></Text>
                    </Flex>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Nazwa</Th>
                                <Th isNumeric>$$</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Ciuchy</Td>
                                <Td isNumeric color='green.400' fontWeight='bold'>140</Td>
                            </Tr>
                            <Tr>
                                <Td>McDonalds</Td>
                                <Td isNumeric color='green.400' fontWeight='bold'>32</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
            <Divider />
        </Box>
    )
}
