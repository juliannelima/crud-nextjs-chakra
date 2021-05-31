import { useRef, useState } from "react"

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  IconButton,
  Icon
} from "@chakra-ui/react";

import { FaPlus } from 'react-icons/fa';

export function FormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef()
  const finalRef = useRef()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const asButton = useBreakpointValue({ base: IconButton, md: Button })

  function handleSubmite() {

    console.log(nome, email)

  }

  return (
    <>
      <Button
        onClick={onOpen}
        as={asButton}
        size="sm"
        fontSize="sm"
        colorScheme="green"
        leftIcon={<Icon as={FaPlus} fontSize="16" />}
        icon={<Icon as={FaPlus} fontSize="16" />}
        title="Cadastrar Usuário"
      >
        Cadastrar Usuário
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nome"
                focusBorderColor="green.500"
                onChange={e => setNome(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder="E-mail"
                focusBorderColor="green.500"
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmite}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}