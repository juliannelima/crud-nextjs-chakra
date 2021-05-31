import { useRef, useState } from "react";

import {
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
  Icon,
  Text
} from "@chakra-ui/react";

import { FaPlus } from 'react-icons/fa';

import { useUsers } from "../../context/UseUsersContext";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormModal({ isOpen, onClose }: FormModalProps) {
  const { createUser } = useUsers();

  let isLoading = false;

  const initialRef = useRef();
  const finalRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmite() {
    isLoading = true;

    await createUser({ name, email });

    isLoading = false;

    onClose();
  }

  return (
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
              onChange={e => setName(e.target.value)}
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
          <Button
            mr={3}
            isLoading={isLoading}
            colorScheme="green"
            onClick={handleSubmite}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}