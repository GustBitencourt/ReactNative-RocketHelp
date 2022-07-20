import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }:Props ) {
    const { colors } = useTheme()
  return (
    <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pb={6}
        pt={12}
    >
        <IconButton 
            icon={<CaretLeft size={24} color={colors.gray[200]} />}
        />

        <Heading 
            color="gray.100" 
            fontSize="lg" 
            textAlign="center" 
            flex={1} 
            ml={-6}        
        >
            {title}            
        </Heading>
    </HStack>
  );
}