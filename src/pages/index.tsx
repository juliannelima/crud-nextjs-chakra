import { useEffect, useState } from 'react';

import {
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import { FormModal } from '../components/FormModal';

import { useUsers } from '../context/UseUsersContext';

import { Pagination } from '../components/Pagination';

interface IUser {
  id?: string
  name: string;
  email: string;
  createdAt?: string;
}

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { users, getUsers, deleteUser, totalCount } = useUsers();

  const [page, setPage] = useState(1);

  const toast = useToast();

  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [user, setUser] = useState(null);

  const isLgVerison = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMdVerison = useBreakpointValue({
    base: false,
    md: true,
  });

  const asButton = useBreakpointValue({ base: IconButton, md: Button })

  useEffect(() => { getUsers(page) }, [page])

  function handleToggleFormModal(){
    setIsOpenFormModal(!isOpenFormModal);
  }

  async function handleCreateUser() {
    setUser(null);
    setIsOpenFormModal(!isOpenFormModal);
  }

  async function handleUpdateUser(user) {
    setUser(user);
    setIsOpenFormModal(!isOpenFormModal);
  }

  async function handleDeleteUser(user) {
    await deleteUser(user.id);

    toast({
      description: `Usuário ${user.name} excluído com sucesso.`,
      status: "success",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Flex
      w="100%"
      maxWidth={1220}
      mx="auto"
      px="6"
      my="6"
      direction="column"
    >
      <Button onClick={toggleColorMode} my="4" maxWidth={120} ml="auto" colorScheme="green">
        Tema {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <Box
        flex="1"
        p="4"
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius="md"
      >
        <Flex
          justify="space-between"
          align="center"
          py="2"
        >
          <Heading
            fontSize={["sm", "lg", "xl"]}
            fontWeight="black"
            color={colorMode === "light" ? "gray.600" : "gray.200"}
          >
            Gerenciador de Usuários
          </Heading>
          <Button
            onClick={handleCreateUser}
            as={asButton}
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} fontSize="16" />}
            icon={<Icon as={FaPlus} fontSize="16" />}
            title="Cadastrar Usuário"
          >
            {isMdVerison && <Text>Cadastrar Usuário</Text>}
          </Button>
          <FormModal
            user={user}
            isOpen={isOpenFormModal}
            onClose={handleToggleFormModal}
          />
        </Flex>

        <Box
          border="1px"
          borderRadius="sm"
          borderColor={borderColor}
        >
          <Table size="sm">
            <Thead bg={colorMode === "light" ? "gray.200" : "gray.600"}>
              <Tr>
                <Th>Nome</Th>
                {isMdVerison && <Th>E-mail</Th>}
                {isLgVerison && <Th>Data de Cadastro</Th>}
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => {
                return (
                  <Tr key={user.id}>
                    <Td borderColor={borderColor}>{user.name}</Td>
                    {isMdVerison && <Td borderColor={borderColor}>{user.email}</Td>}
                    {isLgVerison && <Td borderColor={borderColor}>{user.createdAt}</Td>}
                    <Td borderColor={borderColor}>
                      <Button
                        onClick={() => handleUpdateUser(user)}
                        as={asButton}
                        variant="outline"
                        size="sm"
                        fontSize="sm"
                        leftIcon={<Icon as={FaEdit} fontSize="16"/>}
                        icon={<Icon as={FaEdit} fontSize="16"/>}
                        title="Editar Usuário"
                      >
                        {isMdVerison && <Text>Editar</Text>}
                      </Button>
                    </Td>
                    <Td borderColor={borderColor}>
                      <Button
                        as={asButton}
                        variant="outline"
                        size="sm"
                        fontSize="sm"
                        leftIcon={<Icon as={FaTrash} fontSize="16" />}
                        icon={<Icon as={FaTrash} fontSize="16"/>}
                        title="Apagar Usuário"
                        onClick={() => handleDeleteUser(user)}
                      >
                        {isMdVerison && <Text>Apagar</Text>}
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>

          <Box px="4" my="4">
            <Pagination
              totalCountOfRegisters={totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
