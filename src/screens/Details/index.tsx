import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { HStack, ScrollView, Text, useTheme, VStack } from 'native-base';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { CardDetail } from '../../components/CardDetail';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { OrderProps } from '../../components/Order';
import { OrderFireStoreDto } from '../../DTOs/OrderFireStoreDto';

import { dateFormat } from '../../utils/firestoreDateFormat';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;


  useEffect(() => {
    firestore()
      .collection<OrderFireStoreDto>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const { patrimony, description, status, createdAt, closedAt, solution } = doc.data();

        const closed = closedAt ? dateFormat(closedAt) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(createdAt),
          closed,
        });

        setIsLoading(false);
      })

  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack
        bg="gray.500"
        justifyContent="center"
        pt={4}
      >
        {
          order.status === 'closed'
            ? <CircleWavyCheck color={colors.green[300]} />
            : <Hourglass color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {
            order.status === 'closed' ? 'finalizada' : 'em andamento'
          }
        </Text>

        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetail
            title="Equipamento"
            description={`Patrimonio ${order.patrimony}`}
            icon={DesktopTower}
            footer={order.when}
          />

          <CardDetail
            title="Descrição do Problema"
            description={order.description}
            icon={Clipboard}
          />

          <CardDetail
            title="Solução"
            icon={CircleWavyCheck}
            footer={order.closed && `Encerrado em ${order.closed}`}
          >
            <Input 
              placeholder="Solução do problema"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          </CardDetail>
        </ScrollView>

        {
          order.status === 'open'  && 
            <Button title="Encerrar solicitação" m={5} />
        }
      </HStack>
    </VStack>
  );
}