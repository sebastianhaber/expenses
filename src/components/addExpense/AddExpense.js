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
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import React, { useContext, useState } from 'react'
import { EXPENSES_CONTEXT } from "../../App"
import { useForm } from 'react-hook-form'
import { useEffect } from "react"

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
    type: null,
    amount: null,
    pay_method: null,
    category: null,
    note: ''
}

export default function AddExpense({isOpen, onClose, btnRef}) {
    const context = useContext(EXPENSES_CONTEXT)
    const { register, handleSubmit, reset, formState: {isSubmitSuccessful} } = useForm({defaultValues: FORM_INIT_VALUES});
    const [isTypeSelected, setSelectedType] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
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
                                        <option value="food_drinks">Jedzenie i napoje</option>
                                        <option value="shopping">Zakupy</option>
                                        <option value="home">Dom i mieszkanie</option>
                                        <option value="transport">Transport</option>
                                        <option value="car">Samochód</option>
                                        <option value="life">Życie i rozrywka</option>
                                        <option value="finances">Nakłady finansowe</option>
                                        <option value="investitions">Inwestycje</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </>
                    )}
                    <Box>
                        <FormControl>
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
                        onClick={handleSubmit(onSubmit)}
                        colorScheme={context.colorScheme}>Zapisz</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
