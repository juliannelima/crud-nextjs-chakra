import { useCallback, useEffect, useState } from 'react';

import {
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Icon,
  Text,
  Input,
  Button,
  IconButton,
  useToast,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

import { debounce } from 'lodash';

import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

import { useUsers } from '../context/UseUsersContext';

import { FormModal } from '../components/FormModal';

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

  const toast = useToast();

  const [page, setPage] = useState(1);

  const [user, setUser] = useState(null);

  const [valueSearch, setValueSearch] = useState('');

  const [isOpenFormModal, setIsOpenFormModal] = useState(false);


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

  const debouncedSearchUser = useCallback(
    debounce(value => getUsers(page, value), 750)
    , []
  )

  async function handleSearchUser(value: string) {
    if(value.length >= 3) {
      debouncedSearchUser(value);
    } else if (value.length === 0 ){
      getUsers(1);
    }
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
      <Button
        maxWidth={120}
        my="4"
        ml="auto"
        colorScheme="green"
        onClick={toggleColorMode}
      >
        Tema {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <Box
        flex="1"
        p="4"
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius="md"
      >
        <Heading
          py="2"
          fontSize={["sm", "lg", "xl"]}
          fontWeight="black"
          color={colorMode === "light" ? "gray.600" : "gray.200"}
        >
          Gerenciador de Usuários
        </Heading>

        <Flex
          justify="space-between"
          align="center"
          py="2"
        >
          <Flex
            flex="1"
            direction="row"
            align="center"
            border="1px"
            borderRadius="md"
            borderColor={borderColor}
           >
            <IconButton
              size="sm"
              borderRadius="0"
              aria-label="pesquisar-usuario"
              icon={<Icon as={FaSearch} fontSize="16" />}
              onClick={() =>  handleSearchUser(valueSearch)}
            />

            <Input
              size="sm"
              border="0"
              focusBorderColor="green.500"
              placeholder="Pesquisar..."
              value={valueSearch}
              onChange={e => {
                handleSearchUser(e.target.value)
                setValueSearch(e.target.value)
              }}
            />
          </Flex>

          <Button
            onClick={handleCreateUser}
            as={asButton}
            ml="4"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} fontSize="16" />}
            icon={<Icon as={FaPlus} fontSize="16" />}
            title="Cadastrar Usuário"
          >
            {isMdVerison && <Text>Novo Usuário</Text>}
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

            { totalCount > 10 && (
              <Tfoot>
                <Tr>
                  <Td colSpan={5}>
                    <Pagination
                      totalCountOfRegisters={totalCount}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                  </Td>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </Box>
      </Box>
    </Flex>
  )
}
