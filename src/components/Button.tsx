import React from 'react'
import { Button, StyleSheet } from 'react-native'

const CustomButton: React.FC<{ title: string }> = ({ title }) => {
  return (
      <Button title={title}></Button>
  )
}
export default CustomButton

const styles = StyleSheet.create({})