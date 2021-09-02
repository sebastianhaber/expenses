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
} from "@chakra-ui/react"
import React, { useContext, useState } from 'react'
import { EXPENSES_CONTEXT } from "../../App"

const StyledHeading = (props) => {
    const { children } = props;
    return (
        <Text {...props}
            fontWeight='bold'
            fontSize='xl'
            mt='6'
            mb='2'>{children}</Text>
    )
}

export default function AddExpense({isOpen, onClose, btnRef}) {
    const context = useContext(EXPENSES_CONTEXT)
    const [value, setValue] = useState('')

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
                        <StyledHeading>Typ aktywności</StyledHeading>
                        <RadioGroup onChange={setValue}>
                            <Stack direction="row">
                                <Radio value="expense">Wydatek</Radio>
                                <Radio value="income">Przychód</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box>
                        <StyledHeading>Wpisz kwotę (w PLN)</StyledHeading>
                        <NumberInput min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box>
                        <StyledHeading>Kategoria</StyledHeading>
                        <Input placeholder='Szukaj kategorii' mb='2' />
                        <RadioGroup onChange={setValue}>
                            <Flex flexWrap='wrap'>
                                <Radio value="ciuchy" m='2'>Ciuchy</Radio>
                                <Radio value="slodkosci" m='2'>Słodkości</Radio>
                                <Radio value="fastfood" m='2'>FastFoody</Radio>
                                <Radio value="prezent" m='2'>Prezenty</Radio>
                            </Flex>
                        </RadioGroup>
                    </Box>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Anuluj
                    </Button>
                    <Button colorScheme={context.colorScheme}>Zapisz</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
