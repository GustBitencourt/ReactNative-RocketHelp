import { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key  } from 'phosphor-react-native'

import Logo from '../../assets/logo_primary.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //hook para obter as cores do theme a alterar icones
  const { colors } = useTheme();

  function handleSignIn() {
    if(!email || !password) {
      return Alert.alert('Entrar', 'Informe email');
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if(error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'Email inválido.');
        }

        if(error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'Email ou senha inválida.');
        }

        if(error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Email ou senha inválida.');
        }

        return Alert.alert('Entrar', 'Não foi possível entrar.');
      })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input 
        placeholder="E-mail"
        mb={4}
        InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} />} />}
        onChangeText={setEmail}
      />      
      <Input 
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title='Entrar'
        w='full'    
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  )
}