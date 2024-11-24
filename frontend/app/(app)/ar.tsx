import { Camera, useCameraPermissions, CameraType, CameraView } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GLView } from "expo-gl";
import * as THREE from "three";
import { Renderer } from "expo-three"; // Renderer for GL context
import * as ExpoTHREE from "expo-three"; // Utilities for Three.js in Expo
import { Asset } from "expo-asset"; // Asset loading
import { ThemeColors } from "@/constants/Colors";

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  // Function to generate a random number between 1 and 20
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 20) + 1; // Generates a number between 1 and 20
    setRandomNumber(number); // Updates the state with the generated number
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Render the Three.js scene
  const onContextCreate = async (gl: any) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.01,
      100
    );
    camera.position.z = 1; // Set the initial camera position
  
    // Create the Three.js renderer
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  
    // Add lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
  
    // Create a D20 shape
    const geometry = new THREE.IcosahedronGeometry(1, 0); // Radius of 1, detail level 0
    const material = new THREE.MeshStandardMaterial({ color: ThemeColors['primary/.75'] }); // Blue color
    const d20 = new THREE.Mesh(geometry, material); // Create the mesh for D20
  
    d20.scale.set(0.5, 0.5, 0.5); // Scale it down in size
    d20.rotation.y = Math.PI / 4; // rotation
    scene.add(d20); // Add the mesh to the scene
  
    
  
    // Animation loop for the d20
    const renderLoop = () => {
      requestAnimationFrame(renderLoop);
      d20.rotation.y += 0.01; // Rotate the d20
      renderer.render(scene, camera);
      gl.endFrameEXP(); // Ensure the frame is rendered
    };
  
    renderLoop(); // Start the animation loop
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={facing}>
        <GLView
          style={{ width: "100%", height: "50%" }}
          onContextCreate={onContextCreate}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={generateRandomNumber}>
            <Text style={styles.diceRoll}>{randomNumber}</Text>
            <Text style={styles.text}>Roll Dice</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  diceRoll: {
    paddingBottom: 15,
    textDecorationLine: 'underline', 
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
