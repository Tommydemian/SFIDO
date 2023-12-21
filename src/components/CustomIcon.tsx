import React from 'react';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

type Props = {
    name: string;
    size: number;
    color: string;
    library: 'Entypo' | 'AntDesign' | 'FontAwesome';
    customStyles?: object;
    onPress?: () => void;
}

export const CustomIcon: React.FC<Props> = ({ name, onPress, size, color, library, customStyles }) => {
    switch(library) {
        case 'Entypo':
            return <Entypo onPress={onPress} style={customStyles} name={name} size={size} color={color} />;
        case 'AntDesign':
            return <AntDesign onPress={onPress} style={customStyles} name={name} size={size} color={color} />;
        case 'FontAwesome':
            return <FontAwesome onPress={onPress} style={customStyles} name={name} size={size} color={color} />;
        default:
            return null;
    }
};
