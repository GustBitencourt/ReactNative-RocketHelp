import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if (timestamp) {
        //transforma o timestamp pra uma data valida
        const date = new Date(timestamp.toDate());

        const day = date.toLocaleDateString('pt-BR');
        const hour = date.toLocaleTimeString('pt-BR');

        return `${day} às ${hour}`;
    }

}