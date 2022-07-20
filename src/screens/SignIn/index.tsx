import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key  } from 'phosphor-react-native'

import Logo from '../../assets/logo_primary.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //hook para obter as cores do theme a alterar icones
  const { colors } = useTheme();

  function handleSignIn() {
    console.log('email: ', email, ' password: ', password);
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
      />
    </VStack>
  )
}