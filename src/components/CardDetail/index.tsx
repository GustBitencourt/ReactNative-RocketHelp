import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native'
import { VStack, Text, HStack, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetail({ title, description, footer = null, icon: Icon, children }: Props) {
    const { colors } = useTheme();

    return (
        <VStack bg="gray.600" p={5} mt={5} rounded="sm">
            <HStack alignItems="center" mb={4}>
                <Icon color={colors.primary[700]} />

                <Text
                    ml={2}
                    fontSize="sm"
                    color="gray.300"
                    textTransform="uppercase"
                >
                    {title}
                </Text>

                {
                    !!description && 
                    <Text color="gray.100" fontSize="md">
                        {description}
                    </Text>
                }

                { children }

                {
                    !!footer &&
                    <Box borderTopWidth={1} borderTopColor="gray.400" mt={3} >
                        <Text color="gray.300" mt={3} fontSize="sm" >
                            {footer}
                        </Text>
                    </Box>
                }

            </HStack>


        </VStack>
    );
}