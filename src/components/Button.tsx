import React from 'react';
import { Button, StyleSheet } from 'react-native';

const CustomButton: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => {
  return (
      <Button
        title={title}
        onPress={onPress}
      ></Button>
  )
}
export default CustomButton

const styles = StyleSheet.create({})