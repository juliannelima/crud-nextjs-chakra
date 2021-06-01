import { useEffect, useRef, useState } from "react";

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
  idUser: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FormModal({idUser = null, isOpen, onClose }: FormModalProps) {
  const { getUser, createUser, updateUser } = useUsers();

  let isLoading = false;

  const initialRef = useRef();
  const finalRef = useRef();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setId('')
    setName('')
    setEmail('')
    if(idUser) {
      getUser(idUser).then(response => {
        setId(response.id)
        setName(response.name)
        setEmail(response.email)
      })
    }
  }, [idUser])

  async function handleSubmite() {
    isLoading = true;

    if(id) {
      await updateUser({id, name, email})

    } else {
      await createUser({ name, email });
    }
    setId('')
    setName('')
    setEmail('')

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
              value={name}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              focusBorderColor="green.500"
              onChange={e => setEmail(e.target.value)}
              value={email}
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