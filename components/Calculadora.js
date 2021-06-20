import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import Parentesis from '../Clases/Parentesis';

const Calculadora = () => {

  const scrollOperation = useRef();
  const scrollResult = useRef();

  const [operation, setOperation] = useState('');
  const [historial, setHistorial] = useState([]);
  const [resultado, setResultado] = useState('');
  const [actividad, setActividad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //Mis Componentes que requieren hooks
  const Tecla = ({ tecla}) => (
    <TouchableOpacity
      style={styles.btnTeclado}
      onPress={() =>
        calcular(operation + tecla, setOperation, setHistorial, setResultado, setActividad)
      }>
      <Text style={styles.txtTecla}>{tecla}</Text>
    </TouchableOpacity>
  );

  const TeclaIgual = ({tecla}) => (
    <TouchableOpacity
      style={styles.btnTeclado}
      onPress={() =>{
        setOperation(resultado);
      }}>
      <Text style={styles.txtTecla}>{tecla}</Text>
    </TouchableOpacity>
  );

  const TeclaCE = ({tecla}) => (
    <TouchableOpacity
      style={styles.btnTeclado}
      onPress={() =>{
        let temp = operation.slice(0, -1)
        calcular(temp, setOperation, setHistorial, setResultado, setActividad)
      }}>
      <Text style={styles.txtTecla}>{tecla}</Text>
    </TouchableOpacity>
  );

  const TeclaC = ({tecla}) => (
  <TouchableOpacity
    style={styles.btnTeclado}
    onPress={() =>{
      setOperation('');
      setResultado('')
    }}>
    <Text style={styles.txtTecla}>{tecla}</Text>
  </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modal}>
          <Text style={{fontFamily: 'Roboto', fontSize: 24, color: 'whitesmoke', textAlign: 'center'}}>
            Historial actual
          </Text>
            <FlatList
              data={historial}
              renderItem={({ item, index }) => itemHistorial({ item }, index)}
              keyExtractor={(item) => item.operation}
              style={styles.historial}
            />
            <Image source={{uri: 'https://picsum.photos/500/500'}} style={styles.image} />
          <Button onPress={() => setModalVisible(!modalVisible)} title="Cerrar"/>
        </View>
      </Modal>

      <View style={styles.bar}>
        <Text style={styles.barText}>Mi Calculadora</Text>
        <Entypo name="back-in-time" size={26} color="whitesmoke" onPress={() => setModalVisible(true)}/>
      </View>
      <View style={styles.screen}>
        <ScrollView
          ref={scrollOperation}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollOperation.current.scrollToEnd({animated: false})}
          >
            <View  style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.input]}> {operation}</Text>
            </View>
        </ScrollView>
        <ScrollView
          ref={scrollResult}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollResult.current.scrollToEnd({animated: false})}
          >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator 
              size="large" 
              style={styles.inputActivity}
              color="#939f5c"
              animating={actividad}
            />
            <Text style={styles.result}>{resultado}</Text>
          </View>
        </ScrollView>
      </View>
      {/*
        <FlatList
          data={historial}
          renderItem={({ item, index }) => itemHistorial({ item }, index)}
          keyExtractor={(item) => item.operation}
          style={{ maxHeight: 100, marginVertical: 10 }}
        />
      */}
      <View style={styles.teclado}>
        <View style={{ flex: 1 }}>
          <View style={styles.rowTeclado}>
            <TeclaCE tecla="CE" />
            <TeclaC tecla="C" />
            <Tecla tecla="(" />
            <Tecla tecla=")" />
          </View>
          <View style={[styles.rowTeclado, {borderTopWidth: 1, borderColor: 'gray'}]}>
            <Tecla tecla="7" />
            <Tecla tecla="8" />
            <Tecla tecla="9" />
          </View>
          <View style={styles.rowTeclado}>
            <Tecla tecla="4" />
            <Tecla tecla="5" />
            <Tecla tecla="6" />
          </View>
          <View style={styles.rowTeclado}>
            <Tecla tecla="1" />
            <Tecla tecla="2" />
            <Tecla tecla="3" />
          </View>
          <View style={styles.rowTeclado}>
            <Tecla tecla="0" />
            <Tecla tecla="." />
            <TeclaIgual tecla="=" />
          </View>
        </View>
        <View style={styles.colTeclado}>
          <Tecla tecla="^" />
          <Tecla tecla="/" />
          <Tecla tecla="*" operation={operation} />
          <Tecla tecla="-" />
          <Tecla tecla="+" />
        </View>
      </View>
    </View>
  );
};

const Item = (props) => (
  <View
    style={{
      backgroundColor: 'hsl(' + props.i + ', 100%, 70%)',
      padding: 10,
      margin: 10,
    }}>
    <Text>
      {props.operation} | {props.reduction} = {props.result}
    </Text>
  </View>
);

const itemHistorial = ({ item }, index) => {
  return (
    <Item
      operation={item.operation}
      reduction={item.reduction}
      result={item.result}
      i={(index * 10) % 360}
    />
  );
};

const calcular = (operation, setOperation, setHistorial, setResultado, setActividad) => {
  let [a, b] = new Parentesis(operation).dataManager.init();
  setHistorial(!isNaN(a) && a !== '' ? b : []);
  //setResultado(isNaN(a) ? '' : a);
  if(isNaN(a)){
    setResultado('')
    setActividad(true)
  } else {
    setResultado(a)
    setActividad(false)
  }
  setOperation(operation);
};

const styles = StyleSheet.create({
  ///* Array */ ["#191919","#fdfffc","#ff7f11","#939f5c","#3943b7"]
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  bar: {
    padding: 12,
    backgroundColor: '#939f5c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#fdfffc',
    fontSize: 16,
  },
  screen: {
    fontFamily: 'Roboto',
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 32,
    color: 'gray'
  },
  inputActivity: {
    marginRight: 10,
  },
  result: {
    flex: 1,
    fontSize: 34,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: "#191919"
  },
  teclado: {
    flex: 3,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    borderTopWidth: 5,
    borderTopColor: 'gray',
  },
  rowTeclado: {
    flex: 1,
    flexDirection: 'row',
  },
  colTeclado: {
    flex: 0.3,
    flexDirection: 'column',
    borderColor: 'gray',
    borderLeftWidth: 1,
  },
  btnTeclado: {
    flex: 1,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    backgroundColor: '#fdfffc',
  },
  txtTecla: {
    fontFamily: 'Roboto',
    fontWeight: "300",
    fontSize: 32,
    color: '#ff7f11',
  },
  modal: {
    flex:1,
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#3943b7"
  },
  historial: {
    flex: 1, 
    marginHorizontal: 10, 
    borderRadius: 10,
    backgroundColor: '#242b85'
  },
  image: {
    flex: .3,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10
  }
});

export default Calculadora;
