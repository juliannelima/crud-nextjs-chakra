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
  useToast,
} from "@chakra-ui/react";

import { FaPlus } from 'react-icons/fa';

import { useUsers } from "../../context/UseUsersContext";

type User = {
  id: string,
  name: string;
  email: string;
  createdAt: string;
}

interface FormModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

let isLoading = false;

export function FormModal({user = null, isOpen, onClose }: FormModalProps) {
  const { createUser, updateUser } = useUsers();

  const toast = useToast();

  const initialRef = useRef();
  const finalRef = useRef();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setId('')
    setName('')
    setEmail('')

    if(user) {
       setId(user.id)
        setName(user.name)
        setEmail(user.email)
    }
  }, [user])

  async function handleSubmite() {
    isLoading = true;
    let msg = undefined;

    if(id) {
      await updateUser({id, name, email})
      msg = `Usuário ${name} alterado com sucesso.`;
    } else {
      await createUser({ name, email });
      msg = `Usuário ${name} salvo com sucesso.`;
    }

    if(msg) {
      toast({
        description:msg,
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }

    onClose();

    setId('')
    setName('')
    setEmail('')

    isLoading = false;
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