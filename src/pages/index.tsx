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

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

export default function Home() {
  const isLgVerison = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMdVerison = useBreakpointValue({
    base: false,
    md: true,
  });

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
                <Th>Usuário</Th>
                {isLgVerison && <Th>Nome</Th>}
                {isMdVerison && <Th>E-mail</Th>}
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr >
                <Td>juliannelicon</Td>
                {isLgVerison && <Td>Julianne Pereira Lima Licón</Td>}
                {isMdVerison && <Td>juliannelicon@gmail.com</Td>}
                <Td>
                  <Button
                    as={useBreakpointValue({ base: IconButton, md: Button })}
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
                    as={useBreakpointValue({ base: IconButton, md: Button })}
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
              <Tr >
                <Td>juliannelicon</Td>
                {isLgVerison && <Td>Julianne Pereira Lima Licón</Td>}
                {isMdVerison && <Td>juliannelicon@gmail.com</Td>}
                <Td>
                  <Button
                    as={useBreakpointValue({ base: IconButton, md: Button })}
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
                    as={useBreakpointValue({ base: IconButton, md: Button })}
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
