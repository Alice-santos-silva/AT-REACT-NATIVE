import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    position:'absolute',
    bottom:50,
    left:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    margin:20,
    height:50,
    width:50,
    borderRadius:50
  },
  buttonCamera:{
    position:'absolute',
    bottom:50,
    right:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    margin:20,
    height:50,
    width:50,
    borderRadius:50
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  contentButton:{
    flex:1,
    backgroundColor:"transparent",
    flexDirection:"row",

  },
  contentModal:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    margin:20
  },
  closeButton:{
    position:'absolute',
    top:10,
    left:2,
    margin:10
  },
  imgPhoto:{
    width:'100%',
    height:400
  }
})
