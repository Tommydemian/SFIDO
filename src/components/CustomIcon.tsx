import React from 'react';
import { Entypo, AntDesign } from '@expo/vector-icons';

type Props = {
    name: string;
    size: number;
    color: string;
    library: 'Entypo' | 'AntDesign';
    customStyles?: object;
    onPress?: () => void;
}

export const CustomIcon: React.FC<Props> = ({ name, onPress, size, color, library, customStyles }) => {
    switch(library) {
        case 'Entypo':
            return <Entypo onPress={onPress} style={customStyles} name={name} size={size} color={color} />;
        case 'AntDesign':
            return <AntDesign onPress={onPress} style={customStyles} name={name} size={size} color={color} />;
        // Puedes agregar más casos para otras bibliotecas de íconos
        default:
            return null;
    }
};
