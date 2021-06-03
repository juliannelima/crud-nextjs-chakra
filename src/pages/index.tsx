import { useState } from 'react';

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


export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { users, deleteUser } = useUsers();

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

          <Stack
            direction={["column", "row"]}
            my="4"
            justify="space-between"
            align="center"
            spacing="6"
            px="4"
          >
            <Box fontSize="sm">
              <strong>1</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
              <Button
                variant="outline"
                colorScheme="green"
                size="sm"
                fontSize="xs"
                width="4"
                _hover={{
                  bg: 'green.300',
                  color: 'white'
                }}
              >
                1
              </Button>
              <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="green"
                _hover={{
                  bg: 'green.300',
                  color: 'white'
                }}
              >
                2
              </Button>
              <Button
                variant="outline"
                colorScheme="green"
                size="sm"
                fontSize="xs"
                width="4"
                _hover={{
                  bg: 'green.300',
                  color: 'white'
                }}
              >
                3
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}
