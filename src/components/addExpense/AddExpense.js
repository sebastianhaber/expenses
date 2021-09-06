import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Box,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react"
import React, { useContext, useState } from 'react'
import { EXPENSES_CONTEXT } from "../../App"
import { useForm } from 'react-hook-form'
import { useEffect } from "react"
import { db } from "../../firebase"
import firebase from '@firebase/app-compat'

const StyledFormLabel = (props) => {
    const { children } = props;
    return (
        <FormLabel {...props}
            fontWeight='bold'
            fontSize='xl'
            mt='6'
            mb='2'>{children}</FormLabel>
    )
}
const FORM_INIT_VALUES = {
    type: 'income',
    amount: null,
    pay_method: null,
    category: null,
    note: ''
}

export default function AddExpense({isOpen, onClose, btnRef}) {
    const context = useContext(EXPENSES_CONTEXT)
    const { register, handleSubmit, reset, getValues ,formState: {isSubmitSuccessful} } = useForm({defaultValues: FORM_INIT_VALUES});
    const [isTypeSelected, setSelectedType] = useState(null);
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            const docRef = db.collection('expenses').doc(context.user.email).collection('activities').doc()
            const valuesWithTimestamp = {
                ...getValues(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                id: docRef.id
            }
            await docRef.set(valuesWithTimestamp);
            
            toast({
                title: `💲 Dodano aktywność!`,
                description: '',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error);
            toast({
                title: `😶 Coś poszło nie tak...`,
                description: 'Nie możemy zapisać Twojej aktywności. Spróbuj ponownie.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        setLoading(false);
        onClose();
    }
    const handleSetType = (data) => {
        setSelectedType(data);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(FORM_INIT_VALUES)
            setSelectedType(null)
        }
    }, [isSubmitSuccessful, reset])

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size='lg'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dodaj aktywność 💲</DrawerHeader>

                    <DrawerBody>
                        <Box>
                            <FormControl isRequired>
                                <StyledFormLabel>Typ aktywności</StyledFormLabel>
                                <RadioGroup onChange={handleSetType}>
                                    <Stack direction="row">
                                        <Radio value="expense" {...register('type')}>Wydatek</Radio>
                                        <Radio value="income" {...register('type')}>Przychód</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <StyledFormLabel>Wpisz kwotę (w PLN)</StyledFormLabel>
                                <NumberInput min={1}>
                                    <NumberInputField {...register('amount')} />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Box>
                        {isTypeSelected === 'expense' && (
                            <>
                                <Box>
                                    <FormControl isRequired>
                                        <StyledFormLabel>Płatność</StyledFormLabel>
                                        <RadioGroup>
                                            <Radio value="card" {...register('pay_method')} m='2'>Karta</Radio>
                                            <Radio value="cash" {...register('pay_method')} m='2'>Gotówka</Radio>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl isRequired>
                                        <StyledFormLabel>Kategoria</StyledFormLabel>
                                        <Select
                                            placeholder='Wybierz kategorię'
                                            defaultValue='null'
                                            {...register('category')}>
                                            <option value="Jedzenie i napoje">Jedzenie i napoje</option>
                                            <option value="Zakupy">Zakupy</option>
                                            <option value="Dom i mieszkanie">Dom i mieszkanie</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Samochód">Samochód</option>
                                            <option value="Życie i rozrywka">Życie i rozrywka</option>
                                            <option value="Nakłady finansowe">Nakłady finansowe</option>
                                            <option value="Inwestycje">Inwestycje</option>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </>
                        )}
                        <Box>
                            <FormControl isRequired>
                                <StyledFormLabel>Notatka</StyledFormLabel>
                                <Input placeholder='Dodaj notatkę...' {...register('note')} />
                            </FormControl>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Anuluj
                        </Button>
                        <Button
                            type='submit'
                            isLoading={isLoading}
                            colorScheme={context.colorScheme}>Zapisz</Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    )
}
