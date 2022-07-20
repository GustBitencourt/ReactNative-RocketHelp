import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';

import { SignIn } from './src/screens/SignIn';
import { Register } from './src/screens/Register';
import { Home } from './src/screens/Home';

import { THEME } from './src/styles/theme';

export default function App() {
  //pra carregamento da font antes do app ser iniciado
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Register /> : <Loading />}
    </NativeBaseProvider>
  );
}
