import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";

import { makeServer } from '../services/mirage';

import { UsersProvider } from "../context/UseUsersContext";


makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UsersProvider>
  )
}

export default MyApp
