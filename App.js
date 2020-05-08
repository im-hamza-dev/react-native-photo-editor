// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//   return (
//     <View>
//       <Text style ={styles.helloText}>Hello</Text>
//       <Text style ={styles.helloText}>Hello</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   helloText: {
//     fontSize: 20,
//     padding:100,
//     paddingLeft:154,
//     backgroundColor:"pink",
//   },
// });

// export default App;

import * as React from 'react';
import {Button, Image, View, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Dimensions, StyleSheet} from 'react-native';
import {Surface} from "gl-react-native";
import Sepia from './filters/Sepia';
import Hue from './filters/Hue';
import Blur from './filters/Blur';
import Sharpen from './filters/Sharpen';
import Negative from './filters/Negative';
import Temperature from './filters/Temperature';
import ContrastSaturationBrightness from './filters/ContrastSaturationBrightness';

import ImageFilters from 'react-native-gl-image-filters';
import {Container, Content, Header, Footer, Body, Title, TabHeading} from 'native-base';
import Filter from './filterLocal';

// import GL from 'gl-react';
// const shaders = GL.Shaders.create({
//   DiamondCrop: {
//     frag: `
// precision highp float;
// varying vec2 uv;
// uniform sampler2D t;
// void main () {
//   gl_FragColor = mix(
//     texture2D(t, uv),
//     vec4(0.0),
//     step(0.5, abs(uv.x - 0.5) + abs(uv.y - 0.5))
//   );
// }`
//   }
// });
// const DiamondCrop = GL.createComponent(
//   ({ children: t }) =>
//   <GL.Node
//     shader={shaders.DiamondCrop}
//     uniforms={ { t } }
//   />
// );








const widthCreated = Dimensions.get('window').width - 40;

const settings = [
  {
    name: 'hue',
    minValue: -100.0,
    maxValue: 100.0,
  },
  {
    name: 'blur',
    maxValue: 2.0,
  },
  {
    name: 'sepia',
    maxValue: 2.0,
  },
  {
    name: 'sharpen',
    maxValue: 2.0,
  },
  {
    name: 'negative',
    maxValue: 2.0,
  },
  {
    name: 'contrast',
    maxValue: 2.0,
  },
  {
    name: 'saturation',
    maxValue: 2.0,
  },
  {
    name: 'brightness',
    maxValue: 2.0,
  },
  {
    name: 'temperature',
    minValue: 1000.0,
    maxValue: 40000.0,
  },
];

export default class App extends React.Component {
  state = {
    children: null,
    hue: 1,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
  };

  render() {
    const {children, hue, blur, sepia, sharpen, negative, contrast, saturation, brightness, temperature, width, height} = this.state;
    console.log(hue, sepia, temperature);
    return (
      <Container>
        <Content style={styles.content}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button title="Pick Image" onPress={this._pickImage} />
            <Text>imagehere </Text>
            {children && <Image source={{uri: children}} style={{width: 200, height: 200}} />}
          </View>
          <Text>Here...</Text>


          {/* <Surface style={{width: 400, height: 400}}>
            <ImageFilters {...this.state} width={400} height={400}>
              {{uri: "https://i.imgur.com/5EOyTDQ.jpg"}}
            </ImageFilters>
          </Surface> */}
          {/* file:///data/user/0/com.photoeditor/cache/react-native-image-crop-picker/Snapchat-677903983.jpg */}

          {/* <Surface style={{ width: 300, height: 300 }} ref={ref => (this.image = ref)}>
            <ImageFilters {...this.state} width={300} height={300}>
              {{ uri: 'https://i.imgur.com/5EOyTDQ.jpg' }}
            </ImageFilters>
          </Surface> */}
{/* filter code start*/}
          {/* <Surface width={300} height={300} backgroundColor="red">
            <Sepia factor={sepia}>
              <Hue factor={hue}>
                <Negative factor={negative}>
                  <Temperature factor={temperature}>
                    <ContrastSaturationBrightness
                      contrast={contrast}
                      saturation={saturation}
                      brightness={brightness}>
                      <Blur factor={blur} passes={4} height={300} width={300}>
                        <Sharpen factor={sharpen} height={300} width={300}>
                          {children}
                        </Sharpen>
                      </Blur>
                    </ContrastSaturationBrightness>
                  </Temperature>
                </Negative>
              </Hue>
            </Sepia>
          </Surface> */}
{/* filter code end */}
          <Surface style={{ width: 300, height: 300 }} backgroundColor="pink">
            <Blur factor={0.7} passes={4} height={300} width={300}>
              https://i.imgur.com/5EOyTDQ.jpg
            </Blur>
          </Surface>


          {settings.map(filter => (
            <Filter
              key={filter.name}
              name={filter.name}
              minimum={filter.minValue}
              maximum={filter.maxValue}
              onChange={value => this.setState({[filter.name]: value})}
            />
          ))}

          {/* <Button
            rounded={false}
            style={styles.button}
            block
            onPress={this.saveImage}>
            <Text>Save</Text>
          </Button> */}
        </Content>
      </Container>
    );
  }

  _pickImage = async () => {
    console.log("pick image pressed");
      ImagePicker.openPicker({
        cropping: false,
      }).then(response=>{
        console.log(response);
        this.setState({children:response.path})
      })
      // if (!result.cancelled) {
      //   this.setState({ image: result.uri });
      // }
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  content: { marginTop: 20 },
  button: { marginVertical: 20, borderRadius: 0 }
});