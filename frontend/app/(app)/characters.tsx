import {
    Text,
    TextInput,
    Button,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import React, { useState } from 'react';


export default function Characters() {
    // async function fetchHello() {
    //     const response = await fetch('/hi');
    //     const data = await response.json();
    //     alert(data);
    // }

    async function fetchHello() {
        const url = new URL("http://localhost:5000/hi");
        const post = url.searchParams.get('post');
        alert(post)
        // fetch data for 'post'
        // return Response.json({ ... });
      }

    return (
        <SafeAreaView>
            <Button onPress={() => fetchHello()} title="Fetch hello" />
        </SafeAreaView>
    );
}
