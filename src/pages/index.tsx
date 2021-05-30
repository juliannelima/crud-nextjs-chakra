import { useEffect, useState } from 'react';

import {
  Flex,
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  IconButton,
  Icon,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import { getUsers } from '../services/hooks/useUsers';


type User = {
  id: string,
  name: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const isLgVerison = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMdVerison = useBreakpointValue({
    base: false,
    md: true,
  });

  const asButton = useBreakpointValue({ base: IconButton, md: Button })

  useEffect(() => {
    getUsers(1).then(response => setUsers(response.users))
  } , [])

  return (
    <Flex
      w="100%"
      maxWidth={1220}
      mx="auto"
      px="6"
      my="6"
    >

      <Box flex="1" p="4" bg="white">
        <Flex
          justify="space-between"
          align="center"
          py="2"
        >
          <Heading
            fontSize={["sm", "lg", "xl"]}
            fontWeight="black"
            color="gray.600"
          >
            Gerenciador de Usuários
          </Heading>
          <Button
            as={useBreakpointValue({ base: IconButton, md: Button })}
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={FaPlus} fontSize="16" />}
            icon={<Icon as={FaPlus} fontSize="16" />}
          >
            Criar novo
          </Button>
        </Flex>

        <Box
          border="1px"
          borderRadius="sm"
          borderColor="gray.200"
        >
          <Table size="sm">
            <Thead bg="gray.200">
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
                    <Td>{user.name}</Td>
                    {isMdVerison && <Td>{user.email}</Td>}
                    {isLgVerison && <Td>{user.createdAt}</Td>}
                    <Td>
                      <Button
                        as={asButton}
                        variant="outline"
                        size="sm"
                        fontSize="sm"
                        leftIcon={<Icon as={FaEdit} fontSize="16"/>}
                        icon={<Icon as={FaEdit} fontSize="16"/>}
                      >
                        Editar
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        as={asButton}
                        variant="outline"
                        size="sm"
                        fontSize="sm"
                        leftIcon={<Icon as={FaTrash} fontSize="16" />}
                        icon={<Icon as={FaTrash}
                        fontSize="16"/>}
                      >
                        Apagar
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
