import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Detail extends React.Component {

    render() {
        const { navigation: { state: { params: { item } } } } = this.props;
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text style={styles.fullName}>{item.full_name}</Text>
                <View style={styles.userBlock}>
                    <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                </View>
                <Text>{item.description}</Text>
                <Text style={styles.repoUrl}>{item.url}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    fullName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ownerIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    ownerName: {
        fontSize: 14,
    },
    userBlock: {
        flexDirection: 'row',
    },
    repoUrl: {
        marginTop: 10,
        marginBottom: 10,
        color: '#3d3d3d',
    },
});